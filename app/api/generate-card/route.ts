import { NextResponse } from "next/server";

import { transformCard } from "@/lib/card-transforms";
import { mockAiCards } from "@/lib/mock-feed";
import type {
  ActionChipVariant,
  AiCardType,
  AiFeedCard,
  GenerateCardRequest,
  GenerateCardResponse,
} from "@/lib/types";

const cardTypes: readonly AiCardType[] = ["food", "micro-trip", "sports", "recovery"];
const actionVariants: readonly ActionChipVariant[] = [
  "spicy",
  "no-delivery",
  "alone",
  "low-calorie",
  "budget-30",
  "less-walk",
  "photo-friendly",
  "solo",
  "date",
  "low-budget",
  "home",
  "draw",
  "away",
  "player-focus",
  "one-line",
  "anxious",
  "lying-down",
  "five-min",
  "no-advice",
  "sleep",
];

export async function POST(request: Request): Promise<NextResponse<GenerateCardResponse>> {
  const body = await readRequestBody(request);

  if (body.currentCard && body.action) {
    return NextResponse.json({
      card: transformCard(body.currentCard, body.action),
      source: "mock",
    });
  }

  const card = getFirstMatchingCard(body.cardType);

  return NextResponse.json({ card, source: "mock" });
}

async function readRequestBody(request: Request): Promise<GenerateCardRequest> {
  try {
    const value: unknown = await request.json();
    return parseGenerateCardRequest(value);
  } catch {
    return {};
  }
}

function parseGenerateCardRequest(value: unknown): GenerateCardRequest {
  if (!isRecord(value)) {
    return {};
  }

  const cardType = isAiCardType(value.cardType) ? value.cardType : undefined;
  const action = isActionVariant(value.action) ? value.action : undefined;
  const currentCard = isAiFeedCard(value.currentCard) ? value.currentCard : undefined;

  return { cardType, action, currentCard };
}

function getFirstMatchingCard(cardType: AiCardType | undefined): AiFeedCard {
  if (!cardType) {
    return mockAiCards[0];
  }

  return mockAiCards.find((card) => card.type === cardType) ?? mockAiCards[0];
}

function isAiCardType(value: unknown): value is AiCardType {
  return typeof value === "string" && cardTypes.includes(value as AiCardType);
}

function isActionVariant(value: unknown): value is ActionChipVariant {
  return typeof value === "string" && actionVariants.includes(value as ActionChipVariant);
}

function isAiFeedCard(value: unknown): value is AiFeedCard {
  return isRecord(value) && isAiCardType(value.type);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
