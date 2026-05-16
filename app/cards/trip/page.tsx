"use client";

import {
  Camera,
  Check,
  CloudRain,
  Footprints,
  MapPinned,
  Navigation,
  Route,
  Timer,
  Umbrella,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

import { TripTimelineSVG } from "@/components/cards/trip/TripTimelineSVG";
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
import { tripDetail, type Metric } from "@/lib/detail-content";

const routeMeta = {
  slow: {
    distance: "2.1 km",
    walk: "28 min",
    budget: "¥82",
    crowd: "低噪",
    route: "咖啡店 -> 河边 -> 小酒馆",
  },
  photo: {
    distance: "2.8 km",
    walk: "41 min",
    budget: "¥96",
    crowd: "有街景",
    route: "橱窗 -> 河边转角 -> 霓虹门头",
  },
  solo: {
    distance: "1.7 km",
    walk: "23 min",
    budget: "¥74",
    crowd: "低社交",
    route: "靠窗位 -> 书店 -> 吧台",
  },
} as const;

const vibeCopy = {
  sunset: {
    label: "黄昏光",
    title: "等一段蓝金色过渡",
    detail: "把最开阔的一站放在 17:10 之后，画面会更轻。",
  },
  neon: {
    label: "霓虹感",
    title: "让夜色收尾更像短片",
    detail: "最后一站优先门头、玻璃和路灯，不靠摆拍也有氛围。",
  },
};

const tripFieldNotes = [
  {
    title: "为什么把「拍照优先」做成开关",
    body: "想拍点东西和单纯散步是两种节奏。一直默认开会让「无目的逛街」变成一项任务，所以放在第二层，由你决定。",
  },
  {
    title: "为什么 Plan B 默认是开的",
    body: "天气在 3 小时内变脸的概率不低。Plan B 不是焦虑，是「被淋湿了也能继续」的小信心。",
  },
  {
    title: "1.4 km 比 2.1 km 更像逃离",
    body: "短距离 + 一个能坐下的点，比「打卡 5 个地方」更接近一个让人放松的下班场景。",
  },
];

export default function TripDetailPage() {
  const [activeId, setActiveId] = useState(tripDetail.modes[0].id);
  const [photoFirst, setPhotoFirst] = useState(false);
  const [lessWalk, setLessWalk] = useState(false);
  const [planBOpen, setPlanBOpen] = useState(true);
  const [vibe, setVibe] = useState<keyof typeof vibeCopy>("sunset");

  const activeMode = useMemo(
    () => tripDetail.modes.find((mode) => mode.id === activeId) ?? tripDetail.modes[0],
    [activeId],
  );

  const meta = routeMeta[activeMode.id as keyof typeof routeMeta];
  const adjustedMetrics = useMemo(
    () => tuneMetrics(activeMode.metrics, { photoFirst, lessWalk, planBOpen }),
    [activeMode.metrics, photoFirst, lessWalk, planBOpen],
  );

  const routeMood = [
    photoFirst ? "出片优先" : activeMode.mood,
    lessWalk ? "少走路" : "正常步行",
    planBOpen ? "Plan B 已备好" : "只看主线",
  ].join(" / ");

  const sceneOptions = useMemo(
    () => ({
      intensity: 0.6 + (photoFirst ? 0.12 : 0),
      trip: { vibe, lessWalk, photoFirst },
    }),
    [vibe, lessWalk, photoFirst],
  );

  return (
    <>
      <DetailPageShell
        cover={tripDetail.cover}
        description={tripDetail.description}
        kicker={tripDetail.kicker}
        title={tripDetail.title}
        tone="trip"
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
          { label: "Section", value: "FIELD GUIDE" },
          { label: "Distance", value: lessWalk ? "1.4 km" : meta.distance },
          { label: "Edition", value: "№ 02" },
        ]}
      >
        <div className="space-y-20">
          {/* Pull quote */}
          <RevealSection>
            <PullQuote
              tone="trip"
              attribution={`Mode · ${activeMode.label}`}
            >
              {photoFirst
                ? "把好看的点排在光线还在的时候。"
                : activeMode.headline}
            </PullQuote>
          </RevealSection>

          {/* Stat Block */}
          <RevealSection className="space-y-10">
            <SectionLabel n={1} title="Trip vitals" tone="trip" />
            <StatBlock
              tone="trip"
              items={[
                {
                  value: activeMode.stops.length,
                  label: "Stops Tonight",
                  caption: "短到能走完的节奏。",
                },
                {
                  value: lessWalk ? "1.4 km" : meta.distance,
                  label: "Total Distance",
                  countUp: false,
                  caption: lessWalk ? "已压缩步行" : "保留绕路空间",
                },
                {
                  value: lessWalk ? "18 min" : meta.walk,
                  label: "Walking",
                  countUp: false,
                  caption: meta.crowd,
                },
                {
                  value: meta.budget,
                  label: "Budget",
                  countUp: false,
                  caption: "含一杯热饮和一份简餐。",
                },
              ]}
            />
          </RevealSection>

          {/* Console */}
          <RevealSection className="space-y-6">
            <SectionLabel n={2} title="The Itinerary · 路线轴" tone="trip" />
            <PlayModeTabs
              activeId={activeId}
              modes={tripDetail.modes}
              tone="trip"
              onChange={setActiveId}
            />

            <div className="rounded-[30px] border border-sky-100 bg-white/86 p-4 shadow-phone backdrop-blur sm:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                    <Route className="h-3.5 w-3.5" />
                    {routeMood}
                  </div>
                  <h2 className="mt-4 font-display text-3xl leading-tight text-slate-950">
                    {photoFirst ? "把好看的点排在光线还在的时候。" : activeMode.headline}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    {lessWalk
                      ? "路线已压缩步行距离，优先地铁口、相邻街区和能坐下的点。"
                      : "保留一点绕路空间，给街角、树影和临时想停下来的瞬间。"}
                  </p>
                </div>

                <div className="grid min-w-[220px] grid-cols-2 gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-2">
                  <MiniStat label="总距离" value={lessWalk ? "1.4 km" : meta.distance} />
                  <MiniStat label="步行" value={lessWalk ? "18 min" : meta.walk} />
                  <MiniStat label="预算" value={meta.budget} />
                  <MiniStat label="人流" value={meta.crowd} />
                </div>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <ToggleChip
                  active={photoFirst}
                  icon={<Camera className="h-4 w-4" />}
                  label="出片优先"
                  onClick={() => setPhotoFirst((value) => !value)}
                />
                <ToggleChip
                  active={lessWalk}
                  icon={<Footprints className="h-4 w-4" />}
                  label="少走路"
                  onClick={() => setLessWalk((value) => !value)}
                />
                <ToggleChip
                  active={planBOpen}
                  icon={<Umbrella className="h-4 w-4" />}
                  label="Plan B"
                  onClick={() => setPlanBOpen((value) => !value)}
                />
                <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-soft">
                  {(Object.keys(vibeCopy) as Array<keyof typeof vibeCopy>).map((key) => (
                    <button
                      className={cn(
                        "rounded-xl px-3 py-2 text-xs font-semibold text-slate-500 transition",
                        vibe === key && "bg-sky-950 text-white shadow-soft",
                      )}
                      key={key}
                      type="button"
                      onClick={() => setVibe(key)}
                    >
                      {vibeCopy[key].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
              <RouteBoard
                lessWalk={lessWalk}
                photoFirst={photoFirst}
                stops={activeMode.stops}
                vibe={vibe}
              />

              <aside className="grid gap-4">
                <MetricPills metrics={adjustedMetrics} />

                <div className="rounded-[26px] border border-slate-200 bg-white/84 p-4 shadow-soft backdrop-blur">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                    <MapPinned className="h-4 w-4 text-sky-600" />
                    路线板
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{meta.route}</p>
                  <div className="mt-4 rounded-2xl border border-sky-100 bg-sky-50 p-3">
                    <p className="text-xs font-semibold text-sky-700">
                      {vibeCopy[vibe].title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      {vibeCopy[vibe].detail}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </RevealSection>

          {/* Pull Quote 2 - vibe-driven */}
          <RevealSection>
            <PullQuote tone="trip" variant="dark" align="center">
              {vibe === "sunset"
                ? "在 17:10 之后再开始这段路。"
                : "把夜色当成短片的最后一幕。"}
            </PullQuote>
          </RevealSection>

          {/* Plan B + Share */}
          <RevealSection className="grid gap-6 lg:grid-cols-2">
            <PlanBCard open={planBOpen} text={activeMode.planB} />
            <ShareResultCard
              note={
                planBOpen
                  ? `${activeMode.planB} 当前偏好：${routeMood}。`
                  : `当前偏好：${routeMood}。天气变化时可以重新打开 Plan B。`
              }
              result={
                photoFirst
                  ? `${activeMode.result} 先保证一张能发的照片，再慢慢逛。`
                  : activeMode.result
              }
              title={photoFirst ? "今晚的短逃逸出片版" : "今晚的短逃逸路线"}
              tone="trip"
            />
          </RevealSection>

          {/* Field Notes */}
          <RevealSection>
            <FieldNotes notes={tripFieldNotes} tone="trip" />
          </RevealSection>

          {/* Signature */}
          <RevealSection>
            <TripTimelineSVG
              stops={activeMode.stops}
              vibe={vibe}
              lessWalk={lessWalk}
              photoFirst={photoFirst}
            />
          </RevealSection>
        </div>
      </DetailPageShell>

      <NextTonightStrip currentTone="trip" />
    </>
  );
}

function RouteBoard({
  stops,
  photoFirst,
  lessWalk,
  vibe,
}: {
  stops: typeof tripDetail.modes[number]["stops"];
  photoFirst: boolean;
  lessWalk: boolean;
  vibe: keyof typeof vibeCopy;
}) {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-sky-100 bg-[linear-gradient(180deg,rgba(240,249,255,0.92),rgba(255,255,255,0.92))] p-4 shadow-phone sm:p-5">
      <div className="absolute right-[-92px] top-[-92px] h-56 w-56 rounded-full bg-sky-200/36 blur-3xl" />
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-sky-700">
            <Navigation className="h-4 w-4" />
            3 小时路线轴
          </div>
          <h3 className="mt-2 font-display text-2xl text-slate-950">
            {photoFirst ? "先拍到，再松弛。" : "先降速，再出门。"}
          </h3>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/82 px-3 py-2 text-xs font-semibold text-slate-600 shadow-soft">
          <Timer className="h-4 w-4 text-sky-600" />
          {lessWalk ? "已减少 10 分钟步行" : "保留自由停留"}
        </div>
      </div>

      <div className="relative mt-5 grid gap-3 pl-3 sm:pl-5">
        <div className="absolute bottom-8 left-[1.25rem] top-6 w-px bg-sky-200 sm:left-[1.75rem]" />
        {stops.map((stop, index) => {
          const featured = photoFirst && index === (vibe === "sunset" ? 1 : stops.length - 1);
          return (
            <article
              className={cn(
                "relative rounded-3xl border bg-white/90 p-4 pl-6 shadow-soft transition",
                featured ? "border-sky-300 ring-2 ring-sky-100" : "border-slate-200",
              )}
              key={`${stop.time}-${stop.title}`}
            >
              <span
                className={cn(
                  "absolute left-[-0.92rem] top-5 flex h-5 w-5 items-center justify-center rounded-full border bg-white shadow-soft",
                  featured ? "border-sky-500" : "border-sky-300",
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    featured ? "bg-sky-600" : "bg-sky-400",
                  )}
                />
              </span>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold text-sky-700">{stop.time}</p>
                  <h4 className="mt-1 text-lg font-semibold leading-tight text-slate-950">
                    {stop.title}
                  </h4>
                </div>
                <span className="w-fit rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
                  {featured ? "主机位" : lessWalk ? "近距离" : `Stop ${index + 1}`}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {featured
                  ? `${stop.description} ${vibe === "sunset" ? "多留 12 分钟等光。" : "把夜色和玻璃反光一起收进来。"}`
                  : stop.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {[...stop.tags, ...(featured ? ["出片点"] : []), ...(lessWalk ? ["少走"] : [])].map(
                  (tag) => (
                    <span
                      className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white px-3 py-2 shadow-soft">
      <p className="text-[11px] font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function ToggleChip({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "inline-flex h-12 items-center justify-between gap-3 rounded-2xl border px-3 text-sm font-semibold shadow-soft transition",
        active
          ? "border-sky-900 bg-sky-950 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-sky-50",
      )}
      type="button"
      onClick={onClick}
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
      {active && <Check className="h-4 w-4" />}
    </button>
  );
}

function PlanBCard({ open, text }: { open: boolean; text: string }) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[28px] border p-5 shadow-phone transition",
        open
          ? "border-sky-200 bg-sky-950 text-white"
          : "border-slate-200 bg-white/82 text-slate-950",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
              open
                ? "border-white/20 bg-white/12 text-white"
                : "border-slate-200 bg-slate-50 text-slate-600",
            )}
          >
            <CloudRain className="h-3.5 w-3.5" />
            Plan B
          </div>
          <h2 className="mt-4 font-display text-2xl leading-tight">
            {open ? "天气变脸也不扫兴。" : "Plan B 暂时收起。"}
          </h2>
        </div>
        <Zap className={cn("h-5 w-5 shrink-0", open ? "text-sky-200" : "text-slate-400")} />
      </div>

      <p className={cn("mt-4 text-sm leading-6", open ? "text-white/78" : "text-slate-600")}>
        {open ? text : "结果卡会只保留主路线，适合天气稳定、体力也够的时候。"}
      </p>

      <Button
        className={cn(
          "mt-5 rounded-full",
          open ? "bg-white text-sky-950 hover:bg-sky-50" : "bg-sky-950 text-white",
        )}
        type="button"
        variant={open ? "secondary" : "default"}
      >
        {open ? "已加入结果卡" : "主线优先"}
      </Button>
    </section>
  );
}

function tuneMetrics(
  metrics: Metric[],
  state: { photoFirst: boolean; lessWalk: boolean; planBOpen: boolean },
) {
  return metrics.map((metric) => {
    if (state.lessWalk && metric.label === "步行压力") {
      return { ...metric, value: "更低" };
    }

    if (state.photoFirst && (metric.label === "出片指数" || metric.label === "分享欲")) {
      return { ...metric, value: metric.label === "出片指数" ? "94" : "很强" };
    }

    if (state.planBOpen && metric.label === "安全感") {
      return { ...metric, value: "91" };
    }

    return metric;
  });
}
