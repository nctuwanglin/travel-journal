/* 旅遊行程集錦 — 行程資料
 * 以 window.TRIPS 全域掛載,讓 file:// 雙擊開啟與 GitHub Pages 皆可運作 (避開 fetch/CORS)。
 * 新增旅程:照同一 schema 在陣列裡多加一筆即可。
 */
window.TRIPS = [
  {
    id: "tohoku-2026",
    title: "日本東北自由行",
    subtitle: "宮城・岩手・秋田・福島",
    country: "日本",
    region: "東北",
    year: 2026,
    dateLabel: "8/21 – 8/26",
    dateStart: "2026-08-21",
    dateEnd: "2026-08-26",
    nights: 5,
    status: "即將出發",
    recommended: true,
    tagline: "新幹線 E5+E6 連結奇景・田澤湖深藍・角館武家屋敷",
    themes: ["新幹線", "祕境峽谷", "親子", "美食"],
    mapCenter: [39.2, 140.85],
    mapZoom: 7,

    flight: {
      airline: "星宇航空 STARLUX",
      out: "8/21 桃園 TPE → 仙台 SDJ",
      back: "8/26 仙台 SDJ → 桃園 TPE",
      note: "機場快線:仙台機場 ↔ 仙台站 約 25 分"
    },
    stay: [
      { name: "仙台維斯汀酒店", nights: "前 3 晚", rating: 4.4, note: "高級商務 / TEL +81-22-722-1234" },
      { name: "仙台大都會飯店東口", nights: "後 2 晚", rating: 4.2, note: "仙台站東口直結 / TEL +81-22-268-2233" }
    ],
    pass: {
      icon: "🚄", label: "交通票券",
      name: "JR East Pass(東北・信越版)6 日券",
      price: "約 ¥30,000",
      head: ["路段", "車種", "時間"],
      rows: [
        ["仙台 ↔ 盛岡", "E5 はやぶさ", "約 35 分"],
        ["盛岡 → 角館", "E6 こまち", "約 45 分"],
        ["仙台 ↔ 福島", "E5 やまびこ", "約 25 分"],
        ["田澤湖 → 盛岡 → 仙台", "E6 + E5", "約 1.5 小時"]
      ]
    },

    days: [
      {
        day: 1, date: "8/21 (五)", theme: "✈ 抵達仙台",
        items: [
          { time: "下午", text: "星宇航空抵達仙台機場(SDJ)" },
          { time: "抵達後", text: "搭機場快線至仙台站(約 25 分,¥660)辦理入住" },
          { time: "傍晚", text: "散步仙台站 S-PAL 購物中心,添購生活用品" },
          { time: "晚上", text: "國分町吃牛舌!推薦「利久」或「喜助」,感受仙台夏夜" }
        ],
        tip: { type: "info", title: "小提醒", text: "仙台機場快線班次密集,可直接購票。入住後先規劃隔日路線,下載 Google Maps 離線地圖。" }
      },
      {
        day: 2, date: "8/22 (六)", theme: "🚄 岩手一日遊 — 盛岡 + 猊鼻溪",
        items: [
          { time: "07:00", text: "仙台站搭 E5 はやぶさ → 盛岡站(約 35 分)" },
          { time: "08:15", text: "盛岡站月台親眼目睹 E5+E6 連結/分裂奇景!往秋田的こまち與往青森的はやぶさ在此合體分離" },
          { time: "09:30", text: "盛岡 → 一ノ關(E5,約 30 分)→ 大船渡線 → 猊鼻溪站(約 30 分)" },
          { time: "11:00", text: "猊鼻溪舟遊(¥2,000,來回約 90 分)奇岩峭壁、船夫民謠吟唱、小鴨隨行" },
          { time: "13:30", text: "猊鼻溪午餐後,一ノ關站 → 新幹線返仙台(約 30 分)" },
          { time: "17:00", text: "抵仙台,晚餐:ずんだ餅甜點 + 仙台海鮮" }
        ],
        tip: { type: "warn", title: "注意事項", text: "猊鼻溪末班船約 15:00,請注意時刻表!猊鼻溪電話:+81-191-47-2341" }
      },
      {
        day: 3, date: "8/23 (日)", theme: "🏯 秋田一日遊 — 角館 + 田澤湖",
        items: [
          { time: "07:30", text: "仙台站搭 E6 こまち(盛岡換乘)→ 角館站(約 1 小時 45 分)" },
          { time: "09:30", text: "角館武家屋敷街(⭐4.4)江戶時代黑圍牆老街,武士宅邸漫步" },
          { time: "11:00", text: "青柳家屋敷參觀(甲冑・古文物展示,¥500)" },
          { time: "12:30", text: "角館午餐:比內地雞料理・稻庭烏龍麵" },
          { time: "14:00", text: "搭新幹線 → 田澤湖站(約 15 分),轉搭環湖巴士" },
          { time: "14:30", text: "田澤湖(⭐4.4)辰子像打卡・環湖巴士(¥1,210)・高速遊覽船(40 分)" },
          { time: "17:00", text: "返仙台(田澤湖 → 盛岡 → 仙台,E6+E5,約 1.5 小時)" }
        ],
        tip: { type: "info", title: "小提醒", text: "角館至田澤湖車程僅 15 分,兩地合一天剛好!比內地雞烤肉定食是秋田必吃。" }
      },
      {
        day: 4, date: "8/24 (一)", theme: "🍑 福島採水蜜桃 + 麵包超人博物館",
        items: [
          { time: "08:30", text: "仙台搭 E5 やまびこ → 福島站(約 25 分)" },
          { time: "09:30", text: "福島採水蜜桃!伊達市桑折一帶果園,8 月白桃盛產期,現採現吃超甜" },
          { time: "12:00", text: "福島站午餐:圓盤餃子・いか人參等福島名物" },
          { time: "13:30", text: "搭新幹線返仙台(約 25 分),計程車或公車往仙台港" },
          { time: "14:00", text: "麵包超人兒童博物館(⭐4.2,10:00–17:00)角色麵包・舞台表演・戶外水上遊樂" },
          { time: "17:00", text: "返仙台站,晚餐" }
        ],
        tip: { type: "warn", title: "務必提前預約", text: "水蜜桃農園旺季須提前預約!推薦「だて・カベジフル農園」TEL +81-24-582-4560。麵包超人博物館建議購 Klook 套票。" }
      },
      {
        day: 5, date: "8/25 (二)", theme: "🐬 仙台市區 — 水族館 + 三井 Outlet",
        items: [
          { time: "09:00", text: "仙台海洋森林水族館(⭐4.2,9:00–17:30)停留約 3 小時" },
          { time: "09:00–12:00", text: "沙丁魚旋風秀・海豚 & 海獅表演・企鵝大遊行" },
          { time: "12:30", text: "仙台港附近午餐" },
          { time: "14:00", text: "三井 Outlet 仙台港(10:00–20:00)步行 10 分即達,東北最大 Outlet!" },
          { time: "14:00–19:00", text: "Coach・Nike・Adidas・無印良品・BEAMS 等品牌特價" },
          { time: "19:30", text: "返仙台站,最後晚餐 + 採購伴手禮" }
        ],
        tip: { type: "info", title: "小提醒", text: "水族館 + Outlet 同在仙台港,這天完全不用移動!仙台港公車從仙台站約 20 分。" }
      },
      {
        day: 6, date: "8/26 (三)", theme: "✈ 返回台北",
        items: [
          { time: "早上", text: "S-PAL 仙台最後採購:萩の月・牛舌・ずんだ餅・笹かまぼこ" },
          { time: "出發前", text: "仙台站 → 機場快線 → 仙台機場(約 25 分)" },
          { time: "機場", text: "星宇航空辦理報到,建議提前 2 小時抵達" },
          { time: "回程", text: "仙台(SDJ)→ 台北桃園(TPE),滿載而歸!" }
        ],
        tip: { type: "info", title: "伴手禮清單", text: "萩の月、牛舌真空包、ずんだ餅、笹かまぼこ、福島水蜜桃(可宅配回飯店再帶回)。" }
      }
    ],

    spots: [
      {
        name: "猊鼻溪", area: "岩手縣", rating: 4.4, tel: "+81-191-47-2341", hours: "8:30–16:00",
        latlng: [38.9876, 141.2167],
        desc: "世界遺產等級的天然峽谷,搭平底木船沿溪而行,兩岸奇岩峭壁高聳入雲。船夫以竹竿撐船,歸程時用低沉嗓音吟唱岩手古調,迴響於峽谷間令人動容。小鴨會主動靠近討食,超療癒!費用 ¥2,000/人,來回約 90 分鐘。",
        ref: { title: "果子的腳印・猊鼻溪 & 嚴美溪深度攻略", url: "https://footprints.tw/blog/post/222243907" }
      },
      {
        name: "角館武家屋敷街", area: "秋田縣", rating: 4.4, hours: "距角館站步行約 15 分",
        latlng: [39.6003, 140.5667],
        desc: "被譽為「小京都」的江戶時代武士街,300 年歷史的黑圍牆老宅保存完整。青柳家屋敷規模最大,展示鎧甲武器與生活文物(¥500)。春天櫻花配武家屋敷是絕景,夏天綠意盎然同樣迷人。",
        ref: { title: "BringYou・角館武家屋敷散策(交通+必看)", url: "https://www.bring-you.info/zh-tw/kakunodate" }
      },
      {
        name: "田澤湖", area: "秋田縣", rating: 4.4, hours: "日本最深的湖(423.4m)",
        latlng: [39.7236, 140.6628],
        desc: "湖水因含鋁呈現夢幻湛藍色,晴天水色隨光線變幻如寶石。湖畔有辰子像(傳說化為龍的美女),可搭環湖巴士(¥1,210)欣賞各角度湖景,或乘高速遊覽船(約 40 分)感受深邃藍色。附近有乳頭溫泉鶴の湯,可當日入浴(建議預約)。",
        ref: { title: "莉莉安小貴婦・田澤湖辰子姬像", url: "https://lilliansblog.com/tazawako/" }
      },
      {
        name: "福島水蜜桃", area: "福島縣", hours: "旺季 7 月下旬–9 月上旬",
        latlng: [37.8214, 140.5006],
        desc: "福島縣是日本最著名的桃產區,伊達市年產量全國頂尖。8 月正值白桃盛產,現採的桃子入口即化、香甜多汁,是台灣買不到的頂級滋味。B 級品(外觀不完美)一箱 ¥1,000–¥1,500,極為超值!可宅配回飯店。",
        ref: { title: "福寶媽・福島採水蜜桃 marusei 果樹園", url: "https://gojp.tw/fukushima-marusei/" }
      },
      {
        name: "仙台海洋森林水族館", area: "宮城縣", rating: 4.2, tel: "+81-22-355-2222", hours: "9:00–17:30",
        latlng: [38.2697, 141.0125],
        desc: "仙台最人氣水族館,主要展示三陸海域生物。必看表演:「沙丁魚旋風秀」萬條沙丁魚組成陣型壯觀無比;海豚 & 海獅表演活潑有趣;每日企鵝大遊行萌度爆表。入場費成人 ¥2,400,建議預訂 Klook 套票較便宜。",
        ref: { title: "福寶媽・仙台海洋森林水族館爆走企鵝", url: "https://gogojp.tw/sendai-uminomori/" }
      },
      {
        name: "麵包超人博物館", area: "宮城縣", rating: 4.2, tel: "+81-22-298-8855", hours: "10:00–17:00",
        latlng: [38.2722, 140.9508],
        desc: "親子同遊首選!佔地寬廣,各房間重現動畫場景。入口麵包店售賣現烤角色麵包(可愛到捨不得吃);舞台定時表演,即使不懂日文孩子也看得開心;戶外水上遊樂區(8 月超涼爽,記得帶換洗衣物)。",
        ref: { title: "樂活的大方・仙台麵包超人博物館", url: "https://www.bigfang.tw/blog/post/30786806" }
      }
    ],

    food: [
      { name: "牛舌定食(牛たん)", area: "仙台", stars: 5, note: "必吃!", ref: { title: "樂活的大方・仙台牛舌推薦 12 間", url: "https://www.bigfang.tw/blog/post/sendai-gyutan" } },
      { name: "ずんだ餅", area: "仙台", stars: 4, note: "甜點必備", ref: { title: "凱子凱・萩の月 & ずんだ茶寮", url: "https://ksk.tw/2023-11-30-2313/" } },
      { name: "萩の月(伴手禮)", area: "仙台", stars: 5, note: "最經典", ref: { title: "樂吃購・仙台伴手禮 10 選", url: "https://tohoku.letsgojp.com/archives/520098/" } },
      { name: "笹かまぼこ", area: "仙台", stars: 4, note: "魚板零食", ref: { title: "樂吃購・仙台伴手禮 10 選", url: "https://tohoku.letsgojp.com/archives/520098/" } },
      { name: "福島水蜜桃", area: "福島", stars: 5, note: "超甜!", ref: { title: "福寶媽・福島採水蜜桃 marusei", url: "https://gojp.tw/fukushima-marusei/" } },
      { name: "稻庭烏龍麵", area: "秋田", stars: 4, note: "細滑 Q 彈", ref: { title: "莉莉安・寬文五年堂稻庭烏龍麵", url: "https://lilliansblog.com/kanbun/" } },
      { name: "比內地雞料理", area: "秋田", stars: 5, note: "秋田名物", ref: { title: "小氣少年・秋田比內地雞 & 稻庭烏龍麵", url: "https://nicklee.tw/2339/akita-gourmet-hinaijidori-udon/" } },
      { name: "三陸海鮮", area: "宮城", stars: 5, note: "新鮮美味", ref: { title: "Wen・仙台必吃 13 間餐廳", url: "https://www.wenthetravelbegins.com/sendai-foodie-guide/" } }
    ],

    budget: [
      { item: "JR East Pass(6 日)", cost: "約 ¥30,000" },
      { item: "住宿 5 晚(維斯汀 3 + 大都會 2)", cost: "約 ¥65,000–80,000" },
      { item: "每日餐食", cost: "約 ¥3,000–5,000" },
      { item: "景點門票(水族館/猊鼻溪/田澤湖/麵包超人)", cost: "約 ¥10,000" },
      { item: "總預算估算(不含機票)", cost: "約 ¥120,000–150,000", total: true }
    ],
    apps: [
      "Google Maps(離線地圖)",
      "Hyperdia 或 Navitime(日本電車時刻查詢)",
      "Google 翻譯(相機即時翻譯超實用)",
      "JR East 官方 App(新幹線時刻 + 購票)"
    ],
    weather: [
      "仙台:平均氣溫 27°C,濕熱,偶有陣雨",
      "田澤湖山區:較涼爽,建議備薄外套",
      "建議攜帶:防曬、摺疊傘、輕薄透氣衣物"
    ],
    notes: [
      "水蜜桃農園、麵包超人博物館旺季務必提前預約。",
      "猊鼻溪末班船約 15:00,行程務必抓緊時刻表。",
      "新幹線指定席建議事先劃位,旺季座位較緊。"
    ]
  },

  {
    id: "okinawa-2026",
    title: "沖繩包棟之旅",
    subtitle: "那霸・恩納・本部 ・ 西海岸自駕",
    country: "日本",
    region: "沖繩",
    year: 2026,
    dateLabel: "6/26 – 7/01",
    dateStart: "2026-06-26",
    dateEnd: "2026-07-01",
    nights: 5,
    status: "即將出發",
    recommended: false,
    tagline: "JUNGLIA 叢林樂園・青之洞窟浮潛・YotaMika 海景別墅自炊",
    themes: ["自駕", "親子", "主題樂園", "海島"],
    mapCenter: [26.45, 127.85],
    mapZoom: 10,

    flight: {
      airline: "長榮航空 EVA Air",
      out: "6/26 桃園 TPE → 那霸 OKA(晚班)",
      back: "7/01 那霸 OKA → 桃園 TPE(早班)",
      note: "Oki Blues 中文租車自駕 6/27–7/1"
    },
    stay: [
      { name: "OMO5 沖繩那霸", nights: "第 1 晚", note: "星野集團・國際通徒步圈" },
      { name: "恩納 YotaMika 別墅", nights: "後 4 晚", note: "西海岸海景包棟・私人沙灘・可自炊" }
    ],
    pass: {
      icon: "🚗", label: "租車自駕",
      name: "Oki Blues 中文租車",
      price: "6/27 09:00 取車 → 7/1 08:00 還車",
      head: ["項目", "內容", "備註"],
      rows: [
        ["取車", "OMO5 那霸門口接送", "6/27 09:00・08:45 前 Check-out"],
        ["還車", "接送至那霸機場", "7/1 08:00・前晚加滿油"],
        ["必備證件", "國際駕照＋台灣駕照正本＋護照", "缺一不可・日本靠左行駛"],
        ["導航", "景點電話或 MAPCODE", "ETC 高速收費・景點多免費停車"]
      ]
    },

    days: [
      {
        day: 1, date: "6/26 (五)", theme: "🍜 抵達那霸・國際通初探",
        items: [
          { time: "晚上", text: "長榮晚班落地那霸機場,搭單軌電車至縣廳前站,步行入住 OMO5" },
          { time: "20:00–22:00", text: "國際通夜間逛街:唐吉訶德(先下載 7% 優惠券)、ORION 啤酒雪糕、琉球小巷散步" },
          { time: "21:00–22:00", text: "晚餐:暖幕琉球居酒屋 或 一蘭拉麵(隔板座位帶小孩友善),約 ¥1,500–2,000/人" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "那霸機場 →(單軌 13 分)縣廳前站 →(步行 6 分)OMO5 →(1 分)國際通" },
          { type: "warn", title: "提醒", text: "明早 09:00 Oki Blues 來接,08:45 前完成 Check-out" }
        ]
      },
      {
        day: 2, date: "6/27 (六)", theme: "🐠 水族館・iias 豐崎・兒童王國",
        items: [
          { time: "09:00", text: "Oki Blues 派車到 OMO5 接送取車,自駕之旅開始" },
          { time: "09:45–11:45", text: "DMM Kariyushi 水族館:CHURAMINAMO 玻璃地板俯瞰 6m 深水槽、餵水獺/企鵝" },
          { time: "12:00–14:00", text: "iias 豐崎午餐 + 採買:西松屋、3 Coins、UNIQLO、AEON 超市買自炊食材" },
          { time: "14:30–17:30", text: "沖繩兒童王國:150 種動物、小火車、迷你賽車、神奇博物館" },
          { time: "17:30", text: "沿西海岸前往恩納 YotaMika 別墅入住(約 40 分)" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "OMO5 →(20 分)iias/DMM →(30 分)兒童王國 →(40 分)恩納 YotaMika,全日車程約 90 分" },
          { type: "warn", title: "提醒", text: "國際駕照＋台灣駕照正本＋護照缺一不可;日本靠左行駛" }
        ]
      },
      {
        day: 3, date: "6/28 (日)", theme: "🦖 JUNGLIA 叢林樂園・燒肉乃我那霸",
        items: [
          { time: "08:00", text: "從 YotaMika 別墅出發前往北部 JUNGLIA(約 60 分),提早避開開門人潮" },
          { time: "09:00–17:00", text: "JUNGLIA 叢林樂園 + SPA 水療館:60 公頃恐龍主題、恐龍追擊、高空滑索" },
          { time: "12:00–13:00", text: "午餐:JUNGLIA 園內鳥巢餐廳(需預約)或輕食攤位" },
          { time: "18:30–20:00", text: "晚餐:燒肉乃我那霸總店,Agu 島豬發源地,單點超過 70 種" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "恩納 →(約 60 分)JUNGLIA →(約 30 分)燒肉乃我那霸 →(約 50 分)恩納,全日約 140 分" },
          { type: "warn", title: "提醒", text: "JUNGLIA 提前 Klook/KKday 購票;刺激設施身高 90–120cm 限制;燒肉熱門時段排隊 2–3hr 務必訂位" }
        ]
      },
      {
        day: 4, date: "6/29 (一)", theme: "🤿 青之洞窟浮潛・私人沙灘・永旺夢樂城",
        items: [
          { time: "08:00–10:00", text: "青之洞窟浮潛(自選):真榮田岬藍光海蝕洞、熱帶魚環繞、免證照" },
          { time: "09:00–12:00", text: "不浮潛者於 YotaMika 私人沙灘戲水玩沙、拍全家福,浮潛組結束後會合" },
          { time: "12:30–13:30", text: "午餐:浜之家海鮮料理(青之洞窟旁,奶油烤魚、海膽焗龍蝦)" },
          { time: "15:00–17:00", text: "永旺夢樂城來客夢:寶可夢中心、3 Coins、超市採買晚餐食材" },
          { time: "晚上", text: "晚餐:用 AEON 食材在海景別墅自炊,最有度假感" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "恩納 ⇄(15 分)真榮田岬／別墅沙灘 →(40 分)AEON 來客夢 →(40 分)恩納" },
          { type: "warn", title: "提醒", text: "浮潛多數業者規定 6 歲以上,幼童先確認年齡限制;浮潛後 24hr 內勿搭機;夏日防曬補水" }
        ]
      },
      {
        day: 5, date: "6/30 (二)", theme: "🐳 部瀨名海中公園・名護鳳梨園",
        items: [
          { time: "09:30–11:30", text: "部瀨名海中公園:海中展望塔 24 圓窗、鯨魚造型玻璃船(免下水也能看魚)" },
          { time: "12:00–13:30", text: "午餐:燒肉本部牧場名護店(已訂位),牧場直送和牛、牛肉炒飯每桌必點" },
          { time: "14:00–16:00", text: "名護鳳梨園:鳳梨號無人遊園車、DINO Park 恐龍區、鳳梨霜淇淋必吃" },
          { time: "晚上", text: "晚餐:別墅自炊,沖繩最後一晚" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "恩納 →(20 分)部瀨名 →(15 分)名護午餐 →(15 分)鳳梨園 →(40 分)恩納,全日約 90 分" },
          { type: "warn", title: "提醒", text: "明早 08:00 還車,今晚先把油加滿!" }
        ]
      },
      {
        day: 6, date: "7/01 (三)", theme: "✈ 再見沖繩!",
        items: [
          { time: "08:00", text: "Oki Blues 到別墅接車並送機場(約 70 分)" },
          { time: "早上", text: "長榮早班沖繩 → 台北,提前 2 小時抵機場,免稅店在入關後是最後採購機會" }
        ],
        tips: [
          { type: "warn", title: "提醒", text: "確認油箱加滿、行李取出,加油收據／國際駕照／護照帶齊" }
        ]
      }
    ],

    spots: [
      {
        name: "國際通", area: "那霸", hours: "10:00–22:00",
        latlng: [26.2146, 127.6857],
        desc: "那霸最熱鬧的 1.6 公里商店街,晚上人潮較少正好輕鬆逛。必逛:唐吉訶德(先下載 7% 優惠券)、ORION 啤酒雪糕、琉球小巷散步。全年齡、推車 OK。",
        ref: { title: "阿君的玩食天堂・國際通必逛攻略", url: "https://ajunfun.tw/kokusai-dori/" }
      },
      {
        name: "DMM Kariyushi 水族館", area: "豐見城", hours: "9:00–20:00", tel: "098-996-4844",
        latlng: [26.1668, 127.6535],
        desc: "聲光互動數位水族館,CHURAMINAMO 玻璃地板俯瞰 6 公尺深水槽超夢幻,可餵水獺/企鵝、找樹懶。全室內冷氣、推車可借。大人 ¥2,400・4–12 歲 ¥1,500・3 歲以下免費。位於 iias 豐崎商場內。",
        ref: { title: "有料地・DMM Kariyushi 水族館完整攻略", url: "https://travelpark.tw/dmm_kariyushi_aquarium/" }
      },
      {
        name: "沖繩兒童王國", area: "沖繩市", hours: "9:30–17:30", tel: "098-933-4190",
        latlng: [26.3486, 127.8266],
        desc: "150 種動物的動物園樂園,小孩放電首選。小火車(¥200)、迷你賽車(¥100)、神奇博物館。2–10 歲最嗨、建議帶推車。大人 ¥600・兒童 ¥300。MAPCODE 33 561 766*72。",
        ref: { title: "好好玩 FUNIT・沖繩兒童王國完整攻略", url: "https://gofunit.com/%e6%b2%96%e7%b9%a9%e5%85%92%e7%ab%a5%e7%8e%8b%e5%9c%8b/" }
      },
      {
        name: "JUNGLIA 叢林樂園", area: "本部", hours: "9:00–21:00",
        latlng: [26.6760, 127.9320],
        desc: "2025 年開幕、60 公頃叢林恐龍主題樂園,規模超越大阪環球。恐龍追擊體驗、高空滑索、SPA 水療館(另購票)。提前 Klook/KKday 購票;刺激設施身高限制 90–120cm;夏天極曬備防曬。導航輸入「ジャングリア沖縄」。",
        ref: { title: "V 妞的旅行・JUNGLIA 最新攻略", url: "https://vivianexplore.tw/junglia/" }
      },
      {
        name: "真榮田岬 青之洞窟", area: "恩納", hours: "浮潛建議上午", tel: "098-982-5339",
        latlng: [26.4447, 127.7783],
        desc: "全球僅兩座的藍光海蝕洞,熱帶魚環繞、免證照。陰雨天藍光反而更美。¥3,000–4,500/人。浮潛多數業者規定 6 歲以上;浮潛後 24hr 內勿搭機。MAPCODE 206 062 685*77。",
        ref: { title: "波比看世界・青之洞窟浮潛全攻略", url: "https://bobbytravel.tw/blue-cave-okinawa/" }
      },
      {
        name: "部瀨名海中公園", area: "名護", hours: "9:00–18:00", tel: "0980-52-3379",
        latlng: [26.5363, 127.9648],
        desc: "不用下水也能看魚!海中展望塔 24 圓窗 + 鯨魚造型玻璃底遊艇(20 分一班),全年齡、雨天備案首選。套票 ¥1,500 起。MAPCODE 206 442 075*11。",
        ref: { title: "Marktrip・部瀨名海中公園完整攻略", url: "https://marktrip.tw/busena-marinepark/" }
      },
      {
        name: "名護鳳梨園", area: "名護", hours: "10:00–18:00", tel: "0980-53-3659",
        latlng: [26.6258, 127.9669],
        desc: "搭鳳梨號無人遊園車穿梭園區,小小孩免走路、全室內雨天 OK。DINO Park 恐龍區、鳳梨霜淇淋必吃。大人 ¥1,200・兒童 ¥600。推車友善。MAPCODE 206 716 467*85。",
        ref: { title: "Trip.com・名護鳳梨園全攻略", url: "https://tw.trip.com/blog/nago-pineapple-park/" }
      },
      {
        name: "iias 豐崎", area: "豐見城", hours: "10:00–22:00",
        latlng: [26.1660, 127.6540],
        desc: "與 DMM 水族館同棟的大型商場,美食街午餐 + 採買:西松屋、3 Coins、UNIQLO、AEON 超市買自炊生鮮。哺乳室/尿布台/推車租借齊全。MAPCODE 232 543 368*63。",
        ref: { title: "阿君的玩食天堂・iias 沖繩豐崎購物指南", url: "https://ajunfun.tw/iias/" }
      }
    ],

    food: [
      { name: "燒肉乃我那霸 總店", area: "名護", stars: 5, note: "Agu 島豬發源地", ref: { title: "來來琉球・燒肉乃我那霸總店官方攻略", url: "https://lailai-web.com/yakiniku-no-ganaha-honten/" } },
      { name: "燒肉本部牧場 名護店", area: "名護", stars: 5, note: "牧場直送和牛・已訂位", ref: { title: "來來琉球・燒肉 Motobu 牧場名護店", url: "https://lailai-web.com/motobu-bokujo-nago/" } },
      { name: "浜之家海鮮料理", area: "恩納", stars: 5, note: "青之洞窟旁・CP 值爆表", ref: { title: "波比看世界・浜之家海鮮料理攻略", url: "https://bobbyfun.tw/2023-10-14-2527/" } },
      { name: "暖幕／一蘭拉麵", area: "那霸", stars: 4, note: "抵達夜消", ref: { title: "", url: "" } },
      { name: "鳳梨霜淇淋", area: "名護", stars: 4, note: "名護鳳梨園必吃", ref: { title: "", url: "" } },
      { name: "BLUE SEAL 冰淇淋", area: "沖繩", stars: 4, note: "限定口味", ref: { title: "", url: "" } }
    ],

    weather: [
      "沖繩 6–7 月:高溫約 30–32°C,午後常有雷陣雨",
      "紫外線極強,務必防曬、遮陽、補水",
      "海邊風大,薄外套備用"
    ],
    info: [
      { title: "📅 提前預約清單", items: ["Oki Blues 租車(確認接送時間)", "燒肉本部牧場(電話或網路訂位)", "JUNGLIA 門票(Klook/KKday)", "青之洞窟浮潛業者(旺季須早訂)", "DMM 水族館門票(提前買有優惠)"] },
      { title: "🚗 自駕注意事項", items: ["日本靠左行駛,方向盤在右側,前幾天特別專心", "國際駕照＋台灣駕照正本＋護照三件套缺一不可", "導航設定景點電話或 MAPCODE 最方便", "高速公路 ETC 收費;多數景點停車場免費", "油箱還車前要加滿,保留加油收據"] },
      { title: "☀️ 夏日防曬", items: ["6–7 月紫外線強烈,建議防曬乳 SPF50+、遮陽帽、涼感衣", "JUNGLIA 戶外行程更要做足準備", "多補水,避免中暑"] },
      { title: "💰 省錢攻略", items: ["唐吉訶德下載電子優惠券(7%)", "景點門票在 Klook/KKday 提前買有折扣", "燒肉本部牧場午餐套餐(¥1,800 起)比晚餐便宜許多", "善用 Okinawa FunPASS 景點套票"] },
      { title: "🛍️ 必買伴手禮", items: ["殘波藍系列琉球玻璃", "元祖海鹽卡拉棒、紅芋塔", "BLUE SEAL 冰淇淋(限定口味)", "沖繩泡盛、Orion 啤酒", "苦瓜零食、海葡萄、海鹽巧克力"] },
      { title: "🌧️ 雨天備案", items: ["DMM Kariyushi 水族館(全室內)", "名護鳳梨園(全室內)", "iias / AEON 購物中心", "部瀨名海中公園展望塔"] },
      { title: "🚨 緊急聯絡", items: ["警察 110・救護消防 119・海上事故 118", "小兒急救諮詢 #8000(夜間兒童突發先打)", "駐日代表處那霸分處 098-862-7008", "急難救助專線(24hr) 090-1942-1107"] }
    ]
  },

  {
    id: "tokyo-2026",
    title: "東京・輕井澤之旅",
    subtitle: "東京迪士尼・輕井澤・賞櫻",
    country: "日本",
    region: "東京",
    year: 2026,
    dateLabel: "4/11 – 4/19",
    dateStart: "2026-04-11",
    dateEnd: "2026-04-19",
    nights: 8,
    status: "旅遊回憶",
    recommended: false,
    tagline: "目黑川賞櫻・東京迪士尼雙園・輕井澤虹夕諾雅",
    themes: ["賞櫻", "迪士尼", "輕井澤", "美食"],
    mapCenter: [36.0, 139.2],
    mapZoom: 8,

    flight: {
      airline: "中華航空 China Airlines",
      out: "4/11 桃園 TPE → 東京(19:00 抵達)",
      back: "4/19 東京 → 桃園(14:30 回台)",
      note: "日暮里進出・市區 JR/地鐵 + 北陸新幹線往輕井澤"
    },
    stay: [
      { name: "東京宿・日暮里館", nights: "4/11–4/15 ・ 4 晚", note: "日暮里・自由行民宿" },
      { name: "星野虹夕諾雅 輕井澤", nights: "4/15–4/17 ・ 2 晚", note: "輕井澤頂級溫泉度假村" },
      { name: "東京錦糸町樂天城市飯店", nights: "4/17–4/19 ・ 2 晚", note: "錦糸町・近晴空塔" }
    ],
    pass: {
      icon: "🚄", label: "交通",
      name: "JR + 東京メトロ + 北陸新幹線",
      price: "建議 Suica/PASMO",
      head: ["路段", "交通", "時間"],
      rows: [
        ["機場 → 市區", "Skyliner(成田)/ 京急(羽田)", "約 40 分"],
        ["東京 ↔ 輕井澤", "北陸新幹線 あさま/はくたか", "約 70 分"],
        ["市區移動", "JR 山手線 + 東京メトロ", "Suica/PASMO 嗶卡"],
        ["迪士尼", "JR 京葉線 → 舞濱站", "東京站約 15 分"]
      ]
    },

    days: [
      {
        day: 1, date: "4/11 (六)", theme: "✈ 抵達東京",
        items: [
          { time: "19:00", text: "抵達東京" },
          { time: "晚餐", text: "大阪燒肉 日暮里店" },
          { time: "住宿", text: "東京宿・日暮里館" }
        ]
      },
      {
        day: 2, date: "4/12 (日)", theme: "🌸 東京市區・目黑川賞櫻",
        items: [
          { time: "上午", text: "目黑川賞櫻、中目黑星巴克典藏旗艦店" },
          { time: "午餐", text: "Peter Luger Steak House(惠比壽)" },
          { time: "晚餐", text: "AFURI 阿夫利柚子鹽拉麵" },
          { time: "住宿", text: "東京宿・日暮里館" }
        ]
      },
      {
        day: 3, date: "4/13 (一)", theme: "🏰 東京迪士尼樂園 (Land)",
        items: [
          { time: "全天", text: "東京迪士尼樂園 Disneyland" },
          { time: "住宿", text: "東京宿・日暮里館" }
        ]
      },
      {
        day: 4, date: "4/14 (二)", theme: "🌊 東京迪士尼海洋 (Sea)",
        items: [
          { time: "全天", text: "東京迪士尼海洋 DisneySea" },
          { time: "住宿", text: "東京宿・日暮里館" }
        ]
      },
      {
        day: 5, date: "4/15 (三)", theme: "🚄 前進輕井澤",
        items: [
          { time: "上午", text: "搭北陸新幹線至輕井澤(約 70 分)" },
          { time: "玩", text: "雲場池、舊輕井澤銀座通" },
          { time: "逛", text: "輕井澤・王子購物廣場 Outlet" },
          { time: "午餐", text: "川上庵 蕎麥麵" },
          { time: "晚餐", text: "虹夕諾雅 度假村內晚餐" },
          { time: "住宿", text: "星野虹夕諾雅 輕井澤" }
        ],
        tips: [
          { type: "info", title: "交通", text: "東京站 → 北陸新幹線 あさま/はくたか → 輕井澤站(約 70 分)" }
        ]
      },
      {
        day: 6, date: "4/16 (四)", theme: "⛪ 輕井澤・森林教堂",
        items: [
          { time: "早午餐", text: "虹夕諾雅 度假村早午餐" },
          { time: "玩", text: "榆樹街小鎮(ハルニレテラス)、高原教堂、石之教堂" },
          { time: "晚餐", text: "村民食堂" },
          { time: "住宿", text: "星野虹夕諾雅 輕井澤" }
        ],
        tips: [
          { type: "info", title: "提示", text: "星野區內榆樹街小鎮、兩座教堂、村民食堂有免費接駁巴士串聯" }
        ]
      },
      {
        day: 7, date: "4/17 (五)", theme: "🛍 輕井澤 → 東京市區採買",
        items: [
          { time: "早午餐", text: "虹夕諾雅 度假村早午餐" },
          { time: "逛", text: "阿卡將、西松屋、3COINS、UNIQLO、SUNDRUG、西友超市" },
          { time: "晚餐", text: "居酒屋" },
          { time: "住宿", text: "東京錦糸町樂天城市飯店" }
        ]
      },
      {
        day: 8, date: "4/18 (六)", theme: "🗼 淺草・晴空塔",
        items: [
          { time: "玩", text: "雷門・淺草寺、墨田水族館" },
          { time: "逛", text: "東京晴空塔 SKYTREE・Solamachi" },
          { time: "午餐", text: "淺草今半(壽喜燒)" },
          { time: "晚餐", text: "敘敘苑 燒肉" },
          { time: "住宿", text: "東京錦糸町樂天城市飯店" }
        ]
      },
      {
        day: 9, date: "4/19 (日)", theme: "✈ 回台灣",
        items: [
          { time: "14:30", text: "班機返回台灣,滿載而歸!" }
        ]
      }
    ],

    spots: [
      {
        name: "目黑川賞櫻", area: "中目黑", hours: "戶外・夜櫻點燈傍晚起",
        latlng: [35.6445, 139.6987],
        desc: "東京最具代表的賞櫻河岸,約 800 棵染井吉野櫻沿河 4 公里齊放,中目黑站一帶最熱鬧。夜間白×粉提燈點燈,粉色光暈與櫻花相映夢幻。櫻橋是必拍場景。",
        ref: { title: "波比看世界・目黑川櫻花夜櫻點燈", url: "https://bobbyfun.tw/2024-01-04-2655/" }
      },
      {
        name: "中目黑星巴克典藏旗艦店", area: "中目黑", hours: "7:00–22:00",
        latlng: [35.6470, 139.6985],
        desc: "隈研吾設計,開幕時為全球最大星巴克。四層樓臻選烘焙工坊,銅製烘豆槽、Princi 義式烘焙坊、限定櫻花商品。櫻花季賞目黑川第一排,需線上預約入場。",
        ref: { title: "樂活的大方・中目黑星巴克臻選烘焙工坊", url: "https://www.bigfang.tw/blog/post/starbucks-reserve-roastery-tokyo" }
      },
      {
        name: "東京迪士尼樂園", area: "舞濱", hours: "依官方每日公告",
        latlng: [35.6329, 139.8804],
        desc: "經典童話主題園區,城堡、遊行、煙火必看。入園先下載官方 App 操作 Standby Pass 與 DPA 尊享卡,熱門設施善用快速通關。與海洋分開購票,各排一天。",
        ref: { title: "波比看世界・東京迪士尼樂園攻略", url: "https://bobbytravel.tw/tokyo-disneyland/" }
      },
      {
        name: "東京迪士尼海洋", area: "舞濱", hours: "依官方每日公告",
        latlng: [35.6267, 139.8850],
        desc: "全球唯一的海洋主題迪士尼,以七大主題港灣與成熟氛圍著稱,2024 新增『夢幻泉鄉』園區。表演、煙火與限定餐點豐富,善用 DPA 安排熱門設施更順暢。",
        ref: { title: "花時光旅行實驗室・迪士尼海洋攻略", url: "https://whatime.space/tokyo-disneysea/" }
      },
      {
        name: "雲場池", area: "輕井澤", hours: "戶外・全日",
        latlng: [36.3490, 138.6260],
        desc: "有『天鵝湖』美名的輕井澤代表水景,池水碧綠映著林木藍天,環池步道散策約 20–30 分。距輕井澤站約 1.3km,可步行或租自行車前往。",
        ref: { title: "Mimi韓・雲場池(附交通＆Mapcode)", url: "https://mimigo.tw/kumoba-pond/" }
      },
      {
        name: "舊輕井澤銀座通", area: "輕井澤", hours: "店家約 10:00–17:00",
        latlng: [36.3568, 138.6377],
        desc: "約 600 公尺的歐風紅磚商店街,輕井澤最熱鬧的散策地。澤屋果醬(整顆草莓)、法式麵包、布丁、輕井澤雕工藝品必逛。店家多 17:00 開始打烊。",
        ref: { title: "Mimi韓・舊輕井澤銀座通逛街地圖", url: "https://mimigo.tw/karuizawa-ginza/" }
      },
      {
        name: "榆樹街小鎮 ハルニレテラス", area: "中輕井澤", hours: "店家約 10:00–18:00",
        latlng: [36.3856, 138.5972],
        desc: "星野集團以『輕井澤的日常』打造的森林商店街,沿湯川架高木棧道串起 16 間咖啡、餐廳與選物店(丸山珈琲、川上庵)。走在春榆樹叢間悠閒愜意。",
        ref: { title: "BringYou・星野區榆樹街小鎮攻略", url: "https://www.bring-you.info/zh-tw/hoshino-karuizawa-area" }
      },
      {
        name: "高原教堂・石之教堂", area: "中輕井澤", hours: "參觀依官方開放時間",
        latlng: [36.3866, 138.5949],
        desc: "星野區兩座絕美教堂:1921 年的高原教會木造溫潤;石之教堂(內村鑑三紀念堂)由石與玻璃交織、隱於森林,光影莊嚴動人,是夢幻婚禮聖地。",
        ref: { title: "凱子凱・中輕井澤星野區攻略", url: "https://ksk.tw/blog/post/341974776" }
      },
      {
        name: "雷門・淺草寺", area: "淺草", hours: "境內 24h・本堂 6:00–17:00",
        latlng: [35.7148, 139.7967],
        desc: "東京最古老寺廟,雷門大紅燈籠 24h 免費參觀,仲見世通 250 公尺商店街集結人形燒、仙貝與和風雜貨。可租和服參拜、求籤、收御朱印。",
        ref: { title: "BringYou・淺草寺雷門散步路線全攻略", url: "https://www.bring-you.info/zh-tw/sensoji-temple" }
      },
      {
        name: "墨田水族館・晴空塔", area: "押上・晴空塔", hours: "水族館 10:00–20:00(假日延長)",
        latlng: [35.7101, 139.8107],
        desc: "晴空塔(世界第一高塔)集展望台、Solamachi 商場於一身;5–6 樓墨田水族館有日本最大室內開放水槽,企鵝、海狗萌度爆表,是雨天親子首選。",
        ref: { title: "BringYou・晴空塔墨田水族館", url: "https://www.bring-you.info/zh-tw/sumida-aquarium" }
      }
    ],

    food: [
      { name: "大阪燒肉 日暮里店", area: "日暮里", stars: 4, note: "抵達晚餐", ref: { title: "", url: "" } },
      { name: "Peter Luger Steak House", area: "惠比壽", stars: 5, note: "傳奇紐約牛排", ref: { title: "樂活的大方・Peter Luger 東京", url: "https://www.bigfang.tw/blog/post/peter-luger-steak-tokyo" } },
      { name: "AFURI 阿夫利拉麵", area: "東京", stars: 4, note: "清爽柚子鹽", ref: { title: "樂活的大方・AFURI 阿夫利", url: "https://www.bigfang.tw/blog/post/afuri-harajuku" } },
      { name: "川上庵 蕎麥麵", area: "輕井澤", stars: 4, note: "炸大蝦天婦羅蕎麥麵", ref: { title: "桃桃's・川上庵輕井澤本店", url: "https://momoblog.tw/kawakamian/" } },
      { name: "村民食堂", area: "輕井澤", stars: 4, note: "信州料理・森林餐廳", ref: { title: "福寶媽・輕井澤村民食堂", url: "https://gogojp.tw/sonminsyokudou-karuizawa/" } },
      { name: "淺草今半 壽喜燒", area: "淺草", stars: 5, note: "百年壽喜燒名店", ref: { title: "凱子凱・淺草今半本店", url: "https://ksk.tw/blog/post/341373966" } },
      { name: "敘敘苑 燒肉", area: "東京", stars: 5, note: "高級燒肉・午間套餐划算", ref: { title: "娜塔蝦・敘敘苑用餐心得", url: "https://natasha-traveler.tw/jyujyuen-yakiniku-review/" } }
    ],

    weather: [
      "東京 4 月:約 12–20°C,櫻花季,早晚偏涼",
      "輕井澤海拔高,比東京低 5–8°C,務必帶保暖外套",
      "洋蔥式穿搭、輕便雨具備用"
    ],
    info: [
      { title: "🌸 賞櫻提醒", items: ["目黑川櫻花約 3 月底–4 月初,4 月中旬視花況可能已開始落櫻", "中目黑星巴克旗艦店櫻花季需線上預約入場", "賞夜櫻點燈傍晚最美"] },
      { title: "🏰 迪士尼攻略", items: ["陸地、海洋分開購票,各排一天", "入園前先下載官方 App(Standby Pass / DPA)", "熱門設施善用 DPA 尊享卡"] },
      { title: "🚄 輕井澤交通", items: ["東京站搭北陸新幹線 あさま/はくたか 約 70 分", "星野區景點有免費接駁巴士串聯", "雲場池、舊輕井澤可租自行車串聯"] },
      { title: "🛍️ 採買清單", items: ["阿卡將、西松屋:嬰幼兒用品", "3COINS、UNIQLO、SUNDRUG", "西友超市:自炊與零食補給"] }
    ],
    notes: [
      "Peter Luger、淺草今半、敘敘苑、村民食堂等人氣餐廳建議提前訂位。",
      "虹夕諾雅輕井澤為頂級度假村,旺季房源緊張,需早訂。",
      "迪士尼門票採日期指定,建議提前購買。"
    ]
  },

  {
    id: "shikoku-2026",
    title: "四國跨縣之旅",
    subtitle: "香川・愛媛・高知・徳島",
    country: "日本",
    region: "四國",
    year: 2026,
    dateLabel: "10/9 – 10/17",
    dateStart: "2026-10-09",
    dateEnd: "2026-10-17",
    nights: 8,
    status: "即將出發",
    recommended: false,
    tagline: "讚岐烏龍麵・道後溫泉・小豆島天使之路・四國跨縣自駕",
    themes: ["自駕", "溫泉", "美食", "親子"],
    mapCenter: [33.85, 133.5],
    mapZoom: 8,

    flight: {
      airline: "中華航空 China Airlines",
      out: "10/9 桃園 TPE → 高松 TAK(10:30 抵達)",
      back: "10/17 高松 TAK → 桃園(19:05)",
      note: "高松/松山/高知周遊・10/11–16 高松站租車自駕"
    },
    stay: [
      { name: "WeBase 高松", nights: "10/9–10/11 ・ 2 晚", note: "高松市區・設計青旅風" },
      { name: "大和 ROYNET 飯店 松山", nights: "10/11–10/13 ・ 2 晚", note: "松山市區・近大街道" },
      { name: "星野 OMO7 高知", nights: "10/13–10/15 ・ 2 晚", note: "高知站前・含自助餐" },
      { name: "JR 飯店 Clement 高松", nights: "10/15–10/17 ・ 2 晚", note: "JR 高松站直結" }
    ],
    pass: {
      icon: "🚗", label: "交通",
      name: "JR + 渡輪 + 租車自駕",
      price: "租車 10/11–10/16",
      head: ["路段", "交通", "備註"],
      rows: [
        ["高松 ↔ 小豆島", "高松港 ⇄ 土庄港 渡輪", "約 60 分"],
        ["租車", "10/11 10:00 JR 高松站取車", "10/16 還車"],
        ["四縣跨縣", "高速公路自駕(香川/愛媛/高知/徳島)", "ETC 收費"],
        ["市區", "JR 予讚線 + 伊予鐵市電", "Suica/ICOCA 可用"]
      ]
    },

    days: [
      {
        day: 1, date: "10/9 (五)", theme: "✈ 抵達香川・栗林公園與金刀比羅宮",
        items: [
          { time: "10:30", text: "抵達高松機場,前往市區" },
          { time: "玩", text: "栗林公園(米其林三星庭園)、金刀比羅宮(1368 階參拜)" },
          { time: "午餐", text: "讚岐烏龍麵 上原屋本店(栗林公園旁)" },
          { time: "晚餐", text: "骨付鳥 一鶴" },
          { time: "住宿", text: "WeBase 高松" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "高松機場 →(機場巴士約 40 分)高松市區;金刀比羅宮本宮 785 階、含奧社共 1368 階" }
        ]
      },
      {
        day: 2, date: "10/10 (六)", theme: "⛴ 小豆島一日遊",
        items: [
          { time: "玩", text: "天使之路、寒霞溪(纜車)、橄欖公園(魔女宅急便場景)" },
          { time: "午餐", text: "小豆島拉麵 HISHIO(海景第一排)" },
          { time: "晚餐", text: "鐵板燒 夢路" },
          { time: "住宿", text: "WeBase 高松" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "高松港 ⇄ 土庄港 渡輪約 60 分" },
          { type: "warn", title: "提醒", text: "天使之路僅退潮前後浮現,出發前務必查潮汐表" }
        ]
      },
      {
        day: 3, date: "10/11 (日)", theme: "🚗 香川 → 愛媛・道後溫泉",
        items: [
          { time: "取車", text: "10:00 JR 高松站取車,自駕前往松山" },
          { time: "玩", text: "道後溫泉本館、松山城" },
          { time: "午餐", text: "松山鯛めし 秋嘉" },
          { time: "晚餐", text: "瀨戶內四季海鮮居酒屋 象三" },
          { time: "住宿", text: "大和 ROYNET 飯店 松山" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "10/11 10:00 JR 高松站取車,高松 → 松山自駕約 2.5 小時" }
        ]
      },
      {
        day: 4, date: "10/12 (一)", theme: "🏯 愛媛・今治",
        items: [
          { time: "玩", text: "今治城(海上之城)、今治毛巾美術館、伊予鐵高島屋摩天輪 くるりん" },
          { time: "午餐", text: "濱之台所・潮里" },
          { time: "晚餐", text: "伊予鐵高島屋" },
          { time: "住宿", text: "大和 ROYNET 飯店 松山" }
        ]
      },
      {
        day: 5, date: "10/13 (二)", theme: "🛶 愛媛 → 高知・四萬十川",
        items: [
          { time: "玩", text: "四萬十川(沉下橋・屋形船)、高知城" },
          { time: "午餐", text: "レストハウス古都" },
          { time: "晚餐", text: "星野 OMO7 自助餐" },
          { time: "住宿", text: "星野 OMO7 高知" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "松山 → 四萬十 → 高知,當日移動距離較長,留意時間" }
        ]
      },
      {
        day: 6, date: "10/14 (三)", theme: "🦸 高知・龍河洞與麵包超人",
        items: [
          { time: "玩", text: "龍河洞(日本三大鐘乳洞)、香美市麵包超人博物館(柳瀨嵩紀念館)" },
          { time: "早午餐", text: "星野 OMO7 自助餐" },
          { time: "晚餐", text: "星野 OMO7 自助餐" },
          { time: "住宿", text: "星野 OMO7 高知" }
        ],
        tips: [
          { type: "info", title: "提示", text: "麵包超人博物館在香美市香北町,距高知市約 40 分" }
        ]
      },
      {
        day: 7, date: "10/15 (四)", theme: "🌀 高知 → 徳島 → 香川",
        items: [
          { time: "早餐", text: "星野 OMO7 自助餐" },
          { time: "玩", text: "鳴門渦潮(觀潮船/渦之道)、屋島展望台" },
          { time: "午餐", text: "拉麵東大 徳島本店" },
          { time: "晚餐", text: "瀨戶の祭 迴轉壽司" },
          { time: "住宿", text: "JR 飯店 Clement 高松" }
        ],
        tips: [
          { type: "warn", title: "提醒", text: "鳴門渦潮滿潮/乾潮前後 1–2 小時最壯觀,先查觀潮表" }
        ]
      },
      {
        day: 8, date: "10/16 (五)", theme: "🐟 香川・四國水族館",
        items: [
          { time: "玩", text: "四國水族館(宇多津)" },
          { time: "逛", text: "高松中央商店街" },
          { time: "午餐", text: "麺處 綿谷(肉烏龍)" },
          { time: "晚餐", text: "寄鳥味鳥(骨付鳥)" },
          { time: "住宿", text: "JR 飯店 Clement 高松" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "今日(10/16)歸還租車(JR 高松站);四國水族館在宇多津,距高松約 40 分" }
        ]
      },
      {
        day: 9, date: "10/17 (六)", theme: "✈ 回台灣",
        items: [
          { time: "逛", text: "高松中央商店街最後採購" },
          { time: "午餐", text: "グリル プランチャ" },
          { time: "19:05", text: "高松機場 → 台灣,滿載而歸!" }
        ],
        tips: [
          { type: "warn", title: "提醒", text: "班機 19:05,建議提前 2 小時抵達高松機場(JR/機場巴士)" }
        ]
      }
    ],

    spots: [
      {
        name: "栗林公園", area: "高松", hours: "日出–日落(依季節)",
        latlng: [34.3289, 134.0444],
        desc: "米其林綠色指南三星、特別名勝,約 75 公頃的迴遊式大名庭園,以紫雲山為背景串起六水池十三假山,一步一景,日本人譽為更勝三大名園。可搭和船、掬月亭品茶。",
        ref: { title: "小兔小安・栗林公園", url: "https://bunnyann.tw/ritsurin-park/" }
      },
      {
        name: "金刀比羅宮", area: "琴平", hours: "本宮 6:00–18:00",
        latlng: [34.1853, 133.8108],
        desc: "海上交通守護神,號稱日本最難參拜的神社:本宮 785 階、奧社共 1368 階。沿途店家可借拐杖,每段有階數牌。可買奧社天狗御守、遇見開運こんぴら狗。",
        ref: { title: "壞波妞・金刀比羅宮 1368 階", url: "https://boniutravel.com/blog/post/kotohira-shrine" }
      },
      {
        name: "天使之路", area: "小豆島", hours: "退潮前後浮現",
        latlng: [34.4853, 134.2236],
        desc: "連接四座小島的 500 公尺沙洲步道,每天僅在兩次退潮時從海中浮現。傳說與心愛的人牽手走過願望會實現,約束之丘展望台可俯瞰全景。",
        ref: { title: "福寶媽・天使之路天使散步道", url: "https://gogojp.tw/angel-road/" }
      },
      {
        name: "寒霞溪", area: "小豆島", hours: "纜車 8:30–17:00",
        latlng: [34.5066, 134.2731],
        desc: "與耶馬溪、妙義山並列日本三大美麗溪谷,搭空中纜車飽覽奇岩峭壁。秋日紅葉最著名(10–11 月),春夏綠意、冬雪也各有風情。",
        ref: { title: "兩株小豬・寒霞溪かんかけい", url: "https://rebecca1003.pixnet.net/blog/posts/10358035012" }
      },
      {
        name: "小豆島橄欖公園", area: "小豆島", hours: "8:30–17:00",
        latlng: [34.4789, 134.2456],
        desc: "眺望瀨戶內海的山丘,種有約 2000 株橄欖與上百種香草。《魔女宅急便》拍攝場景,可免費借魔女掃帚拍出飛天照,白色希臘風車是地標。",
        ref: { title: "岡山憨吉・小豆島橄欖公園", url: "https://archerplus.pixnet.net/blog/post/234520857" }
      },
      {
        name: "道後溫泉本館", area: "松山", hours: "6:00–23:00",
        latlng: [33.8519, 132.7864],
        desc: "3000 年歷史、日本最古老溫泉之一,1894 年三層木造本館為首座列為重要文化財的公共浴場,米其林綠色指南三星。2024 年整修後重新開放,神之湯最低 700 日圓可泡。",
        ref: { title: "美奈子・道後溫泉千年古湯", url: "https://minako.tw/dogo-onsen/" }
      },
      {
        name: "松山城", area: "松山", hours: "9:00–17:00",
        latlng: [33.8456, 132.7656],
        desc: "1602 年起興建、日本現存十二天守之一,聳立勝山山頂,可搭纜車或吊椅上山。天守最上層眺望松山平原與瀨戶內海,連同湯築城跡可規劃一日雙城。",
        ref: { title: "耕讀・伊予松山城一日雙城", url: "https://ullams.pixnet.net/blog/post/49212452" }
      },
      {
        name: "今治城", area: "今治", hours: "9:00–17:00",
        latlng: [34.0664, 133.0044],
        desc: "築城名手藤堂高虎 1604 年所建,引瀨戶內海水為護城河,與高松城、中津城並列日本三大水城。天守最上層 360 度展望,可眺望島波海道絕景,日落後點燈浪漫。",
        ref: { title: "Kenny's Blog・愛媛今治城", url: "https://kenfoto.pixnet.net/blog/post/485596370" }
      },
      {
        name: "今治毛巾美術館", area: "今治", hours: "9:30–18:00",
        latlng: [34.0119, 133.0992],
        desc: "世界首座結合毛巾與藝術的美術館,1–3 樓免費,4 樓嚕嚕米(Moomin)毛巾藝術需門票 800 円。可看毛巾紡織製程、逛歐風花園與選購今治毛巾。需自駕或計程車前往。",
        ref: { title: "小氣少年・今治毛巾美術館", url: "https://nicklee.tw/2564/imabari-towel-museum/" }
      },
      {
        name: "伊予鐵高島屋摩天輪 くるりん", area: "松山", hours: "11:00–21:00",
        latlng: [33.8392, 132.7664],
        desc: "松山地標,位於伊予鐵高島屋頂樓、與松山市站直結。直徑 45 公尺、繞一圈約 15 分,晴天可遠眺瀨戶內海島嶼,夜晚松山夜景與季節點燈浪漫。透明地板車廂更刺激。"
      },
      {
        name: "四萬十川", area: "高知・四萬十", hours: "戶外・全日",
        latlng: [32.9889, 132.9347],
        desc: "日本『最後的清流』,全長 196 公里、48 座沉下橋(無護欄、僅容一車)。最下游的佐田沉下橋最長最知名,可自駕、騎單車或搭屋形船漂浮在祖母綠的清流上。",
        ref: { title: "許傑・四萬十川屋形船沈下橋", url: "https://journey.tw/shimanto-river-houseboat-cruising-serivce/" }
      },
      {
        name: "高知城", area: "高知", hours: "9:00–17:00",
        latlng: [33.5608, 133.5311],
        desc: "日本現存十二天守之一,亦稱鷹城,明治與二戰皆倖免於難,15 棟建築列為重要文化財,是少數天守與本丸御殿同時保存的城。可串聯弘人市場、商店街徒步一日遊。",
        ref: { title: "R瑋哥・高知市區徒步一日遊", url: "https://a4031320.pixnet.net/blog/post/575495588" }
      },
      {
        name: "龍河洞", area: "香美市", hours: "8:30–17:00(冬季至 16:30)",
        latlng: [33.5908, 133.7458],
        desc: "日本三大鐘乳洞之一,約 1 億 7500 萬年形成、全長約 4km。觀光路線輕鬆好走,洞內瀑布、弥生時代遺物『神之壺』與持續 80 多年的科學實驗是亮點,另有冒險路線。",
        ref: { title: "岡山憨吉・龍河洞 1.5 億年鐘乳洞", url: "https://archerplus.pixnet.net/blog/post/227664362" }
      },
      {
        name: "麵包超人博物館(柳瀨嵩紀念館)", area: "香美市", hours: "9:30–17:00",
        latlng: [33.6953, 133.7660],
        desc: "作者柳瀨嵩故鄉香美市的市立紀念館,日本唯一的市立麵包超人博物館,獨家展出漫畫手稿與繪本。門口巨型麵包超人雕像、捉迷藏大樹整點跳舞,親子同遊首選。",
        ref: { title: "Tabirai・高知麵包超人博物館交通", url: "https://tc.tabirai.net/sightseeing/article/kochi-anpanman-museum-access/" }
      },
      {
        name: "鳴門渦潮", area: "徳島・鳴門", hours: "依觀潮表",
        latlng: [34.2386, 134.6453],
        desc: "世界三大潮流之一,可搭觀潮船(Wonder 鳴門號免預約、AQUA EDDY 小型需預約)近距離震撼,或走大鳴門橋下『渦之道』玻璃步道俯瞰。春秋大潮漩渦直徑可達 20–30 公尺。",
        ref: { title: "小氣少年・鳴門渦之道", url: "https://nicklee.tw/1214/uzunomichi/" }
      },
      {
        name: "屋島展望台", area: "高松", hours: "戶外・全日",
        latlng: [34.3678, 134.1067],
        desc: "高松屋島山上展望台,一覽瀨戶內海多島海景,夕陽與夜景人氣高。投瓦祈福(投瓦片)很有名,新地標『やしまーる』迴廊增添藝術氣息。"
      },
      {
        name: "四國水族館", area: "宇多津", hours: "9:00–18:00(依季節)",
        latlng: [34.2956, 133.8169],
        desc: "2020 年開幕,以四個特色水槽(綿津見/夕陽/渦潮/神無月之景)與六大區域展示約 400 種四國近海生物。夕陽之景搭配海豚秀是亮點,雨天親子也適合。",
        ref: { title: "潔妮・四國水族館巨型水槽海豚秀", url: "https://janice.life/shikokuaquarium/" }
      }
    ],

    food: [
      { name: "讚岐烏龍麵 上原屋本店", area: "高松", stars: 5, note: "栗林公園旁自助烏龍", ref: { title: "許傑・上原屋本店自助烏龍", url: "https://journey.tw/ueharayahonten/" } },
      { name: "骨付鳥 一鶴", area: "高松", stars: 5, note: "骨付鳥元祖名店", ref: { title: "Star_Chu・骨付鳥一鶴高松店", url: "https://starland.pixnet.net/blog/post/348999610" } },
      { name: "小豆島拉麵 HISHIO", area: "小豆島", stars: 4, note: "醬油拉麵配海景", ref: { title: "許傑・小豆島拉麵 HISHIO", url: "https://journey.tw/hishio/" } },
      { name: "鐵板燒 夢路", area: "小豆島", stars: 4, note: "小豆島鐵板燒", ref: { title: "", url: "" } },
      { name: "松山鯛めし 秋嘉", area: "松山", stars: 4, note: "松山鯛魚飯專門店", ref: { title: "", url: "" } },
      { name: "海鮮居酒屋 象三", area: "松山", stars: 4, note: "瀨戶內四季海鮮", ref: { title: "", url: "" } },
      { name: "濱之台所・潮里", area: "今治", stars: 4, note: "今治海鮮料理", ref: { title: "", url: "" } },
      { name: "レストハウス古都", area: "四萬十", stars: 4, note: "四萬十川沿線餐廳", ref: { title: "", url: "" } },
      { name: "星野 OMO7 自助餐", area: "高知", stars: 4, note: "飯店自助餐", ref: { title: "", url: "" } },
      { name: "拉麵東大 徳島本店", area: "徳島", stars: 4, note: "德島拉麵第一名・生蛋吃到飽", ref: { title: "右上世界食旅・德島東大拉麵", url: "https://www.travalearth.com/post-32307811/" } },
      { name: "瀨戶の祭 迴轉壽司", area: "高松", stars: 4, note: "瀨戶內海百元迴轉壽司", ref: { title: "許傑・瀨戶の祭迴轉壽司", url: "https://journey.tw/seto-matsuri-sushi/" } },
      { name: "麺處 綿谷", area: "高松", stars: 4, note: "肉烏龍人氣名店", ref: { title: "", url: "" } },
      { name: "寄鳥味鳥", area: "高松", stars: 5, note: "骨付鳥人氣名店", ref: { title: "許傑・寄鳥味鳥骨付鳥", url: "https://journey.tw/yoridorimidori1986/" } },
      { name: "グリル プランチャ", area: "高松", stars: 4, note: "高松洋食 grill", ref: { title: "", url: "" } }
    ],

    weather: [
      "四國 10 月:約 17–24°C,秋高氣爽舒適",
      "早晚偏涼,薄外套備用",
      "山區(寒霞溪)賞楓更涼,洋蔥式穿搭"
    ],
    info: [
      { title: "🚗 自駕注意", items: ["10/11–10/16 JR 高松站取還車", "日本靠左行駛,國際駕照+台灣駕照正本+護照", "高速 ETC 收費,景點多免費停車", "導航用 MAPCODE 或電話"] },
      { title: "📅 提前預約", items: ["小豆島渡輪班次先查時刻表", "鳴門觀潮船(小型 AQUA EDDY 需預約)", "星野 OMO7 自助餐", "一鶴、寄鳥味鳥等骨付鳥名店常排隊"] },
      { title: "🍜 四國必吃", items: ["讚岐烏龍麵(香川)", "骨付鳥(高松名物)", "鯛めし(愛媛)", "德島拉麵(徳島)", "小豆島醬油拉麵"] },
      { title: "🌊 行程提醒", items: ["天使之路看潮汐、鳴門渦潮看觀潮表", "小豆島當日往返高松搭渡輪", "跨四縣自駕,單日移動距離較長"] }
    ],
    notes: [
      "租車期間 10/11–10/16,先規劃好取還車時間。",
      "小豆島為離島須搭渡輪,留意末班船時刻。",
      "人氣餐廳(一鶴、寄鳥味鳥、東大)建議避開尖峰或預留排隊時間。"
    ]
  },

  {
    id: "busan-2026",
    title: "釜山冬遊之旅",
    subtitle: "海雲台・廣安里・南浦",
    country: "韓國",
    region: "釜山",
    year: 2026,
    dateLabel: "1/29 – 2/3",
    dateStart: "2026-01-29",
    dateEnd: "2026-02-03",
    nights: 5,
    status: "旅遊回憶",
    recommended: false,
    tagline: "海雲台膠囊列車・廣安里無人機秀・釜山樂天世界・道地豬肉湯飯",
    themes: ["親子", "主題樂園", "美食", "冬遊"],
    mapCenter: [35.13, 129.10],
    mapZoom: 10,

    flight: {
      airline: "中華航空 China Airlines",
      out: "1/29 桃園 TPE → 釜山 PUS(18:50 抵達)",
      back: "2/3 釜山 PUS → 桃園(11:50)",
      note: "金海機場進出・海雲台為據點,地鐵周遊"
    },
    stay: [
      { name: "L7 海雲台 by LOTTE", nights: "全程 5 晚", note: "海雲台・樂天集團設計飯店" }
    ],
    pass: {
      icon: "🚇", label: "交通",
      name: "釜山地鐵 + 巴士",
      price: "建議 T-money 卡",
      head: ["路段", "交通", "備註"],
      rows: [
        ["金海機場 → 海雲台", "機場巴士 / 輕電鐵+地鐵", "約 50–70 分"],
        ["海雲台 ↔ 西面/南浦", "地鐵 2 號線", "T-money 嗶卡"],
        ["機張(樂天世界)", "東海線電鐵 → 奧西利亞站", "約 30 分"],
        ["市區移動", "計程車(Kakao T 叫車)", "跳表合理"]
      ]
    },

    days: [
      {
        day: 1, date: "1/29 (四)", theme: "✈ 抵達釜山・海雲台",
        items: [
          { time: "18:50", text: "抵達釜山金海機場,前往海雲台入住" },
          { time: "晚餐", text: "水邊最高豬肉湯飯(海雲台)" },
          { time: "住宿", text: "L7 海雲台 by LOTTE" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "金海機場 →(機場巴士 / 輕電鐵+地鐵約 50–70 分)海雲台" }
        ]
      },
      {
        day: 2, date: "1/30 (五)", theme: "🎢 海雲台・機張樂天世界",
        items: [
          { time: "玩", text: "釜山樂天世界、樂天 Outlet 東釜山(機張)" },
          { time: "午餐", text: "樂天世界園內用餐" },
          { time: "晚餐", text: "the east 3 樓(機張海景)" },
          { time: "住宿", text: "L7 海雲台 by LOTTE" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "東海線電鐵 → 奧西利亞(OSIRIA)站,步行約 10 分至樂天世界" }
        ]
      },
      {
        day: 3, date: "1/31 (六)", theme: "🚝 海雲台・廣安里",
        items: [
          { time: "玩", text: "天空膠囊列車、海岸列車、鑽石灣遊艇、廣安里無人機表演" },
          { time: "午餐", text: "Diart Coffee(青沙浦海景・土耳其蜂蜜奶油吐司)" },
          { time: "晚餐", text: "釜山宅烤肉(廣安里炭火燒肉)" },
          { time: "住宿", text: "L7 海雲台 by LOTTE" }
        ],
        tips: [
          { type: "warn", title: "提醒", text: "膠囊列車提前官網預約;廣安里無人機秀僅週六晚間(冬季約 19:00/21:00),天候不佳可能取消" }
        ]
      },
      {
        day: 4, date: "2/1 (日)", theme: "🎨 西面・南浦",
        items: [
          { time: "玩", text: "松島海上纜車、ARTE Museum、BIFF 廣場" },
          { time: "午餐", text: "秀英家豬肉湯飯(西面湯飯一條街)" },
          { time: "晚餐", text: "紅油短中華料理(南浦洞)" },
          { time: "住宿", text: "L7 海雲台 by LOTTE" }
        ]
      },
      {
        day: 5, date: "2/2 (一)", theme: "🐠 海雲台一日",
        items: [
          { time: "玩", text: "SEA LIFE 水族館、海雲台海灘、新世界百貨 Centum City、釜山 X the Sky" },
          { time: "午餐", text: "海雲台 31 公分海鮮刀削麵" },
          { time: "晚餐", text: "味讚王鹽烤肉(海雲台)" },
          { time: "住宿", text: "L7 海雲台 by LOTTE" }
        ]
      },
      {
        day: 6, date: "2/3 (二)", theme: "✈ 回台灣",
        items: [
          { time: "上午", text: "飯店退房,前往金海機場" },
          { time: "11:50", text: "釜山 → 台灣,滿載而歸!" }
        ],
        tips: [
          { type: "warn", title: "提醒", text: "班機 11:50,建議提前 2 小時抵達金海機場" }
        ]
      }
    ],

    spots: [
      {
        name: "釜山樂天世界", area: "機張", hours: "10:00–19:00(假日至 20:00)",
        latlng: [35.1936, 129.2167],
        desc: "韓國最大的童話風主題樂園,位於機張奧西利亞,24 項遊樂設施與大型城堡、森林系場景超好拍,定時表演與遊行精彩。鄰近海東龍宮寺、機張市場。",
        ref: { title: "蔡小妞依玲・釜山樂天世界冒險樂園", url: "https://tsnio.com/lotte-world-adventure-busan/" }
      },
      {
        name: "海雲台藍線公園(膠囊・海岸列車)", area: "海雲台", hours: "依官網班次",
        latlng: [35.1583, 129.1747],
        desc: "由舊東海南部線改建的 4.8km 海岸鐵道:上層天空膠囊列車(4 人小車廂、離地 7–10m)、下層海岸列車面海而行,串起尾浦–青沙浦–松亭。廣安大橋海景與韓版櫻木花道平交道必拍。膠囊列車務必官網提前預約。",
        ref: { title: "樂活的大方・海雲台藍線公園全攻略", url: "https://www.bigfang.tw/blog/post/bluelinepark-busan" }
      },
      {
        name: "鑽石灣遊艇", area: "海雲台", hours: "日/夜多班次",
        latlng: [35.1556, 129.1456],
        desc: "海雲台雙層大型遊艇,日間五六島航線、夜間海雲台–廣安里航線,從海上眺望廣安大橋與海岸夜景。持 Visit Busan Pass 日間免費、夜間加價搭乘,建議線上預約。",
        ref: { title: "愛旅遊的貓奴小梨・鑽石灣遊艇", url: "https://judyer.com/diamond/" }
      },
      {
        name: "廣安里無人機表演", area: "廣安里", hours: "週六晚間(冬季 19:00/21:00)",
        latlng: [35.1532, 129.1186],
        desc: "全韓最大規模的常態無人機燈光秀,每週六晚於廣安里海灘上空演出,約 700 架無人機結合廣安大橋打造彩色光雕,每場約 10 分鐘、一晚兩場。天候不佳可能取消。",
        ref: { title: "一起去巴黎 Liz・廣安里無人機表演", url: "https://lizzzstyle.tw/gwangallimdrone/" }
      },
      {
        name: "松島海上纜車", area: "松島", hours: "約 9:00–20:00",
        latlng: [35.0758, 129.0181],
        desc: "韓國首條跨海纜車(Busan Air Cruise),全長逾 1.6km、最高 86m,透明水晶車廂俯瞰松島海水浴場,可順遊松島龍宮雲橋空中步道。持 Visit Busan Pass 可免費搭水晶車廂。",
        ref: { title: "蔡小妞依玲・松島海上纜車龍宮雲橋", url: "https://tsnio.com/busan-air-cruise/" }
      },
      {
        name: "ARTE Museum 釜山", area: "影島", hours: "約 10:00–20:00",
        latlng: [35.0866, 129.0744],
        desc: "d'strict 打造、佔地約 1700 坪的全球最大沉浸式光影美術館,以『永恆自然』為題,19 件數位媒體藝術中 16 件為釜山限定。喜歡 teamLab 的人必訪,持 VBP 可免費入場。",
        ref: { title: "許傑・釜山 Arte Museum", url: "https://journey.tw/arte-museum-busan/" }
      },
      {
        name: "BIFF 廣場", area: "南浦洞", hours: "店家約 10:00–22:00",
        latlng: [35.0986, 129.0269],
        desc: "釜山國際電影節發源地,地上有電影人手印與銅像,周邊串起國際市場、富平罐頭夜市、光復路時尚街與札嘎其海鮮市場。必吃排隊糖餅(호떡)。",
        ref: { title: "Mimi韓・南浦洞札嘎其逛街地圖", url: "https://mimigo.tw/nampo-dong-trips/" }
      },
      {
        name: "釜山 X the Sky", area: "海雲台", hours: "約 10:00–21:00",
        latlng: [35.1592, 129.1739],
        desc: "位於海雲台 LCT The Sharp(411.6m)、韓國最高觀景台,100 樓 360 度俯瞰海雲台海岸線、廣安大橋與市景,還有世界最高星巴克。日落與夜景人氣極高。",
        ref: { title: "樂活的大方・釜山 X the Sky 觀景台", url: "https://www.bigfang.tw/blog/post/busan-x-thesky" }
      },
      {
        name: "SEA LIFE 釜山水族館", area: "海雲台", hours: "約 10:00–19:00",
        latlng: [35.1597, 129.1606],
        desc: "海雲台海灘旁的大型地下水族館,主缸 3500 噸、80 公尺海底隧道,展示逾 250 種、上萬隻海洋生物,有美人魚表演與鯊魚餵食秀,是雨天/寒天親子首選。",
        ref: { title: "波比看世界・SEA LIFE 釜山水族館", url: "https://bobbytravel.tw/sea-life-busan/" }
      },
      {
        name: "海雲台海灘", area: "海雲台", hours: "戶外・全日",
        latlng: [35.1587, 129.1604],
        desc: "釜山最具代表的海水浴場,冬日海風凜冽但海景遼闊,沿岸有冬柏島、The Bay 101 夜景與眾多海景咖啡廳,適合散步拍照。"
      },
      {
        name: "新世界百貨 Centum City", area: "Centum City", hours: "約 10:30–20:00",
        latlng: [35.1689, 129.1294],
        desc: "金氏世界紀錄認證全球最大百貨,集精品、SPA LAND 汗蒸幕、美食街與屋頂花園於一身,是冬日逛街避寒的好去處。"
      }
    ],

    food: [
      { name: "水邊最高豬肉湯飯", area: "海雲台", stars: 5, note: "釜山三大豬肉湯飯", ref: { title: "一起去巴黎 Liz・水邊最高豬肉湯飯", url: "https://lizzzstyle.tw/su-byeon/" } },
      { name: "the east 3 樓", area: "機張", stars: 4, note: "機張海景餐廳", ref: { title: "", url: "" } },
      { name: "Diart Coffee", area: "青沙浦", stars: 4, note: "土耳其蜂蜜奶油吐司・海景", ref: { title: "windko・青沙浦 DIART COFFEE", url: "https://windko.tw/diart-coffee/" } },
      { name: "釜山宅烤肉", area: "廣安里", stars: 4, note: "廣安里炭火燒肉", ref: { title: "We4 Travel・廣安里炭火燒肉釜山宅", url: "https://we4-travel.com/busandeak/" } },
      { name: "秀英家豬肉湯飯", area: "西面", stars: 5, note: "西面湯飯一條街・24h", ref: { title: "樂活的大方・秀英本家豬肉湯飯", url: "https://www.bigfang.tw/blog/post/suyeong-porksoup-seomyeon" } },
      { name: "紅油短中華料理", area: "南浦洞", stars: 4, note: "南浦洞中華料理", ref: { title: "", url: "" } },
      { name: "海雲台 31 公分海鮮刀削麵", area: "海雲台", stars: 4, note: "比臉大海鮮刀削麵", ref: { title: "樂活的大方・海雲台 31cm 海鮮刀削麵", url: "https://www.bigfang.tw/blog/post/haeundae-31cm-noodle" } },
      { name: "味讚王鹽烤肉", area: "海雲台", stars: 5, note: "3.5cm 厚切鹽烤肉・專人代烤", ref: { title: "樂活的大方・味贊王鹽烤肉海雲台", url: "https://www.bigfang.tw/blog/post/matwang-haeundae-busan" } }
    ],

    weather: [
      "釜山 1–2 月:約 -1 ~ 8°C,乾冷",
      "海邊風大體感更冷,保暖防風外套、帽子手套必備",
      "室內外溫差大,洋蔥式穿搭"
    ],
    info: [
      { title: "🎫 Visit Busan Pass", items: ["鑽石灣遊艇、松島纜車、ARTE Museum、X the Sky 多為 VBP 免費/優惠", "行程多景點時購 Pass 較划算", "換票/入場規則先看官網"] },
      { title: "📅 提前預約", items: ["天空膠囊列車官網提前 3–4 週預約", "鑽石灣遊艇線上預約", "廣安里無人機秀僅週六、天候不佳可能取消"] },
      { title: "🍜 釜山必吃", items: ["豬肉湯飯(돼지국밥)", "鹽烤肉厚切五花", "海鮮刀削麵", "BIFF 廣場糖餅(호떡)"] },
      { title: "🚇 交通提醒", items: ["T-money 卡搭地鐵/巴士", "機張樂天世界搭東海線到奧西利亞", "計程車用 Kakao T 叫車方便"] }
    ],
    notes: [
      "冬季釜山乾冷,務必保暖防風。",
      "廣安里無人機秀限週六、受天候影響,先確認當週是否演出。",
      "熱門餐廳(豬肉湯飯、鹽烤肉)用餐尖峰需排隊。"
    ]
  },

  {
    id: "kansai-sanyo-2025",
    title: "關西・山陽鐵道之旅",
    subtitle: "大阪・岡山・廣島・京都",
    country: "日本",
    region: "關西・山陽",
    year: 2025,
    dateLabel: "12/6 – 12/14",
    dateStart: "2025-12-06",
    dateEnd: "2025-12-14",
    nights: 8,
    status: "旅遊回憶",
    recommended: false,
    tagline: "宮島海上鳥居・倉敷美觀・宇治平等院・天橋立・teamLab 植物園",
    themes: ["鐵路", "世界遺產", "親子", "美食"],
    mapCenter: [34.95, 134.1],
    mapZoom: 7,

    flight: {
      airline: "國泰航空 Cathay Pacific",
      out: "12/6 桃園 TPE → 大阪 KIX",
      back: "12/14 大阪 KIX → 桃園",
      note: "關西機場進出・大阪/岡山/京都周遊・JR Pass(Day2–6)"
    },
    stay: [
      { name: "阪急大阪 RESPIRE 飯店", nights: "12/6 ・ 1 晚", note: "大阪梅田" },
      { name: "岡山格蘭比亞酒店", nights: "12/7–12/10 ・ 3 晚", note: "JR 岡山站直結" },
      { name: "京都世紀飯店", nights: "12/10–12/12 ・ 2 晚", note: "JR 京都站旁・含早餐" },
      { name: "星野 OMO7 大阪", nights: "12/12–12/14 ・ 2 晚", note: "新今宮・含早餐" }
    ],
    pass: {
      icon: "🚄", label: "鐵路周遊券",
      name: "關西&廣島地區鐵路周遊券",
      price: "Day2–Day6 使用",
      head: ["路段", "車種", "時間"],
      rows: [
        ["新大阪 ↔ 岡山", "山陽新幹線", "約 45 分"],
        ["岡山 ↔ 廣島", "山陽新幹線", "約 35 分"],
        ["廣島 → 宮島口 → 宮島", "JR + 宮島渡輪", "約 30 分"],
        ["岡山 ↔ 京都", "山陽/東海道新幹線", "約 1 小時"],
        ["京都 ↔ 天橋立", "JR + 京都丹後鐵道", "約 2 小時"]
      ]
    },

    days: [
      {
        day: 1, date: "12/6 (六)", theme: "✈ 抵達大阪・梅田",
        items: [
          { time: "抵達", text: "抵達關西機場,前往大阪梅田入住" },
          { time: "玩", text: "梅田周邊(梅田藍天大廈空中庭園、購物)" },
          { time: "晚餐", text: "燒肉力丸 梅田" },
          { time: "住宿", text: "阪急大阪 RESPIRE 飯店" }
        ]
      },
      {
        day: 2, date: "12/7 (日)", theme: "🏯 大阪 → 岡山・後樂園與岡山城",
        items: [
          { time: "上午", text: "搭山陽新幹線 大阪 → 岡山(約 45 分)" },
          { time: "玩", text: "岡山後樂園(日本三名園)、岡山城(烏城)" },
          { time: "午餐", text: "岡山車站二樓美食街" },
          { time: "晚餐", text: "一人鍋 惠 或 燒肉 J's 苑" },
          { time: "住宿", text: "岡山格蘭比亞酒店" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "山陽新幹線 新大阪 → 岡山約 45 分;岡山站直結格蘭比亞" }
        ]
      },
      {
        day: 3, date: "12/8 (一)", theme: "⛩ 岡山 ↔ 廣島・宮島與和平公園",
        items: [
          { time: "上午", text: "搭山陽新幹線 岡山 → 廣島,轉 JR + 渡輪至宮島" },
          { time: "玩", text: "宮島嚴島神社海上鳥居、宮島纜車;廣島原爆圓頂、和平紀念資料館" },
          { time: "午餐", text: "宮島牡蠣屋 或 牡蠣之林(烤牡蠣)" },
          { time: "晚餐", text: "長田屋 廣島燒" },
          { time: "住宿", text: "岡山格蘭比亞酒店" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "岡山 ↔ 廣島 山陽新幹線約 35 分;廣島 → 宮島口 → 渡輪約 30 分" },
          { type: "warn", title: "提醒", text: "嚴島神社海上鳥居依潮汐:漲潮浮於海上、退潮可步行至鳥居,先查潮汐表" }
        ]
      },
      {
        day: 4, date: "12/9 (二)", theme: "🏘 岡山・倉敷美觀",
        items: [
          { time: "玩", text: "倉敷美觀地區(白壁老街、倉敷川遊船)、倉敷三井 Outlet" },
          { time: "午餐", text: "梅之木味噌豬排 或 有鄰庵(幸福布丁)" },
          { time: "晚餐", text: "一人鍋 惠 或 燒肉 J's 苑" },
          { time: "住宿", text: "岡山格蘭比亞酒店" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "岡山 ↔ 倉敷 JR 約 15 分" }
        ]
      },
      {
        day: 5, date: "12/10 (三)", theme: "🍵 岡山 → 京都・宇治平等院",
        items: [
          { time: "上午", text: "搭新幹線 岡山 → 京都,轉 JR 奈良線至宇治" },
          { time: "玩", text: "宇治平等院鳳凰堂、上賀茂神社、京都塔" },
          { time: "午餐", text: "中村藤吉 抹茶(宇治本店)" },
          { time: "晚餐", text: "新福菜館 拉麵" },
          { time: "住宿", text: "京都世紀飯店" }
        ],
        tips: [
          { type: "warn", title: "提醒", text: "平等院鳳凰堂內部需現場拿號碼牌、分梯入場,一到先領票" }
        ]
      },
      {
        day: 6, date: "12/11 (四)", theme: "🐉 京都・天橋立",
        items: [
          { time: "早餐", text: "飯店 Buffet" },
          { time: "玩", text: "天橋立 View Land(飛龍觀吊椅纜車)、海鷗觀光船" },
          { time: "午餐", text: "野雞三仙兵衛(天橋立)" },
          { time: "晚餐", text: "京的燒肉處 弘 或 名代豬排かつくら" },
          { time: "住宿", text: "京都世紀飯店" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "京都 ↔ 天橋立 JR + 京都丹後鐵道約 2 小時,建議安排整天" }
        ]
      },
      {
        day: 7, date: "12/12 (五)", theme: "🎨 京都 → 大阪・下鴨神社與 teamLab",
        items: [
          { time: "早餐", text: "飯店 Buffet" },
          { time: "玩", text: "下鴨神社(糺之森)、道頓堀逛街(扭蛋之森)、大阪 teamLab 長居植物園(夜間)" },
          { time: "晚餐", text: "壽司郎 天王寺店" },
          { time: "住宿", text: "星野 OMO7 大阪" }
        ],
        tips: [
          { type: "info", title: "提醒", text: "teamLab 長居植物園為夜間常設展,線上預約較保險" }
        ]
      },
      {
        day: 8, date: "12/13 (六)", theme: "🦓 大阪・天王寺",
        items: [
          { time: "早餐", text: "飯店 Buffet" },
          { time: "玩", text: "天王寺動物園、阿倍野 HARUKAS 300 展望台(夜景)、大國藥妝(天王寺逛街)" },
          { time: "晚餐", text: "一蘭 阿倍野店" },
          { time: "住宿", text: "星野 OMO7 大阪" }
        ]
      },
      {
        day: 9, date: "12/14 (日)", theme: "✈ 返回台灣",
        items: [
          { time: "早餐", text: "飯店 Buffet" },
          { time: "上午", text: "飯店退房,前往關西機場返台,滿載而歸!" }
        ],
        tips: [
          { type: "warn", title: "提醒", text: "建議提前 2.5–3 小時抵達關西機場辦理出境" }
        ]
      }
    ],

    spots: [
      {
        name: "大阪梅田", area: "大阪", hours: "店家約 10:00–21:00",
        latlng: [34.7025, 135.4959],
        desc: "大阪北區商業中心,梅田藍天大廈空中庭園展望台、阪急/阪神百貨、Grand Front 與 LUCUA 購物聚集,夜景與聖誕點燈季節氛圍濃厚。"
      },
      {
        name: "岡山後樂園", area: "岡山", hours: "7:30/8:00–17:00(依季節)",
        latlng: [34.6657, 133.9356],
        desc: "日本三名園之一、米其林綠色指南三星,廣闊草坪、水池與唯心山借景岡山城,四季皆美。澤之池西北側可同框古城與池水倒影,清晨光線最柔。",
        ref: { title: "凱子凱・後樂園&岡山城", url: "https://ksk.tw/blog/post/350054986" }
      },
      {
        name: "岡山城", area: "岡山", hours: "9:00–17:30",
        latlng: [34.6651, 133.9361],
        desc: "黑色城牆加金色裝飾、人稱『烏城』,2022 年整修後重新開放,與對岸後樂園隔旭川相望。天守內有歷史展示與體驗,可穿城主服拍照。",
        ref: { title: "日本。私旅行・黑武士岡山城", url: "https://aliciatseng.net/blog/post/48719067" }
      },
      {
        name: "宮島嚴島神社", area: "宮島", hours: "6:30–18:00(依季節)",
        latlng: [34.2960, 132.3197],
        desc: "世界文化遺產、日本三景之一,朱紅海上大鳥居為廣島地標。漲潮時神社與鳥居浮於海上、退潮可步行至鳥居下,可搭宮島纜車登彌山俯瞰瀨戶內海。",
        ref: { title: "福寶媽・宮島一日遊", url: "https://gogojp.tw/miyajima-trip/" }
      },
      {
        name: "廣島和平紀念公園", area: "廣島", hours: "資料館 8:30–18:00",
        latlng: [34.3955, 132.4536],
        desc: "原爆圓頂(原爆 Dome)為 1945 年原子彈爆炸後唯一倖存建物,1996 年列為世界遺產。和平紀念資料館完整呈現核爆史實與祈願世界和平,園內有和平之火、原爆之子像。",
        ref: { title: "許傑・廣島原爆圓頂與和平紀念公園", url: "https://journey.tw/peace-hiroshima/" }
      },
      {
        name: "倉敷美觀地區", area: "倉敷", hours: "店家約 10:00–17:00",
        latlng: [34.5979, 133.7714],
        desc: "400 年歷史的白壁老街,倉敷川兩岸柳樹、町家與倉庫改建的咖啡選物店林立,可搭川舟遊船,大原美術館、長春藤廣場、紙膠帶文青店都在此。",
        ref: { title: "BringYou・倉敷美觀地區自由行攻略", url: "https://www.bring-you.info/zh-tw/kurashiki-travel-guide" }
      },
      {
        name: "宇治平等院", area: "宇治", hours: "庭園 8:30–17:30",
        latlng: [34.8893, 135.8076],
        desc: "1053 年建、世界文化遺產,鳳凰堂為十円硬幣與舊萬元紙鈔取景地,阿字池倒映鳳凰堂如鏡。鳳凰堂內部分梯限額入場(需現場領號),鳳翔館藏國寶文物。",
        ref: { title: "來一球叭噗・宇治平等院鳳凰堂", url: "https://gototravel.tw/uji-byodoin/" }
      },
      {
        name: "上賀茂神社", area: "京都", hours: "境內 5:30–17:00",
        latlng: [35.0606, 135.7528],
        desc: "京都最古老神社之一、世界文化遺產(古都京都的文化財),以兩座圓錐『立砂』與朱紅樓門著稱,清流御手洗川流經境內,與下鴨神社並稱賀茂兩社。"
      },
      {
        name: "京都塔", area: "京都", hours: "10:00–21:00",
        latlng: [34.9876, 135.7591],
        desc: "京都車站正對面的城市地標,展望台位於地面 100m 處,360 度俯瞰京都市景與東山,天氣好可遠眺清水寺。日落前後最美,塔下有 SANDO 美食與伴手禮。",
        ref: { title: "許傑・京都塔展望台", url: "https://journey.tw/kyoto-tower/" }
      },
      {
        name: "天橋立 View Land", area: "天橋立", hours: "約 9:00–17:00",
        latlng: [35.5667, 135.1939],
        desc: "位於文珠山頂、欣賞日本三景天橋立的展望樂園,搭單人吊椅或纜車登頂,從『飛龍觀』跨下倒看,長沙洲宛如飛龍升天。可再搭觀光船餵海鷗橫渡。",
        ref: { title: "樂活的大方・天橋立 View Land 飛龍觀", url: "https://www.bigfang.tw/blog/post/kyoto-amanohashidate-viewland" }
      },
      {
        name: "下鴨神社", area: "京都", hours: "境內 6:30–17:00",
        latlng: [35.0388, 135.7728],
        desc: "世界文化遺產,境內原生林『糺之森』約 12 萬㎡、樹齡 200–600 年,秋日紅葉銀杏絕美。求姻緣的相生社、美人社河合神社與夢幻四季御守人氣高。",
        ref: { title: "芒果這一家・下鴨神社糺之森", url: "https://mangofamily56.com/shimogamo-jinja/" }
      },
      {
        name: "道頓堀(扭蛋之森)", area: "大阪", hours: "店家約 10:00–22:00",
        latlng: [34.6687, 135.5013],
        desc: "大阪最熱鬧的水岸商圈,固力果跑跑人看板、章魚燒與大型招牌林立,周邊有大型扭蛋專賣店(扭蛋之森/扭蛋百貨),扭蛋機如森林般成排,扭蛋控必逛。"
      },
      {
        name: "teamLab 長居植物園", area: "大阪・長居", hours: "夜間常設展(日落後)",
        latlng: [34.6135, 135.5187],
        desc: "大阪長居植物園內的夜間沉浸式光影藝術常設展,十多件作品融入真實樹林與池水,隨風雨與人的互動變化,漫步森林光影中超夢幻。建議線上預約。",
        ref: { title: "BringYou・teamLab 長居植物園夜間展", url: "https://www.bring-you.info/zh-tw/teamlab-botanical-garden-osaka" }
      },
      {
        name: "天王寺動物園", area: "天王寺", hours: "9:30–17:00(週一休)",
        latlng: [34.6519, 135.5089],
        desc: "1915 年開園、市區內的百年動物園,約 170 種動物採生態展示,北極熊餵食秀、企鵝公園與海獅碼頭人氣高。緊鄰通天閣、新世界,持大阪周遊卡可免費入場。",
        ref: { title: "Mimi韓・天王寺動物園", url: "https://mimigo.tw/osaka-zoo/" }
      },
      {
        name: "阿倍野 HARUKAS 300", area: "天王寺", hours: "9:00–22:00",
        latlng: [34.6459, 135.5132],
        desc: "日本數一數二高樓(300m)頂端的 360 度展望台,玻璃空中漫步俯瞰大阪市景與大阪灣,日落後魔幻時刻夜景最美,58–60 樓還有空中花園與咖啡。",
        ref: { title: "波比看世界・阿倍野展望台 HARUKAS 300", url: "https://bobbytravel.tw/harukas-300/" }
      }
    ],

    food: [
      { name: "燒肉力丸 梅田", area: "梅田", stars: 4, note: "和牛燒肉吃到飽", ref: { title: "水晶安蹄・燒肉力丸梅田", url: "https://auntie.tw/yakiniku-rikimaru/" } },
      { name: "一人鍋 惠 / 燒肉 J's 苑", area: "岡山", stars: 4, note: "岡山晚餐(一人鍋/燒肉)", ref: { title: "", url: "" } },
      { name: "宮島牡蠣屋", area: "宮島", stars: 5, note: "宮島排名第一烤牡蠣", ref: { title: "金大佛・宮島牡蠣屋", url: "https://yama.tw/kakiya/" } },
      { name: "長田屋 廣島燒", area: "廣島", stars: 5, note: "和平公園旁排隊廣島燒", ref: { title: "周花花・長田屋廣島燒", url: "https://tenjo.tw/nagataya/" } },
      { name: "有鄰庵 / 梅之木味噌豬排", area: "倉敷", stars: 4, note: "倉敷古宅幸福布丁", ref: { title: "許傑・倉敷有鄰庵幸福布丁", url: "https://journey.tw/yuurin-an/" } },
      { name: "中村藤吉 抹茶", area: "宇治", stars: 5, note: "宇治百年抹茶聖代", ref: { title: "莉芙小姐・中村藤吉宇治本店", url: "https://travelerliv.com/tokichi/" } },
      { name: "新福菜館 拉麵", area: "京都", stars: 4, note: "京都最早醬油拉麵・炒飯", ref: { title: "樂活的大方・新福菜館本店", url: "https://www.bigfang.tw/blog/post/shinpuku-ramen-kyoto" } },
      { name: "京的燒肉處 弘", area: "京都", stars: 5, note: "京都人氣和牛燒肉", ref: { title: "樂活的大方・京的燒肉處弘", url: "https://www.bigfang.tw/blog/post/yakiniku-hiro-kyoto-ekimae" } },
      { name: "名代豬排 かつくら", area: "京都", stars: 4, note: "排隊炸豬排名店", ref: { title: "周花花・名代豬排かつくら", url: "https://tenjo.tw/katsukura/" } },
      { name: "壽司郎 天王寺店", area: "天王寺", stars: 4, note: "迴轉壽司", ref: { title: "", url: "" } },
      { name: "一蘭 阿倍野店", area: "阿倍野", stars: 4, note: "豚骨拉麵", ref: { title: "", url: "" } }
    ],

    weather: [
      "關西/山陽 12 月:約 4–12°C,冬日乾冷",
      "京都、天橋立山區更冷,保暖外套、圍巾必備",
      "日落早(約 17:00),夜景行程注意時間"
    ],
    info: [
      { title: "🎫 JR Pass", items: ["關西&廣島地區鐵路周遊券 Day2–Day6 使用", "可搭山陽新幹線(自由席)與 JR 在來線", "宮島渡輪 JR 船班可用"] },
      { title: "📅 預約/提醒", items: ["平等院鳳凰堂內部需現場拿號碼牌", "teamLab 長居植物園線上預約", "京的燒肉處弘、燒肉力丸建議網路訂位", "嚴島神社看潮汐(漲退潮兩種風貌)"] },
      { title: "🍜 在地必吃", items: ["廣島燒(廣島)", "宮島烤牡蠣", "倉敷幸福布丁", "宇治抹茶", "京都拉麵/和牛燒肉"] },
      { title: "🚄 交通提醒", items: ["山陽新幹線串聯大阪–岡山–廣島", "岡山 ↔ 倉敷 JR 約 15 分", "京都 ↔ 天橋立較遠(約 2 小時),安排整天"] }
    ],
    notes: [
      "12 月關西山陽偏冷,務必保暖。",
      "平等院鳳凰堂、teamLab 等熱門點建議早到或線上預約。",
      "宮島依潮汐有海上鳥居/可步行兩種風貌,先查潮汐表。"
    ]
  },

  {
    id: "tohoku-winter-2025",
    title: "東北・函館雪之旅",
    subtitle: "仙台・青森・函館・山形",
    country: "日本",
    region: "東北・函館",
    year: 2025,
    dateLabel: "3/1 – 3/9",
    dateStart: "2025-03-01",
    dateEnd: "2025-03-09",
    nights: 8,
    status: "旅遊回憶",
    recommended: false,
    tagline: "藏王樹冰・銀山溫泉・函館夜景・奧入瀨冰瀑・狐狸村",
    themes: ["鐵路", "溫泉", "雪景", "親子"],
    mapCenter: [39.8, 140.6],
    mapZoom: 6,

    flight: {
      airline: "長榮航空 EVA Air",
      out: "3/1 桃園 TPE → 仙台 SDJ",
      back: "3/9 仙台 SDJ → 桃園",
      note: "仙台進出・青森/函館/山形周遊"
    },
    stay: [
      { name: "東仙台大都會飯店", nights: "D1、D6–D9 ・ 共 4 晚", note: "仙台・據點飯店" },
      { name: "星野 奧入瀨溪流飯店", nights: "D2 ・ 1 晚", note: "青森・冬季冰瀑之湯" },
      { name: "星野 青森屋", nights: "D3 ・ 1 晚", note: "青森・睡魔祭主題溫泉" },
      { name: "函館 JR Inn", nights: "D4–D5 ・ 2 晚", note: "JR 函館站旁" }
    ],
    pass: {
      icon: "🚄", label: "交通",
      name: "JR 東日本・南北海道鐵路周遊券",
      price: "建議使用",
      head: ["路段", "車種", "時間"],
      rows: [
        ["仙台 ↔ 青森", "東北新幹線 はやぶさ", "約 1.5 小時"],
        ["青森 → 函館", "北海道新幹線(新青森–新函館北斗)", "約 1 小時"],
        ["仙台 ↔ 山形", "JR 仙山線", "約 1.2 小時"],
        ["藏王/松島/狐狸村", "JR + 巴士/一日遊", "當地接駁"]
      ]
    },

    days: [
      {
        day: 1, date: "3/1 (六)", theme: "✈ 抵達仙台",
        items: [
          { time: "抵達", text: "抵達仙台機場,前往市區入住" },
          { time: "住宿", text: "東仙台大都會飯店" }
        ]
      },
      {
        day: 2, date: "3/2 (日)", theme: "❄ 仙台 → 青森・奧入瀨冰瀑",
        items: [
          { time: "上午", text: "搭東北新幹線 仙台 → 青森(約 1.5 小時)" },
          { time: "玩", text: "奧入瀨溪流冬季冰瀑、雪地健行" },
          { time: "住宿", text: "星野 奧入瀨溪流飯店(冰瀑之湯)" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "仙台 → 新青森 東北新幹線約 1.5 小時;奧入瀨冰瀑健行為飯店預約制" }
        ]
      },
      {
        day: 3, date: "3/3 (一)", theme: "🏮 青森・睡魔之家",
        items: [
          { time: "玩", text: "睡魔之家 ワ・ラッセ、廣田神社" },
          { time: "住宿", text: "星野 青森屋(睡魔祭主題溫泉)" }
        ]
      },
      {
        day: 4, date: "3/4 (二)", theme: "🚄 青森 → 函館",
        items: [
          { time: "上午", text: "搭北海道新幹線 新青森 → 新函館北斗(約 1 小時)" },
          { time: "玩", text: "函館市區散策" },
          { time: "住宿", text: "函館 JR Inn" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "新青森 → 新函館北斗 北海道新幹線約 1 小時,轉函館 Liner 至函館站" }
        ]
      },
      {
        day: 5, date: "3/5 (三)", theme: "🌃 函館・五稜郭與函館山夜景",
        items: [
          { time: "玩", text: "函館早市、五稜郭、金森紅磚倉庫群、函館山夜景" },
          { time: "住宿", text: "函館 JR Inn" }
        ],
        tips: [
          { type: "warn", title: "提醒", text: "函館山夜景日落後 30 分最美,先確認纜車運行與能見度" }
        ]
      },
      {
        day: 6, date: "3/6 (四)", theme: "🦸 函館 → 仙台・麵包超人博物館",
        items: [
          { time: "上午", text: "搭新幹線返仙台" },
          { time: "玩", text: "仙台麵包超人兒童博物館" },
          { time: "住宿", text: "東仙台大都會飯店" }
        ],
        tips: [
          { type: "info", title: "提示", text: "麵包超人博物館位於仙台(非山形),親子同遊首選" }
        ]
      },
      {
        day: 7, date: "3/7 (五)", theme: "🦊 藏王狐狸村 + 松島一日遊",
        items: [
          { time: "玩", text: "藏王狐狸村(餵狐狸/抱狐狸)、松島(遊覽船、瑞巖寺、五大堂)" },
          { time: "住宿", text: "東仙台大都會飯店" }
        ],
        tips: [
          { type: "info", title: "提示", text: "狐狸村在白石、松島在仙台東北,建議包車或一日遊串聯" }
        ]
      },
      {
        day: 8, date: "3/8 (六)", theme: "⛄ 銀山溫泉 + 藏王樹冰一日遊",
        items: [
          { time: "玩", text: "銀山溫泉(大正浪漫雪景)、藏王樹冰(纜車賞雪怪)" },
          { time: "住宿", text: "東仙台大都會飯店" }
        ],
        tips: [
          { type: "warn", title: "提醒", text: "銀山溫泉冬季交通管制需換接駁巴士;藏王樹冰山頂極寒,纜車可線上預約" }
        ]
      },
      {
        day: 9, date: "3/9 (日)", theme: "✈ 回台灣",
        items: [
          { time: "上午", text: "仙台機場辦理登機,返回台灣,滿載而歸!" }
        ],
        tips: [
          { type: "warn", title: "提醒", text: "建議提前 2 小時抵達仙台機場" }
        ]
      }
    ],

    spots: [
      {
        name: "奧入瀨溪流", area: "青森・十和田", hours: "戶外・冬季健行預約制",
        latlng: [40.5236, 140.9889],
        desc: "從十和田湖流出的世界級美溪,冬季溪水兩岸結成壯觀冰瀑、冰柱與雪帽。入住星野奧入瀨溪流飯店可參加雪地冰瀑健行(預約制),並泡冬限定『氷瀑之湯』。",
        ref: { title: "蔡小妞依玲・星野奧入瀨溪流飯店", url: "https://tsnio.com/hoshino-resorts-oirase-keiryu-hotel/" }
      },
      {
        name: "睡魔之家 ワ・ラッセ", area: "青森", hours: "9:00–18:00",
        latlng: [40.8275, 140.7350],
        desc: "青森站旁的睡魔祭文化館,挑高大廳常設展示實際出陣的大型睡魔燈籠,伴隨笛子與睡魔囃子,即使錯過 8 月睡魔祭也能身歷其境。入場約 ¥600。",
        ref: { title: "(青森旅遊)睡魔之家 WA・RASSE", url: "https://hero789456.pixnet.net/blog/posts/14222951268" }
      },
      {
        name: "廣田神社", area: "青森", hours: "8:30–16:30(週三休)",
        latlng: [40.8230, 140.7430],
        desc: "青森市區、全國唯一的『病厄除守護神』神社,以青森睡魔圖案的限定御朱印與精緻切繪御朱印聞名,境內五社可一一參拜。"
      },
      {
        name: "函館早市", area: "函館", hours: "1–4 月 6:00–14:00",
        latlng: [41.7745, 140.7263],
        desc: "JR 函館站旁約 250 攤的朝市,帝王蟹、海膽、活烏賊與海鮮丼齊聚,丼飯橫丁、駅二市場可現釣活烏賊現切。清晨開市,海鮮丼配伴手禮一網打盡。",
        ref: { title: "樂活的大方・函館朝市美食購物攻略", url: "https://www.bigfang.tw/blog/post/hakodate-asaichi" }
      },
      {
        name: "五稜郭", area: "函館", hours: "塔 9:00–18:00",
        latlng: [41.7969, 140.7567],
        desc: "日本唯一星形西式要塞,幕末歷史舞台,登 107m 五稜郭塔展望台俯瞰完整五芒星城郭,冬雪覆蓋與夜間點燈別有風情。米其林綠色指南二星。",
        ref: { title: "許傑・五稜郭塔一日遊", url: "https://journey.tw/goryokaku/" }
      },
      {
        name: "金森紅磚倉庫", area: "函館", hours: "9:30–19:00",
        latlng: [41.7657, 140.7148],
        desc: "1909 年函館首座營業倉庫,紅磚建築群改建為 BAY HAKODATE 等四大商業區、約 50 間店,起司蛋糕(Snaffle's/Petite Merveille)必買,入夜燈光浪漫。",
        ref: { title: "BringYou・金森紅磚倉庫", url: "https://www.bring-you.info/zh-tw/kanemori-red-brick-warehouse" }
      },
      {
        name: "函館山夜景", area: "函館", hours: "纜車約 10:00–22:00",
        latlng: [41.7595, 140.7042],
        desc: "世界三大夜景之一,搭纜車 3 分鐘登 334m 山頂,函館特殊扇形地形夾在兩側海灣,華燈初上如灑落寶石。日落後 30 分『魔幻時刻』最美。",
        ref: { title: "波比看世界・函館山夜景纜車", url: "https://bobbytravel.tw/mt-hakodate/" }
      },
      {
        name: "仙台麵包超人兒童博物館", area: "仙台", hours: "10:00–17:00",
        latlng: [38.2722, 140.9508],
        desc: "親子同遊首選,各房間重現動畫場景,入口麵包店售現烤角色麵包,舞台定時表演,1 樓購物區免費入場。",
        ref: { title: "樂活的大方・仙台麵包超人博物館", url: "https://www.bigfang.tw/blog/post/30786806" }
      },
      {
        name: "藏王狐狸村", area: "宮城・白石", hours: "9:00–17:00(冬季至 16:00)",
        latlng: [38.0339, 140.5147],
        desc: "宮城白石山間、日本唯一的狐狸主題園,放養逾百隻 6 種狐狸,可餵食、合影,並有抱狐狸體驗(另付費、穿防護衣)。冬季雪地裡的狐狸超療癒。",
        ref: { title: "喵爸喵媽・宮城藏王狐狸村", url: "https://kimiyo.tw/zao-fox-village/" }
      },
      {
        name: "松島", area: "宮城・松島", hours: "遊覽船依班次",
        latlng: [38.3700, 141.0606],
        desc: "日本三景之一,松島灣散布約 260 座松濤小島,可搭遊覽船巡島、參拜伊達家菩提寺瑞巖寺與海上五大堂,沿岸烤牡蠣與魚板名物必嚐。",
        ref: { title: "BringYou・松島一日遊", url: "https://www.bring-you.info/zh-tw/matsushima" }
      },
      {
        name: "銀山溫泉", area: "山形", hours: "溫泉街全日",
        latlng: [38.5750, 140.5333],
        desc: "山形深山的大正浪漫溫泉鄉,溪流兩岸木造旅館林立,入夜煤氣燈映雪如《神隱少女》場景。冬季為最美雪季,有免費和樂足湯。冬季實施交通管制需換接駁車。",
        ref: { title: "twoslowbyron・銀山溫泉冬季管制與接駁", url: "https://twoslowbyron.com/snow_hotspirng/" }
      },
      {
        name: "藏王樹冰", area: "山形・藏王", hours: "纜車約 8:30–17:00",
        latlng: [38.1597, 140.4406],
        desc: "冬季寒風與日本海濕氣在針葉樹上層層結冰,形成壯觀『雪怪』樹冰原。搭藏王纜車登地藏山頂賞樹冰,夜間點燈夢幻。1 月中–2 月上為最佳觀賞期。",
        ref: { title: "許傑・藏王樹冰一日遊", url: "https://journey.tw/go-yamagatazao/" }
      }
    ],

    food: [
      { name: "函館海鮮丼(朝市)", area: "函館", stars: 5, note: "帝王蟹・海膽・活烏賊", ref: { title: "樂活的大方・函館朝市海鮮丼", url: "https://www.bigfang.tw/blog/post/hakodate-asaichi" } },
      { name: "幸運小丑漢堡", area: "函館", stars: 4, note: "函館限定 Lucky Pierrot", ref: { title: "", url: "" } },
      { name: "仙台牛舌", area: "仙台", stars: 5, note: "仙台名物", ref: { title: "樂活的大方・仙台牛舌推薦", url: "https://www.bigfang.tw/blog/post/sendai-gyutan" } },
      { name: "松島烤牡蠣", area: "松島", stars: 4, note: "日本三景牡蠣", ref: { title: "", url: "" } },
      { name: "青森味噌咖哩牛奶拉麵", area: "青森", stars: 4, note: "青森 B 級美食", ref: { title: "", url: "" } },
      { name: "銀山溫泉街美食", area: "山形", stars: 4, note: "蕎麥麵・和菓子・足湯", ref: { title: "", url: "" } }
    ],

    weather: [
      "東北/道南 3 月初:約 -3 ~ 5°C,仍積雪",
      "藏王樹冰、奧入瀨冰瀑山區極寒,需防寒雪靴、冰爪",
      "日夜溫差大,防風防滑準備齊全"
    ],
    info: [
      { title: "❄️ 雪季裝備", items: ["防寒羽絨、雪褲、防滑雪靴或冰爪", "保暖手套、毛帽、暖暖包", "樹冰/冰瀑山區風大,面罩圍巾備用"] },
      { title: "📅 預約/提醒", items: ["奧入瀨冰瀑健行為預約制(向星野飯店預約)", "藏王樹冰纜車可線上預約指定時段", "銀山溫泉冬季交通管制,需停大正浪漫館換接駁巴士", "函館山夜景看纜車運行狀況與能見度"] },
      { title: "🍜 在地名物", items: ["函館海鮮丼、活烏賊", "仙台牛舌、松島牡蠣", "青森味噌咖哩牛奶拉麵", "山形溫泉街美食"] },
      { title: "🚄 交通提醒", items: ["仙台為據點,新幹線往青森/函館", "松島、狐狸村、藏王、銀山多為仙台/山形出發一日遊", "冬季班次與接駁易受雪況影響,預留時間"] }
    ],
    notes: [
      "3 月初東北仍是雪季,防寒防滑務必齊全。",
      "奧入瀨冰瀑、藏王樹冰、銀山溫泉等冬季活動受天候影響,先確認運行/管制。",
      "D6 麵包超人博物館位於仙台(非山形),當日住東仙台大都會飯店。"
    ]
  },

  {
    id: "tokyo-2024",
    title: "東京・橫濱鎌倉之旅",
    subtitle: "上野・迪士尼・橫濱・鎌倉",
    country: "日本",
    region: "東京・神奈川",
    year: 2024,
    dateLabel: "12/14 – 12/22",
    dateStart: "2024-12-14",
    dateEnd: "2024-12-22",
    nights: 8,
    status: "旅遊回憶",
    recommended: false,
    tagline: "迪士尼雙園・橫濱港・鎌倉大佛江之島・麻布台 teamLab",
    themes: ["迪士尼", "親子", "海濱", "美食"],
    mapCenter: [35.5, 139.7],
    mapZoom: 9,

    flight: {
      airline: "星宇航空 STARLUX",
      out: "12/14 桃園 TPE → 東京 成田 NRT",
      back: "12/22 東京 成田 NRT → 桃園 TPE",
      note: "成田進出・上野/銀座為據點・迪士尼住 1 晚"
    },
    stay: [
      { name: "三井花園飯店 上野", nights: "12/14–12/17 ・ 3 晚", note: "上野・近 JR 上野站" },
      { name: "東京迪士尼玩具總動員飯店", nights: "12/17 ・ 1 晚", note: "迪士尼度假區內" },
      { name: "銀座大和 ROYNET 飯店", nights: "12/18–12/22 ・ 4 晚", note: "銀座・購物便利" }
    ],
    pass: {
      icon: "🚇", label: "交通",
      name: "JR + 東京メトロ + 江之電",
      price: "建議 Suica/PASMO",
      head: ["路段", "交通", "備註"],
      rows: [
        ["成田機場 → 上野", "Skyliner / JR", "約 45 分"],
        ["市區移動", "JR 山手線 + 東京メトロ", "Suica 嗶卡"],
        ["迪士尼", "JR 京葉線 → 舞濱", "東京站約 15 分"],
        ["橫濱/鎌倉/江之島", "JR + 江之電", "約 1 小時"]
      ]
    },

    days: [
      {
        day: 1, date: "12/14 (六)", theme: "🏮 抵達東京・淺草晴空塔",
        items: [
          { time: "抵達", text: "抵達成田機場,前往上野入住" },
          { time: "玩", text: "淺草寺雷門、晴空塔(墨田水族館)" },
          { time: "晚餐", text: "米久本店壽喜燒 或 敘敘苑" },
          { time: "住宿", text: "三井花園飯店 上野" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "成田機場 → 上野 Skyliner 約 45 分" }
        ]
      },
      {
        day: 2, date: "12/15 (日)", theme: "🐼 上野・阿美橫町",
        items: [
          { time: "玩", text: "上野公園、上野動物園、阿美橫町" },
          { time: "晚餐", text: "上野 鴨肉鍋 或 拉麵" },
          { time: "住宿", text: "三井花園飯店 上野" }
        ]
      },
      {
        day: 3, date: "12/16 (一)", theme: "⚓ 橫濱港未來",
        items: [
          { time: "玩", text: "橫濱(紅磚倉庫、港未來、中華街)" },
          { time: "住宿", text: "三井花園飯店 上野" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "上野/澀谷 → 橫濱 港未來線直通約 1 小時" }
        ]
      },
      {
        day: 4, date: "12/17 (二)", theme: "🌊 東京迪士尼海洋",
        items: [
          { time: "玩", text: "東京迪士尼海洋 DisneySea" },
          { time: "住宿", text: "東京迪士尼玩具總動員飯店" }
        ]
      },
      {
        day: 5, date: "12/18 (三)", theme: "🏰 東京迪士尼樂園",
        items: [
          { time: "玩", text: "東京迪士尼樂園 Disneyland" },
          { time: "住宿", text: "銀座大和 ROYNET 飯店" }
        ]
      },
      {
        day: 6, date: "12/19 (四)", theme: "🛍 銀座・澀谷",
        items: [
          { time: "玩", text: "銀座逛街、澀谷(SHIBUYA SKY、十字路口)" },
          { time: "住宿", text: "銀座大和 ROYNET 飯店" }
        ]
      },
      {
        day: 7, date: "12/20 (五)", theme: "⛩ 鎌倉・江之島",
        items: [
          { time: "玩", text: "鎌倉大佛(高德院)、鶴岡八幡宮、江之島(江島神社、海蠟燭)" },
          { time: "住宿", text: "銀座大和 ROYNET 飯店" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "JR 至鎌倉,轉江之電串聯長谷大佛、鎌倉高校前、江之島" }
        ]
      },
      {
        day: 8, date: "12/21 (六)", theme: "🎨 東京車站・麻布台 teamLab",
        items: [
          { time: "玩", text: "東京車站(丸之內紅磚站舍、KITTE)、麻布台之丘 teamLab Borderless" },
          { time: "住宿", text: "銀座大和 ROYNET 飯店" }
        ],
        tips: [
          { type: "info", title: "提醒", text: "麻布台 teamLab Borderless 需線上預約場次" }
        ]
      },
      {
        day: 9, date: "12/22 (日)", theme: "✈ 返回台灣",
        items: [
          { time: "上午", text: "前往成田機場,返回台灣,滿載而歸!" }
        ],
        tips: [
          { type: "warn", title: "提醒", text: "建議提前 2.5–3 小時抵達成田機場" }
        ]
      }
    ],

    spots: [
      {
        name: "淺草寺", area: "淺草", hours: "境內 24h・本堂 6:00–17:00",
        latlng: [35.7148, 139.7967],
        desc: "東京最古老寺廟,雷門大紅燈籠 24h 免費參觀,仲見世通商店街集結人形燒、仙貝與和風雜貨,可租和服參拜、求籤、收御朱印。",
        ref: { title: "BringYou・淺草寺雷門散步路線", url: "https://www.bring-you.info/zh-tw/sensoji-temple" }
      },
      {
        name: "晴空塔・墨田水族館", area: "押上・晴空塔", hours: "水族館 10:00–20:00",
        latlng: [35.7101, 139.8107],
        desc: "世界第一高塔,展望台俯瞰東京、Solamachi 商場好逛;5–6 樓墨田水族館有企鵝、海狗,是雨天/寒天親子首選。",
        ref: { title: "BringYou・晴空塔墨田水族館", url: "https://www.bring-you.info/zh-tw/sumida-aquarium" }
      },
      {
        name: "上野公園・上野動物園", area: "上野", hours: "動物園 9:30–17:00(週一休)",
        latlng: [35.7156, 139.7714],
        desc: "上野恩賜公園腹地廣闊,集結博物館、美術館與不忍池;園內上野動物園為日本最古老動物園,動物明星與單軌列車是孩子最愛(曾以大貓熊聞名,貓熊已於 2026 初返回中國)。",
        ref: { title: "波比看世界・上野 7 大景點一日遊", url: "https://bobbytravel.tw/ueno/" }
      },
      {
        name: "阿美橫町", area: "上野", hours: "店家約 10:00–19:00",
        latlng: [35.7100, 139.7740],
        desc: "JR 上野–御徒町高架下約 500m 商店街,藥妝、零食、海鮮乾貨與服飾雜貨齊聚,多慶屋、YODOBASHI 一次購足,熱鬧又好殺價。",
        ref: { title: "樂活的大方・阿美橫町必買必吃", url: "https://www.bigfang.tw/blog/post/uneo-ameyoko-tokyo" }
      },
      {
        name: "橫濱紅磚倉庫", area: "橫濱", hours: "約 11:00–20:00",
        latlng: [35.4530, 139.6425],
        desc: "橫濱港未來代表地標,百年紅磚倉庫改為文創商業設施,鄰中華街、大棧橋、Cosmo World 摩天輪與空中纜車,港灣夜景浪漫,可從澀谷/池袋直通。",
        ref: { title: "心旅生活・橫濱一日遊路線", url: "https://shinblog.com.tw/yokohama/" }
      },
      {
        name: "東京迪士尼海洋", area: "舞濱", hours: "依官方每日公告",
        latlng: [35.6267, 139.8850],
        desc: "全球唯一的海洋主題迪士尼,以七大主題港灣與成熟氛圍著稱,2024 新增『夢幻泉鄉』園區,表演、煙火與限定餐點豐富,善用 DPA 更順暢。",
        ref: { title: "花時光旅行實驗室・迪士尼海洋攻略", url: "https://whatime.space/tokyo-disneysea/" }
      },
      {
        name: "東京迪士尼樂園", area: "舞濱", hours: "依官方每日公告",
        latlng: [35.6329, 139.8804],
        desc: "經典童話主題園區,城堡、遊行、煙火必看。入園先下載官方 App 操作 Standby Pass 與 DPA 尊享卡,與海洋分開購票各排一天。",
        ref: { title: "波比看世界・東京迪士尼樂園攻略", url: "https://bobbytravel.tw/tokyo-disneyland/" }
      },
      {
        name: "銀座", area: "銀座", hours: "店家約 11:00–20:00",
        latlng: [35.6717, 139.7650],
        desc: "東京頂級購物區,精品旗艦、GINZA SIX、和光鐘樓與百年老舖林立,週末中央通『步行者天國』可悠閒逛街。"
      },
      {
        name: "澀谷 SHIBUYA SKY", area: "澀谷", hours: "約 10:00–22:30",
        latlng: [35.6595, 139.7004],
        desc: "澀谷 Scramble Square 頂樓 360 度開放式空中展望台,俯瞰著名澀谷全向十字路口與東京夜景,日落前時段最美。樓下八公像、宮下公園、PARCO 好逛。",
        ref: { title: "樂活的大方・SHIBUYA SKY 展望台", url: "https://www.bigfang.tw/blog/post/tokyo-shibuya-sky" }
      },
      {
        name: "鎌倉大佛(高德院)", area: "鎌倉", hours: "約 8:00–17:00",
        latlng: [35.3169, 139.5358],
        desc: "高約 13.35m、重 121 噸的青銅阿彌陀如來坐像,日本國寶,可入胎內參觀。江之電長谷站步行約 10 分,可串長谷寺、小町通、鶴岡八幡宮。",
        ref: { title: "波比看世界・鎌倉大佛殿高德院", url: "https://bobbytravel.tw/kotokuin-temple/" }
      },
      {
        name: "江之島", area: "江之島", hours: "燈塔 9:00–20:00",
        latlng: [35.2992, 139.4806],
        desc: "湘南外海小島,江島神社三宮巡禮、弁財天商店街吃章魚仙貝,登 60m 海蠟燭展望燈塔眺望湘南海岸與富士山,冬季『湘南寶石』燈飾浪漫。",
        ref: { title: "波比看世界・江之島一日遊", url: "https://bobbytravel.tw/enoshima/" }
      },
      {
        name: "東京車站", area: "丸之內", hours: "店家約 10:00–21:00",
        latlng: [35.6812, 139.7671],
        desc: "丸之內側百年紅磚站舍華麗復古,站內一番街(角色街)、拉麵街與大丸百貨好逛,KITTE 屋頂庭園可眺望站舍與東京夜景。"
      },
      {
        name: "麻布台之丘 teamLab Borderless", area: "麻布台", hours: "約 10:00–21:00",
        latlng: [35.6602, 139.7400],
        desc: "2023 開幕的麻布台之丘內、無邊界沉浸式數位藝術美術館,作品彼此交融無界,《Bubble Universe》《花卉森林》等夢幻必拍。熱門需線上預約場次。",
        ref: { title: "Mimi韓・麻布台之丘 teamLab 無界", url: "https://mimigo.tw/teamlab-daiba/" }
      }
    ],

    food: [
      { name: "米久本店 壽喜燒", area: "淺草", stars: 5, note: "百年和牛壽喜燒老店", ref: { title: "小氣少年・淺草米久本店", url: "https://nicklee.tw/2467/tokyo-asakusa-yonekyu/" } },
      { name: "敘敘苑 燒肉", area: "東京", stars: 5, note: "高級燒肉・午間套餐划算", ref: { title: "娜塔蝦・敘敘苑用餐心得", url: "https://natasha-traveler.tw/jyujyuen-yakiniku-review/" } },
      { name: "上野 鴨肉鍋 / 拉麵", area: "上野", stars: 4, note: "上野晚餐", ref: { title: "", url: "" } },
      { name: "橫濱中華街", area: "橫濱", stars: 4, note: "肉包・小籠包・港式點心", ref: { title: "", url: "" } },
      { name: "江之島海鮮", area: "江之島", stars: 4, note: "吻仔魚丼・章魚仙貝", ref: { title: "", url: "" } }
    ],

    weather: [
      "東京 12 月:約 5–13°C,乾爽晴朗",
      "早晚偏涼,保暖外套、圍巾備用",
      "海濱(江之島)風大體感更冷"
    ],
    info: [
      { title: "🎫 預約提醒", items: ["迪士尼陸/海分開購票,各排一天", "麻布台 teamLab Borderless 線上預約場次", "SHIBUYA SKY 建議日落前時段預約", "迪士尼善用官方 App(Standby Pass / DPA)"] },
      { title: "🍜 在地必吃", items: ["淺草壽喜燒(米久本店)", "橫濱中華街", "江之島章魚仙貝、吻仔魚丼", "上野鴨肉鍋/拉麵"] },
      { title: "🛍️ 購物", items: ["阿美橫町藥妝、多慶屋", "銀座、澀谷 PARCO/宮下公園", "橫濱港未來購物"] },
      { title: "🚄 交通提醒", items: ["上野/銀座為據點,山手線串聯", "迪士尼搭京葉線到舞濱", "鎌倉江之島搭 JR + 江之電一日遊"] }
    ],
    notes: [
      "12 月東京乾爽,早晚與海濱偏涼,注意保暖。",
      "迪士尼、teamLab、SHIBUYA SKY 等熱門點建議提前預約。",
      "鎌倉、江之島可搭江之電串聯,安排整天。"
    ]
  },

  {
    id: "kyushu-2024",
    title: "北九州環島之旅",
    subtitle: "福岡・大分・熊本・長崎",
    country: "日本",
    region: "九州",
    year: 2024,
    dateLabel: "1/27 – 2/4",
    dateStart: "2024-01-27",
    dateEnd: "2024-02-04",
    nights: 8,
    status: "旅遊回憶",
    recommended: false,
    tagline: "由布院金鱗湖・黑川溫泉・高千穗峽・豪斯登堡・稻佐山夜景",
    themes: ["溫泉", "主題樂園", "世界遺產", "美食"],
    mapCenter: [33.3, 130.5],
    mapZoom: 7,

    flight: {
      airline: "台灣虎航 Tigerair",
      out: "1/27 桃園 TPE → 福岡 FUK",
      back: "2/4 福岡 FUK → 桃園 TPE",
      note: "福岡進出・九州環遊"
    },
    stay: [
      { name: "九州周遊住宿", nights: "共 8 晚", note: "福岡・由布院/黑川溫泉・長崎等地(待補)" }
    ],
    pass: {
      icon: "🚗", label: "交通",
      name: "九州周遊(JR + 自駕/包車)",
      price: "—",
      head: ["路段", "交通", "備註"],
      rows: [
        ["福岡市區", "地下鐵 + 西鐵", "天神/博多"],
        ["由布院/黑川/阿蘇", "自駕或包車一日遊", "山區景點較分散"],
        ["長崎/豪斯登堡", "JR 特急 海鷗號/豪斯登堡號", "福岡約 2 小時"],
        ["門司港", "JR 鹿兒島本線", "小倉轉乘"]
      ]
    },

    days: [
      {
        day: 1, date: "1/27 (六)", theme: "✈ 抵達福岡・天神",
        items: [
          { time: "抵達", text: "搭虎航抵達福岡機場,前往天神" },
          { time: "玩", text: "天神地下街、天神屋台、福岡塔" }
        ],
        tips: [
          { type: "info", title: "交通時間軸", text: "福岡機場 → 天神 地下鐵約 11 分;入夜中洲/天神屋台吃宵夜" }
        ]
      },
      {
        day: 2, date: "1/28 (日)", theme: "🦁 大分・動物公園與由布院",
        items: [
          { time: "玩", text: "九州自然動物公園(African Safari)、由布院湯之坪街道" }
        ]
      },
      {
        day: 3, date: "1/29 (一)", theme: "♨ 金鱗湖・草千里・黑川溫泉",
        items: [
          { time: "玩", text: "由布院金鱗湖、阿蘇草千里、黑川溫泉" }
        ],
        tips: [
          { type: "warn", title: "提醒", text: "黑川溫泉『入湯手形』¥1,500 可巡泡 3 間露天湯;冬季有『湯明』點燈" }
        ]
      },
      {
        day: 4, date: "1/30 (二)", theme: "⛩ 宮崎・熊本",
        items: [
          { time: "玩", text: "高千穗峽(划船看真名井瀑布)、熊本城" }
        ],
        tips: [
          { type: "info", title: "提示", text: "高千穗峽划船旺季須提前線上預約" }
        ]
      },
      {
        day: 5, date: "1/31 (三)", theme: "🌃 長崎・稻佐山夜景",
        items: [
          { time: "玩", text: "長崎原爆資料館、和平公園、稻佐山夜景" }
        ],
        tips: [
          { type: "info", title: "提示", text: "稻佐山夜景日落前後一小時最美,搭纜車或巴士上山" }
        ]
      },
      {
        day: 6, date: "2/1 (四)", theme: "🎡 長崎・豪斯登堡",
        items: [
          { time: "玩", text: "豪斯登堡(荷蘭風情主題樂園)" }
        ]
      },
      {
        day: 7, date: "2/2 (五)", theme: "⛵ 九十九島・太宰府",
        items: [
          { time: "玩", text: "九十九島遊覽船、太宰府天滿宮" }
        ],
        tips: [
          { type: "info", title: "提示", text: "九十九島搭珍珠皇后號約 50 分;太宰府表參道必吃梅枝餅" }
        ]
      },
      {
        day: 8, date: "2/3 (六)", theme: "🚂 北九州・門司港",
        items: [
          { time: "玩", text: "門司港懷舊區、九州鐵道紀念館、逛街" }
        ]
      },
      {
        day: 9, date: "2/4 (日)", theme: "✈ 返回台灣",
        items: [
          { time: "上午", text: "搭虎航從福岡機場返回桃園,滿載而歸!" }
        ],
        tips: [
          { type: "warn", title: "提醒", text: "建議提前 2 小時抵達福岡機場" }
        ]
      }
    ],

    spots: [
      {
        name: "天神(地下街・屋台)", area: "福岡・天神", hours: "地下街 10:00–20:00・屋台 18:00 起",
        latlng: [33.5914, 130.3990],
        desc: "福岡最熱鬧商圈,天神地下街以歐風石板與百元商店、雜貨聞名;入夜中洲/天神屋台(路邊攤)賣豚骨拉麵、煎餃、關東煮,是博多獨有的夜生活。",
        ref: { title: "波比看世界・天神商圈逛街攻略", url: "https://bobbytravel.tw/tenjin/" }
      },
      {
        name: "福岡塔", area: "福岡・百道", hours: "9:30–22:00",
        latlng: [33.5933, 130.3514],
        desc: "高 234m 的日本最高海濱塔,123m 展望室 360 度俯瞰福岡市與博多灣,入夜燈光浪漫,鄰百道海濱公園。",
        ref: { title: "olga・福岡塔與天神屋台一日", url: "https://olga1013.pixnet.net/blog/posts/10357564645" }
      },
      {
        name: "九州自然動物公園(African Safari)", area: "大分・宇佐", hours: "9:00–16:30(依季節)",
        latlng: [33.4889, 131.3300],
        desc: "大分宇佐、日本最大野生動物園,6km 賽道可自駕或搭叢林巴士近距離看獅子、長頸鹿等約 70 種動物,另有可愛動物互動區。"
      },
      {
        name: "由布院 湯之坪街道", area: "大分・由布院", hours: "店家約 9:00–17:30",
        latlng: [33.2647, 131.3608],
        desc: "大分人氣溫泉鄉,由布院車站至金鱗湖約 1km 的湯之坪街道,百餘間甜點、雜貨與咖啡小店,背倚由布岳,散策購物超愜意。",
        ref: { title: "兩豬小妹・湯之坪街道散步路線", url: "https://twopigsfun.com/lake-kinrin/" }
      },
      {
        name: "金鱗湖", area: "大分・由布院", hours: "戶外・全日",
        latlng: [33.2636, 131.3656],
        desc: "由布院象徵景觀,湖底同時湧出溫泉與冷泉,秋冬清晨常覆夢幻薄霧,湖畔有水上鳥居,日出至上午 9 點前最美。",
        ref: { title: "小布少爺・金鱗湖晨霧拍攝", url: "https://boo2k.com/archives/81921" }
      },
      {
        name: "草千里(阿蘇)", area: "熊本・阿蘇", hours: "戶外・全日",
        latlng: [32.8847, 131.0556],
        desc: "阿蘇烏帽子岳北麓一望無際的大草原,牛馬放牧、火口湖點綴,冬日銀白雪景,可騎馬體驗,鄰阿蘇火山博物館。",
        ref: { title: "來一球叭噗・阿蘇草千里", url: "https://gototravel.tw/aso-kusasenri-ga-hama/" }
      },
      {
        name: "黑川溫泉", area: "熊本・南小國", hours: "巡湯約 8:30–21:00",
        latlng: [33.0839, 131.1419],
        desc: "阿蘇北麓的秘境溫泉鄉,日本溫泉百選『氛圍』第一名。購『入湯手形』(¥1,500)可巡泡 3 間旅館露天湯,冬季『湯明』點燈夢幻。",
        ref: { title: "樂活的大方・黑川溫泉入湯手形", url: "https://www.bigfang.tw/blog/post/kurokawa-onsen" }
      },
      {
        name: "高千穗峽", area: "宮崎・高千穗", hours: "划船約 8:30–16:30",
        latlng: [32.7156, 131.3050],
        desc: "宮崎神話之鄉的柱狀節理峽谷,可划船近距離仰望日本瀑布百選『真名井瀑布』從 17m 高崖傾瀉。沿岸步道、高千穗神社與流水素麵都值得一訪。",
        ref: { title: "凱子凱・高千穗峽完整遊記攻略", url: "http://ksk.tw/blog/post/347926522" }
      },
      {
        name: "熊本城", area: "熊本", hours: "9:00–17:00",
        latlng: [32.8061, 130.7058],
        desc: "加藤清正所築、日本三大名城之一,黑色天守與『武者返』石垣壯觀。2016 地震後修復,天守閣 2021 重新開放,鄰櫻之馬場城彩苑。",
        ref: { title: "BringYou・熊本城特別參觀路線", url: "https://www.bring-you.info/zh-tw/kumamoto-castle" }
      },
      {
        name: "長崎和平公園・原爆資料館", area: "長崎", hours: "資料館 8:30–17:30",
        latlng: [32.7728, 129.8636],
        desc: "1945 年原子彈爆炸中心地,和平公園豎立和平祈念像,原爆資料館完整記錄核爆史實與祈願世界和平,是省思戰爭的重要之地。"
      },
      {
        name: "稻佐山夜景", area: "長崎", hours: "纜車 9:00–22:00",
        latlng: [32.7600, 129.8508],
        desc: "海拔 333m,世界新三大夜景之一,搭纜車 5 分鐘登頂,270 度俯瞰長崎港灣與山城燈火如灑落寶石。日落前後一小時最美。",
        ref: { title: "小氣少年・長崎稻佐山夜景", url: "https://nicklee.tw/1432/nagasaki-night-scene/" }
      },
      {
        name: "豪斯登堡", area: "長崎・佐世保", hours: "約 9:00–21:00",
        latlng: [33.0856, 129.7919],
        desc: "152 萬㎡的荷蘭風情主題樂園,九大園區、運河、鬱金香與夜間燈海煙火,新增 Miffy 米飛兔夢幻小鎮,親子情侶皆宜。",
        ref: { title: "卡蘿・豪斯登堡完整攻略", url: "https://carolblog.tw/huistenbosch/" }
      },
      {
        name: "九十九島", area: "長崎・佐世保", hours: "遊覽船依班次",
        latlng: [33.1700, 129.6594],
        desc: "佐世保『世界最美港灣』之一,208 座大小島嶼星羅棋布,搭珍珠皇后號遊覽船約 50 分巡島,展海峰/石岳展望台居高賞景,海きらら水族館也好玩。",
        ref: { title: "卡蘿・九十九島遊覽船", url: "https://carolblog.tw/kujuku-islands/" }
      },
      {
        name: "太宰府天滿宮", area: "福岡・太宰府", hours: "境內約 6:30–18:30",
        latlng: [33.5217, 130.5350],
        desc: "全日本 12000 座天滿宮總本社,祭祀學問之神菅原道真,考生必拜。表參道梅枝餅(かさの家)與隈研吾設計的星巴克必訪,梅花季更美。",
        ref: { title: "Mimi韓・太宰府一日遊", url: "https://mimigo.tw/dazaifu/" }
      },
      {
        name: "門司港・九州鐵道紀念館", area: "北九州・門司港", hours: "紀念館 9:00–17:00(週二休)",
        latlng: [33.9436, 130.9628],
        desc: "北九州門司港懷舊區,大正復古洋館林立、港灣浪漫,名物『燒咖哩』必吃;門司港站旁九州鐵道紀念館可看歷史車輛、駕迷你小火車,鐵道迷與親子必訪。",
        ref: { title: "波比看世界・門司港一日遊", url: "https://bobbytravel.tw/mojiko/" }
      }
    ],

    food: [
      { name: "博多豚骨拉麵", area: "福岡", stars: 5, note: "天神/中洲屋台名物", ref: { title: "", url: "" } },
      { name: "明太子", area: "福岡", stars: 5, note: "博多必買伴手禮", ref: { title: "", url: "" } },
      { name: "長崎強棒麵 ちゃんぽん", area: "長崎", stars: 4, note: "長崎名物", ref: { title: "", url: "" } },
      { name: "佐世保漢堡", area: "佐世保", stars: 4, note: "美式厚漢堡", ref: { title: "", url: "" } },
      { name: "熊本馬肉料理", area: "熊本", stars: 4, note: "熊本鄉土料理", ref: { title: "", url: "" } },
      { name: "太宰府 梅枝餅", area: "太宰府", stars: 4, note: "表參道必吃", ref: { title: "Mimi韓・太宰府梅枝餅", url: "https://mimigo.tw/dazaifu/" } },
      { name: "門司港 燒咖哩", area: "門司港", stars: 4, note: "門司港名物", ref: { title: "", url: "" } }
    ],

    weather: [
      "九州 1–2 月:約 3–12°C,冬日偏冷",
      "阿蘇/高千穗/黑川山區更冷,可能積雪、結冰",
      "溫泉鄉與夜景行程注意保暖防滑"
    ],
    info: [
      { title: "♨️ 溫泉提醒", items: ["黑川溫泉『入湯手形』¥1,500 可選泡 3 間露天湯", "冬季黑川溫泉『湯明』點燈夢幻", "由布院金鱗湖清晨晨霧最美(日出–9:00)"] },
      { title: "📅 預約/提醒", items: ["高千穗峽划船旺季提前線上預約", "豪斯登堡建議買 1.5–2 日券慢慢玩", "稻佐山夜景日落前後 1 小時最美,查纜車運行"] },
      { title: "🍜 九州名物", items: ["博多豚骨拉麵、明太子", "長崎強棒麵、佐世保漢堡", "熊本馬肉、阿蘇赤牛", "太宰府梅枝餅、門司港燒咖哩"] },
      { title: "🚗 交通提醒", items: ["阿蘇/高千穗/黑川山區較分散,自駕或包車較便利", "長崎/豪斯登堡可搭 JR 特急", "門司港在北九州小倉一帶"] }
    ],
    notes: [
      "冬季九州偏冷,山區可能積雪結冰,防寒防滑準備。",
      "高千穗峽划船、豪斯登堡等熱門點建議提前安排。",
      "此趟未提供住宿/餐廳明細,住宿以周遊、美食以九州名物呈現,可隨時補上指定店家。"
    ]
  }
];
