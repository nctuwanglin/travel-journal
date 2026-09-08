#!/usr/bin/env python3
"""Validate data/maintenance.js against the trips and local image files."""

import datetime
import hashlib
import json
import math
import os
import re
from urllib.parse import urlsplit


HERE = os.path.dirname(os.path.abspath(__file__))
MAINTENANCE = os.path.join(HERE, "data", "maintenance.js")
TAIPEI_TIMEZONE = datetime.timezone(datetime.timedelta(hours=8))
SNAPSHOT_FIELDS = (
    "title", "subtitle", "country", "region", "year", "dateLabel",
    "dateStart", "dateEnd", "nights", "flight", "stay", "pass", "days",
)


def _without_duplicate_keys(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError("JSON 物件 key 重複: %s" % key)
        result[key] = value
    return result


def parse_metadata(source):
    """Parse the JSON-compatible JavaScript assignment."""
    match = re.fullmatch(
        r"\s*window\.TRIP_MAINTENANCE\s*=\s*(.*?)\s*;\s*",
        source,
        re.DOTALL,
    )
    if not match:
        raise ValueError("maintenance.js 必須是 window.TRIP_MAINTENANCE 的 JSON 指派")
    return json.loads(match.group(1), object_pairs_hook=_without_duplicate_keys)


def map_snapshot(trip):
    snapshot = {field: trip.get(field) for field in SNAPSHOT_FIELDS}
    spots = trip.get("spots") if isinstance(trip.get("spots"), list) else []
    snapshot["spots"] = [
        {field: spot.get(field) for field in ("name", "area", "day", "latlng")}
        for spot in spots if isinstance(spot, dict)
    ]
    return snapshot


def _js_truthy(value):
    if value is None or value is False or value == "" or value == 0:
        return False
    return not (isinstance(value, float) and math.isnan(value))


def targets(trip):
    """Return the target keys and snapshots defined by trip-maintenance.js."""
    result = []
    for field in ("flight", "pass"):
        if _js_truthy(trip.get(field)):
            result.append((field, trip[field]))
    for field, prefix in (("spots", "spot"), ("food", "food")):
        values = trip.get(field) if isinstance(trip.get(field), list) else []
        for value in values:
            if not isinstance(value, dict) or not isinstance(value.get("name"), str):
                continue
            name = value["name"]
            snapshot = {key: item for key, item in value.items()
                        if key not in ("ref", "day", "latlng")}
            result.append((prefix + ":" + name, snapshot))
            ref = value.get("ref")
            if isinstance(ref, dict) and _js_truthy(ref.get("url")):
                result.append((prefix + "-ref:" + name, ref))
    budgets = trip.get("budget") if isinstance(trip.get("budget"), list) else []
    for budget in budgets:
        if isinstance(budget, dict) and isinstance(budget.get("item"), str):
            result.append(("budget:" + budget["item"], budget))
    return result


def _validate_date(value, context, errors, today, required=True):
    if value in (None, ""):
        if required:
            errors.append("%s 必填" % context)
        return None
    if not isinstance(value, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        errors.append("%s 應為真實 YYYY-MM-DD 日期" % context)
        return None
    try:
        parsed = datetime.date.fromisoformat(value)
    except ValueError:
        errors.append("%s 應為真實 YYYY-MM-DD 日期" % context)
        return None
    if parsed > today:
        errors.append("%s 不得晚於今天" % context)
    return parsed


def _valid_http_url(value):
    if not isinstance(value, str):
        return False
    try:
        parsed = urlsplit(value)
    except ValueError:
        return False
    return parsed.scheme.lower() in ("http", "https") and bool(parsed.netloc)


def validate(metadata, trips, root=HERE, today=None):
    errors, warnings = [], []
    today = today or datetime.datetime.now(TAIPEI_TIMEZONE).date()
    if not isinstance(metadata, dict):
        return ["maintenance metadata 最外層應為物件"], warnings
    if metadata.get("schemaVersion") != 1 or isinstance(metadata.get("schemaVersion"), bool):
        errors.append("schemaVersion 必須為 1")

    maps = metadata.get("maps")
    checks = metadata.get("checks")
    if not isinstance(maps, dict):
        errors.append("maps 應為物件")
        maps = {}
    if not isinstance(checks, dict):
        errors.append("checks 應為物件")
        checks = {}

    if not isinstance(trips, list):
        errors.append("trips 應為陣列")
        trips = []
    trip_by_id = {
        trip["id"]: trip for trip in trips
        if isinstance(trip, dict) and isinstance(trip.get("id"), str)
    }
    target_by_trip = {}
    for trip_id, trip in trip_by_id.items():
        target_pairs = targets(trip)
        seen = set()
        for key, _ in target_pairs:
            if key in seen:
                errors.append("%s: target 重複 %r" % (trip_id, key))
            seen.add(key)
        target_by_trip[trip_id] = dict(target_pairs)

    project_root = os.path.realpath(os.fspath(root))
    for trip_id, record in maps.items():
        context = "maps[%r]" % trip_id
        trip = trip_by_id.get(trip_id)
        if trip is None:
            errors.append("%s: trip 不存在" % context)
        if not isinstance(record, dict):
            errors.append("%s 應為物件" % context)
            continue
        if not isinstance(record.get("aligned"), bool):
            errors.append("%s.aligned 應為布林值" % context)
        baseline = record.get("baselineSnapshot")
        if not isinstance(baseline, dict):
            errors.append("%s.baselineSnapshot 應為物件" % context)
        elif trip is not None and baseline != map_snapshot(trip):
            warnings.append("%s.baselineSnapshot 與目前行程內容不同" % context)
        _validate_date(record.get("baselineRecordedAt"),
                       context + ".baselineRecordedAt", errors, today)
        updated = record.get("updatedAt")
        _validate_date(updated, context + ".updatedAt", errors, today,
                       required=record.get("aligned") is True)
        version = record.get("version")
        if record.get("aligned") is True and (not isinstance(version, str) or not version):
            errors.append("%s.version 在 aligned=true 時必填" % context)
        elif version is not None and not isinstance(version, str):
            errors.append("%s.version 應為字串或 null" % context)
        prompt = record.get("prompt")
        if prompt is not None and not isinstance(prompt, str):
            errors.append("%s.prompt 應為字串或 null" % context)

        image_path = record.get("imagePath")
        safe_path = (isinstance(image_path, str) and bool(image_path)
                     and not os.path.isabs(image_path)
                     and not re.match(r"^[A-Za-z][A-Za-z0-9+.-]*:", image_path)
                     and ".." not in image_path.replace("\\", "/").split("/"))
        image_file = None
        if safe_path:
            image_file = os.path.realpath(os.path.join(project_root, image_path))
            try:
                safe_path = os.path.commonpath((project_root, image_file)) == project_root
            except ValueError:
                safe_path = False
        if not safe_path or not os.path.isfile(image_file or ""):
            errors.append("%s.imagePath 必須是專案內現有檔案" % context)
            image_file = None
        image_hash = record.get("imageSha256")
        if not isinstance(image_hash, str) or not re.fullmatch(r"[0-9a-fA-F]{64}", image_hash):
            errors.append("%s.imageSha256 應為 SHA-256" % context)
        elif image_file:
            with open(image_file, "rb") as source:
                actual_hash = hashlib.sha256(source.read()).hexdigest()
            if image_hash.lower() != actual_hash:
                errors.append("%s.imageSha256 與目前同名圖片不符" % context)

    for trip_id, records in checks.items():
        context = "checks[%r]" % trip_id
        if trip_id not in trip_by_id:
            errors.append("%s: trip 不存在" % context)
        if not isinstance(records, dict):
            errors.append("%s 應為物件" % context)
            continue
        valid_targets = target_by_trip.get(trip_id, {})
        for key, record in records.items():
            record_context = "%s[%r]" % (context, key)
            if key not in valid_targets:
                errors.append("%s: target 不存在" % record_context)
            if not isinstance(record, dict):
                errors.append("%s 應為物件" % record_context)
                continue
            _validate_date(record.get("checkedAt"), record_context + ".checkedAt",
                           errors, today)
            sources = record.get("sources")
            if not isinstance(sources, list) or not sources:
                errors.append("%s.sources 應為非空陣列" % record_context)
            else:
                for index, source in enumerate(sources):
                    source_context = "%s.sources[%d]" % (record_context, index)
                    if not isinstance(source, dict):
                        errors.append("%s 應為物件" % source_context)
                        continue
                    if not isinstance(source.get("title"), str) or not source.get("title"):
                        errors.append("%s.title 應為非空字串" % source_context)
                    if not _valid_http_url(source.get("url")):
                        errors.append("%s.url 應為 HTTP(S) 網址" % source_context)
            snapshot = record.get("snapshot")
            if not isinstance(snapshot, dict):
                errors.append("%s.snapshot 應為物件" % record_context)
            elif key in valid_targets and snapshot != valid_targets[key]:
                warnings.append("%s.snapshot 與目前行程內容不同" % record_context)

    return errors, warnings


def validate_file(trips, path=None, root=None, today=None):
    path = os.fspath(path or MAINTENANCE)
    root = os.fspath(root or HERE)
    if not os.path.isfile(path):
        return ["maintenance metadata 不存在: %s" % path], []
    try:
        with open(path, encoding="utf8") as source:
            metadata = parse_metadata(source.read())
    except (OSError, ValueError) as error:
        return ["maintenance.js JSON 解析失敗: %s" % error], []
    return validate(metadata, trips, root=root, today=today)
