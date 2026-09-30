import { MacWindow } from "@/components/MacWindow";
import { MOCK_MEETINGS } from "@/lib/mock-data";

const statusStyle: Record<string, string> = {
  ready: "bg-emerald-dim text-emerald",
  summarizing: "bg-sky-500/15 text-sky-300",
  recovery: "bg-amber-500/15 text-amber-300",
};

/** @deprecated Prefer ProductShellTour — kept for any residual imports */
export function SyntheticLibrary() {
  return (
    <MacWindow title="TrueMinutes — Meetings">
      <div className="grid min-h-[320px] md:grid-cols-[200px_1fr]">
        <aside className="hidden border-r border-border bg-surface p-4 md:block">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-dim">Library</p>
          <nav className="flex flex-col gap-1 text-sm">
            <span className="rounded-lg bg-violet-dim px-3 py-2 font-medium text-violet-soft">All meetings</span>
            <span className="rounded-lg px-3 py-2 text-muted">Recents</span>
            <span className="rounded-lg px-3 py-2 text-muted">Archive</span>
          </nav>
        </aside>
        <div className="p-4 sm:p-5">
          <div className="mb-4 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-dim">
            Search meetings, notes, transcripts…
          </div>
          <ul className="flex flex-col gap-2">
            {MOCK_MEETINGS.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-2/80 px-3 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text">{m.title}</p>
                  <p className="mt-0.5 text-xs text-dim">
                    {m.when} · {m.platform}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase ${statusStyle[m.status] ?? ""}`}>
                  {m.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MacWindow>
  );
}
