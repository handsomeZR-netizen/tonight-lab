import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { foodDetail } from "@/lib/detail-content";
import { buildDetailMetadata } from "@/lib/seo";

import { FoodClient } from "./FoodClient";

export function generateMetadata(): Metadata {
  return buildDetailMetadata("food");
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: foodDetail.title,
          description: foodDetail.description,
          image: ["/cards/food/opengraph-image"],
          inLanguage: "zh-CN",
          author: { "@type": "Organization", name: "Tonight Lab" },
        }}
      />
      <FoodClient />
    </>
  );
}
