"use client";

import { Flame, Soup, Timer } from "lucide-react";

import { ActionChips } from "@/components/card-parts/ActionChips";
import { AiReason } from "@/components/card-parts/AiReason";
import { AiCardShell, type AiFeedCardBase, type ChipOption } from "@/components/cards/AiCardShell";
import { chipsOrFallback, stringListField, textField } from "@/components/cards/card-data";

type FoodDecisionCardProps<TItem extends AiFeedCardBase> = {
  item: TItem;
  onUpdate: (updatedItem: TItem) => void;
};

const fallbackChips: ChipOption[] = [
  { id: "lighter", label: "清淡一点" },
  { id: "protein", label: "高蛋白" },
  { id: "spicy", label: "想吃辣" },
];

export function FoodDecisionCard<TItem extends AiFeedCardBase>({
  item,
  onUpdate,
}: FoodDecisionCardProps<TItem>) {
  const dish = textField(item, ["dish", "food", "recommendation", "name"], "热汤饭");
  const price = textField(item, ["price", "budget", "cost"], "¥35以内");
  const eta = textField(item, ["eta", "time", "duration"], "25分钟");
  const heat = textField(item, ["heat", "calories", "energy"], "暖胃");
  const tags = stringListField(item, ["tags", "highlights"]).slice(0, 3);

  return (
    <AiCardShell
      details={<AiReason reason={item.reason} />}
      icon={<Soup className="h-4 w-4" />}
      item={item}
      tone="food"
      onUpdate={onUpdate}
    >
      <div className="rounded-lg border border-orange-100/15 bg-black/20 p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm text-orange-100/102">现在最稳的一餐</p>
            <p className="mt-1 text-3xl font-semibold leading-none text-orange-50">{dish}</p>
          </div>
          <div className="rounded-md bg-orange-300/20 px-3 py-2 text-right">
            <p className="text-xs text-orange-50/60">预算</p>
            <p className="text-lg font-semibold text-orange-50">{price}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md border border-white/10 bg-white/10 p-3">
            <Timer className="mb-2 h-4 w-4 text-orange-200" />
            <p className="text-white/60">到手时间</p>
            <p className="font-medium text-white">{eta}</p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/10 p-3">
            <Flame className="mb-2 h-4 w-4 text-orange-200" />
            <p className="text-white/60">身体信号</p>
            <p className="font-medium text-white">{heat}</p>
          </div>
        </div>

        {tags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-orange-50/102">
            {tags.map((tag) => (
              <span key={tag} className="rounded-md bg-orange-100/15 px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-4">
        <ActionChips
          chips={chipsOrFallback(item, fallbackChips)}
          item={item}
          tone="food"
          onUpdate={onUpdate}
        />
      </div>
    </AiCardShell>
  );
}
