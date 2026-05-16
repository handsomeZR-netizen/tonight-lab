import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { recoveryDetail } from "@/lib/detail-content";
import { buildDetailMetadata } from "@/lib/seo";

import { RecoveryClient } from "./RecoveryClient";

export function generateMetadata(): Metadata {
  return buildDetailMetadata("recovery");
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: recoveryDetail.title,
          description: recoveryDetail.description,
          image: ["/cards/recovery/opengraph-image"],
          inLanguage: "zh-CN",
          author: { "@type": "Organization", name: "Tonight Lab" },
        }}
      />
      <RecoveryClient />
    </>
  );
}
