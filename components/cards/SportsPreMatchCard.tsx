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
      detailHref="/cards/sports"
      onUpdate={onUpdate}
    >
      <div className="mb-3">
        <ActionChips
          actions={item.primaryActions}
          loadingActionId={loadingActionId}
          selectedActionId={item.selectedActionId}
          tone="sports"
          onActionClick={handleAction}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-[linear-gradient(135deg,rgba(236,253,245,0.96),white)] p-3 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-1 flex-col items-center text-center">
            <ShieldHalf className="mb-1 h-5 w-5 text-emerald-700" />
            <p className="text-sm font-semibold text-slate-900">
              {item.homeTeam}
            </p>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-white px-5 py-2.5 text-center shadow-soft">
            <p className="text-[11px] uppercase text-emerald-700">
              开赛前
            </p>
            <p className="text-3xl font-semibold tabular-nums leading-none text-emerald-900">
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
              className="rounded-2xl border border-slate-200 bg-white p-3 shadow-soft"
            >
              <p className="flex items-start gap-2 text-sm font-semibold leading-5 text-slate-900">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[11px] text-emerald-700">
                  {index + 1}
                </span>
                <span>{insight.title}</span>
              </p>
              <p className="mt-1 text-sm leading-5 text-slate-600">
                {insight.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {item.predictionStats ? (
        <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-600">
          <div className="mb-2 flex items-center gap-1.5 font-semibold text-slate-800">
            <Radio className="h-3.5 w-3.5 text-emerald-600" />
            当前球迷倾向
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <span className="rounded-xl bg-white px-2 py-1.5 shadow-soft">
              主胜 {item.predictionStats.homeWin}%
            </span>
            <span className="rounded-xl bg-white px-2 py-1.5 shadow-soft">
              平局 {item.predictionStats.draw}%
            </span>
            <span className="rounded-xl bg-white px-2 py-1.5 shadow-soft">
              客胜 {item.predictionStats.awayWin}%
            </span>
          </div>
        </div>
      ) : null}
    </AiCardShell>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
