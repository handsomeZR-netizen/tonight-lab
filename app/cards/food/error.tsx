"use client";

import { SceneError } from "@/components/fallbacks/SceneError";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function FoodError({ error, reset }: ErrorProps) {
  return <SceneError tone="food" error={error} reset={reset} />;
}
