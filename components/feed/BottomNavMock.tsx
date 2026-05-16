import { House, Inbox, PlusSquare, Search, UserRound } from "lucide-react";

const items = [
  { label: "Home", icon: House, active: true },
  { label: "Discover", icon: Search },
  { label: "Create", icon: PlusSquare, raised: true },
  { label: "Inbox", icon: Inbox },
  { label: "Me", icon: UserRound },
];

export function BottomNavMock() {
  return (
    <nav className="pointer-events-auto absolute inset-x-0 bottom-0 z-30 border-t border-slate-200/80 bg-white/85 px-5 pb-5 pt-2 backdrop-blur">
      <div className="flex items-center justify-between">
        {items.map((item) => {
          const Icon = item.icon;
          if (item.raised) {
            return (
              <button
                key={item.label}
                aria-label={item.label}
                className="flex h-10 w-14 items-center justify-center rounded-xl border border-slate-200 bg-slate-900 text-white shadow-soft transition hover:bg-slate-800"
                type="button"
              >
                <Icon size={20} strokeWidth={2.2} />
              </button>
            );
          }
          return (
            <button
              key={item.label}
              aria-label={item.label}
              className={
                item.active
                  ? "flex h-11 w-11 items-center justify-center rounded-full text-slate-900"
                  : "flex h-11 w-11 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              }
              type="button"
            >
              <Icon size={20} strokeWidth={2} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
