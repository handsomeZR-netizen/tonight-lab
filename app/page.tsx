import {
  BrainCircuit,
  Clock3,
  Compass,
  HeartPulse,
  Layers3,
  Map,
  MessageSquareText,
  Moon,
  ReceiptText,
  Sparkles,
  Trophy,
  Utensils,
  WalletCards,
} from "lucide-react";

import { HeroSection } from "@/components/landing/HeroSection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";

const scenarios = [
  {
    title: "今晚吃什么",
    description: "结合预算、口味和时间，把“随便吃点”变成三种刚好合适的选择。",
    icon: Utensils,
    tone: "border-amber-200/80 bg-amber-50 text-amber-800",
    detail: "晚餐 · 外卖 · 独处",
  },
  {
    title: "3 小时城市逃逸",
    description: "把刷到的街角、河边和咖啡店，整理成不赶场的短路线。",
    icon: Map,
    tone: "border-sky-200/80 bg-sky-50 text-sky-800",
    detail: "周末 · 散步 · 拍照",
  },
  {
    title: "赛前 15 分钟",
    description: "用轻量看点解释今晚该看哪条边路、哪次对位和哪种节奏。",
    icon: Trophy,
    tone: "border-emerald-200/80 bg-emerald-50 text-emerald-800",
    detail: "足球 · 对位 · 预测",
  },
  {
    title: "下班回血",
    description: "识别疲惫和过载，给出不说教、能完成的短恢复方案。",
    icon: Moon,
    tone: "border-violet-200/80 bg-violet-50 text-violet-800",
    detail: "夜晚 · 放松 · 低刺激",
  },
];

const signals = [
  { label: "当前位置", value: "附近可达", icon: Compass },
  { label: "当前时间", value: "刚好合适", icon: Clock3 },
  { label: "预算偏好", value: "避免超支", icon: WalletCards },
  { label: "情绪状态", value: "降低负担", icon: HeartPulse },
];

const flow = [
  {
    title: "刷到场景",
    description: "内容先承接兴趣，画面、标题和标签把用户带入当下。",
    icon: MessageSquareText,
  },
  {
    title: "提炼选择",
    description: "把散落的偏好、时间和上下文收束成少量可比较的选项。",
    icon: ReceiptText,
  },
  {
    title: "留在流里行动",
    description: "保存、刷新、展开都在当前页面完成，不把用户推向另一个工具。",
    icon: Sparkles,
  },
];

export default function Page() {
  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-phone focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
        href="#main-content"
      >
        跳到主内容
      </a>
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen overflow-hidden bg-[hsl(44_38%_97%)] text-slate-950 focus:outline-none"
      >
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Tonight Lab",
            description:
              "一个把「今晚到底做什么」包装成 AI 场景叙事的沉浸式信息流 demo。",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Web",
            inLanguage: "zh-CN",
            creator: { "@type": "Organization", name: "Tonight Lab" },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }}
        />
        <HeroSection />

        <section
          aria-labelledby="scenarios-heading"
          id="scenarios"
          className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.72fr_1fr] lg:px-8 lg:py-20"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-soft">
              <BrainCircuit className="h-3.5 w-3.5 text-slate-500" />
              用内容进入决策
            </div>
            <h2
              id="scenarios-heading"
              className="mt-4 text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl"
            >
              每一次刷到，都可以顺手完成一个小决定。
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
              用户不需要先打开一个工具，再解释自己想要什么。卡片从正在看的内容出发，直接给出下一步。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <article
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-phone"
                  key={scenario.title}
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-md border ${scenario.tone}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                      {scenario.detail}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">
                    {scenario.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {scenario.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="signals-heading"
          id="signals"
          className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
        >
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                <Compass className="h-3.5 w-3.5 text-sky-600" />
                更懂当下
              </div>
              <h2
                id="signals-heading"
                className="mt-4 text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl"
              >
                好的推荐不是更多内容，而是更少犹豫。
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
                卡片把用户此刻最可能在意的因素提前摆好：距离、时间、预算、状态。它不替用户做所有决定，只把选择变得更轻。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {signals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <article
                    className="flex items-center gap-4 rounded-lg border border-slate-200 bg-[hsl(44_38%_98%)] p-4 shadow-soft"
                    key={signal.label}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        {signal.label}
                      </p>
                      <p className="mt-1 text-base font-semibold text-slate-950">
                        {signal.value}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="flow-heading"
          id="flow"
          className="border-y border-slate-200/70 bg-[hsl(218_28%_96%)] px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-soft">
                <Layers3 className="h-3.5 w-3.5 text-slate-500" />
                留在信息流里完成
              </div>
              <h2
                id="flow-heading"
                className="mt-4 text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl"
              >
                从兴趣到行动，只需要一张卡片的距离。
              </h2>
            </div>

            <div className="mt-8 grid gap-3 lg:grid-cols-3">
              {flow.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft"
                    key={item.title}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-slate-300">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
