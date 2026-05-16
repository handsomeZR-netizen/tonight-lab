import { cn } from "@/lib/cn";
import type { DetailTone } from "@/lib/detail-content";

import { NumberMarker } from "./NumberMarker";

type SectionLabelProps = {
  n: number | string;
  title: string;
  align?: "left" | "center";
  tone?: DetailTone;
  className?: string;
};

export function SectionLabel({
  n,
  title,
  align = "left",
  tone,
  className,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        align === "center" && "justify-center",
        className,
      )}
    >
      <NumberMarker n={n} tone={tone} size="md" />
      <span className="text-xs uppercase tracking-[0.22em] font-medium text-slate-700">
        {title}
      </span>
      <div
        aria-hidden
        className={cn(
          "h-px bg-slate-300/80",
          align === "center" ? "flex-1 max-w-[120px]" : "flex-1 max-w-[200px]",
        )}
      />
    </div>
  );
}
