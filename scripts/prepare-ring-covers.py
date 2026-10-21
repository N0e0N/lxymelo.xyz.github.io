"""Build lightweight 3:4 WebP art for the homepage ring (requires Pillow).
The detail views keep using their original full-size covers.
"""
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
files = list((root / 'public/ai-builder').glob('*.jpg')) + list((root / 'public/designer').glob('*.jpg'))
files.append(root / 'public/about/about-me.jpg')
output = root / 'public/ring-covers'
output.mkdir(exist_ok=True)
before = after = 0
for source in files:
    slug = 'about' if source.name == 'about-me.jpg' else source.stem
    destination = output / f'{slug}.webp'
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert('RGB')
        image = ImageOps.fit(image, (768, 1024), method=Image.Resampling.LANCZOS)
        image.save(destination, 'WEBP', quality=80, method=6)
    before += source.stat().st_size
    after += destination.stat().st_size
print(f'{len(files)} ring covers: {before:,} → {after:,} bytes ({(1-after/before)*100:.1f}% smaller)')
