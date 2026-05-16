"use client";

import { motion } from "framer-motion";
import { Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";

import { SectionLabel } from "@/components/editorial";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

export type FoodMenuOption = {
  name: string;
  price: string;
  fit: string;
};

type FoodMenuFlipProps = {
  options: FoodMenuOption[];
  onPick?: (index: number) => void;
  className?: string;
};

export function FoodMenuFlip({ options, onPick, className }: FoodMenuFlipProps) {
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    options.map(() => false),
  );

  const allRevealed = revealed.every(Boolean);

  function toggle(idx: number) {
    setRevealed((prev) => prev.map((value, i) => (i === idx ? !value : value)));
  }

  function reset() {
    setRevealed(options.map(() => false));
  }

  return (
    <section className={cn("space-y-8", className)}>
      <SectionLabel n={5} title="Signature · Decision Cards" tone="food" />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-3xl text-slate-950 sm:text-4xl">
            把今晚的选择翻给自己看。
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            三张菜单板默认朝下。每翻开一张，背面会露出今晚真正能下单的方案。全部翻开后，可以把这一组直接钉到结果卡顶部。
          </p>
        </div>
        <Button
          className="rounded-full"
          type="button"
          variant="outline"
          onClick={reset}
        >
          <Wand2 className="h-4 w-4" />
          再洗一次
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {options.map((option, idx) => {
          const isRevealed = revealed[idx];
          return (
            <div
              key={`${option.name}-${idx}`}
              className="relative h-72 [perspective:1200px]"
            >
              <motion.button
                type="button"
                aria-pressed={isRevealed}
                onClick={() => toggle(idx)}
                animate={{ rotateY: isRevealed ? 180 : 0 }}
                transition={{
                  duration: reduce ? 0 : 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative h-full w-full cursor-pointer rounded-[28px] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70"
              >
                {/* Back */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-between rounded-[28px] border border-amber-200/80 bg-[linear-gradient(155deg,#fcd34d_0%,#fbbf24_55%,#b45309_100%)] p-6 text-white shadow-phone"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="text-[10px] uppercase tracking-[0.28em] text-white/80">
                    Menu Card · {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="text-center">
                    <p className="font-display text-7xl italic">?</p>
                    <p className="mt-3 text-sm text-white/82">
                      点一下翻开，再决定一次。
                    </p>
                  </div>
                  <Sparkles className="h-5 w-5 text-white/72" />
                </div>

                {/* Front */}
                <div
                  className="absolute inset-0 flex flex-col justify-between rounded-[28px] border border-amber-200 bg-white p-6 shadow-phone"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-700">
                      Pick {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-amber-950 px-3 py-1 text-xs font-semibold tabular-nums text-white">
                      {option.price}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl text-slate-950">
                      {option.name}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {option.fit}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onPick?.(idx);
                    }}
                    className="inline-flex items-center justify-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 transition hover:bg-amber-100"
                  >
                    钉到结果卡
                  </button>
                </div>
              </motion.button>
            </div>
          );
        })}
      </div>

      {allRevealed && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-full border border-amber-200 bg-amber-50/86 px-6 py-3 text-center text-sm font-medium text-amber-900"
        >
          ✦ 三张菜单都翻开了。这就是今晚的真菜单 — 把它钉到结果卡顶部，少纠结一点。
        </motion.p>
      )}
    </section>
  );
}
