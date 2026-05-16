import { cn } from "@/lib/cn";
import type { DetailTone } from "@/lib/detail-content";
import { toneTokens } from "@/lib/tone-tokens";

type NumberMarkerProps = {
  n: number | string;
  tone?: DetailTone;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
} as const;

export function NumberMarker({ n, tone, size = "md", className }: NumberMarkerProps) {
  const formatted =
    typeof n === "number" ? `№ ${String(n).padStart(2, "0")}` : `№ ${n}`;

  return (
    <span
      className={cn(
        "font-display italic font-medium tracking-[0.04em] text-slate-500",
        sizes[size],
        tone && toneTokens[tone].inkMuted,
        className,
      )}
    >
      {formatted}
    </span>
  );
}
