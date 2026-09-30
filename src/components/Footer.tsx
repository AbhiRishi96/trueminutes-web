import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 lg:flex-row lg:justify-between">
        <div className="max-w-xs">
          <div className="mb-3 flex items-center gap-2">
            <Image src="/brand/app-icon.png" alt="" width={24} height={24} className="rounded-md" />
            <span className="text-sm font-semibold text-white">{SITE.name}</span>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Bot-free meeting intelligence for Apple silicon Macs.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-dim">Product</p>
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-dim">Resources</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a href={SITE.releases} className="text-muted no-underline hover:text-text" target="_blank" rel="noopener noreferrer">
                  Releases
                </a>
              </li>
              <li>
                <Link href="/docs" className="text-muted no-underline hover:text-text">
                  Docs
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-dim">Legal</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted no-underline hover:text-text">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-dim sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <span>
            {SITE.macosMin} · {SITE.arch}
          </span>
        </div>
      </div>
    </footer>
  );
}
