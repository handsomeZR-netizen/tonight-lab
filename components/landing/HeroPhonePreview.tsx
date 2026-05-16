"use client";

import { useRef } from "react";

import { FeedViewport } from "@/components/feed/FeedViewport";
import { MobileFrame } from "@/components/feed/MobileFrame";
import { PageScrollHint } from "@/components/feed/PageScrollHint";
import { PhoneShell } from "@/components/feed/PhoneShell";
import { PhoneSpotlight } from "@/components/feed/PhoneSpotlight";
import { PhoneSwipeIndicator } from "@/components/feed/PhoneSwipeIndicator";

export function HeroPhonePreview() {
  const phoneRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        id="experience"
        ref={phoneRef}
        className="flex justify-center lg:justify-end"
      >
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
