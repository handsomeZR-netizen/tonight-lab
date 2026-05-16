import Link from "next/link";

import type { DetailTone } from "@/lib/detail-content";
import {
  foodDetail,
  recoveryDetail,
  sportsDetail,
  tripDetail,
} from "@/lib/detail-content";
import { toneTokens } from "@/lib/tone-tokens";

type SceneEntry = {
  tone: DetailTone;
  href: string;
  title: string;
  kicker: string;
};

const sceneEntries: SceneEntry[] = [
  {
    tone: "food",
    href: "/cards/food",
    title: "今晚吃什么",
    kicker: foodDetail.kicker,
  },
  {
    tone: "trip",
    href: "/cards/trip",
    title: "3 小时城市逃逸",
    kicker: tripDetail.kicker,
  },
  {
    tone: "sports",
    href: "/cards/sports",
    title: "赛前 15 分钟",
    kicker: sportsDetail.kicker,
  },
  {
    tone: "recovery",
    href: "/cards/recovery",
    title: "下班回血",
    kicker: recoveryDetail.kicker,
  },
];

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[hsl(44_38%_97%)] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-amber-100/40 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-rose-50/50 to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col px-6 py-20 lg:py-24">
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-slate-500">
          Tonight Lab · Issue not on the rack
        </p>

        <h1 className="mt-7 max-w-3xl font-display text-[44px] font-medium leading-[1.05] tracking-[-0.01em] text-slate-950 sm:text-[62px] lg:text-[76px]">
          这一夜没有这一页。
        </h1>

        <p className="mt-7 max-w-xl text-[15px] leading-[1.85] text-slate-600">
          你访问的路径在 Tonight Lab 里没有对应卡片。试试下面四个今晚，看看哪一个更接近你现在想做的那件小事。
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sceneEntries.map((scene) => {
            const tokens = toneTokens[scene.tone];
            return (
              <Link
                key={scene.tone}
                href={scene.href}
                className={`group flex h-full flex-col rounded-xl border p-5 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:shadow-phone ${tokens.accentBorder} ${tokens.accentBg}`}
              >
                <p
                  className={`font-sans text-[11px] font-medium uppercase tracking-[0.24em] ${tokens.accentText}`}
                >
                  {tokens.badge}
                </p>
                <h2
                  className={`mt-5 font-display text-[26px] font-medium leading-[1.15] ${tokens.ink}`}
                >
                  {scene.title}
                </h2>
                <p
                  className={`mt-3 text-[13px] leading-[1.7] ${tokens.inkMuted}`}
                >
                  {scene.kicker}
                </p>
                <span
                  className={`mt-auto pt-6 font-sans text-[11px] font-medium uppercase tracking-[0.24em] ${tokens.accentText}`}
                >
                  进入今晚 →
                </span>
              </Link>
            );
          })}
        </div>

        <p className="mt-16 font-sans text-[11px] uppercase tracking-[0.32em] text-slate-400">
          Tonight Lab · 404
        </p>
      </div>
    </main>
  );
}
