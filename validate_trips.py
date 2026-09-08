#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""trips.js schema 驗證器 — 新增/修改行程後跑一次:

    python3 validate_trips.py

檢查項目:
  - 必填欄位(id/title/country/region/year/dateLabel/mapCenter/mapZoom/days/spots)
  - id 不重複、日期格式與先後、year 與 dateStart 一致
  - 經緯度型別、有限值與全球合法範圍
  - 景點離 mapCenter 過遠警告(> 5°,可能打錯座標)
  - spots[].day 需落在行程天數範圍內
  - days[].day 連號、items 非空;food[].stars 1–5;ref.url 需為 http(s)
有錯誤時以非零狀態碼結束(可接 CI)。
"""
import datetime
import json
import math
import os
import re
import sys

import validate_maintenance

HERE = os.path.dirname(os.path.abspath(__file__))
TRIPS = os.path.join(HERE, "data", "trips.js")


def js_to_json(src):
    """把 trips.js 的 JS 物件字面值轉成 JSON:
    去註解、幫 key 加引號、移除尾逗號 — 全程以字串狀態機處理,避免誤傷字串內容。"""
    start = src.index("[")
    end = src.rindex("]")
    body = src[start:end + 1]

    # pass 1: 去註解(字串感知)
    out, i, n, in_str = [], 0, len(body), False
    while i < n:
        c = body[i]
        if in_str:
            out.append(c)
            if c == "\\" and i + 1 < n:
                out.append(body[i + 1]); i += 2; continue
            if c == '"':
                in_str = False
            i += 1; continue
        if c == '"':
            in_str = True; out.append(c); i += 1; continue
        if c == "/" and i + 1 < n and body[i + 1] == "/":
            while i < n and body[i] != "\n":
                i += 1
            continue
        if c == "/" and i + 1 < n and body[i + 1] == "*":
            i += 2
            while i + 1 < n and not (body[i] == "*" and body[i + 1] == "/"):
                i += 1
            i += 2; continue
        out.append(c); i += 1
    s = "".join(out)

    # pass 2: key 加引號 + 移除尾逗號(字串感知)
    out, i, n, in_str = [], 0, len(s), False
    while i < n:
        c = s[i]
        if in_str:
            out.append(c)
            if c == "\\" and i + 1 < n:
                out.append(s[i + 1]); i += 2; continue
            if c == '"':
                in_str = False
            i += 1; continue
        if c == '"':
            in_str = True; out.append(c); i += 1; continue
        m = re.match(r"[A-Za-z_$][\w$]*(?=\s*:)", s[i:])
        if m and (len(out) == 0 or re.search(r"[{,\[\s]$", "".join(out[-3:]) or " ")):
            out.append('"%s"' % m.group(0)); i += len(m.group(0)); continue
        if c == ",":
            j = i + 1
            while j < n and s[j] in " \t\r\n":
                j += 1
            if j < n and s[j] in "]}":
                i += 1; continue  # 尾逗號
        out.append(c); i += 1
    return json.loads("".join(out))


def _is_number(value):
    return (isinstance(value, (int, float)) and not isinstance(value, bool)
            and math.isfinite(value))


def validate(trips):
    """Validate parsed trip data and return ``(errors, warnings)``."""
    errors, warns = [], []
    E = errors.append
    W = warns.append

    if not isinstance(trips, list):
        return ["trips: 最外層資料應為陣列"], warns

    def list_field(trip, tid, field):
        if field not in trip:
            return []
        value = trip[field]
        if not isinstance(value, list):
            E("%s: %s 應為陣列(目前 %r)" % (tid, field, value))
            return []
        return value

    def parse_date(tid, field, value):
        if value in (None, ""):
            return None
        if not isinstance(value, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
            E("%s: %s 格式應為 YYYY-MM-DD(目前 %r)" % (tid, field, value))
            return None
        try:
            return datetime.date.fromisoformat(value)
        except ValueError:
            E("%s: %s 不是有效日期(目前 %r)" % (tid, field, value))
            return None

    def validate_ref(ref, context):
        if ref in (None, {}):
            return
        if not isinstance(ref, dict):
            E("%s: ref 應為物件(目前 %r)" % (context, ref))
            return
        url = ref.get("url")
        if url is not None and (not isinstance(url, str)
                                or not re.match(r"^https?://", url, re.IGNORECASE)):
            E("%s: ref.url 不是 http(s) 連結" % context)
        if "title" in ref and not isinstance(ref["title"], str):
            E("%s: ref.title 應為字串" % context)

    def validate_cards(trip, tid, field):
        for index, card in enumerate(list_field(trip, tid, field)):
            context = "%s: %s[%d]" % (tid, field, index)
            if not isinstance(card, dict):
                E("%s 應為物件(目前 %r)" % (context, card))
                continue
            if not isinstance(card.get("title"), str) or not card.get("title"):
                E("%s.title 應為非空字串" % context)
            items = card.get("items")
            if not isinstance(items, list):
                E("%s.items 應為陣列" % context)
                continue
            for item_index, item in enumerate(items):
                if not isinstance(item, str):
                    E("%s.items[%d] 應為字串" % (context, item_index))

    ids = set()
    for trip_index, t in enumerate(trips):
        if not isinstance(t, dict):
            E("trips[%d] 應為物件(目前 %r)" % (trip_index, t))
            continue

        raw_id = t.get("id")
        tid = raw_id if isinstance(raw_id, str) and raw_id else "trips[%d]" % trip_index
        for field in ("id", "title", "country", "region", "dateLabel"):
            if not isinstance(t.get(field), str) or not t.get(field):
                E("%s: 必填欄位 %s 應為非空字串" % (tid, field))
        year = t.get("year")
        if not isinstance(year, int) or isinstance(year, bool):
            E("%s: 必填欄位 year 應為整數" % tid)
        zoom = t.get("mapZoom")
        if not _is_number(zoom):
            E("%s: 必填欄位 mapZoom 應為有限數字" % tid)
        for field in ("mapCenter", "days", "spots"):
            if field not in t or t[field] in (None, [], ""):
                E("%s: 缺必填欄位 %s" % (tid, field))

        if isinstance(raw_id, str) and raw_id:
            if raw_id in ids:
                E("%s: id 重複" % tid)
            ids.add(raw_id)

        for theme_index, theme in enumerate(list_field(t, tid, "themes")):
            if not isinstance(theme, str):
                E("%s: themes[%d] 應為字串" % (tid, theme_index))

        for stay_index, stay in enumerate(list_field(t, tid, "stay")):
            if not isinstance(stay, dict):
                E("%s: stay[%d] 應為物件(目前 %r)" % (tid, stay_index, stay))

        flight = t.get("flight")
        if flight is not None:
            if not isinstance(flight, dict):
                E("%s: flight 應為物件(目前 %r)" % (tid, flight))
            else:
                for field in ("airline", "out", "back", "note"):
                    if field in flight and not isinstance(flight[field], str):
                        E("%s: flight.%s 應為字串" % (tid, field))

        pass_data = t.get("pass")
        if pass_data is not None:
            if not isinstance(pass_data, dict):
                E("%s: pass 應為物件(目前 %r)" % (tid, pass_data))
            else:
                head = pass_data.get("head")
                if head is not None:
                    if not isinstance(head, list):
                        E("%s: pass.head 應為陣列" % tid)
                    else:
                        for cell_index, cell in enumerate(head):
                            if not isinstance(cell, str):
                                E("%s: pass.head[%d] 應為字串" % (tid, cell_index))
                rows = pass_data.get("rows")
                if rows is not None:
                    if not isinstance(rows, list):
                        E("%s: pass.rows 應為陣列" % tid)
                    else:
                        for row_index, row in enumerate(rows):
                            if not isinstance(row, list):
                                E("%s: pass.rows[%d] 應為陣列" % (tid, row_index))
                                continue
                            for cell_index, cell in enumerate(row):
                                if not isinstance(cell, str):
                                    E("%s: pass.rows[%d][%d] 應為字串" %
                                      (tid, row_index, cell_index))

        ds_value, de_value = t.get("dateStart"), t.get("dateEnd")
        ds = parse_date(tid, "dateStart", ds_value)
        de = parse_date(tid, "dateEnd", de_value)
        if ds and de and de < ds:
            E("%s: dateEnd (%s) 早於 dateStart (%s)" % (tid, de_value, ds_value))
        if ds and isinstance(year, int) and not isinstance(year, bool) and year != ds.year:
            E("%s: year (%s) 與 dateStart (%s) 不一致" % (tid, year, ds_value))
        if not ds_value or not de_value:
            W("%s: 建議補 dateStart/dateEnd(狀態自動切換要靠它)" % tid)

        map_art = t.get("mapArt")
        if map_art not in (None, ""):
            unsafe = (not isinstance(map_art, str) or os.path.isabs(map_art)
                      or re.match(r"^[A-Za-z][A-Za-z0-9+.-]*:", map_art)
                      or ".." in map_art.replace("\\", "/").split("/"))
            if unsafe:
                E("%s: mapArt 必須是網站內的相對圖片路徑(目前 %r)" % (tid, map_art))
            else:
                path = os.path.realpath(os.path.join(HERE, map_art))
                try:
                    inside_site = os.path.commonpath((os.path.realpath(HERE), path)) == os.path.realpath(HERE)
                except ValueError:
                    inside_site = False
                image_ext = os.path.splitext(path)[1].lower() in {
                    ".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"
                }
                if not inside_site or not image_ext or not os.path.isfile(path):
                    E("%s: mapArt 不是網站內現有圖片 %r" % (tid, map_art))

        mc = t.get("mapCenter")
        valid_mc = (isinstance(mc, list) and len(mc) == 2
                    and all(_is_number(value) for value in mc)
                    and -90 <= mc[0] <= 90 and -180 <= mc[1] <= 180)
        if not valid_mc:
            E("%s: mapCenter 不合法 %r" % (tid, mc))
            mc = [None, None]

        days = list_field(t, tid, "days")
        daynos = []
        for day_index, day_data in enumerate(days):
            context = "%s: days[%d]" % (tid, day_index)
            if not isinstance(day_data, dict):
                E("%s 應為物件(目前 %r)" % (context, day_data))
                daynos.append(None)
                continue
            day = day_data.get("day")
            daynos.append(day)
            if not isinstance(day, int) or isinstance(day, bool):
                E("%s.day 應為整數" % context)
            for field in ("date", "theme"):
                if field in day_data and not isinstance(day_data[field], str):
                    E("%s.%s 應為字串" % (context, field))
            if "couple" in day_data and not isinstance(day_data["couple"], bool):
                E("%s.couple 應為布林值" % context)
            items = day_data.get("items")
            if not isinstance(items, list):
                E("%s.items 應為陣列" % context)
            else:
                if not items:
                    W("%s Day %s: items 為空" % (tid, day))
                for item_index, item in enumerate(items):
                    item_context = "%s.items[%d]" % (context, item_index)
                    if not isinstance(item, dict):
                        E("%s 應為物件(目前 %r)" % (item_context, item))
                        continue
                    for field in ("time", "text"):
                        if field in item and not isinstance(item[field], str):
                            E("%s.%s 應為字串" % (item_context, field))
                    if not item.get("time") or not item.get("text"):
                        W("%s Day %s: item 缺 time/text" % (tid, day))
            if "tips" in day_data:
                raw_tips = day_data["tips"]
            elif "tip" in day_data and day_data["tip"] is not None:
                raw_tips = [day_data["tip"]]
            else:
                raw_tips = []
            if not isinstance(raw_tips, list):
                E("%s.tips 應為陣列" % context)
            else:
                for tip_index, tip in enumerate(raw_tips):
                    tip_context = "%s.tips[%d]" % (context, tip_index)
                    if not isinstance(tip, dict):
                        E("%s 應為物件" % tip_context)
                        continue
                    for field in ("type", "title", "text"):
                        if field in tip and not isinstance(tip[field], str):
                            E("%s.%s 應為字串" % (tip_context, field))
                    if not isinstance(tip.get("title"), str) or not isinstance(tip.get("text"), str):
                        E("%s 缺必要的 title/text 字串" % tip_context)

        valid_daynos = [day for day in daynos
                        if isinstance(day, int) and not isinstance(day, bool)]
        maxday = max(valid_daynos or [0])
        if daynos != list(range(1, len(days) + 1)):
            W("%s: days[].day 未從 1 連號 %r" % (tid, daynos))

        for spot_index, spot in enumerate(list_field(t, tid, "spots")):
            context = "%s: spots[%d]" % (tid, spot_index)
            if not isinstance(spot, dict):
                E("%s 應為物件(目前 %r)" % (context, spot))
                continue
            name = spot.get("name")
            display_name = name if isinstance(name, str) and name else "(無名景點)"
            if not isinstance(name, str) or not name:
                E("%s.name 應為非空字串" % context)
            for field in ("area", "desc", "hours", "tel"):
                if field in spot and not isinstance(spot[field], str):
                    E("%s.%s 應為字串" % (context, field))
            ll = spot.get("latlng")
            valid_ll = (isinstance(ll, list) and len(ll) == 2
                        and all(_is_number(value) for value in ll))
            if not valid_ll:
                E("%s / %s: latlng 缺漏或格式錯 %r" % (tid, display_name, ll))
            else:
                lat, lng = ll
                if not (-90 <= lat <= 90 and -180 <= lng <= 180):
                    E("%s / %s: latlng 超出範圍 %r" % (tid, display_name, ll))
                elif mc[0] is not None and (abs(lat - mc[0]) > 5 or abs(lng - mc[1]) > 5):
                    W("%s / %s: 座標離 mapCenter 超過 5°,可能打錯 %r" % (tid, display_name, ll))
            day = spot.get("day")
            if day is not None and (not isinstance(day, int) or isinstance(day, bool)
                                    or not 1 <= day <= max(maxday, 1)):
                E("%s / %s: day=%r 不在 1–%d" % (tid, display_name, day, maxday))
            elif day is None:
                W("%s / %s: 缺 day(路線地圖會用中性色)" % (tid, display_name))
            validate_ref(spot.get("ref"), "%s / %s" % (tid, display_name))

        for food_index, food in enumerate(list_field(t, tid, "food")):
            context = "%s: food[%d]" % (tid, food_index)
            if not isinstance(food, dict):
                E("%s 應為物件(目前 %r)" % (context, food))
                continue
            name = food.get("name")
            display_name = name if isinstance(name, str) and name else "(無名美食)"
            if not isinstance(name, str) or not name:
                E("%s.name 應為非空字串" % context)
            for field in ("area", "note"):
                if field in food and not isinstance(food[field], str):
                    E("%s.%s 應為字串" % (context, field))
            stars = food.get("stars")
            if stars is not None and (not isinstance(stars, int) or isinstance(stars, bool)
                                      or not 1 <= stars <= 5):
                E("%s / 美食 %s: stars=%r 應為 1–5" % (tid, display_name, stars))
            validate_ref(food.get("ref"), "%s / 美食 %s" % (tid, display_name))

        for app_index, app in enumerate(list_field(t, tid, "apps")):
            context = "%s: apps[%d]" % (tid, app_index)
            if isinstance(app, str):
                continue
            if not isinstance(app, dict):
                E("%s 應為字串或物件(目前 %r)" % (context, app))
                continue
            if not isinstance(app.get("name"), str) or not app.get("name"):
                E("%s.name 應為非空字串" % context)
            if "note" in app and not isinstance(app["note"], str):
                E("%s.note 應為字串" % context)

        for weather_index, weather in enumerate(list_field(t, tid, "weather")):
            context = "%s: weather[%d]" % (tid, weather_index)
            if isinstance(weather, str):
                continue
            if not isinstance(weather, dict):
                E("%s 應為字串或物件(目前 %r)" % (context, weather))
                continue
            for field in ("month", "temp"):
                if not isinstance(weather.get(field), str) or not weather.get(field):
                    E("%s.%s 應為非空字串" % (context, field))
            for field in ("rain", "note"):
                if field in weather and not isinstance(weather[field], str):
                    E("%s.%s 應為字串" % (context, field))

        for note_index, note in enumerate(list_field(t, tid, "notes")):
            if not isinstance(note, str):
                E("%s: notes[%d] 應為字串" % (tid, note_index))

        validate_cards(t, tid, "info")
        validate_cards(t, tid, "tips")

        for budget_index, budget in enumerate(list_field(t, tid, "budget")):
            context = "%s: budget[%d]" % (tid, budget_index)
            if not isinstance(budget, dict):
                E("%s 應為物件(目前 %r)" % (context, budget))
                continue
            for field in ("item", "cost"):
                if not isinstance(budget.get(field), str) or not budget.get(field):
                    E("%s.%s 應為非空字串" % (context, field))
            if "total" in budget and not isinstance(budget["total"], bool):
                E("%s.total 應為布林值" % context)

    return errors, warns


def main():
    try:
        with open(TRIPS, encoding="utf8") as source:
            trips = js_to_json(source.read())
    except Exception as e:
        print("✗ trips.js 解析失敗:", e)
        return 1

    errors, warns = validate(trips)
    maintenance_errors, maintenance_warns = validate_maintenance.validate_file(trips)
    errors.extend(maintenance_errors)
    warns.extend(maintenance_warns)
    trip_items = trips if isinstance(trips, list) else []
    nspots = sum(len(t["spots"]) for t in trip_items
                 if isinstance(t, dict) and isinstance(t.get("spots"), list))
    print("✓ 解析成功:%d 趟行程、%d 個景點" % (len(trip_items), nspots))
    for w in warns:
        print("⚠", w)
    for e in errors:
        print("✗", e)
    print("—— %d 錯誤 / %d 警告" % (len(errors), len(warns)))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
