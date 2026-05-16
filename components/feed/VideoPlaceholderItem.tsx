import {
  Heart,
  MessageCircle,
  Music2,
  Share2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/cn";
import type { VideoFeedItem } from "@/lib/types";

type VideoPlaceholderItemProps = {
  item: VideoFeedItem;
};

const toneBackground: Record<VideoFeedItem["posterTone"], string> = {
  food: "bg-[radial-gradient(circle_at_30%_18%,rgba(251,146,60,0.32),transparent_32%),radial-gradient(circle_at_78%_18%,rgba(244,63,94,0.2),transparent_34%),linear-gradient(145deg,#24100b,#050507_58%,#130c0c)]",
  trip: "bg-[radial-gradient(circle_at_30%_18%,rgba(56,189,248,0.26),transparent_32%),radial-gradient(circle_at_78%_18%,rgba(250,204,21,0.16),transparent_34%),linear-gradient(145deg,#0b1631,#050507_58%,#1a1023)]",
  sports:
    "bg-[radial-gradient(circle_at_30%_18%,rgba(132,204,22,0.26),transparent_32%),radial-gradient(circle_at_78%_18%,rgba(34,211,238,0.14),transparent_34%),linear-gradient(145deg,#07170d,#050507_58%,#07121d)]",
};

export function VideoPlaceholderItem({ item }: VideoPlaceholderItemProps) {
  return (
    <article className="relative flex h-full w-full snap-start snap-always flex-col justify-end overflow-hidden bg-[#08080b] px-5 pb-24 pt-16 text-white">
      <div className={cn("absolute inset-0", toneBackground[item.posterTone])} />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute left-1/2 top-[42%] flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-black shadow-[0_0_42px_rgba(255,255,255,0.34)]">
          <Music2 fill="currentColor" size={34} />
        </div>
      </div>
      <aside className="absolute bottom-32 right-4 z-10 flex flex-col items-center gap-5">
        <Action icon={Heart} label={item.stats.likes} />
        <Action icon={MessageCircle} label={item.stats.comments} />
        <Action icon={Share2} label={item.stats.shares} />
        <div className="mt-1 h-11 w-11 rounded-full border border-white/20 bg-[conic-gradient(from_0deg,#111,#fff,#111)] p-1">
          <div className="h-full w-full rounded-full bg-black" />
        </div>
      </aside>
      <div className="relative z-10 max-w-[292px]">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs font-medium text-white/84 backdrop-blur">
          <Sparkles size={13} />
          AI-ready video slot
        </div>
        <p className="text-sm font-semibold text-white">@{item.author}</p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight">{item.title}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-5 text-white/78">{item.caption}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/80" key={tag}>
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-xs text-white/70 backdrop-blur">
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
