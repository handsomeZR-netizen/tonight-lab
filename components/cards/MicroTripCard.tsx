"use client";

import { Clock3, MapPin, Navigation } from "lucide-react";

import { ActionChips } from "@/components/card-parts/ActionChips";
import { AiReason } from "@/components/card-parts/AiReason";
import { AiCardShell, type AiFeedCardBase, type ChipOption } from "@/components/cards/AiCardShell";
import { chipsOrFallback, stringListField, textField } from "@/components/cards/card-data";

type MicroTripCardProps<TItem extends AiFeedCardBase> = {
  item: TItem;
  onUpdate: (updatedItem: TItem) => void;
};

const fallbackChips: ChipOption[] = [
  { id: "nearer", label: "再近一点" },
  { id: "photo", label: "适合拍照" },
  { id: "quiet", label: "人少路线" },
];

export function MicroTripCard<TItem extends AiFeedCardBase>({
  item,
  onUpdate,
}: MicroTripCardProps<TItem>) {
  const destination = textField(item, ["destination", "place", "spot", "name"], "河边黄昏步道");
  const distance = textField(item, ["distance", "range"], "3.2 km");
  const duration = textField(item, ["duration", "time", "eta"], "46分钟");
  const mood = textField(item, ["mood", "vibe", "weather"], "微风转凉");
  const stops = stringListField(item, ["stops", "route", "highlights"]).slice(0, 4);

  return (
    <AiCardShell
      details={<AiReason reason={item.reason} />}
      icon={<Navigation className="h-4 w-4" />}
      item={item}
      tone="trip"
      onUpdate={onUpdate}
    >
      <div className="overflow-hidden rounded-lg border border-fuchsia-100/15 bg-black/20">
        <div className="relative h-36 p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(251,207,232,0.28),transparent_18%),linear-gradient(160deg,rgba(14,165,233,0.35),transparent_48%),linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,0.9))]" />
          <div className="relative flex h-full flex-col justify-between">
            <p className="w-fit rounded-md bg-white/15 px-2 py-1 text-xs text-white/104 backdrop-blur-md">
              {mood}
            </p>
            <div>
              <p className="flex items-center gap-1.5 text-sm text-white/104">
                <MapPin className="h-4 w-4" />
                {distance}
              </p>
              <p className="mt-1 text-2xl font-semibold text-white">{destination}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-3 border-t border-white/10 p-4">
          <div className="min-w-0">
            <p className="text-xs text-white/50">路线切片</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(stops.length > 0 ? stops : ["出门", "补光点", "折返"]).map((stop) => (
                <span key={stop} className="rounded-md bg-white/10 px-2 py-1 text-xs text-white/102">
                  {stop}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-md bg-cyan-300/15 px-3 py-2 text-right">
            <Clock3 className="ml-auto h-4 w-4 text-cyan-100" />
            <p className="mt-1 text-sm font-semibold text-cyan-50">{duration}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <ActionChips
          chips={chipsOrFallback(item, fallbackChips)}
          item={item}
          tone="trip"
          onUpdate={onUpdate}
        />
      </div>
    </AiCardShell>
  );
}
