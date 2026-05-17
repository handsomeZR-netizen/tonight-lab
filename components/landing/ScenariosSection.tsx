"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  Map,
  Moon,
  Trophy,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { editorialEase } from "@/lib/motion-presets";

type Scenario = {
  title: string;
  description: string;
  icon: LucideIcon;
  detail: string;
  href: string;
  cover: string;
  alt: string;
  toneBadge: string;
  toneRing: string;
  toneOverlay: string;
  tagline: string;
};

const scenarios: ReadonlyArray<Scenario> = [
  {
    title: "今晚吃什么",
    description:
      "结合预算、口味和时间，把「随便吃点」变成三种刚好合适的选择。",
    icon: Utensils,
    detail: "晚餐 · 外卖 · 独处",
    href: "/cards/food",
    cover: "/images/generated/card-food-amber-hero.png",
    alt: "暖色厨房与一份正在准备的晚餐",
    toneBadge: "border-amber-200/80 bg-amber-50 text-amber-800",
    toneRing: "group-hover:ring-amber-300/70",
    toneOverlay:
      "bg-[linear-gradient(180deg,rgba(15,15,15,0)_36%,rgba(120,53,15,0.32)_72%,rgba(31,19,5,0.68)_100%)]",
    tagline: "Issue 01 · MENU LAB",
  },
  {
    title: "3 小时城市逃逸",
    description: "把刷到的街角、河边和咖啡店，整理成不赶场的短路线。",
    icon: Map,
    detail: "周末 · 散步 · 拍照",
    href: "/cards/trip",
    cover: "/images/generated/card-trip-sky-hero.png",
    alt: "傍晚城市街景里的散步路线",
    toneBadge: "border-sky-200/80 bg-sky-50 text-sky-800",
    toneRing: "group-hover:ring-sky-300/70",
    toneOverlay:
      "bg-[linear-gradient(180deg,rgba(15,15,15,0)_36%,rgba(12,74,110,0.32)_72%,rgba(12,28,46,0.68)_100%)]",
    tagline: "Issue 02 · CITY FIELD GUIDE",
  },
  {
    title: "赛前 15 分钟",
    description: "用轻量看点解释今晚该看哪条边路、哪次对位和哪种节奏。",
    icon: Trophy,
    detail: "足球 · 对位 · 预测",
    href: "/cards/sports",
    cover: "/images/generated/card-sports-emerald-hero.png",
    alt: "夜场草坪与赛前球员剪影",
    toneBadge: "border-emerald-200/80 bg-emerald-50 text-emerald-800",
    toneRing: "group-hover:ring-emerald-300/70",
    toneOverlay:
      "bg-[linear-gradient(180deg,rgba(15,15,15,0)_36%,rgba(6,78,59,0.32)_72%,rgba(10,31,21,0.68)_100%)]",
    tagline: "Issue 03 · MATCH ROOM",
  },
  {
    title: "下班回血",
    description: "识别疲惫和过载，给出不说教、能完成的短恢复方案。",
    icon: Moon,
    detail: "夜晚 · 放松 · 低刺激",
    href: "/cards/recovery",
    cover: "/images/generated/card-recovery-violet-hero.png",
    alt: "夜色台灯与柔光球的恢复氛围",
    toneBadge: "border-violet-200/80 bg-violet-50 text-violet-800",
    toneRing: "group-hover:ring-violet-300/70",
    toneOverlay:
      "bg-[linear-gradient(180deg,rgba(15,15,15,0)_36%,rgba(76,29,149,0.32)_72%,rgba(26,15,46,0.68)_100%)]",
    tagline: "Issue 04 · AFTER HOURS",
  },
];

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: editorialEase },
  },
};

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: editorialEase },
  },
};

export function ScenariosSection() {
  return (
    <motion.section
      aria-labelledby="scenarios-heading"
      id="scenarios"
      className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.7fr_1fr] lg:px-8 lg:py-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      <motion.div variants={headerVariants}>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-soft">
          <BrainCircuit className="h-3.5 w-3.5 text-slate-500" />
          用内容进入决策
        </div>
        <h2
          id="scenarios-heading"
          className="mt-4 font-display text-3xl font-medium leading-[1.08] tracking-tight text-slate-950 sm:text-4xl lg:text-[44px]"
        >
          每一次刷到，都可以顺手完成一个小决定。
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
          用户不需要先打开一个工具，再解释自己想要什么。卡片从正在看的内容出发，直接给出下一步——画面是真实的，路径也是真实的。
        </p>
        <p className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="inline-block h-1 w-6 rounded-full bg-slate-300" />
          鼠标移到卡片上，看看每一期的封面、Issue 编号和入口
        </p>
      </motion.div>

      <motion.div
        variants={gridVariants}
        className="grid gap-4 sm:grid-cols-2"
      >
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          return (
            <motion.article
              key={scenario.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative isolate overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft ring-1 ring-transparent transition-[box-shadow,border-color,ring-color] duration-300 hover:border-slate-300 hover:shadow-phone"
            >
              <Link
                aria-label={`${scenario.title} — 进入完整玩法`}
                className="flex h-full flex-col"
                href={scenario.href}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    alt={scenario.alt}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    src={scenario.cover}
                  />
                  <div
                    aria-hidden
                    className={`absolute inset-0 ${scenario.toneOverlay}`}
                  />
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-white/95 backdrop-blur ${scenario.toneBadge}`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                  </div>
                  <span className="absolute right-3 top-3 rounded-full border border-white/30 bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
                    {scenario.tagline}
                  </span>
                  <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3">
                    <span className="text-[11px] font-medium text-white/82">
                      {scenario.detail}
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-900 shadow-phone transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-xl font-medium tracking-tight text-slate-950 transition-colors group-hover:text-slate-800">
                    {scenario.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                    {scenario.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 transition-colors group-hover:text-slate-950">
                    打开这期
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
