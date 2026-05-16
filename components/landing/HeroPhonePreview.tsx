"use client";

import { useRef } from "react";

import { FeedViewport } from "@/components/feed/FeedViewport";
import { MobileFrame } from "@/components/feed/MobileFrame";
import { PageScrollHint } from "@/components/feed/PageScrollHint";
import { PhoneShell } from "@/components/feed/PhoneShell";
import { PhoneSpotlight } from "@/components/feed/PhoneSpotlight";
import { PhoneSwipeIndicator } from "@/components/feed/PhoneSwipeIndicator";
import type { DetailTone } from "@/lib/detail-content";
import { getToneCssVars } from "@/lib/tone-css-vars";

type HeroPhonePreviewProps = {
  tone: DetailTone;
};

export function HeroPhonePreview({ tone }: HeroPhonePreviewProps) {
  const phoneRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        id="experience"
        ref={phoneRef}
        className="relative flex justify-center lg:justify-end"
        style={{
          ...getToneCssVars(tone),
          transition:
            "background 600ms ease, --tone-primary 600ms ease, --tone-secondary 600ms ease",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, color-mix(in oklch, var(--tone-primary) 18%, transparent), transparent 60%)",
            transition: "background 600ms ease",
          }}
        />
        <PhoneShell>
          <MobileFrame>
            <FeedViewport />
          </MobileFrame>
          <PhoneSwipeIndicator targetRef={phoneRef} />
        </PhoneShell>
      </div>
      <PhoneSpotlight targetRef={phoneRef} />
      <PageScrollHint />
    </>
  );
}
