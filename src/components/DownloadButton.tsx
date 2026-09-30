import Link from "next/link";
import { Download } from "lucide-react";
import { AppleLogo } from "@/components/icons/AppleLogo";
import { SITE } from "@/lib/site";

type Variant = "primary" | "secondary" | "nav";

export function DownloadButton({
  variant = "primary",
  showMeta = false,
  className = "",
  label,
}: {
  variant?: Variant;
  showMeta?: boolean;
  className?: string;
  label?: string;
}) {
  const text = label ?? (variant === "nav" ? "Download for Mac" : "Download for Mac");

  const base =
    "inline-flex items-center gap-2.5 font-semibold no-underline transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet";

  const styles: Record<Variant, string> = {
    primary:
      "rounded-xl bg-white px-6 py-3.5 text-base text-canvas shadow-[0_12px_40px_-12px_rgba(99,102,241,0.55)] hover:-translate-y-0.5 hover:bg-slate-100",
    secondary:
      "rounded-xl border border-border-strong bg-white/5 px-6 py-3.5 text-base text-text hover:bg-white/10",
    nav: "rounded-full bg-white px-4 py-2 text-sm text-canvas hover:bg-slate-100",
  };

  const logoSize = variant === "nav" ? 14 : 18;

  return (
    <div className={`inline-flex flex-col items-start gap-2 ${className}`}>
      <a href={SITE.dmg} className={`${base} ${styles[variant]}`} download>
        <AppleLogo size={logoSize} className="shrink-0" />
        <span>{text}</span>
        {variant !== "nav" && <Download size={16} className="opacity-50" aria-hidden />}
      </a>
      {showMeta && (
        <p className="text-xs text-dim">
          v{SITE.version} · {SITE.arch} · {SITE.macosMin}
        </p>
      )}
    </div>
  );
}

export function SecondaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const isExternal = href.startsWith("http");
  const cls = `inline-flex items-center gap-2 rounded-xl border border-border-strong bg-white/5 px-6 py-3.5 text-base font-semibold text-text no-underline transition-colors hover:bg-white/10 ${className}`;

  if (isExternal) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
