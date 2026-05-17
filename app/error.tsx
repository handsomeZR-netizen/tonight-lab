"use client";

import { ArrowLeft, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { editorialEase, motionDurations } from "@/lib/motion-presets";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function formatIssueTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [issueTime, setIssueTime] = useState<string>("--:--");

  useEffect(() => {
    console.error("[tonight-lab:root]", error);
    setIssueTime(formatIssueTime(new Date()));
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[hsl(44_38%_97%)] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-amber-100/40 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-rose-50/50 to-transparent" />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-20 text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionDurations.base, ease: editorialEase }}
      >
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-slate-500">
          Tonight Lab · Field log
        </p>

        <h1 className="mt-7 font-display text-[44px] font-medium leading-[1.05] tracking-[-0.01em] text-slate-950 sm:text-[58px]">
          今晚出了点意外。
        </h1>

        <p className="mt-7 max-w-xl text-[15px] leading-[1.85] text-slate-600">
          内容暂时没接上，编辑部正在把今晚的卡片重新摊开。你可以再试一次，或者先回到信息流，看看其它正在被整理的今晚。
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white shadow-phone transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            <RotateCcw className="h-4 w-4" />
            再来一次
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/82 px-5 text-sm font-semibold text-slate-800 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4" />
            回到信息流
          </Link>
        </div>

        <p className="mt-14 font-sans text-[11px] uppercase tracking-[0.32em] text-slate-400">
          Issue · {issueTime}
          {error.digest ? ` · ${error.digest.slice(0, 8)}` : ""}
        </p>
      </motion.div>
    </main>
  );
}
