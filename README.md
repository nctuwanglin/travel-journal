# 行程集錦 ・ Travel Journal

收藏走過的旅程,也能當攻略分享給朋友的「行程集錦牆」。單檔靜態網站,雙擊 `index.html` 即可開啟,亦可部署到 GitHub Pages。

## 功能

- **集錦牆**：每趟旅程一張卡片,卡片頂部嵌入該區域的 OpenStreetMap 地圖、標出實際景點點位。
- **行程詳情**：航班/住宿/票券、每日行程(以新幹線軌道為視覺主軸的 timeline)、景點介紹、美食指南、預算與實用資訊,底部互動地圖。
- **可分享連結**:每趟行程有獨立網址(hash 路由),例如 `index.html#/trip/tohoku-2026`,可直接傳給朋友。
- **00 行程圖**:行程可掛一張手繪行程圖(`mapArt` 欄位,圖檔放 `img/`),顯示於詳情頁最上方「00 行程圖」區塊,右上「🗺 下載行程圖」可單獨下載。
- **下載旅遊書**:行程頁右上「⬇ 下載旅遊書」→ 直接產生 PDF 檔下載(專屬排版;有行程圖的行程,PDF 開頭即為行程圖)。
- **搜尋與篩選**:集錦牆可依國家、年份、主題、狀態篩選,並支援關鍵字搜尋(行程/景點/美食)。
- **足跡地圖與時間軸**:hero 足跡地圖標出所有行程(同區聚合、點標記直達行程);集錦牆可切換「卡片 / 時間軸」檢視。

## 檔案結構

```
index.html        # 單檔 SPA(集錦牆 + 行程詳情 + 列印排版)
data/trips.js     # 所有行程資料(window.TRIPS)
```

地圖使用 [Leaflet](https://leafletjs.com/) + OpenStreetMap / CARTO 圖磚,免 API key。

## 新增一趟旅程

編輯 `data/trips.js`,照既有 `tohoku-2026` 的 schema 在 `window.TRIPS` 陣列加一筆即可。重點欄位:

- `id`、`title`、`subtitle`、`country`、`region`、`year`、`dateLabel`、`status`
- `themes`、`tagline`
- `mapCenter: [lat, lng]`、`mapZoom` — 地圖視角
- `mapArt` — 手繪行程圖路徑(選填,如 `img/tohoku-2026.jpg`),掛上後出現「00 行程圖」區塊與下載按鈕
- `flight`、`stay[]`、`pass`、`days[]`(可加 `couple: true` → 每日行程軌道呈綠紅雙色,如新幹線連結日)、`spots[]`(每個含 `latlng` 與 `day` 造訪日 → 路線地圖按日分色)、`food[]`、`budget[]`、`apps[]`、`weather[]`、`notes[]`

景點 `latlng` 座標可用 Google Maps 右鍵「這是哪裡?」取得。

新增或修改後跑一次驗證(檢查缺欄位、緯經度顛倒、day 超界、日期格式等):

```bash
python3 validate_trips.py
```

## 部署到 GitHub Pages

```bash
git remote add origin <你的 repo URL>
git push -u origin main
```

在 GitHub repo → Settings → Pages → Source 選 `main` 分支根目錄,即可取得分享網址。
