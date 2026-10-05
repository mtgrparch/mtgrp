"""Shrink oversized project photos to web size, in place.

WHY THIS EXISTS
  Project modals show photos at most ~470px wide (~1400 device pixels on
  retina screens), but the files straight out of rendering software are often
  7000-13000px and 5-17MB each. That slows the site, hurts search ranking,
  and hands print-quality originals to anyone who copies the page.

WHAT IT DOES
  Every photos/p*.webp and photos/p*.jpg larger than MAX_W x MAX_H is scaled
  down to fit (never up), keeping its name and format, with metadata such as
  camera/GPS info stripped. Files already within the limits are untouched, so
  re-running is instant and safe. GIFs are left alone (animation).

  Runs automatically on GitHub after photos are uploaded (Rebuild site
  workflow). To run by hand from the repo root:

        python tools/resize_photos.py

  Keep your full-resolution originals somewhere else (e.g. your own drive):
  this replaces the files in photos/.
"""
from pathlib import Path
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is not installed. Run:  pip install pillow")

Image.MAX_IMAGE_PIXELS = None   # our own renders can exceed Pillow's 89MP safety limit

ROOT = Path(__file__).resolve().parent.parent
PHOTOS = ROOT / "photos"
MAX_W, MAX_H = 2400, 3600       # tall boards keep extra height to stay readable
QUALITY = 85

resized, saved = 0, 0
for f in sorted(PHOTOS.glob("p*.*")):
    if f.suffix.lower() not in (".webp", ".jpg", ".jpeg"):
        continue
    with Image.open(f) as im:
        w, h = im.size
        if w <= MAX_W and h <= MAX_H:
            continue
        scale = min(MAX_W / w, MAX_H / h)
        size = (round(w * scale), round(h * scale))
        out = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") and f.suffix.lower() == ".webp" else "RGB")
        out = out.resize(size, Image.LANCZOS)
    before = f.stat().st_size
    if f.suffix.lower() == ".webp":
        out.save(f, "WEBP", quality=QUALITY, method=6)
    else:
        out.save(f, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    after = f.stat().st_size
    resized += 1
    saved += before - after
    print(f"  {f.name}: {w}x{h} -> {size[0]}x{size[1]}  ({before // 1024}KB -> {after // 1024}KB)")

print(f"Done — {resized} photo(s) resized, {saved / 1e6:.1f} MB saved.")
