import tempfile
from pathlib import Path
import unittest
from tools.version_assets import version_assets


class VersionAssetsTests(unittest.TestCase):
    def test_changed_data_gets_new_url_and_external_urls_stay_unchanged(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'data').mkdir()
            data = root / 'data/trips.js'
            data.write_text('old itinerary')
            page = root / 'index.html'
            external = '<script src="https://cdn.example.com/lib.js?v=1"></script>'
            page.write_text('<script src="data/trips.js?v=old"></script>' + external)
            version_assets(root)
            first = page.read_text()
            version_assets(root)
            self.assertEqual(first, page.read_text())
            data.write_text('new itinerary with park')
            version_assets(root)
            self.assertNotEqual(first, page.read_text())
            self.assertIn(external, page.read_text())
            self.assertNotIn('?v=old', page.read_text())
