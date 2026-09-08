import contextlib
import io
import json
import tempfile
import unittest
from unittest import mock

import validate_trips


def valid_trip():
    return {
        "id": "tokyo-2026",
        "title": "Tokyo",
        "country": "Japan",
        "region": "Tokyo",
        "year": 2026,
        "dateLabel": "2026/06/01–2026/06/01",
        "dateStart": "2026-06-01",
        "dateEnd": "2026-06-01",
        "mapCenter": [35.6812, 139.7671],
        "mapZoom": 12,
        "days": [
            {
                "day": 1,
                "date": "6/1",
                "title": "Tokyo",
                "items": [{"time": "09:00", "text": "Tokyo Station"}],
            }
        ],
        "spots": [
            {"name": "Tokyo Station", "latlng": [35.6812, 139.7671], "day": 1}
        ],
        "food": [],
    }


class ValidateTripsTests(unittest.TestCase):
    def assert_error_mentions(self, errors, *parts):
        self.assertTrue(
            any(all(part in error for part in parts) for error in errors),
            "expected an error mentioning %r, got %r" % (parts, errors),
        )

    def test_validate_returns_errors_and_warnings(self):
        errors, warnings = validate_trips.validate([valid_trip()])

        self.assertEqual([], errors)
        self.assertEqual([], warnings)

    def test_all_current_trips_remain_valid(self):
        with open(validate_trips.TRIPS, encoding="utf8") as source:
            trips = validate_trips.js_to_json(source.read())

        errors, warnings = validate_trips.validate(trips)

        self.assertGreater(len(trips), 0)
        self.assertEqual([], errors)
        self.assertEqual([], warnings)

    def test_themes_must_be_an_array_of_strings(self):
        for value in ("city", ["city", 7]):
            with self.subTest(themes=value):
                trip = valid_trip()
                trip["themes"] = value

                errors, _ = validate_trips.validate([trip])

                self.assert_error_mentions(errors, "themes")

    def test_stay_must_be_an_array_of_objects(self):
        for value in ("hotel", [None]):
            with self.subTest(stay=value):
                trip = valid_trip()
                trip["stay"] = value

                errors, _ = validate_trips.validate([trip])

                self.assert_error_mentions(errors, "stay")

    def test_pass_table_must_use_string_arrays(self):
        cases = (
            "rail pass",
            {"head": "route", "rows": []},
            {"head": ["route", 7], "rows": []},
            {"head": ["route"], "rows": ["Tokyo"]},
            {"head": ["route"], "rows": [[7]]},
        )
        for value in cases:
            with self.subTest(pass_value=value):
                trip = valid_trip()
                trip["pass"] = value

                errors, _ = validate_trips.validate([trip])

                self.assert_error_mentions(errors, "pass")

    def test_flight_must_be_an_object_with_string_fields(self):
        for value in ("JL", {"airline": 7}):
            with self.subTest(flight=value):
                trip = valid_trip()
                trip["flight"] = value

                errors, _ = validate_trips.validate([trip])

                self.assert_error_mentions(errors, "flight")

    def test_rejects_calendar_date_that_does_not_exist(self):
        trip = valid_trip()
        trip["dateStart"] = "2026-02-31"
        trip["dateEnd"] = "2026-03-01"

        errors, _ = validate_trips.validate([trip])

        self.assert_error_mentions(errors, "dateStart", "2026-02-31")

    def test_accepts_valid_global_coordinates(self):
        trip = valid_trip()
        trip["title"] = "Paris"
        trip["country"] = "France"
        trip["region"] = "Paris"
        trip["mapCenter"] = [48.8584, 2.2945]
        trip["spots"][0]["name"] = "Eiffel Tower"
        trip["spots"][0]["latlng"] = [48.8584, 2.2945]

        errors, _ = validate_trips.validate([trip])

        self.assertEqual([], errors)

    def test_rejects_boolean_nonfinite_and_wrong_coordinate_types(self):
        cases = {
            "boolean map center": ("mapCenter", [True, 2.2945]),
            "infinite map center": ("mapCenter", [48.8584, float("inf")]),
            "string map center": ("mapCenter", ["48.8584", 2.2945]),
            "boolean spot coordinate": ("latlng", [True, 2.2945]),
            "nan spot coordinate": ("latlng", [48.8584, float("nan")]),
            "mapping spot coordinate": ("latlng", {"lat": 48.8584, "lng": 2.2945}),
        }
        for label, (field, value) in cases.items():
            with self.subTest(label=label):
                trip = valid_trip()
                if field == "mapCenter":
                    trip[field] = value
                else:
                    trip["spots"][0][field] = value

                errors, _ = validate_trips.validate([trip])

                self.assert_error_mentions(errors, field)

    def test_accepts_supported_utility_card_formats(self):
        trip = valid_trip()
        trip.update(
            {
                "apps": ["Citymapper", {"name": "MTR Mobile", "note": "Routes"}],
                "weather": [
                    "Warm and humid",
                    {
                        "month": "June",
                        "temp": "18–25°C",
                        "rain": "Low",
                        "note": "Pack a layer",
                    },
                ],
                "notes": ["Book ahead"],
                "info": [{"title": "Bookings", "items": ["Museum", "Dinner"]}],
                "tips": [{"title": "Transit", "items": ["Buy a day pass"]}],
                "budget": [{"item": "Transit", "cost": "€20", "total": False}],
            }
        )

        errors, _ = validate_trips.validate([trip])

        self.assertEqual([], errors)

    def test_rejects_malformed_utility_card_entries(self):
        cases = {
            "apps": [{"name": 7, "note": []}],
            "weather": [{"month": 6, "temp": [], "rain": {}, "note": False}],
            "notes": [7],
            "info": [{"title": 7, "items": "not-a-list"}],
            "tips": [{"title": "Transit", "items": [7]}],
            "budget": [{"item": 7, "cost": [], "total": "yes"}],
        }
        for field, value in cases.items():
            with self.subTest(field=field):
                trip = valid_trip()
                trip[field] = value

                errors, _ = validate_trips.validate([trip])

                self.assert_error_mentions(errors, field)

    def test_rejects_wrong_collection_types_without_crashing(self):
        fields = ("days", "spots", "food", "apps", "weather",
                  "notes", "info", "tips", "budget")
        for field in fields:
            with self.subTest(field=field):
                trip = valid_trip()
                trip[field] = "not-a-list"

                errors, _ = validate_trips.validate([trip])

                self.assert_error_mentions(errors, field)

    def test_rejects_malformed_collection_entries_without_crashing(self):
        fields = ("days", "spots", "food", "apps", "weather",
                  "info", "tips", "budget")
        for field in fields:
            with self.subTest(field=field):
                trip = valid_trip()
                trip[field] = [None]

                errors, _ = validate_trips.validate([trip])

                self.assert_error_mentions(errors, field)

    def test_rejects_wrong_required_field_types(self):
        cases = {"id": 7, "title": [], "year": True, "dateLabel": 2026, "mapZoom": "12"}
        for field, value in cases.items():
            with self.subTest(field=field):
                trip = valid_trip()
                trip[field] = value

                errors, _ = validate_trips.validate([trip])

                self.assert_error_mentions(errors, field)

    def test_map_art_must_be_a_safe_existing_local_image(self):
        safe_trip = valid_trip()
        safe_trip["mapArt"] = "img/tohoku-2026.jpg"
        errors, _ = validate_trips.validate([safe_trip])
        self.assertEqual([], errors)

        unsafe_values = (
            "https://example.com/map.jpg",
            "../04. 旅遊行程儀表板/img/tohoku-2026.jpg",
            "img/missing.jpg",
        )
        for value in unsafe_values:
            with self.subTest(mapArt=value):
                trip = valid_trip()
                trip["mapArt"] = value

                errors, _ = validate_trips.validate([trip])

                self.assert_error_mentions(errors, "mapArt")

    def test_cli_reports_malformed_collections_without_crashing(self):
        trip = valid_trip()
        trip["spots"] = 42
        with tempfile.NamedTemporaryFile("w", suffix=".js", encoding="utf8") as source:
            source.write("const trips = %s;" % json.dumps([trip], ensure_ascii=False))
            source.flush()
            with mock.patch.object(validate_trips, "TRIPS", source.name):
                with contextlib.redirect_stdout(io.StringIO()):
                    result = validate_trips.main()

        self.assertEqual(1, result)


if __name__ == "__main__":
    unittest.main()
