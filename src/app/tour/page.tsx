import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductTour } from "@/components/ProductTour";
import { PageHero } from "@/components/Section";

export const metadata: Metadata = {
  title: "Product tour",
  description:
    "Walk through every TrueMinutes feature — join island, recording pill, Ask, Google sync, library, export, and local AI — with illustrative previews.",
  alternates: { canonical: "/tour/" },
};

export default function TourPage() {
  return (
    <>
      <PageHero
        eyebrow="PRODUCT TOUR"
        title="Every feature, in the order you would use it."
        description="Ten chapters from the first verified call to notes, Ask, optional Google connections, and local-first privacy. Fictional data only — no microphone or live AI."
      />
      <div className="mx-auto max-w-6xl px-5 pb-20">
        <ProductTour />
        <p className="section-footnote mt-12">
          Ready to try it on your Mac?{" "}
          <Link href="/download" className="text-link">
            Download TrueMinutes <ArrowRight size={13} />
          </Link>
        </p>
      </div>
    </>
  );
}
