import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { sportsDetail } from "@/lib/detail-content";
import { buildDetailMetadata } from "@/lib/seo";

import { SportsClient } from "./SportsClient";

export function generateMetadata(): Metadata {
  return buildDetailMetadata("sports");
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: sportsDetail.title,
          description: sportsDetail.description,
          image: ["/cards/sports/opengraph-image"],
          inLanguage: "zh-CN",
          author: { "@type": "Organization", name: "Tonight Lab" },
        }}
      />
      <SportsClient />
    </>
  );
}
