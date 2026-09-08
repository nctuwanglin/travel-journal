# 行程集錦 ・ Travel Journal

收藏走過的旅程，也能當攻略分享給朋友的靜態網站。可直接雙擊 `index.html`，以 `file://` 開啟；也可部署到 GitHub Pages。頁面本身不需要建置，但字型、Leaflet、地圖圖磚與 PDF 產生套件來自外部服務，使用相關功能時仍需連上網路。

## 功能

- **集錦牆**：每趟旅程一張卡片，可依國家、年份、主題、狀態與關鍵字篩選。
- **行程詳情**：顯示航班、住宿、票券、每日行程、景點、美食、預算與實用資訊。
- **地圖與時間軸**：首頁足跡地圖、行程路線地圖，以及卡片／時間軸檢視。
- **可分享連結**：每趟行程有獨立 hash 網址，例如 `index.html#/trip/tohoku-2026`。
- **行程圖與旅遊書**：`mapArt` 可加入本機行程圖；行程頁可下載行程圖及產生 PDF 旅遊書。

## 檔案結構

```text
index.html        # 靜態 SPA、畫面與行程渲染邏輯
data/trips.js     # 所有行程資料，匯出為 window.TRIPS
data/maintenance.js # 行程圖版本、資料查核來源與快照紀錄
img/              # mapArt 使用的本機行程圖
trip-maintenance.js # 網頁與 CLI 共用的快照和狀態判定
tools/maintenance.cjs # 維護紀錄 CLI
pdf-book.js       # PDF 分頁、產生與下載邏輯
pdf-book.css      # PDF 固定頁面排版
```

`index.html` 可直接讀取同目錄檔案，因此不必啟動伺服器即可瀏覽。地圖使用 Leaflet 與 CARTO 圖磚，不需要 API key。

含行程圖的 PDF 需從 HTTP(S) 下載；若直接雙擊 HTML，請依維護指南啟動本機預覽後再匯出。

## 新增一趟旅程

編輯 `data/trips.js`，參考 `tohoku-2026` 在 `window.TRIPS` 陣列新增一筆。主要欄位如下：

- 基本資料：`id`、`title`、`subtitle`、`country`、`region`、`year`、`dateLabel`、`dateStart`、`dateEnd`、`status`
- 顯示資料：`themes`、`tagline`、`flight`、`stay[]`、`pass`、`days[]`、`spots[]`、`food[]`、`budget[]`、`notes[]`
- 地圖資料：`mapCenter: [lat, lng]`、`mapZoom`，以及每個景點的 `latlng: [lat, lng]` 與 `day`
- 行程圖：選填 `mapArt`，使用 `img/` 下的本機圖片，例如 `img/tohoku-2026.jpg`
- 實用資訊：`apps` 可放字串或 `{name, note}`；`weather` 可放字串或 `{month, temp, rain, note}`
- 自訂資訊卡：建議使用 `info: [{title, items}]`，其中 `title` 是字串，`items` 是字串陣列。舊資料的頂層 `tips` 格式仍受支援，新資料請優先使用 `info`

修改後執行：

```bash
python3 -B validate_trips.py
python3 -B -m unittest discover -s tests -p 'test_*.py'
node --test tests/*.test.cjs
```

行程資料或圖片更新後，也要查看維護狀態：

```bash
node tools/maintenance.cjs status
```

行程圖版本確認與景點、餐廳、交通、預算等資料的來源查核會寫入 `data/maintenance.js`。請先人工確認內容，再用 CLI 建立紀錄；詳細參數與狀態說明見維護指南。

完整的資料檢查、瀏覽器驗證、PDF 驗收與發布步驟請見 [維護指南](docs/MAINTENANCE.md)。

## 部署到 GitHub Pages

正式發布使用 `.github/workflows/pages.yml`。GitHub repo 的 **Settings → Pages → Source** 應設為 **GitHub Actions**；推送至 `master` 後，工作流程會先驗證，再只上傳網站執行所需檔案。只有使用者明確要求發布時才推送 `master`。
