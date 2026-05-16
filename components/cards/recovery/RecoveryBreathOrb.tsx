"use client";

import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SectionLabel } from "@/components/editorial";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type Phase = "inhale" | "hold" | "exhale";

const SEG = 4; // seconds per phase
const CYCLE_SECONDS = SEG * 3;
const MAX_CYCLES = 5;

const PHASE_COPY: Record<Phase, { label: string; hint: string }> = {
  inhale: { label: "轻轻吸气", hint: "用鼻子吸 4 秒，肩膀不抬起来" },
  hold: { label: "停 4 秒", hint: "屏住 4 秒，意识落到胸口" },
  exhale: { label: "缓慢呼出", hint: "用嘴慢慢呼 4 秒，把肩膀松下来" },
};

type RecoveryBreathOrbProps = {
  className?: string;
};

export function RecoveryBreathOrb({ className }: RecoveryBreathOrbProps) {
  const reduce = useReducedMotion();
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [cycles, setCycles] = useState(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseRef = useRef<Phase>("inhale");

  useEffect(() => {
    if (!running) return;
    if (cycles >= MAX_CYCLES) {
      setRunning(false);
      return;
    }
    tickRef.current = setInterval(() => {
      setElapsed((prev) => prev + 0.1);
    }, 100);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [running, cycles]);

  useEffect(() => {
    const completed = Math.floor(elapsed / CYCLE_SECONDS);
    if (completed > cycles) {
      setCycles(Math.min(completed, MAX_CYCLES));
      if (typeof document !== "undefined") {
        document.body.style.setProperty(
          "--recovery-glow",
          `${Math.min(completed, MAX_CYCLES) * 0.012}`,
        );
      }
    }
  }, [elapsed, cycles]);

  const intoCycle = elapsed % CYCLE_SECONDS;
  let phase: Phase = "inhale";
  let progress = 0;
  if (intoCycle < SEG) {
    phase = "inhale";
    progress = intoCycle / SEG;
  } else if (intoCycle < SEG * 2) {
    phase = "hold";
    progress = 1;
  } else {
    phase = "exhale";
    progress = 1 - (intoCycle - SEG * 2) / SEG;
  }
  phaseRef.current = phase;

  const scale = 0.62 + progress * 0.36;
  const completedAll = cycles >= MAX_CYCLES;

  function toggle() {
    if (completedAll) {
      setElapsed(0);
      setCycles(0);
      setRunning(true);
      if (typeof document !== "undefined") {
        document.body.style.removeProperty("--recovery-glow");
      }
      return;
    }
    setRunning((r) => !r);
  }

  const circumference = 2 * Math.PI * 124;
  const dashOffset = circumference * (1 - intoCycle / CYCLE_SECONDS);

  return (
    <section className={cn("space-y-8", className)}>
      <SectionLabel n={5} title="Signature · Breathing Orb" tone="recovery" />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-3xl text-slate-950 sm:text-4xl">
            和今晚一起慢下来。
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            4-4-4 节奏 · 吸 4 秒、停 4 秒、呼 4 秒。完成 5 个循环，页面会更亮一点，「回到信息流」也会变成中央按钮。
          </p>
        </div>
        <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-700">
          循环 {cycles}/{MAX_CYCLES}
        </span>
      </div>

      <div className="relative grid place-items-center overflow-hidden rounded-[36px] border border-violet-100 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.16),transparent_55%),#faf6ff] py-16">
        <div className="relative flex h-[280px] w-[280px] items-center justify-center">
          <svg
            viewBox="0 0 280 280"
            className="absolute inset-0 -rotate-90"
            aria-hidden
          >
            <circle
              cx="140"
              cy="140"
              r="124"
              stroke="rgba(139,92,246,0.18)"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="140"
              cy="140"
              r="124"
              stroke="#8b5cf6"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={running ? dashOffset : circumference}
              style={{ transition: reduce ? "none" : "stroke-dashoffset 0.12s linear" }}
            />
          </svg>

          <motion.div
            animate={{ scale: reduce ? 1 : scale }}
            transition={{ ease: [0.45, 0, 0.55, 1], duration: 0.6 }}
            className="grid h-44 w-44 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#fde68a,#a78bfa_55%,#4c1d95_100%)] text-white shadow-phone"
          >
            <button
              type="button"
              onClick={toggle}
              className="grid h-16 w-16 place-items-center rounded-full bg-white/14 backdrop-blur transition hover:bg-white/26"
              aria-label={running ? "暂停" : "开始"}
            >
              {running && !completedAll ? (
                <Pause className="h-7 w-7" />
              ) : (
                <Play className="h-7 w-7 fill-current" />
              )}
            </button>
          </motion.div>
        </div>

        <div className="mt-10 text-center">
          <p className="font-display text-3xl italic text-slate-950">
            {completedAll ? "今晚可以离线了。" : PHASE_COPY[phase].label}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {completedAll ? "5 个循环已经够了。把屏幕关小一点。" : PHASE_COPY[phase].hint}
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-violet-700">
          {Array.from({ length: MAX_CYCLES }, (_, idx) => (
            <span
              key={idx}
              className={cn(
                "h-1.5 w-8 rounded-full transition",
                idx < cycles ? "bg-violet-500" : "bg-violet-200",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
