import { BrainCircuit } from "lucide-react";

type AiReasonProps = {
  reason?: string | string[];
};

export function AiReason({ reason }: AiReasonProps) {
  if (!reason || (Array.isArray(reason) && reason.length === 0)) {
    return null;
  }

  const points = Array.isArray(reason) ? reason : [reason];

  return (
    <div className="rounded-lg border border-white/10 bg-white/10 p-3 backdrop-blur-md">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-white/60">
        <BrainCircuit className="h-4 w-4" />
        AI判断
      </div>
      <div className="space-y-1.5 text-sm leading-6 text-white/108">
        {points.map((point) => (
          <p key={point}>{point}</p>
        ))}
      </div>
    </div>
  );
}
