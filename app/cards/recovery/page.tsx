import type { Metadata } from "next";

import { buildDetailMetadata } from "@/lib/seo";

import { RecoveryClient } from "./RecoveryClient";

export function generateMetadata(): Metadata {
  return buildDetailMetadata("recovery");
}

export default function Page() {
  return <RecoveryClient />;
}
