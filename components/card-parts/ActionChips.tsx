"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/cn";
import { transformCard } from "@/lib/card-transforms";

import type { AiFeedCardBase, CardTone, ChipOption } from "@/components/cards/AiCardShell";

type TransformPayload = {
  action: "chip";
  value: string;
  chipId: string;
  label: string;
  cardType?: string;
};

type TransformCardFn = <TItem extends AiFeedCardBase>(
  item: TItem,
  payload: TransformPayload,
) => Promise<TItem> | TItem;

type ActionChipsProps<TItem extends AiFeedCardBase> = {
  item: TItem;
  onUpdate: (updatedItem: TItem) => void;
  chips?: ChipOption[];
  tone: CardTone;
};

const chipTone: Record<CardTone, string> = {
  food: "border-orange-200/20 bg-orange-200/15 text-orange-50 hover:bg-orange-200/20",
  trip: "border-fuchsia-200/20 bg-fuchsia-200/15 text-fuchsia-50 hover:bg-fuchsia-200/20",
  sports: "border-cyan-200/25 bg-cyan-200/15 text-cyan-50 hover:bg-cyan-200/20",
  recovery: "border-slate-200/20 bg-slate-200/10 text-slate-100 hover:bg-slate-200/20",
};

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function chipValue(chip: ChipOption) {
  return chip.value ?? chip.label;
}

function patchSelected<TItem extends AiFeedCardBase>(
  item: TItem,
  chip: ChipOption,
  loadingChip?: string,
) {
  return {
    ...item,
    selectedChip: chip.id,
    loadingChip,
  } as TItem;
}

export function ActionChips<TItem extends AiFeedCardBase>({
  item,
  onUpdate,
  chips,
  tone,
}: ActionChipsProps<TItem>) {
  const [pendingChip, setPendingChip] = useState<string | null>(null);
  const visibleChips = chips ?? item.chips ?? [];

  if (visibleChips.length === 0) {
    return null;
  }

  const handleChipClick = async (chip: ChipOption) => {
    if (pendingChip) {
      return;
    }

    const delay = 300 + Math.floor(Math.random() * 301);
    setPendingChip(chip.id);
    onUpdate(patchSelected(item, chip, chip.id));

    const payload: TransformPayload = {
      action: "chip",
      value: chipValue(chip),
      chipId: chip.id,
      label: chip.label,
      cardType: item.cardType,
    };

    try {
      await wait(delay);
      const applyTransform = transformCard as unknown as TransformCardFn;
      const transformed = await applyTransform(patchSelected(item, chip), payload);
      onUpdate({ ...transformed, loadingChip: undefined } as TItem);
    } catch {
      onUpdate({ ...patchSelected(item, chip), loadingChip: undefined } as TItem);
    } finally {
      setPendingChip(null);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {visibleChips.map((chip) => {
        const selected = item.selectedChip === chip.id;
        const loading = pendingChip === chip.id || item.loadingChip === chip.id;

        return (
          <motion.button
            key={chip.id}
            className={cn(
              "relative min-h-9 overflow-hidden rounded-md border px-3 py-2 text-left text-sm font-medium transition-colors",
              chipTone[tone],
              selected && "ring-2 ring-white/35",
              pendingChip && !loading && "opacity-55",
            )}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => void handleChipClick(chip)}
          >
            <AnimatePresence>
              {loading ? (
                <motion.span
                  className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.18),transparent)]"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.52, repeat: Infinity, ease: "linear" }}
                />
              ) : null}
            </AnimatePresence>
            <span className="relative z-10 flex items-center gap-2">
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
              {chip.label}
            </span>
            {chip.description ? (
              <span className="relative z-10 mt-0.5 block text-xs font-normal text-white/60">
                {chip.description}
              </span>
            ) : null}
          </motion.button>
        );
      })}
    </div>
  );
}
