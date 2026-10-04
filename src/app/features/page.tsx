import type { Metadata } from "next";
import Link from "next/link";
import {
  AudioLines,
  CalendarDays,
  Check,
  FileText,
  FolderSearch,
  LockKeyhole,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { ProductDemo } from "@/components/ProductDemo";
import { DownloadButton } from "@/components/DownloadButton";
import { PageHero } from "@/components/Section";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Bot-free capture, useful meeting notes, private Ask, calendar, export, and optional encrypted sync for Mac.",
  alternates: { canonical: "/features/" },
};
const FEATURES = [
  {
    id: "capture",
    icon: AudioLines,
    title: "Capture the call. Stay in it.",
    body: "Record on your Mac without adding another participant. TrueMinutes looks for verified call controls, then lets you choose Start or Skip.",
    items: [
      "App-scoped audio and a separate microphone track",
      "Microphone follows verified mute state by default",
      "Visible pause, stop, and recording controls",
      "Revocable rules for recurring meeting series",
    ],
  },
  {
    id: "notes",
    icon: FileText,
    title: "The next steps, already organized.",
    body: "Review an executive summary, decisions, and action items after processing finishes. Keep personal notes alongside a timestamped transcript.",
    items: [
      "Editable Minutes of Meeting and personal notes",
      "Source references to check the conversation",
      "Copy reports and transcripts; export a PDF",
      "Optional Notion and Slack exports after configuration",
    ],
  },
  {
    id: "ask",
    icon: MessageSquare,
    title: "Your meeting memory, on demand.",
    body: "Ask questions about past conversations. Start broad across your library, or focus on a folder or a single meeting.",
    items: [
      "Local models for private questions and follow-ups",
      "Source meeting references you can open",
      "Find decisions, compare context, and draft next steps",
      "Export Ask conversations to Markdown or PDF",
    ],
  },
  {
    id: "library",
    icon: FolderSearch,
    title: "Find the meeting that matters.",
    body: "Keep conversations in a searchable library with clear processing states. Organize by project, customer, or recurring work.",
    items: [
      "Search titles, notes, and transcripts",
      "Manual folders and rule-based smart folders",
      "See when notes are ready or processing needs attention",
      "Archive old meetings and manage audio retention",
    ],
  },
  {
    id: "calendar",
    icon: CalendarDays,
    title: "Start with a little more context.",
    body: "Optional Google Calendar connection puts upcoming meetings and join links in view. Prepare an agenda in the notes workspace.",
    items: [
      "Upcoming meetings on Home and Calendar",
      "Scheduled opportunities to start or skip capture",
      "Calendar events never start recording by themselves",
      "Connect and disconnect from Settings",
    ],
  },
  {
    id: "privacy",
    icon: LockKeyhole,
    title: "Local by default. Connected by choice.",
    body: "WhisperKit transcribes on your Mac. Local summary models and Ask keep processing on-device, with cloud providers available when you opt in.",
    items: [
      "Guided model downloads and permission setup",
      "Optional encrypted Drive sync across your Macs",
      "Drive sync covers notes data, not audio",
      "Separate controls for cloud transcription and summaries",
    ],
  },
];
export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="A MORE USEFUL MEETING MEMORY"
        title="From the call to the next step."
        description="Capture, understand, find, and share. A native Mac workspace for the work that happens in meetings."
      />
      <div className="mx-auto max-w-6xl px-5 pb-16">
        <ProductDemo />
      </div>
      <div className="mx-auto max-w-5xl px-5 pb-20">
        <nav
          aria-label="Feature sections"
          className="mb-8 flex flex-wrap justify-center gap-3 text-xs text-muted"
        >
          {FEATURES.map((f) => (
            <a
              key={f.id}
              href={`#${f.id}`}
              className="rounded-full border border-border px-4 py-2 hover:text-white"
            >
              {f.id === "notes"
                ? "Meeting notes"
                : f.id[0].toUpperCase() + f.id.slice(1)}
            </a>
          ))}
        </nav>
        <div className="feature-page-grid">
          {FEATURES.map((f) => (
            <section id={f.id} key={f.id} className="feature-page-card">
              <span className="feature-icon">
                <f.icon size={23} />
              </span>
              <h2>{f.title}</h2>
              <p>{f.body}</p>
              <ul className="mt-5">
                {f.items.map((item) => (
                  <li key={item}>
                    <Check size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="section-footnote">
          Browser audio is scoped to the browser application and can include
          other tabs. Provider detection depends on supported call controls.{" "}
          <Link href="/docs#compatibility" className="text-link">
            Read compatibility details <ArrowRight size={13} />
          </Link>
        </p>
        <div className="mt-14 text-center">
          <DownloadButton showMeta />
        </div>
      </div>
    </>
  );
}
