"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import { useInViewportPause } from "@/hooks/useInViewportPause";
import { cn } from "@/lib/cn";
import type { DetailTone } from "@/lib/detail-content";

import { FoodWarmFog } from "./scenes/FoodWarmFog";
import { RecoveryBreathHalo } from "./scenes/RecoveryBreathHalo";
import { SportsEnergyField } from "./scenes/SportsEnergyField";
import { TripCityFlow } from "./scenes/TripCityFlow";

export type ToneSceneOptions = {
  intensity?: number;
  food?: {
    hueShift?: number;
  };
  trip?: {
    vibe?: "sunset" | "neon";
    lessWalk?: boolean;
    photoFirst?: boolean;
  };
  sports?: {
    high?: boolean;
    prediction?: "home" | "draw" | "player";
  };
  recovery?: {
    fast?: boolean;
  };
};

type ToneSceneInnerProps = {
  tone: DetailTone;
  options?: ToneSceneOptions;
  paused?: boolean;
  className?: string;
};

export default function ToneSceneInner({
  tone,
  options = {},
  paused = false,
  className,
}: ToneSceneInnerProps) {
  const { ref, inView } = useInViewportPause<HTMLDivElement>(0.05);
  const canvasMountedRef = useRef(false);

  useEffect(() => {
    canvasMountedRef.current = true;
  }, []);

  const frameloop: "always" | "never" = paused || !inView ? "never" : "always";

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0",
        className,
      )}
    >
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
          preserveDrawingBuffer: false,
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        {tone === "food" && (
          <FoodWarmFog
            intensity={options.intensity}
            hueShift={options.food?.hueShift}
          />
        )}
        {tone === "trip" && (
          <TripCityFlow
            intensity={options.intensity}
            vibe={options.trip?.vibe}
            lessWalk={options.trip?.lessWalk}
            photoFirst={options.trip?.photoFirst}
          />
        )}
        {tone === "sports" && (
          <SportsEnergyField
            intensity={options.intensity}
            high={options.sports?.high}
            prediction={options.sports?.prediction}
          />
        )}
        {tone === "recovery" && (
          <RecoveryBreathHalo
            intensity={options.intensity}
            fast={options.recovery?.fast}
          />
        )}
      </Canvas>
    </div>
  );
}
