import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "features", "download", "docs", "privacy", "faq"].map((path) => ({
    url: `${SITE.url}/${path ? `${path}/` : ""}`,
  }));
}
