import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { DetailTone } from "@/lib/detail-content";
import { toneTokens } from "@/lib/tone-tokens";

import { AnimatedNumber } from "./AnimatedNumber";

type StatItem = {
  value: ReactNode | number;
  label: string;
  suffix?: string;
  countUp?: boolean;
  caption?: string;
};

type StatBlockProps = {
  items: StatItem[];
  tone?: DetailTone;
  size?: "md" | "lg";
  columns?: 2 | 3 | 4;
  className?: string;
};

const sizes = {
  md: "text-display-md",
  lg: "text-stat",
} as const;

const columnsMap = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 md:grid-cols-4",
} as const;

export function StatBlock({
  items,
  tone,
  size = "lg",
  columns = 4,
  className,
}: StatBlockProps) {
  const tokens = tone ? toneTokens[tone] : null;

  return (
    <dl
      className={cn(
        "grid gap-x-8 gap-y-10",
        columnsMap[columns],
        className,
      )}
    >
      {items.map((item, idx) => (
        <div
          key={`${item.label}-${idx}`}
          className="relative flex flex-col gap-3"
        >
          <dt
            className={cn(
              "font-display font-medium leading-[0.92] text-slate-950 font-tabular",
              sizes[size],
              tokens && tokens.ink,
            )}
          >
            {typeof item.value === "number" && item.countUp !== false ? (
              <AnimatedNumber value={item.value} />
            ) : (
              <span>{item.value}</span>
            )}
            {item.suffix && (
              <span className="ml-1 text-[0.42em] align-top text-slate-400 font-medium not-italic">
                {item.suffix}
              </span>
            )}
          </dt>
          <hr
            aria-hidden
            className="w-10 border-0 border-t border-slate-300/80"
          />
          <dd>
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-700">
              {item.label}
            </p>
            {item.caption && (
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.caption}
              </p>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
