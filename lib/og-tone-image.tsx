import { ImageResponse } from "next/og";

import {
  foodDetail,
  recoveryDetail,
  sportsDetail,
  tripDetail,
  type DetailTone,
} from "./detail-content";
import { toneSectionTitle, toneTokens } from "./tone-tokens";

const detailMap = {
  food: foodDetail,
  trip: tripDetail,
  sports: sportsDetail,
  recovery: recoveryDetail,
} as const;

export const toneOgSize = { width: 1200, height: 630 } as const;
export const toneOgContentType = "image/png" as const;

export function renderToneOgImage(tone: DetailTone): ImageResponse {
  const colors = toneTokens[tone].sceneColors;
  const issue = toneTokens[tone].issueNumber;
  const detail = detailMap[tone];
  const headline = toneSectionTitle[tone];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 88px",
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 55%, ${colors.deep} 100%)`,
          color: "#fefaf3",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              fontWeight: 600,
              color: "rgba(254,250,243,0.86)",
            }}
          >
            Tonight Lab
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              borderRadius: 999,
              background: "rgba(15,9,2,0.32)",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 4,
            }}
          >
            Issue {issue}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              fontStyle: "italic",
              color: "#fefaf3",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 600,
              lineHeight: 1.2,
              color: "rgba(254,250,243,0.96)",
            }}
          >
            {detail.title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              lineHeight: 1.4,
              maxWidth: 880,
              color: "rgba(254,250,243,0.84)",
            }}
          >
            {detail.kicker}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            fontSize: 20,
            letterSpacing: 4,
            color: "rgba(254,250,243,0.78)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#fefaf3",
              }}
            />
            <div style={{ display: "flex", fontWeight: 600 }}>
              tonight-lab.vercel.app
            </div>
          </div>
          <div style={{ display: "flex", textTransform: "uppercase" }}>
            Tonight Edition · {headline}
          </div>
        </div>
      </div>
    ),
    toneOgSize,
  );
}
