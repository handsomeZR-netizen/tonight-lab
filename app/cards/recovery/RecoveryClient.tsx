"use client";

import {
  Check,
  Circle,
  Headphones,
  Moon,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  TimerReset,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

import { RecoveryBreathOrb } from "@/components/cards/recovery/RecoveryBreathOrb";
import { DetailPageShell } from "@/components/detail/DetailPageShell";
import { MetricPills } from "@/components/detail/MetricPills";
import { PlayModeTabs } from "@/components/detail/PlayModeTabs";
import { ShareResultCard } from "@/components/detail/ShareResultCard";
import {
  FieldNotes,
  NextTonightStrip,
  PullQuote,
  RevealSection,
  SectionLabel,
  StatBlock,
} from "@/components/editorial";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { recoveryDetail } from "@/lib/detail-content";

const intensityOptions = [
  {
    id: "soft",
    label: "轻轻来",
    minutes: 8,
    copy: "只做最小动作，适合刚进门还没缓过来的状态。",
    glow: "from-teal-300 via-violet-300 to-white",
  },
  {
    id: "steady",
    label: "认真回血",
    minutes: 12,
    copy: "按步骤走完，给今晚留一个清楚的收尾。",
    glow: "from-violet-400 via-fuchsia-300 to-sky-200",
  },
  {
    id: "quick",
    label: "快速收尾",
    minutes: 5,
    copy: "把刺激降下来就停，不把恢复做成新任务。",
    glow: "from-amber-200 via-rose-200 to-violet-200",
  },
];

const ambienceOptions = [
  { id: "lofi", label: "Lo-fi", icon: Headphones, copy: "低 BPM，别让歌单变成选择题。" },
  { id: "silent", label: "静音", icon: Moon, copy: "把外界音量关小一点，先听见自己。" },
  { id: "focus", label: "白噪", icon: Zap, copy: "盖住脑内弹幕，但不制造新刺激。" },
];

type IntensityId = (typeof intensityOptions)[number]["id"];
type AmbienceId = (typeof ambienceOptions)[number]["id"];

const recoveryFieldNotes = [
  {
    title: "为什么所有步骤都不超过 5 分钟",
    body: "晚上一旦超过 5 分钟，开始的人就开始减少。把每一步压短到自己能「啊就这？」，是回血流程能开始的唯一办法。",
  },
  {
    title: "为什么没用计时铃声",
    body: "铃声把放松变回考试。我们用进度条和气泡呼吸节奏暗示时间走过，但没有任何会让你紧张的声音。",
  },
];

const avoidByMode: Record<string, string[]> = {
  tired: ["不开会", "不立 flag", "不打开邮箱"],
  anxious: ["不分析", "不解释", "不向谁交代"],
  sleep: ["不刷短视频", "不开新对话", "不再补充哲学"],
};

export function RecoveryClient() {
  const [activeModeId, setActiveModeId] = useState(recoveryDetail.modes[0].id);
  const [completedSteps, setCompletedSteps] = useState<Record<string, string[]>>({});
  const [intensityId, setIntensityId] = useState<IntensityId>("steady");
  const [ambienceId, setAmbienceId] = useState<AmbienceId>("lofi");
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const activeMode =
    recoveryDetail.modes.find((mode) => mode.id === activeModeId) ??
    recoveryDetail.modes[0];
  const intensity =
    intensityOptions.find((option) => option.id === intensityId) ??
    intensityOptions[1];
  const ambience =
    ambienceOptions.find((option) => option.id === ambienceId) ??
    ambienceOptions[0];

  const checked = completedSteps[activeMode.id] ?? [];
  const completedCount = checked.length;
  const progress = Math.round((completedCount / activeMode.steps.length) * 100);
  const allDone = completedCount === activeMode.steps.length;
  const ActiveAmbienceIcon = ambience.icon;

  const liveNote = useMemo(() => {
    if (allDone) {
      return "已完成，今晚可以把自己放过一点。";
    }
    if (completedCount === 0) {
      return "先点亮第一步，别急着把整晚安排满。";
    }
    return `已经完成 ${completedCount} 步，继续保持这种低阻力节奏。`;
  }, [allDone, completedCount]);

  const sceneOptions = useMemo(
    () => ({
      intensity: 0.6 + (isTimerRunning ? 0.18 : 0),
      recovery: { fast: isTimerRunning },
    }),
    [isTimerRunning],
  );

  const avoidList = avoidByMode[activeMode.id] ?? ["不补充新任务", "不向谁交代", "不再刷"];

  function toggleStep(stepText: string) {
    setCompletedSteps((current) => {
      const modeSteps = current[activeMode.id] ?? [];
      const nextSteps = modeSteps.includes(stepText)
        ? modeSteps.filter((text) => text !== stepText)
        : [...modeSteps, stepText];

      return {
        ...current,
        [activeMode.id]: nextSteps,
      };
    });
  }

  function resetCurrentMode() {
    setCompletedSteps((current) => ({
      ...current,
      [activeMode.id]: [],
    }));
    setIsTimerRunning(false);
  }

  return (
    <>
      <DetailPageShell
        cover={recoveryDetail.cover}
        description={recoveryDetail.description}
        kicker={recoveryDetail.kicker}
        title={recoveryDetail.title}
        tone="recovery"
        sceneOptions={sceneOptions}
        metaCells={[
          {
            label: "Date",
            value: new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "2-digit",
            })
              .format(new Date())
              .toUpperCase(),
          },
          { label: "Section", value: "AFTER HOURS" },
          { label: "Duration", value: `${intensity.minutes} min` },
          { label: "Edition", value: "№ 04" },
        ]}
      >
        <div className="space-y-20">
          {/* Opening Pull Quote — the page's thesis */}
          <RevealSection>
            <PullQuote
              tone="recovery"
              attribution="Tonight's thesis"
              align="center"
            >
              不用变好，只需要不继续硬撑。
            </PullQuote>
          </RevealSection>

          {/* Stat Block */}
          <RevealSection className="space-y-10">
            <SectionLabel n={1} title="Recovery vitals" tone="recovery" />
            <StatBlock
              tone="recovery"
              items={[
                {
                  value: activeMode.duration,
                  label: "Tonight's Duration",
                  countUp: false,
                  caption: "够开始，不到压力。",
                },
                {
                  value: activeMode.steps.length,
                  label: "Steps",
                  countUp: true,
                  caption: "每一步都不超过 5 分钟。",
                },
                {
                  value: progress,
                  label: "Recovery %",
                  suffix: "%",
                  countUp: true,
                  caption: liveNote,
                },
                {
                  value: intensity.minutes,
                  label: "Intensity Mins",
                  countUp: true,
                  caption: intensity.label,
                },
              ]}
            />
          </RevealSection>

          {/* Console */}
          <RevealSection className="space-y-6">
            <SectionLabel n={2} title="Tonight's flow" tone="recovery" />

            <PlayModeTabs
              activeId={activeMode.id}
              modes={recoveryDetail.modes}
              tone="recovery"
              onChange={(id) => {
                setActiveModeId(id);
                setIsTimerRunning(false);
              }}
            />

            <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
              <section className="space-y-5">
                <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/84 shadow-phone backdrop-blur">
                  <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="relative min-h-[310px] overflow-hidden bg-slate-950 p-5 text-white">
                      <div
                        className={cn(
                          "absolute -right-20 -top-16 h-64 w-64 rounded-full bg-gradient-to-br opacity-80 blur-3xl transition",
                          intensity.glow,
                          isTimerRunning && "scale-110 opacity-100",
                        )}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-36 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.92))]" />
                      <div className="relative flex h-full min-h-[270px] flex-col justify-between">
                        <div>
                          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/78 backdrop-blur">
                            <TimerReset className="h-3.5 w-3.5" />
                            {activeMode.duration} 仪式
                          </div>
                          <h2 className="mt-5 max-w-sm font-display text-3xl leading-tight">
                            {activeMode.headline}
                          </h2>
                          <p className="mt-3 max-w-sm text-sm leading-6 text-white/68">
                            {intensity.copy}
                          </p>
                        </div>

                        <div className="rounded-[24px] border border-white/14 bg-white/10 p-4 shadow-soft backdrop-blur-md">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-xs font-medium text-white/60">当前回血值</p>
                              <p className="mt-1 font-display text-4xl tabular-nums">
                                {progress}%
                              </p>
                            </div>
                            <button
                              aria-label={isTimerRunning ? "暂停计时" : "开始计时"}
                              className={cn(
                                "grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-white text-slate-950 shadow-phone transition",
                                isTimerRunning && "scale-105 bg-violet-100 text-violet-950",
                              )}
                              type="button"
                              onClick={() => setIsTimerRunning((current) => !current)}
                            >
                              {isTimerRunning ? (
                                <Pause className="h-6 w-6" />
                              ) : (
                                <Play className="h-6 w-6 fill-current" />
                              )}
                            </button>
                          </div>
                          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
                            <div
                              className="h-full rounded-full bg-white transition-all duration-500"
                              style={{ width: `${Math.max(progress, isTimerRunning ? 16 : 6)}%` }}
                            />
                          </div>
                          <p className="mt-3 text-sm leading-6 text-white/72">{liveNote}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">
                            Recovery Flow
                          </p>
                          <h3 className="mt-2 font-display text-2xl text-slate-950">
                            今日低阻力清单
                          </h3>
                        </div>
                        <Button
                          className="rounded-full"
                          size="sm"
                          type="button"
                          variant="glass"
                          onClick={resetCurrentMode}
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          重置
                        </Button>
                      </div>

                      <div className="mt-5 space-y-3">
                        {activeMode.steps.map((step, index) => {
                          const done = checked.includes(step.text);
                          return (
                            <button
                              className={cn(
                                "group grid w-full grid-cols-[auto_1fr_auto] items-start gap-3 rounded-2xl border bg-white p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-violet-200",
                                done
                                  ? "border-violet-200 bg-violet-50/82"
                                  : "border-slate-200",
                              )}
                              key={step.text}
                              type="button"
                              onClick={() => toggleStep(step.text)}
                            >
                              <span
                                className={cn(
                                  "mt-0.5 grid h-7 w-7 place-items-center rounded-full border transition",
                                  done
                                    ? "border-violet-500 bg-violet-600 text-white"
                                    : "border-slate-300 bg-white text-slate-400",
                                )}
                              >
                                {done ? <Check className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                              </span>
                              <span>
                                <span className="text-sm font-semibold text-slate-950">
                                  {index + 1}. {step.text}
                                </span>
                                <span className="mt-1 block text-sm leading-6 text-slate-600">
                                  {step.note}
                                </span>
                              </span>
                              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                                {step.duration}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <aside className="space-y-5">
                <MetricPills metrics={activeMode.metrics} />

                <div className="rounded-[28px] border border-slate-200 bg-white/86 p-5 shadow-phone backdrop-blur">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Control
                      </p>
                      <h3 className="mt-2 font-display text-2xl text-slate-950">
                        强度和氛围
                      </h3>
                    </div>
                    <div className="rounded-2xl bg-slate-950 px-3 py-2 text-right text-white">
                      <p className="text-[11px] font-medium text-white/56">计时</p>
                      <p className="font-display text-lg tabular-nums">
                        {intensity.minutes}:00
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    {intensityOptions.map((option) => (
                      <button
                        className={cn(
                          "rounded-2xl border border-slate-200 bg-white px-3 py-3 text-left shadow-soft transition hover:border-violet-200",
                          option.id === intensity.id &&
                            "border-violet-700 bg-violet-950 text-white",
                        )}
                        key={option.id}
                        type="button"
                        onClick={() => setIntensityId(option.id)}
                      >
                        <p className="text-sm font-semibold">{option.label}</p>
                        <p
                          className={cn(
                            "mt-1 text-xs text-slate-500",
                            option.id === intensity.id && "text-white/64",
                          )}
                        >
                          {option.minutes} 分钟
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-3">
                    <div className="grid gap-2 sm:grid-cols-3">
                      {ambienceOptions.map((option) => {
                        const Icon = option.icon;
                        const selected = option.id === ambience.id;
                        return (
                          <button
                            className={cn(
                              "flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-white",
                              selected && "bg-white text-violet-700 shadow-soft",
                            )}
                            key={option.id}
                            type="button"
                            onClick={() => setAmbienceId(option.id)}
                          >
                            <Icon className="h-4 w-4" />
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-3 flex items-start gap-3 rounded-2xl bg-white p-3 text-sm leading-6 text-slate-600 shadow-soft">
                      <ActiveAmbienceIcon className="mt-1 h-4 w-4 shrink-0 text-violet-600" />
                      <p>{ambience.copy}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-violet-100 bg-white/78 p-5 shadow-soft backdrop-blur">
                  <div className="flex items-center gap-2 text-sm font-semibold text-violet-700">
                    <Sparkles className="h-4 w-4" />
                    今晚承诺
                  </div>
                  <p className="mt-3 font-display text-xl leading-snug text-slate-950">
                    {activeMode.promise}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {allDone
                      ? "清单已点亮，可以停止优化今晚。"
                      : "每完成一步，结果卡会更像一个已经开始的计划，而不是又一个收藏。"}
                  </p>
                </div>

                <ShareResultCard
                  note={`${activeMode.promise} 当前完成 ${completedCount}/${activeMode.steps.length} 步，氛围：${ambience.label}。`}
                  result={allDone ? `${activeMode.result} 清单已完成，可以收工。` : activeMode.result}
                  title={allDone ? "回血完成，准许离线" : `${activeMode.label}版回血卡`}
                  tone="recovery"
                />
              </aside>
            </div>
          </RevealSection>

          {/* Pull Quote 2 — promise */}
          <RevealSection>
            <PullQuote tone="recovery" variant="dark" align="center">
              {activeMode.promise}
            </PullQuote>
          </RevealSection>

          {/* Tonight's don'ts */}
          <RevealSection className="space-y-8">
            <SectionLabel n={3} title="Tonight's don'ts" tone="recovery" />
            <div className="grid gap-4 sm:grid-cols-3">
              {avoidList.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-violet-200 bg-violet-50/40 p-5"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                    <X className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-display text-xl text-slate-900">{item}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    今晚不是「再多努力一下」的夜晚。
                  </p>
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Field Notes */}
          <RevealSection>
            <FieldNotes notes={recoveryFieldNotes} tone="recovery" />
          </RevealSection>

          {/* Signature - Breath Orb */}
          <RevealSection>
            <RecoveryBreathOrb />
          </RevealSection>
        </div>
      </DetailPageShell>

      <NextTonightStrip currentTone="recovery" />
    </>
  );
}
