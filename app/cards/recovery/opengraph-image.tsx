import { recoveryDetail } from "@/lib/detail-content";
import {
  renderToneOgImage,
  toneOgContentType,
  toneOgSize,
} from "@/lib/og-tone-image";

export const runtime = "edge";
export const size = toneOgSize;
export const contentType = toneOgContentType;
export const alt = `${recoveryDetail.title} · Tonight Lab`;

export default function RecoveryOpengraphImage() {
  return renderToneOgImage("recovery");
}
