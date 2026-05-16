"use client";

import { motion } from "framer-motion";
import { createElement } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type AnimatedHeadingProps = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  delay?: number;
};

export function AnimatedHeading({
  children,
  className,
  as = "h1",
  delay = 0.1,
}: AnimatedHeadingProps) {
  const reduce = useReducedMotion();
  const chars = Array.from(children);

  if (reduce) {
    return createElement(as, { className }, children);
  }

  const animatedContent = (
    <motion.span
      aria-hidden
      initial="hidden"
      animate="show"
      className="inline"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.022, delayChildren: delay },
        },
      }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          style={{ transformOrigin: "50% 100%" }}
          variants={{
            hidden: { y: "0.55em", opacity: 0, rotateX: -45 },
            show: {
              y: 0,
              opacity: 1,
              rotateX: 0,
              transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  );

  return createElement(
    as,
    { className: cn(className), "aria-label": children },
    animatedContent,
  );
}
