import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Cloud,
  HardDrive,
  MessageSquare,
  Mic,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { AppScreenshot, ScreenshotGallery } from "@/components/AppScreenshot";
import { DownloadButton, SecondaryLink } from "@/components/DownloadButton";
import { Section } from "@/components/Section";
import {
  CapturePillMock,
  MeetingDetailMock,
  ProductShellTour,
} from "@/components/ProductMocks";
import { SITE } from "@/lib/site";

const TRUST = ["Zero meeting bots", "Apple Silicon native", "Local-first privacy", "Ask your memory"];

const COMPARISON = {
  bots: [
    "Joins as an awkward extra participant",
    "Needs waiting-room / host approval",
    "Sends raw audio to third-party clouds by default",
    "Can keep recording after you leave",
  ],
  tm: [
    "Never appears in the participant list",
    "Starts only after your decision or verified join rule",
    "Raw audio stays on your Mac — retention you control",
    "Stops when verified meeting evidence ends",
  ],
};

const HIGHLIGHTS = [
  {
    icon: Mic,
    title: "Detect & capture",
    body: "Fail-closed detection, mute-aware mic, floating pill, auto-stop on leave.",
  },
  {
    icon: Sparkles,
    title: "Notes that ship",
    body: "Summary, MOM, decisions, action items with transcript citations.",
  },
  {
    icon: MessageSquare,
    title: "Ask TrueMinutes",
    body: "Private Q&A over your library with citations and exportable artifacts.",
  },
  {
    icon: Calendar,
    title: "Calendar + Notes",
    body: "Up-next opportunities, series rules, and a notes workspace beside meetings.",
  },
  {
    icon: Search,
    title: "Search everything",
    body: "Meetings, notes, transcripts — folders, smart folders, archive.",
  },
  {
    icon: Share2,
    title: "Export anywhere",
    body: "Markdown, PDF, Notion, Slack, clipboard — from the app or menu bar.",
  },
];

const FAQ_TEASERS = [
  {
    q: "Will others see TrueMinutes in the call?",
    a: "No. It never joins as a participant. Capture runs on your Mac from verified meeting surfaces.",
  },
  {
    q: "Is Ask TrueMinutes cloud-only?",
    a: "No. Ask runs over your local transcripts by default. Cloud models stay opt-in.",
  },
  {
    q: "Where does audio live?",
    a: "On your Mac. Retention is configurable; recycle bin soft-deletes recordings.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative mx-auto max-w-6xl px-5 pb-14 pt-14 sm:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[min(90vw,640px)] -translate-x-1/2 rounded-full bg-violet/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-violet/35 bg-violet-dim px-3.5 py-1.5 text-sm font-semibold text-violet-soft">
            <Sparkles size={14} aria-hidden />
            TrueMinutes for macOS · Apple Silicon
          </div>
          <h1 className="animate-fade-up-delay text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
            Meeting intelligence{" "}
            <span className="text-gradient-violet">without the awkward bot.</span>
          </h1>
          <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            Capture, transcribe, summarize, search, and Ask across {SITE.platforms.join(", ")} — privately on your Mac.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <DownloadButton variant="primary" showMeta />
            <SecondaryLink href="#shell">
              Tour the product
              <ArrowRight size={16} aria-hidden />
            </SecondaryLink>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-dim">
            {TRUST.map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-violet-soft" />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="animate-fade-up-delay-2 relative mx-auto mt-14 max-w-5xl">
          <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-violet/15 blur-2xl" />
          <AppScreenshot shot="home" priority className="relative" />
        </div>
      </section>

      <section className="border-y border-border bg-surface/50 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-5">
          {SITE.platforms.map((p) => (
            <span
              key={p}
              className="rounded-full border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-muted transition hover:border-violet/40 hover:text-text"
            >
              {p}
            </span>
          ))}
          <span className="rounded-full border border-violet/35 bg-violet-dim px-4 py-2 text-sm font-medium text-violet-soft">
            {SITE.arch}
          </span>
        </div>
      </section>

      <Section
        id="showcase"
        eyebrow="Real app"
        title="Captured from TrueMinutes on Mac"
        description="Live screenshots of Home, Meetings, Ask, Notes, Calendar, and Settings."
      >
        <ScreenshotGallery
          shots={[
            { key: "meetingsLibrary", label: "Meetings library" },
            { key: "ask", label: "Ask TrueMinutes" },
            { key: "notes", label: "Notes" },
            { key: "calendar", label: "Calendar" },
          ]}
        />
      </Section>

      <Section
        id="shell"
        eyebrow="Product tour"
        title={
          <>
            Home → Meetings → Notes → <span className="text-gradient-violet">Ask</span> → Calendar
          </>
        }
        description="Click each tab to see the real macOS app screenshot for that surface."
      >
        <ProductShellTour />
      </Section>

      <Section
        eyebrow="Live capture"
        title="Recording that follows the call"
        description="Floating pill, mute sync, waveform — stop when verified leave says the meeting ended."
      >
        <CapturePillMock />
      </Section>

      <Section
        eyebrow="Meeting intelligence"
        title="Summary, actions, transcript, your notes"
        description="One meeting document with regenerable summary, citation-backed actions, and freeform notes."
      >
        <MeetingDetailMock />
      </Section>

      <Section eyebrow="Capabilities" title="Everything in the loop">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="shine-border rounded-2xl bg-surface/90 p-6 transition hover:-translate-y-0.5 hover:bg-surface-2"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-dim text-violet-soft">
                <Icon size={20} aria-hidden />
              </div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/features"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-soft no-underline hover:text-white"
          >
            Full feature catalog <ArrowRight size={14} />
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="Why bot-free"
        title="Confidential calls deserve better than a stranger in the roster"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-rose-300">Meeting bots</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted">
              {COMPARISON.bots.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/80" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="shine-border rounded-2xl bg-violet-dim/30 p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-violet-soft">TrueMinutes</h3>
            <ul className="flex flex-col gap-3 text-sm text-text">
              {COMPARISON.tm.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Architecture" title="Local-first, cloud optional">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald/25 bg-emerald-dim/25 p-6 sm:p-8">
            <HardDrive className="mb-4 text-emerald" size={24} aria-hidden />
            <h3 className="text-xl font-bold text-white">On your Mac</h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
              <li>WhisperKit transcription + on-device / local summarization</li>
              <li>Ask TrueMinutes over your private library</li>
              <li>Configurable audio retention + recycle bin</li>
              <li>Saved-audio recovery when live ASR misses drain</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <Cloud className="mb-4 text-cyan" size={24} aria-hidden />
            <h3 className="text-xl font-bold text-white">Cloud (opt-in)</h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
              <li>ChatGPT, Claude, Groq, OpenRouter for summaries</li>
              <li>Optional post-meeting cloud transcription pass</li>
              <li>Local-only mode blocks cloud until you turn it off</li>
              <li>
                <Link href="/privacy" className="font-semibold text-violet-soft no-underline hover:text-white">
                  Privacy model →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Integrations"
        title="Ship notes where work already happens"
        description="Clipboard, PDF, Notion pages, Slack webhooks — plus menu-bar quick export."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["Markdown / clipboard", "PDF export", "Notion", "Slack"].map((name) => (
            <div
              key={name}
              className="rounded-2xl border border-border bg-surface px-5 py-6 text-center text-sm font-semibold text-text"
            >
              {name}
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Quick answers">
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          {FAQ_TEASERS.map((f) => (
            <details key={f.q} className="rounded-xl border border-border bg-surface open:border-border-strong">
              <summary className="cursor-pointer list-none px-5 py-4 text-left text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                {f.q}
              </summary>
              <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/faq" className="text-sm font-semibold text-violet-soft no-underline hover:text-white">
            Full FAQ →
          </Link>
        </div>
      </Section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="shine-border relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-dim via-surface to-surface-2 px-8 py-14 text-center sm:px-16">
          <ShieldCheck className="mx-auto mb-3 text-violet-soft" size={28} aria-hidden />
          <Zap className="sr-only" />
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Download TrueMinutes for Mac
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            v{SITE.version} · Internally signed · Not Apple notarized — see DMG install note on first launch.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <DownloadButton variant="primary" showMeta />
            <SecondaryLink href="/docs">Setup guide</SecondaryLink>
          </div>
        </div>
      </section>
    </>
  );
}
