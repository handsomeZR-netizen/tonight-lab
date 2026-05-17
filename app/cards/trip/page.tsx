import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { tripDetail } from "@/lib/detail-content";
import { buildDetailMetadata } from "@/lib/seo";

import { TripClient } from "./TripClient";

export function generateMetadata(): Metadata {
  return buildDetailMetadata("trip");
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: tripDetail.title,
          description: tripDetail.description,
          image: ["/cards/trip/opengraph-image"],
          inLanguage: "zh-CN",
          author: { "@type": "Organization", name: "Tonight Lab" },
        }}
      />
      <TripClient />
    </>
  );
}
