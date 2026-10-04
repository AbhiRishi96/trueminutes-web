import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/Section";
import { DownloadButton } from "@/components/DownloadButton";
import { SITE, INSTALL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Price, privacy, compatible Macs, local AI, meeting capture, and first-install questions about TrueMinutes.",
  alternates: { canonical: "/faq/" },
};
const GROUPS = [
  {
    title: "Getting started",
    items: [
      {
        q: "Is TrueMinutes free?",
        a: "Yes. The current Mac release is free to download. Local AI runs on your own hardware. Optional cloud providers may charge you for usage; those costs are separate.",
      },
      {
        q: "Which Macs can run it?",
        a: `Apple silicon Macs (M1 or later) running ${SITE.macosMin}. The standard local summary model requires 16 GB RAM and about 9.5 GB of free disk space for installation. Model requirements vary. Intel Mac, Windows, and Linux installers are not currently offered.`,
      },
      {
        q: "Why does macOS warn when I first open it?",
        a: INSTALL.description,
      },
      {
        q: "Can I use it offline?",
        a: "Local transcription, summaries, and Ask can work offline once models are downloaded. The installer, model downloads, updates, Google Calendar, Drive sync, cloud AI, and external exports need internet access.",
      },
    ],
  },
  {
    title: "Recording meetings",
    items: [
      {
        q: "Will TrueMinutes join as a participant?",
        a: "No. Capture happens on your Mac. TrueMinutes does not add a bot to the participant list. You still need to inform participants and follow recording policies.",
      },
      {
        q: "Which meeting apps does it detect?",
        a: `The app includes detection for ${SITE.platforms.join(", ")} on recognized browser, PWA, and native surfaces. Detection depends on visible call controls, permissions, and the client version. Not every surface is release-qualified; unrecognized UI does not start recording.`,
      },
      {
        q: "Does it record every browser tab?",
        a: "Browser audio capture is scoped to the selected browser application and can include other tabs playing audio. It is not exact-tab capture. Native client capture is scoped to the selected meeting application.",
      },
      {
        q: "Will a calendar event start a recording automatically?",
        a: "No. A calendar event can prompt you to Start or Skip. Capture requires verified joined-call controls. A recurring-series rule is an explicit opt-in and still waits for verified join; browser calls also need fresh audio scope authorization.",
      },
      {
        q: "How does microphone recording work?",
        a: "A separate microphone track follows verified meeting mute state by default. Muted, unknown, or stale state leaves the mic off. Any explicit microphone policy override is visible and reversible.",
      },
    ],
  },
  {
    title: "Notes, AI & privacy",
    items: [
      {
        q: "Are summaries ready the moment the call ends?",
        a: "Processing continues in the background after capture stops. Timing depends on the recording, selected models, and your Mac. The library shows processing status and whether recovery needs attention. Review AI-generated notes for accuracy.",
      },
      {
        q: "What can I ask my meetings?",
        a: "Ask about decisions, owners, next steps, and context from captured transcripts. Scope questions to a meeting, folder, or library. Answers reference source meetings, and threads can export to Markdown or PDF. AI can make mistakes; check the sources.",
      },
      {
        q: "Can I keep processing on my Mac?",
        a: "Yes. WhisperKit transcribes locally, and local models handle summaries and Ask. Cloud processing stays optional. If enabled, the selected provider receives audio or text required for the operation.",
      },
      {
        q: "What does Drive sync upload?",
        a: "Optional sync encrypts meetings, transcripts, summaries, Ask chats, folders, and rules on your Mac before upload to Google Drive’s private app data folder. Audio recordings are excluded. Disconnecting stops future sync but does not automatically delete stored data.",
      },
      {
        q: "Is the local database encrypted?",
        a: "Not by the application. Local audio and the meeting database rely on your Mac’s protections. Use FileVault and secure account access. Encrypted Drive sync is a separate protection for synced data.",
      },
      {
        q: "How do I share the notes?",
        a: "Copy summaries, Minutes of Meeting, Markdown reports, or transcripts; export meeting PDFs and Ask threads. Notion and Slack exports are available after configuring the destination. Share only what you intend recipients to receive.",
      },
    ],
  },
];
export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="A LITTLE CLARITY BEFORE YOU START"
        title="Good questions. Plain answers."
        description="What you need, how recording works, and where your data goes."
      />
      <div className="mx-auto max-w-3xl px-5 pb-20">
        {GROUPS.map((group) => (
          <section key={group.title} className="mb-14">
            <h2 className="mb-6 text-xl font-medium tracking-tight">
              {group.title}
            </h2>
            <div className="faq-home">
              {group.items.map((f) => (
                <details key={f.q}>
                  <summary>
                    {f.q}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
          <Link href="/docs#troubleshooting" className="text-link">
            Setup & troubleshooting <ArrowRight size={15} />
          </Link>
          <DownloadButton />
        </div>
      </div>
    </>
  );
}
