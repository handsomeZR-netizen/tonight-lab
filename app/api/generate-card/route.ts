import { NextResponse } from "next/server";
import { z } from "zod";

import { transformCard } from "@/lib/card-transforms";
import { mockAiCards } from "@/lib/mock-feed";
import type {
  AiFeedCard,
  FeedItemType,
  GenerateCardResponse,
} from "@/lib/types";

const feedItemTypeSchema = z.enum([
  "video",
  "food_decision",
  "micro_trip",
  "sports_pre_match",
  "recovery",
]);

const aiFeedCardSchema = z
  .object({
    type: feedItemTypeSchema.exclude(["video"]),
  })
  .passthrough();

const actionSchema = z.object({
  id: z.string().min(1),
  label: z.string().optional(),
  intent: z.literal("refine").optional(),
});

const requestSchema = z.object({
  cardType: feedItemTypeSchema.optional(),
  action: actionSchema.optional(),
  currentCard: aiFeedCardSchema.optional(),
});

export async function POST(
  request: Request,
): Promise<NextResponse<GenerateCardResponse | { error: string; issues?: unknown }>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { currentCard, action, cardType } = parsed.data;

  if (currentCard && action?.id) {
    return NextResponse.json({
      card: transformCard(currentCard as unknown as AiFeedCard, action.id),
      source: "mock",
    });
  }

  return NextResponse.json({
    card: getFirstMatchingCard(cardType),
    source: "mock",
  });
}

function getFirstMatchingCard(cardType: FeedItemType | undefined): AiFeedCard {
  if (!cardType || cardType === "video") {
    return mockAiCards[0];
  }

  return mockAiCards.find((card) => card.type === cardType) ?? mockAiCards[0];
}
