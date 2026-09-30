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
  const text = label ?? (variant === "nav" ? "Download" : "Download for Mac");

  const base =
    "inline-flex items-center gap-2.5 font-semibold no-underline transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet";

  const styles: Record<Variant, string> = {
    primary:
      "rounded-full bg-white px-6 py-3 text-[0.95rem] text-canvas hover:bg-slate-100 active:scale-[0.98]",
    secondary:
      "rounded-full border border-border-strong bg-transparent px-6 py-3 text-[0.95rem] text-text hover:bg-white/5",
    nav: "rounded-full bg-white px-3.5 py-1.5 text-[0.8125rem] text-canvas hover:bg-slate-100",
  };

  const logoSize = variant === "nav" ? 13 : 16;

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <a href={SITE.dmg} className={`${base} ${styles[variant]}`} download>
        <AppleLogo size={logoSize} className="shrink-0" />
        <span>{text}</span>
        {variant === "primary" && <Download size={15} className="opacity-40" aria-hidden />}
      </a>
      {showMeta && (
        <p className="text-center text-xs text-dim">
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
  const cls = `inline-flex items-center gap-2 rounded-full border border-border-strong bg-transparent px-6 py-3 text-[0.95rem] font-semibold text-text no-underline transition-colors hover:bg-white/5 ${className}`;

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
