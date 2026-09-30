import type { Metadata } from "next";
import { PageHero } from "@/components/Section";
import { DownloadButton } from "@/components/DownloadButton";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about TrueMinutes meeting capture and privacy.",
};

const FAQS = [
  {
    q: "Will other participants see TrueMinutes in the call?",
    a: "No. TrueMinutes never joins as a participant. It captures from your Mac using verified meeting surfaces and ScreenCaptureKit scopes.",
  },
  {
    q: "Which meeting apps are supported?",
    a: `${SITE.platforms.join(", ")} — across trusted browser/PWA and native client surfaces that pass the live support matrix. Unknown provider UI fails closed.`,
  },
  {
    q: "Does it record computer audio and my microphone?",
    a: "Yes, when you start capture: application-scoped system audio from the meeting surface, plus a separate microphone adapter that follows verified mute state (off when mute is unknown or stale).",
  },
  {
    q: "Do I need host permission to record?",
    a: "You do not need host permission to admit a bot — there is no bot. You still must follow your company policy and local law regarding recording conversations.",
  },
  {
    q: "Where is audio stored, and for how long?",
    a: "Raw audio stays on your Mac and is retained for about seven days, with pruning while the app is open. Current storage is not application-encrypted — use FileVault.",
  },
  {
    q: "Is processing fully local?",
    a: "Default path is local-first (WhisperKit + local summarization options). Cloud ASR/summary requires explicit opt-in in Settings.",
  },
  {
    q: "What is Ask TrueMinutes?",
    a: "Private Q&A over your captured transcripts. Scope to all meetings, a folder, or one recording. Answers cite sources; threads export to Markdown or PDF. Default path is on-device.",
  },
  {
    q: "Can I export notes to Notion, Markdown, or Slack?",
    a: "Yes — clipboard (summary, MOM, full report, transcript), PDF, Notion pages, and Slack webhooks. Menu bar can quick-export the last transcript.",
  },
  {
    q: "Why does macOS warn on first open?",
    a: `The ${SITE.version} build is internally signed and not Apple notarized. Use the DMG install instructions (Open Anyway) rather than unofficial quarantine bypass scripts.`,
  },
  {
    q: "Is Windows available?",
    a: "Not yet as a shipping installer. Cross-platform work is in progress; macOS Apple Silicon is the supported product today.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Answers before you download"
        description="Straight questions about bots, privacy, platforms, and install."
      />

      <div className="mx-auto flex max-w-2xl flex-col gap-3 px-5 pb-16">
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="rounded-xl border border-border bg-surface open:border-border-strong"
          >
            <summary className="cursor-pointer list-none px-5 py-4 text-left text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
              {f.q}
            </summary>
            <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="flex justify-center pb-24">
        <DownloadButton variant="primary" showMeta />
      </div>
    </>
  );
}
