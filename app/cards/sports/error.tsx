"use client";

import { SceneError } from "@/components/fallbacks/SceneError";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function SportsError({ error, reset }: ErrorProps) {
  return <SceneError tone="sports" error={error} reset={reset} />;
}
