"""Generate the link-preview images shown when a project page is shared
(WhatsApp, Instagram, LinkedIn, iMessage, Google...).

Each project with photos gets photos/og/<id>.jpg — a 1200x630 crop of its
first photo. JPG is used because several apps (WhatsApp in particular) don't
show WebP previews reliably. Existing images are skipped, so re-running is
instant. Delete a file in photos/og/ to force it to be regenerated.

    python tools/make_og_images.py      (then: node tools/build_seo.js)

Needs Pillow:  pip install pillow
"""
from pathlib import Path
import re
import sys

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is not installed. Run:  pip install pillow")

ROOT = Path(__file__).resolve().parent.parent
PHOTOS = ROOT / "photos"
OUT = PHOTOS / "og"
SIZE = (1200, 630)

src = (ROOT / "script.js").read_text(encoding="utf-8")
projects = re.findall(r'id:\s*"([^"]+)"[\s\S]*?photos:\s*(\d+)', src[src.index("const PROJECTS"):])

OUT.mkdir(exist_ok=True)
made = 0
for pid, count in projects:
    if int(count) == 0:
        continue
    target = OUT / f"{pid}.jpg"
    if target.exists():
        continue
    source = next((PHOTOS / f"{pid}-01.{ext}" for ext in ("webp", "jpg", "gif")
                   if (PHOTOS / f"{pid}-01.{ext}").exists()), None)
    if not source:
        print(f"  ! {pid}: no first photo found, skipped")
        continue
    with Image.open(source) as im:
        im.seek(0)  # first frame of GIFs
        im = ImageOps.fit(im.convert("RGB"), SIZE, Image.LANCZOS)
        im.save(target, "JPEG", quality=82, optimize=True, progressive=True)
    made += 1
    print(f"  + {target.relative_to(ROOT)}")

print(f"Done — {made} new preview image(s).")
