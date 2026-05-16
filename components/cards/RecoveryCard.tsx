"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Moon, Waves } from "lucide-react";
import { useState } from "react";

import { ActionChips } from "@/components/card-parts/ActionChips";
import { AiReason } from "@/components/card-parts/AiReason";
import { AiCardShell } from "@/components/cards/AiCardShell";
import { transformRecoveryCard } from "@/lib/card-transforms";
import type { ActionChip, RecoveryCardData } from "@/lib/types";

type RecoveryCardProps = {
  item: RecoveryCardData;
  onUpdate: (updatedItem: RecoveryCardData) => void;
};

export function RecoveryCard({ item, onUpdate }: RecoveryCardProps) {
  const [loadingActionId, setLoadingActionId] = useState<string>();

  async function handleAction(action: ActionChip) {
    if (loadingActionId) {
      return;
    }

    setLoadingActionId(action.id);
    onUpdate({ ...item, selectedActionId: action.id });
    await wait(520);
    onUpdate(transformRecoveryCard(item, action.id));
    setLoadingActionId(undefined);
  }

  return (
    <AiCardShell
      expandedContent={
        <AiReason
          reason={`状态：${stateCopy[item.energyState]}。这不是医疗建议，只是一个低刺激、短时长的恢复提示。`}
        />
      }
      icon={<Moon className="h-4 w-4" />}
      item={item}
      tone="recovery"
      detailHref="/cards/recovery"
      onUpdate={onUpdate}
    >
      <div className="mb-3">
        <ActionChips
          actions={item.primaryActions}
          loadingActionId={loadingActionId}
          selectedActionId={item.selectedActionId}
          tone="recovery"
          onActionClick={handleAction}
        />
      </div>

      <div className="mb-3 flex items-center justify-between rounded-2xl border border-violet-200 bg-[linear-gradient(135deg,rgba(245,243,255,0.96),white)] p-3 shadow-soft">
        <div className="flex items-center gap-2 text-sm text-violet-800">
          <Waves className="h-4 w-4 text-violet-600" />
          总时长
        </div>
        <p className="text-2xl font-semibold tabular-nums leading-none text-violet-950">
          {item.totalDuration}
        </p>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={item.steps.map((step) => step.id).join("-")}
          className="grid gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          {item.steps.map((step) => (
            <div
              key={step.id}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 shadow-soft"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-violet-200 bg-white text-violet-600 shadow-soft">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">{step.text}</p>
                {step.duration ? (
                  <p className="mt-0.5 text-xs font-medium text-violet-700">
                    {step.duration}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </AiCardShell>
  );
}

const stateCopy: Record<RecoveryCardData["energyState"], string> = {
  anxious: "焦虑",
  flat: "空掉",
  overstimulated: "刺激过载",
  tired: "脑力疲惫",
};

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
