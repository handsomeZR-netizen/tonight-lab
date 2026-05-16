# Tonight Lab

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=threedotjs)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Demo](https://img.shields.io/badge/Status-Editorial_Demo-7C3AED?style=for-the-badge)

一个把“今晚到底做什么”包装成 AI 场景叙事的沉浸式信息流 demo。

它不是普通的卡片列表，而是一组接近产品评审级别的交互原型：短视频式滑动、AI 情境推荐、杂志化详情页、WebGL 氛围层和 20 张定制生成图资产被放进同一个体验里，让一个简单 demo 看起来像一支已经准备好上台路演的小型产品。

![Tonight Lab 产品演示封面](/public/images/generated/landing-hero-cover.png)

## 项目亮点

- **AI 情境卡片信息流**：用接近短视频产品的节奏组织内容，不是传统 dashboard，也不是静态 landing page。
- **四个“今晚”决策场景**：吃什么、去哪走走、赛前怎么看、下班怎么回血，每张卡都带有独立的交互逻辑。
- **Editorial 详情页**：大标题、留白、期刊式分隔、pull quote、field notes 和 signature moment，让详情页更像一本可交互杂志。
- **WebGL 氛围系统**：基于 Three.js / React Three Fiber，为不同 tone 提供暖雾、城市光流、赛场能量场和呼吸光晕。
- **Framer Motion 微交互**：标题入场、数字滚动、路径绘制、卡片翻转、呼吸节奏等动效服务于内容，而不是单纯炫技。
- **定制生成图资产**：20 张按 `card-{tone}-{slug}.png` 命名的 editorial 图片，统一放在 `public/images/generated/`。
- **移动端优先的展示框架**：首页保留手机信息流观感，详情页则展开成更大屏、更具杂志感的沉浸页面。

## 四个场景

### 今晚吃什么实验台

把“吃什么”的纠结拆成预算、辣度、饱腹感和后悔概率。用户不用在无尽店铺里游荡，而是直接拿到三组可以下单的候选方案。

亮点包括：

- 胃口模式切换
- 饱腹与辣度控制
- 菜单翻牌 signature interaction
- 暖色厨房与食物特写资产

### 3 小时城市逃逸生成器

为临时起意的短途 city walk 生成一条轻量路线。它不负责解决人生，但负责把下班后的 3 小时变得像一段有镜头感的短片。

亮点包括：

- 慢走、拍照、独处等路线模式
- 站点式 itinerary
- SVG 路径绘制时间线
- 冷蓝黄昏城市图像系统

### 赛前 15 分钟观赛室

把开赛前的碎片时间变成有立场的观赛准备。用户可以挑一个视角、看关键对位、做比分预测，再带着情绪进入比赛。

亮点包括：

- 赛前角度选择
- 比分预测与看点卡
- 战术板 X/O 互动
- 夜场草坪、球员侧脸、看台人群资产

### 下班回血小仪式

一个面向疲惫状态的低负担恢复流程。它不假装能拯救一整天，只把接下来的 12 分钟变得柔和、可执行、可以结束。

亮点包括：

- 恢复状态选择
- 步骤清单与进度反馈
- 呼吸气泡 signature interaction
- 深紫房间、台灯、软光球图像系统

## 技术栈

- **Framework**：Next.js App Router
- **UI Runtime**：React 19
- **Language**：TypeScript
- **Styling**：Tailwind CSS
- **Animation**：Framer Motion
- **3D / WebGL**：Three.js、React Three Fiber、Drei
- **Icons**：Lucide React
- **UI Primitives**：Radix Slot、shadcn/ui 风格组件
- **Validation / Utilities**：Zod、clsx、tailwind-merge

## 项目结构

```text
app/
  page.tsx                 # 首页信息流与产品包装
  cards/*/page.tsx         # 四个 editorial 详情页
components/
  cards/                   # 首页卡片与各场景 signature interaction
  detail/                  # 详情页 shell、tab、指标、分享卡
  editorial/               # 期刊式视觉组件
  feed/                    # 手机信息流展示框架
  scene/                   # Three.js tone scenes
lib/
  detail-content.ts        # 四个详情页的数据与文案
  mock-feed.ts             # 首页 feed 数据
public/images/generated/   # 生成图与封面资产
```

## 本地运行

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

默认访问：

```text
http://localhost:3000
```

常用检查：

```bash
npm run lint
npm run typecheck
npm run build
```

## 页面入口

```text
/cards/food      今晚吃什么实验台
/cards/trip      3 小时城市逃逸生成器
/cards/sports    赛前 15 分钟观赛室
/cards/recovery  下班回血小仪式
```

## 生成图资产

项目内置一组 editorial 风格图片资产，命名规则为：

```text
card-{tone}-{slug}.png
```

示例：

```text
card-food-amber-hero.png
card-trip-sky-pullquote.png
card-sports-emerald-tactical.png
card-recovery-violet-breath.png
```

这些图片不只是占位图，而是参与整体视觉叙事：每个 tone 都有自己的色彩、光线、材质和镜头语言。

## 设计取向

Tonight Lab 的界面目标不是“功能堆满”，而是让每个选择都像被编辑过：信息密度要足够，情绪也要足够。它保留 AI 推荐产品该有的即时反馈，同时用杂志编排、场景图像和动效把一次轻量决策包装成更完整的体验。

适合用于：

- AI feed / AI card 产品概念演示
- 移动端信息流交互原型
- Editorial UI 视觉探索
- WebGL 氛围层与内容产品结合实验
- 前端作品集展示

## 备注

这是一个本地 demo 项目，重点是产品表达、交互质感和视觉叙事。它没有连接真实推荐系统，也没有接入生产级后端；所有内容都服务于前端原型展示。
