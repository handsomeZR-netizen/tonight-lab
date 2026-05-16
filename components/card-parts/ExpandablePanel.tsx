"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type ExpandablePanelProps = {
  open: boolean;
  children: ReactNode;
};

export function ExpandablePanel({ open, children }: ExpandablePanelProps) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          <div className="mt-3 rounded-lg border border-white/10 bg-black/20 p-3 text-sm leading-6 text-white/104 backdrop-blur-md">
            {children}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
