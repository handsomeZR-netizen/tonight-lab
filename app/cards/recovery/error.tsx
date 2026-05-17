"use client";

import { SceneError } from "@/components/fallbacks/SceneError";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RecoveryError({ error, reset }: ErrorProps) {
  return <SceneError tone="recovery" error={error} reset={reset} />;
}
