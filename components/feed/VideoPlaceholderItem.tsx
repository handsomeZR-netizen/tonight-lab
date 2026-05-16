import {
  Heart,
  MessageCircle,
  Music2,
  Play,
  Share2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/cn";
import type { VideoFeedItem } from "@/lib/types";

type VideoPlaceholderItemProps = {
  item: VideoFeedItem;
};

const toneAccent: Record<VideoFeedItem["posterTone"], string> = {
  food: "border-amber-100/40 bg-amber-50/15 text-amber-50",
  trip: "border-sky-100/40 bg-sky-50/15 text-sky-50",
  sports: "border-emerald-100/40 bg-emerald-50/15 text-emerald-50",
};

const toneLabel: Record<VideoFeedItem["posterTone"], string> = {
  food: "深夜热榜",
  trip: "城市灵感",
  sports: "赛前看点",
};

export function VideoPlaceholderItem({ item }: VideoPlaceholderItemProps) {
  return (
    <article className="relative flex h-full w-full snap-start snap-always flex-col justify-end overflow-hidden bg-slate-950 px-5 pb-24 pt-16 text-white">
      <Image
        alt={item.poster.alt}
        className="absolute inset-0 h-full w-full object-cover"
        fill
        priority={item.id === "video-001"}
        sizes="390px"
        src={item.poster.src}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.18)_0%,rgba(2,6,23,0.08)_35%,rgba(2,6,23,0.76)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
      <div
        className="absolute left-1/2 top-[40%] flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 shadow-[0_16px_42px_rgba(15,23,42,0.22)] backdrop-blur-md"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-950 shadow-soft">
          <Play fill="currentColor" size={28} />
        </div>
      </div>
      <aside className="absolute bottom-32 right-4 z-10 flex flex-col items-center gap-4">
        <Action icon={Heart} label={item.stats.likes} />
        <Action icon={MessageCircle} label={item.stats.comments} />
        <Action icon={Share2} label={item.stats.shares} />
        <div className="mt-1 h-10 w-10 rounded-full border border-slate-200 bg-white p-[3px] shadow-soft">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <Music2 size={14} />
          </div>
        </div>
      </aside>
      <div className="relative z-10 max-w-[292px]">
        <div className={cn("mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium shadow-soft backdrop-blur-md", toneAccent[item.posterTone])}>
          <Sparkles size={13} />
          {toneLabel[item.posterTone]}
        </div>
        <p className="text-sm font-semibold text-white/85">@{item.author}</p>
        <h2 className="mt-1.5 text-2xl font-semibold leading-tight text-white drop-shadow-sm">
          {item.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-5 text-white/76 drop-shadow-sm">
          {item.caption}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              className="rounded-full border border-white/20 bg-white/12 px-2.5 py-0.5 text-xs text-white/82 shadow-soft backdrop-blur-md"
              key={tag}
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/14 px-3 py-1.5 text-xs text-white/78 shadow-soft backdrop-blur-md">
          <Music2 className="h-3.5 w-3.5" />
          <span className="truncate">{item.soundtrack}</span>
        </div>
      </div>
    </article>
  );
}

type ActionProps = {
  icon: LucideIcon;
  label: string;
};

function Action({ icon: Icon, label }: ActionProps) {
  return (
    <button
      className="flex flex-col items-center gap-1 text-xs font-semibold text-white"
      type="button"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/16 shadow-[0_10px_28px_rgba(15,23,42,0.22)] backdrop-blur-md">
        <Icon size={20} strokeWidth={2} />
      </span>
      <span className="text-white/78 drop-shadow-sm">{label}</span>
    </button>
  );
}
