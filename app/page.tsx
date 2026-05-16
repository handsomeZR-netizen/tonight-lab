import { DemoControlPanel } from "@/components/demo/DemoControlPanel";
import { FeedViewport } from "@/components/feed/FeedViewport";
import { MobileFrame } from "@/components/feed/MobileFrame";

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden px-3 py-4 sm:px-5 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl items-center justify-center gap-10 sm:min-h-[calc(100vh-4rem)]">
        <MobileFrame>
          <FeedViewport />
        </MobileFrame>
        <div className="hidden lg:block">
          <DemoControlPanel />
        </div>
      </div>
    </main>
  );
}
