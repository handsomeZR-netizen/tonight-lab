"use client";

import { motion } from "framer-motion";

import type { DetailTone } from "@/lib/detail-content";
import { editorialEase } from "@/lib/motion-presets";
import { cn } from "@/lib/cn";
import { toneLabel, toneOrder } from "@/lib/tone-css-vars";
import { toneTokens } from "@/lib/tone-tokens";

type ToneSwitcherProps = {
  value: DetailTone;
  onChange: (tone: DetailTone) => void;
  className?: string;
};

export function ToneSwitcher({ value, onChange, className }: ToneSwitcherProps) {
  return (
    <div
      role="radiogroup"
      aria-label="选择卡片色调"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/82 p-1 shadow-soft backdrop-blur",
        className,
      )}
    >
      {toneOrder.map((tone) => {
        const active = tone === value;
        const tokens = toneTokens[tone];
        const label = toneLabel[tone];
        return (
          <button
            key={tone}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`切换到 ${label} 色调`}
            onClick={() => {
              if (!active) onChange(tone);
            }}
            className={cn(
              "relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 focus-visible:ring-offset-1",
              active ? "text-slate-950" : "text-slate-500 hover:text-slate-800",
            )}
          >
            {active ? (
              <motion.span
                layoutId="tone-switcher-active"
                aria-hidden
                className="absolute inset-0 rounded-full bg-white shadow-soft ring-1 ring-slate-200"
                transition={{
                  type: "tween",
                  duration: 0.32,
                  ease: editorialEase,
                }}
              />
            ) : null}
            <span
              aria-hidden
              className={cn(
                "relative z-10 inline-block h-2.5 w-2.5 rounded-full transition-transform",
                active ? "scale-110" : "scale-100",
              )}
              style={{
                backgroundColor: tokens.ringHex,
                boxShadow: active
                  ? `0 0 0 2px ${tokens.ringHex}33`
                  : undefined,
              }}
            />
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
