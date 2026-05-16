"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { toast } from "sonner";

import { CardFeedbackBar } from "@/components/card-parts/CardFeedbackBar";
import { ExpandablePanel } from "@/components/card-parts/ExpandablePanel";
import { SceneBadge } from "@/components/card-parts/SceneBadge";
import { Button } from "@/components/ui/button";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { cn } from "@/lib/cn";
import type { AiCardBase } from "@/lib/types";

export type AiCardTone = "food" | "trip" | "sports" | "recovery";

export const SAVED_CARDS_STORAGE_KEY = "tonightlab:saved-cards:v1";

type AiCardShellProps<TItem extends AiCardBase> = {
  item: TItem;
  tone: AiCardTone;
  icon: ReactNode;
  children: ReactNode;
  expandedContent: ReactNode;
  detailHref?: string;
  detailLabel?: string;
  onUpdate: (updatedItem: TItem) => void;
};

const toneSurface: Record<AiCardTone, string> = {
  food: "border-amber-200/80 shadow-[0_28px_70px_-28px_rgba(180,83,9,0.42)]",
  trip: "border-sky-200/80 shadow-[0_28px_70px_-28px_rgba(2,132,199,0.38)]",
  sports: "border-emerald-200/80 shadow-[0_28px_70px_-28px_rgba(5,150,105,0.36)]",
  recovery: "border-violet-200/80 shadow-[0_28px_70px_-28px_rgba(124,58,237,0.36)]",
};

const toneIconBg: Record<AiCardTone, string> = {
  food: "bg-amber-100/95 text-amber-900 border-amber-200",
  trip: "bg-sky-100/95 text-sky-900 border-sky-200",
  sports: "bg-emerald-100/95 text-emerald-900 border-emerald-200",
  recovery: "bg-violet-100/95 text-violet-900 border-violet-200",
};

const toneSection: Record<AiCardTone, string> = {
  food: "bg-[radial-gradient(circle_at_50%_8%,rgba(251,191,36,0.16),transparent_34%),hsl(36_34%_97%)]",
  trip: "bg-[radial-gradient(circle_at_50%_8%,rgba(56,189,248,0.15),transparent_34%),hsl(204_28%_97%)]",
  sports: "bg-[radial-gradient(circle_at_50%_8%,rgba(16,185,129,0.15),transparent_34%),hsl(150_20%_97%)]",
  recovery: "bg-[radial-gradient(circle_at_50%_8%,rgba(139,92,246,0.16),transparent_34%),hsl(258_26%_97%)]",
};

const toneAccent: Record<AiCardTone, string> = {
  food: "bg-amber-400",
  trip: "bg-sky-400",
  sports: "bg-emerald-400",
  recovery: "bg-violet-400",
};

const toneInsight: Record<AiCardTone, string> = {
  food: "border-amber-200/70 bg-amber-50/85 text-amber-950",
  trip: "border-sky-200/70 bg-sky-50/85 text-sky-950",
  sports: "border-emerald-200/70 bg-emerald-50/85 text-emerald-950",
  recovery: "border-violet-200/70 bg-violet-50/85 text-violet-950",
};

function patchItem<TItem extends AiCardBase>(item: TItem, patch: Partial<AiCardBase>) {
  return { ...item, ...patch } as TItem;
}

export function AiCardShell<TItem extends AiCardBase>({
  item,
  tone,
  icon,
  children,
  expandedContent,
  detailHref,
  detailLabel = "打开完整玩法",
  onUpdate,
}: AiCardShellProps<TItem>) {
  const [savedIds, setSavedIds] = useLocalStorageState<string[]>(
    SAVED_CARDS_STORAGE_KEY,
    [],
  );
  const persistedSaved = savedIds.includes(item.id);
  const isSaved = persistedSaved || item.isSaved === true;
  const expanded = item.expanded === true;
  const dismissed = item.isDismissed === true;
  const coverTransitionName = `card-${tone}-cover`;

  function handleSave() {
    const nextSaved = !isSaved;
    setSavedIds((prev) => {
      const set = new Set(prev);
      if (nextSaved) {
        set.add(item.id);
      } else {
        set.delete(item.id);
      }
      return Array.from(set);
    });
    onUpdate(patchItem(item, { isSaved: nextSaved }));
    toast(nextSaved ? "已收藏，之后可以在“我”里找到" : "已取消收藏");
  }

  return (
    <section
      className={cn(
        "flex h-full w-full snap-start snap-always items-center justify-center overflow-hidden px-3 pb-20 pt-24",
        toneSection[tone],
      )}
    >
      <motion.article
        layout
        className={cn(
          "scrollbar-none relative isolate max-h-[calc(100%-0.75rem)] w-full overflow-y-auto rounded-[28px] border bg-white text-slate-900",
          toneSurface[tone],
        )}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: dismissed ? 0.45 : 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {item.visual ? (
          <header className="relative min-h-[218px] overflow-hidden rounded-b-[26px] bg-slate-950">
            <div
              className="absolute inset-0"
              style={{ viewTransitionName: coverTransitionName }}
            >
              <Image
                alt={item.visual.alt}
                className="h-full w-full object-cover"
                fill
                sizes="(max-width: 640px) 342px, 342px"
                src={item.visual.src}
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.28)_42%,rgba(2,6,23,0.84)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950/42 to-transparent" />

            <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
              <SceneBadge
                aiLabel={item.aiLabel}
                className="text-white"
                sceneLabel={item.sceneLabel}
              />
              <div className="flex shrink-0 gap-2">
                <Button
                  aria-label={isSaved ? "取消收藏" : "收藏"}
                  className="h-9 w-9 rounded-full border-white/25 bg-white/18 p-0 text-white shadow-soft backdrop-blur-md hover:bg-white/28"
                  type="button"
                  variant="outline"
                  onClick={handleSave}
                >
                  {isSaved ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  aria-label="不感兴趣"
                  className="h-9 w-9 rounded-full border-white/25 bg-white/18 p-0 text-white shadow-soft backdrop-blur-md hover:bg-white/28"
                  type="button"
                  variant="outline"
                  onClick={() => onUpdate(patchItem(item, { isDismissed: true }))}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/14 px-3 py-1 text-[11px] font-medium text-white/88 shadow-soft backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                结合偏好生成
                <span className={cn("h-1.5 w-1.5 rounded-full", toneAccent[tone])} />
              </div>
              <div className="flex items-end gap-3">
                <div className="min-w-0 flex-1">
                  <h2 className="text-balance text-[22px] font-semibold leading-[1.12] tracking-normal text-white drop-shadow-sm">
                    {item.headline}
                  </h2>
                </div>
                <span
                  className={cn(
                    "mb-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border shadow-soft backdrop-blur",
                    toneIconBg[tone],
                  )}
                >
                  {icon}
                </span>
              </div>
            </div>
          </header>
        ) : null}

        <div className="p-4 pt-3">
          <div
            className={cn(
              "mb-3 rounded-2xl border px-3 py-2.5 text-sm leading-5",
              toneInsight[tone],
            )}
          >
            {item.personalReason}
          </div>

          <div>{children}</div>

          {detailHref ? (
            <Link
              className={cn(
                "mt-4 flex min-h-12 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-soft transition hover:-translate-y-0.5",
                toneInsight[tone],
              )}
              href={detailHref}
            >
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                {detailLabel}
              </span>
              <span className="text-lg leading-none">→</span>
            </Link>
          ) : null}

          {item.feedbackMessage ? (
            <motion.div
              className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {item.feedbackMessage}
            </motion.div>
          ) : null}

          <ExpandablePanel open={expanded}>{expandedContent}</ExpandablePanel>

          <CardFeedbackBar
            expanded={expanded}
            feedbackStatus={item.feedbackStatus}
            onFeedback={(feedbackStatus) => onUpdate(patchItem(item, { feedbackStatus }))}
            onToggleExpand={() => onUpdate(patchItem(item, { expanded: !expanded }))}
          />
        </div>

        <AnimatePresence>
          {dismissed ? (
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center bg-white/88 p-6 text-center backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 shadow-phone">
                已减少类似卡片
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.article>
    </section>
  );
}
