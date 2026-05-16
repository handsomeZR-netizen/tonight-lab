import type { ReactNode } from "react";

type MobileFrameProps = {
  children: ReactNode;
};

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <section
      aria-label="Douyin mobile preview"
      className="relative h-[844px] w-[390px] overflow-hidden rounded-[42px] border border-white/18 bg-black shadow-[0_34px_90px_rgba(0,0,0,0.56)]"
    >
      <div className="absolute inset-x-20 top-3 z-40 h-7 rounded-full bg-black" />
      <div className="absolute inset-0 rounded-[42px] ring-1 ring-inset ring-white/10" />
      <div className="h-full w-full overflow-hidden rounded-[40px] bg-black">
        {children}
      </div>
    </section>
  );
}

