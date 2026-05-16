import type { Metadata } from "next";

import { buildDetailMetadata } from "@/lib/seo";

import { SportsClient } from "./SportsClient";

export function generateMetadata(): Metadata {
  return buildDetailMetadata("sports");
}

export default function Page() {
  return <SportsClient />;
}
