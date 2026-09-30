import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Install TrueMinutes, grant permissions, and run your first meeting capture.",
};

const SECTIONS = [
  {
    id: "install",
    title: "Install",
    body: (
      <>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Download{" "}
            <a href={SITE.dmg} className="font-semibold text-violet-soft no-underline hover:text-white">
              TrueMinutes {SITE.version}.dmg
            </a>
            .
          </li>
          <li>Open the disk image and drag TrueMinutes into Applications.</li>
          <li>
            First launch may be blocked because the build is <strong className="text-text">internally signed, not
            notarized</strong>. Follow the install note included in the DMG (System Settings → Privacy & Security → Open
            Anyway), or right-click → Open.
          </li>
          <li>Do not clear quarantine with unofficial <code className="rounded bg-surface-3 px-1 font-mono text-xs">xattr</code> workarounds in production environments.</li>
        </ol>
      </>
    ),
  },
  {
    id: "permissions",
    title: "Permissions",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-text">Accessibility</strong> — required for meeting UI evidence (Leave / mic controls).
        </li>
        <li>
          <strong className="text-text">Screen Recording</strong> — required for ScreenCaptureKit application audio.
        </li>
        <li>
          <strong className="text-text">Microphone</strong> — required for local mic capture when following meeting mute
          state.
        </li>
        <li>
          <strong className="text-text">Calendar</strong> (optional) — surfaces upcoming meeting opportunities.
        </li>
      </ul>
    ),
  },
  {
    id: "first-meeting",
    title: "First meeting",
    body: (
      <ol className="list-decimal space-y-2 pl-5">
        <li>Join a supported call: {SITE.platforms.join(", ")}.</li>
        <li>When TrueMinutes shows a detection prompt, choose Start capturing (or configure a series rule later).</li>
        <li>Authorize browser application-audio for that session when prompted.</li>
        <li>Mute in the meeting app — TrueMinutes should pause mic capture when mute state is verified.</li>
        <li>Leave the call. Capture stops; transcription and summary continue in the background.</li>
      </ol>
    ),
  },
  {
    id: "local-ai",
    title: "Local AI & cloud opt-in",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Default transcription uses WhisperKit on Apple Silicon.</li>
        <li>Summarization can use local model paths (including Ollama-class setups depending on build).</li>
        <li>Cloud ASR / summary providers appear in Settings and stay off until you opt in.</li>
        <li>If live ASR misses its drain window, TrueMinutes can recover transcripts from bounded saved-audio windows.</li>
      </ul>
    ),
  },
  {
    id: "updates",
    title: "Updates",
    body: (
      <p>
        Sparkle delivers updates from the public{" "}
        <a href={SITE.releases} className="font-semibold text-violet-soft no-underline hover:text-white" target="_blank" rel="noopener noreferrer">
          TrueMinutes-releases
        </a>{" "}
        appcast. Prefer in-app update or that releases page over unofficial mirrors.
      </p>
    ),
  },
];

export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow="Documentation"
        title="Get productive in minutes"
        description="Install, permissions, first capture, local AI, and updates — the essentials."
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 lg:grid-cols-[200px_1fr]">
        <nav className="hidden lg:block" aria-label="Docs sections">
          <ul className="sticky top-24 flex flex-col gap-2 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-muted no-underline hover:text-violet-soft">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-8">
          {SECTIONS.map((s) => (
            <article key={s.id} id={s.id} className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-white">{s.title}</h2>
              <div className="mt-4 text-sm leading-relaxed text-muted">{s.body}</div>
            </article>
          ))}

          <p className="text-sm text-dim">
            Deeper engineering docs live in the product repository. For privacy behavior see{" "}
            <Link href="/privacy" className="text-violet-soft no-underline hover:text-white">
              Privacy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
