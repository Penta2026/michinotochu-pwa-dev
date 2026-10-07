// Riders Cafe DB - DEV
// Schema version: 1.0
// Production publication requires explicit shop permission.
window.RIDERS_CAFES = [
  {
    id: "rc_hiroshima_golden_valley_001",
    testOnly: true,
    publish: false,
    gacha: "有効",
    kind: "ライダーズカフェ",
    featureCategory: "cafe",
    prefecture: "広島県",
    municipality: "広島市安佐北区",
    name: "GOLDEN VALLEY",
    nameJa: "ゴールデン バレー",
    address: "広島県広島市安佐北区白木町市川141-8",
    lat: 34.56332361,
    lng: 132.66240223,
    latRaw: "34.56332361",
    lngRaw: "132.66240223",
    navMode: "name",
    navQuery: "GOLDEN VALLEY 広島県広島市安佐北区白木町市川141-8",
    foodTypes: ["ハンバーガー", "カレー", "ランチ", "コーヒー", "テイクアウト"],
    signatureMenu: ["ゴルバレバーガーセット", "ゴルバレタワーセット", "カツカレー"],
    budget: "1,000〜1,999円目安",
    businessHours: {
      mon: [["11:00","14:30"]],
      tue: [["11:00","14:30"]],
      wed: [["11:00","14:30"]],
      thu: [],
      fri: [],
      sat: [["11:00","14:30"]],
      sun: [["11:00","14:30"]]
    },
    regularHolidays: ["木曜日", "金曜日"],
    irregularHoliday: true,
    holidayNotice: "臨時休業・営業時間変更の場合があります。最新情報は公式Instagram等をご確認ください。",
    manualStatus: null,
    manualStatusUntil: null,
    parking: {
      available: true,
      cars: 13,
      motorcycle: true,
      largeBike: true,
      surface: "未確認",
      covered: "未確認"
    },
    riderFacilities: {
      helmetStorage: "未確認",
      riderEquipment: "未確認"
    },
    phone: "082-828-1777",
    instagram: "https://www.instagram.com/golden_valley1777/",
    facebook: "https://www.facebook.com/profile.php?id=100063564693497",
    sourceLinks: [
      "https://maps.app.goo.gl/WFPG17U9AZpKFGQRA",
      "https://maps.app.goo.gl/or9ceQKLChquJq9t8"
    ],
    sourceStatus: "Web確認",
    lastChecked: "2026-10-07",
    permission: {
      status: "uncontacted",
      label: "未連絡",
      contactedAt: null,
      approvedAt: null,
      contactMethod: null,
      notes: "dev動作確認用の仮登録。店への掲載許諾はまだ取っていないため本番掲載不可。"
    },
    summary: "ライダーズカフェ。ハンバーガーとカレーを中心に楽しめる。dev動作確認用の仮登録。",
    notes: "本番公開前に店舗へ掲載許諾を取り、営業時間・定休日・設備情報を再確認すること。"
  }
];

window.RIDERS_CAFE_DB_META = {
  schemaVersion: "1.0",
  dbVersion: "0.1.0-dev",
  updated: "2026-10-07",
  count: window.RIDERS_CAFES.length
};
