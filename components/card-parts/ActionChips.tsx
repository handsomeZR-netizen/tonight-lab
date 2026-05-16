"use client";

import { AnimatePresence, motion } from "framer-motion";
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
  food: "border-orange-200/25 bg-orange-200/15 text-orange-50 hover:bg-orange-200/25",
  trip: "border-sky-200/20 bg-sky-200/14 text-sky-50 hover:bg-sky-200/24",
  sports: "border-lime-200/25 bg-lime-200/12 text-lime-50 hover:bg-lime-200/22",
  recovery: "border-violet-200/20 bg-violet-100/10 text-violet-50 hover:bg-violet-100/18",
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
              "relative min-h-9 shrink-0 overflow-hidden rounded-full border px-3.5 py-2 text-sm font-medium shadow-sm backdrop-blur-md transition",
              toneClass[tone],
              selected && "ring-2 ring-white/40",
              loadingActionId && !loading && "opacity-55",
            )}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => onActionClick(action)}
          >
            <AnimatePresence>
              {loading ? (
                <motion.span
                  className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.24),transparent)]"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.48, repeat: Infinity, ease: "linear" }}
                />
              ) : null}
            </AnimatePresence>
            <span className="relative z-10 flex items-center gap-1.5">
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
              {action.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
