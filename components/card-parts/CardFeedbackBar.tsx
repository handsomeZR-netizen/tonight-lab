"use client";

import { ChevronDown, ThumbsDown, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type CardFeedbackBarProps = {
  expanded?: boolean;
  feedbackStatus?: "accurate" | "inaccurate";
  onFeedback: (status: "accurate" | "inaccurate") => void;
  onToggleExpand: () => void;
};

export function CardFeedbackBar({
  expanded,
  feedbackStatus,
  onFeedback,
  onToggleExpand,
}: CardFeedbackBarProps) {
  return (
    <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-200/80 pt-3">
      <div className="flex items-center gap-2">
        <Button
          aria-label="这个推荐准"
          className="h-8 rounded-full px-3 text-xs"
          type="button"
          size="sm"
          variant={feedbackStatus === "accurate" ? "default" : "outline"}
          onClick={() => onFeedback("accurate")}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          准
        </Button>
        <Button
          aria-label="这个推荐不准"
          className="h-8 rounded-full px-3 text-xs"
          type="button"
          size="sm"
          variant={feedbackStatus === "inaccurate" ? "secondary" : "outline"}
          onClick={() => onFeedback("inaccurate")}
        >
          <ThumbsDown className="h-3.5 w-3.5" />
          不准
        </Button>
      </div>
      <Button
        aria-label={expanded ? "收起详情" : "展开详情"}
        className="h-8 rounded-full px-3 text-xs font-semibold text-slate-600 hover:text-slate-950"
        type="button"
        size="sm"
        variant="ghost"
        onClick={onToggleExpand}
      >
        {expanded ? "收起" : "为什么"}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")}
        />
      </Button>
    </div>
  );
}
