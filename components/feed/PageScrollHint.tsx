"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "scroll-hint-seen";
const APPEAR_DELAY_MS = 2500;
const SCROLL_THRESHOLD_PX = 120;

export function PageScrollHint({
  label = "向下查看 4 个真实场景",
}: {
  label?: string;
}) {
  const [visible, setVisible] = useState(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === "1") {
      dismissedRef.current = true;
      return;
    }
    if (window.scrollY > SCROLL_THRESHOLD_PX) {
      dismissedRef.current = true;
      return;
    }

    const dismiss = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;
      setVisible(false);
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // sessionStorage may be unavailable; ignore.
      }
    };

    const showTimer = window.setTimeout(() => {
      if (!dismissedRef.current) setVisible(true);
    }, APPEAR_DELAY_MS);

    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD_PX) dismiss();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(showTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="page-scroll-hint"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="pointer-events-none absolute inset-x-0 bottom-20 z-20 flex justify-center lg:bottom-24"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-medium text-slate-600 shadow-soft backdrop-blur"
          >
            {label}
            <ChevronDown className="h-4 w-4 text-amber-600" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
