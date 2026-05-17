import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "Noto Sans SC",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif-sc)",
          "ui-serif",
          "Source Han Serif SC",
          "Songti SC",
          "serif",
        ],
        display: [
          "var(--font-display)",
          "var(--font-serif-sc)",
          "ui-serif",
          "Source Han Serif SC",
          "Songti SC",
          "serif",
        ],
      },
      fontSize: {
        "display-xl": [
          "clamp(56px, 9vw, 128px)",
          { lineHeight: "0.95", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(40px, 6vw, 80px)",
          { lineHeight: "1.02", letterSpacing: "-0.015em" },
        ],
        "display-md": [
          "clamp(32px, 4vw, 56px)",
          { lineHeight: "1.08", letterSpacing: "-0.01em" },
        ],
        kicker: [
          "12px",
          { lineHeight: "1.4", letterSpacing: "0.18em" },
        ],
        marker: [
          "14px",
          { lineHeight: "1", letterSpacing: "0.04em" },
        ],
        stat: [
          "clamp(48px, 7vw, 96px)",
          { lineHeight: "0.92", letterSpacing: "-0.02em" },
        ],
        "stat-xl": [
          "clamp(80px, 14vw, 200px)",
          { lineHeight: "0.88", letterSpacing: "-0.03em" },
        ],
      },
      boxShadow: {
        phone:
          "0 24px 60px -20px rgba(15, 23, 42, 0.18), 0 8px 24px -12px rgba(15, 23, 42, 0.1)",
        soft: "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
