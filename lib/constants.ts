import type {
  FoodActionVariant,
  MicroTripActionVariant,
  RecoveryActionVariant,
  SportsActionVariant,
} from "./types";

export const FOOD_ACTION_CHIPS: ReadonlyArray<{
  id: string;
  label: string;
  variant: FoodActionVariant;
}> = [
  { id: "food-spicy", label: "Spicy", variant: "spicy" },
  { id: "food-no-delivery", label: "No delivery", variant: "no-delivery" },
  { id: "food-alone", label: "Eating alone", variant: "alone" },
  { id: "food-low-calorie", label: "Low calorie", variant: "low-calorie" },
  { id: "food-budget-30", label: "Budget 30", variant: "budget-30" },
];

export const MICRO_TRIP_ACTION_CHIPS: ReadonlyArray<{
  id: string;
  label: string;
  variant: MicroTripActionVariant;
}> = [
  { id: "trip-less-walk", label: "Less walking", variant: "less-walk" },
  { id: "trip-photo-friendly", label: "Photo-friendly", variant: "photo-friendly" },
  { id: "trip-solo", label: "Solo", variant: "solo" },
  { id: "trip-date", label: "Date", variant: "date" },
  { id: "trip-low-budget", label: "Low budget", variant: "low-budget" },
];

export const SPORTS_ACTION_CHIPS: ReadonlyArray<{
  id: string;
  label: string;
  variant: SportsActionVariant;
}> = [
  { id: "sports-home", label: "Home win", variant: "home" },
  { id: "sports-draw", label: "Draw", variant: "draw" },
  { id: "sports-away", label: "Away win", variant: "away" },
  { id: "sports-player-focus", label: "Player focus", variant: "player-focus" },
  { id: "sports-one-line", label: "One-line", variant: "one-line" },
];

export const RECOVERY_ACTION_CHIPS: ReadonlyArray<{
  id: string;
  label: string;
  variant: RecoveryActionVariant;
}> = [
  { id: "recovery-anxious", label: "Anxious", variant: "anxious" },
  { id: "recovery-lying-down", label: "Lying down", variant: "lying-down" },
  { id: "recovery-five-min", label: "Five minutes", variant: "five-min" },
  { id: "recovery-no-advice", label: "No advice", variant: "no-advice" },
  { id: "recovery-sleep", label: "Sleep", variant: "sleep" },
];

export const MOCK_TIMESTAMP = "2026-05-16T12:00:00+08:00";
