import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-3 flex items-center gap-2">
            <Image src="/brand/app-icon.png" alt="" width={28} height={28} className="rounded-md" />
            <span className="font-bold text-white">{SITE.name}</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Bot-free meeting intelligence for Apple silicon Macs. Capture, transcribe, and summarize locally —
            optional cloud when you opt in.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-dim">Product</h3>
          <ul className="flex flex-col gap-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted no-underline hover:text-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-dim">Resources</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a href={SITE.releases} className="text-muted no-underline hover:text-text" target="_blank" rel="noopener noreferrer">
                GitHub Releases
              </a>
            </li>
            <li>
              <Link href="/privacy" className="text-muted no-underline hover:text-text">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/docs" className="text-muted no-underline hover:text-text">
                Documentation
              </Link>
            </li>
            <li>
              <a href={`${SITE.github}/issues`} className="text-muted no-underline hover:text-text" target="_blank" rel="noopener noreferrer">
                Support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-dim">Platforms</h3>
          <ul className="flex flex-col gap-2 text-sm text-muted">
            {SITE.platforms.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {SITE.name}. {SITE.macosMin} · {SITE.arch}.</span>
          <span>v{SITE.version} · Internally signed (not Apple notarized).</span>
        </div>
      </div>
    </footer>
  );
}
