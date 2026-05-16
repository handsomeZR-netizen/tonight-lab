import { Badge } from "@/components/ui/badge";

export function SceneBadge({
  aiLabel,
  sceneLabel,
}: {
  aiLabel: string;
  sceneLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="outline" className="border-white/15 bg-white/10 text-white">
        {aiLabel}
      </Badge>
      <Badge variant="quiet">{sceneLabel}</Badge>
    </div>
  );
}
