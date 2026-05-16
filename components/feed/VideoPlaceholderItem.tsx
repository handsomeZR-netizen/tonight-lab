import {
  Heart,
  type LucideIcon,
  MessageCircle,
  Music2,
  Share2,
  Sparkles,
} from "lucide-react";
import type { FeedItem } from "./feed-types";

type VideoPlaceholderItemProps = {
  item: FeedItem;
};

function statLabel(value: unknown, fallback: string) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  return fallback;
}

export function VideoPlaceholderItem({ item }: VideoPlaceholderItemProps) {
  const tags = Array.isArray(item.tags) ? item.tags.slice(0, 3) : [];
  const stats = item.stats ?? {};

  return (
    <article className="relative flex h-full w-full snap-start snap-always flex-col justify-end overflow-hidden bg-[#08080b] px-5 pb-24 pt-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(45,212,191,0.28),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(244,63,94,0.2),transparent_32%),linear-gradient(145deg,#111827_0%,#050507_52%,#111010_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute left-1/2 top-[42%] flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/7 backdrop-blur-md">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-black shadow-[0_0_42px_rgba(255,255,255,0.34)]">
          <Music2 fill="currentColor" size={34} />
        </div>
      </div>
      <aside className="absolute bottom-32 right-4 z-10 flex flex-col items-center gap-5">
        <Action icon={Heart} label={statLabel(stats.likes, "12.8w")} />
        <Action icon={MessageCircle} label={statLabel(stats.comments, "2846")} />
        <Action icon={Share2} label={statLabel(stats.shares, "Share")} />
        <div className="mt-1 h-11 w-11 rounded-full border border-white/20 bg-[conic-gradient(from_0deg,#111,#fff,#111)] p-1">
          <div className="h-full w-full rounded-full bg-black" />
        </div>
      </aside>
      <div className="relative z-10 max-w-[292px]">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs font-medium text-white/84 backdrop-blur">
          <Sparkles size={13} />
          AI-ready video slot
        </div>
        <p className="text-sm font-semibold text-white">
          @{typeof item.creator === "string" ? item.creator : "douyin_ai_lab"}
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight">
          {typeof item.title === "string" ? item.title : "街头灵感正在生成"}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-5 text-white/78">
          {typeof item.caption === "string"
            ? item.caption
            : "A mocked full-screen video item that leaves room for just-in-time AI cards to appear in the feed."}
        </p>
        {tags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/80"
                key={tag}
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
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
      className="flex flex-col items-center gap-1 text-xs font-semibold text-white drop-shadow"
      type="button"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/12 backdrop-blur-md">
        <Icon fill="currentColor" size={24} />
      </span>
      <span>{label}</span>
    </button>
  );
}

