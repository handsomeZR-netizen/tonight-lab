"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";
import type { ActionChip } from "@/lib/types";

type ActionChipsProps = {
  actions: ActionChip[];
  selectedActionId?: string;
  loadingActionId?: string;
  tone: "food" | "trip" | "sports" | "recovery";
  onActionClick: (action: ActionChip) => void;
};

const toneClass = {
  food: "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100",
  trip: "border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100",
  sports: "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100",
  recovery: "border-violet-200 bg-violet-50 text-violet-800 hover:bg-violet-100",
} satisfies Record<ActionChipsProps["tone"], string>;

const toneRing = {
  food: "ring-amber-400/60",
  trip: "ring-sky-400/60",
  sports: "ring-emerald-400/60",
  recovery: "ring-violet-400/60",
} satisfies Record<ActionChipsProps["tone"], string>;

export function ActionChips({
  actions,
  selectedActionId,
  loadingActionId,
  tone,
  onActionClick,
}: ActionChipsProps) {
  return (
    <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {actions.map((action) => {
        const selected = selectedActionId === action.id;
        const loading = loadingActionId === action.id;

        return (
          <motion.button
            key={action.id}
            className={cn(
              "relative min-h-9 shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium shadow-soft transition",
              toneClass[tone],
              selected && cn("ring-2 ring-offset-1 ring-offset-white", toneRing[tone]),
              loading && "animate-pulse",
              loadingActionId && !loading && "opacity-50",
            )}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => onActionClick(action)}
          >
            <span className="flex items-center gap-1.5">
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
              {action.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
