"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Radio, ShieldHalf, Trophy } from "lucide-react";
import { useState } from "react";

import { ActionChips } from "@/components/card-parts/ActionChips";
import { AiReason } from "@/components/card-parts/AiReason";
import { AiCardShell } from "@/components/cards/AiCardShell";
import { transformSportsCard } from "@/lib/card-transforms";
import type { ActionChip, SportsPreMatchCardData } from "@/lib/types";

type SportsPreMatchCardProps = {
  item: SportsPreMatchCardData;
  onUpdate: (updatedItem: SportsPreMatchCardData) => void;
};

export function SportsPreMatchCard({ item, onUpdate }: SportsPreMatchCardProps) {
  const [loadingActionId, setLoadingActionId] = useState<string>();

  async function handleAction(action: ActionChip) {
    if (loadingActionId) {
      return;
    }

    setLoadingActionId(action.id);
    onUpdate({ ...item, selectedActionId: action.id });
    await wait(420);
    onUpdate(transformSportsCard(item, action.id));
    setLoadingActionId(undefined);
  }

  return (
    <AiCardShell
      expandedContent={
        <AiReason
          reason={`关键对位：${item.keyMatchup}。关注球员：${item.followedPlayer}。这张卡只给赛前最短路径，不做复杂数据墙。`}
        />
      }
      icon={<Trophy className="h-4 w-4" />}
      item={item}
      tone="sports"
      onUpdate={onUpdate}
    >
      <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-1 flex-col items-center text-center">
            <ShieldHalf className="mb-1 h-5 w-5 text-emerald-600" />
            <p className="text-sm font-semibold text-slate-900">
              {item.homeTeam}
            </p>
          </div>
          <div className="flex flex-col items-center rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2 text-center">
            <p className="text-[11px] uppercase tracking-wide text-emerald-700">
              开赛前
            </p>
            <p className="text-2xl font-semibold tabular-nums text-emerald-800">
              {item.startInMinutes}
            </p>
            <p className="text-[11px] text-emerald-700">分钟</p>
          </div>
          <div className="flex flex-1 flex-col items-center text-center">
            <ShieldHalf className="mb-1 h-5 w-5 text-slate-500" />
            <p className="text-sm font-semibold text-slate-900">
              {item.awayTeam}
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={item.insights.map((insight) => insight.id).join("-")}
          className="mt-3 grid gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          {item.insights.map((insight, index) => (
            <div
              key={insight.id}
              className="rounded-lg border border-slate-200 bg-white p-3"
            >
              <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <Radio className="h-3.5 w-3.5 text-emerald-600" />
                {index + 1}. {insight.title}
              </p>
              <p className="mt-1 text-sm leading-5 text-slate-600">
                {insight.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {item.predictionStats ? (
        <div className="mt-3 rounded-md border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-600">
          当前球迷倾向：主胜 {item.predictionStats.homeWin}% / 平局{" "}
          {item.predictionStats.draw}% / 客胜 {item.predictionStats.awayWin}%
        </div>
      ) : null}

      <div className="mt-4">
        <ActionChips
          actions={item.primaryActions}
          loadingActionId={loadingActionId}
          selectedActionId={item.selectedActionId}
          tone="sports"
          onActionClick={handleAction}
        />
      </div>
    </AiCardShell>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
