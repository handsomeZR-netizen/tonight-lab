import type { Metadata } from "next";

import {
  foodDetail,
  recoveryDetail,
  sportsDetail,
  tripDetail,
  type DetailTone,
} from "./detail-content";

export const siteMetadataBase = "https://tonight-lab.vercel.app";
export const siteName = "Tonight Lab";
export const siteTitle = "Tonight Lab · 今晚的轻决策信息流";
export const siteDescription =
  "一个把「今晚到底做什么」包装成 AI 场景叙事的沉浸式信息流 demo。";

type DetailContent = {
  title: string;
  kicker: string;
  description: string;
  cover: string;
};

const detailMap: Record<DetailTone, DetailContent> = {
  food: foodDetail,
  trip: tripDetail,
  sports: sportsDetail,
  recovery: recoveryDetail,
};

const tonePathMap: Record<DetailTone, string> = {
  food: "/cards/food",
  trip: "/cards/trip",
  sports: "/cards/sports",
  recovery: "/cards/recovery",
};

export function buildDetailMetadata(tone: DetailTone): Metadata {
  const detail = detailMap[tone];
  const path = tonePathMap[tone];
  const ogImage = `${path}/opengraph-image`;
  const description =
    detail.description.length > 160
      ? `${detail.description.slice(0, 157)}…`
      : detail.description;

  return {
    title: detail.title,
    description,
    keywords: [
      "Tonight Lab",
      "今晚做什么",
      "AI 信息流",
      "轻决策",
      detail.title,
      detail.kicker,
    ],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      locale: "zh_CN",
      title: `${detail.title} · ${siteName}`,
      description,
      siteName,
      url: path,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${detail.title} · ${siteName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${detail.title} · ${siteName}`,
      description,
      images: [ogImage],
    },
  };
}
