import type { Metadata } from "next";
import { EyeOff, HardDrive, Lock, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/Section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How TrueMinutes keeps meeting audio local-first with optional cloud opt-in.",
};

const PILLARS = [
  {
    icon: HardDrive,
    title: "Local audio residency",
    body: "Raw meeting audio stays on your Mac and is retained for about seven days, with periodic pruning while the app remains open.",
  },
  {
    icon: EyeOff,
    title: "No speculative listening",
    body: "Capture requires verified meeting evidence. URL, title, calendar, or global mic activity alone never prove a joined call.",
  },
  {
    icon: Lock,
    title: "Scoped capture",
    body: "Browser capture uses explicit per-session ScreenCaptureKit application-audio scope. Native clients are filtered to that app — not whole-system audio.",
  },
  {
    icon: ShieldCheck,
    title: "Cloud is opt-in",
    body: "Cloud transcription and summarization require an explicit user preference. Defaults stay on-device.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy & trust"
        title="Your conversations stay on your Mac"
        description="TrueMinutes is engineered around local data residency. No participant bot. No silent whole-desktop recording."
      />

      <div className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-5 sm:grid-cols-2">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-2xl border border-border bg-surface p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-dim text-emerald">
                <Icon size={20} aria-hidden />
              </div>
              <h2 className="text-lg font-bold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 space-y-6 rounded-2xl border border-border bg-surface-2/50 p-6 sm:p-10">
          <h2 className="text-xl font-extrabold text-white">Honest limitations</h2>
          <ul className="flex flex-col gap-3 text-sm leading-relaxed text-muted">
            <li>
              Current CAF and SQLite content are <strong className="text-text">not application-encrypted</strong>. Protect
              the Mac with FileVault and standard OS access controls.
            </li>
            <li>
              Mic capture defaults to follow verified meeting mute state. Unsupported or ambiguous provider mute truth
              keeps the mic off.
            </li>
            <li>
              Browser extension exact-tab transport is a scaffold — not a shipped native integration in {SITE.version}.
            </li>
            <li>
              Always follow your jurisdiction and company policy when recording conversations.
            </li>
          </ul>
          <p className="text-sm text-dim">
            Full product privacy notes live in the source repository ({SITE.github}). This page summarizes customer-facing
            behavior for the marketing site.
          </p>
        </div>
      </div>
    </>
  );
}
