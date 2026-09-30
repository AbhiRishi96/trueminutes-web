"use client";

import { useState } from "react";
import { CheckSquare, Mic, MicOff } from "lucide-react";
import { MacWindow } from "@/components/MacWindow";

type Step = "detect" | "record" | "notes";

const STEPS: { id: Step; label: string }[] = [
  { id: "detect", label: "1. Detect" },
  { id: "record", label: "2. Capture" },
  { id: "notes", label: "3. Notes" },
];

export function WorkflowDemo() {
  const [step, setStep] = useState<Step>("detect");
  const [muted, setMuted] = useState(false);

  return (
    <div>
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {STEPS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStep(s.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              step === s.id
                ? "border border-violet bg-violet-dim text-violet-soft"
                : "border border-border bg-white/5 text-muted hover:text-text"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <MacWindow title="TrueMinutes · Live preview">
        <div className="flex min-h-[300px] items-center justify-center p-6 sm:p-10">
          {step === "detect" && (
            <div className="w-full max-w-md animate-fade-up text-center">
              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">
                Meeting detected
              </div>
              <div className="rounded-2xl border border-border-strong bg-surface-2 p-5 text-left shadow-lg">
                <p className="text-sm text-muted">Google Meet</p>
                <p className="mt-1 text-lg font-bold text-white">Weekly product sync</p>
                <p className="mt-1 text-sm text-dim">Verified joined · Mic follow ready</p>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep("record")}
                    className="flex-1 rounded-xl bg-violet px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-soft"
                  >
                    Start capturing
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted"
                  >
                    Skip
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "record" && (
            <div className="w-full max-w-lg animate-fade-up">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-emerald/30 bg-surface-2 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="pulse-dot" />
                  <div>
                    <p className="text-sm font-bold text-white">Recording · 14:28</p>
                    <p className="text-xs text-dim">Weekly product sync · Google Meet</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    muted ? "bg-rose-500/15 text-rose-300" : "bg-emerald-dim text-emerald"
                  }`}
                >
                  {muted ? <MicOff size={14} /> : <Mic size={14} />}
                  {muted ? "Mic paused" : "Mic active"}
                </button>
              </div>
              <div className="mt-6 flex h-16 items-end justify-center gap-1 px-4" aria-hidden>
                {Array.from({ length: 32 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 origin-bottom rounded-full bg-violet-soft/80"
                    style={{
                      height: `${20 + ((i * 17) % 40)}px`,
                      animation: muted ? "none" : `waveform ${0.6 + (i % 5) * 0.12}s ease-in-out infinite`,
                      animationDelay: `${(i % 8) * 0.05}s`,
                      opacity: muted ? 0.25 : 1,
                    }}
                  />
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setStep("notes")}
                  className="rounded-xl border border-border bg-white/5 px-4 py-2 text-sm font-semibold text-muted hover:text-text"
                >
                  End call → view notes
                </button>
              </div>
            </div>
          )}

          {step === "notes" && (
            <div className="w-full max-w-lg animate-fade-up text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-violet-soft">Executive summary</p>
              <h3 className="mt-2 text-xl font-bold text-white">Weekly product sync</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Team aligned on launch checklist, deferred the pricing experiment, and assigned owners for the
                onboarding polish pass before Friday.
              </p>
              <p className="mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-dim">Action items</p>
              <ul className="flex flex-col gap-2 text-sm">
                {[
                  "Ship onboarding empty states — Alex",
                  "Review Q3 pipeline deck — Jordan",
                  "Confirm partner briefing agenda — Sam",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2">
                    <CheckSquare size={16} className="mt-0.5 shrink-0 text-emerald" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-dim">Transcript</p>
              <div className="rounded-lg border border-border bg-surface-2 p-3 font-mono text-xs text-muted">
                <button type="button" className="text-violet-soft hover:underline">
                  [04:12]
                </button>{" "}
                Let’s lock the checklist before Friday…
                <br />
                <button type="button" className="text-violet-soft hover:underline">
                  [11:40]
                </button>{" "}
                Pricing experiment can wait until next sprint.
              </div>
            </div>
          )}
        </div>
      </MacWindow>
    </div>
  );
}
