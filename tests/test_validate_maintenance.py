import contextlib
import copy
import datetime
import hashlib
import io
import json
import tempfile
import unittest
from pathlib import Path
from unittest import mock

import validate_maintenance
import validate_trips


TODAY = datetime.date(2026, 9, 7)


def trip_fixture():
    return {
        "id": "demo",
        "title": "Demo trip",
        "subtitle": "A test trip",
        "country": "Japan",
        "region": "Tokyo",
        "year": 2026,
        "dateLabel": "9/7",
        "dateStart": "2026-09-07",
        "dateEnd": "2026-09-07",
        "nights": 0,
        "mapArt": "img/map.jpg",
        "flight": {"airline": "JL", "out": "TPE → NRT", "back": "NRT → TPE"},
        "stay": [],
        "pass": {"name": "Metro Pass", "head": ["Route"], "rows": [["Tokyo"]]},
        "days": [],
        "spots": [
            {
                "name": "Museum",
                "area": "Tokyo",
                "day": 1,
                "latlng": [35.0, 139.0],
                "ref": {"title": "Official", "url": "https://example.com/museum"},
            }
        ],
        "food": [],
        "budget": [],
    }


def valid_check_record(trip):
    return {
        "checkedAt": TODAY.isoformat(),
        "sources": [{"title": "Official", "url": "https://example.com"}],
        "snapshot": copy.deepcopy(trip["flight"]),
    }


def valid_map_record(trip, root):
    image = Path(root, trip["mapArt"])
    image.parent.mkdir(parents=True, exist_ok=True)
    image.write_bytes(b"original map")
    return {
        "version": None,
        "updatedAt": None,
        "prompt": None,
        "baselineRecordedAt": TODAY.isoformat(),
        "baselineSnapshot": validate_maintenance.map_snapshot(trip),
        "imagePath": trip["mapArt"],
        "imageSha256": hashlib.sha256(image.read_bytes()).hexdigest(),
        "aligned": False,
    }


class ValidateMaintenanceTests(unittest.TestCase):
    def assert_error_mentions(self, errors, *parts):
        self.assertTrue(
            any(all(part in error for part in parts) for error in errors),
            "expected an error mentioning %r, got %r" % (parts, errors),
        )

    def test_current_metadata_is_valid_and_unconfirmed_maps_are_quiet(self):
        with open(validate_trips.TRIPS, encoding="utf8") as source:
            trips = validate_trips.js_to_json(source.read())

        errors, warnings = validate_maintenance.validate_file(trips)

        self.assertEqual([], errors)
        self.assertEqual([], warnings)

    def test_metadata_file_must_exist_and_contain_json(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            missing = Path(temp_dir, "missing.js")
            errors, _ = validate_maintenance.validate_file([], path=missing, root=temp_dir)
            self.assert_error_mentions(errors, "不存在")

            malformed = Path(temp_dir, "maintenance.js")
            malformed.write_text("window.TRIP_MAINTENANCE = {oops};", encoding="utf8")
            errors, _ = validate_maintenance.validate_file([], path=malformed, root=temp_dir)
            self.assert_error_mentions(errors, "JSON", "解析")

    def test_schema_version_maps_and_checks_have_required_types(self):
        cases = (
            ({"schemaVersion": 2, "maps": {}, "checks": {}}, "schemaVersion"),
            ({"schemaVersion": 1, "maps": [], "checks": {}}, "maps"),
            ({"schemaVersion": 1, "maps": {}, "checks": []}, "checks"),
        )
        for metadata, field in cases:
            with self.subTest(field=field):
                errors, _ = validate_maintenance.validate(metadata, [], today=TODAY)
                self.assert_error_mentions(errors, field)

    def test_validate_rejects_non_array_trips_without_crashing(self):
        metadata = {"schemaVersion": 1, "maps": {}, "checks": {}}

        errors, _ = validate_maintenance.validate(metadata, None, today=TODAY)

        self.assert_error_mentions(errors, "trips")

    def test_map_snapshot_tolerates_null_spots(self):
        trip = trip_fixture()
        trip["spots"] = None

        snapshot = validate_maintenance.map_snapshot(trip)

        self.assertEqual([], snapshot["spots"])

    def test_map_and_check_trip_keys_must_exist(self):
        metadata = {
            "schemaVersion": 1,
            "maps": {"unknown-trip": {}},
            "checks": {"also-unknown": {}},
        }

        errors, _ = validate_maintenance.validate(metadata, [trip_fixture()], today=TODAY)

        self.assert_error_mentions(errors, "maps", "unknown-trip")
        self.assert_error_mentions(errors, "checks", "also-unknown")

    def test_check_target_keys_must_exist_and_generated_targets_must_be_unique(self):
        trip = trip_fixture()
        metadata = {
            "schemaVersion": 1,
            "maps": {},
            "checks": {"demo": {"unknown-target": valid_check_record(trip)}},
        }
        errors, _ = validate_maintenance.validate(metadata, [trip], today=TODAY)
        self.assert_error_mentions(errors, "unknown-target", "不存在")

        duplicate_trip = trip_fixture()
        duplicate_trip["spots"].append(copy.deepcopy(duplicate_trip["spots"][0]))
        errors, _ = validate_maintenance.validate(
            {"schemaVersion": 1, "maps": {}, "checks": {}},
            [duplicate_trip],
            today=TODAY,
        )
        self.assert_error_mentions(errors, "target", "重複")

    def test_parser_rejects_duplicate_target_keys(self):
        source = (
            'window.TRIP_MAINTENANCE = {"schemaVersion":1,"maps":{},'
            '"checks":{"demo":{"flight":{},"flight":{}}}};'
        )

        with self.assertRaisesRegex(ValueError, "重複"):
            validate_maintenance.parse_metadata(source)

    def test_check_records_require_real_nonfuture_dates_sources_and_snapshots(self):
        trip = trip_fixture()
        base = valid_check_record(trip)
        cases = (
            ("checkedAt", {**base, "checkedAt": "2026-02-31"}),
            ("checkedAt", {**base, "checkedAt": "2026-09-08"}),
            ("sources", {**base, "sources": []}),
            ("sources", {**base, "sources": [{"title": "Official", "url": "ftp://example.com"}]}),
            ("sources", {**base, "sources": [{"title": "Official", "url": "https://["}]}),
            ("sources", {**base, "sources": [{"title": "", "url": "https://example.com"}]}),
            ("snapshot", {**base, "snapshot": []}),
        )
        for field, record in cases:
            with self.subTest(field=field, record=record):
                metadata = {
                    "schemaVersion": 1,
                    "maps": {},
                    "checks": {"demo": {"flight": record}},
                }
                errors, _ = validate_maintenance.validate(metadata, [trip], today=TODAY)
                self.assert_error_mentions(errors, field)

    def test_map_record_checks_project_path_and_file_hash(self):
        trip = trip_fixture()
        with tempfile.TemporaryDirectory() as temp_dir:
            record = valid_map_record(trip, temp_dir)
            metadata = {"schemaVersion": 1, "maps": {"demo": record}, "checks": {}}

            errors, warnings = validate_maintenance.validate(
                metadata, [trip], root=temp_dir, today=TODAY
            )
            self.assertEqual([], errors)
            self.assertEqual([], warnings)

            invalid_prompt = copy.deepcopy(metadata)
            invalid_prompt["maps"]["demo"]["prompt"] = 7
            errors, _ = validate_maintenance.validate(
                invalid_prompt, [trip], root=temp_dir, today=TODAY
            )
            self.assert_error_mentions(errors, "prompt")

            Path(temp_dir, trip["mapArt"]).write_bytes(b"changed under the same name")
            errors, _ = validate_maintenance.validate(
                metadata, [trip], root=temp_dir, today=TODAY
            )
            self.assert_error_mentions(errors, "imageSha256")

            for unsafe_path in ("../map.jpg", "https://example.com/map.jpg"):
                with self.subTest(imagePath=unsafe_path):
                    unsafe = copy.deepcopy(metadata)
                    unsafe["maps"]["demo"]["imagePath"] = unsafe_path
                    errors, _ = validate_maintenance.validate(
                        unsafe, [trip], root=temp_dir, today=TODAY
                    )
                    self.assert_error_mentions(errors, "imagePath")

    def test_aligned_map_requires_version_and_updated_date(self):
        trip = trip_fixture()
        with tempfile.TemporaryDirectory() as temp_dir:
            record = valid_map_record(trip, temp_dir)
            record["aligned"] = True
            metadata = {"schemaVersion": 1, "maps": {"demo": record}, "checks": {}}

            errors, _ = validate_maintenance.validate(
                metadata, [trip], root=temp_dir, today=TODAY
            )

        self.assert_error_mentions(errors, "version")
        self.assert_error_mentions(errors, "updatedAt")

    def test_changed_content_snapshots_are_warnings(self):
        trip = trip_fixture()
        with tempfile.TemporaryDirectory() as temp_dir:
            map_record = valid_map_record(trip, temp_dir)
            map_record["baselineSnapshot"]["title"] = "Old title"
            check_record = valid_check_record(trip)
            check_record["snapshot"] = {"airline": "Old airline"}
            metadata = {
                "schemaVersion": 1,
                "maps": {"demo": map_record},
                "checks": {"demo": {"flight": check_record}},
            }

            errors, warnings = validate_maintenance.validate(
                metadata, [trip], root=temp_dir, today=TODAY
            )

        self.assertEqual([], errors)
        self.assertTrue(any("baselineSnapshot" in warning for warning in warnings))
        self.assertTrue(any("snapshot" in warning for warning in warnings))

    def test_validate_trips_cli_includes_maintenance_errors(self):
        with mock.patch.object(
            validate_maintenance,
            "validate_file",
            return_value=(["maintenance test error"], []),
        ):
            with contextlib.redirect_stdout(io.StringIO()):
                result = validate_trips.main()

        self.assertEqual(1, result)


if __name__ == "__main__":
    unittest.main()
