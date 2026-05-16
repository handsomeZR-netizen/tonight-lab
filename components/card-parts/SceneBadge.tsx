import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

export function SceneBadge({
  aiLabel,
  className,
  sceneLabel,
}: {
  aiLabel: string;
  className?: string;
  sceneLabel: string;
}) {
  const inverse = Boolean(className);

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      <Badge
        variant="outline"
        className={cn(
          "gap-1 border-slate-200 bg-white text-slate-700",
          inverse && "border-white/20 bg-white/16 text-white shadow-soft backdrop-blur-md",
        )}
      >
        <Sparkles
          className={cn("h-3 w-3 text-slate-500", inverse && "text-white/78")}
        />
        {aiLabel}
      </Badge>
      <Badge
        className={cn(
          inverse && "border-white/20 bg-white/16 text-white/82 shadow-soft backdrop-blur-md",
        )}
        variant="quiet"
      >
        {sceneLabel}
      </Badge>
    </div>
  );
}
