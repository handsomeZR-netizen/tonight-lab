import type { ReactNode } from "react";

type MobileFrameProps = {
  children: ReactNode;
};

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <section
      aria-label="Douyin mobile preview"
      className="relative h-[min(844px,calc(100dvh-2rem))] w-[min(390px,calc(100vw-1.5rem))] overflow-hidden rounded-[32px] border border-white/18 bg-black shadow-[0_34px_90px_rgba(0,0,0,0.56)] sm:rounded-[42px]"
    >
      <div className="absolute inset-x-20 top-3 z-40 h-7 rounded-full bg-black" />
      <div className="absolute inset-0 rounded-[32px] ring-1 ring-inset ring-white/10 sm:rounded-[42px]" />
      <div className="h-full w-full overflow-hidden rounded-[30px] bg-black sm:rounded-[40px]">
        {children}
      </div>
    </section>
  );
}

