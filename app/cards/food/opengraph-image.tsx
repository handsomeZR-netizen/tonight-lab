import { ImageResponse } from "next/og";

import { foodDetail } from "@/lib/detail-content";
import { toneTokens } from "@/lib/tone-tokens";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${foodDetail.title} · Tonight Lab`;

export default function FoodOpengraphImage() {
  const colors = toneTokens.food.sceneColors;
  const issue = toneTokens.food.issueNumber;
  const subtitle =
    foodDetail.kicker ?? foodDetail.description.slice(0, 60);

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
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              fontWeight: 600,
              color: "rgba(254,250,243,0.86)",
            }}
          >
            Tonight&apos;s Menu Lab
          </div>
          <div
            style={{
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
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1,
              color: "#fefaf3",
            }}
          >
            {foodDetail.title}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              maxWidth: 920,
              color: "rgba(254,250,243,0.92)",
            }}
          >
            {subtitle}
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
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#fefaf3",
              }}
            />
            <span style={{ fontWeight: 600 }}>Tonight Lab</span>
          </div>
          <div>Issue {issue} · Food Decision Lab</div>
        </div>
      </div>
    ),
    size,
  );
}
