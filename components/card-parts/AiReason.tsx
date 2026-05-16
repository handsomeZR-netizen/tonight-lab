import { Lightbulb } from "lucide-react";

export function AiReason({ reason }: { reason: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,white,rgba(248,250,252,0.92))] p-3 text-sm leading-5 text-slate-600 shadow-soft">
      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-800">
        <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
        为什么现在推荐
      </div>
      {reason}
    </div>
  );
}
