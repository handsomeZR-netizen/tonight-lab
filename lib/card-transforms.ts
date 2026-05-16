import type {
  AiFeedCard,
  FoodDecisionCardData,
  FoodOption,
  MicroTripCardData,
  RecoveryCardData,
  RecoveryStep,
  SportsPreMatchCardData,
  TripStop,
} from "@/lib/types";

export function transformCard(card: AiFeedCard, actionId: string): AiFeedCard {
  switch (card.type) {
    case "food_decision":
      return transformFoodCard(card, actionId);
    case "micro_trip":
      return transformMicroTripCard(card, actionId);
    case "sports_pre_match":
      return transformSportsCard(card, actionId);
    case "recovery":
      return transformRecoveryCard(card, actionId);
  }
}

export function transformFoodCard(
  card: FoodDecisionCardData,
  actionId: string,
): FoodDecisionCardData {
  const variants: Record<
    string,
    Pick<FoodDecisionCardData, "headline" | "personalReason" | "options"> & {
      feedbackMessage: string;
    }
  > = {
    spicy: {
      headline: "那就直接上微辣满足感",
      personalReason: "你现在更像是想吃点有味道的，但不想太油。",
      feedbackMessage: "已按微辣重排",
      options: foodOptions([
        ["spicy-1", "藤椒鸡米饭", "¥32", ["微辣", "米饭", "下班友好"], "有刺激感但不重油，适合快速回血。", "想吃辣但不想后悔"],
        ["spicy-2", "酸汤肥牛粉", "¥39", ["酸辣", "热汤", "满足"], "天气闷的时候，酸辣比麻辣更舒服。", "想吃热乎一点"],
        ["spicy-3", "麻辣拌小碗", "¥28", ["可控", "便宜", "快"], "小份更安全，不容易吃撑。", "只想过个嘴瘾"],
      ]),
    },
    "no-delivery": {
      headline: "不点外卖，也能 15 分钟解决",
      personalReason: "你现在需要的是低决策成本，不是再等 40 分钟。",
      feedbackMessage: "已切到附近可到店方案",
      options: foodOptions([
        ["store-1", "便利店鸡胸肉饭团组合", "¥24", ["近", "可控", "快"], "下楼就能拿，不被配送时间牵着走。", "不想等的时候"],
        ["store-2", "楼下快餐轻食", "¥29", ["堂食", "低负担", "稳定"], "坐下吃完再回家，避免边刷边吃。", "想把晚饭认真结束"],
        ["store-3", "12 分钟番茄鸡蛋面", "¥12", ["回家做", "热汤", "省钱"], "食材简单，满足感比随便点外卖更稳。", "还有一点点力气"],
      ]),
    },
    alone: {
      headline: "一个人吃，就别点成两个人的量",
      personalReason: "你最近独食时更常选单人饭和热汤，不太需要大份套餐。",
      feedbackMessage: "已改成单人友好",
      options: foodOptions([
        ["alone-1", "番茄牛腩单人饭", "¥34", ["单人", "米饭", "稳定"], "一份刚好，不需要凑满减。", "想吃稳妥一点"],
        ["alone-2", "小碗云吞面", "¥26", ["热汤", "轻", "不撑"], "有汤有主食，吃完不会太困。", "只想舒服解决"],
        ["alone-3", "鸡蛋牛肉卷 + 豆浆", "¥22", ["便宜", "快", "少负担"], "不用做选择，也不会剩。", "懒得认真吃饭"],
      ]),
    },
    "low-calorie": {
      headline: "换成低负担，但别太寡淡",
      personalReason: "你想控制一点，但现在也需要满足感。",
      feedbackMessage: "已换成低卡版本",
      options: foodOptions([
        ["low-1", "鸡胸肉藜麦碗", "¥36", ["高蛋白", "低负担", "稳定"], "不会太撑，但有饱腹感。", "想轻一点但不能饿"],
        ["low-2", "越南牛肉粉少粉版", "¥38", ["热汤", "清爽", "少粉"], "口味不无聊，负担比盖饭低。", "想吃舒服"],
        ["low-3", "关东煮 + 饭团", "¥25", ["便利", "可控", "便宜"], "组合灵活，不容易超量。", "不想点大餐"],
      ]),
    },
    "budget-30": {
      headline: "30 元以内，保留一点满足感",
      personalReason: "预算收紧时，优先保留热度、主食和稳定口味。",
      feedbackMessage: "已按 30 元内重排",
      options: foodOptions([
        ["budget-1", "麻辣拌小碗", "¥28", ["便宜", "有味", "快"], "小份刚好过嘴瘾。", "想省但不想寡淡"],
        ["budget-2", "番茄鸡蛋盖饭", "¥24", ["米饭", "热", "稳定"], "便宜且不容易踩雷。", "想吃一顿稳的"],
        ["budget-3", "便利店热汤 + 饭团", "¥21", ["近", "可控", "省钱"], "不用等，也不会超预算。", "只想快速结束选择"],
      ]),
    },
  };

  const variant = variants[actionId];
  return variant
    ? { ...card, ...variant, selectedIntent: actionId, selectedActionId: actionId }
    : { ...card, selectedActionId: actionId };
}

export function transformMicroTripCard(
  card: MicroTripCardData,
  actionId: string,
): MicroTripCardData {
  const variants: Record<
    string,
    Pick<MicroTripCardData, "headline" | "personalReason" | "mood" | "stops"> & {
      feedbackMessage: string;
    }
  > = {
    "less-walk": {
      headline: "少走路版：把恢复感留住",
      personalReason: "路线已减少步行，把室内停留和短距离移动放在前面。",
      mood: "少走路 / 室内优先",
      feedbackMessage: "路线已减少步行",
      stops: tripStops([
        ["lw-1", "16:30", "街角咖啡二楼", "坐 35 分钟，先把体力稳住。", ["室内", "坐下"]],
        ["lw-2", "17:20", "隔壁独立书店", "只走 4 分钟，翻两本杂志。", ["短距离", "安静"]],
        ["lw-3", "18:10", "商场小酒馆", "不用排队，简餐收尾。", ["室内", "低体力"]],
      ]),
    },
    "photo-friendly": {
      headline: "拍照版：日落、橱窗、河边机位都安排好",
      personalReason: "你最近更常停留在街景和黄昏内容，这条路线会更出片。",
      mood: "拍照 / 黄昏光",
      feedbackMessage: "已加入拍照机位",
      stops: tripStops([
        ["photo-1", "16:40", "老街橱窗", "先拍暖色橱窗和行人倒影。", ["橱窗", "街景"]],
        ["photo-2", "17:25", "河边转角", "等 15 分钟日落，水面会更好看。", ["日落", "机位"]],
        ["photo-3", "18:20", "小酒馆门口", "收一张霓虹门头，不用复杂构图。", ["夜景", "氛围"]],
      ]),
    },
    solo: {
      headline: "一个人版：安静一点，不用解释给谁听",
      personalReason: "你现在更适合低社交路线，停留点都能自然一个人待着。",
      mood: "独处 / 治愈",
      feedbackMessage: "已切到独处路线",
      stops: tripStops([
        ["solo-1", "16:30", "靠窗咖啡位", "只点一杯，坐到脑子慢下来。", ["独处", "安静"]],
        ["solo-2", "17:20", "河边长椅", "走到不想走就停，不赶。", ["慢走", "自由"]],
        ["solo-3", "18:10", "一人食吧台", "不用聊天，也不用解释今天。", ["吧台", "一人食"]],
      ]),
    },
    date: {
      headline: "约会版：轻松、有话题、不尴尬",
      personalReason: "这条路线把可聊天、可停顿、可拍照的点放在一起。",
      mood: "约会 / 不赶",
      feedbackMessage: "已改成约会友好",
      stops: tripStops([
        ["date-1", "16:30", "街角甜品店", "先用甜品破冰，不急着走。", ["轻松", "室内"]],
        ["date-2", "17:20", "河边短走", "15 分钟刚好，有景也有话题。", ["散步", "拍照"]],
        ["date-3", "18:00", "小酒馆简餐", "不用排队，适合继续聊。", ["简餐", "氛围"]],
      ]),
    },
    "low-budget": {
      headline: "低预算版：不花大钱，也能换一下空气",
      personalReason: "预算降低后，保留散步、窗口咖啡和免费街景。",
      mood: "低预算 / 轻出门",
      feedbackMessage: "预算已降下来",
      stops: tripStops([
        ["budget-1", "16:30", "便利店冰咖啡", "拿一杯就走，不坐贵咖啡。", ["省钱", "快"]],
        ["budget-2", "17:00", "河边免费步道", "只走舒服的一小段。", ["免费", "散步"]],
        ["budget-3", "18:10", "社区面包店", "买半价面包当简餐。", ["低预算", "收尾"]],
      ]),
    },
  };

  const variant = variants[actionId];
  return variant
    ? { ...card, ...variant, selectedIntent: actionId, selectedActionId: actionId }
    : { ...card, selectedActionId: actionId };
}

export function transformSportsCard(
  card: SportsPreMatchCardData,
  actionId: string,
): SportsPreMatchCardData {
  const predictionStats = { homeWin: 47, draw: 28, awayWin: 25 };
  const predictions: Record<string, SportsPreMatchCardData["userPrediction"]> = {
    home: "home",
    draw: "draw",
    away: "away",
  };

  if (actionId in predictions) {
    return {
      ...card,
      headline: `你的预测：${actionId === "home" ? "主胜" : actionId === "draw" ? "平局" : "客胜"}`,
      personalReason: "当前球迷倾向已同步，你可以带着这个视角看前 20 分钟。",
      predictionStats,
      userPrediction: predictions[actionId],
      selectedIntent: actionId,
      selectedActionId: actionId,
      feedbackMessage: "预测已记录",
    };
  }

  if (actionId === "player-focus") {
    return {
      ...card,
      headline: "只看福登：他今天首发，后程空间更关键",
      personalReason: "你关注的球员今天首发，他最可能在第 60 分钟后获得反击空间。",
      insights: [
        { id: "player-a", title: "前 20 分钟先看跑位", detail: "他会频繁拉到肋部接球，制造二过一。" },
        { id: "player-b", title: "第 60 分钟后空间更大", detail: "如果阿森纳压上，他的反击接应会更重要。" },
        { id: "player-c", title: "定位球也值得看", detail: "第二落点可能落在他活动区域。" },
      ],
      selectedIntent: actionId,
      selectedActionId: actionId,
      feedbackMessage: "已切到球员视角",
    };
  }

  if (actionId === "one-line") {
    return {
      ...card,
      headline: "一句话版：先看左路，别只盯比分",
      personalReason: "你要的是快速入场信息，所以保留最关键的看点。",
      insights: [
        { id: "one-line", title: "左路对位决定开局节奏", detail: "谁先压住这一侧，谁就更容易掌握前 20 分钟。" },
      ],
      selectedIntent: actionId,
      selectedActionId: actionId,
      feedbackMessage: "已压缩成一句话版",
    };
  }

  return { ...card, selectedActionId: actionId };
}

export function transformRecoveryCard(
  card: RecoveryCardData,
  actionId: string,
): RecoveryCardData {
  const variants: Record<
    string,
    Pick<RecoveryCardData, "headline" | "personalReason" | "energyState" | "totalDuration" | "steps"> & {
      feedbackMessage: string;
    }
  > = {
    anxious: {
      headline: "先把焦虑降一点，不急着解决人生",
      personalReason: "你现在需要短、具体、能立刻开始的动作。",
      energyState: "anxious",
      totalDuration: "8 分钟",
      feedbackMessage: "已切到焦虑缓和版",
      steps: recoverySteps([
        ["anx-1", "把脚踩实地面", "1 分钟"],
        ["anx-2", "说出眼前 5 个物品", "2 分钟"],
        ["anx-3", "呼气比吸气慢一点", "5 分钟"],
      ]),
    },
    "lying-down": {
      headline: "躺着也能做的 5 分钟版",
      personalReason: "不要求你立刻变好，只先把刺激降下来。",
      energyState: "flat",
      totalDuration: "5 分钟",
      feedbackMessage: "已改成躺着版",
      steps: recoverySteps([
        ["lie-1", "手机放远一点", "30 秒"],
        ["lie-2", "只做 6 次深呼吸", "3 分钟"],
        ["lie-3", "不要求你立刻变好", "1 分钟"],
      ]),
    },
    "five-min": {
      headline: "5 分钟版：只做最有用的两件事",
      personalReason: "时间缩短后，保留补水和肩颈放松。",
      energyState: "tired",
      totalDuration: "5 分钟",
      feedbackMessage: "已压缩到 5 分钟",
      steps: recoverySteps([
        ["five-1", "喝半杯水", "1 分钟"],
        ["five-2", "肩膀向后绕 8 次", "2 分钟"],
        ["five-3", "把屏幕亮度调低", "30 秒"],
      ]),
    },
    "no-advice": {
      headline: "懂。那就别努力了。",
      personalReason: "不讲道理，只留一个很小的动作。",
      energyState: "flat",
      totalDuration: "2 分钟",
      feedbackMessage: "已改成极简陪伴",
      steps: recoverySteps([
        ["no-1", "喝口水", "现在"],
        ["no-2", "把亮度调低", "现在"],
        ["no-3", "剩下的先不用管", "现在"],
      ]),
    },
    sleep: {
      headline: "睡前模式：少一点刺激，给大脑收尾",
      personalReason: "你已经刷了很久，继续看长内容只会更清醒。",
      energyState: "overstimulated",
      totalDuration: "10 分钟",
      feedbackMessage: "已切到睡前模式",
      steps: recoverySteps([
        ["sleep-1", "关闭自动播放声音", "30 秒"],
        ["sleep-2", "洗漱时不带手机", "5 分钟"],
        ["sleep-3", "回床后只听一首慢歌", "4 分钟"],
      ]),
    },
  };

  const variant = variants[actionId];
  return variant
    ? { ...card, ...variant, selectedIntent: actionId, selectedActionId: actionId }
    : { ...card, selectedActionId: actionId };
}

function foodOptions(rows: [string, string, string, string[], string, string][]): FoodOption[] {
  return rows.map(([id, name, price, tags, reason, fitMoment]) => ({
    id,
    name,
    price,
    tags,
    reason,
    fitMoment,
  }));
}

function tripStops(rows: [string, string, string, string, string[]][]): TripStop[] {
  return rows.map(([id, time, title, description, tags]) => ({
    id,
    time,
    title,
    description,
    tags,
  }));
}

function recoverySteps(rows: [string, string, string][]): RecoveryStep[] {
  return rows.map(([id, text, duration]) => ({ id, text, duration }));
}
