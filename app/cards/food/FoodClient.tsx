"use client";

import {
  BadgeCheck,
  Banknote,
  Clock3,
  Flame,
  Gauge,
  Heart,
  Minus,
  Plus,
  Sparkles,
  TriangleAlert,
  Utensils,
  WalletCards,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

import { FoodMenuFlip } from "@/components/cards/food/FoodMenuFlip";
import { DetailPageShell } from "@/components/detail/DetailPageShell";
import { MetricPills } from "@/components/detail/MetricPills";
import { PlayModeTabs } from "@/components/detail/PlayModeTabs";
import { ShareResultCard } from "@/components/detail/ShareResultCard";
import {
  FieldNotes,
  NextTonightStrip,
  NumberMarker,
  PullQuote,
  RevealSection,
  SectionLabel,
  StatBlock,
} from "@/components/editorial";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { foodDetail } from "@/lib/detail-content";

const budgetChoices = [
  { id: "save", label: "收住预算", value: "¥30 内" },
  { id: "balanced", label: "刚好吃爽", value: "¥40 内" },
  { id: "treat", label: "今晚放宽", value: "¥50 内" },
];

const spiceChoices = [
  { id: "low", label: "低辣", value: "温和" },
  { id: "medium", label: "微辣", value: "微刺激" },
  { id: "hot", label: "上头", value: "爽一下" },
];

const speedChoices = [
  { id: "rush", label: "马上吃", value: "20 分钟" },
  { id: "normal", label: "可以等", value: "30 分钟" },
  { id: "browse", label: "慢慢挑", value: "45 分钟" },
];

const foodFieldNotes = [
  {
    title: "为什么删掉了大份套餐",
    body: "一年多的下单数据里，加大份带来的「满足」只持续到第二口；之后大概率换成困意和负担。今晚先收紧，再加菜也来得及。",
  },
  {
    title: "饱腹滑块为什么从 62% 开始",
    body: "下班路上多数人不是饿，是被叫做「饿」的烦躁。62% 是一个比较稳的中间状态，比 0 更接近真实身体感受。",
  },
  {
    title: "28% 后悔率是怎么来的",
    body: "把过去半年所有「二刷夜宵」的用户行为标记成后悔，再回推主餐选择。麻辣大份 + 冰饮 的组合是其中最大的一类。",
  },
];

function priceNumber(price: string) {
  return Number(price.replace(/[^\d.]/g, ""));
}

export function FoodClient() {
  const [activeModeId, setActiveModeId] = useState(foodDetail.modes[0].id);
  const [budget, setBudget] = useState("balanced");
  const [spice, setSpice] = useState("low");
  const [speed, setSpeed] = useState("normal");
  const [fullness, setFullness] = useState(62);
  const [pinnedName, setPinnedName] = useState<string | null>(null);

  const activeMode =
    foodDetail.modes.find((mode) => mode.id === activeModeId) ??
    foodDetail.modes[0];

  const selectedOptionIndex = useMemo(() => {
    if (budget === "save") {
      return activeMode.options.reduce((bestIndex, option, index, options) => {
        return priceNumber(option.price) < priceNumber(options[bestIndex].price)
          ? index
          : bestIndex;
      }, 0);
    }

    if (spice === "hot") {
      const spicyIndex = activeMode.options.findIndex((option) =>
        option.tags.some((tag) => tag.includes("辣") || tag.includes("爽")),
      );
      return spicyIndex >= 0 ? spicyIndex : 0;
    }

    if (speed === "rush" || fullness < 45) {
      const quickIndex = activeMode.options.findIndex((option) =>
        option.tags.some((tag) => tag.includes("快") || tag.includes("近")),
      );
      return quickIndex >= 0 ? quickIndex : activeMode.options.length - 1;
    }

    if (fullness > 78) {
      const lightIndex = activeMode.options.findIndex((option) =>
        option.tags.some(
          (tag) => tag.includes("清爽") || tag.includes("低负担") || tag.includes("不撑"),
        ),
      );
      return lightIndex >= 0 ? lightIndex : 2;
    }

    return 0;
  }, [activeMode, budget, fullness, spice, speed]);

  const selectedOption = activeMode.options[selectedOptionIndex];
  const selectedBudget = budgetChoices.find((item) => item.id === budget);
  const selectedSpice = spiceChoices.find((item) => item.id === spice);
  const selectedSpeed = speedChoices.find((item) => item.id === speed);

  const fullnessCopy =
    fullness > 78
      ? "胃口偏满，优先小份、热汤和低负担。"
      : fullness < 45
        ? "现在偏饿，别继续刷了，选最快能到的。"
        : "饥饿值刚好，可以在爽感和负担之间取中间。";

  const headlineForCard = pinnedName ?? selectedOption.name;
  const resultNote = `${selectedBudget?.value ?? activeMode.budget} / ${
    selectedSpice?.value ?? activeMode.spice
  } / ${selectedSpeed?.value ?? activeMode.speed}，饱腹感 ${fullness}%。${fullnessCopy}`;

  const sceneOptions = useMemo(
    () => ({
      intensity: 0.5 + fullness / 220,
      food: { hueShift: spice === "hot" ? 0.35 : spice === "medium" ? 0.15 : 0 },
    }),
    [fullness, spice],
  );

  const avoidBullets = useMemo(() => {
    const text = activeMode.avoid;
    return text
      .split(/[，。,.]/)
      .map((bullet) => bullet.trim())
      .filter(Boolean)
      .slice(0, 3);
  }, [activeMode.avoid]);

  return (
    <>
      <DetailPageShell
        cover={foodDetail.cover}
        description={foodDetail.description}
        kicker={foodDetail.kicker}
        title={foodDetail.title}
        tone="food"
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
          { label: "Section", value: "MENU LAB" },
          { label: "Budget", value: selectedBudget?.value ?? activeMode.budget },
          { label: "Edition", value: "№ 01" },
        ]}
      >
        <div className="space-y-20">
          {/* Pull quote */}
          <RevealSection>
            <PullQuote
              tone="food"
              attribution={`Mode · ${activeMode.label}`}
              align="left"
            >
              {activeMode.headline}
            </PullQuote>
          </RevealSection>

          {/* Stat block */}
          <RevealSection className="space-y-10">
            <SectionLabel n={1} title="Tonight's vitals" tone="food" />
            <StatBlock
              tone="food"
              items={[
                {
                  value: foodDetail.modes.length,
                  label: "Modes Available",
                  caption: "三种立场，按今晚的情绪选。",
                },
                {
                  value: selectedBudget?.value ?? activeMode.budget,
                  label: "Tonight's Budget",
                  caption: "实时跟着你拨动旋钮变动。",
                },
                {
                  value: selectedSpice?.value ?? activeMode.spice,
                  label: "Spice Level",
                  caption: "越向上，越接近「嘴上爽明天累」。",
                },
                {
                  value: fullness,
                  label: "Fullness %",
                  countUp: true,
                  caption: fullnessCopy,
                },
              ]}
            />
          </RevealSection>

          {/* Console */}
          <RevealSection className="space-y-6">
            <SectionLabel n={2} title="The Console · 实验台" tone="food" />

            <PlayModeTabs
              activeId={activeMode.id}
              modes={foodDetail.modes}
              tone="food"
              onChange={(id) => {
                setActiveModeId(id);
                setPinnedName(null);
              }}
            />

            <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
              <div className="space-y-6">
                <section className="overflow-hidden rounded-[28px] border border-amber-100 bg-white shadow-phone">
                  <div className="border-b border-amber-100 bg-[linear-gradient(135deg,rgba(254,243,199,0.92),rgba(255,255,255,0.8))] p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-800">
                      <Utensils className="h-4 w-4" />
                      当前模式
                      <span className="rounded-full bg-white/80 px-2 py-1 text-amber-950">
                        {activeMode.label}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-3xl leading-tight text-slate-950">
                      {activeMode.headline}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      系统把你的预算、辣度、等待时间和饱腹感合成一个下单倾向，下面三张卡会实时换主推。
                    </p>
                  </div>

                  <div className="grid gap-4 p-5 sm:p-6">
                    <ControlGroup
                      icon={<WalletCards className="h-4 w-4" />}
                      label="预算"
                      options={budgetChoices}
                      value={budget}
                      onChange={setBudget}
                    />
                    <ControlGroup
                      icon={<Flame className="h-4 w-4" />}
                      label="辣度"
                      options={spiceChoices}
                      value={spice}
                      onChange={setSpice}
                    />
                    <ControlGroup
                      icon={<Clock3 className="h-4 w-4" />}
                      label="速度"
                      options={speedChoices}
                      value={speed}
                      onChange={setSpeed}
                    />

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                          <Gauge className="h-4 w-4 text-amber-700" />
                          饱腹感
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold tabular-nums text-slate-950 shadow-soft">
                          {fullness}%
                        </span>
                      </div>
                      <input
                        aria-label="饱腹感"
                        className="mt-4 h-2 w-full accent-amber-600"
                        max="100"
                        min="20"
                        type="range"
                        value={fullness}
                        onChange={(event) => setFullness(Number(event.target.value))}
                      />
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {fullnessCopy}
                      </p>
                    </div>

                    <div className="grid gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:grid-cols-3">
                      <SummaryPill icon={<Banknote className="h-4 w-4" />} label="预算" value={selectedBudget?.value ?? activeMode.budget} />
                      <SummaryPill icon={<Flame className="h-4 w-4" />} label="辣度" value={selectedSpice?.value ?? activeMode.spice} />
                      <SummaryPill icon={<Zap className="h-4 w-4" />} label="速度" value={selectedSpeed?.value ?? activeMode.speed} />
                    </div>
                  </div>
                </section>

                <section className="grid gap-3">
                  {activeMode.options.map((option, index) => {
                    const selected = index === selectedOptionIndex;

                    return (
                      <article
                        className={cn(
                          "rounded-2xl border bg-white p-4 shadow-soft transition sm:p-5",
                          selected
                            ? "border-amber-300 ring-2 ring-amber-200"
                            : "border-slate-200",
                          pinnedName === option.name &&
                            "border-amber-500 ring-2 ring-amber-300",
                        )}
                        key={option.name}
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-display text-2xl text-slate-950">
                                {option.name}
                              </h3>
                              {selected && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-950 px-2.5 py-1 text-xs font-semibold text-white">
                                  <BadgeCheck className="h-3.5 w-3.5" />
                                  今晚主推
                                </span>
                              )}
                              {pinnedName === option.name && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white">
                                  已钉到结果卡
                                </span>
                              )}
                            </div>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {option.reason}
                            </p>
                          </div>
                          <div className="w-fit rounded-2xl bg-slate-950 px-4 py-2 text-lg font-semibold tabular-nums text-white">
                            {option.price}
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {option.tags.map((tag) => (
                            <span
                              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                              key={tag}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="mt-4 rounded-2xl bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-600">
                          {option.fit}
                        </p>
                      </article>
                    );
                  })}
                </section>
              </div>

              <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                <section className="rounded-[28px] border border-slate-200 bg-white/86 p-5 shadow-phone backdrop-blur sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
                    <Sparkles className="h-4 w-4" />
                    即时判定
                  </div>
                  <h2 className="mt-3 font-display text-4xl text-slate-950">
                    {headlineForCard}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {resultNote}
                  </p>
                  <div className="mt-5 grid gap-2">
                    <SignalBar label="下单确定性" value={Math.min(96, 62 + fullness / 3)} />
                    <SignalBar label="爽感保留" value={spice === "hot" ? 92 : spice === "medium" ? 78 : 64} />
                    <SignalBar label="明早友好度" value={spice === "hot" ? 46 : fullness > 80 ? 58 : 82} />
                  </div>
                </section>

                <MetricPills metrics={activeMode.metrics} />

                <section className="rounded-[28px] border border-red-100 bg-white p-5 shadow-soft">
                  <div className="flex items-center gap-2 text-sm font-semibold text-red-700">
                    <TriangleAlert className="h-4 w-4" />
                    避坑提醒
                  </div>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    {activeMode.avoid}
                  </p>
                  <p className="mt-3 rounded-2xl bg-red-50 px-3 py-2 text-sm leading-6 text-red-900">
                    当前组合额外提醒：{spice === "hot" ? "辣度已经拉高，别再叠加冰饮和夜宵第二轮。" : "口味比较稳，可以把选择时间控制在 1 分钟内。"}
                  </p>
                </section>

                <ShareResultCard
                  note={resultNote}
                  result={`${activeMode.result} 如果只想更贴合此刻状态，我会把主推切到 ${headlineForCard}。`}
                  title="今晚下单结论"
                  tone="food"
                />

                <div className="flex gap-2">
                  <Button
                    className="flex-1 rounded-full bg-white/90 text-slate-800"
                    type="button"
                    variant="outline"
                    onClick={() => setFullness((value) => Math.max(20, value - 12))}
                  >
                    <Minus className="h-4 w-4" />
                    少吃点
                  </Button>
                  <Button
                    className="flex-1 rounded-full"
                    type="button"
                    onClick={() => setFullness((value) => Math.min(100, value + 12))}
                  >
                    <Plus className="h-4 w-4" />
                    想吃饱
                  </Button>
                </div>
              </aside>
            </div>
          </RevealSection>

          {/* Comparison table */}
          <RevealSection className="space-y-8">
            <SectionLabel
              n={3}
              title="Tonight's Three vs Tonight's Don'ts"
              tone="food"
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[28px] border border-emerald-100 bg-emerald-50/70 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  Tonight&rsquo;s three
                </p>
                <ul className="mt-4 space-y-3">
                  {activeMode.options.map((option, idx) => (
                    <li
                      key={option.name}
                      className="flex items-center justify-between gap-3 border-b border-emerald-200/60 pb-3 last:border-none"
                    >
                      <div className="flex items-baseline gap-3">
                        <NumberMarker n={idx + 1} tone="food" />
                        <span className="font-display text-lg text-slate-900">
                          {option.name}
                        </span>
                      </div>
                      <span className="font-semibold tabular-nums text-emerald-800">
                        {option.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[28px] border border-rose-100 bg-rose-50/70 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-700">
                  Tonight&rsquo;s two no-go&rsquo;s
                </p>
                <ul className="mt-4 space-y-3">
                  {avoidBullets.map((bullet, idx) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 border-b border-rose-200/60 pb-3 last:border-none"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-200 text-xs font-semibold text-rose-800">
                        {idx + 1}
                      </span>
                      <span className="text-sm leading-6 text-rose-900">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealSection>

          {/* Field Notes */}
          <RevealSection>
            <FieldNotes notes={foodFieldNotes} tone="food" />
          </RevealSection>

          {/* Signature */}
          <RevealSection>
            <FoodMenuFlip
              options={activeMode.options.map((opt) => ({
                name: opt.name,
                price: opt.price,
                fit: opt.fit,
              }))}
              onPick={(idx) => setPinnedName(activeMode.options[idx].name)}
            />
          </RevealSection>
        </div>
      </DetailPageShell>

      <NextTonightStrip currentTone="food" />
    </>
  );
}

function ControlGroup({
  icon,
  label,
  options,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  options: typeof budgetChoices;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
        <span className="text-amber-700">{icon}</span>
        {label}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const active = option.id === value;

          return (
            <button
              className={cn(
                "rounded-xl border px-3 py-2 text-left text-sm transition",
                active
                  ? "border-amber-900 bg-slate-950 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-amber-200 hover:bg-amber-50",
              )}
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
            >
              <span className="block font-semibold">{option.label}</span>
              <span className={cn("mt-0.5 block text-xs", active ? "text-white/70" : "text-slate-500")}>
                {option.value}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SummaryPill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/78 px-3 py-2 shadow-soft">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <span className="text-amber-700">{icon}</span>
        {label}
      </div>
      <p className="mt-1 text-base font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function SignalBar({ label, value }: { label: string; value: number }) {
  const roundedValue = Math.round(value);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <Heart className="h-3.5 w-3.5 text-amber-700" />
          {label}
        </span>
        <span className="tabular-nums">{roundedValue}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-amber-500 transition-all"
          style={{ width: `${roundedValue}%` }}
        />
      </div>
    </div>
  );
}
