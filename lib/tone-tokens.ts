import type { DetailTone } from "./detail-content";

export type ToneTokenSet = {
  accentBorder: string;
  accentBg: string;
  accentText: string;
  ink: string;
  inkMuted: string;
  glow: string;
  ringHex: string;
  sceneColors: {
    primary: string;
    secondary: string;
    deep: string;
  };
  badge: string;
  issueNumber: string;
};

export const toneTokens: Record<DetailTone, ToneTokenSet> = {
  food: {
    accentBorder: "border-amber-200",
    accentBg: "bg-amber-50",
    accentText: "text-amber-700",
    ink: "text-amber-900",
    inkMuted: "text-amber-700/70",
    glow: "from-amber-200 via-orange-200 to-rose-100",
    ringHex: "#fbbf24",
    sceneColors: {
      primary: "#fbbf24",
      secondary: "#f97316",
      deep: "#78350f",
    },
    badge: "Issue 01",
    issueNumber: "01",
  },
  trip: {
    accentBorder: "border-sky-200",
    accentBg: "bg-sky-50",
    accentText: "text-sky-700",
    ink: "text-sky-900",
    inkMuted: "text-sky-700/70",
    glow: "from-sky-200 via-violet-200 to-rose-100",
    ringHex: "#38bdf8",
    sceneColors: {
      primary: "#38bdf8",
      secondary: "#a78bfa",
      deep: "#0c4a6e",
    },
    badge: "Issue 02",
    issueNumber: "02",
  },
  sports: {
    accentBorder: "border-emerald-200",
    accentBg: "bg-emerald-50",
    accentText: "text-emerald-700",
    ink: "text-emerald-900",
    inkMuted: "text-emerald-700/70",
    glow: "from-emerald-200 via-lime-200 to-amber-100",
    ringHex: "#10b981",
    sceneColors: {
      primary: "#10b981",
      secondary: "#a3e635",
      deep: "#064e3b",
    },
    badge: "Issue 03",
    issueNumber: "03",
  },
  recovery: {
    accentBorder: "border-violet-200",
    accentBg: "bg-violet-50",
    accentText: "text-violet-700",
    ink: "text-violet-900",
    inkMuted: "text-violet-700/70",
    glow: "from-violet-200 via-fuchsia-200 to-sky-100",
    ringHex: "#8b5cf6",
    sceneColors: {
      primary: "#8b5cf6",
      secondary: "#22d3ee",
      deep: "#4c1d95",
    },
    badge: "Issue 04",
    issueNumber: "04",
  },
};

export const toneSectionTitle: Record<DetailTone, string> = {
  food: "TONIGHT'S MENU LAB",
  trip: "MICRO ESCAPE FIELD GUIDE",
  sports: "PRE-MATCH ROOM",
  recovery: "AFTER HOURS RITUAL",
};
