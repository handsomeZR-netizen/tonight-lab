import type { DetailTone } from "@/lib/detail-content";
import { toneTokens } from "@/lib/tone-tokens";

const sceneLabel: Record<DetailTone, string> = {
  food: "今晚吃什么",
  trip: "城市路线",
  sports: "赛前观察",
  recovery: "回血流程",
};

const sceneKicker: Record<DetailTone, string> = {
  food: "TONIGHT'S MENU LAB",
  trip: "MICRO ESCAPE FIELD GUIDE",
  sports: "PRE-MATCH ROOM",
  recovery: "AFTER HOURS RITUAL",
};

type SceneLoadingProps = {
  tone: DetailTone;
};

export function SceneLoading({ tone }: SceneLoadingProps) {
  const tokens = toneTokens[tone];

  return (
    <main
      className={`relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br ${tokens.glow}`}
    >
      <div className="absolute inset-0 bg-[hsl(44_38%_97%)]/60" />
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full"
            style={{ backgroundColor: tokens.ringHex }}
          />
          <p
            className={`font-sans text-[11px] font-medium uppercase tracking-[0.28em] ${tokens.accentText}`}
          >
            {sceneKicker[tone]} · LOADING
          </p>
        </div>
        <p
          className={`font-display text-lg italic ${tokens.ink}`}
          style={{ letterSpacing: "-0.005em" }}
        >
          正在准备{sceneLabel[tone]}…
        </p>
      </div>
    </main>
  );
}
