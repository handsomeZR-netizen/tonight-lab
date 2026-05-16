"use client";

import { BatteryMedium, Moon, Wind } from "lucide-react";

import { ActionChips } from "@/components/card-parts/ActionChips";
import { AiReason } from "@/components/card-parts/AiReason";
import { AiCardShell, type AiFeedCardBase, type ChipOption } from "@/components/cards/AiCardShell";
import { chipsOrFallback, stringListField, textField } from "@/components/cards/card-data";

type RecoveryCardProps<TItem extends AiFeedCardBase> = {
  item: TItem;
  onUpdate: (updatedItem: TItem) => void;
};

const fallbackChips: ChipOption[] = [
  { id: "five-min", label: "5分钟版" },
  { id: "stretch", label: "拉伸一下" },
  { id: "sleep", label: "准备睡觉" },
];

export function RecoveryCard<TItem extends AiFeedCardBase>({
  item,
  onUpdate,
}: RecoveryCardProps<TItem>) {
  const focus = textField(item, ["focus", "recovery", "name"], "低刺激恢复");
  const intensity = textField(item, ["intensity", "level"], "轻");
  const duration = textField(item, ["duration", "time"], "12分钟");
  const breathing = textField(item, ["breathing", "pace"], "4-6呼吸");
  const steps = stringListField(item, ["steps", "plan", "routine"]).slice(0, 4);

  return (
    <AiCardShell
      details={<AiReason reason={item.reason} />}
      icon={<Moon className="h-4 w-4" />}
      item={item}
      tone="recovery"
      onUpdate={onUpdate}
    >
      <div className="rounded-lg border border-slate-100/10 bg-black/25 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-200/60">今晚建议</p>
            <p className="mt-1 text-2xl font-semibold text-slate-50">{focus}</p>
          </div>
          <div className="rounded-md border border-slate-200/10 bg-slate-200/10 px-3 py-2 text-right">
            <BatteryMedium className="ml-auto h-4 w-4 text-slate-200" />
            <p className="mt-1 text-sm text-slate-100">{intensity}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Metric label="时长" value={duration} />
          <Metric label="节奏" value={breathing} />
        </div>

        <div className="mt-4 space-y-2">
          {(steps.length > 0 ? steps : ["关掉强光", "颈肩放松", "慢呼吸", "停止刷屏"]).map(
            (step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-100/108"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-200/10 text-xs text-slate-100">
                  {index + 1}
                </span>
                {step}
              </div>
            ),
          )}
        </div>
      </div>

      <div className="mt-4">
        <ActionChips
          chips={chipsOrFallback(item, fallbackChips)}
          item={item}
          tone="recovery"
          onUpdate={onUpdate}
        />
      </div>
    </AiCardShell>
  );
}

type MetricProps = {
  label: string;
  value: string;
};

function Metric({ label, value }: MetricProps) {
  return (
    <div className="rounded-md border border-white/10 bg-white/10 p-3">
      <Wind className="mb-2 h-4 w-4 text-slate-300" />
      <p className="text-xs text-slate-300/60">{label}</p>
      <p className="text-sm font-medium text-slate-50">{value}</p>
    </div>
  );
}
