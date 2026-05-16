import type { Metadata } from "next";
import { Toaster } from "sonner";
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
      <body>
        {children}
        <Toaster position="top-center" theme="light" />
      </body>
    </html>
  );
}
