export type FeedItemType =
  | "video"
  | "food_decision"
  | "micro_trip"
  | "sports_pre_match"
  | "recovery";

export interface FeedItemBase {
  id: string;
  type: FeedItemType;
  title: string;
  author?: string;
  createdAt?: string;
}

export interface FeedVisual {
  src: string;
  alt: string;
  prompt: string;
}

export interface VideoFeedItem extends FeedItemBase {
  type: "video";
  author: string;
  caption: string;
  soundtrack: string;
  posterTone: "food" | "trip" | "sports";
  poster: FeedVisual;
  tags: string[];
  stats: {
    likes: string;
    comments: string;
    shares: string;
  };
}

export interface ActionChip {
  id: string;
  label: string;
  intent: "refine" | "feedback" | "predict" | "expand" | "negative" | "save";
}

export interface AiCardBase extends FeedItemBase {
  aiLabel: string;
  sceneLabel: string;
  headline: string;
  personalReason: string;
  primaryActions: ActionChip[];
  secondaryActions?: ActionChip[];
  visual?: FeedVisual;
  isSaved?: boolean;
  isDismissed?: boolean;
  expanded?: boolean;
  selectedActionId?: string;
  feedbackStatus?: "accurate" | "inaccurate";
  feedbackMessage?: string;
}

export interface FoodOption {
  id: string;
  name: string;
  price: string;
  tags: string[];
  reason: string;
  fitMoment: string;
}

export interface FoodDecisionCardData extends AiCardBase {
  type: "food_decision";
  weather: string;
  budget: string;
  options: FoodOption[];
  selectedIntent?: string;
}

export interface TripStop {
  id: string;
  time: string;
  title: string;
  description: string;
  tags: string[];
}

export interface MicroTripCardData extends AiCardBase {
  type: "micro_trip";
  city: string;
  duration: string;
  mood: string;
  stops: TripStop[];
  selectedIntent?: string;
}

export interface MatchInsight {
  id: string;
  title: string;
  detail: string;
}

export interface PredictionStats {
  homeWin: number;
  draw: number;
  awayWin: number;
}

export interface SportsPreMatchCardData extends AiCardBase {
  type: "sports_pre_match";
  homeTeam: string;
  awayTeam: string;
  startInMinutes: number;
  followedPlayer: string;
  keyMatchup: string;
  insights: MatchInsight[];
  predictionStats?: PredictionStats;
  userPrediction?: "home" | "draw" | "away";
  selectedIntent?: string;
}

export interface RecoveryStep {
  id: string;
  text: string;
  duration?: string;
}

export interface RecoveryCardData extends AiCardBase {
  type: "recovery";
  energyState: "tired" | "anxious" | "flat" | "overstimulated";
  totalDuration: string;
  steps: RecoveryStep[];
  selectedIntent?: string;
}

export type AiFeedCard =
  | FoodDecisionCardData
  | MicroTripCardData
  | SportsPreMatchCardData
  | RecoveryCardData;

export type FeedItem = VideoFeedItem | AiFeedCard;

export interface UserContext {
  currentTime: string;
  city: string;
  weather: string;
  mood?: string;
  recentPreferences: string[];
  budget?: string;
  followedTeams?: string[];
  followedPlayers?: string[];
}

export interface GenerateCardRequest {
  cardType?: FeedItemType;
  userContext?: UserContext;
  action?: ActionChip;
  currentCard?: AiFeedCard;
}

export interface GenerateCardResponse {
  card: AiFeedCard;
  source: "mock";
}
