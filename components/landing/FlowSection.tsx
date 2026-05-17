"use client";

import { motion } from "framer-motion";
import {
  Layers3,
  MessageSquareText,
  ReceiptText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { editorialEase } from "@/lib/motion-presets";

type FlowStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const flow: ReadonlyArray<FlowStep> = [
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
    transition: { staggerChildren: 0.14, delayChildren: 0.16 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: editorialEase },
  },
};

export function FlowSection() {
  return (
    <motion.section
      aria-labelledby="flow-heading"
      id="flow"
      className="border-y border-slate-200/70 bg-[hsl(218_28%_96%)] px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div variants={headerVariants} className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-soft">
            <Layers3 className="h-3.5 w-3.5 text-slate-500" />
            留在信息流里完成
          </div>
          <h2
            id="flow-heading"
            className="mt-4 font-display text-3xl font-medium leading-[1.08] tracking-tight text-slate-950 sm:text-4xl lg:text-[44px]"
          >
            从兴趣到行动，只需要一张卡片的距离。
          </h2>
        </motion.div>

        <motion.div
          variants={gridVariants}
          className="mt-8 grid gap-3 lg:grid-cols-3"
        >
          {flow.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-shadow duration-300 hover:shadow-phone"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-sky-300 to-violet-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-3xl font-medium tabular-nums text-slate-300 transition-colors duration-300 group-hover:text-slate-400">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
