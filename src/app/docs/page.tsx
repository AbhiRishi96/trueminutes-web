import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/Section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Getting started",
  description:
    "Install TrueMinutes, prepare local models, understand permissions, and capture your first meeting on Mac.",
  alternates: { canonical: "/docs/" },
};
const SECTIONS = [
  {
    id: "install",
    title: "1. Install TrueMinutes",
    body: (
      <>
        <p>
          You need an Apple silicon Mac running {SITE.macosMin}. The standard
          local summary model requires 16 GB RAM and about 9.5 GB of available
          disk space for installation. Other models have different requirements.
        </p>
        <ol>
          <li>
            <Link href="/download">Download the official DMG</Link>, open it,
            and drag TrueMinutes into Applications.
          </li>
          <li>
            Open TrueMinutes from Applications. Review the release-specific{" "}
            <Link href="/download#install-note">first-launch instructions</Link>{" "}
            if macOS blocks it.
          </li>
          <li>
            Follow guided setup to grant permissions and prepare local models.
            Initial model downloads need internet and can take time depending on
            your connection.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "permissions",
    title: "2. Understand the permissions",
    body: (
      <>
        <p>
          Grant each permission from guided setup or Settings when you’re ready
          to use the related feature.
        </p>
        <ul>
          <li>
            <strong>Accessibility:</strong> reads visible call controls so
            TrueMinutes can distinguish a joined meeting from an open page.
          </li>
          <li>
            <strong>Screen & system audio recording:</strong> enables
            application audio capture through macOS. Permission names vary by
            macOS version. TrueMinutes records audio, not a video of your
            screen.
          </li>
          <li>
            <strong>Microphone:</strong> enables your local voice track. By
            default it follows verified meeting mute state; unknown or stale
            state leaves the mic off.
          </li>
          <li>
            <strong>Calendar (optional):</strong> shows meeting opportunities.
            Connect Google Calendar from Settings if you want upcoming events
            and join links.
          </li>
        </ul>
        <p>
          Browser audio permission applies to the selected browser application
          and can include other tabs. Close or mute unrelated audio before
          recording.
        </p>
      </>
    ),
  },
  {
    id: "first-meeting",
    title: "3. Capture your first meeting",
    body: (
      <ol>
        <li>
          Let participants know you are recording and follow your organization’s
          policy.
        </li>
        <li>
          Join the call and wait for TrueMinutes to recognize joined-call
          controls.
        </li>
        <li>
          Choose Transcribe on the join island, or open the menu for series
          rules or Skip. For browser calls, review and authorize the application
          audio scope for that session.
        </li>
        <li>
          Check the floating recording pill. Adjust mic include/off or Stop
          whenever needed.
        </li>
        <li>
          Leave the meeting or choose Stop. Transcription and summary generation
          continue in the background; check the meeting’s status in the library.
        </li>
        <li>
          Open the ready meeting, review its summary and transcript, then copy
          or export what you need.
        </li>
      </ol>
    ),
  },
  {
    id: "compatibility",
    title: "Meeting app compatibility",
    body: (
      <>
        <p>
          The Mac app includes detection for {SITE.platforms.join(", ")}, using
          recognized browser, PWA, and native client call controls. Support
          depends on the exact app version, visible controls, and macOS
          permissions.
        </p>
        <p>
          A provider name is not a guarantee that every client or layout has
          been validated. If TrueMinutes cannot verify a joined call, it does
          not guess and start recording. Calendar events and open meeting URLs
          alone are insufficient.
        </p>
        <p>
          Browser capture is application-scoped. The extension scaffold in the
          app repository does not provide shipped exact-tab audio capture.
          Windows, Linux, and Intel Mac are not supported installers for this
          release.
        </p>
      </>
    ),
  },
  {
    id: "local-ai",
    title: "Local models & optional connections",
    body: (
      <>
        <p>
          WhisperKit transcribes on-device. Guided setup prepares local models
          for summaries and Ask. Let model downloads complete, then check model
          readiness in Settings before your first meeting.
        </p>
        <p>
          Once your local models are installed, local processing can work
          offline. Google Calendar, Drive sync, cloud AI, and external exports
          need internet access.
        </p>
        <p>
          Cloud transcription, cloud summaries, and encrypted Drive sync are
          separate opt-ins. Drive sync encrypts meeting data before upload and
          excludes audio. See <Link href="/privacy">the privacy model</Link>{" "}
          before enabling a connection.
        </p>
      </>
    ),
  },
  {
    id: "troubleshooting",
    title: "If something needs attention",
    body: (
      <ul>
        <li>
          <strong>No recording prompt:</strong> check Accessibility and system
          audio permissions, confirm you are inside the joined call, and ensure
          its controls are visible. An unsupported layout will not start
          capture.
        </li>
        <li>
          <strong>Your voice is missing:</strong> check Microphone permission
          and the meeting’s mute state. The default policy keeps the mic off if
          that state is unknown. Review any explicit mic override before using
          it.
        </li>
        <li>
          <strong>Models aren’t ready:</strong> check download progress,
          available disk space, and your selected model in Settings.
        </li>
        <li>
          <strong>Notes are still processing:</strong> check the meeting status.
          Transcription and summaries finish after capture stops. If recovery
          fails and Retry is offered, use it while saved audio is available.
        </li>
        <li>
          <strong>Google connection needs attention:</strong> review the
          connection in Settings and reconnect if requested. Keep your local
          library; do not delete the database as a troubleshooting step.
        </li>
      </ul>
    ),
  },
  {
    id: "updates",
    title: "Updates & release information",
    body: (
      <>
        <p>
          Use the in-app updater or the{" "}
          <a href={SITE.releases} target="_blank" rel="noopener noreferrer">
            official latest release
          </a>
          .{" "}
          <a
            href={`${SITE.releasesRepo}/releases`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Release notes
          </a>{" "}
          describe changes and known install requirements.
        </p>
        <p>
          When reporting a problem through a contact listed in the official
          release information, include the app version, macOS version, meeting
          client, and steps to reproduce. Do not post recordings, transcripts,
          credentials, or private diagnostic logs.
        </p>
      </>
    ),
  },
];
export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow="GETTING STARTED"
        title="Your first meeting, step by step."
        description="Install the app, prepare your local models, and understand what each permission does."
      />
      <div className="mx-auto grid max-w-5xl gap-10 px-5 pb-20 lg:grid-cols-[210px_1fr]">
        <nav aria-label="On this page">
          <div className="docs-contents lg:sticky lg:top-24">
            <p className="eyebrow mb-4">ON THIS PAGE</p>
            <ul className="flex flex-col gap-3 text-xs text-muted">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-white">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div>
          {SECTIONS.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className={`docs-article scroll-mt-24 pb-10 ${i > 0 ? "border-t border-border pt-10" : ""}`}
            >
              <h2 className="text-xl font-medium tracking-tight">{s.title}</h2>
              <div className="mt-5 text-sm leading-7 text-muted">{s.body}</div>
            </article>
          ))}
          <Link href="/download" className="text-link">
            Get TrueMinutes for Mac <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}
