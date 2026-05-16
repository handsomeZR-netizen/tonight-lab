import {
  Bot,
  Gauge,
  Layers3,
  MousePointer2,
  RefreshCw,
  Sparkles,
} from "lucide-react";

const metrics = [
  { label: "Mock items", value: "7" },
  { label: "Snap mode", value: "Full" },
  { label: "AI cards", value: "4" },
];

const controls = [
  { label: "Cycle feed", icon: RefreshCw },
  { label: "Inject card", icon: Sparkles },
  { label: "Inspect state", icon: MousePointer2 },
];

export function DemoControlPanel() {
  return (
    <aside className="w-full max-w-[360px] text-white">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-cyan-100">
          <Bot size={14} />
          Mock AI environment
        </div>
        <h1 className="mt-4 text-3xl font-semibold leading-tight">
          抖音信息流 AI 卡片 Demo
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {metrics.map((metric) => (
          <div
            className="rounded-lg border border-white/10 bg-white/[0.06] p-3"
            key={metric.label}
          >
            <p className="text-[11px] uppercase text-white/46">{metric.label}</p>
            <p className="mt-2 text-lg font-semibold">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.06] p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
          <Gauge size={17} />
          Demo controls
        </div>
        <div className="grid gap-2">
          {controls.map((control) => {
            const Icon = control.icon;
            return (
              <button
                className="flex items-center justify-between rounded-md border border-white/10 bg-black/22 px-3 py-2.5 text-sm text-white/82 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
                key={control.label}
                type="button"
              >
                <span>{control.label}</span>
                <Icon size={16} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-cyan-300/20 bg-cyan-300/[0.07] p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
          <Layers3 size={17} />
          生成说明
        </div>
        <p className="mt-2 text-sm leading-6 text-white/62">
          页面文案呈现为 AI 生成和 AI 重排，但当前全部由本地 mock 数据驱动，方便后续替换为 AI SDK structured output。
        </p>
      </div>
    </aside>
  );
}

