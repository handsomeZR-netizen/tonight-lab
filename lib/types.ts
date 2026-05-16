export type FeedItemType = "video" | "food" | "micro-trip" | "sports" | "recovery";

export type AiCardType = Exclude<FeedItemType, "video">;

export type ActionChipVariant =
  | FoodActionVariant
  | MicroTripActionVariant
  | SportsActionVariant
  | RecoveryActionVariant;

export type FoodActionVariant =
  | "spicy"
  | "no-delivery"
  | "alone"
  | "low-calorie"
  | "budget-30";

export type MicroTripActionVariant =
  | "less-walk"
  | "photo-friendly"
  | "solo"
  | "date"
  | "low-budget";

export type SportsActionVariant =
  | "home"
  | "draw"
  | "away"
  | "player-focus"
  | "one-line";

export type RecoveryActionVariant =
  | "anxious"
  | "lying-down"
  | "five-min"
  | "no-advice"
  | "sleep";

export interface FeedItemBase {
  id: string;
  type: FeedItemType;
  createdAt: string;
}

export interface VideoAuthor {
  id: string;
  handle: string;
  displayName: string;
  avatarColor: string;
}

export interface VideoStats {
  likes: string;
  comments: string;
  shares: string;
}

export interface VideoFeedItem extends FeedItemBase {
  type: "video";
  author: VideoAuthor;
  caption: string;
  soundtrack: string;
  posterColor: string;
  tags: string[];
  stats: VideoStats;
}

export interface ActionChip<TVariant extends string = ActionChipVariant> {
  id: string;
  label: string;
  variant: TVariant;
}

export interface UserContext {
  location: string;
  localTime: string;
  weather: string;
  mood: "curious" | "hungry" | "restless" | "focused" | "tired";
  budgetCny?: number;
  companions: "alone" | "friend" | "date" | "team";
  dietaryPreference?: string;
  mobilityPreference?: "normal" | "less-walk";
}

export interface AiCardBase<TType extends AiCardType, TChip extends string>
  extends FeedItemBase {
  type: TType;
  eyebrow: string;
  headline: string;
  personalReason: string;
  confidenceLabel: string;
  selectedIntent: TChip | "default";
  userContext: UserContext;
  actionChips: ActionChip<TChip>[];
}

export interface FoodOption {
  name: string;
  cuisine: string;
  priceCny: number;
  distanceMinutes: number;
  deliveryAvailable: boolean;
  caloriesLabel: string;
  reason: string;
}

export interface FoodDecisionCardData
  extends AiCardBase<"food", FoodActionVariant> {
  mealWindow: "breakfast" | "lunch" | "dinner" | "late-night";
  core: {
    recommendation: FoodOption;
    backup: FoodOption;
    avoid: string;
    orderTip: string;
  };
}

export interface MicroTripStop {
  title: string;
  durationMinutes: number;
  note: string;
}

export interface MicroTripCardData
  extends AiCardBase<"micro-trip", MicroTripActionVariant> {
  tripWindow: string;
  core: {
    theme: string;
    totalCostCny: number;
    walkingMinutes: number;
    route: MicroTripStop[];
    bestMoment: string;
  };
}

export interface SportsTeam {
  name: string;
  form: string;
}

export interface SportsSignal {
  label: string;
  value: string;
}

export interface SportsPreMatchCardData
  extends AiCardBase<"sports", SportsActionVariant> {
  match: {
    league: string;
    startsAt: string;
    home: SportsTeam;
    away: SportsTeam;
  };
  core: {
    angle: string;
    lean: "home" | "draw" | "away" | "watch";
    oneLine: string;
    signals: SportsSignal[];
  };
}

export interface RecoveryStep {
  title: string;
  durationMinutes: number;
  instruction: string;
}

export interface RecoveryCardData
  extends AiCardBase<"recovery", RecoveryActionVariant> {
  recoveryWindow: string;
  core: {
    tone: "calm" | "practical" | "minimal" | "sleepy";
    steps: RecoveryStep[];
    closingCue: string;
  };
}

export type AiFeedCard =
  | FoodDecisionCardData
  | MicroTripCardData
  | SportsPreMatchCardData
  | RecoveryCardData;

export type FeedItem = VideoFeedItem | AiFeedCard;

export interface GenerateCardRequest {
  cardType?: AiCardType;
  currentCard?: AiFeedCard;
  action?: ActionChipVariant;
}

export interface GenerateCardResponse {
  card: AiFeedCard;
  source: "mock";
}
