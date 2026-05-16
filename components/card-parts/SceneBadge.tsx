import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function SceneBadge({
  aiLabel,
  sceneLabel,
}: {
  aiLabel: string;
  sceneLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Badge
        variant="outline"
        className="gap-1 border-slate-200 bg-white text-slate-700"
      >
        <Sparkles className="h-3 w-3 text-slate-500" />
        {aiLabel}
      </Badge>
      <Badge variant="quiet">{sceneLabel}</Badge>
    </div>
  );
}
