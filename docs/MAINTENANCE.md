# 行程集錦維護指南

## 執行方式與檔案責任

網站維持純靜態架構，直接以 `file://` 開啟 `index.html` 受支援，不需要安裝套件或啟動本機伺服器。Google Fonts、Leaflet、CARTO 地圖圖磚與 html2pdf 由外部服務載入，因此完整顯示地圖、網路字型和下載 PDF 仍需要網路。

- `index.html`：頁面結構、樣式、hash 路由、資料轉成畫面以及互動地圖。
- `data/trips.js`：唯一的行程資料來源，設定 `window.TRIPS`。
- `data/maintenance.js`：行程圖版本、資料來源、查核日期與當時資料快照。
- `img/`：`mapArt` 指向的本機圖片。不要使用外部圖片 URL 或目錄外路徑。
- `trip-maintenance.js`：網頁與 CLI 共用的快照內容及狀態判定規則。
- `tools/maintenance.cjs`：建立、更新及查看維護紀錄的命令列工具。
- `pdf-book.js`：把目前行程內容分成固定 A4 頁面並產生下載檔。
- `pdf-book.css`：PDF 專用頁面尺寸與排版。

## 新增或更新行程

動手前先備份 `data/trips.js` 與準備替換的圖片，或確認變更已由 Git 保存。完成後逐項檢查 diff，避免排序、標點或格式化造成無關的行程內容改寫。

每趟行程至少檢查：

1. `dateStart`、`dateEnd` 是存在的日曆日期，格式為 `YYYY-MM-DD`，先後順序正確，且 `year` 與開始年份一致。
2. `id` 在所有行程中唯一；`days[].day` 從 1 開始依序排列，`spots[].day` 落在行程天數內。
3. `mapCenter` 與所有 `spots[].latlng` 均採 `[緯度, 經度]`，緯度介於 -90 到 90、經度介於 -180 到 180。座標支援全球地點，不可用「緯度絕對值應小於經度」之類的地區假設判斷顛倒。
4. `mapArt` 若存在，必須指向 `img/` 內實際存在的本機圖片。
5. 行程圖與每日行程應一起更新，並人工逐日比對地名、路線與日期。`data/maintenance.js` 可記錄圖片版本並偵測行程快照變動，但不能自行判斷圖片內容與行程是否一致；只有人工確認後才能標記為 aligned。

實用資訊支援以下資料格式：

```js
apps: [
  "Google Maps",
  {name: "MTR Mobile", note: "查詢路線"}
],
weather: [
  "早晚溫差大",
  {month: "6 月", temp: "18–25°C", rain: "偏低", note: "帶薄外套"}
],
info: [
  {title: "預約提醒", items: ["博物館", "晚餐"]}
]
```

`info` 的標準格式是 `{title, items}`，`title` 必須是字串，`items` 必須是字串陣列。舊資料的頂層 `tips: [{title, items}]` 仍會顯示；新增資料請使用 `info`，不要為了改格式批次重寫既有資料。

## 行程圖版本追蹤

第一次加入追蹤檔時執行：

```bash
node tools/maintenance.cjs init
```

`init` 只會為尚未追蹤且有 `mapArt` 的行程建立目前狀態的 baseline，不會覆寫既有紀錄，也不代表圖片已與行程核對完成。目前 `tohoku-2026` 與 `shikoku-2026` 的初始紀錄均為 `aligned: false`，`version`、`updatedAt`、`prompt` 皆為 `null`；這只是 2026-09-07 建立的追蹤基準，不應補造圖片的舊版本、產圖日期或提示詞。

每次更新行程或行程圖後先看狀態：

```bash
node tools/maintenance.cjs status
```

行程圖狀態如下：

- `none`：此行程沒有 `mapArt`。
- `untracked`：有行程圖，但尚未建立追蹤紀錄。
- `unconfirmed`：路徑與行程快照未變，但尚未人工確認一致。
- `aligned`：路徑與行程快照未變，且上次已人工確認一致。
- `stale`：行程快照或圖片路徑與紀錄不符，需要更新圖片並重新核對。
- `image-changed`：圖片路徑相同，但檔案 SHA-256 已改變。這項狀態由 CLI `status` 判定，資料驗證器也會報出 hash 不一致。

瀏覽器無法可靠讀取本機圖片檔案的 SHA-256，因此網頁只能比較 baseline 快照與 `mapArt` 路徑；同檔名覆蓋圖片時，務必以 CLI `status` 和 `python3 -B validate_trips.py` 檢查。

行程與圖片逐日人工比對完成後，才可寫入已對齊紀錄：

```bash
node tools/maintenance.cjs record-map \
  --trip tohoku-2026 \
  --version v2 \
  --date 2026-09-07 \
  --confirm-aligned
```

`--trip` 是行程 id；`--version` 與 `--date` 必填，日期須為真實且不晚於今天的 `YYYY-MM-DD`。`--confirm-aligned` 是人工核對的明確聲明，不能只因驗證器通過就加入。若本次有保留實際產圖提示詞，可選擇加入 `--prompt-file /path/to/prompt.txt`；未提供時 `prompt` 會記為 `null`。

## 資料來源查核

先列出某趟行程可查核的目標與精確 key：

```bash
node tools/maintenance.cjs targets --trip tohoku-2026
```

目標 key 包含 `flight`、`pass`、`spot:<名稱>`、`spot-ref:<名稱>`、`food:<名稱>`、`food-ref:<名稱>` 與 `budget:<項目>`；實際可用值以 `targets` 的輸出為準，含空格或符號的 key 請加引號。

實際閱讀來源並確認目前內容後，記錄該目標：

```bash
node tools/maintenance.cjs record-check \
  --trip tohoku-2026 \
  --target 'spot:猊鼻溪' \
  --source-url 'https://example.com/official-page' \
  --source-title '官方網站' \
  --date 2026-09-07
```

`--trip`、`--target`、`--source-url`、`--source-title`、`--date` 全部必填；來源網址只接受 HTTP(S)，日期須真實且不晚於今天。紀錄會綁定該目標當下的具體 snapshot。之後只要目標資料變動，網頁與 `status` 就會標示為 `changed`，需重新查核並寫入新紀錄；單純保留舊來源不能視為目前資料已確認。

## 自動驗證

在專案根目錄依序執行：

```bash
python3 -B validate_trips.py
python3 -B -m unittest discover -s tests -p 'test_*.py'
node --test tests/*.test.cjs
```

第一個指令檢查實際行程與維護紀錄，第二個涵蓋驗證器的錯誤與相容格式，第三個檢查前端渲染、地圖篩選、快照失效與維護 CLI。

瀏覽器人工回歸需透過 HTTP 開啟，避免瀏覽器對 `file://` iframe 的限制：

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

接著開啟 `http://127.0.0.1:8765/tests/browser.html`。確認頁面顯示 PASS；完成後在啟動伺服器的終端按 `Ctrl-C`。這項檢查包含 390px 與全部行程的 320px 手機版、PDF 內容保留與長表格／長行程分頁。

CI 會執行相同的 Python 與 Node 檢查，並另外執行：

```bash
npm ci
npx playwright install --with-deps chromium
npm run test:browser
```

CI 也會實際匯出三份 PDF，同時檢查下載事件與下載目錄的新檔案，確認 PDF 檔頭、結尾與檔案大小。樣本保留於該次 Actions 的 `pdf-regression-samples` artifact（7 天），供逐頁檢視；自動檢查不能取代視覺驗收。

## PDF 人工驗收

含行程圖的 PDF 請由 HTTP(S) 網站下載，例如上面的本機預覽網址。`file://` 雙擊瀏覽仍可使用，但瀏覽器對本機圖片的 canvas 來源限制會阻擋含圖 PDF，頁面會提示改用 HTTP 預覽。

PDF 驗收使用三趟代表行程：

- `tohoku-2026`：有行程圖的一般行程。
- `shikoku-2026`：有行程圖的長行程。
- `hokkaido-2013`：沒有行程圖，且含舊格式實用資訊。

每趟都從行程頁按「下載旅遊書」。驗證下載成功時，先記錄 `Downloads` 中同名檔案的原始清單與時間，再下載，最後比較前後狀態；必須找到實際新增的 PDF，記錄它在磁碟上的實際檔名，並確認時間戳為本次操作。預期檔名為 `<region>_<year>_旅遊書.pdf`；若同名檔已存在，瀏覽器可能自動加上流水號。不要只依賴瀏覽器的 download 事件，事件發生不代表檔案已正確寫入。

打開 PDF，逐頁確認：行程圖有無符合資料、沒有空白或裁切頁、章節標題未落單、每日行程與表格資料完整、頁碼連續、中文字正常，且外部參考連結可點擊。若電腦已安裝 Poppler，可把 PDF 渲染成圖片輔助逐頁檢查：

```bash
mkdir -p /private/tmp/travel-pdf-check
pdftoppm -png -r 120 '/path/to/Downloads/檔名.pdf' /private/tmp/travel-pdf-check/page
```

`pdftoppm` 與影像檢視工具是選用的本機依賴，不屬於網站執行需求。檢查產物留在 `/private/tmp`，不要加入發布內容。

## 發布與復原

正式站使用 `.github/workflows/pages.yml`，觸發分支是 `master`。GitHub repo 的 **Settings → Pages → Source** 必須設為 **GitHub Actions**。發布前上述驗證必須全部通過，並完成變更審查；只有使用者明確要求發布時才推送 `master`。

工作流程中的網站打包步驟（`deploy-site` 目錄）只應收集網站執行所需資產，例如 `index.html`、`data/trips.js`、`data/maintenance.js`、`img/`、`trip-maintenance.js`、`pdf-book.js`、`pdf-book.css`、`og-image.png` 與 `.nojekyll`。測試、CLI 工具、維護文件、套件安裝目錄、備份檔、下載的 PDF 與 `/private/tmp` 檢查產物都不應發布。

若更新後發現資料或版面問題，先停止發布，保留失敗輸出與 PDF 樣本，再用 Git diff 找出本次變更。從先前備份或 Git 還原受影響的行程資料與圖片後，重新執行完整驗證及人工檢查；不要用未審查的整檔覆寫其他人的變更。

## 手機旅行模式（第 12 項）

每趟行程上方「手機旅行模式」可開啟單日閱讀畫面：今天行程、日期選單、前後一天、當日提醒及景點導航。手機為全螢幕，桌面為置中視窗，關閉或 Esc 可回原頁。旅程外顯示預覽／回顧，不把 Day 1 誤標為今天。

`travel-mode.js` 讀取既有 `dateStart/dateEnd`、`days[].day/items/tips/tip` 與 `spots[].day`，不修改行程或版本快照。目前支援日本、韓國、越南、中國、台灣、香港時區；新增其他國家或跨時區行程時需擴充時區規則，未知國家明示採裝置時區。「今天」按鈕每 30 秒更新狀態，跨日不強制跳離使用者正在閱讀的日期。

導航用國家、地區及景點名稱建立 Google Maps 路線網址，讓使用者確認入口及交通方式；不把湖中心等概略標記當作精確入口。不要求定位權限、不宣稱離線導航。URL 格式依 [Google 官方文件](https://developers.google.com/maps/documentation/urls/get-started)。

`travel-mode.css` 負責獨立樣式。視窗放在 PDF 來源 `.trip` 外，旅遊書維持全行程。新增資產已列入 Pages 發布白名單；維護時記得同步更新 index 的資產版本參數。`tests/travel-preview.html` 提供 390px 手動預覽；`tests/browser.html` 包含所有行程的窄螢幕操作與日期模擬，Node 測試驗證日期邊界與導航網址。
