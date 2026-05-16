"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Utensils } from "lucide-react";
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
      expandedContent={<AiReason reason={`天气：${item.weather}。预算：${item.budget}。推荐优先保留热度、速度和不踩雷。`} />}
      icon={<Utensils className="h-4 w-4" />}
      item={item}
      tone="food"
      onUpdate={onUpdate}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={item.options.map((option) => option.id).join("-")}
          className="grid gap-1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          {item.options.map((option, index) => (
            <div
              key={option.id}
              className="rounded-lg border border-orange-100/14 bg-black/20 p-2.5 backdrop-blur"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-200/20 text-[11px] font-semibold">
                      {index + 1}
                    </span>
                    <h3 className="text-base font-semibold text-orange-50">{option.name}</h3>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-sm leading-5 text-white/72">{option.reason}</p>
                </div>
                <span className="shrink-0 rounded-full bg-orange-200/18 px-2.5 py-1 text-sm font-semibold text-orange-50">
                  {option.price}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {option.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/72">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-3">
        <ActionChips
          actions={item.primaryActions}
          loadingActionId={loadingActionId}
          selectedActionId={item.selectedActionId}
          tone="food"
          onActionClick={handleAction}
        />
      </div>
    </AiCardShell>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
