import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AppScreenshot } from "@/components/AppScreenshot";
import { DownloadButton, SecondaryLink } from "@/components/DownloadButton";
import { Section } from "@/components/Section";
import { SITE } from "@/lib/site";

const PILLARS = [
  {
    title: "No bot in the call",
    body: "TrueMinutes never joins as a participant. Capture runs on your Mac from verified meeting surfaces.",
  },
  {
    title: "Private by default",
    body: "Audio and transcripts stay local. Cloud ASR and summaries only after you opt in.",
  },
  {
    title: "Works where you meet",
    body: SITE.platforms.join(", ") + " — browser and native clients.",
  },
];

const JOURNEY = [
  {
    step: "Before",
    title: "Show up prepared",
    body: "Calendar sync surfaces what’s next. Capture readiness shows mic, Accessibility, and local models before you join.",
    shot: "calendar" as const,
  },
  {
    step: "During",
    title: "Stay present",
    body: "Mute-aware capture follows the call. Auto-stops when verified leave says the meeting ended — no stranger in the roster.",
    shot: "home" as const,
  },
  {
    step: "After",
    title: "Notes you can ship",
    body: "Summaries, decisions, action items, and transcripts — searchable and exportable the moment you’re done.",
    shot: "meetingDetail" as const,
  },
];

const FAQ = [
  {
    q: "Will other participants see TrueMinutes?",
    a: "No. It never joins the call. Recording happens on your Mac.",
  },
  {
    q: "Do I need host permission?",
    a: "Not for a bot — there isn’t one. Follow your company policy and local law on recording.",
  },
  {
    q: "Is processing local?",
    a: "Yes by default (WhisperKit + local summarization). Cloud options stay opt-in in Settings.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — one composition */}
      <section className="relative overflow-hidden px-5 pb-8 pt-16 sm:pt-24">
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="animate-fade-up mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-violet-soft">
            For macOS · Apple Silicon
          </p>
          <h1 className="animate-fade-up-delay text-balance text-[2.5rem] font-semibold leading-[1.08] tracking-[var(--tracking-display)] text-white sm:text-6xl sm:leading-[1.05]">
            Meeting notes{" "}
            <span className="text-gradient">without the awkward bot.</span>
          </h1>
          <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            Capture, transcribe, and search every conversation on your Mac — privately, with zero bots in the participant list.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <DownloadButton variant="primary" />
            <SecondaryLink href="#how-it-works">
              See how it works
              <ArrowRight size={16} aria-hidden />
            </SecondaryLink>
          </div>
          <p className="mt-4 text-xs text-dim">
            {SITE.macosMin} · {SITE.arch} · Free download
          </p>
        </div>

        <div className="animate-fade-up-delay-2 relative mx-auto mt-16 max-w-5xl">
          <AppScreenshot shot="meetingsLibrary" priority />
        </div>
      </section>

      {/* Platforms — quiet strip */}
      <section className="border-y border-border/80 py-8">
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.14em] text-dim">
          Works with
        </p>
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 text-sm font-medium text-muted">
          {SITE.platforms.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
      </section>

      {/* Three pillars — Granola clarity */}
      <Section
        eyebrow="Why TrueMinutes"
        title="Notes, actions, and memory — without inviting a recorder"
        description="Built for confidential calls where a third-party bot is a non-starter."
      >
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {PILLARS.map((p) => (
            <div key={p.title} className="text-left">
              <h3 className="text-lg font-semibold tracking-tight text-white">{p.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Journey */}
      <div id="how-it-works">
        {JOURNEY.map((item, i) => (
          <section
            key={item.step}
            className={`border-t border-border/60 ${i % 2 === 1 ? "bg-surface/40" : ""}`}
          >
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-violet-soft">
                  {item.step}
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[var(--tracking-display)] text-white sm:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{item.body}</p>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <AppScreenshot shot={item.shot} />
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Ask */}
      <Section
        eyebrow="Ask TrueMinutes"
        title="Perfect meeting memory"
        description="Ask questions across your library. Answers cite the meetings they came from — on your Mac by default."
      >
        <AppScreenshot shot="ask" />
      </Section>

      {/* Local vs cloud — quiet */}
      <Section
        eyebrow="Privacy"
        title="Local-first. Cloud when you choose."
        description="Raw audio stays on disk with retention you control. WhisperKit and local models handle the default path."
      >
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface-2/50 p-6 text-left">
            <p className="text-sm font-semibold text-emerald">On device</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>WhisperKit transcription</li>
              <li>Local summarization & Ask</li>
              <li>Configurable audio retention</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface-2/50 p-6 text-left">
            <p className="text-sm font-semibold text-cyan">Opt-in cloud</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>ChatGPT, Claude, Groq, OpenRouter</li>
              <li>Optional cloud transcription pass</li>
              <li>Local-only mode available</li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-sm">
          <Link href="/privacy" className="font-medium text-violet-soft no-underline hover:text-white">
            Read the privacy model →
          </Link>
        </p>
      </Section>

      {/* FAQ */}
      <Section eyebrow="FAQ" title="Before you download">
        <div className="mx-auto flex max-w-xl flex-col divide-y divide-border border-y border-border">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none text-left text-[0.95rem] font-semibold text-white [&::-webkit-details-marker]:hidden">
                {f.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-sm">
          <Link href="/faq" className="font-medium text-violet-soft no-underline hover:text-white">
            More questions →
          </Link>
        </p>
      </Section>

      {/* Final CTA — clean, no Gatekeeper scare */}
      <section className="px-5 pb-28">
        <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-border bg-surface px-8 py-16 text-center sm:px-12">
          <Image
            src="/brand/app-icon.png"
            alt=""
            width={56}
            height={56}
            className="mx-auto rounded-2xl"
          />
          <h2 className="mt-6 text-3xl font-semibold tracking-[var(--tracking-display)] text-white sm:text-4xl">
            Start your next meeting with TrueMinutes
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Download the Mac app, grant permissions once, and capture your first call.
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
