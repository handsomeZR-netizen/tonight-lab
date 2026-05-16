"use client";

import type { KeyboardEvent } from "react";
import { useCallback, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { mockFeedItems } from "@/lib/mock-feed";
import type { FeedItem } from "@/lib/types";
import { BottomNavMock } from "./BottomNavMock";
import { FeedItemRenderer } from "./FeedItemRenderer";
import { KeyboardHint } from "./KeyboardHint";

export function FeedViewport() {
  const [items, setItems] = useState<FeedItem[]>(mockFeedItems);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focusedOnce, setFocusedOnce] = useState(false);
  const hasFocusedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  function handleCardUpdate(updatedItem: FeedItem) {
    setItems((current) =>
      current.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const container = scrollRef.current;
      if (!container) return;

      const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
      const step = container.clientHeight;

      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          event.preventDefault();
          container.scrollBy({ top: step, behavior });
          break;
        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          container.scrollBy({ top: -step, behavior });
          break;
        case "Home":
          event.preventDefault();
          container.scrollTo({ top: 0, behavior });
          break;
        case "End":
          event.preventDefault();
          container.scrollTo({ top: container.scrollHeight, behavior });
          break;
        case "Escape":
          event.preventDefault();
          container.scrollTo({ top: 0, behavior });
          break;
        default:
          break;
      }
    },
    [prefersReducedMotion],
  );

  const handleWheel = useCallback(() => {
    scrollRef.current?.focus({ preventScroll: true });
  }, []);

  const handleFocus = useCallback(() => {
    if (hasFocusedRef.current) return;
    hasFocusedRef.current = true;
    setFocusedOnce(true);
  }, []);

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[hsl(220_14%_98%)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-center px-6 pb-3 pt-12 text-sm font-semibold">
        <div className="flex items-center gap-6 rounded-full border border-slate-200/80 bg-white/80 px-5 py-2 text-slate-600 shadow-soft backdrop-blur">
          <span className="text-slate-400">关注</span>
          <span className="relative text-slate-900">
            推荐
            <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-slate-900" />
          </span>
        </div>
      </header>
      <div
        aria-label="Tonight Lab 信息流，可使用方向键切换卡片"
        className="scrollbar-none h-full w-full snap-y snap-mandatory overflow-y-auto overscroll-contain outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        ref={scrollRef}
        role="region"
        tabIndex={0}
      >
        {items.map((item) => (
          <FeedItemRenderer item={item} key={item.id} onUpdate={handleCardUpdate} />
        ))}
      </div>
      <KeyboardHint focusedOnce={focusedOnce} hovered={hovered} />
      <BottomNavMock />
    </div>
  );
}
