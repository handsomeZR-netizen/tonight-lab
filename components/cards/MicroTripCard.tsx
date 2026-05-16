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
      onUpdate={onUpdate}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={item.stops.map((stop) => stop.id).join("-")}
          className="relative grid gap-2 pl-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          <div className="absolute bottom-5 left-[1.05rem] top-4 w-px bg-sky-200" />
          {item.stops.map((stop) => (
            <div
              key={stop.id}
              className="relative rounded-lg border border-slate-200 bg-slate-50/60 p-3 pl-5"
            >
              <span className="absolute left-[-0.5rem] top-4 h-3 w-3 rounded-full border-2 border-sky-300 bg-white" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
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
                    className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-600">
        <Camera className="h-4 w-4 text-sky-600" />
        展开后可看“为什么这样排”，不显示复杂地图。
      </div>
      <div className="mt-4">
        <ActionChips
          actions={item.primaryActions}
          loadingActionId={loadingActionId}
          selectedActionId={item.selectedActionId}
          tone="trip"
          onActionClick={handleAction}
        />
      </div>
    </AiCardShell>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
