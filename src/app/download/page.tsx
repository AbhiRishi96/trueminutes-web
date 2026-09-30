import type { Metadata } from "next";
import Link from "next/link";
import { Apple, CheckCircle2, Monitor } from "lucide-react";
import { PageHero } from "@/components/Section";
import { DownloadButton, SecondaryLink } from "@/components/DownloadButton";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download",
  description: `Download TrueMinutes ${SITE.version} for Apple silicon macOS.`,
};

const STEPS = [
  "Download the .dmg and open it",
  "Drag TrueMinutes into Applications",
  "If macOS blocks first launch, open System Settings → Privacy & Security → Open Anyway (build is internally signed, not notarized)",
  "Grant Accessibility, Screen Recording, and Microphone",
  "Join a supported meeting and start capturing",
];

export default function DownloadPage() {
  return (
    <>
      <PageHero
        eyebrow="Download"
        title="Get TrueMinutes for Mac"
        description={`${SITE.arch} · ${SITE.macosMin} · v${SITE.version}`}
      />

      <div className="mx-auto grid max-w-6xl gap-6 px-5 pb-24 lg:grid-cols-2">
        <article className="rounded-3xl border border-border bg-surface p-8 sm:p-10">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8">
            <Apple size={24} className="text-white" aria-hidden />
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald">Latest</p>
          <h2 className="text-2xl font-semibold tracking-tight text-white">macOS · v{SITE.version}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Direct DMG. Apple Silicon native. First launch may need Open Anyway — details in the DMG and setup guide.
          </p>
          <div className="mt-8">
            <DownloadButton variant="primary" showMeta label="Download for Mac" />
          </div>
          <div className="mt-4">
            <SecondaryLink href={SITE.releases} className="text-sm">
              All releases
            </SecondaryLink>
          </div>
        </article>

        <article className="rounded-3xl border border-border bg-surface/60 p-8 sm:p-10">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
            <Monitor size={24} className="text-muted" aria-hidden />
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dim">Coming later</p>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Windows & Linux</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Cross-platform work is in progress. macOS is the supported product today.
          </p>
          <p className="mt-6 text-sm text-dim">
            Watch{" "}
            <a href={SITE.releases} className="text-violet-soft no-underline hover:text-white" target="_blank" rel="noopener noreferrer">
              GitHub Releases
            </a>{" "}
            for updates.
          </p>
        </article>

        <article className="rounded-3xl border border-border bg-surface p-8 lg:col-span-2">
          <h2 className="text-xl font-semibold text-white">Setup</h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step} className="flex gap-3 rounded-xl border border-border bg-surface-2/40 p-4 text-sm text-muted">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald" aria-hidden />
                <span>
                  <span className="font-semibold text-text">{i + 1}. </span>
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-dim">
            See{" "}
            <Link href="/docs" className="text-violet-soft no-underline hover:text-white">
              documentation
            </Link>{" "}
            for permissions detail.
          </p>
        </article>
      </div>
    </>
  );
}
