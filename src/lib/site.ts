import release from "../../public/release.json";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://trueminutes-website.trueminutes-google-oauth.workers.dev";
const parsedUrl = new URL(siteUrl);
if (
  parsedUrl.protocol !== "https:" ||
  parsedUrl.pathname !== "/" ||
  parsedUrl.search ||
  parsedUrl.hash ||
  parsedUrl.username ||
  parsedUrl.password
) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path or credentials.",
  );
}

export const SITE = {
  name: "TrueMinutes",
  tagline: "Be in the meeting. Keep every next step.",
  description:
    "Bot-free meeting transcription and notes for macOS. Turn conversations into summaries, decisions, action items, and searchable meeting memory on your Mac — never joins as a participant. Local-first, with optional encrypted Google Drive sync.",
  url: parsedUrl.origin,
  version: release.version,
  release,
  macosMin: "macOS 14.4+",
  arch: "Apple Silicon",
  releases:
    "https://github.com/AbhiRishi96/TrueMinutes-releases/releases/latest",
  releasesRepo: "https://github.com/AbhiRishi96/TrueMinutes-releases",
  privacyPolicy:
    "https://abhirishi96.github.io/TrueMinutes-releases/privacy.html",

  dmg: release.downloadUrl,
  platforms: [
    "Google Meet",
    "Zoom Workplace",
    "Microsoft Teams",
    "Cisco Webex",
    "Slack Huddles",
  ] as const,
} as const;

export const INSTALL =
  release.notarized === false
    ? {
        link: "Current release is not notarized. See install notes",
        title: "First launch: this release is not notarized",
        description: `Version ${release.version} ${release.signing === "internal" ? "is internally signed and " : "is "}not Apple notarized. macOS may block the first launch. Only if you trust this official download, follow the instructions in the DMG and use System Settings → Privacy & Security → Open Anyway. On a managed Mac, check with your IT team.`,
      }
    : release.notarized === true
      ? {
          link: "See requirements and install notes",
          title: "First launch",
          description: `Version ${release.version} is Apple notarized. Open the official DMG, drag TrueMinutes into Applications, and open it from there. On a managed Mac, follow your organization's installation policy.`,
        }
      : {
          link: "Review this release's install notes",
          title: "First launch: review this release's instructions",
          description: `Signing and notarization status has not been verified by this website for version ${release.version}. Review its official release notes and the instructions in the DMG. If macOS blocks the app, consult your IT team or the release maintainer before opening it.`,
        };

/** Primary chrome links — Download stays a CTA (nav button / dedicated page), not a text item. */
export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/privacy", label: "Privacy" },
  { href: "/docs", label: "Getting started" },
  { href: "/faq", label: "FAQ" },
] as const;
