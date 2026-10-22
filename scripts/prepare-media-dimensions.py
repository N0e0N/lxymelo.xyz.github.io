"""Record original media dimensions so lazy images/videos reserve their layout.
Requires Pillow and ffprobe. Run after replacing project media.
"""
from pathlib import Path
from PIL import Image
import json, subprocess

root = Path(__file__).resolve().parents[1]
result = {}
for folder in ['projects', 'ai-builder', 'designer', 'about']:
    for path in sorted((root/'public'/folder).rglob('*')):
        if path.suffix.lower() in {'.png', '.jpg', '.jpeg', '.webp'}:
            with Image.open(path) as image:
                width, height = image.size
        elif path.suffix.lower() == '.mp4':
            probe = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'json', str(path)], check=True, capture_output=True, text=True)
            stream = json.loads(probe.stdout)['streams'][0]
            width, height = stream['width'], stream['height']
        else:
            continue
        result['/'+str(path.relative_to(root/'public'))] = {'width':width, 'height':height}
(root/'src/data/media-dimensions.json').write_text(json.dumps(result, indent=2)+'\n')
print(f'Recorded intrinsic dimensions for {len(result)} assets.')
