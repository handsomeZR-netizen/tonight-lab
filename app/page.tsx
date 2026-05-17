import { FlowSection } from "@/components/landing/FlowSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { ScenariosSection } from "@/components/landing/ScenariosSection";
import { SignalsSection } from "@/components/landing/SignalsSection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Page() {
  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-phone focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
        href="#main-content"
      >
        跳到主内容
      </a>
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen overflow-hidden bg-[hsl(44_38%_97%)] text-slate-950 focus:outline-none"
      >
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Tonight Lab",
            description:
              "一个把「今晚到底做什么」包装成 AI 场景叙事的沉浸式信息流 demo。",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Web",
            inLanguage: "zh-CN",
            creator: { "@type": "Organization", name: "Tonight Lab" },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }}
        />
        <HeroSection />
        <ScenariosSection />
        <SignalsSection />
        <FlowSection />
      </main>
      <SiteFooter />
    </>
  );
}
