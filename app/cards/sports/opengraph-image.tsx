import { sportsDetail } from "@/lib/detail-content";
import {
  renderToneOgImage,
  toneOgContentType,
  toneOgSize,
} from "@/lib/og-tone-image";

export const runtime = "edge";
export const size = toneOgSize;
export const contentType = toneOgContentType;
export const alt = `${sportsDetail.title} · Tonight Lab`;

export default function SportsOpengraphImage() {
  return renderToneOgImage("sports");
}
