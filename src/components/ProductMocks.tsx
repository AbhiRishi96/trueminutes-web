"use client";

import { useState } from "react";
import { AppScreenshot, type AppShotKey } from "@/components/AppScreenshot";
import { MacWindow } from "@/components/MacWindow";
import { MOCK_SUMMARY } from "@/lib/mock-data";

type Tab = "home" | "meetings" | "notes" | "ask" | "calendar" | "settings";

const TABS: { id: Tab; label: string; shot: AppShotKey }[] = [
  { id: "home", label: "Home", shot: "home" },
  { id: "meetings", label: "Meetings", shot: "meetingsLibrary" },
  { id: "notes", label: "Notes", shot: "notes" },
  { id: "ask", label: "Ask", shot: "ask" },
  { id: "calendar", label: "Calendar", shot: "calendar" },
  { id: "settings", label: "Settings", shot: "settings" },
];

export function ProductShellTour() {
  const [tab, setTab] = useState<Tab>("home");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div>
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              tab === t.id
                ? "border border-violet bg-violet-dim text-violet-soft shadow-[0_0_24px_-8px_rgba(99,102,241,0.6)]"
                : "border border-border bg-white/[0.03] text-muted hover:text-text"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AppScreenshot shot={active.shot} />
    </div>
  );
}

export function MeetingDetailMock() {
  const [pane, setPane] = useState<"shot" | "summary" | "actions" | "transcript">("shot");

  return (
    <div>
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {(
          [
            ["shot", "Real screenshot"],
            ["summary", "Summary mock"],
            ["actions", "Actions mock"],
            ["transcript", "Transcript mock"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setPane(id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              pane === id
                ? "border border-violet bg-violet-dim text-violet-soft"
                : "border border-border text-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {pane === "shot" ? (
        <AppScreenshot shot="meetingDetail" />
      ) : (
        <MacWindow title={MOCK_SUMMARY.title}>
          <div className="min-h-[280px] bg-gradient-to-b from-surface to-canvas p-4 sm:p-6">
            {pane === "summary" && (
              <div className="space-y-4">
                <p className="text-xs text-dim">Generated with {MOCK_SUMMARY.model}</p>
                <p className="text-sm leading-relaxed text-muted">{MOCK_SUMMARY.summary}</p>
                <ul className="space-y-1.5">
                  {MOCK_SUMMARY.decisions.map((d) => (
                    <li key={d} className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {pane === "actions" && (
              <ul className="space-y-2">
                {MOCK_SUMMARY.actions.map((a) => (
                  <li
                    key={a.text}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-surface-2 px-3 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{a.text}</p>
                      <p className="text-xs text-dim">{a.owner}</p>
                    </div>
                    <span className="rounded-md bg-violet-dim px-2 py-0.5 font-mono text-[0.65rem] text-violet-soft">
                      [{a.cite}]
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {pane === "transcript" && (
              <ul className="space-y-3 font-mono text-xs">
                {MOCK_SUMMARY.transcript.map((line) => (
                  <li key={line.t} className="rounded-lg border border-border bg-surface-2/80 px-3 py-2">
                    <span className="text-violet-soft">[{line.t}]</span>{" "}
                    <span className="text-dim">{line.speaker}:</span>{" "}
                    <span className="font-sans text-sm text-muted">{line.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </MacWindow>
      )}
    </div>
  );
}

export function CapturePillMock() {
  const [muted, setMuted] = useState(false);

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-emerald/30 bg-surface-2/95 px-5 py-4 shadow-[0_20px_60px_-20px_rgba(16,185,129,0.35)] backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="pulse-dot" />
          <div>
            <p className="text-sm font-bold text-white">Recording · 14:28</p>
            <p className="text-xs text-dim">Product sync · Google Meet · Mic {muted ? "paused" : "active"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              muted ? "bg-rose-500/15 text-rose-300" : "bg-emerald-dim text-emerald"
            }`}
          >
            {muted ? "Mic off" : "Mic on"}
          </button>
          <button type="button" className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted">
            Stop
          </button>
        </div>
      </div>
      <div className="mt-5 flex h-14 items-end justify-center gap-1" aria-hidden>
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="w-1 origin-bottom rounded-full bg-gradient-to-t from-violet to-cyan"
            style={{
              height: `${14 + ((i * 13) % 36)}px`,
              animation: muted ? "none" : `waveform ${0.55 + (i % 6) * 0.1}s ease-in-out infinite`,
              animationDelay: `${(i % 7) * 0.04}s`,
              opacity: muted ? 0.2 : 0.85,
            }}
          />
        ))}
      </div>
    </div>
  );
}
