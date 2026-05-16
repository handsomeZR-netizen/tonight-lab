"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Trophy } from "lucide-react";
import { useMemo, useState } from "react";

import { SectionLabel } from "@/components/editorial";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type Mark = "X" | "O" | null;

type SportsTacticalBoardProps = {
  score: string;
  intensity: "low" | "high";
  chant: string;
  className?: string;
};

const SEEDED: Mark[] = [
  "X",
  null,
  "O",
  null,
  "X",
  null,
  null,
  "O",
  null,
];

const CHANT_POOL = [
  "稳住节奏",
  "压上去",
  "盯第二落点",
  "保持队形",
  "等空当",
  "再快一点",
  "用斜传",
  "看跑位",
];

export function SportsTacticalBoard({
  score,
  intensity,
  chant,
  className,
}: SportsTacticalBoardProps) {
  const reduce = useReducedMotion();
  const [marks, setMarks] = useState<Mark[]>(SEEDED);
  const [nextMark, setNextMark] = useState<"X" | "O">("X");
  const [scoreKey, setScoreKey] = useState(0);

  const xCount = marks.filter((m) => m === "X").length;
  const oCount = marks.filter((m) => m === "O").length;

  const danmu = useMemo(() => {
    if (intensity !== "high") return [];
    return Array.from({ length: 6 }, (_, idx) => ({
      id: `${scoreKey}-${idx}`,
      text:
        idx % 3 === 0
          ? chant
          : CHANT_POOL[(idx * 3 + scoreKey) % CHANT_POOL.length],
      delay: idx * 0.6,
      offset: 12 + idx * 14,
    }));
  }, [intensity, chant, scoreKey]);

  function handleCell(idx: number) {
    if (marks[idx]) return;
    setMarks((prev) => prev.map((value, i) => (i === idx ? nextMark : value)));
    setNextMark((current) => (current === "X" ? "O" : "X"));
    setScoreKey((k) => k + 1);
  }

  function reset() {
    setMarks(SEEDED);
    setNextMark("X");
    setScoreKey((k) => k + 1);
  }

  return (
    <section className={cn("space-y-8", className)}>
      <SectionLabel n={4} title="Signature · Tactical Board" tone="sports" />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-3xl text-slate-950 sm:text-4xl">
            画一笔，比分跟着跳一下。
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            在 3×3 战术格里点击空白格，X 与 O 会交替落下；右边的比分会跟着翻牌。{intensity === "high" ? "热血档位下还会下一阵弹幕雨。" : "切到热血档可以触发弹幕雨。"}
          </p>
        </div>
        <Button className="rounded-full" type="button" variant="outline" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          清空
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="relative overflow-hidden rounded-[32px] border border-emerald-100 bg-emerald-950 p-6 text-white shadow-phone">
          <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-200/70">
            Tactical Sheet
          </p>
          <p className="mt-2 font-display text-2xl italic">{chant}</p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {marks.map((mark, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleCell(idx)}
                className={cn(
                  "relative aspect-square rounded-2xl border border-emerald-700/40 bg-emerald-900/30 transition hover:border-lime-300/60 hover:bg-emerald-800/40",
                  mark && "cursor-default",
                )}
                aria-label={mark ? `格 ${idx + 1} 已落 ${mark}` : `格 ${idx + 1} 空`}
              >
                <AnimatePresence>
                  {mark && (
                    <motion.svg
                      key={mark}
                      viewBox="0 0 60 60"
                      className="absolute inset-0 m-auto h-3/5 w-3/5"
                      initial={{ pathLength: reduce ? 1 : 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {mark === "X" ? (
                        <>
                          <motion.path
                            d="M10 10 L50 50"
                            stroke="#a3e635"
                            strokeWidth={5}
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: reduce ? 1 : 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: reduce ? 0 : 0.32 }}
                          />
                          <motion.path
                            d="M50 10 L10 50"
                            stroke="#a3e635"
                            strokeWidth={5}
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: reduce ? 1 : 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.18, duration: reduce ? 0 : 0.32 }}
                          />
                        </>
                      ) : (
                        <motion.circle
                          cx={30}
                          cy={30}
                          r={20}
                          stroke="#facc15"
                          strokeWidth={5}
                          fill="none"
                          initial={{ pathLength: reduce ? 1 : 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: reduce ? 0 : 0.42 }}
                        />
                      )}
                    </motion.svg>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-emerald-200/72">
            <span>主队 X · {xCount}</span>
            <span>客队 O · {oCount}</span>
            <span>下一笔 · {nextMark}</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-emerald-100 bg-white p-6 shadow-phone">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <Trophy className="h-4 w-4" />
            预测比分
          </div>
          <div className="mt-6 flex items-center justify-center gap-6">
            <ScoreDigit value={score.split(":")[0]?.trim() ?? "0"} keyKey={scoreKey} />
            <span className="font-display text-6xl italic text-emerald-700">:</span>
            <ScoreDigit value={score.split(":")[1]?.trim() ?? "0"} keyKey={scoreKey + 1} />
          </div>
          <p className="mt-6 text-center text-sm leading-6 text-slate-600">
            每画一笔，比分会翻一次。比分不是结果，是你给今晚的态度。
          </p>

          {/* Danmu rain */}
          {intensity === "high" && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden"
            >
              {danmu.map((item) => (
                <motion.span
                  key={item.id}
                  initial={{ x: "120%", opacity: 0 }}
                  animate={{ x: "-120%", opacity: 1 }}
                  transition={{
                    duration: reduce ? 0 : 4.5,
                    delay: item.delay,
                    ease: "linear",
                  }}
                  style={{ top: `${item.offset}px` }}
                  className="absolute whitespace-nowrap rounded-full bg-emerald-900/80 px-3 py-1 text-xs font-semibold text-emerald-50"
                >
                  {item.text}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ScoreDigit({ value, keyKey }: { value: string; keyKey: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-28 w-20 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`${value}-${keyKey}`}
          initial={{ y: reduce ? 0 : "100%", opacity: reduce ? 1 : 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduce ? 0 : "-100%", opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center font-display text-[88px] font-semibold tabular-nums text-emerald-950"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
