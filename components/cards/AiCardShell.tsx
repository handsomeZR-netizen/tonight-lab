"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, BookmarkCheck, X } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { toast } from "sonner";

import { CardFeedbackBar } from "@/components/card-parts/CardFeedbackBar";
import { ExpandablePanel } from "@/components/card-parts/ExpandablePanel";
import { SceneBadge } from "@/components/card-parts/SceneBadge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { AiCardBase } from "@/lib/types";

export type AiCardTone = "food" | "trip" | "sports" | "recovery";

type AiCardShellProps<TItem extends AiCardBase> = {
  item: TItem;
  tone: AiCardTone;
  icon: ReactNode;
  children: ReactNode;
  expandedContent: ReactNode;
  onUpdate: (updatedItem: TItem) => void;
};

const toneSurface: Record<AiCardTone, string> = {
  food: "border-amber-200/70 bg-white",
  trip: "border-sky-200/70 bg-white",
  sports: "border-emerald-200/70 bg-white",
  recovery: "border-violet-200/70 bg-white",
};

const toneIconBg: Record<AiCardTone, string> = {
  food: "bg-amber-50 text-amber-700 border-amber-200",
  trip: "bg-sky-50 text-sky-700 border-sky-200",
  sports: "bg-emerald-50 text-emerald-700 border-emerald-200",
  recovery: "bg-violet-50 text-violet-700 border-violet-200",
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
  onUpdate,
}: AiCardShellProps<TItem>) {
  const isSaved = item.isSaved === true;
  const expanded = item.expanded === true;
  const dismissed = item.isDismissed === true;

  function handleSave() {
    const nextSaved = !isSaved;
    onUpdate(patchItem(item, { isSaved: nextSaved }));
    toast(nextSaved ? "已收藏，之后可以在“我”里找到" : "已取消收藏");
  }

  return (
    <section className="flex h-full w-full snap-start snap-always items-center justify-center overflow-hidden bg-[hsl(220_14%_98%)] px-4 pb-20 pt-24">
      <motion.article
        layout
        className={cn(
          "scrollbar-none relative isolate max-h-full w-full overflow-y-auto rounded-xl border p-4 text-slate-900 shadow-soft",
          toneSurface[tone],
        )}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: dismissed ? 0.45 : 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <SceneBadge aiLabel={item.aiLabel} sceneLabel={item.sceneLabel} />
              <span
                className={cn(
                  "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border",
                  toneIconBg[tone],
                )}
              >
                {icon}
              </span>
            </div>
            <h2 className="text-balance text-[22px] font-semibold leading-tight tracking-tight text-slate-900">
              {item.headline}
            </h2>
            <p className="mt-1.5 text-sm leading-5 text-slate-500">
              {item.personalReason}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-2">
            <Button
              aria-label={isSaved ? "取消收藏" : "收藏"}
              className="h-8 w-8 rounded-full p-0"
              type="button"
              variant="outline"
              onClick={handleSave}
            >
              {isSaved ? (
                <BookmarkCheck className="h-4 w-4 text-slate-900" />
              ) : (
                <Bookmark className="h-4 w-4 text-slate-500" />
              )}
            </Button>
            <Button
              aria-label="不感兴趣"
              className="h-8 w-8 rounded-full p-0"
              type="button"
              variant="outline"
              onClick={() => onUpdate(patchItem(item, { isDismissed: true }))}
            >
              <X className="h-4 w-4 text-slate-500" />
            </Button>
          </div>
        </header>

        {item.visual ? (
          <div className="relative mt-4 aspect-video overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
            <Image
              alt={item.visual.alt}
              className="h-full w-full object-cover"
              fill
              sizes="(max-width: 640px) 342px, 342px"
              src={item.visual.src}
            />
          </div>
        ) : null}

        <div className="mt-4">{children}</div>

        {item.feedbackMessage ? (
          <motion.div
            className="mt-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600"
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

        <AnimatePresence>
          {dismissed ? (
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center bg-white/85 p-6 text-center backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="rounded-md border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-soft">
                已减少类似卡片
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.article>
    </section>
  );
}
