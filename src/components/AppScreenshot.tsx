import { ProductPreview, type PreviewView } from "@/components/ProductPreview";

export type AppShotKey =
  | "home"
  | "meetingsLibrary"
  | "meetingDetail"
  | "notes"
  | "ask"
  | "calendar"
  | "settings";
const VIEWS: Record<AppShotKey, PreviewView> = {
  home: "calendar",
  meetingsLibrary: "meetings",
  meetingDetail: "summary",
  notes: "summary",
  ask: "ask",
  calendar: "calendar",
  settings: "settings",
};

/** Illustrative web preview with fictional data, not a screenshot of a user's Mac. */
export function AppScreenshot({
  shot = "meetingDetail",
  className = "",
}: {
  shot?: AppShotKey;
  priority?: boolean;
  className?: string;
  framed?: "product" | "mac" | "none";
}) {
  return (
    <figure className={className}>
      <div className="product-frame">
        <ProductPreview view={VIEWS[shot]} />
      </div>
      <figcaption className="preview-caption">
        Illustrative product preview · Fictional meeting data
      </figcaption>
    </figure>
  );
}
