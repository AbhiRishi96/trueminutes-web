import type { Metadata } from "next";
import { DownloadButton } from "@/components/DownloadButton";
import { PageHero } from "@/components/Section";
import { FEATURE_CATALOG } from "@/lib/mock-data";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Features",
  description: `Full TrueMinutes feature catalog — detection, capture, notes, Ask, calendar, export, local AI.`,
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Every surface in TrueMinutes"
        description={`From fail-closed detection to Ask TrueMinutes — the Mac app loop for ${SITE.platforms.join(", ")}.`}
      />

      <div className="mx-auto mb-10 flex max-w-6xl flex-wrap justify-center gap-2 px-5">
        {FEATURE_CATALOG.map((g) => (
          <a
            key={g.id}
            href={`#${g.id}`}
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted no-underline hover:border-violet/40 hover:text-violet-soft"
          >
            {g.title}
          </a>
        ))}
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-5 pb-20">
        {FEATURE_CATALOG.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-24">
            <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-white">{group.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-border bg-surface/90 p-5 transition hover:border-violet/35 hover:bg-surface-2"
                >
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </article>
              ))}
            </div>
          </section>
        ))}

        <div className="flex justify-center pt-4">
          <DownloadButton variant="primary" showMeta />
        </div>
      </div>
    </>
  );
}
