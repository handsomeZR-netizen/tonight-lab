export type DetailTone = "food" | "trip" | "sports" | "recovery";

export type Metric = {
  label: string;
  value: string;
  tone?: string;
};

export type FoodMode = {
  id: string;
  label: string;
  description: string;
  headline: string;
  budget: string;
  spice: string;
  speed: string;
  options: Array<{
    name: string;
    price: string;
    reason: string;
    tags: string[];
    fit: string;
  }>;
  metrics: Metric[];
  result: string;
  avoid: string;
};

export type TripMode = {
  id: string;
  label: string;
  description: string;
  headline: string;
  mood: string;
  stops: Array<{
    time: string;
    title: string;
    description: string;
    tags: string[];
  }>;
  metrics: Metric[];
  result: string;
  planB: string;
};

export type SportsMode = {
  id: string;
  label: string;
  description: string;
  headline: string;
  angle: string;
  score: string;
  insights: Array<{
    title: string;
    detail: string;
  }>;
  metrics: Metric[];
  result: string;
  chant: string;
};

export type RecoveryMode = {
  id: string;
  label: string;
  description: string;
  headline: string;
  duration: string;
  steps: Array<{
    text: string;
    duration: string;
    note: string;
  }>;
  metrics: Metric[];
  result: string;
  promise: string;
};

export const foodDetail = {
  title: "今晚吃什么实验台",
  kicker: "把纠结拆成几个可控旋钮",
  description:
    "不是再给你一堆店，而是先判断你现在想要快、爽、舒服还是省钱，然后把选择压到能立刻下单的 3 个。",
  cover: "/images/generated/card-food-decision.png",
  modes: [
    {
      id: "comfort",
      label: "想吃舒服",
      description: "热汤、米饭、稳定口味，不刺激但有满足感。",
      headline: "今晚别硬选，吃一口能让人安静下来的。",
      budget: "¥40 内",
      spice: "低辣",
      speed: "30 分钟内",
      options: [
        {
          name: "番茄牛腩饭",
          price: "¥36",
          reason: "酸甜热乎，米饭稳定，适合把一天收住。",
          tags: ["米饭", "稳定", "热"],
          fit: "适合不想冒险但想吃饱的晚上",
        },
        {
          name: "越南牛肉粉",
          price: "¥38",
          reason: "汤底清爽，不会吃完太困。",
          tags: ["热汤", "清爽", "低负担"],
          fit: "适合天气闷、胃口一般的时候",
        },
        {
          name: "小碗云吞面",
          price: "¥28",
          reason: "不需要凑满减，一人份刚好。",
          tags: ["快", "一人食", "不撑"],
          fit: "适合想快速结束选择",
        },
      ],
      metrics: [
        { label: "后悔概率", value: "12%" },
        { label: "满足感", value: "82" },
        { label: "负担感", value: "低" },
      ],
      result: "今晚就选番茄牛腩饭：稳、热、不会太放纵。",
      avoid: "先避开炸鸡套餐和超大满减，今晚容易越点越多。",
    },
    {
      id: "spicy",
      label: "想吃点爽的",
      description: "保留辣味，但不把明天早上赔进去。",
      headline: "微辣可以，别把今天的疲惫吃成明天的负担。",
      budget: "¥35 内",
      spice: "微辣",
      speed: "25 分钟内",
      options: [
        {
          name: "藤椒鸡米饭",
          price: "¥32",
          reason: "有刺激感但不重油，是今晚最稳的爽感。",
          tags: ["微辣", "米饭", "快"],
          fit: "适合想过嘴瘾但不想后悔",
        },
        {
          name: "酸汤肥牛粉",
          price: "¥39",
          reason: "酸辣比麻辣轻一点，天气闷时更舒服。",
          tags: ["酸辣", "热汤", "满足"],
          fit: "适合想吃热乎但不想油腻",
        },
        {
          name: "麻辣拌小碗",
          price: "¥28",
          reason: "小份可控，满足感够，不容易吃撑。",
          tags: ["便宜", "快", "可控"],
          fit: "适合只想过个嘴瘾",
        },
      ],
      metrics: [
        { label: "爽感", value: "91" },
        { label: "后悔概率", value: "24%" },
        { label: "下单速度", value: "快" },
      ],
      result: "今晚就选藤椒鸡米饭：有味道，但还算懂事。",
      avoid: "别点重麻重油大份拌菜，今晚你的胃不一定想开会。",
    },
    {
      id: "budget",
      label: "想省一点",
      description: "把预算收住，但不牺牲热度和主食。",
      headline: "30 元以内也可以像认真吃了一顿。",
      budget: "¥30 内",
      spice: "可选",
      speed: "20 分钟内",
      options: [
        {
          name: "番茄鸡蛋盖饭",
          price: "¥24",
          reason: "便宜、热、稳定，不会踩雷。",
          tags: ["省钱", "米饭", "热"],
          fit: "适合想省但不想随便糊弄",
        },
        {
          name: "便利店热汤 + 饭团",
          price: "¥21",
          reason: "不用等配送，组合也更可控。",
          tags: ["近", "可控", "快"],
          fit: "适合只想马上解决",
        },
        {
          name: "麻辣拌小碗",
          price: "¥28",
          reason: "比大份套餐更安全，爽感还能留下。",
          tags: ["微辣", "便宜", "不浪费"],
          fit: "适合想省但嘴巴不想妥协",
        },
      ],
      metrics: [
        { label: "省钱程度", value: "高" },
        { label: "满足感", value: "74" },
        { label: "纠结成本", value: "低" },
      ],
      result: "今晚就选番茄鸡蛋盖饭：便宜但不敷衍。",
      avoid: "别为了满减硬凑第二份，省钱会变成多花。",
    },
  ] satisfies FoodMode[],
};

export const tripDetail = {
  title: "3 小时城市逃逸生成器",
  kicker: "不用远行，也能换一下空气",
  description:
    "把时间、体力、拍照欲和预算变成一条能真的走完的路线。重点不是打卡，而是回来时没那么空。",
  cover: "/images/generated/card-micro-trip.png",
  modes: [
    {
      id: "slow",
      label: "低体力慢走",
      description: "少走路，多坐下，路线不催你。",
      headline: "今天不适合赶场，适合轻轻逃离一下。",
      mood: "低体力 / 慢恢复",
      stops: [
        { time: "16:30", title: "街角咖啡", description: "先坐 30 分钟，把节奏放慢。", tags: ["室内", "低体力"] },
        { time: "17:15", title: "河边短走", description: "只走一小段，看到水面就够。", tags: ["散步", "不赶"] },
        { time: "18:10", title: "小酒馆简餐", description: "不用排队，吃完就收尾。", tags: ["简餐", "舒服"] },
        { time: "19:20", title: "地铁回家", description: "别把回血路线走成耐力赛。", tags: ["收住", "可控"] },
      ],
      metrics: [
        { label: "步行压力", value: "低" },
        { label: "逃离工位感", value: "78" },
        { label: "社交耗电", value: "12%" },
      ],
      result: "你的路线是：一杯咖啡，一段河边，刚好回家。",
      planB: "如果下雨，就把河边短走换成隔壁书店 25 分钟。",
    },
    {
      id: "photo",
      label: "想拍点东西",
      description: "给你几个不用摆拍也能出片的停靠点。",
      headline: "阴天也能拍，重点是玻璃、树影和水面。",
      mood: "拍照 / 黄昏光",
      stops: [
        { time: "16:40", title: "老街橱窗", description: "拍玻璃反光和行人路过。", tags: ["橱窗", "街景"] },
        { time: "17:25", title: "河边转角", description: "等 15 分钟，水面会更有层次。", tags: ["日落", "机位"] },
        { time: "18:20", title: "霓虹门头", description: "收一张夜色，不用复杂构图。", tags: ["夜景", "氛围"] },
      ],
      metrics: [
        { label: "出片指数", value: "89" },
        { label: "步行压力", value: "中" },
        { label: "分享欲", value: "强" },
      ],
      result: "你的路线是：橱窗开场，河边等光，霓虹收尾。",
      planB: "如果天太暗，就把河边改成商场中庭的玻璃扶梯。",
    },
    {
      id: "solo",
      label: "一个人待会儿",
      description: "不需要解释今天，也不需要配合别人。",
      headline: "把社交静音，给自己留 3 小时。",
      mood: "独处 / 低社交",
      stops: [
        { time: "16:30", title: "靠窗单人位", description: "点一杯，不刷工作消息。", tags: ["独处", "安静"] },
        { time: "17:10", title: "社区书店", description: "翻两本杂志，不买也可以。", tags: ["室内", "自由"] },
        { time: "18:05", title: "吧台一人食", description: "不用聊天，也能认真吃完。", tags: ["吧台", "一人食"] },
      ],
      metrics: [
        { label: "社交耗电", value: "3%" },
        { label: "安全感", value: "86" },
        { label: "回家阻力", value: "低" },
      ],
      result: "你的路线是：坐下、翻书、吃一顿不用解释的晚饭。",
      planB: "如果店里太吵，直接切到便利店热饮 + 河边长椅。",
    },
  ] satisfies TripMode[],
};

export const sportsDetail = {
  title: "赛前 15 分钟观赛室",
  kicker: "别只盯比分，先拿到今晚的观赛视角",
  description:
    "选择你的阵营和观赛心情，卡片会把关键对位、前三个看点和弹幕式任务压缩成赛前能消化的内容。",
  cover: "/images/generated/card-sports-prematch.png",
  modes: [
    {
      id: "home",
      label: "我站主队",
      description: "带着主队视角看开局压迫和左路推进。",
      headline: "主队要赢，前 20 分钟必须先把左路打热。",
      angle: "主胜视角",
      score: "2 : 1",
      insights: [
        { title: "先看左路速度对抗", detail: "如果主队能把球推到弱侧，客队回追压力会很大。" },
        { title: "后腰第一脚出球很关键", detail: "被压住就会陷入回传，开局节奏会断。" },
        { title: "第 60 分钟后看替补冲击", detail: "空间拉开后，边路替补更容易制造机会。" },
      ],
      metrics: [
        { label: "主胜倾向", value: "47%" },
        { label: "情绪波动", value: "高" },
        { label: "懂球感", value: "82" },
      ],
      result: "今晚你是左路观察员：别急着喊进攻，先看推进质量。",
      chant: "开局别慌，先把左路跑起来。",
    },
    {
      id: "draw",
      label: "保守看平",
      description: "适合想冷静看球，不想被情绪带跑。",
      headline: "这场可能会很胶着，真正的戏在中场抢夺。",
      angle: "平局视角",
      score: "1 : 1",
      insights: [
        { title: "前 15 分钟不会太开放", detail: "双方都要先确认压迫强度，不会立刻赌大。" },
        { title: "定位球可能改变气氛", detail: "运动战打不开时，第二落点会更重要。" },
        { title: "谁先换人谁先变阵", detail: "平局走势里，教练的第一个调整会很明显。" },
      ],
      metrics: [
        { label: "平局倾向", value: "28%" },
        { label: "战术浓度", value: "高" },
        { label: "吵架风险", value: "低" },
      ],
      result: "今晚你是冷静派：看中场，不被弹幕带节奏。",
      chant: "别急着开香槟，也别急着开会。",
    },
    {
      id: "player",
      label: "只看福登",
      description: "把复杂比赛变成一个球员观察任务。",
      headline: "只看福登：跑位、接应和第 60 分钟后的空间。",
      angle: "球员视角",
      score: "关键助攻",
      insights: [
        { title: "先看他是不是拉到肋部", detail: "如果频繁内收，说明主队想打二过一。" },
        { title: "再看接球前有没有回头", detail: "回头次数多，说明他在找身后空间。" },
        { title: "最后看体能下降后的反击", detail: "对手压上后，他会更容易拿到冲刺空间。" },
      ],
      metrics: [
        { label: "球员镜头", value: "多" },
        { label: "助攻概率", value: "31%" },
        { label: "观赛任务", value: "清晰" },
      ],
      result: "今晚你是福登单推人：每次他回头都值得看一眼。",
      chant: "别眨眼，他可能已经跑到空当了。",
    },
  ] satisfies SportsMode[],
};

export const recoveryDetail = {
  title: "下班回血小仪式",
  kicker: "不讲大道理，只把今晚调轻一点",
  description:
    "选择你现在的状态，生成一个短到能开始、轻到不讨厌的恢复流程。做完不用变好很多，只要别继续硬撑。",
  cover: "/images/generated/card-recovery.png",
  modes: [
    {
      id: "tired",
      label: "脑力疲惫",
      description: "还有意识，但不想再处理任何复杂事。",
      headline: "12 分钟，把脑子从工作模式里拔出来。",
      duration: "12 分钟",
      steps: [
        { text: "喝半杯水", duration: "1 分钟", note: "先处理身体，不处理人生。" },
        { text: "放一首低 BPM 的歌", duration: "3 分钟", note: "不要歌单战争，第一首能听就行。" },
        { text: "肩颈绕圈 8 次", duration: "3 分钟", note: "幅度小一点，别搞成健身。" },
        { text: "把明天第一件事写下来", duration: "5 分钟", note: "只写一件，写完就停。" },
      ],
      metrics: [
        { label: "回血进度", value: "68%" },
        { label: "脑内噪音", value: "下降" },
        { label: "执行难度", value: "低" },
      ],
      result: "今晚目标：不继续消耗自己，就已经算赢。",
      promise: "做完这 12 分钟，不需要立刻变积极。",
    },
    {
      id: "anxious",
      label: "有点焦虑",
      description: "脑子停不下来，但现在不适合继续分析。",
      headline: "先把身体拉回房间，人生问题明天再开会。",
      duration: "8 分钟",
      steps: [
        { text: "脚踩实地面", duration: "1 分钟", note: "感受到地板就够。" },
        { text: "说出眼前 5 个物品", duration: "2 分钟", note: "让注意力离开脑内弹幕。" },
        { text: "呼气比吸气慢一点", duration: "4 分钟", note: "不用标准，慢一点就行。" },
        { text: "把最担心的事命名", duration: "1 分钟", note: "只命名，不解决。" },
      ],
      metrics: [
        { label: "焦虑降噪", value: "中高" },
        { label: "执行难度", value: "很低" },
        { label: "屏幕依赖", value: "少" },
      ],
      result: "今晚目标：先落地，不急着解决全部。",
      promise: "焦虑不是任务清单，不用今晚清空。",
    },
    {
      id: "sleep",
      label: "准备睡了",
      description: "不要再刷长内容，把刺激慢慢关掉。",
      headline: "睡前 10 分钟，别让大脑继续开夜车。",
      duration: "10 分钟",
      steps: [
        { text: "关闭自动播放声音", duration: "30 秒", note: "先切掉最容易上头的入口。" },
        { text: "洗漱时不带手机", duration: "5 分钟", note: "让手先离开屏幕。" },
        { text: "调低亮度和音量", duration: "1 分钟", note: "给身体一个收工信号。" },
        { text: "只听一首慢歌", duration: "3 分钟", note: "一首结束，就别续杯。" },
      ],
      metrics: [
        { label: "入睡友好", value: "高" },
        { label: "刺激强度", value: "低" },
        { label: "继续刷风险", value: "可控" },
      ],
      result: "今晚目标：让手机先下班，你再下班。",
      promise: "不用自律到完美，只要少刷一轮。",
    },
  ] satisfies RecoveryMode[],
};
