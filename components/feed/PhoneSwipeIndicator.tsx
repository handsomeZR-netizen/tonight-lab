"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronsUpDown, Hand, Sparkles } from "lucide-react";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "phone-swipe-guide-v2-seen";
const APPEAR_DELAY_MS = 700;
const AUTO_DISMISS_MS = 18000;

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
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center rounded-[36px] bg-slate-950/42 px-6 backdrop-blur-[2px] sm:rounded-[44px]"
        >
          <motion.div
            className="relative w-full max-w-[300px] overflow-hidden rounded-[30px] border border-white/35 bg-white/90 px-5 pb-5 pt-4 text-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.36)] backdrop-blur-xl"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-300/55 blur-2xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-amber-300/60 blur-2xl"
            />

            <div className="relative flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-soft">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                交互提示
              </div>
              <motion.span
                animate={{ y: [0, 3, 0, -3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white shadow-phone"
              >
                <ChevronsUpDown className="h-4 w-4" />
              </motion.span>
            </div>

            <div className="relative mt-5 grid min-h-[168px] place-items-center overflow-hidden rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
              <div className="absolute left-4 right-4 top-4 space-y-2">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="h-9 rounded-2xl border border-slate-200 bg-white shadow-soft"
                    animate={{ y: [-2, -16, -30], opacity: [0.92, 0.7, 0.25] }}
                    transition={{
                      duration: 2.4,
                      delay: index * 0.12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="relative z-10 flex flex-col items-center"
                animate={{ y: [44, -44, -44], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  repeatDelay: 0.45,
                  ease: "easeOut",
                  times: [0, 0.48, 1],
                }}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/90 bg-slate-950 text-white shadow-[0_16px_42px_rgba(15,23,42,0.28)]">
                  <Hand className="h-6 w-6" />
                </span>
                <span className="mt-3 h-20 w-px bg-gradient-to-t from-cyan-500 via-amber-400 to-transparent" />
              </motion.div>
            </div>

            <div className="relative mt-5">
              <p className="text-lg font-semibold tracking-normal text-slate-950">
                右侧手机可以继续下滑
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                像刷短视频一样滑动屏幕，查看美食、短途、运动和回血卡片。
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white">
                现在试着滑一下
                <ChevronsUpDown className="h-3.5 w-3.5 text-amber-300" />
              </div>
            </div>
          </motion.div>

          <div className="absolute inset-x-0 bottom-12 flex justify-center">
            <motion.span
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/60 text-slate-800 shadow-[0_0_28px_rgba(255,255,255,0.7)] backdrop-blur"
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: [0, -128, -128],
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
              <ChevronsUpDown className="h-5 w-5" />
            </motion.span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
