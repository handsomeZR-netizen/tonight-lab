import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

import type { CardTone } from "@/components/cards/AiCardShell";

type SceneBadgeProps = {
  tone: CardTone;
  label: string;
};

const badgeTone: Record<CardTone, string> = {
  food: "border-orange-200/20 bg-orange-300/20 text-orange-50",
  trip: "border-fuchsia-200/20 bg-fuchsia-300/15 text-fuchsia-50",
  sports: "border-cyan-200/25 bg-cyan-300/20 text-cyan-50",
  recovery: "border-slate-200/15 bg-slate-200/10 text-slate-100",
};

export function SceneBadge({ tone, label }: SceneBadgeProps) {
  return (
    <Badge
      className={cn("gap-1.5 rounded-md px-2.5 py-1 backdrop-blur-md", badgeTone[tone])}
      variant="outline"
    >
      <Sparkles className="h-3.5 w-3.5" />
      {label}
    </Badge>
  );
}
