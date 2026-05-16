import { cn } from "@/lib/cn";

type KeylineProps = {
  variant?: "short" | "full";
  label?: string;
  align?: "left" | "center";
  className?: string;
};

export function Keyline({
  variant = "full",
  label,
  align = "left",
  className,
}: KeylineProps) {
  if (!label) {
    return (
      <hr
        aria-hidden
        className={cn(
          "border-0 border-t border-slate-300/80",
          variant === "short" ? "w-10" : "w-full",
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        align === "center" && "justify-center",
        className,
      )}
    >
      <div className="h-px flex-1 bg-slate-300/80" aria-hidden />
      <span className="font-display italic text-xs uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      <div className="h-px flex-1 bg-slate-300/80" aria-hidden />
    </div>
  );
}
