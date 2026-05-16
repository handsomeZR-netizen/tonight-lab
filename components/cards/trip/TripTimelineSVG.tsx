"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useId, useMemo } from "react";

import { SectionLabel } from "@/components/editorial";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

export type TripStop = {
  time: string;
  title: string;
  description: string;
  tags: string[];
};

type TripTimelineSVGProps = {
  stops: TripStop[];
  vibe: "sunset" | "neon";
  lessWalk: boolean;
  photoFirst: boolean;
  className?: string;
};

const VIBE_COLORS: Record<"sunset" | "neon", { from: string; to: string }> = {
  sunset: { from: "#fbcfe8", to: "#38bdf8" },
  neon: { from: "#a78bfa", to: "#22d3ee" },
};

export function TripTimelineSVG({
  stops,
  vibe,
  lessWalk,
  photoFirst,
  className,
}: TripTimelineSVGProps) {
  const reduce = useReducedMotion();
  const gradientId = useId();

  const width = 760;
  const height = 110 + stops.length * 110;

  // Generate path control points so the line waves vertically along stops
  const pointsAndPath = useMemo(() => {
    const xs = stops.map((_, idx) => {
      if (idx === 0) return 130;
      if (idx === stops.length - 1) return width - 130;
      const sway = lessWalk ? 60 : 130;
      const wave = idx % 2 === 0 ? -sway : sway;
      return width / 2 + wave;
    });
    const ys = stops.map((_, idx) => 70 + idx * 110);
    let path = `M ${xs[0]} ${ys[0]}`;
    for (let i = 1; i < stops.length; i += 1) {
      const xPrev = xs[i - 1];
      const yPrev = ys[i - 1];
      const xCur = xs[i];
      const yCur = ys[i];
      const midY = (yPrev + yCur) / 2;
      path += ` C ${xPrev} ${midY}, ${xCur} ${midY}, ${xCur} ${yCur}`;
    }
    return { xs, ys, path };
  }, [stops, lessWalk]);

  const colors = VIBE_COLORS[vibe];

  return (
    <section className={cn("space-y-8", className)}>
      <SectionLabel n={4} title="Signature · Hand-drawn Route" tone="trip" />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-3xl text-slate-950 sm:text-4xl">
            把今晚的路线画一遍给自己看。
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            每次切换偏好，路线会重新慢慢画出来。{photoFirst ? "出片优先时，会高亮主机位。" : "保留一点缓速节奏。"}
          </p>
        </div>
        <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
          {vibe === "sunset" ? "黄昏光" : "霓虹感"} · {lessWalk ? "少走路" : "标准距离"}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-[36px] border border-sky-100 bg-white/86 p-6 shadow-phone backdrop-blur sm:p-8">
        <svg
          aria-hidden
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.from} />
              <stop offset="100%" stopColor={colors.to} />
            </linearGradient>
          </defs>

          {/* base ghost path */}
          <path
            d={pointsAndPath.path}
            stroke="#cbd5f5"
            strokeWidth={1.5}
            strokeDasharray="2 6"
            fill="none"
            opacity={0.5}
          />

          {/* animated route path */}
          <motion.path
            d={pointsAndPath.path}
            stroke={`url(#${gradientId})`}
            strokeWidth={photoFirst ? 4 : 3}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            key={`${vibe}-${lessWalk}-${photoFirst}-${stops.length}`}
            transition={{
              duration: reduce ? 0 : 1.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* stop nodes */}
          {stops.map((stop, idx) => {
            const cx = pointsAndPath.xs[idx];
            const cy = pointsAndPath.ys[idx];
            const featured = photoFirst && idx === Math.min(1, stops.length - 1);
            return (
              <g key={`${stop.time}-${idx}`}>
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={featured ? 16 : 10}
                  fill={featured ? colors.to : "#fff"}
                  stroke={colors.to}
                  strokeWidth={featured ? 3 : 2}
                  initial={{ scale: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: reduce ? 0 : 0.4 + idx * 0.25,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <motion.text
                  x={cx + (idx % 2 === 0 ? 26 : -26)}
                  y={cy + 6}
                  textAnchor={idx % 2 === 0 ? "start" : "end"}
                  className="font-display"
                  style={{ fontStyle: "italic" }}
                  fontSize="18"
                  fill="#0f172a"
                  initial={{ opacity: reduce ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: reduce ? 0 : 0.6 + idx * 0.25,
                    duration: 0.4,
                  }}
                >
                  {stop.time}
                </motion.text>
                <motion.text
                  x={cx + (idx % 2 === 0 ? 26 : -26)}
                  y={cy + 28}
                  textAnchor={idx % 2 === 0 ? "start" : "end"}
                  fontSize="13"
                  fill="#475569"
                  initial={{ opacity: reduce ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: reduce ? 0 : 0.7 + idx * 0.25,
                    duration: 0.4,
                  }}
                >
                  {stop.title}
                </motion.text>
              </g>
            );
          })}

          {/* end badge */}
          <motion.g
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduce ? 0 : 0.6 + stops.length * 0.25,
              duration: 0.5,
            }}
          >
            <rect
              x={pointsAndPath.xs[stops.length - 1] - 70}
              y={pointsAndPath.ys[stops.length - 1] + 24}
              width={140}
              height={26}
              rx={13}
              fill="#0f172a"
            />
            <text
              x={pointsAndPath.xs[stops.length - 1]}
              y={pointsAndPath.ys[stops.length - 1] + 42}
              textAnchor="middle"
              fontSize="11"
              letterSpacing="0.18em"
              fill="#ffffff"
              fontWeight={600}
            >
              完成今晚的小逃离
            </text>
          </motion.g>
        </svg>

        <p className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
          <Sparkles className="h-3.5 w-3.5 text-sky-500" />
          每次切换偏好，路线会重新慢慢画出来。
        </p>
      </div>
    </section>
  );
}
