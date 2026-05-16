"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { cn } from "@/lib/cn";
import type { DetailTone } from "@/lib/detail-content";

import type { ToneSceneOptions } from "./ToneSceneInner";

const ToneSceneInner = dynamic(() => import("./ToneSceneInner"), {
  ssr: false,
});

type ToneSceneProps = {
  tone: DetailTone;
  options?: ToneSceneOptions;
  paused?: boolean;
  className?: string;
  fallbackSrc?: string;
  fallbackAlt?: string;
};

export function ToneScene({
  tone,
  options,
  paused,
  className,
  fallbackSrc,
  fallbackAlt,
}: ToneSceneProps) {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const supportsWebGL = useWebGLSupport();

  if (isMobile || !supportsWebGL) {
    return (
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", className)}
      >
        {fallbackSrc && (
          <Image
            src={fallbackSrc}
            alt={fallbackAlt ?? ""}
            fill
            sizes="100vw"
            className="object-cover opacity-40 mix-blend-soft-light"
            priority={false}
          />
        )}
      </div>
    );
  }

  return (
    <ToneSceneInner
      tone={tone}
      options={options}
      paused={paused || reduce}
      className={className}
    />
  );
}
