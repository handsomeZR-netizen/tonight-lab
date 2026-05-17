import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github, Mail } from "lucide-react";

import {
  foodDetail,
  recoveryDetail,
  sportsDetail,
  tripDetail,
  type DetailTone,
} from "@/lib/detail-content";

export const metadata: Metadata = {
  title: "Press Kit",
  description:
    "Tonight Lab · 路演与媒体素材包，包含产品简介、视觉卡片和联系方式。",
  alternates: {
    canonical: "/press",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    title: "Press Kit · Tonight Lab",
    description:
      "路演与媒体素材包：产品简介、四张视觉卡片、技术栈和联系方式。",
    siteName: "Tonight Lab",
    url: "/press",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Tonight Lab · Press Kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press Kit · Tonight Lab",
    description:
      "路演与媒体素材包：产品简介、四张视觉卡片、技术栈和联系方式。",
    images: ["/opengraph-image"],
  },
};

type CardPreview = {
  tone: DetailTone;
  href: string;
  title: string;
  kicker: string;
  ogPath: string;
  alt: string;
};

const cards: CardPreview[] = [
  {
    tone: "food",
    href: "/cards/food",
    title: foodDetail.title,
    kicker: foodDetail.kicker,
    ogPath: "/cards/food/opengraph-image",
    alt: `${foodDetail.title} · Tonight Lab`,
  },
  {
    tone: "trip",
    href: "/cards/trip",
    title: tripDetail.title,
    kicker: tripDetail.kicker,
    ogPath: "/cards/trip/opengraph-image",
    alt: `${tripDetail.title} · Tonight Lab`,
  },
  {
    tone: "sports",
    href: "/cards/sports",
    title: sportsDetail.title,
    kicker: sportsDetail.kicker,
    ogPath: "/cards/sports/opengraph-image",
    alt: `${sportsDetail.title} · Tonight Lab`,
  },
  {
    tone: "recovery",
    href: "/cards/recovery",
    title: recoveryDetail.title,
    kicker: recoveryDetail.kicker,
    ogPath: "/cards/recovery/opengraph-image",
    alt: `${recoveryDetail.title} · Tonight Lab`,
  },
];

type StackItem = {
  name: string;
  version: string;
  role: string;
};

const stack: StackItem[] = [
  { name: "Next.js", version: "15", role: "App Router 框架" },
  { name: "React", version: "19", role: "UI runtime" },
  { name: "TypeScript", version: "5", role: "类型系统" },
  { name: "Tailwind CSS", version: "3", role: "样式系统" },
  { name: "Framer Motion", version: "12", role: "微交互" },
  { name: "Three.js", version: "0.184", role: "WebGL tone scenes" },
  { name: "Zod", version: "3", role: "运行时校验" },
  { name: "Lucide", version: "0.511", role: "图标" },
];

const aboutParagraphs = [
  "Tonight Lab 是一组接近产品评审级别的 AI 信息流原型，把“今晚到底做什么”包装成一段可以滑动、可以下钻、可以收藏的沉浸式叙事。",
  "它不是普通的卡片列表，而是把短视频式滑动、AI 情境推荐、杂志化详情页、WebGL 氛围层和定制生成图资产收进同一个 demo，让一个轻量决策看起来像一支已经准备好上台路演的小型产品。",
  "四个场景覆盖晚餐、city walk、赛前观赛和下班回血。每张卡片都有独立的交互逻辑、独立的色彩系统和独立的 signature interaction —— 它们要做的不是给出唯一答案，而是把今晚的选择压成可以立刻执行的 2-3 个动作。",
];

export default function PressKitPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[hsl(44_38%_97%)] text-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-32 pt-10 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/70 px-4 py-2 text-slate-700 backdrop-blur transition hover:border-slate-400 hover:text-slate-950"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            回到 Tonight Lab
          </Link>
          <span className="hidden sm:inline">Tonight Lab · Press Kit</span>
        </nav>

        <header className="mt-16 sm:mt-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700">
            For press &middot; portfolio &middot; demo day
          </p>
          <h1 className="mt-6 font-display text-[clamp(48px,7vw,96px)] font-semibold leading-[0.95] tracking-[-0.015em] text-slate-950">
            Tonight Lab
            <span className="block text-slate-400">Press Kit</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            一组把“今晚到底做什么”做成 AI 情境叙事的沉浸式信息流原型 ——
            把短视频节奏、杂志详情页和 WebGL 氛围放进同一支 demo。
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-slate-300/70 bg-white/70 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-600">
              Status · Editorial Demo
            </span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-amber-800">
              4 Tones · 4 Scenes
            </span>
            <span className="rounded-full border border-slate-300/70 bg-white/70 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-600">
              Next.js 15 · React 19
            </span>
          </div>
        </header>

        <PressDivider />

        <Section
          label="01"
          eyebrow="About"
          title="什么是 Tonight Lab"
        >
          <div className="space-y-6 text-lg leading-8 text-slate-700">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>

        <PressDivider />

        <Section
          label="02"
          eyebrow="Cards"
          title="四个今晚"
          intro="每张卡都对应一个 tone、一组配色和一段独立的交互。点击图片可以直接跳到对应详情页。"
        >
          <div className="grid gap-8 sm:grid-cols-2">
            {cards.map((card) => (
              <CardPreviewBlock key={card.tone} card={card} />
            ))}
          </div>
        </Section>

        <PressDivider />

        <Section
          label="03"
          eyebrow="Stack"
          title="技术栈"
          intro="不外链 shields.io，用本地 pill 复刻徽章风格。"
        >
          <ul className="flex flex-wrap gap-3">
            {stack.map((item) => (
              <li key={item.name}>
                <StackPill item={item} />
              </li>
            ))}
          </ul>
        </Section>

        <PressDivider />

        <Section
          label="04"
          eyebrow="Contact"
          title="联系"
          intro="路演、合作、技术细节都可以从这里开始。"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ContactCard
              icon={<Mail className="h-5 w-5" />}
              label="Email"
              value="hello@tonight-lab.app"
              href="mailto:hello@tonight-lab.app"
            />
            <ContactCard
              icon={<Github className="h-5 w-5" />}
              label="GitHub"
              value="github.com/tonight-lab"
              href="#"
            />
          </div>
        </Section>

        <footer className="mt-24 border-t border-slate-200/80 pt-8 text-xs uppercase tracking-[0.24em] text-slate-500">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>&copy; Tonight Lab · Press Kit</span>
            <span>Made for demo days &middot; not production</span>
          </div>
        </footer>
      </div>
    </main>
  );
}

function Section({
  label,
  eyebrow,
  title,
  intro,
  children,
}: {
  label: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20 sm:mt-28">
      <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
        <div className="space-y-2">
          <p className="font-display text-5xl italic text-slate-300">
            {label}
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700">
            {eyebrow}
          </p>
        </div>
        <div className="space-y-8">
          <h2 className="font-display text-[clamp(32px,4vw,56px)] font-semibold leading-[1.05] tracking-[-0.01em] text-slate-950">
            {title}
          </h2>
          {intro && (
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              {intro}
            </p>
          )}
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

function PressDivider() {
  return (
    <div
      aria-hidden
      className="mt-20 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(15,23,42,0.18)_16%,rgba(15,23,42,0.18)_84%,transparent)] sm:mt-28"
    />
  );
}

function CardPreviewBlock({ card }: { card: CardPreview }) {
  return (
    <Link
      href={card.href}
      className="group block overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/70 shadow-soft backdrop-blur transition hover:-translate-y-1 hover:shadow-phone"
    >
      <div className="relative aspect-[1200/630] w-full overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.ogPath}
          alt={card.alt}
          width={1200}
          height={630}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      <div className="space-y-2 p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700">
          {card.tone}
        </p>
        <h3 className="font-display text-2xl leading-tight text-slate-950 sm:text-3xl">
          {card.title}
        </h3>
        <p className="text-sm leading-6 text-slate-600">{card.kicker}</p>
      </div>
    </Link>
  );
}

function StackPill({ item }: { item: StackItem }) {
  return (
    <div className="inline-flex items-stretch overflow-hidden rounded-full border border-slate-300/80 text-xs font-semibold tracking-[0.04em] shadow-soft">
      <span className="bg-slate-900 px-3 py-1.5 text-white">
        {item.name}
      </span>
      <span className="bg-amber-100 px-3 py-1.5 text-amber-900">
        {item.version}
      </span>
      <span className="hidden bg-white/80 px-3 py-1.5 text-slate-600 sm:inline">
        {item.role}
      </span>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/70 px-5 py-4 shadow-soft backdrop-blur transition hover:border-amber-300 hover:bg-amber-50/60"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
          {label}
        </span>
        <span className="font-display text-lg text-slate-950 group-hover:text-amber-900">
          {value}
        </span>
      </span>
    </a>
  );
}
