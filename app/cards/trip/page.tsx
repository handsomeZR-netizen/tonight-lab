import type { Metadata } from "next";

import { buildDetailMetadata } from "@/lib/seo";

import { TripClient } from "./TripClient";

export function generateMetadata(): Metadata {
  return buildDetailMetadata("trip");
}

export default function Page() {
  return <TripClient />;
}
