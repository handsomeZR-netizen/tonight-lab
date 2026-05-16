"use client";

import { FoodDecisionCard } from "@/components/cards/FoodDecisionCard";
import { MicroTripCard } from "@/components/cards/MicroTripCard";
import { RecoveryCard } from "@/components/cards/RecoveryCard";
import { SportsPreMatchCard } from "@/components/cards/SportsPreMatchCard";
import type { FeedItem } from "@/lib/types";
import { VideoPlaceholderItem } from "./VideoPlaceholderItem";

type FeedItemRendererProps = {
  item: FeedItem;
  onUpdate: (updatedItem: FeedItem) => void;
};

export function FeedItemRenderer({ item, onUpdate }: FeedItemRendererProps) {
  switch (item.type) {
    case "video":
      return <VideoPlaceholderItem item={item} />;
    case "food_decision":
      return <FoodDecisionCard item={item} onUpdate={onUpdate} />;
    case "micro_trip":
      return <MicroTripCard item={item} onUpdate={onUpdate} />;
    case "sports_pre_match":
      return <SportsPreMatchCard item={item} onUpdate={onUpdate} />;
    case "recovery":
      return <RecoveryCard item={item} onUpdate={onUpdate} />;
  }
}
