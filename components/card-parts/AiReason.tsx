import { Lightbulb } from "lucide-react";

export function AiReason({ reason }: { reason: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 text-sm leading-5 text-slate-600">
      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
        <Lightbulb className="h-3.5 w-3.5 text-slate-500" />
        为什么现在推荐
      </div>
      {reason}
    </div>
  );
}
