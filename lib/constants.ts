import type { ActionChip, UserContext } from "@/lib/types";

export const mockUserContext: UserContext = {
  currentTime: "2026-05-16T19:12:00+08:00",
  city: "上海",
  weather: "22°C / 闷 / 无雨",
  mood: "下班后有点累",
  recentPreferences: ["微辣", "米饭类", "低体力路线", "足球"],
  budget: "¥40 内",
  followedTeams: ["曼城", "阿森纳"],
  followedPlayers: ["福登", "萨卡"],
};

export const foodActions: ActionChip[] = [
  { id: "spicy", label: "想吃辣", intent: "refine" },
  { id: "no-delivery", label: "不要外卖", intent: "refine" },
  { id: "alone", label: "一个人吃", intent: "refine" },
  { id: "low-calorie", label: "换低卡", intent: "refine" },
  { id: "budget-30", label: "预算 30 内", intent: "refine" },
];

export const tripActions: ActionChip[] = [
  { id: "less-walk", label: "少走路", intent: "refine" },
  { id: "photo-friendly", label: "适合拍照", intent: "refine" },
  { id: "solo", label: "适合一个人", intent: "refine" },
  { id: "date", label: "适合约会", intent: "refine" },
  { id: "low-budget", label: "预算低一点", intent: "refine" },
];

export const sportsActions: ActionChip[] = [
  { id: "home", label: "主胜", intent: "predict" },
  { id: "draw", label: "平局", intent: "predict" },
  { id: "away", label: "客胜", intent: "predict" },
  { id: "player-focus", label: "只看我关注的球员", intent: "refine" },
  { id: "one-line", label: "给我一句话版", intent: "refine" },
];

export const recoveryActions: ActionChip[] = [
  { id: "anxious", label: "我现在焦虑", intent: "refine" },
  { id: "lying-down", label: "我只想躺着", intent: "refine" },
  { id: "five-min", label: "给我 5 分钟版", intent: "refine" },
  { id: "no-advice", label: "不想听道理", intent: "refine" },
  { id: "sleep", label: "睡前模式", intent: "refine" },
];
