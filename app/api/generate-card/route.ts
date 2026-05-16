import { NextResponse } from "next/server";

import { transformCard } from "@/lib/card-transforms";
import { mockAiCards } from "@/lib/mock-feed";
import type {
  AiFeedCard,
  FeedItemType,
  GenerateCardRequest,
  GenerateCardResponse,
} from "@/lib/types";

export async function POST(request: Request): Promise<NextResponse<GenerateCardResponse>> {
  const body = await readRequestBody(request);
  const currentCard = body.currentCard;
  const actionId = body.action?.id;

  if (currentCard && actionId) {
    return NextResponse.json({
      card: transformCard(currentCard, actionId),
      source: "mock",
    });
  }

  return NextResponse.json({
    card: getFirstMatchingCard(body.cardType),
    source: "mock",
  });
}

async function readRequestBody(request: Request): Promise<GenerateCardRequest> {
  try {
    const value: unknown = await request.json();
    return isRecord(value) ? parseGenerateCardRequest(value) : {};
  } catch {
    return {};
  }
}

function parseGenerateCardRequest(value: Record<string, unknown>): GenerateCardRequest {
  return {
    cardType: isFeedItemType(value.cardType) ? value.cardType : undefined,
    action: isRecord(value.action) && typeof value.action.id === "string"
      ? {
          id: value.action.id,
          label: typeof value.action.label === "string" ? value.action.label : value.action.id,
          intent: "refine",
        }
      : undefined,
    currentCard: isAiFeedCard(value.currentCard) ? value.currentCard : undefined,
  };
}

function getFirstMatchingCard(cardType: FeedItemType | undefined): AiFeedCard {
  if (!cardType || cardType === "video") {
    return mockAiCards[0];
  }

  return mockAiCards.find((card) => card.type === cardType) ?? mockAiCards[0];
}

function isFeedItemType(value: unknown): value is FeedItemType {
  return (
    value === "video" ||
    value === "food_decision" ||
    value === "micro_trip" ||
    value === "sports_pre_match" ||
    value === "recovery"
  );
}

function isAiFeedCard(value: unknown): value is AiFeedCard {
  return isRecord(value) && isFeedItemType(value.type) && value.type !== "video";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
