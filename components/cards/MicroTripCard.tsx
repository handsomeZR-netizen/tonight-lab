"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Camera, Map, Navigation } from "lucide-react";
import { useState } from "react";

import { ActionChips } from "@/components/card-parts/ActionChips";
import { AiReason } from "@/components/card-parts/AiReason";
import { AiCardShell } from "@/components/cards/AiCardShell";
import { transformMicroTripCard } from "@/lib/card-transforms";
import type { ActionChip, MicroTripCardData } from "@/lib/types";

type MicroTripCardProps = {
  item: MicroTripCardData;
  onUpdate: (updatedItem: MicroTripCardData) => void;
};

export function MicroTripCard({ item, onUpdate }: MicroTripCardProps) {
  const [loadingActionId, setLoadingActionId] = useState<string>();

  async function handleAction(action: ActionChip) {
    if (loadingActionId) {
      return;
    }

    setLoadingActionId(action.id);
    onUpdate({ ...item, selectedActionId: action.id });
    await wait(500);
    onUpdate(transformMicroTripCard(item, action.id));
    setLoadingActionId(undefined);
  }

  return (
    <AiCardShell
      expandedContent={
        <AiReason
          reason={`${item.city} / ${item.duration} / ${item.mood}。这不是完整攻略，只保留现在出发最容易完成的路线。`}
        />
      }
      icon={<Map className="h-4 w-4" />}
      item={item}
      tone="trip"
      detailHref="/cards/trip"
      onUpdate={onUpdate}
    >
      <div className="mb-3">
        <ActionChips
          actions={item.primaryActions}
          loadingActionId={loadingActionId}
          selectedActionId={item.selectedActionId}
          tone="trip"
          onActionClick={handleAction}
        />
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={item.stops.map((stop) => stop.id).join("-")}
          className="relative grid gap-2 rounded-2xl border border-sky-200 bg-[linear-gradient(180deg,rgba(240,249,255,0.92),white)] p-3 pl-5 shadow-soft"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          <div className="absolute bottom-8 left-[1.33rem] top-7 w-px bg-sky-200" />
          {item.stops.map((stop) => (
            <div
              key={stop.id}
              className="relative rounded-2xl border border-slate-200 bg-white/86 p-3 pl-5 shadow-soft"
            >
              <span className="absolute left-[-0.84rem] top-4 flex h-4 w-4 items-center justify-center rounded-full border border-sky-300 bg-white shadow-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              </span>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-sky-700">
                    {stop.time}
                  </p>
                  <h3 className="mt-0.5 text-base font-semibold text-slate-900">
                    {stop.title}
                  </h3>
                </div>
                <Navigation className="h-4 w-4 shrink-0 text-sky-500" />
              </div>
              <p className="mt-1 text-sm leading-5 text-slate-600">
                {stop.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {stop.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-xs font-medium text-slate-600">
        <Camera className="h-4 w-4 text-sky-600" />
        展开后可看“为什么这样排”，不显示复杂地图。
      </div>
    </AiCardShell>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
