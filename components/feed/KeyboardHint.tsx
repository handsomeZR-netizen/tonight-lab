"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

const AUTO_SHOW_MS = 3000;

function Key({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-600 shadow-soft">
      {children}
    </kbd>
  );
}

export function KeyboardHint({
  hovered,
  focusedOnce,
}: {
  hovered: boolean;
  focusedOnce: boolean;
}) {
  const isPointer = useMediaQuery("(hover: hover)");
  const [autoShow, setAutoShow] = useState(false);

  useEffect(() => {
    if (!focusedOnce) return;
    setAutoShow(true);
    const timer = window.setTimeout(() => {
      setAutoShow(false);
    }, AUTO_SHOW_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, [focusedOnce]);

  if (!isPointer) return null;

  const visible = autoShow || hovered;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="feed-keyboard-hint"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
          className="pointer-events-none absolute bottom-24 right-3 z-40 flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/85 px-3 py-1.5 text-[11px] text-slate-600 shadow-soft backdrop-blur"
        >
          <Key>↑</Key>
          <Key>↓</Key>
          <span>切卡</span>
          <span className="text-slate-300">·</span>
          <Key>Esc</Key>
          <span>回顶</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
