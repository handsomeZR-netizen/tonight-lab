"use client";

import { motion } from "framer-motion";
import { ThumbsDown, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

import type { FeedbackValue } from "@/components/cards/AiCardShell";

type CardFeedbackBarProps = {
  value?: FeedbackValue;
  onChange: (value: FeedbackValue) => void;
};

export function CardFeedbackBar({ value, onChange }: CardFeedbackBarProps) {
  return (
    <footer className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-white/52">
      <span>这张卡准吗</span>
      <div className="flex items-center gap-2">
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            className={cn(
              "h-8 rounded-md border-white/10 bg-white/10 px-2.5 text-xs text-white/102 hover:bg-white/15",
              value === "accurate" && "bg-emerald-300/20 text-emerald-50",
            )}
            type="button"
            variant="ghost"
            onClick={() => onChange("accurate")}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            准
          </Button>
        </motion.div>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            className={cn(
              "h-8 rounded-md border-white/10 bg-white/10 px-2.5 text-xs text-white/102 hover:bg-white/15",
              value === "inaccurate" && "bg-rose-300/20 text-rose-50",
            )}
            type="button"
            variant="ghost"
            onClick={() => onChange("inaccurate")}
          >
            <ThumbsDown className="h-3.5 w-3.5" />
            不准
          </Button>
        </motion.div>
      </div>
    </footer>
  );
}
