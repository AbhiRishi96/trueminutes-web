import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownToLine, ArrowRight, Check, Monitor } from "lucide-react";
import { Changelog } from "@/components/Changelog";
import { PageHero } from "@/components/Section";
import { SITE, INSTALL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download for Mac",
  description: `Download TrueMinutes ${SITE.version}. Requirements, first-launch notes, and guided setup for Apple silicon Mac.`,
  alternates: { canonical: "/download/" },
};
const STEPS = [
  {
    title: "Install the app",
    body: "Open the DMG and drag TrueMinutes into Applications. Open it from Applications, then review the first-launch note below.",
  },
  {
    title: "Prepare your Mac",
    body: "Guided setup explains Accessibility, microphone, and system audio permissions. Download local transcription and summary models before your first call.",
  },
  {
    title: "Capture your first meeting",
    body: "Let participants know you are recording. Join a supported call, choose Start when prompted, then review the notes after processing finishes.",
  },
];
export default function DownloadPage() {
  return (
    <>
      <PageHero
        eyebrow="YOUR MEETING MEMORY STARTS HERE"
        title="Make room for the conversation."
        description="Get TrueMinutes for your Mac. Free to download, local-first, and without a bot in the call."
      />
      <div className="mx-auto grid max-w-4xl gap-8 px-5 pb-16 md:grid-cols-[1.05fr_1fr]">
        <div className="install-card">
          <Image
            src="/brand/app-icon.png"
            width={64}
            height={64}
            alt="TrueMinutes app icon"
            className="mb-6 rounded-2xl"
          />
          <h2 className="text-2xl font-semibold tracking-tight">
            TrueMinutes for Mac
          </h2>
          <p className="mt-2 text-sm text-muted">
            Version {SITE.version} · Free download
          </p>
          <a
            href={SITE.dmg}
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-violet-100"
          >
            <ArrowDownToLine size={17} />
            Download v{SITE.version} (.dmg)
          </a>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Official download hosted on GitHub Releases.
          </p>
          <div className="mt-7 border-t border-border pt-5">
            <a
              href={SITE.releases}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Check the latest release <ArrowRight size={14} />
            </a>
            <br />
            <a
              href={`${SITE.releasesRepo}/releases`}
              className="mt-3 inline-block text-xs text-muted underline-offset-4 hover:underline"
            >
              All versions & release notes
            </a>
          </div>
        </div>
        <div className="py-4">
          <h2 className="flex items-center gap-2 text-lg font-medium">
            <Monitor size={19} className="text-violet-300" />
            Before you download
          </h2>
          <ul className="mt-6 space-y-5 text-sm text-muted">
            {[
              "Apple silicon Mac (M1 or later)",
              SITE.macosMin,
              "16 GB RAM for the standard local summary model",
              "Several GB of storage for local models; the standard summary package requires about 9.5 GB of available disk space",
              "Internet for the installer and model downloads. Local processing works offline once models are ready.",
            ].map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <Check size={16} className="mt-1 shrink-0 text-violet-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-muted">
            Windows, Linux, and Intel Mac installers are not currently offered.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-5">
        <aside id="install-note" className="install-warning">
          <h2 className="mb-2 text-sm font-semibold">{INSTALL.title}</h2>
          <p>
            {INSTALL.description}{" "}
            <a href={SITE.release.releaseUrl} className="underline">
              Read this release’s notes.
            </a>
          </p>
        </aside>
      </div>
      <section className="mx-auto max-w-4xl px-5 py-16">
        <p className="eyebrow">FROM DOWNLOAD TO FIRST CALL</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight">
          Three steps. A better meeting routine.
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="step-number">0{i + 1}</span>
              <h3 className="mt-5 text-base font-medium">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-6 border-t border-border pt-7">
          <Link href="/docs" className="text-link">
            Full setup guide <ArrowRight size={14} />
          </Link>
          <Link href="/docs#troubleshooting" className="text-link">
            Need help getting started? <ArrowRight size={14} />
          </Link>
          <Link href="/privacy" className="text-link">
            Privacy details <ArrowRight size={14} />
          </Link>
        </div>
      </section>
      <section id="changelog" className="mx-auto max-w-4xl px-5 pb-20">
        <p className="eyebrow">WHAT’S NEW</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight">
          Version history
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          The latest app version syncs automatically from the official GitHub
          release. Recent changelogs stay here so you can scan what changed
          without leaving the site.
        </p>
        <Changelog className="mt-10" />
        <p className="mt-8 text-xs text-dim">
          Older releases remain on{" "}
          <a
            href={`${SITE.releasesRepo}/releases`}
            className="underline underline-offset-4 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Releases
          </a>
          . This page keeps the latest plus a short recent history.
        </p>
      </section>
    </>
  );
}
