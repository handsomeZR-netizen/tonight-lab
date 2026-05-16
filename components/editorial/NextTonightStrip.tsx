import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BackToFeedButton } from "@/components/detail/BackToFeedButton";
import { cn } from "@/lib/cn";
import {
  foodDetail,
  recoveryDetail,
  sportsDetail,
  tripDetail,
  type DetailTone,
} from "@/lib/detail-content";
import { toneTokens } from "@/lib/tone-tokens";

import { Keyline } from "./Keyline";
import { NumberMarker } from "./NumberMarker";

type NextTonightStripProps = {
  currentTone: DetailTone;
  className?: string;
};

type NextItem = {
  tone: DetailTone;
  href: string;
  title: string;
  kicker: string;
  cover: string;
  invite: string;
};

const ENTRIES: NextItem[] = [
  {
    tone: "food",
    href: "/cards/food",
    title: foodDetail.title,
    kicker: foodDetail.kicker,
    cover: foodDetail.cover,
    invite: "今晚也可能你需要先把胃口拆成几个旋钮。",
  },
  {
    tone: "trip",
    href: "/cards/trip",
    title: tripDetail.title,
    kicker: tripDetail.kicker,
    cover: tripDetail.cover,
    invite: "如果你想离开桌前 3 小时，先看一条不赶场的路线。",
  },
  {
    tone: "sports",
    href: "/cards/sports",
    title: sportsDetail.title,
    kicker: sportsDetail.kicker,
    cover: sportsDetail.cover,
    invite: "比分开哨前 15 分钟，给自己一个观赛立场。",
  },
  {
    tone: "recovery",
    href: "/cards/recovery",
    title: recoveryDetail.title,
    kicker: recoveryDetail.kicker,
    cover: recoveryDetail.cover,
    invite: "今晚不用变好，只需要把刺激慢慢关掉。",
  },
];

export function NextTonightStrip({ currentTone, className }: NextTonightStripProps) {
  const others = ENTRIES.filter((entry) => entry.tone !== currentTone);
  const todayLabel = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  return (
    <footer
      className={cn(
        "mx-auto mt-24 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8",
        className,
      )}
    >
      <Keyline label="下一张 · Next on Tonight" />

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_2.15fr] lg:items-start">
        <div className="flex flex-col gap-6">
          <NumberMarker n="∞" tone={currentTone} size="lg" />
          <p className="font-display text-3xl italic leading-[1.15] text-slate-900">
            把今晚剩下的可能性
            <br />
            留在这里翻一翻。
          </p>
          <BackToFeedButton />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {others.map((entry) => {
            const tokens = toneTokens[entry.tone];
            return (
              <Link
                key={entry.tone}
                href={entry.href}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-[28px] border border-slate-200 bg-white/82 p-4 shadow-soft transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-phone"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    alt={entry.title}
                    src={entry.cover}
                    fill
                    sizes="(max-width: 640px) 92vw, 24vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(2,6,23,0.42)_100%)]"
                  />
                  <span
                    className={cn(
                      "absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur",
                      tokens.accentBorder,
                      tokens.accentText,
                    )}
                  >
                    {tokens.badge}
                  </span>
                </div>
                <div>
                  <p
                    className={cn(
                      "text-[11px] font-semibold uppercase tracking-[0.18em]",
                      tokens.accentText,
                    )}
                  >
                    {entry.kicker}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-slate-950">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {entry.invite}
                  </p>
                </div>
                <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white opacity-0 transition group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-2 border-t border-slate-300/70 pt-6">
        <p className="font-display italic text-sm text-slate-500">
          — Tonight 编辑部 / Edited at {todayLabel}
        </p>
        <p className="text-[10px] uppercase tracking-[0.32em] text-slate-400">
          Tonight Lab · Issue {toneTokens[currentTone].issueNumber}
        </p>
      </div>
    </footer>
  );
}
