"use client";

import { SceneError } from "@/components/fallbacks/SceneError";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function TripError({ error, reset }: ErrorProps) {
  return <SceneError tone="trip" error={error} reset={reset} />;
}
