import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { DetailTone } from "@/lib/detail-content";
import { toneTokens } from "@/lib/tone-tokens";

type PullQuoteProps = {
  children: ReactNode;
  attribution?: string;
  align?: "left" | "center";
  tone?: DetailTone;
  variant?: "light" | "dark";
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function PullQuote({
  children,
  attribution,
  align = "left",
  tone,
  variant = "light",
  className,
  imageSrc,
  imageAlt,
}: PullQuoteProps) {
  const isDark = variant === "dark";
  const tokens = tone ? toneTokens[tone] : null;

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[36px] border px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20",
        isDark
          ? "border-white/10 bg-slate-950 text-white"
          : "border-slate-200 bg-white/64 backdrop-blur",
        align === "center" && "text-center",
        imageSrc && "grid gap-8 lg:grid-cols-[1.4fr_1fr]",
        className,
      )}
    >
      <div className="relative">
        <span
          aria-hidden
          className={cn(
            "absolute -left-2 -top-8 font-display text-[120px] italic leading-none opacity-30 sm:-top-12 sm:text-[180px]",
            isDark
              ? "text-white"
              : tokens
                ? tokens.accentText
                : "text-slate-400",
          )}
        >
          “
        </span>
        <blockquote
          className={cn(
            "relative font-display italic text-3xl leading-[1.18] sm:text-4xl lg:text-5xl",
            isDark ? "text-white" : "text-slate-900",
          )}
        >
          {children}
        </blockquote>
        {attribution && (
          <figcaption
            className={cn(
              "mt-8 text-[11px] uppercase tracking-[0.22em]",
              isDark ? "text-white/64" : "text-slate-500",
            )}
          >
            — {attribution}
          </figcaption>
        )}
      </div>

      {imageSrc && (
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/12 bg-slate-950/4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt ?? ""}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0",
              isDark
                ? "bg-[linear-gradient(180deg,rgba(2,6,23,0)_40%,rgba(2,6,23,0.5)_100%)]"
                : "bg-[linear-gradient(180deg,rgba(255,255,255,0)_50%,rgba(255,255,255,0.4)_100%)]",
            )}
          />
        </div>
      )}
    </figure>
  );
}
