"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[60px] opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.45) 0%, rgba(251,191,36,0) 70%)",
        }}
      />
      {children}
    </motion.div>
  );
}
