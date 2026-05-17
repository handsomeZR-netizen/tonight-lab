"use client";

import { ArrowLeft, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

import { editorialEase, motionDurations } from "@/lib/motion-presets";
import type { DetailTone } from "@/lib/detail-content";
import { toneTokens } from "@/lib/tone-tokens";

const sceneLabel: Record<DetailTone, string> = {
  food: "今晚吃什么",
  trip: "3 小时城市逃逸",
  sports: "赛前 15 分钟",
  recovery: "下班回血",
};

const sceneKicker: Record<DetailTone, string> = {
  food: "Tonight Lab · Menu Field Log",
  trip: "Tonight Lab · Escape Field Log",
  sports: "Tonight Lab · Match Field Log",
  recovery: "Tonight Lab · Recovery Field Log",
};

const sceneTitle: Record<DetailTone, string> = {
  food: "这道菜还没端上来。",
  trip: "这段路线还没接上。",
  sports: "今晚的赛前还没就位。",
  recovery: "这一夜的回血没接住。",
};

type SceneErrorProps = {
  tone: DetailTone;
  error: Error & { digest?: string };
  reset: () => void;
};

export function SceneError({ tone, error, reset }: SceneErrorProps) {
  const tokens = toneTokens[tone];

  useEffect(() => {
    console.error(`[tonight-lab:${tone}]`, error);
  }, [error, tone]);

  return (
    <main
      className={`relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br ${tokens.glow}`}
    >
      <div className="absolute inset-0 bg-[hsl(44_38%_97%)]/55" />
      <motion.div
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 py-16 text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionDurations.base, ease: editorialEase }}
      >
        <p
          className={`font-sans text-[11px] font-medium uppercase tracking-[0.28em] ${tokens.accentText}`}
        >
          {sceneKicker[tone]}
        </p>
        <h1
          className={`mt-6 font-display text-display-md font-medium ${tokens.ink}`}
        >
          {sceneTitle[tone]}
        </h1>
        <p
          className={`mt-6 max-w-xl text-[15px] leading-[1.85] ${tokens.inkMuted}`}
        >
          编辑部正在把{sceneLabel[tone]}重新收一收。你可以再试一次，或者回到 Tonight
          Lab 的信息流，先翻翻今晚其他卡片。
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className={`inline-flex h-11 items-center justify-center gap-2 rounded-full border bg-white/85 px-5 text-sm font-semibold shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:bg-white ${tokens.accentBorder} ${tokens.ink}`}
          >
            <RotateCcw className="h-4 w-4" />
            重新加载
          </button>
          <Link
            href="/"
            className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white shadow-phone transition hover:-translate-y-0.5`}
            style={{ backgroundColor: tokens.sceneColors.deep }}
          >
            <ArrowLeft className="h-4 w-4" />
            回到 Tonight Lab
          </Link>
        </div>

        <p
          className={`mt-12 font-sans text-[11px] uppercase tracking-[0.28em] ${tokens.inkMuted}`}
        >
          {tokens.badge} · Issue interrupted
          {error.digest ? ` · ${error.digest.slice(0, 8)}` : ""}
        </p>
      </motion.div>
    </main>
  );
}
