import { ImageResponse } from "next/og";

import { sportsDetail } from "@/lib/detail-content";
import { toneTokens } from "@/lib/tone-tokens";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "赛前 15 分钟观赛室 · Tonight Lab";

export default function SportsOgImage() {
  const tokens = toneTokens.sports;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: `linear-gradient(135deg, ${tokens.sceneColors.primary} 0%, ${tokens.sceneColors.secondary} 55%, ${tokens.sceneColors.deep} 100%)`,
          color: "white",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: "0.24em", textTransform: "uppercase", opacity: 0.78 }}>
          <span>Tonight Lab · Issue {tokens.issueNumber}</span>
          <span>PRE-MATCH ROOM</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <span style={{ fontSize: 22, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.86 }}>
            {sportsDetail.kicker}
          </span>
          <span style={{ fontSize: 104, lineHeight: 1, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {sportsDetail.title}
          </span>
          <span style={{ fontSize: 26, lineHeight: 1.4, maxWidth: 940, opacity: 0.94 }}>
            {sportsDetail.description}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.78 }}>
          <span>tonight-lab.app / cards / sports</span>
          <span>№ {tokens.issueNumber}</span>
        </div>
      </div>
    ),
    size,
  );
}
