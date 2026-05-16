import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Noto_Serif_SC } from "next/font/google";
import { Toaster } from "sonner";

import { MotionProviders } from "@/components/providers/MotionProviders";
import {
  siteDescription,
  siteMetadataBase,
  siteName,
  siteTitle,
} from "@/lib/seo";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-serif-sc",
  preload: false,
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadataBase),
  title: {
    default: siteTitle,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Tonight Lab",
    "今晚做什么",
    "AI 信息流",
    "轻决策",
    "Next.js",
    "杂志化交互 demo",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    title: siteTitle,
    description: siteDescription,
    siteName,
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fefaf3" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${notoSerifSC.variable} ${fraunces.variable}`}
    >
      <body>
        <MotionProviders>{children}</MotionProviders>
        <Toaster position="top-center" theme="light" />
        <Analytics />
      </body>
    </html>
  );
}
