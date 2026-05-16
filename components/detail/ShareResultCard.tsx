import { Bookmark, Share2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { DetailTone } from "@/lib/detail-content";

type ShareResultCardProps = {
  tone: DetailTone;
  title: string;
  result: string;
  note: string;
};

const toneClass: Record<DetailTone, string> = {
  food: "border-amber-200 bg-amber-50/86 text-amber-950",
  trip: "border-sky-200 bg-sky-50/86 text-sky-950",
  sports: "border-emerald-200 bg-emerald-50/86 text-emerald-950",
  recovery: "border-violet-200 bg-violet-50/86 text-violet-950",
};

export function ShareResultCard({ tone, title, result, note }: ShareResultCardProps) {
  return (
    <aside
      className={cn(
        "rounded-[28px] border p-5 shadow-phone backdrop-blur",
        toneClass[tone],
      )}
    >
      <div className="flex items-center gap-2 text-xs font-semibold">
        <Sparkles className="h-4 w-4" />
        生成结果卡
      </div>
      <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-950">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-slate-700">{result}</p>
      <p className="mt-3 rounded-2xl bg-white/70 px-3 py-2 text-sm leading-6 text-slate-600">
        {note}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button className="rounded-full" type="button">
          <Bookmark className="h-4 w-4" />
          保存结果
        </Button>
        <Button className="rounded-full bg-white/80" type="button" variant="outline">
          <Share2 className="h-4 w-4" />
          生成分享文案
        </Button>
      </div>
    </aside>
  );
}
