import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  Check,
  Download,
  FileText,
  LockKeyhole,
  MessageSquare,
  Monitor,
  ShieldCheck,
} from "lucide-react";
import { AskDemo } from "@/components/AskDemo";
import { DownloadButton, SecondaryLink } from "@/components/DownloadButton";
import { GoogleSyncDemo } from "@/components/GoogleSyncDemo";
import { MeetingChromeDemo } from "@/components/MeetingChromeDemo";
import { ProductDemo } from "@/components/ProductDemo";
import { Section } from "@/components/Section";
import { SITE, INSTALL } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const QUESTIONS = [
  {
    q: "Is TrueMinutes free?",
    a: "Yes. The current Mac release is free to download. Local models run on your own hardware. If you enable a cloud provider, that provider may charge for usage.",
  },
  {
    q: "Does a bot join my meeting?",
    a: "No. TrueMinutes captures audio on your Mac and never appears as a participant. Tell participants when you record and follow your organization’s recording policy.",
  },
  {
    q: "Can my meetings stay on my Mac?",
    a: "Yes. Transcription, summaries, and Ask can use local models. Cloud processing and encrypted Google Drive sync are separate opt-ins. Drive sync can include notes, transcripts, and Ask chats — not audio.",
  },
  {
    q: "What do I need to get started?",
    a: "An Apple silicon Mac with macOS 14.4 or later. Guided setup downloads local models and explains permissions. The standard local summary model requires 16 GB of RAM; model downloads need several GB of disk space and an internet connection.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <Link className="release-pill" href="/download">
            <span className="release-dot" />
            Free Mac app <span className="pill-divider" /> v{SITE.version}{" "}
            <ArrowRight size={13} />
          </Link>
          <h1>
            Be in the meeting.
            <br />
            <span>Keep every next step.</span>
          </h1>
          <p className="hero-description">
            Turn conversations into clear notes, decisions, and action items.
            Then ask your meetings what you missed. All on your Mac, without a
            meeting bot.
          </p>
          <div className="hero-actions">
            <DownloadButton />
            <SecondaryLink href="#product">
              <Monitor size={16} /> Explore the product
            </SecondaryLink>
          </div>
          <p className="hero-requirements">
            Free download <span>·</span> {SITE.macosMin} <span>·</span>{" "}
            {SITE.arch}
          </p>
          <Link href="/download#install-note" className="hero-install-note">
            {INSTALL.link}{" "}
            <ArrowRight size={12} />
          </Link>
        </div>
        <div id="product" className="hero-product">
          <ProductDemo />
        </div>
      </section>
      <section className="platform-section" aria-label="Meeting platforms">
        <p>For the conversations you already have</p>
        <div>
          {SITE.platforms.map((p) => (
            <span key={p}>
              <AudioLines size={16} />
              {p}
            </span>
          ))}
        </div>
        <small>
          Detection depends on the meeting app and its visible call controls.{" "}
          <Link href="/docs#compatibility">Check compatibility →</Link>
        </small>
      </section>
      <Section
        eyebrow="LESS RECONSTRUCTING. MORE DOING."
        title={
          <>
            The meeting ends.
            <br />
            The context stays.
          </>
        }
        description="Your next task shouldn’t be remembering who said what."
      >
        <div className="benefit-grid">
          {[
            {
              icon: FileText,
              title: "Leave with a clear plan",
              body: "Summaries, decisions, and action items bring the important parts together. Keep your own notes beside the transcript.",
              label: "From conversation to next steps",
              href: "/features#notes",
            },
            {
              icon: MessageSquare,
              title: "Find the answer again",
              body: "Ask one meeting or your whole library. Follow source references back to the conversation and check the context.",
              label: "A memory you can question",
              href: "#ask",
            },
            {
              icon: LockKeyhole,
              title: "Keep control of your data",
              body: "Process on your Mac with local models. Choose cloud AI or encrypted Drive sync only when you want them.",
              label: "Local-first by default",
              href: "/privacy",
            },
          ].map((item) => (
            <article key={item.title} className="benefit-card">
              <span className="feature-icon">
                <item.icon size={22} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <Link href={item.href}>
                {item.label}
                <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </Section>
      <section className="workflow-section" id="workflow">
        <div className="workflow-heading">
          <p className="eyebrow">A BETTER MEETING ROUTINE</p>
          <h2>
            Show up. Listen.
            <br />
            <span>Move things forward.</span>
          </h2>
          <p>
            TrueMinutes fits around your call, from the first prompt to the
            follow-up.
          </p>
          <Link className="text-link" href="/docs">
            Walk through your first meeting <ArrowRight size={15} />
          </Link>
        </div>
        <ol className="workflow-steps">
          {[
            {
              title: "Join your call",
              body: "Optional Google Calendar shows what’s next. When joined-call controls are verified, the join island lets you Transcribe, open more options, or skip.",
            },
            {
              title: "Give it your attention",
              body: "A floating recording pill keeps timer, mic status, and Stop in view while you stay in the conversation.",
            },
            {
              title: "Leave with something useful",
              body: "After the call, transcription and summarization finish in the background. Ask your library, check sources, and sync Ask chats if you opt in.",
            },
          ].map((step, i) => (
            <li key={step.title}>
              <span className="step-number">0{i + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <Section
        id="overlays"
        eyebrow="AROUND THE CALL"
        title="Join island. Recording pill. Always in reach."
        description="A compact join prompt when a call is verified, then a floating mic and timer while you capture."
      >
        <MeetingChromeDemo />
      </Section>
      <Section
        id="ask"
        eyebrow="YOUR CONVERSATIONS, CONNECTED"
        title="“What did we decide last time?”"
        description="Ask TrueMinutes searches your library — or a folder, date range, or one meeting — and answers with sources you can open."
      >
        <AskDemo />
      </Section>
      <Section
        id="sync"
        eyebrow="OPTIONAL GOOGLE CONNECTIONS"
        title="Sign in once. Sync the memory you choose."
        description="Connect Google for Calendar and encrypted Drive sync. Ask chats travel with your vault across Macs — audio stays on each machine."
      >
        <GoogleSyncDemo />
      </Section>
      <section className="privacy-feature">
        <div>
          <span className="feature-icon">
            <ShieldCheck size={26} />
          </span>
          <p className="eyebrow">BUILT AROUND YOUR CHOICES</p>
          <h2>
            Your Mac.
            <br />
            Your meeting memory.
          </h2>
          <p>
            Local processing isn’t a premium extra. It’s the default. Choose
            what leaves your Mac, and when.
          </p>
          <Link className="text-link" href="/privacy">
            Understand the privacy model <ArrowRight size={15} />
          </Link>
        </div>
        <div className="privacy-ledger">
          {[
            {
              title: "Meeting audio",
              detail: "Stored on your Mac. Cloud transcription is optional.",
              badge: "LOCAL BY DEFAULT",
            },
            {
              title: "Summaries & Ask",
              detail: "Use a local model, or choose a cloud provider.",
              badge: "YOUR CHOICE",
            },
            {
              title: "Across your Macs",
              detail:
                "Optional encrypted Drive sync for notes, transcripts, and Ask chats. No audio upload.",
              badge: "OPT-IN SYNC",
            },
          ].map((row) => (
            <div key={row.title}>
              <Check size={18} />
              <div>
                <h3>{row.title}</h3>
                <p>{row.detail}</p>
                <span>{row.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Section
        eyebrow="MADE FOR YOUR EVERYDAY CALLS"
        title="Keep the work moving."
        description="A useful record for the conversations that shape your day."
      >
        <div className="use-case-grid">
          {[
            [
              "01",
              "Product & engineering",
              "Return to the decision behind a scope change. Keep owners and open questions in view.",
            ],
            [
              "02",
              "Customer conversations",
              "Stay focused on the person talking. Review needs and next steps after the call.",
            ],
            [
              "03",
              "1:1s & recurring syncs",
              "Carry context into the next conversation. Search past notes instead of starting from scratch.",
            ],
          ].map(([number, title, body]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <p className="section-footnote">
          Record with participants’ knowledge and in line with your
          organization’s policy.
        </p>
      </Section>
      <Section
        eyebrow="BEFORE YOUR FIRST MEETING"
        title="A few things worth knowing."
      >
        <div className="faq-home">
          {QUESTIONS.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <p className="section-footnote">
          <Link className="text-link" href="/faq">
            All questions, answered <ArrowRight size={14} />
          </Link>
        </p>
      </Section>
      <section className="final-cta">
        <span className="feature-icon">
          <Download size={24} />
        </span>
        <p className="eyebrow">YOUR NEXT MEETING, WITH MORE CLARITY</p>
        <h2>
          Less note-taking.
          <br />
          <span>More being there.</span>
        </h2>
        <p>Start with TrueMinutes for Mac. Free, local-first, and bot-free.</p>
        <div className="hero-actions">
          <DownloadButton />
          <SecondaryLink href="/docs">
            Read the setup guide <ArrowRight size={15} />
          </SecondaryLink>
        </div>
        <p className="hero-requirements">
          v{SITE.version} · {SITE.macosMin} · {SITE.arch}
        </p>
        <Link href="/download#install-note" className="hero-install-note">
          Review requirements and first-launch instructions
        </Link>
      </section>
    </>
  );
}
