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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-violet to-violet-soft shadow-[0_0_24px_rgba(124,92,252,0.35)]">
            <Image src="/brand/app-icon.png" alt="" width={32} height={32} className="object-cover" />
          </span>
          <span className="text-[0.95rem] font-bold tracking-tight text-white">{SITE.name}</span>
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald/25 bg-emerald-dim px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-emerald sm:inline-flex">
            <span className="pulse-dot" />
            Bot-free
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <DownloadButton variant="nav" />
          </div>
          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-muted hover:bg-white/5 hover:text-text md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-canvas/95 px-5 py-4 md:hidden">
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
