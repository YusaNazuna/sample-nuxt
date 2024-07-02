/**
 * 型定義 & 項目定義
 * : enum.tsという名前だがオブジェクトリテラルを使った型定義を集約する
 * : 「const Toast」などは用途としてはconstsフォルダを作成して移行すべきだが可読性も加味して許容することとする
 */

// [ Toast ]
export const Toast = {
  Success: 0,
  Error: 1,
} as const;
export type Toast = (typeof Toast)[keyof typeof Toast];

// [ SideMenu ]
export const SideMenuDateType = {
  today: "今日",
  yesterday: "昨日",
  lastWeek: "先週",
  lastMonth: "先月",
} as const;
export type SideMenuDateKey = keyof typeof SideMenuDateType;
export type SideMenuDateType = (typeof SideMenuDateType)[SideMenuDateKey];

// [ TalkMessage ]
export const TalkMessageType = {
  Input: 1,
  Output: 2,
} as const;
export type TalkMessageType = (typeof TalkMessageType)[keyof typeof TalkMessageType];
