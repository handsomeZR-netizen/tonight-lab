import { cn } from "@/lib/cn";
import type { DetailTone } from "@/lib/detail-content";
import { toneTokens } from "@/lib/tone-tokens";

type IssueRibbonProps = {
  tone: DetailTone;
  issue: string;
  section: string;
  lede: string;
  meta?: string;
  className?: string;
};

export function IssueRibbon({
  tone,
  issue,
  section,
  lede,
  meta,
  className,
}: IssueRibbonProps) {
  const tokens = toneTokens[tone];

  return (
    <aside
      className={cn(
        "grid items-center gap-4 border-y border-slate-300/60 py-5",
        "lg:grid-cols-[auto_1fr_auto] lg:gap-8",
        className,
      )}
    >
      <div className="flex items-baseline gap-3">
        <span
          className={cn(
            "font-display text-2xl italic font-medium tracking-[0.02em]",
            tokens.accentText,
          )}
        >
          {issue}
        </span>
        <span
          aria-hidden
          className="hidden h-4 w-px bg-slate-300 lg:inline-block"
        />
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700">
          {section}
        </span>
      </div>

      <p className="font-display italic text-lg leading-snug text-slate-800 lg:text-xl">
        “{lede}”
      </p>

      {meta && (
        <span className="self-start text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500 lg:self-center lg:text-right">
          {meta}
        </span>
      )}
    </aside>
  );
}
