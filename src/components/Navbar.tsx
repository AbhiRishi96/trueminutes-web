"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { DownloadButton } from "@/components/DownloadButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background,border] duration-300 ${
        scrolled ? "glass border-b border-border" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 lg:h-16">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 no-underline">
          <Image
            src="/brand/app-icon.png"
            alt=""
            width={28}
            height={28}
            className="rounded-[7px]"
          />
          <span className="text-[0.95rem] font-semibold tracking-tight text-white">{SITE.name}</span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-[0.8125rem] font-medium text-muted transition-colors hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.releases}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-[0.8125rem] font-medium text-muted no-underline transition-colors hover:text-text sm:inline"
          >
            Releases
          </a>
          <div className="hidden sm:block">
            <DownloadButton variant="nav" />
          </div>
          <button
            type="button"
            className="inline-flex rounded-md p-2 text-muted hover:bg-white/5 hover:text-text md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-canvas/98 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-muted hover:bg-white/5 hover:text-text"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <DownloadButton variant="primary" className="w-full justify-center" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
