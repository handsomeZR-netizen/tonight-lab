import { cn } from "@/lib/cn";
import type { DetailTone } from "@/lib/detail-content";
import { toneTokens } from "@/lib/tone-tokens";

import { NumberMarker } from "./NumberMarker";

type Note = {
  title: string;
  body: string;
};

type FieldNotesProps = {
  notes: Note[];
  tone?: DetailTone;
  heading?: string;
  className?: string;
};

export function FieldNotes({
  notes,
  tone,
  heading = "Field Notes · 编辑后记",
  className,
}: FieldNotesProps) {
  const tokens = tone ? toneTokens[tone] : null;

  return (
    <section
      className={cn(
        "relative grid gap-10 border-t border-slate-300/70 pt-10",
        className,
      )}
    >
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl italic text-slate-900">
          {heading}
        </h3>
        <span
          className={cn(
            "text-[11px] uppercase tracking-[0.22em]",
            tokens ? tokens.inkMuted : "text-slate-500",
          )}
        >
          — Tonight Lab Editors
        </span>
      </header>

      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note, idx) => (
          <li key={note.title} className="relative">
            <div className="flex items-baseline gap-3">
              <NumberMarker n={idx + 1} tone={tone} />
              <h4 className="text-base font-semibold text-slate-900">
                {note.title}
              </h4>
            </div>
            <p className="mt-3 text-sm leading-[1.7] text-slate-600">
              {note.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
