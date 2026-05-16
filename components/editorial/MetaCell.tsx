import { cn } from "@/lib/cn";

type MetaCellProps = {
  label: string;
  value: string;
  className?: string;
};

export function MetaCell({ label, value, className }: MetaCellProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <dt className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 truncate font-display text-base text-slate-900">
        {value}
      </dd>
    </div>
  );
}
