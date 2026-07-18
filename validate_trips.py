#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""trips.js schema 驗證器 — 新增/修改行程後跑一次:

    python3 validate_trips.py

檢查項目:
  - 必填欄位(id/title/country/region/year/dateLabel/mapCenter/mapZoom/days/spots)
  - id 不重複、日期格式與先後、year 與 dateStart 一致
  - 經緯度範圍與「緯經度顛倒」偵測(紅點飛到海裡最常見的原因)
  - 景點離 mapCenter 過遠警告(> 5°,可能打錯座標)
  - spots[].day 需落在行程天數範圍內
  - days[].day 連號、items 非空;food[].stars 1–5;ref.url 需為 http(s)
有錯誤時以非零狀態碼結束(可接 CI)。
"""
import json, os, re, sys

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


def main():
    src = open(TRIPS, encoding="utf8").read()
    try:
        trips = js_to_json(src)
    except Exception as e:
        print("✗ trips.js 解析失敗:", e)
        return 1

    errors, warns = [], []
    E = lambda m: errors.append(m)
    W = lambda m: warns.append(m)

    ids = {}
    REQUIRED = ["id", "title", "country", "region", "year", "dateLabel",
                "mapCenter", "mapZoom", "days", "spots"]
    for t in trips:
        tid = t.get("id", "(無 id)")
        for k in REQUIRED:
            if not t.get(k):
                E("%s: 缺必填欄位 %s" % (tid, k))
        if tid in ids:
            E("%s: id 重複" % tid)
        ids[tid] = True

        ds, de = t.get("dateStart"), t.get("dateEnd")
        for label, v in (("dateStart", ds), ("dateEnd", de)):
            if v and not re.match(r"^\d{4}-\d{2}-\d{2}$", v):
                E("%s: %s 格式應為 YYYY-MM-DD(目前 %r)" % (tid, label, v))
        if ds and de and de < ds:
            E("%s: dateEnd (%s) 早於 dateStart (%s)" % (tid, de, ds))
        if ds and t.get("year") and str(t["year"]) != ds[:4]:
            E("%s: year (%s) 與 dateStart (%s) 不一致" % (tid, t["year"], ds))
        if not ds or not de:
            W("%s: 建議補 dateStart/dateEnd(狀態自動切換要靠它)" % tid)

        ma = t.get("mapArt")
        if ma and not os.path.exists(os.path.join(HERE, ma)):
            E("%s: mapArt 圖檔不存在 %r" % (tid, ma))

        mc = t.get("mapCenter") or [None, None]
        if not (isinstance(mc, list) and len(mc) == 2 and
                isinstance(mc[0], (int, float)) and isinstance(mc[1], (int, float)) and
                -90 <= mc[0] <= 90 and -180 <= mc[1] <= 180):
            E("%s: mapCenter 不合法 %r" % (tid, mc))
            mc = [None, None]

        days = t.get("days") or []
        daynos = [d.get("day") for d in days]
        maxday = max([d for d in daynos if isinstance(d, int)] or [0])
        if daynos != list(range(1, len(days) + 1)):
            W("%s: days[].day 未從 1 連號 %r" % (tid, daynos))
        for d in days:
            if not d.get("items"):
                W("%s Day %s: items 為空" % (tid, d.get("day")))
            for it in d.get("items") or []:
                if not it.get("time") or not it.get("text"):
                    W("%s Day %s: item 缺 time/text" % (tid, d.get("day")))

        for s in t.get("spots") or []:
            name = s.get("name", "(無名景點)")
            ll = s.get("latlng")
            if not (isinstance(ll, list) and len(ll) == 2 and
                    all(isinstance(x, (int, float)) for x in ll)):
                E("%s / %s: latlng 缺漏或格式錯 %r" % (tid, name, ll))
                continue
            lat, lng = ll
            if not (-90 <= lat <= 90 and -180 <= lng <= 180):
                E("%s / %s: latlng 超出範圍 %r" % (tid, name, ll))
            elif abs(lat) > abs(lng):
                E("%s / %s: latlng 疑似緯經度顛倒 %r(此站慣例 [緯度, 經度])" % (tid, name, ll))
            elif mc[0] is not None and (abs(lat - mc[0]) > 5 or abs(lng - mc[1]) > 5):
                W("%s / %s: 座標離 mapCenter 超過 5°,可能打錯 %r" % (tid, name, ll))
            day = s.get("day")
            if day is not None and (not isinstance(day, int) or not 1 <= day <= max(maxday, 1)):
                E("%s / %s: day=%r 不在 1–%d" % (tid, name, day, maxday))
            elif day is None:
                W("%s / %s: 缺 day(路線地圖會用中性色)" % (tid, name))
            ref = s.get("ref")
            if ref and ref.get("url") and not str(ref["url"]).startswith("http"):
                E("%s / %s: ref.url 不是 http(s) 連結" % (tid, name))

        for f in t.get("food") or []:
            st = f.get("stars")
            if st is not None and (not isinstance(st, int) or not 1 <= st <= 5):
                E("%s / 美食 %s: stars=%r 應為 1–5" % (tid, f.get("name"), st))
            ref = f.get("ref")
            if ref and ref.get("url") and not str(ref["url"]).startswith("http"):
                E("%s / 美食 %s: ref.url 不是 http(s) 連結" % (tid, f.get("name")))

    nspots = sum(len(t.get("spots") or []) for t in trips)
    print("✓ 解析成功:%d 趟行程、%d 個景點" % (len(trips), nspots))
    for w in warns:
        print("⚠", w)
    for e in errors:
        print("✗", e)
    print("—— %d 錯誤 / %d 警告" % (len(errors), len(warns)))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
