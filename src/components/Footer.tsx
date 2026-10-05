import Link from "next/link";
import Image from "next/image";
import { ContactLinks } from "@/components/ContactLinks";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-14 sm:flex-row sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <Image
              src="/brand/app-icon.png"
              alt=""
              width={28}
              height={28}
              className="rounded-[5px]"
            />
            <span className="text-[15px] font-semibold text-white">
              {SITE.name}
            </span>
          </div>
          <p className="max-w-[260px] text-[13px] leading-relaxed text-dim">
            A meeting memory you own. Notes, decisions, and next steps, on your
            Mac.
          </p>
        </div>

        <div className="flex flex-wrap gap-14 text-[13px]">
          <div>
            <p className="mb-3 text-[11px] font-medium tracking-[0.06em] text-dim uppercase">
              Product
            </p>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-muted no-underline transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-medium tracking-[0.06em] text-dim uppercase">
              Resources
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/download"
                  className="text-muted no-underline transition-colors hover:text-white"
                >
                  Download
                </Link>
              </li>
              <li>
                <Link
                  href="/download#changelog"
                  className="text-muted no-underline transition-colors hover:text-white"
                >
                  Changelog
                </Link>
              </li>
              <li>
                <a
                  href={SITE.releases}
                  className="text-muted no-underline transition-colors hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Releases
                </a>
              </li>
              <li>
                <a
                  href={SITE.privacyPolicy}
                  className="text-muted no-underline transition-colors hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-medium tracking-[0.06em] text-dim uppercase">
              Contact
            </p>
            <ContactLinks />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-[11px] text-dim sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <span>
            {SITE.macosMin} · {SITE.arch} · v{SITE.version}
          </span>
        </div>
      </div>
    </footer>
  );
}
