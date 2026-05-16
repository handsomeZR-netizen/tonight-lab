import { cn } from "@/lib/cn";

type GrainOverlayProps = {
  opacity?: number;
  blendMode?: "multiply" | "soft-light" | "overlay" | "screen";
  fixed?: boolean;
  className?: string;
};

const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;

const GRAIN_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(GRAIN_SVG)}`;

export function GrainOverlay({
  opacity = 0.07,
  blendMode = "soft-light",
  fixed,
  className,
}: GrainOverlayProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none inset-0",
        fixed ? "fixed" : "absolute",
        className,
      )}
      style={{
        backgroundImage: `url("${GRAIN_DATA_URL}")`,
        backgroundRepeat: "repeat",
        opacity,
        mixBlendMode: blendMode,
      }}
    />
  );
}
