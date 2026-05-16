"use client";

import { Radio, Shield, Swords, Zap } from "lucide-react";
import type { ReactNode } from "react";

import { ActionChips } from "@/components/card-parts/ActionChips";
import { AiReason } from "@/components/card-parts/AiReason";
import { AiCardShell, type AiFeedCardBase, type ChipOption } from "@/components/cards/AiCardShell";
import { chipsOrFallback, stringListField, textField } from "@/components/cards/card-data";

type SportsPreMatchCardProps<TItem extends AiFeedCardBase> = {
  item: TItem;
  onUpdate: (updatedItem: TItem) => void;
};

const fallbackChips: ChipOption[] = [
  { id: "lineup", label: "看阵容" },
  { id: "odds", label: "看倾向" },
  { id: "key-player", label: "关键球员" },
];

export function SportsPreMatchCard<TItem extends AiFeedCardBase>({
  item,
  onUpdate,
}: SportsPreMatchCardProps<TItem>) {
  const home = textField(item, ["homeTeam", "home", "teamA"], "主队");
  const away = textField(item, ["awayTeam", "away", "teamB"], "客队");
  const time = textField(item, ["matchTime", "time", "startsAt"], "20:00");
  const signal = textField(item, ["signal", "trend", "edge"], "节奏偏快");
  const points = stringListField(item, ["talkingPoints", "keys", "highlights"]).slice(0, 3);

  return (
    <AiCardShell
      details={<AiReason reason={item.reason} />}
      icon={<Radio className="h-4 w-4" />}
      item={item}
      tone="sports"
      onUpdate={onUpdate}
    >
      <div className="rounded-lg border border-cyan-100/15 bg-black/20 p-4">
        <div className="mb-3 flex items-center justify-between text-xs text-cyan-100/102">
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-cyan-200" />
            赛前信号
          </span>
          <span>{time}</span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <TeamBlock align="left" icon={<Shield className="h-5 w-5" />} name={home} />
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-300/15 text-cyan-50">
            <Swords className="h-5 w-5" />
          </div>
          <TeamBlock align="right" icon={<Shield className="h-5 w-5" />} name={away} />
        </div>

        <div className="mt-4 rounded-md border border-cyan-100/15 bg-cyan-200/10 p-3">
          <p className="text-xs text-cyan-50/60">AI播报口径</p>
          <p className="mt-1 text-lg font-semibold text-cyan-50">{signal}</p>
        </div>

        <div className="mt-3 grid gap-2">
          {(points.length > 0 ? points : ["开局压迫", "轮换体能", "末段防守"]).map((point) => (
            <div
              key={point}
              className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm text-white/102"
            >
              {point}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <ActionChips
          chips={chipsOrFallback(item, fallbackChips)}
          item={item}
          tone="sports"
          onUpdate={onUpdate}
        />
      </div>
    </AiCardShell>
  );
}

type TeamBlockProps = {
  name: string;
  icon: ReactNode;
  align: "left" | "right";
};

function TeamBlock({ name, icon, align }: TeamBlockProps) {
  return (
    <div className={align === "right" ? "text-right" : undefined}>
      <div
        className={
          align === "right"
            ? "ml-auto flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-white"
            : "flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-white"
        }
      >
        {icon}
      </div>
      <p className="mt-2 truncate text-lg font-semibold text-white">{name}</p>
    </div>
  );
}
