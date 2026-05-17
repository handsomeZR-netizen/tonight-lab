import type { MetadataRoute } from "next";

import { siteMetadataBase } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "/", priority: 1 },
    { path: "/press", priority: 0.7 },
    { path: "/cards/food", priority: 0.9 },
    { path: "/cards/trip", priority: 0.9 },
    { path: "/cards/sports", priority: 0.9 },
    { path: "/cards/recovery", priority: 0.9 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${siteMetadataBase}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
