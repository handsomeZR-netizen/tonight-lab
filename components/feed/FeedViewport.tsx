"use client";

import { useState } from "react";

import { mockFeedItems } from "@/lib/mock-feed";
import type { FeedItem } from "@/lib/types";
import { BottomNavMock } from "./BottomNavMock";
import { FeedItemRenderer } from "./FeedItemRenderer";

export function FeedViewport() {
  const [items, setItems] = useState<FeedItem[]>(mockFeedItems);

  function handleCardUpdate(updatedItem: FeedItem) {
    setItems((current) =>
      current.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[hsl(220_14%_98%)]">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-center px-6 pb-3 pt-12 text-sm font-semibold">
        <div className="flex items-center gap-6 rounded-full border border-slate-200/80 bg-white/80 px-5 py-2 text-slate-600 shadow-soft backdrop-blur">
          <span className="text-slate-400">关注</span>
          <span className="relative text-slate-900">
            推荐
            <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-slate-900" />
          </span>
        </div>
      </header>
      <div className="scrollbar-none h-full w-full snap-y snap-mandatory overflow-y-auto overscroll-contain">
        {items.map((item) => (
          <FeedItemRenderer item={item} key={item.id} onUpdate={handleCardUpdate} />
        ))}
      </div>
      <BottomNavMock />
    </div>
  );
}
