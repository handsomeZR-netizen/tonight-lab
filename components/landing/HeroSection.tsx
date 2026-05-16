"use client";

import {
  ArrowDown,
  BellRing,
  BrainCircuit,
  Layers3,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

import type { DetailTone } from "@/lib/detail-content";
import { getToneCssVars } from "@/lib/tone-css-vars";

import { HeroPhonePreview } from "./HeroPhonePreview";
import { ToneSwitcher } from "./ToneSwitcher";

type HeroProductPoint = {
  label: string;
  value: string;
  icon: LucideIcon;
};

const productPoints: ReadonlyArray<HeroProductPoint> = [
  { label: "不打断浏览", value: "原地给下一步", icon: Layers3 },
  { label: "不堆满答案", value: "只留可比较选项", icon: BrainCircuit },
  { label: "不止是推荐", value: "能调整，也能保存", icon: BellRing },
];

export function HeroSection() {
  const [tone, setTone] = useState<DetailTone>("food");

  return (
    <section
      className="relative border-b border-slate-200/70 px-4 pb-12 pt-5 sm:px-6 lg:px-8"
      style={{
        ...getToneCssVars(tone),
        transition:
          "background 600ms ease, --tone-primary 600ms ease, --tone-secondary 600ms ease, --tone-deep 600ms ease, --tone-ring 600ms ease",
      }}
    >
      <Image
        alt="手机信息流中出现 AI 情境卡片的产品展示背景"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.34]"
        fill
        priority
        sizes="100vw"
        src="/images/generated/landing-hero-cover.png"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.82)_48%,rgba(255,255,255,0.72)_100%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 14%, color-mix(in oklch, var(--tone-primary) 18%, transparent), transparent 50%), radial-gradient(circle at 88% 8%, color-mix(in oklch, var(--tone-secondary) 14%, transparent), transparent 46%)",
          transition: "background 600ms ease",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[hsl(44_38%_97%)] to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[88svh] max-w-6xl items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(390px,0.72fr)] lg:gap-12">
        <div className="max-w-2xl pb-2 pt-8 lg:pt-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/82 px-3 py-1 text-xs font-medium text-slate-700 shadow-soft backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              AI 情境卡 · 信息流里的轻决策层
            </div>
            <ToneSwitcher value={tone} onChange={setTone} />
          </div>
          <h1 className="mt-6 max-w-[680px] font-serif font-medium text-[44px] leading-[1.08] tracking-[-0.01em] text-slate-950 sm:text-[58px] lg:text-[72px]">
            AI 情境卡，
            <br className="hidden sm:inline" />
            把下一步放回信息流。
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-slate-600 sm:text-base">
            用户刷到美食、路线、比赛或放松内容时，不用跳去另一个工具。卡片直接整理选项、解释原因，并把调整和保存留在当前页面。
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              className="inline-flex h-11 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white shadow-phone transition hover:bg-slate-800"
              href="#experience"
            >
              进入手机预览
            </a>
            <a
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/82 px-5 text-sm font-semibold text-slate-800 shadow-soft backdrop-blur transition hover:border-slate-400 hover:bg-white"
              href="#scenarios"
            >
              看四个场景
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid max-w-xl gap-2 sm:grid-cols-3">
            {productPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  className="rounded-lg border border-slate-200 bg-white/78 px-3 py-3 shadow-soft backdrop-blur"
                  key={point.label}
                >
                  <Icon className="mb-3 h-4 w-4 text-slate-500" />
                  <p className="text-xs text-slate-500">{point.label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-950">
                    {point.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <HeroPhonePreview tone={tone} />
      </div>
    </section>
  );
}
