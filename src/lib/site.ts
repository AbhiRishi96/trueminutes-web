export const SITE = {
  name: "TrueMinutes",
  tagline: "Meeting intelligence without the awkward bot.",
  description:
    "Bot-free meeting transcription and notes for macOS. Captures Google Meet, Zoom, Teams, Webex, and Slack Huddles on your Mac — never joins as a participant.",
  url: "https://trueminutes.app",
  version: "0.8.1",
  macosMin: "macOS 14.4+",
  arch: "Apple Silicon (M1–M4)",
  github: "https://github.com/AbhiRishi96/TrueMinutes",
  releases: "https://github.com/AbhiRishi96/TrueMinutes-releases/releases/latest",
  dmg: "https://github.com/AbhiRishi96/TrueMinutes-releases/releases/download/v0.8.1/TrueMinutes-0.8.1.dmg",
  platforms: [
    "Google Meet",
    "Zoom Workplace",
    "Microsoft Teams",
    "Cisco Webex",
    "Slack Huddles",
  ] as const,
} as const;

export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/privacy", label: "Privacy" },
  { href: "/docs", label: "Docs" },
  { href: "/faq", label: "FAQ" },
  { href: "/download", label: "Download" },
] as const;
