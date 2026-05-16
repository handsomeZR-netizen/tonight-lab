"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type RevealSectionProps = {
  children: ReactNode;
  delay?: number;
  as?: "section" | "div" | "article" | "aside" | "header" | "footer";
  className?: string;
  id?: string;
};

export function RevealSection({
  children,
  delay = 0,
  as = "section",
  className,
  id,
}: RevealSectionProps) {
  const MotionTag = motion[as] as typeof motion.section;
  return (
    <MotionTag
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
