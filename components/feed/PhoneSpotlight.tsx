"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronsUpDown, MousePointer2 } from "lucide-react";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "phone-hint-seen";
const APPEAR_DELAY_MS = 1500;
const AUTO_DISMISS_MS = 8000;

type Rect = { cx: number; cy: number; r: number } | null;

export function PhoneSpotlight({
  targetRef,
}: {
  targetRef: RefObject<HTMLElement | null>;
}) {
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState<Rect>(null);
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === "1") {
      dismissedRef.current = true;
      return;
    }

    const target = targetRef.current;
    if (!target) return;

    const measure = () => {
      const box = target.getBoundingClientRect();
      setRect({
        cx: box.left + box.width / 2,
        cy: box.top + box.height / 2,
        r: Math.max(box.width, box.height) / 2 + 24,
      });
    };

    measure();

    const dismiss = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;
      setVisible(false);
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // sessionStorage may be unavailable (private mode); ignore.
      }
    };

    const showTimer = window.setTimeout(() => {
      if (!dismissedRef.current) setVisible(true);
    }, APPEAR_DELAY_MS);

    const autoTimer = window.setTimeout(
      () => dismiss(),
      APPEAR_DELAY_MS + AUTO_DISMISS_MS,
    );

    target.addEventListener("mouseenter", dismiss, { once: true });
    target.addEventListener("wheel", dismiss, { once: true, passive: true });
    target.addEventListener("touchmove", dismiss, { once: true, passive: true });

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(target);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(autoTimer);
      target.removeEventListener("mouseenter", dismiss);
      target.removeEventListener("wheel", dismiss);
      target.removeEventListener("touchmove", dismiss);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [targetRef]);

  if (!rect) return null;

  const { cx, cy, r } = rect;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="phone-spotlight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 z-[60] hidden lg:block"
          style={{
            background: `radial-gradient(circle at ${cx}px ${cy}px, transparent ${r}px, rgba(15,23,42,0.28) ${r + 40}px, rgba(15,23,42,0.45) 100%)`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="absolute inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-slate-800 shadow-phone backdrop-blur"
            style={{
              left: Math.max(16, cx - r - 240),
              top: Math.max(16, cy - 18),
            }}
          >
            <MousePointer2 className="h-4 w-4 text-amber-600" />
            在手机里上下滑动
            <motion.span
              animate={{ y: [0, -4, 0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-amber-600"
            >
              <ChevronsUpDown className="h-4 w-4" />
            </motion.span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
