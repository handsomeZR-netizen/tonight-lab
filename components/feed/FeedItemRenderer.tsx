"use client";

// @ts-ignore -- provided by the companion card worktree before branches merge.
import { AICard } from "@/components/cards/AICard";
import type { FeedItem, FeedItemUpdate } from "./feed-types";
import { VideoPlaceholderItem } from "./VideoPlaceholderItem";

type FeedItemRendererProps = {
  item: FeedItem;
  onUpdate: (update: FeedItemUpdate) => void;
};

export function FeedItemRenderer({ item, onUpdate }: FeedItemRendererProps) {
  switch (item.type) {
    case "video":
      return <VideoPlaceholderItem item={item} />;
    default:
      return (
        <section className="flex h-full w-full snap-start snap-always items-center justify-center overflow-hidden bg-[#08080b] px-4 pb-24 pt-16">
          <AICard item={item} onUpdate={onUpdate} />
        </section>
      );
  }
}

