"use client";

import { motion } from "framer-motion";
import {
  Clock3,
  Compass,
  HeartPulse,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

import { editorialEase } from "@/lib/motion-presets";

type Signal = {
  label: string;
  value: string;
  icon: LucideIcon;
  accent: string;
};

const signals: ReadonlyArray<Signal> = [
  {
    label: "当前位置",
    value: "附近可达",
    icon: Compass,
    accent: "text-sky-600 group-hover:text-sky-700",
  },
  {
    label: "当前时间",
    value: "刚好合适",
    icon: Clock3,
    accent: "text-amber-600 group-hover:text-amber-700",
  },
  {
    label: "预算偏好",
    value: "避免超支",
    icon: WalletCards,
    accent: "text-emerald-600 group-hover:text-emerald-700",
  },
  {
    label: "情绪状态",
    value: "降低负担",
    icon: HeartPulse,
    accent: "text-rose-600 group-hover:text-rose-700",
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
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: editorialEase },
  },
};

export function SignalsSection() {
  return (
    <motion.section
      aria-labelledby="signals-heading"
      id="signals"
      className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-start">
        <motion.div variants={headerVariants}>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
            <Compass className="h-3.5 w-3.5 text-sky-600" />
            更懂当下
          </div>
          <h2
            id="signals-heading"
            className="mt-4 font-display text-3xl font-medium leading-[1.08] tracking-tight text-slate-950 sm:text-4xl lg:text-[44px]"
          >
            好的推荐不是更多内容，而是更少犹豫。
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
            卡片把用户此刻最可能在意的因素提前摆好：距离、时间、预算、状态。它不替用户做所有决定，只把选择变得更轻。
          </p>
        </motion.div>

        <motion.div
          variants={gridVariants}
          className="grid gap-3 sm:grid-cols-2"
        >
          {signals.map((signal) => {
            const Icon = signal.icon;
            return (
              <motion.article
                key={signal.label}
                variants={itemVariants}
                whileHover={{ x: 4, transition: { duration: 0.25 } }}
                className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-[hsl(44_38%_98%)] p-4 shadow-soft transition-shadow duration-300 hover:shadow-phone"
              >
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                  <Icon className={`h-5 w-5 transition-colors duration-300 ${signal.accent}`} />
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    {signal.label}
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-950">
                    {signal.value}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
