"use client";

import { motion } from "framer-motion";
import { BookmarkCheck } from "lucide-react";
import { useMemo } from "react";

import { SAVED_CARDS_STORAGE_KEY } from "@/components/cards/AiCardShell";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { cn } from "@/lib/cn";
import type { DetailTone } from "@/lib/detail-content";
import { mockAiCards } from "@/lib/mock-feed";
import { toneTokens } from "@/lib/tone-tokens";
import type { AiFeedCard } from "@/lib/types";

const toneToCardType: Record<DetailTone, AiFeedCard["type"]> = {
  food: "food_decision",
  trip: "micro_trip",
  sports: "sports_pre_match",
  recovery: "recovery",
};

export function SavedRibbon({ tone }: { tone: DetailTone }) {
  const [savedIds] = useLocalStorageState<string[]>(
    SAVED_CARDS_STORAGE_KEY,
    [],
  );

  const matchedCardId = useMemo(() => {
    const targetType = toneToCardType[tone];
    return mockAiCards.find((card) => card.type === targetType)?.id;
  }, [tone]);

  const today = useMemo(() => {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "long",
      day: "numeric",
    }).format(new Date());
  }, []);

  if (!matchedCardId) return null;
  if (!savedIds.includes(matchedCardId)) return null;

  const tokens = toneTokens[tone];

  return (
    <motion.div
      aria-live="polite"
      className={cn(
        "flex h-8 items-center justify-between gap-3 rounded-full border px-3 text-[11px] font-semibold uppercase tracking-[0.18em]",
        tokens.accentBg,
        tokens.accentText,
        tokens.accentBorder,
      )}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <span className="inline-flex items-center gap-2">
        <BookmarkCheck className="h-3.5 w-3.5" aria-hidden />
        <span className="tracking-normal normal-case">你今晚已收藏</span>
      </span>
      <span className="text-[10px] tabular-nums opacity-70">{today}</span>
    </motion.div>
  );
}
