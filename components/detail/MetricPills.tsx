import type { Metric } from "@/lib/detail-content";

export function MetricPills({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div
          className="rounded-2xl border border-slate-200 bg-white/82 p-3 shadow-soft backdrop-blur"
          key={metric.label}
        >
          <p className="text-xs font-medium text-slate-500">{metric.label}</p>
          <p className="mt-1 text-xl font-semibold tabular-nums text-slate-950">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}
