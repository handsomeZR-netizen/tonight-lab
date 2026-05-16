"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

export function ExpandablePanel({
  open,
  children,
}: {
  open?: boolean;
  children: ReactNode;
}) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
        >
          <div className="pt-3">{children}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
