"use client";

import { useMemo, useState } from "react";
// @ts-ignore -- provided by the companion data worktree before branches merge.
import { mockFeedItems } from "@/lib/mock-feed";
import { BottomNavMock } from "./BottomNavMock";
import { FeedItemRenderer } from "./FeedItemRenderer";
import type { FeedItem, FeedItemUpdate } from "./feed-types";

function normalizeItems(items: unknown): FeedItem[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter(
    (item): item is FeedItem =>
      Boolean(item) &&
      typeof item === "object" &&
      "id" in item &&
      "type" in item,
  );
}

export function FeedViewport() {
  const initialItems = useMemo(() => normalizeItems(mockFeedItems), []);
  const [items, setItems] = useState<FeedItem[]>(initialItems);

  function updateItem(id: string, update: FeedItemUpdate) {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return typeof update === "function" ? update(item) : update;
      }),
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-center px-6 pb-3 pt-12 text-sm font-semibold text-white">
        <div className="flex items-center gap-6 rounded-full border border-white/10 bg-black/28 px-5 py-2 backdrop-blur-xl">
          <span className="text-white/54">关注</span>
          <span className="relative text-white">
            推荐
            <span className="absolute -bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-white" />
          </span>
        </div>
      </header>
      <div className="scrollbar-none h-full w-full snap-y snap-mandatory overflow-y-auto overscroll-contain">
        {items.map((item) => (
          <FeedItemRenderer
            item={item}
            key={item.id}
            onUpdate={(update) => updateItem(item.id, update)}
          />
        ))}
      </div>
      <BottomNavMock />
    </div>
  );
}

