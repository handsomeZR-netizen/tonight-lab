import { foodDetail } from "@/lib/detail-content";
import {
  renderToneOgImage,
  toneOgContentType,
  toneOgSize,
} from "@/lib/og-tone-image";

export const runtime = "edge";
export const size = toneOgSize;
export const contentType = toneOgContentType;
export const alt = `${foodDetail.title} · Tonight Lab`;

export default function FoodOpengraphImage() {
  return renderToneOgImage("food");
}
