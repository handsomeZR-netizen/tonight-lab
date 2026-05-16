"use client";

import { cn } from "@/lib/cn";
import type { DetailTone } from "@/lib/detail-content";

type PlayModeTabsProps<TMode extends { id: string; label: string; description: string }> = {
  modes: TMode[];
  activeId: string;
  tone: DetailTone;
  onChange: (id: string) => void;
};

const activeClass: Record<DetailTone, string> = {
  food: "border-amber-900 bg-amber-950 text-white",
  trip: "border-sky-900 bg-sky-950 text-white",
  sports: "border-emerald-900 bg-emerald-950 text-white",
  recovery: "border-violet-900 bg-violet-950 text-white",
};

export function PlayModeTabs<
  TMode extends { id: string; label: string; description: string },
>({ modes, activeId, tone, onChange }: PlayModeTabsProps<TMode>) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {modes.map((mode) => {
        const active = mode.id === activeId;
        return (
          <button
            className={cn(
              "rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-slate-300",
              active && activeClass[tone],
            )}
            key={mode.id}
            type="button"
            onClick={() => onChange(mode.id)}
          >
            <p className="text-sm font-semibold">{mode.label}</p>
            <p
              className={cn(
                "mt-1 line-clamp-2 text-xs leading-5 text-slate-500",
                active && "text-white/72",
              )}
            >
              {mode.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
