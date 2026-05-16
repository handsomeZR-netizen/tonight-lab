import { Sparkles } from "lucide-react";

export function AiReason({ reason }: { reason: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/8 p-3 text-sm leading-5 text-white/78">
      <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-white">
        <Sparkles className="h-3.5 w-3.5" />
        为什么现在推荐
      </div>
      {reason}
    </div>
  );
}
