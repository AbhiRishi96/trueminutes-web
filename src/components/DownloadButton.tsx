import Link from "next/link";
import { SITE } from "@/lib/site";

type Variant = "primary" | "secondary" | "nav" | "ghost";

/**
 * Text-only Mac CTA. Apple trademark guidelines forbid standalone Apple logo
 * use without a written license. Referential "for Mac" / "macOS" wording is OK.
 * @see https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html
 */
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

  const styles: Record<Variant, string> = {
    primary:
      "bg-[#0071e3] text-white hover:bg-[#0077ed] rounded-full px-6 py-3 text-[14px] shadow-none hover:-translate-y-px",
    secondary:
      "border border-[#06c] text-[#06c] hover:bg-[#06c] hover:text-white rounded-full px-6 py-3 text-[14px]",
    nav: "bg-[#0071e3] text-white hover:bg-[#0077ed] rounded-full px-4 py-2.5 text-[12px]",
    ghost: "text-muted hover:text-text text-[14px]",
  };

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <a
        href="/download"
        className={`inline-flex items-center justify-center font-medium tracking-[-0.01em] no-underline transition-[color,background-color,transform,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal/50 ${styles[variant]}`}
      >
        {text}
      </a>
      {showMeta && (
        <p className="text-[12px] leading-relaxed text-dim">
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
  const cls = `inline-flex items-center justify-center gap-1.5 rounded-full border border-[#06c] px-5 py-2.5 text-[14px] font-medium tracking-[-0.01em] text-[#06c] no-underline transition-colors duration-200 hover:bg-[#06c] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal/50 ${className}`;

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
