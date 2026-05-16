export default function RootLoading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[hsl(44_38%_97%)] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-amber-100/30 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-amber-500"
          />
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-slate-500">
            Tonight Lab · Loading
          </p>
        </div>

        <p
          className="font-display text-lg italic text-slate-700"
          style={{ letterSpacing: "-0.005em" }}
        >
          正在收一收今晚的内容…
        </p>
      </div>
    </main>
  );
}
