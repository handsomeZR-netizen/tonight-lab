import type { ReactNode } from "react";

type MobileFrameProps = {
  children: ReactNode;
};

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <section
      aria-label="Mobile preview"
      className="relative h-[min(844px,calc(100dvh-2rem))] w-[min(390px,calc(100vw-1.5rem))] overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-phone sm:rounded-[44px]"
    >
      <div className="absolute inset-x-24 top-2.5 z-40 h-6 rounded-full bg-slate-100" />
      <div className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-inset ring-slate-100 sm:rounded-[44px]" />
      <div className="h-full w-full overflow-hidden rounded-[32px] bg-[hsl(220_14%_98%)] sm:rounded-[40px]">
        {children}
      </div>
    </section>
  );
}
