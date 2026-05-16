import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
