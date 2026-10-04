import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Cloud,
  HardDrive,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/Section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & trust",
  description:
    "Where TrueMinutes meeting data lives, what optional cloud services receive, and the controls you have.",
  alternates: { canonical: "/privacy/" },
};
const FLOWS = [
  {
    icon: HardDrive,
    title: "On your Mac",
    body: "Audio, transcripts, summaries, and Ask conversations are stored locally. WhisperKit and local summary models can process your meetings without sending content to a cloud AI provider.",
    items: [
      "Cloud AI is optional",
      "Configurable audio retention",
      "Local files are protected by your Mac’s security",
    ],
  },
  {
    icon: Cloud,
    title: "Optional encrypted sync",
    body: "Enable Google Drive sync to move meeting data between your Macs. Notes, transcripts, summaries, Ask chats, folders, and rules are encrypted on your Mac before upload to Drive’s private app data folder.",
    items: [
      "Disabled until you enable it",
      "Meeting audio is excluded",
      "Disconnecting stops future sync; it does not erase stored data",
    ],
  },
  {
    icon: KeyRound,
    title: "Optional Google connections",
    body: "Calendar and Drive sign-in use a separate OAuth service. It exchanges authorization codes and refresh tokens, but does not receive meeting audio, transcripts, or summaries.",
    items: [
      "Connected credentials are saved in macOS Keychain",
      "Token plaintext is handled transiently by the sign-in service",
      "Short-lived encrypted handoff results may remain in managed backups",
    ],
  },
];
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="PRIVACY, IN PLAIN LANGUAGE"
        title="Know where your meeting data goes."
        description="Local-first is the default. Cloud processing and sync are separate choices, with clear boundaries."
      />
      <div className="mx-auto max-w-5xl px-5 pb-20">
        <div className="benefit-grid">
          {FLOWS.map((f) => (
            <section className="benefit-card" key={f.title}>
              <span className="feature-icon">
                <f.icon size={22} />
              </span>
              <h2 className="mt-6 text-xl font-medium tracking-tight">
                {f.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {f.body}
              </p>
              <ul className="mt-5 space-y-3">
                {f.items.map((item) => (
                  <li
                    className="flex gap-2 text-xs leading-relaxed text-muted"
                    key={item}
                  >
                    <Check
                      size={13}
                      className="mt-1 shrink-0 text-violet-300"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-3xl space-y-10">
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-medium tracking-tight">
              <ShieldCheck size={23} className="text-violet-300" />
              You control recording and processing
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              TrueMinutes never joins as a meeting participant. Recording
              requires verified joined-call controls and your Start decision or
              an explicitly enabled recurring-series rule. A calendar event,
              URL, or window title alone does not start capture.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              The microphone follows verified meeting mute state by default.
              When that state is muted, unknown, or stale, microphone capture
              stays off. You can review recording controls and model choices in
              Settings.
            </p>
          </section>
          <section className="border-t border-border pt-10">
            <h2 className="text-xl font-medium">When you choose cloud AI</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Cloud transcription sends audio to the selected provider. Cloud
              summaries and Ask send the text or context needed for the
              requested processing. Provider terms and retention policies apply.
              Cloud AI is separate from encrypted Drive sync; sync does not
              upload audio.
            </p>
          </section>
          <section className="border-t border-border pt-10">
            <h2 className="text-xl font-medium">Important boundaries</h2>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-muted">
              <li>
                <strong className="font-medium text-white">
                  Browser capture can include other tabs.
                </strong>{" "}
                Audio is scoped to the selected browser application, not an
                individual tab. Native clients are scoped to the selected
                meeting application. Exact-tab capture is not currently offered.
              </li>
              <li>
                <strong className="font-medium text-white">
                  Local storage is not application-encrypted.
                </strong>{" "}
                Audio files and the meeting database rely on your Mac’s access
                controls. Use FileVault and a secure user account.
              </li>
              <li>
                <strong className="font-medium text-white">
                  Disconnecting is different from deleting.
                </strong>{" "}
                Turning off sync stops future transfers. It does not
                automatically delete local or remote data. Google access can
                also be revoked from your Google Account.
              </li>
              <li>
                <strong className="font-medium text-white">
                  Record with consent.
                </strong>{" "}
                Inform participants and follow your organization’s policies and
                applicable recording requirements.
              </li>
            </ul>
          </section>
          <section className="border-t border-border pt-10">
            <h2 className="text-xl font-medium">About this website</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              This marketing site has no accounts, meeting uploads, advertising
              trackers, or analytics scripts. The interactive examples use
              fictional data and prewritten answers. Hosting and external
              downloads still involve requests to Cloudflare and GitHub.
            </p>
            <p className="mt-5 text-sm leading-7 text-muted">
              This page explains the product’s data flow. It does not replace
              the{" "}
              <a
                href={SITE.privacyPolicy}
                className="text-violet-200 underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                published privacy policy
              </a>
              .
            </p>
            <p className="mt-5">
              <Link className="text-link" href="/docs">
                Review permissions and setup <ArrowRight size={14} />
              </Link>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
