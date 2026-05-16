"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Sparkles, UtensilsCrossed } from "lucide-react";
import { useState } from "react";

import { ActionChips } from "@/components/card-parts/ActionChips";
import { AiReason } from "@/components/card-parts/AiReason";
import { AiCardShell } from "@/components/cards/AiCardShell";
import { transformFoodCard } from "@/lib/card-transforms";
import type { ActionChip, FoodDecisionCardData } from "@/lib/types";

type FoodDecisionCardProps = {
  item: FoodDecisionCardData;
  onUpdate: (updatedItem: FoodDecisionCardData) => void;
};

export function FoodDecisionCard({ item, onUpdate }: FoodDecisionCardProps) {
  const [loadingActionId, setLoadingActionId] = useState<string>();

  async function handleAction(action: ActionChip) {
    if (loadingActionId) {
      return;
    }

    setLoadingActionId(action.id);
    onUpdate({ ...item, selectedActionId: action.id });
    await wait(460);
    onUpdate(transformFoodCard(item, action.id));
    setLoadingActionId(undefined);
  }

  return (
    <AiCardShell
      expandedContent={
        <AiReason
          reason={`天气：${item.weather}。预算：${item.budget}。推荐优先保留热度、速度和不踩雷。`}
        />
      }
      icon={<UtensilsCrossed className="h-4 w-4" />}
      item={item}
      tone="food"
      detailHref="/cards/food"
      onUpdate={onUpdate}
    >
      <div className="mb-3">
        <ActionChips
          actions={item.primaryActions}
          loadingActionId={loadingActionId}
          selectedActionId={item.selectedActionId}
          tone="food"
          onActionClick={handleAction}
        />
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={item.options.map((option) => option.id).join("-")}
          className="grid gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          {item.options.map((option, index) => (
            <div
              key={option.id}
              className={
                index === 0
                  ? "relative overflow-hidden rounded-2xl border border-amber-200 bg-[linear-gradient(135deg,rgba(254,243,199,0.95),white_58%,rgba(255,251,235,0.92))] p-3.5 shadow-soft"
                  : "rounded-2xl border border-slate-200 bg-slate-50/70 p-2.5"
              }
            >
              {index === 0 ? (
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-white/75 px-2.5 py-1 text-[11px] font-semibold text-amber-900 shadow-soft">
                  <Sparkles className="h-3 w-3" />
                  此刻最稳
                </div>
              ) : null}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-[11px] font-semibold text-amber-700">
                      {index + 1}
                    </span>
                    <h3 className="text-base font-semibold leading-tight text-slate-900">
                      {option.name}
                    </h3>
                  </div>
                  <p
                    className={
                      index === 0
                        ? "mt-1 line-clamp-2 text-sm leading-5 text-slate-600"
                        : "mt-1 line-clamp-1 text-sm leading-5 text-slate-600"
                    }
                  >
                    {option.reason}
                  </p>
                </div>
                <span className="shrink-0 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-800">
                  {option.price}
                </span>
              </div>
              {index === 0 ? (
                <div className="mt-2 flex items-center gap-1.5 rounded-xl bg-white/65 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-600" />
                  {option.fitMoment}
                </div>
              ) : null}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {option.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </AiCardShell>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
