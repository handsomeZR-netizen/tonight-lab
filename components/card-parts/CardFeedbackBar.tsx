"use client";

import { Ban, Check, ChevronDown, ThumbsDown, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";

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
    <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
      <div className="flex items-center gap-2">
        <Button
          aria-label="这个推荐准"
          className="h-8 rounded-full px-2.5 text-xs"
          type="button"
          variant={feedbackStatus === "accurate" ? "default" : "glass"}
          onClick={() => onFeedback("accurate")}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          准
        </Button>
        <Button
          aria-label="这个推荐不准"
          className="h-8 rounded-full px-2.5 text-xs"
          type="button"
          variant={feedbackStatus === "inaccurate" ? "secondary" : "glass"}
          onClick={() => onFeedback("inaccurate")}
        >
          <ThumbsDown className="h-3.5 w-3.5" />
          不准
        </Button>
      </div>
      <Button
        aria-label={expanded ? "收起详情" : "展开详情"}
        className="h-8 rounded-full px-2.5 text-xs"
        type="button"
        variant="glass"
        onClick={onToggleExpand}
      >
        {expanded ? <Check className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
        {expanded ? "收起" : "展开"}
        <ChevronDown className={expanded ? "h-3.5 w-3.5 rotate-180" : "h-3.5 w-3.5"} />
      </Button>
    </div>
  );
}
