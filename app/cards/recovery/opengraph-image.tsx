import { ImageResponse } from "next/og";

import { recoveryDetail } from "@/lib/detail-content";
import { toneTokens } from "@/lib/tone-tokens";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${recoveryDetail.title} · Tonight Lab`;

export default function RecoveryOpengraphImage() {
  const colors = toneTokens.recovery.sceneColors;
  const issue = toneTokens.recovery.issueNumber;
  const subtitle =
    recoveryDetail.kicker ?? recoveryDetail.description.slice(0, 60);

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
          color: "#f8fafc",
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
              color: "rgba(248,250,252,0.88)",
            }}
          >
            After Hours Ritual
          </div>
          <div
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              background: "rgba(20,8,40,0.42)",
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
              color: "#f8fafc",
            }}
          >
            {recoveryDetail.title}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              maxWidth: 920,
              color: "rgba(248,250,252,0.92)",
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
            color: "rgba(248,250,252,0.82)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#f8fafc",
              }}
            />
            <span style={{ fontWeight: 600 }}>Tonight Lab</span>
          </div>
          <div>Issue {issue} · Recovery Ritual</div>
        </div>
      </div>
    ),
    size,
  );
}
