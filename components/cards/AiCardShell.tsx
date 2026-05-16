"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, BookmarkCheck, ChevronDown, X } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

import { CardFeedbackBar } from "@/components/card-parts/CardFeedbackBar";
import { ExpandablePanel } from "@/components/card-parts/ExpandablePanel";
import { SceneBadge } from "@/components/card-parts/SceneBadge";

export type CardTone = "food" | "trip" | "sports" | "recovery";

export type ChipOption = {
  id: string;
  label: string;
  value?: string;
  description?: string;
};

export type FeedbackValue = "accurate" | "inaccurate";

export type AiFeedCardBase = {
  id: string;
  cardType?: string;
  scene?: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  reason?: string | string[];
  chips?: ChipOption[];
  selectedChip?: string;
  loadingChip?: string;
  isSaved?: boolean;
  dismissed?: boolean;
  expanded?: boolean;
  feedback?: FeedbackValue;
  details?: string[] | Record<string, string>;
  [key: string]: unknown;
};

type AiCardShellProps<TItem extends AiFeedCardBase> = {
  item: TItem;
  onUpdate: (updatedItem: TItem) => void;
  tone: CardTone;
  icon: ReactNode;
  children: ReactNode;
  details?: ReactNode;
  className?: string;
};

const toneStyles: Record<CardTone, string> = {
  food: "border-orange-200/20 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.34),transparent_38%),linear-gradient(145deg,#3f180d,#111016_72%)] text-orange-50 shadow-orange-950/35",
  trip: "border-fuchsia-200/20 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.24),transparent_34%),linear-gradient(145deg,#17153a,#11121d_64%,#241328)] text-slate-50 shadow-cyan-950/30",
  sports:
    "border-cyan-200/20 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.28),transparent_36%),linear-gradient(145deg,#061322,#141029_68%,#081017)] text-cyan-50 shadow-cyan-950/40",
  recovery:
    "border-slate-200/15 bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.18),transparent_34%),linear-gradient(145deg,#090b10,#151923_66%,#08090d)] text-slate-100 shadow-black/35",
};

function patchItem<TItem extends AiFeedCardBase>(
  item: TItem,
  patch: Partial<AiFeedCardBase>,
) {
  return { ...item, ...patch } as TItem;
}

export function AiCardShell<TItem extends AiFeedCardBase>({
  item,
  onUpdate,
  tone,
  icon,
  children,
  details,
  className,
}: AiCardShellProps<TItem>) {
  const isSaved = item.isSaved === true;
  const isExpanded = item.expanded === true;
  const isDismissed = item.dismissed === true;

  const handleSave = () => {
    const nextSaved = !isSaved;
    onUpdate(patchItem(item, { isSaved: nextSaved }));
    toast(nextSaved ? "已保存到灵感夹" : "已取消保存");
  };

  return (
    <motion.article
      layout
      className={cn(
        "relative isolate overflow-hidden rounded-lg border p-4 shadow-2xl",
        toneStyles[tone],
        className,
      )}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(255,255,255,0.12),transparent_28%,transparent_72%,rgba(255,255,255,0.08))]" />
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <SceneBadge tone={tone} label={item.scene ?? item.eyebrow ?? "AI卡片"} />
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/10 text-white/90">
              {icon}
            </span>
          </div>
          <h2 className="text-balance text-2xl font-semibold leading-tight">
            {item.title ?? "今日推荐"}
          </h2>
          {item.subtitle ? (
            <p className="mt-2 text-sm leading-6 text-white/102">{item.subtitle}</p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            aria-label={isSaved ? "取消保存" : "保存"}
            className="h-9 w-9 rounded-md border-white/10 bg-white/10 p-0 text-white hover:bg-white/20"
            type="button"
            variant="ghost"
            onClick={handleSave}
          >
            {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </Button>
          <Button
            aria-label="减少类似卡片"
            className="h-9 w-9 rounded-md border-white/10 bg-white/10 p-0 text-white hover:bg-white/20"
            type="button"
            variant="ghost"
            onClick={() => onUpdate(patchItem(item, { dismissed: true }))}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="mt-5">{children}</div>

      {details ? (
        <div className="mt-4">
          <Button
            className="h-9 rounded-md border-white/10 bg-white/10 px-3 text-xs text-white/108 hover:bg-white/15"
            type="button"
            variant="ghost"
            onClick={() => onUpdate(patchItem(item, { expanded: !isExpanded }))}
          >
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")}
            />
            {isExpanded ? "收起推理" : "展开推理"}
          </Button>
          <ExpandablePanel open={isExpanded}>{details}</ExpandablePanel>
        </div>
      ) : null}

      <CardFeedbackBar
        value={item.feedback}
        onChange={(feedback) => onUpdate(patchItem(item, { feedback }))}
      />

      <AnimatePresence>
        {isDismissed ? (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/102 p-6 text-center backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-lg border border-white/15 bg-white/10 px-5 py-4 text-sm text-white"
              initial={{ y: 12, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
            >
              已减少类似卡片
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
