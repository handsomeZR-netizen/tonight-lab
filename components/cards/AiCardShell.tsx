"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, BookmarkCheck, X } from "lucide-react";
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

const toneStyles: Record<AiCardTone, string> = {
  food: "border-orange-200/20 bg-[radial-gradient(circle_at_18%_0%,rgba(251,146,60,0.36),transparent_36%),linear-gradient(150deg,#45180e,#161017_66%,#09090b)] shadow-orange-950/40",
  trip: "border-sky-200/20 bg-[radial-gradient(circle_at_78%_8%,rgba(250,204,21,0.2),transparent_30%),radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.24),transparent_34%),linear-gradient(150deg,#101938,#1b1230_62%,#09090b)] shadow-sky-950/35",
  sports:
    "border-lime-200/20 bg-[radial-gradient(circle_at_18%_0%,rgba(132,204,22,0.26),transparent_32%),linear-gradient(150deg,#06140d,#071525_58%,#050807)] shadow-lime-950/35",
  recovery:
    "border-violet-200/15 bg-[radial-gradient(circle_at_18%_0%,rgba(139,92,246,0.18),transparent_34%),linear-gradient(150deg,#080a12,#151424_60%,#07080d)] shadow-black/40",
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
    <section className="flex h-full w-full snap-start snap-always items-center justify-center overflow-hidden bg-[#08080b] px-4 pb-20 pt-24">
      <motion.article
        layout
        className={cn(
          "scrollbar-none relative isolate max-h-full w-full overflow-y-auto rounded-lg border p-3 text-white shadow-2xl",
          toneStyles[tone],
        )}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: dismissed ? 0.45 : 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.13),transparent_28%,transparent_72%,rgba(255,255,255,0.06))]" />

        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <SceneBadge aiLabel={item.aiLabel} sceneLabel={item.sceneLabel} />
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white/90">
                {icon}
              </span>
            </div>
            <h2 className="text-balance text-[23px] font-semibold leading-tight">
              {item.headline}
            </h2>
            <p className="mt-1.5 text-sm leading-5 text-white/72">{item.personalReason}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-2">
            <Button
              aria-label={isSaved ? "取消收藏" : "收藏"}
              className="h-9 w-9 rounded-full p-0"
              type="button"
              variant="glass"
              onClick={handleSave}
            >
              {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            </Button>
            <Button
              aria-label="不感兴趣"
              className="h-9 w-9 rounded-full p-0"
              type="button"
              variant="glass"
              onClick={() => onUpdate(patchItem(item, { isDismissed: true }))}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="mt-3">{children}</div>

        {item.feedbackMessage ? (
          <motion.div
            className="mt-3 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs text-white/80"
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
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 p-6 text-center backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="rounded-lg border border-white/15 bg-white/10 px-5 py-4 text-sm text-white">
                已减少类似卡片
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.article>
    </section>
  );
}
