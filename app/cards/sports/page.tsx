"use client";

import {
  Activity,
  Flame,
  MessageCircle,
  Radio,
  ShieldHalf,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

import { SportsTacticalBoard } from "@/components/cards/sports/SportsTacticalBoard";
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
import { sportsDetail } from "@/lib/detail-content";

const predictionOptions = [
  {
    id: "home",
    label: "主队先声夺人",
    scoreNudge: "+ 8%",
    copy: "你的弹幕会更敢喊，但也更容易被一次反击打断情绪。",
  },
  {
    id: "draw",
    label: "中场拉扯到半场",
    scoreNudge: "+ 5%",
    copy: "你会更像冷静解说，重点盯住第二落点和换人信号。",
  },
  {
    id: "player",
    label: "球星制造名场面",
    scoreNudge: "+ 11%",
    copy: "镜头跟着福登走，跑位成功时这场就会突然变好看。",
  },
];

const intensityModes = {
  low: {
    label: "低噪观看",
    task: "先关掉无关群聊，前 15 分钟只记一次有效推进。",
    chantPrefix: "冷静版",
    badge: "适合一个人看",
  },
  high: {
    label: "热血上头",
    task: "进攻三区一拿球就准备发弹幕，主打一个氛围先满。",
    chantPrefix: "上头版",
    badge: "适合和朋友连麦",
  },
} as const;

const sportsFieldNotes = [
  {
    title: "为什么把视角拆成 3 种",
    body: "主胜、平局、球星 — 这三种视角对应三种「看球的姿势」。先选立场，再决定弹幕怎么发，比比分预测更接近真实观赛体验。",
  },
  {
    title: "为什么有「冷静」和「热血」两档",
    body: "晚上 10 点和朋友连麦的强度，不该跟一个人静音看是一种。两档让你能把氛围调到正确的位置。",
  },
  {
    title: "战术板为什么是 3×3",
    body: "9 格刚好够你画一笔，不需要完整阵型也能表达「我今晚站哪边」。让「画一笔」成为下注前的小仪式。",
  },
];

export default function SportsDetailPage() {
  const [activeModeId, setActiveModeId] = useState(sportsDetail.modes[0].id);
  const [predictionId, setPredictionId] = useState(predictionOptions[0].id);
  const [intensity, setIntensity] = useState<keyof typeof intensityModes>("low");

  const activeMode =
    sportsDetail.modes.find((mode) => mode.id === activeModeId) ??
    sportsDetail.modes[0];

  const activePrediction =
    predictionOptions.find((option) => option.id === predictionId) ??
    predictionOptions[0];

  const intensityMode = intensityModes[intensity];

  const livePulse = useMemo(() => {
    const index = sportsDetail.modes.findIndex((mode) => mode.id === activeMode.id);
    return 58 + Math.max(index, 0) * 9 + (intensity === "high" ? 13 : 0);
  }, [activeMode.id, intensity]);

  const sceneOptions = useMemo(
    () => ({
      intensity: 0.55 + (intensity === "high" ? 0.22 : 0),
      sports: {
        high: intensity === "high",
        prediction: predictionId as "home" | "draw" | "player",
      },
    }),
    [intensity, predictionId],
  );

  return (
    <>
      <DetailPageShell
        cover={sportsDetail.cover}
        description={sportsDetail.description}
        kicker={sportsDetail.kicker}
        title={sportsDetail.title}
        tone="sports"
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
          { label: "Section", value: "MATCH ROOM" },
          { label: "Angle", value: activeMode.angle },
          { label: "Edition", value: "№ 03" },
        ]}
      >
        <div className="space-y-20">
          {/* Score Stat - signature large numbers */}
          <RevealSection className="space-y-10">
            <SectionLabel n={1} title="Tonight's pick" tone="sports" />
            <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700">
                  Score Prediction · {activeMode.label}
                </p>
                <div className="flex items-center gap-8">
                  <span className="font-display text-stat-xl text-emerald-950">
                    {activeMode.score.split(":")[0]?.trim() ?? "0"}
                  </span>
                  <span className="font-display text-stat-xl italic text-emerald-500">
                    :
                  </span>
                  <span className="font-display text-stat-xl text-emerald-950">
                    {activeMode.score.split(":")[1]?.trim() ?? "0"}
                  </span>
                </div>
                <p className="font-display italic text-xl text-slate-700">
                  Your Pick · {activeMode.angle}
                </p>
              </div>
              <StatBlock
                tone="sports"
                columns={2}
                size="md"
                items={[
                  {
                    value: livePulse,
                    label: "Live Pulse %",
                    countUp: true,
                    caption: intensityMode.label,
                  },
                  {
                    value: activePrediction.scoreNudge,
                    label: "Nudge",
                    countUp: false,
                    caption: "弹幕情绪倾向",
                  },
                  {
                    value: 15,
                    label: "Minutes to Kickoff",
                    countUp: true,
                    caption: "开赛前的小热身",
                  },
                  {
                    value: sportsDetail.modes.length,
                    label: "Views Available",
                    caption: "切换不同立场",
                  },
                ]}
              />
            </div>
          </RevealSection>

          {/* Pull quote */}
          <RevealSection>
            <PullQuote
              tone="sports"
              variant="dark"
              attribution={`Match Brief · ${activeMode.label}`}
            >
              {activeMode.headline}
            </PullQuote>
          </RevealSection>

          {/* Console (Pick a side + Tactical Board) */}
          <RevealSection className="space-y-6">
            <SectionLabel n={2} title="Pick a side" tone="sports" />
            <PlayModeTabs
              activeId={activeMode.id}
              modes={sportsDetail.modes}
              tone="sports"
              onChange={setActiveModeId}
            />

            <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
              <section className="space-y-5">
                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-phone">
                  <div className="bg-slate-950 px-5 py-5 text-white sm:px-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-emerald-300">
                          <Radio className="h-4 w-4" />
                          Live Room Mock
                        </p>
                        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight">
                          {activeMode.headline}
                        </h2>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur">
                        <p className="text-xs text-white/60">预测比分</p>
                        <p className="mt-1 font-display text-4xl tabular-nums text-white">
                          {activeMode.score}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                        <p className="text-xs text-white/55">观赛视角</p>
                        <p className="mt-1 font-semibold text-white">{activeMode.angle}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                        <p className="text-xs text-white/55">现场热度</p>
                        <p className="mt-1 font-semibold text-lime-200">{livePulse}%</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                        <p className="text-xs text-white/55">观赛档位</p>
                        <p className="mt-1 font-semibold text-amber-200">
                          {intensityMode.label}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 p-5 sm:p-6 xl:grid-cols-[0.95fr_1.05fr]">
                    <div className="rounded-[24px] border border-slate-200 bg-[linear-gradient(135deg,hsl(150_70%_96%),white_58%,hsl(45_100%_96%))] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-950 text-white">
                            <Trophy className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-slate-950">
                              Score Prediction
                            </p>
                            <p className="text-xs text-slate-500">点击改写今晚立场</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-soft">
                          {activePrediction.scoreNudge}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-2">
                        {predictionOptions.map((option) => {
                          const active = option.id === predictionId;
                          return (
                            <button
                              aria-pressed={active}
                              className={cn(
                                "rounded-2xl border bg-white/78 px-3 py-3 text-left shadow-soft transition hover:-translate-y-0.5",
                                active
                                  ? "border-emerald-900 bg-emerald-950 text-white"
                                  : "border-slate-200 text-slate-700 hover:border-emerald-200",
                              )}
                              key={option.id}
                              type="button"
                              onClick={() => setPredictionId(option.id)}
                            >
                              <span className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold">{option.label}</span>
                                <Target
                                  className={cn(
                                    "h-4 w-4",
                                    active ? "text-lime-200" : "text-emerald-600",
                                  )}
                                />
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <p className="mt-4 rounded-2xl bg-white/82 p-3 text-sm leading-6 text-slate-600">
                        {activePrediction.copy}
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                            <Sparkles className="h-4 w-4 text-emerald-600" />
                            三个赛前看点
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            跟着这个顺序看，弹幕不会把你带乱。
                          </p>
                        </div>
                        <Button
                          className={cn(
                            "rounded-full",
                            intensity === "high" && "bg-emerald-950 text-white hover:bg-emerald-900",
                          )}
                          type="button"
                          variant={intensity === "high" ? "default" : "outline"}
                          onClick={() =>
                            setIntensity((current) => (current === "low" ? "high" : "low"))
                          }
                        >
                          <Flame className="h-4 w-4" />
                          {intensityMode.label}
                        </Button>
                      </div>

                      <div className="mt-4 grid gap-3">
                        {activeMode.insights.map((insight, index) => (
                          <article
                            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft"
                            key={insight.title}
                          >
                            <div className="flex gap-3">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white">
                                {index + 1}
                              </span>
                              <div>
                                <h3 className="text-base font-semibold leading-snug text-slate-950">
                                  {insight.title}
                                </h3>
                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                  {insight.detail}
                                </p>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <aside className="space-y-5">
                <div className="rounded-[28px] border border-slate-200 bg-white/88 p-5 shadow-phone backdrop-blur">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                        <MessageCircle className="h-4 w-4 text-emerald-600" />
                        球迷任务板
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{intensityMode.badge}</p>
                    </div>
                    <div className="flex rounded-full border border-slate-200 bg-slate-100 p-1">
                      {(["low", "high"] as const).map((mode) => (
                        <button
                          className={cn(
                            "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                            intensity === mode
                              ? "bg-white text-slate-950 shadow-soft"
                              : "text-slate-500",
                          )}
                          key={mode}
                          type="button"
                          onClick={() => setIntensity(mode)}
                        >
                          {mode === "low" ? "冷静" : "燃"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-[24px] border border-emerald-100 bg-emerald-50/80 p-4">
                    <p className="text-xs font-semibold text-emerald-700">
                      {intensityMode.chantPrefix} Chant
                    </p>
                    <p className="mt-2 font-display text-2xl leading-tight text-slate-950">
                      {activeMode.chant}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {intensityMode.task}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white">
                      <Zap className="h-4 w-4 text-lime-300" />
                      <p className="mt-3 text-xs text-white/60">弹幕触发词</p>
                      <p className="mt-1 text-lg font-semibold">
                        {predictionId === "player" ? "跑到空当" : "稳住节奏"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <Activity className="h-4 w-4 text-amber-500" />
                      <p className="mt-3 text-xs text-slate-500">赛前提醒</p>
                      <p className="mt-1 text-lg font-semibold text-slate-950">
                        {intensity === "high" ? "先备饮料" : "先看阵型"}
                      </p>
                    </div>
                  </div>
                </div>

                <MetricPills metrics={activeMode.metrics} />

                <ShareResultCard
                  note={`${intensityMode.chantPrefix}弹幕：${activeMode.chant}`}
                  result={`${activeMode.result} ${activePrediction.copy}`}
                  title={`${activeMode.label} · ${activeMode.score}`}
                  tone="sports"
                />

                <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                    <ShieldHalf className="h-4 w-4 text-emerald-600" />
                    开赛前 15 分钟清单
                  </p>
                  <div className="mt-4 grid gap-2 text-sm text-slate-600">
                    <p className="rounded-2xl bg-slate-50 px-3 py-2">1. 先确认今晚视角：{activeMode.angle}</p>
                    <p className="rounded-2xl bg-slate-50 px-3 py-2">2. 截图保存预测：{activeMode.score}</p>
                    <p className="rounded-2xl bg-slate-50 px-3 py-2">3. 发一句开场弹幕：{activeMode.chant}</p>
                  </div>
                </div>
              </aside>
            </div>
          </RevealSection>

          {/* Chant Pull Quote */}
          <RevealSection>
            <PullQuote tone="sports" attribution={`Chant · ${intensityMode.chantPrefix}`}>
              {activeMode.chant}
            </PullQuote>
          </RevealSection>

          {/* Match-up Sheet */}
          <RevealSection className="space-y-8">
            <SectionLabel n={3} title="Match-up Sheet · 对位手册" tone="sports" />
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
              <div className="grid grid-cols-[1fr_1.6fr] border-b border-slate-200 bg-slate-50 px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-slate-600">
                <span>Watch · 看点</span>
                <span>Why · 因为</span>
              </div>
              {activeMode.insights.map((insight) => (
                <div
                  key={insight.title}
                  className="grid grid-cols-[1fr_1.6fr] gap-6 border-b border-slate-100 px-6 py-5 last:border-none"
                >
                  <p className="font-display text-lg text-slate-900">{insight.title}</p>
                  <p className="text-sm leading-7 text-slate-600">{insight.detail}</p>
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Field Notes */}
          <RevealSection>
            <FieldNotes notes={sportsFieldNotes} tone="sports" />
          </RevealSection>

          {/* Signature */}
          <RevealSection>
            <SportsTacticalBoard
              score={activeMode.score}
              intensity={intensity}
              chant={activeMode.chant}
            />
          </RevealSection>
        </div>
      </DetailPageShell>

      <NextTonightStrip currentTone="sports" />
    </>
  );
}
