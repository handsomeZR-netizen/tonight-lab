import Image from "next/image";
import type { ReactNode } from "react";

import { BackToFeedButton } from "@/components/detail/BackToFeedButton";
import { SavedRibbon } from "@/components/detail/SavedRibbon";
import {
  AnimatedHeading,
  GrainOverlay,
  IssueRibbon,
  Keyline,
  MetaCell,
  NumberMarker,
} from "@/components/editorial";
import { ToneScene } from "@/components/scene/ToneScene";
import type { ToneSceneOptions } from "@/components/scene/ToneSceneInner";
import { cn } from "@/lib/cn";
import type { DetailTone } from "@/lib/detail-content";
import { toneSectionTitle, toneTokens } from "@/lib/tone-tokens";

type MetaCellSpec = { label: string; value: string };

type DetailPageShellProps = {
  tone: DetailTone;
  title: string;
  kicker: string;
  description: string;
  cover: string;
  heroLede?: string;
  heroMeta?: string;
  metaCells?: MetaCellSpec[];
  sceneOptions?: ToneSceneOptions;
  children: ReactNode;
};

const pageBg: Record<DetailTone, string> = {
  food: "bg-[radial-gradient(circle_at_8%_-12%,rgba(251,191,36,0.22),transparent_36%),radial-gradient(circle_at_92%_-6%,rgba(244,114,182,0.16),transparent_34%),hsl(40_44%_97%)]",
  trip: "bg-[radial-gradient(circle_at_10%_-10%,rgba(56,189,248,0.22),transparent_36%),radial-gradient(circle_at_92%_-4%,rgba(167,139,250,0.16),transparent_34%),hsl(204_40%_97%)]",
  sports:
    "bg-[radial-gradient(circle_at_10%_-10%,rgba(16,185,129,0.22),transparent_36%),radial-gradient(circle_at_92%_-4%,rgba(132,204,22,0.18),transparent_34%),hsl(150_30%_97%)]",
  recovery:
    "bg-[radial-gradient(circle_at_10%_-10%,rgba(139,92,246,0.24),transparent_36%),radial-gradient(circle_at_92%_-4%,rgba(34,211,238,0.16),transparent_34%),hsl(258_36%_97%)]",
};

const toneLede: Record<DetailTone, string> = {
  food: "这次不给你一个清单，给你一组可拨动的旋钮。",
  trip: "3 小时，不需要找到自己，先换一下空气。",
  sports: "别等到开哨才有立场。把视角先定下来。",
  recovery: "12 分钟，不解决人生，只把今晚调轻一点。",
};

const toneEditionLabel: Record<DetailTone, string> = {
  food: "TONIGHT EDITION",
  trip: "FIELD GUIDE",
  sports: "MATCH ROOM",
  recovery: "AFTER HOURS",
};

function getReadEstimate(tone: DetailTone): string {
  switch (tone) {
    case "food":
      return "3 min play";
    case "trip":
      return "4 min plan";
    case "sports":
      return "2 min brief";
    case "recovery":
      return "5 min ritual";
  }
}

export function DetailPageShell({
  tone,
  title,
  kicker,
  description,
  cover,
  heroLede,
  heroMeta,
  metaCells,
  sceneOptions,
  children,
}: DetailPageShellProps) {
  const tokens = toneTokens[tone];
  const today = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
    .format(new Date())
    .toUpperCase();

  const ribbonLede = heroLede ?? toneLede[tone];
  const ribbonMeta = heroMeta ?? `${today} · ${getReadEstimate(tone)}`;

  const defaultMeta: MetaCellSpec[] = [
    { label: "Date", value: today },
    { label: "Section", value: toneEditionLabel[tone] },
    { label: "Read", value: getReadEstimate(tone) },
    { label: "Edition", value: `№ ${tokens.issueNumber}` },
  ];
  const cells = metaCells ?? defaultMeta;

  return (
    <main className={cn("relative min-h-screen overflow-hidden text-slate-950", pageBg[tone])}>
      {/* Hero — full-bleed editorial */}
      <section className="relative isolate min-h-[78svh] overflow-hidden">
        {/* L1 cover blur layer */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            alt=""
            src={cover}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
            style={{ filter: "blur(40px) saturate(1.05)", transform: "scale(1.06)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.78)_55%,rgba(255,255,255,0.92)_100%)]"
          />
        </div>

        {/* L2 Three.js scene */}
        <ToneScene
          tone={tone}
          options={sceneOptions}
          fallbackSrc={cover}
          fallbackAlt={title}
          className="-z-10 mix-blend-soft-light"
        />

        {/* L3 grain */}
        <GrainOverlay opacity={0.07} className="-z-[5]" />

        {/* Back button */}
        <div className="absolute left-4 right-4 top-5 z-20 flex items-center justify-between gap-3 sm:left-6 sm:right-6 lg:left-8 lg:right-8">
          <BackToFeedButton />
          <SavedRibbon tone={tone} />
        </div>

        {/* L4 content */}
        <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-5xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24">
          <div className="flex items-center gap-4">
            <NumberMarker n={tokens.issueNumber} tone={tone} size="lg" />
            <Keyline variant="short" />
            <span className={cn("text-kicker font-semibold uppercase", tokens.accentText)}>
              {kicker}
            </span>
          </div>

          <AnimatedHeading className="mt-8 max-w-4xl text-balance font-display font-medium text-display-xl text-slate-950">
            {title}
          </AnimatedHeading>

          <p className="mt-8 max-w-2xl text-lg leading-[1.78] text-slate-700">
            {description}
          </p>

          <Keyline label="今日情境 · Tonight's Brief" className="mt-14 max-w-3xl" />

          <dl className="mt-6 grid max-w-3xl grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-4">
            {cells.map((cell) => (
              <MetaCell key={cell.label} label={cell.label} value={cell.value} />
            ))}
          </dl>
        </div>
      </section>

      {/* Issue ribbon under hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <IssueRibbon
          tone={tone}
          issue={tokens.badge}
          section={toneSectionTitle[tone]}
          lede={ribbonLede}
          meta={ribbonMeta}
        />
      </section>

      {/* Feature image — "first plate" */}
      <section className="relative z-10 mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <figure
          className="relative overflow-hidden rounded-[36px] border border-white/70 shadow-phone"
          style={{ viewTransitionName: `card-${tone}-cover` }}
        >
          <div className="relative aspect-[16/9] bg-slate-950">
            <Image
              alt={title}
              src={cover}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0)_45%,rgba(2,6,23,0.6)_100%)]"
            />
            <figcaption className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-3 text-white">
              <p className="font-display italic text-lg leading-snug max-w-xl">
                先玩 30 秒，再把结果带走。
              </p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/72">
                Plate · {toneEditionLabel[tone]}
              </p>
            </figcaption>
          </div>
        </figure>
      </section>

      {/* Body */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        {children}
      </section>
    </main>
  );
}
