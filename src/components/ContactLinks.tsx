import Image from "next/image";
import { SITE } from "@/lib/site";

const LINKS = [
  {
    href: SITE.github,
    label: "GitHub",
    external: true,
    icon: "/brand/icons/github.svg",
  },
  {
    href: SITE.linkedin,
    label: "LinkedIn",
    external: true,
    icon: "/brand/icons/linkedin.svg",
  },
  {
    href: `mailto:${SITE.email}`,
    label: "Gmail",
    external: false,
    icon: "/brand/icons/gmail.svg",
  },
] as const;

export function ContactLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`contact-links ${className}`}>
      {LINKS.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="contact-link"
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <Image
              src={link.icon}
              alt=""
              width={18}
              height={18}
              className="contact-link-icon"
              unoptimized
            />
            <span>{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
