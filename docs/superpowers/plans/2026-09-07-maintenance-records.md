# 第二批：行程圖版本與資料查核紀錄

> For agentic workers: use superpowers:subagent-driven-development for independent validator review and final code review.

**Goal:** 完成使用者核准的第 10–11 項，保留第一批修正。
**Architecture:** 新增 data/maintenance.js 紀錄來源日期、快照與產圖提示詞；trip-maintenance.js 共用純函數比對快照；Node 維護工具寫入 JSON-compatible JS。網站與 PDF 呈現同步狀態；Python 驗證整合現有 CI。
**Tech Stack:** 原生 JS / Node / Python，沿用現有瀏覽器與 PDF 測試。
**Spec:** 本次對話使用者核准的第二批第 10–11 項。

## Scope
- 不推送發布、不變更旅遊安排、不假造過去查核日期或原始產圖提示詞。
- 舊行程沒有紀錄時顯示尚未查核；有圖片但未確認一致時顯示待確認。
- 紀錄包含內容快照，修改旅遊安排或已查核內容即顯示待更新。

## Tasks
- [x] 純函數/工具：mapSnapshot、targets、mapState、checkState、summary；Node CLI init/status/record-map/record-check。先建立失敗測試。
- [x] 初始 metadata：僅為兩張既有圖記錄追蹤基準，aligned=false，updatedAt/version/prompt=null；checks 保留空白。
- [x] 網站：00 圖片版本資訊、封面歷史/待查核摘要、票券航班/景點/預算/推薦連結查核日期與來源。
- [x] 驗證：新 schema、日期/來源/目標/快照與缺漏/過期狀態；接入現有 CLI 與測試。
- [x] PDF：保留行程圖狀態與各項查核資訊，驗證代表行程及有紀錄 fixture。
- [x] 文件/CI資產清單/完整測試/獨立審查。
