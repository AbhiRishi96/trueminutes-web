import Image from "next/image";
import { MacWindow } from "@/components/MacWindow";

const W = 3024;
const H = 1898;

export const APP_SHOTS = {
  home: {
    src: "/screenshots/home.png",
    alt: "TrueMinutes Home desk with capture readiness, needs-you, and week in presence",
    width: W,
    height: H,
    title: "TrueMinutes — Home",
  },
  meetingsLibrary: {
    src: "/screenshots/meetings-library.png",
    alt: "TrueMinutes meetings library with search, categories, and Ready status",
    width: W,
    height: H,
    title: "TrueMinutes — Meetings",
  },
  meetingDetail: {
    src: "/screenshots/meeting-detail.png",
    alt: "TrueMinutes meeting detail with summary, notes, and action items",
    width: W,
    height: H,
    title: "TrueMinutes — Meeting detail",
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
    alt: "Ask TrueMinutes — private Q&A over your meeting library",
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
  framed = true,
}: {
  shot?: AppShotKey;
  priority?: boolean;
  className?: string;
  framed?: boolean;
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
      sizes="(max-width: 1024px) 100vw, 1120px"
    />
  );

  if (!framed) {
    return <div className={`overflow-hidden rounded-2xl border border-border-strong shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ${className}`}>{img}</div>;
  }

  return (
    <MacWindow title={asset.title} className={className}>
      {img}
    </MacWindow>
  );
}

export function ScreenshotGallery({
  shots,
}: {
  shots: { key: AppShotKey; label: string }[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {shots.map(({ key, label }) => (
        <figure key={key} className="space-y-3">
          <AppScreenshot shot={key} framed={false} />
          <figcaption className="text-center text-sm font-medium text-muted">{label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
