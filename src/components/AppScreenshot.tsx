import Image from "next/image";
import { MacWindow } from "@/components/MacWindow";

const W = 3024;
const H = 1898;

export const APP_SHOTS = {
  home: {
    src: "/screenshots/home.png",
    alt: "TrueMinutes Home desk with capture readiness and upcoming meetings",
    width: W,
    height: H,
    title: "TrueMinutes — Home",
  },
  meetingsLibrary: {
    src: "/screenshots/meetings-library.png",
    alt: "TrueMinutes meetings library with search and Ready status",
    width: W,
    height: H,
    title: "TrueMinutes — Meetings",
  },
  meetingDetail: {
    src: "/screenshots/meeting-detail.png",
    alt: "TrueMinutes meeting detail with summary and action items",
    width: W,
    height: H,
    title: "TrueMinutes — Meeting",
  },
  notes: {
    src: "/screenshots/notes.png",
    alt: "TrueMinutes notes workspace",
    width: W,
    height: H,
    title: "TrueMinutes — Notes",
  },
  ask: {
    src: "/screenshots/ask.png",
    alt: "Ask TrueMinutes private Q&A over your meeting library",
    width: W,
    height: H,
    title: "TrueMinutes — Ask",
  },
  calendar: {
    src: "/screenshots/calendar.png",
    alt: "TrueMinutes calendar with upcoming meetings",
    width: W,
    height: H,
    title: "TrueMinutes — Calendar",
  },
  settings: {
    src: "/screenshots/settings.png",
    alt: "TrueMinutes settings for capture, models, and privacy",
    width: W,
    height: H,
    title: "TrueMinutes — Settings",
  },
} as const;

export type AppShotKey = keyof typeof APP_SHOTS;

export function AppScreenshot({
  shot = "meetingsLibrary",
  priority = false,
  className = "",
  framed = "product",
}: {
  shot?: AppShotKey;
  priority?: boolean;
  className?: string;
  /** product = soft marketing frame; mac = traffic-light window; none = raw */
  framed?: "product" | "mac" | "none";
}) {
  const asset = APP_SHOTS[shot];

  const img = (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      priority={priority}
      className="h-auto w-full object-cover object-top"
      sizes="(max-width: 1024px) 100vw, 1100px"
    />
  );

  if (framed === "none") {
    return <div className={className}>{img}</div>;
  }

  if (framed === "mac") {
    return (
      <MacWindow title={asset.title} className={className}>
        {img}
      </MacWindow>
    );
  }

  return <div className={`product-frame ${className}`}>{img}</div>;
}
