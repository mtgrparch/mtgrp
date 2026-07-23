"""Generate the small grid-tile images the homepage scrolls through.

WHY THIS EXISTS
  The parallax grid must scroll at 60fps, which means the browser has to keep
  every tile decoded in memory. The original photos (competition boards,
  renders) are far too large for that — some are 40 megapixels — so the grid
  loads pre-shrunk copies from photos/grid/ instead. Project modals still
  open the full-size originals; nothing in photos/ is ever modified.

HOW TO USE
  1. Add your photos to photos/ as usual (p14-01.webp, p14-02.webp, ...)
     and update PROJECTS in script.js (photos count + preview count).
  2. Run this from the repo root:

        python tools/make_grid_tiles.py

  That's it. The script reads PROJECTS out of script.js, works out which
  tiles the grid needs (first `preview` photos of each project), and creates
  any missing photos/grid/ variants at 800px and 1400px wide. Already
  up-to-date variants are skipped, so re-running is instant and always safe.

  One-time setup if Python complains about PIL/Pillow:

        pip install pillow
"""
from pathlib import Path
import re
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is not installed. Run:  pip install pillow")

ROOT = Path(__file__).resolve().parent.parent   # repo root, wherever you run it from
PHOTOS = ROOT / "photos"
OUT = PHOTOS / "grid"
WIDTHS = [800, 1400]
QUALITY = 80

# ── Read the PROJECTS registry straight out of script.js ─────────────────────
# Each project entry starts with `id: "..."` and ends with `photos: N` and
# `preview: N` — the same fields buildTileList() uses in the browser.
source = (ROOT / "script.js").read_text(encoding="utf-8")
projects = re.findall(
    r'id:\s*"([^"]+)"[\s\S]*?photos:\s*(\d+)\s*,\s*preview:\s*(\d+)', source)
if not projects:
    sys.exit("Could not find any PROJECTS entries in script.js — has its format changed?")

# ── Work out which tiles the grid needs (mirrors buildTileList) ──────────────
needed = []
for pid, photos, preview in projects:
    count = min(int(preview), int(photos))
    for i in range(1, count + 1):
        needed.append(f"{pid}-{i:02d}")

# ── Generate whatever is missing or out of date ──────────────────────────────
OUT.mkdir(exist_ok=True)
made, skipped, gifs, missing = 0, 0, [], []

for name in needed:
    src = PHOTOS / f"{name}.webp"
    if not src.exists():
        # animated tiles live as .gif and are served as-is by the fallback chain
        if (PHOTOS / f"{name}.gif").exists():
            gifs.append(name)
        else:
            missing.append(name)
        continue

    im = None
    for w in WIDTHS:
        dst = OUT / f"{name}-{w}.webp"
        if dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
            skipped += 1
            continue
        if im is None:
            im = Image.open(src)
        if im.width <= w:
            im.save(dst, "WEBP", quality=QUALITY, method=6)   # never upscale
        else:
            h = round(im.height * w / im.width)
            im.resize((w, h), Image.LANCZOS).save(dst, "WEBP", quality=QUALITY, method=6)
        made += 1
        print(f"  made  grid/{dst.name}  ({dst.stat().st_size // 1024}KB)")

# ── Report leftovers from projects whose preview count was reduced ───────────
wanted = {f"{n}-{w}.webp" for n in needed for w in WIDTHS}
orphans = sorted(f.name for f in OUT.glob("*.webp") if f.name not in wanted)

print(f"\n{made} variant(s) created, {skipped} already up to date.")
if gifs:
    print(f"Animated tiles served as .gif (no variant needed): {', '.join(gifs)}")
if missing:
    print(f"WARNING — the grid expects these but no file exists: {', '.join(missing)}")
if orphans:
    print(f"No longer needed (safe to delete from photos/grid/): {', '.join(orphans)}")
