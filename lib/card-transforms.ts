import type {
  ActionChipVariant,
  AiFeedCard,
  FoodActionVariant,
  FoodDecisionCardData,
  MicroTripActionVariant,
  MicroTripCardData,
  RecoveryActionVariant,
  RecoveryCardData,
  SportsActionVariant,
  SportsPreMatchCardData,
} from "./types";

export function transformCard(card: AiFeedCard, action: ActionChipVariant): AiFeedCard {
  switch (card.type) {
    case "food":
      return transformFoodCard(card, action);
    case "micro-trip":
      return transformMicroTripCard(card, action);
    case "sports":
      return transformSportsCard(card, action);
    case "recovery":
      return transformRecoveryCard(card, action);
  }
}

export function transformFoodCard(
  card: FoodDecisionCardData,
  action: ActionChipVariant,
): FoodDecisionCardData {
  if (!isFoodAction(action)) {
    return card;
  }

  const variants: Record<
    FoodActionVariant,
    Pick<FoodDecisionCardData, "headline" | "personalReason" | "selectedIntent" | "core">
  > = {
    spicy: {
      headline: "Pick spicy dry pot rice for a sharper dinner",
      personalReason:
        "You asked for heat, and this keeps the meal fast while matching the rainy-evening craving.",
      selectedIntent: "spicy",
      core: {
        recommendation: {
          name: "Mala chicken dry pot rice",
          cuisine: "Sichuan",
          priceCny: 42,
          distanceMinutes: 9,
          deliveryAvailable: true,
          caloriesLabel: "High",
          reason: "Peppery, filling, and strong enough to feel like a real choice.",
        },
        backup: {
          name: "Spicy beef noodle soup",
          cuisine: "Chongqing noodles",
          priceCny: 34,
          distanceMinutes: 11,
          deliveryAvailable: true,
          caloriesLabel: "Medium",
          reason: "Still spicy, but easier if you want soup.",
        },
        avoid: "Skip mild Cantonese rice plates; they will feel flat tonight.",
        orderTip: "Choose medium spice and add cucumber to cool the finish.",
      },
    },
    "no-delivery": {
      headline: "Walk eight minutes for a hot counter meal",
      personalReason:
        "You removed delivery, so the best choice is nearby, seated, and quick to finish.",
      selectedIntent: "no-delivery",
      core: {
        recommendation: {
          name: "Claypot chicken rice",
          cuisine: "Cantonese",
          priceCny: 38,
          distanceMinutes: 8,
          deliveryAvailable: false,
          caloriesLabel: "Medium",
          reason: "Best eaten in-store while the rice is still crisp.",
        },
        backup: {
          name: "Fresh wonton soup",
          cuisine: "Shanghainese",
          priceCny: 29,
          distanceMinutes: 6,
          deliveryAvailable: false,
          caloriesLabel: "Light",
          reason: "Low wait time and easy to eat alone.",
        },
        avoid: "Avoid mall restaurants with table queues.",
        orderTip: "Ask for less oil and take the window counter seat.",
      },
    },
    alone: {
      headline: "Choose the solo-friendly noodle counter",
      personalReason:
        "You are eating alone, so speed, seating comfort, and a clean portion matter most.",
      selectedIntent: "alone",
      core: {
        recommendation: {
          name: "Scallion oil noodles with wontons",
          cuisine: "Shanghainese",
          priceCny: 31,
          distanceMinutes: 7,
          deliveryAvailable: true,
          caloriesLabel: "Medium",
          reason: "Counter seating, predictable timing, and no shared dishes required.",
        },
        backup: {
          name: "Pork chop rice set",
          cuisine: "Local diner",
          priceCny: 35,
          distanceMinutes: 9,
          deliveryAvailable: true,
          caloriesLabel: "Medium",
          reason: "A complete solo set if you want something more filling.",
        },
        avoid: "Skip barbecue skewers because portions push you into over-ordering.",
        orderTip: "Add greens instead of a second carb.",
      },
    },
    "low-calorie": {
      headline: "Keep dinner light with fish soup and greens",
      personalReason:
        "You asked for lower calories, so the recommendation keeps warmth and protein without a heavy sauce.",
      selectedIntent: "low-calorie",
      core: {
        recommendation: {
          name: "Clear fish soup with greens",
          cuisine: "Healthy Chinese",
          priceCny: 39,
          distanceMinutes: 10,
          deliveryAvailable: true,
          caloriesLabel: "Light",
          reason: "High protein, warm broth, and a cleaner finish than rice bowls.",
        },
        backup: {
          name: "Chicken salad with sweet corn",
          cuisine: "Light meal",
          priceCny: 33,
          distanceMinutes: 8,
          deliveryAvailable: true,
          caloriesLabel: "Light",
          reason: "Good if you want cold food and faster delivery.",
        },
        avoid: "Avoid dry pot and fried rice tonight.",
        orderTip: "Keep dressing separate and add one tea egg if still hungry.",
      },
    },
    "budget-30": {
      headline: "Stay under 30 with wonton soup",
      personalReason:
        "You capped the budget at 30 RMB, so this keeps the meal complete without hunting for coupons.",
      selectedIntent: "budget-30",
      core: {
        recommendation: {
          name: "Pork wonton soup",
          cuisine: "Shanghainese",
          priceCny: 26,
          distanceMinutes: 6,
          deliveryAvailable: true,
          caloriesLabel: "Light",
          reason: "Warm, cheap, nearby, and enough for a simple dinner.",
        },
        backup: {
          name: "Egg tomato noodles",
          cuisine: "Home-style noodles",
          priceCny: 24,
          distanceMinutes: 9,
          deliveryAvailable: true,
          caloriesLabel: "Medium",
          reason: "Filling backup that stays safely below budget.",
        },
        avoid: "Avoid combo meals that look cheap before delivery fees.",
        orderTip: "Use pickup if possible; delivery fee is the budget risk.",
      },
    },
  };

  return { ...card, ...variants[action] };
}

export function transformMicroTripCard(
  card: MicroTripCardData,
  action: ActionChipVariant,
): MicroTripCardData {
  if (!isMicroTripAction(action)) {
    return card;
  }

  const variants: Record<
    MicroTripActionVariant,
    Pick<MicroTripCardData, "headline" | "personalReason" | "selectedIntent" | "core">
  > = {
    "less-walk": {
      headline: "Make it a one-block cafe and gallery reset",
      personalReason:
        "You asked for less walking, so this keeps the plan compact and mostly indoors.",
      selectedIntent: "less-walk",
      core: {
        theme: "Low-walk reset",
        totalCostCny: 62,
        walkingMinutes: 8,
        route: [
          { title: "Lobby gallery wall", durationMinutes: 20, note: "Start with the free exhibit." },
          { title: "Quiet cafe table", durationMinutes: 55, note: "Pick a seat with a street view." },
          { title: "Corner flower shop", durationMinutes: 10, note: "One small stop before heading back." },
        ],
        bestMoment: "Take the cafe window seat while the street lights come on.",
      },
    },
    "photo-friendly": {
      headline: "Chase three easy photo spots before sunset",
      personalReason:
        "You asked for better visuals, so the route favors reflections, signs, and warm storefront light.",
      selectedIntent: "photo-friendly",
      core: {
        theme: "Photo walk",
        totalCostCny: 48,
        walkingMinutes: 26,
        route: [
          { title: "Glass arcade entrance", durationMinutes: 20, note: "Use reflections for the opener." },
          { title: "Old cinema sign", durationMinutes: 25, note: "Best vertical shot for the feed." },
          { title: "Riverside rail", durationMinutes: 30, note: "Shoot hands, coffee, and water." },
        ],
        bestMoment: "Best light is the 20 minutes before sunset.",
      },
    },
    solo: {
      headline: "Take a quiet solo loop with no awkward waits",
      personalReason:
        "You switched to solo mode, so every stop works without reservations or shared activities.",
      selectedIntent: "solo",
      core: {
        theme: "Solo decompression",
        totalCostCny: 36,
        walkingMinutes: 20,
        route: [
          { title: "Magazine rack stop", durationMinutes: 20, note: "Browse without buying first." },
          { title: "Tea stand bench", durationMinutes: 25, note: "Small drink, low commitment." },
          { title: "Pocket park loop", durationMinutes: 20, note: "One lap, then leave before it drags." },
        ],
        bestMoment: "Save one clip of the tea steam for the final shot.",
      },
    },
    date: {
      headline: "Make it a soft date with dessert and a short view",
      personalReason:
        "You chose date mode, so the plan adds a shared treat and a natural talking stop.",
      selectedIntent: "date",
      core: {
        theme: "Easy date route",
        totalCostCny: 96,
        walkingMinutes: 18,
        route: [
          { title: "Dessert counter", durationMinutes: 35, note: "Share one seasonal plate." },
          { title: "Design shop", durationMinutes: 25, note: "Good for casual browsing and jokes." },
          { title: "Bridge viewpoint", durationMinutes: 20, note: "Short walk, clear end point." },
        ],
        bestMoment: "Arrive at the bridge after the first street lights turn on.",
      },
    },
    "low-budget": {
      headline: "Keep the whole micro trip under 25 RMB",
      personalReason:
        "You asked for low budget, so this plan uses free stops and one small drink.",
      selectedIntent: "low-budget",
      core: {
        theme: "Cheap reset",
        totalCostCny: 22,
        walkingMinutes: 22,
        route: [
          { title: "Public art corner", durationMinutes: 20, note: "Free first stop with a clear visual." },
          { title: "Convenience store coffee", durationMinutes: 10, note: "Keep the only spend small." },
          { title: "Tree-lined shortcut", durationMinutes: 25, note: "A calm loop back to transit." },
        ],
        bestMoment: "Use the shortcut as the closing walk instead of adding another paid stop.",
      },
    },
  };

  return { ...card, ...variants[action] };
}

export function transformSportsCard(
  card: SportsPreMatchCardData,
  action: ActionChipVariant,
): SportsPreMatchCardData {
  if (!isSportsAction(action)) {
    return card;
  }

  const variants: Record<
    SportsActionVariant,
    Pick<SportsPreMatchCardData, "headline" | "personalReason" | "selectedIntent" | "core">
  > = {
    home: {
      headline: "Home pressure is the cleanest story",
      personalReason:
        "You chose the home angle, so this read focuses on territory and crowd-driven tempo.",
      selectedIntent: "home",
      core: {
        angle: "Harbor City can pin the match wide and create repeated second balls.",
        lean: "home",
        oneLine: "If Harbor City win the first-contact duels, the match tilts home.",
        signals: [
          { label: "Home route", value: "Early crosses and counter-pressing" },
          { label: "Key phase", value: "Minutes 25-40" },
          { label: "Risk", value: "Space behind the fullbacks" },
        ],
      },
    },
    draw: {
      headline: "A draw script runs through midfield control",
      personalReason:
        "You picked draw, so this version looks for the reasons the game could stay narrow.",
      selectedIntent: "draw",
      core: {
        angle: "Both sides have enough structure to slow transition chances after the opening spell.",
        lean: "draw",
        oneLine: "A 1-1 shape makes sense if neither side scores before halftime.",
        signals: [
          { label: "Draw route", value: "Slow restarts and compact midfield" },
          { label: "Key phase", value: "First 15 minutes after halftime" },
          { label: "Risk", value: "Set-piece goal breaks the script" },
        ],
      },
    },
    away: {
      headline: "Away counters are the live upset angle",
      personalReason:
        "You chose the away angle, so this read tracks transition speed over possession.",
      selectedIntent: "away",
      core: {
        angle: "North United do not need long spells on the ball if they keep finding the left channel.",
        lean: "away",
        oneLine: "The away path is simple: absorb pressure, then attack the open wing.",
        signals: [
          { label: "Away route", value: "Left-side counters" },
          { label: "Key player zone", value: "Home right-back channel" },
          { label: "Risk", value: "Too many clearances invite pressure" },
        ],
      },
    },
    "player-focus": {
      headline: "Watch the home No. 8 before everyone else does",
      personalReason:
        "You asked for a player lens, so this keeps attention on one role that can explain the match.",
      selectedIntent: "player-focus",
      core: {
        angle: "The home No. 8 is the tempo switch: first pass under pressure, late run near the box.",
        lean: "watch",
        oneLine: "If the No. 8 turns forward cleanly, Harbor City get their best attacks.",
        signals: [
          { label: "First cue", value: "Receives on the half-turn" },
          { label: "Second cue", value: "Arrives outside the box" },
          { label: "Defensive test", value: "Tracks the away left runner" },
        ],
      },
    },
    "one-line": {
      headline: "One-line read: pressure first, counters second",
      personalReason:
        "You asked for the shortest version, so this removes the extra scouting detail.",
      selectedIntent: "one-line",
      core: {
        angle: "Home pressure versus away counters is the whole match shape.",
        lean: "watch",
        oneLine: "If Harbor City score first, control follows; if not, North United stay dangerous.",
        signals: [
          { label: "Watch", value: "First goal timing" },
          { label: "Momentum", value: "Home pressure count" },
          { label: "Swing", value: "Away counter quality" },
        ],
      },
    },
  };

  return { ...card, ...variants[action] };
}

export function transformRecoveryCard(
  card: RecoveryCardData,
  action: ActionChipVariant,
): RecoveryCardData {
  if (!isRecoveryAction(action)) {
    return card;
  }

  const variants: Record<
    RecoveryActionVariant,
    Pick<RecoveryCardData, "headline" | "personalReason" | "selectedIntent" | "core">
  > = {
    anxious: {
      headline: "Give the anxiety somewhere small to go",
      personalReason:
        "You marked anxious, so the reset starts with orientation instead of advice.",
      selectedIntent: "anxious",
      core: {
        tone: "calm",
        steps: [
          { title: "Name five objects", durationMinutes: 2, instruction: "Look around and name five plain objects." },
          { title: "Press feet down", durationMinutes: 2, instruction: "Feel both feet push into the floor." },
          { title: "Longer exhale", durationMinutes: 4, instruction: "Let the exhale be the only thing you adjust." },
        ],
        closingCue: "You do not need to solve the thought before your body settles.",
      },
    },
    "lying-down": {
      headline: "Reset without getting up",
      personalReason:
        "You are lying down, so the plan uses tiny body cues that do not require effort.",
      selectedIntent: "lying-down",
      core: {
        tone: "minimal",
        steps: [
          { title: "Unfurrow", durationMinutes: 1, instruction: "Let your forehead and eyes soften." },
          { title: "Release hands", durationMinutes: 2, instruction: "Open your fingers and stop gripping the blanket." },
          { title: "Heavy legs", durationMinutes: 5, instruction: "Imagine both legs getting heavier on the bed." },
        ],
        closingCue: "Stay down; completion is not the goal.",
      },
    },
    "five-min": {
      headline: "Use the five-minute version",
      personalReason:
        "You only gave this five minutes, so the reset keeps one breath pattern and one physical cue.",
      selectedIntent: "five-min",
      core: {
        tone: "practical",
        steps: [
          { title: "Timer", durationMinutes: 1, instruction: "Set five minutes and turn the screen away." },
          { title: "Shoulders", durationMinutes: 1, instruction: "Lift shoulders once, then drop them." },
          { title: "Breath count", durationMinutes: 3, instruction: "Count ten slow exhales, then stop." },
        ],
        closingCue: "When the timer ends, do one ordinary next thing.",
      },
    },
    "no-advice": {
      headline: "No advice, just less input",
      personalReason:
        "You asked for no advice, so this card becomes a quiet permission slip.",
      selectedIntent: "no-advice",
      core: {
        tone: "minimal",
        steps: [
          { title: "Mute", durationMinutes: 1, instruction: "Silence the next notification." },
          { title: "Still", durationMinutes: 4, instruction: "Do nothing useful for four minutes." },
          { title: "End", durationMinutes: 1, instruction: "Leave before turning this into a task." },
        ],
        closingCue: "No lesson required.",
      },
    },
    sleep: {
      headline: "Turn the reset into a sleep landing",
      personalReason:
        "You chose sleep, so the steps lower stimulation and avoid anything that wakes you up.",
      selectedIntent: "sleep",
      core: {
        tone: "sleepy",
        steps: [
          { title: "Screen away", durationMinutes: 1, instruction: "Put the phone where you cannot reach it easily." },
          { title: "Cool the room", durationMinutes: 2, instruction: "Open air slightly or loosen one layer." },
          { title: "Body scan", durationMinutes: 7, instruction: "Move attention from forehead to toes without fixing anything." },
        ],
        closingCue: "If thoughts continue, repeat only the body scan.",
      },
    },
  };

  return { ...card, ...variants[action] };
}

function isFoodAction(action: ActionChipVariant): action is FoodActionVariant {
  return ["spicy", "no-delivery", "alone", "low-calorie", "budget-30"].includes(action);
}

function isMicroTripAction(action: ActionChipVariant): action is MicroTripActionVariant {
  return ["less-walk", "photo-friendly", "solo", "date", "low-budget"].includes(action);
}

function isSportsAction(action: ActionChipVariant): action is SportsActionVariant {
  return ["home", "draw", "away", "player-focus", "one-line"].includes(action);
}

function isRecoveryAction(action: ActionChipVariant): action is RecoveryActionVariant {
  return ["anxious", "lying-down", "five-min", "no-advice", "sleep"].includes(action);
}
