import type { Metadata } from "next";
import { Inter, Noto_Serif_SC } from "next/font/google";
import { Toaster } from "sonner";
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

export const metadata: Metadata = {
  title: "AI Feed Cards Demo",
  description: "Douyin-style just-in-time AI feed cards mock demo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSerifSC.variable}`}>
      <body>
        {children}
        <Toaster position="top-center" theme="light" />
      </body>
    </html>
  );
}
