import { Home, Plus, Search, UserRound, Video } from "lucide-react";

const items = [
  { label: "Home", icon: Home, active: true },
  { label: "Discover", icon: Search },
  { label: "Create", icon: Plus, raised: true },
  { label: "Inbox", icon: Video },
  { label: "Me", icon: UserRound },
];

export function BottomNavMock() {
  return (
    <nav className="pointer-events-auto absolute inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/45 px-5 pb-5 pt-2 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              aria-label={item.label}
              className={
                item.raised
                  ? "flex h-10 w-14 items-center justify-center rounded-xl bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.22)]"
                  : "flex h-11 w-11 items-center justify-center rounded-full text-white/62 transition hover:bg-white/10 hover:text-white"
              }
              type="button"
            >
              <Icon
                className={item.active ? "text-white" : undefined}
                size={item.raised ? 22 : 20}
                strokeWidth={item.raised ? 2.8 : 2.2}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

