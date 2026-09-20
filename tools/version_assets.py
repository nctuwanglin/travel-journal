"""Give local JS/CSS URLs a content version before publishing to Pages."""
import hashlib
from pathlib import Path
import re
import sys


def version_assets(root):
    root = Path(root)
    page = root / 'index.html'
    pattern = r'((?:src|href)=")([^"?:]+\.(?:js|css))(?:\?[^"#]*)?(\")'

    def replace(match):
        asset = root / match[2]
        if not asset.is_file():
            raise FileNotFoundError(asset)
        version = hashlib.sha256(asset.read_bytes()).hexdigest()[:16]
        return f'{match[1]}{match[2]}?v={version}{match[3]}'

    page.write_text(re.sub(pattern, replace, page.read_text(encoding='utf-8')), encoding='utf-8')


if __name__ == '__main__':
    version_assets(sys.argv[1] if len(sys.argv) > 1 else '.')
