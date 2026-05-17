import type { CSSProperties } from "react";

import type { DetailTone } from "./detail-content";
import { toneTokens } from "./tone-tokens";

export function getToneCssVars(tone: DetailTone): CSSProperties {
  const tokens = toneTokens[tone];
  return {
    ["--tone-primary" as string]: tokens.sceneColors.primary,
    ["--tone-secondary" as string]: tokens.sceneColors.secondary,
    ["--tone-deep" as string]: tokens.sceneColors.deep,
    ["--tone-ring" as string]: tokens.ringHex,
  } as CSSProperties;
}

export const toneLabel: Record<DetailTone, string> = {
  food: "今晚吃什么",
  trip: "城市逃逸",
  sports: "赛前观察",
  recovery: "回血",
};

export const toneOrder: ReadonlyArray<DetailTone> = [
  "food",
  "trip",
  "sports",
  "recovery",
];
