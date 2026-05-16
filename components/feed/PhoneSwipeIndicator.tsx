"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "phone-swipe-seen";
const APPEAR_DELAY_MS = 1500;
const AUTO_DISMISS_MS = 25000;

export function PhoneSwipeIndicator({
  targetRef,
}: {
  targetRef: RefObject<HTMLElement | null>;
}) {
  const [visible, setVisible] = useState(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === "1") {
      dismissedRef.current = true;
      return;
    }

    const target = targetRef.current;
    if (!target) return;

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

    const autoTimer = window.setTimeout(
      dismiss,
      APPEAR_DELAY_MS + AUTO_DISMISS_MS,
    );

    target.addEventListener("wheel", dismiss, { once: true, passive: true });
    target.addEventListener("touchmove", dismiss, {
      once: true,
      passive: true,
    });

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(autoTimer);
      target.removeEventListener("wheel", dismiss);
      target.removeEventListener("touchmove", dismiss);
    };
  }, [targetRef]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="phone-swipe-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-40 hidden h-[60%] items-end justify-center pb-24 lg:flex"
        >
          <div className="relative flex h-full w-16 items-end justify-center">
            <motion.span
              className="absolute bottom-0 left-1/2 -translate-x-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/55 text-slate-700 shadow-[0_0_28px_rgba(255,255,255,0.65)] backdrop-blur"
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: [0, -160, -160],
                opacity: [0, 0.95, 0],
              }}
              transition={{
                duration: 2.6,
                ease: "easeOut",
                times: [0, 0.55, 1],
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <ChevronUp className="h-5 w-5" />
            </motion.span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
