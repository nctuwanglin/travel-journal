# 儀表板第一批補強計畫

> For agentic workers: use superpowers:subagent-driven-development to implement and review the independent tasks.

**Goal:** 完成使用者確認的第 1–9 項補強。
**Architecture:** 保持靜態 HTML/JS 與 file:// 開啟方式。資料格式採相容讀取；PDF 先以 DOM 測量分頁，再逐頁渲染，保留直接下載。
**Tech Stack:** 原生 JS、Leaflet、html2pdf、Python unittest、Node test。
**Spec:** 本次對話使用者確認的第一批第 1–9 項清單。

## Global Constraints
- 不改旅遊安排內容；不推送或發布。
- 使用現有工作目錄交付可檢視變更，無其他使用者未提交修改。
- 暫存 PDF 與畫面驗證檔放 /private/tmp，不放入發布內容。

## Tasks / progress
- [x] 1. index.html：統一地圖排序；相容 apps/weather 物件與 tips 卡片。tests/render.test.cjs 以真實資料檢查文字與篩選結果，先確認失敗再修復。
- [x] 2. index.html：手機表格自適應；pdf-book.js：以內容區塊分頁、標題跟隨首段、表格逐列切分、每日行程必要時按停靠點拆分；固定頁面逐頁產生 PDF，保留連結、加頁碼與錯誤清理。瀏覽器驗證 390px 與 PDF 圖像。
- [x] 3. validate_trips.py / tests/test_validate_trips.py：真實日期、全球座標、實用資訊格式與型別、路徑驗證；加入錯誤案例與全資料回歸。
- [x] 4. .github/workflows/pages.yml：發布前執行 Python/Node 檢查，只打包網站檔案；README.md / docs：新增與更新行程、行程圖、驗證、master/Actions 發布流程與 PDF 驗證。
- [x] 5. 有圖東北、有圖長行程四國、無圖北海道 2013，實際下載並逐頁渲染檢查；完整自動檢查與獨立 code review。

## Decisions
- 資料顯示支援舊格式而不批次改寫 trips.js，避免旅遊文字發生無關變動。
- PDF 的全頁截圖切割改為逐頁輸出；測試流程以實際新增 PDF 檔案作為下載證據，下載事件只作輔助。
- 技能中的額外設計確認不重複要求；使用者已明確確認完整實作範圍。

## Final verification
See docs/VERIFICATION.md for executed tests, 33 inspected PDF pages, and remote CI boundary.
