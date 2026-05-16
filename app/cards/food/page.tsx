import type { Metadata } from "next";

import { buildDetailMetadata } from "@/lib/seo";

import { FoodClient } from "./FoodClient";

export function generateMetadata(): Metadata {
  return buildDetailMetadata("food");
}

export default function Page() {
  return <FoodClient />;
}
