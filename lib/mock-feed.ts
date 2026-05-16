import {
  foodActions,
  mockUserContext,
  recoveryActions,
  sportsActions,
  tripActions,
} from "@/lib/constants";
import type {
  AiFeedCard,
  FeedItem,
  FoodDecisionCardData,
  MicroTripCardData,
  RecoveryCardData,
  SportsPreMatchCardData,
} from "@/lib/types";

export const foodCard: FoodDecisionCardData = {
  id: "food-001",
  type: "food_decision",
  title: "今晚吃什么",
  aiLabel: "AI 情境卡",
  sceneLabel: "今晚 19:12",
  headline: "今晚不想纠结了，给你 3 个刚好合适的选择",
  personalReason: "今天有点闷，你最近更常选微辣、米饭类和 40 元以内的晚餐。",
  weather: mockUserContext.weather,
  budget: "¥40 内",
  options: [
    {
      id: "food-a",
      name: "藤椒鸡米饭",
      price: "¥32",
      tags: ["微辣", "快", "饱腹"],
      reason: "有味道但不太油，适合下班后快速解决。",
      fitMoment: "想吃点爽的，但不想太放纵",
    },
    {
      id: "food-b",
      name: "越南牛肉粉",
      price: "¥38",
      tags: ["清爽", "热汤", "低负担"],
      reason: "天气有点闷，热汤但不厚重。",
      fitMoment: "想吃舒服一点",
    },
    {
      id: "food-c",
      name: "番茄牛腩饭",
      price: "¥36",
      tags: ["酸甜", "米饭", "稳定"],
      reason: "不会踩雷，满足感足够。",
      fitMoment: "不想冒险的时候",
    },
  ],
  primaryActions: foodActions,
};

export const microTripCard: MicroTripCardData = {
  id: "trip-001",
  type: "micro_trip",
  title: "3 小时城市逃逸",
  aiLabel: "AI 情境卡",
  sceneLabel: "周末 16:12",
  headline: "现在出发，3 小时刚好能完成的城市小逃逸",
  personalReason:
    "今天阴天不晒，适合低体力散步；你最近更偏好安静、能拍照、不太赶的路线。",
  city: "上海",
  duration: "3 小时",
  mood: "低体力 / 慢恢复",
  stops: [
    {
      id: "trip-a",
      time: "16:30",
      title: "街角咖啡",
      description: "先拿一杯冰拿铁，把节奏放慢。",
      tags: ["室内", "低体力"],
    },
    {
      id: "trip-b",
      time: "17:10",
      title: "沿河慢走",
      description: "只走 25 分钟，路上有树影和水面。",
      tags: ["散步", "可拍照"],
    },
    {
      id: "trip-c",
      time: "18:00",
      title: "不用排队的小酒馆",
      description: "吃简餐，不把周末过成赶场。",
      tags: ["简餐", "放松"],
    },
    {
      id: "trip-d",
      time: "19:20",
      title: "地铁回家",
      description: "路线收住，刚好不累过头。",
      tags: ["收尾", "可控"],
    },
  ],
  primaryActions: tripActions,
};

export const sportsCard: SportsPreMatchCardData = {
  id: "sports-001",
  type: "sports_pre_match",
  title: "赛前 15 分钟",
  aiLabel: "AI 情境卡",
  sceneLabel: "开赛前 14 分钟",
  headline: "开赛前 15 分钟，你最该知道的 3 个看点",
  personalReason: "你关注的前锋今天首发，这场比赛的胜负手可能在左路对位。",
  homeTeam: "曼城",
  awayTeam: "阿森纳",
  startInMinutes: 14,
  followedPlayer: "福登",
  keyMatchup: "左路速度对抗",
  insights: [
    {
      id: "insight-a",
      title: "左路会决定前 20 分钟节奏",
      detail: "曼城如果能把球推到弱侧，阿森纳的回追压力会很大。",
    },
    {
      id: "insight-b",
      title: "阿森纳可能更早高压",
      detail: "前场压迫会影响曼城后腰接球质量。",
    },
    {
      id: "insight-c",
      title: "先丢球会改变曼城进攻重心",
      detail: "如果比分落后，曼城会更依赖中路渗透。",
    },
  ],
  primaryActions: sportsActions,
};

export const recoveryCard: RecoveryCardData = {
  id: "recovery-001",
  type: "recovery",
  title: "下班回血",
  aiLabel: "AI 情境卡",
  sceneLabel: "下班后 22:40",
  headline: "你今天不适合硬撑，给你一个 12 分钟回血方案",
  personalReason: "你已经连续刷了很久，今天更像是脑力耗尽，而不是无聊。",
  energyState: "tired",
  totalDuration: "12 分钟",
  steps: [
    { id: "step-a", text: "先喝半杯水", duration: "1 分钟" },
    { id: "step-b", text: "播一首低 BPM 的歌", duration: "2 分钟" },
    { id: "step-c", text: "做 3 分钟肩颈拉伸", duration: "3 分钟" },
    { id: "step-d", text: "晚饭别再点太油", duration: "现在" },
  ],
  primaryActions: recoveryActions,
};

export const mockFeedItems: FeedItem[] = [
  {
    id: "video-001",
    type: "video",
    title: "这家深夜小面真的救命",
    author: "城市胃口研究所",
    caption: "下班后突然想吃点热乎的，这家小面胜在快、辣度刚好、不会太贵。",
    soundtrack: "深夜街头采样",
    posterTone: "food",
    tags: ["深夜食堂", "小面", "下班"],
    stats: { likes: "18.2w", comments: "6421", shares: "1.9w" },
  },
  foodCard,
  {
    id: "video-002",
    type: "video",
    title: "上海人私藏的 3 条散步路线",
    author: "周末去哪儿",
    caption: "不用出远门，阴天反而适合拍街角、橱窗和河边的光。",
    soundtrack: "City walk loop",
    posterTone: "trip",
    tags: ["散步", "城市逃逸", "周末"],
    stats: { likes: "25.7w", comments: "8310", shares: "3.1w" },
  },
  microTripCard,
  {
    id: "video-003",
    type: "video",
    title: "这场比赛的胜负手可能不是前锋",
    author: "足球显微镜",
    caption: "看热闹之前先看对位，今晚左路会很有意思。",
    soundtrack: "Stadium build",
    posterTone: "sports",
    tags: ["足球", "赛前", "看点"],
    stats: { likes: "41.4w", comments: "2.4w", shares: "5.6w" },
  },
  sportsCard,
  recoveryCard,
];

export const mockAiCards: AiFeedCard[] = mockFeedItems.filter(
  (item): item is AiFeedCard => item.type !== "video",
);
