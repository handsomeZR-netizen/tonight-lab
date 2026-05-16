import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BackToFeedButton() {
  return (
    <Link
      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/86 px-4 text-sm font-semibold text-slate-800 shadow-soft backdrop-blur transition hover:border-slate-300 hover:bg-white"
      href="/#experience"
    >
      <ArrowLeft className="h-4 w-4" />
      回到信息流
    </Link>
  );
}
