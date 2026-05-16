import { DemoControlPanel } from "@/components/demo/DemoControlPanel";
import { FeedViewport } from "@/components/feed/FeedViewport";
import { MobileFrame } from "@/components/feed/MobileFrame";

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden px-5 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center gap-10">
        <MobileFrame>
          <FeedViewport />
        </MobileFrame>
        <DemoControlPanel />
      </div>
    </main>
  );
}
