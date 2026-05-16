import { ImageResponse } from "next/og";

import { toneTokens } from "@/lib/tone-tokens";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Tonight Lab · 今晚的轻决策信息流";

const toneOrder = ["food", "trip", "sports", "recovery"] as const;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #fefaf3 0%, #fdf2dc 55%, #f7e2c4 100%)",
          color: "#1f1305",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div
              style={{
                fontSize: 22,
                letterSpacing: 8,
                textTransform: "uppercase",
                color: "#8a5a1f",
                fontWeight: 600,
              }}
            >
              Tonight Lab · Issue 00
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#a07a3a",
                letterSpacing: 2,
              }}
            >
              An editorial feed of tonight&apos;s small decisions.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
            }}
          >
            {toneOrder.map((tone) => {
              const colors = toneTokens[tone].sceneColors;
              return (
                <div
                  key={tone}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                      boxShadow: "0 12px 28px rgba(31,19,5,0.12)",
                    }}
                  />
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#8a5a1f",
                      letterSpacing: 2,
                    }}
                  >
                    {toneTokens[tone].issueNumber}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 128,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -3,
              color: "#1f1305",
              fontStyle: "italic",
            }}
          >
            Tonight Lab
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 600,
              color: "#3a2a14",
              letterSpacing: 2,
            }}
          >
            今晚的轻决策信息流
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#6b4a1c",
              maxWidth: 880,
              lineHeight: 1.4,
            }}
          >
            把「今晚到底做什么」包装成 AI 场景叙事的沉浸式信息流 demo。
          </div>
        </div>
      </div>
    ),
    size,
  );
}
