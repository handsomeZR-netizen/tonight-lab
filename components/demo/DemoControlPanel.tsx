import {
  Bot,
  Gauge,
  MousePointer2,
  RefreshCcw,
  Sparkles,
} from "lucide-react";

const metrics = [
  { label: "Mock items", value: "7" },
  { label: "Snap mode", value: "Full" },
  { label: "AI cards", value: "4" },
];

const controls = [
  { label: "Cycle feed", icon: RefreshCcw },
  { label: "Inject card", icon: Sparkles },
  { label: "Inspect state", icon: MousePointer2 },
];

export function DemoControlPanel() {
  return (
    <aside className="w-full max-w-[360px] text-slate-900">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-soft">
          <Bot className="h-3.5 w-3.5" />
          Mock AI environment
        </div>
        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-900">
          抖音信息流 AI 卡片 Demo
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          shadcn 风格 · 浅色低饱和 · 全部由本地 mock 数据驱动。
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {metrics.map((metric) => (
          <div
            className="rounded-lg border border-slate-200 bg-white p-3 shadow-soft"
            key={metric.label}
          >
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              {metric.label}
            </p>
            <p className="mt-1.5 text-lg font-semibold tabular-nums text-slate-900">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Gauge className="h-4 w-4 text-slate-500" />
          Demo controls
        </div>
        <div className="grid gap-2">
          {controls.map((control) => {
            const Icon = control.icon;
            return (
              <button
                className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                key={control.label}
                type="button"
              >
                <span>{control.label}</span>
                <Icon className="h-4 w-4 text-slate-500" />
              </button>
            );
          })}
        </div>
      </div>

    </aside>
  );
}
