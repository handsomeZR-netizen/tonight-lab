"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

type AnimatedNumberProps = {
  value: number;
  decimals?: number;
  className?: string;
  duration?: number;
};

export function AnimatedNumber({
  value,
  decimals = 0,
  className,
  duration,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 80,
    damping: 24,
    mass: 1,
    duration: duration ? duration * 1000 : undefined,
  });
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  const display = useTransform(spring, (latest) =>
    latest.toLocaleString("zh-CN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  );

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      motionValue.set(value);
    } else {
      motionValue.set(value);
    }
  }, [inView, value, motionValue, reduce]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
