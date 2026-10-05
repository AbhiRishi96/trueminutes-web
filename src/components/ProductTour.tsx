"use client";

import { useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { AskDemo } from "@/components/AskDemo";
import { DownloadButton } from "@/components/DownloadButton";
import { GoogleSyncDemo } from "@/components/GoogleSyncDemo";
import { MeetingChromeDemo } from "@/components/MeetingChromeDemo";
import { ProductPreview, type PreviewView } from "@/components/ProductPreview";
import { FEATURE_CATALOG } from "@/lib/mock-data";

const DEMOS: Record<
  (typeof FEATURE_CATALOG)[number]["id"],
  { preview?: PreviewView; overlay?: boolean; ask?: boolean; sync?: boolean }
> = {
  detect: { overlay: true },
  capture: { overlay: true },
  library: { preview: "meetings" },
  detail: { preview: "summary" },
  ask: { ask: true },
  "notes-cal": { preview: "calendar" },
  sync: { sync: true },
  export: { preview: "summary" },
  ai: { preview: "settings" },
  privacy: { preview: "settings" },
};

export function ProductTour() {
  const [step, setStep] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = FEATURE_CATALOG[step];
  const demo = DEMOS[current.id];
  const last = step === FEATURE_CATALOG.length - 1;

  const go = (next: number) => {
    const index = Math.max(0, Math.min(FEATURE_CATALOG.length - 1, next));
    setStep(index);
    refs.current[index]?.focus();
  };

  return (
    <div className="product-tour">
      <p className="product-tour-progress">
        Step {step + 1} of {FEATURE_CATALOG.length}
      </p>
      <div
        className="product-tour-steps"
        role="tablist"
        aria-label="Product tour chapters"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(step + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(step - 1);
          } else if (e.key === "Home") {
            e.preventDefault();
            go(0);
          } else if (e.key === "End") {
            e.preventDefault();
            go(FEATURE_CATALOG.length - 1);
          }
        }}
      >
        {FEATURE_CATALOG.map((chapter, i) => (
          <button
            key={chapter.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`${id}-step-${i}`}
            type="button"
            role="tab"
            aria-selected={i === step}
            aria-controls={`${id}-panel`}
            tabIndex={i === step ? 0 : -1}
            onClick={() => setStep(i)}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {chapter.title}
          </button>
        ))}
      </div>

      <div
        className="product-tour-panel"
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-step-${step}`}
      >
        <div className="product-tour-copy">
          <p className="eyebrow">{current.title}</p>
          <h2>See how this part of TrueMinutes works.</h2>
          <ul>
            {current.items.map((item) => (
              <li key={item.title}>
                <Check size={14} />
                <span>
                  <strong>{item.title}.</strong> {item.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="product-tour-demo">
          {demo.overlay && <MeetingChromeDemo />}
          {demo.preview && (
            <div className="product-frame">
              <ProductPreview view={demo.preview} interactive />
            </div>
          )}
          {demo.ask && <AskDemo />}
          {demo.sync && <GoogleSyncDemo />}
        </div>
      </div>

      <div className="product-tour-nav">
        <button
          type="button"
          className="product-tour-nav-btn"
          onClick={() => go(step - 1)}
          disabled={step === 0}
        >
          <ArrowLeft size={15} /> Previous
        </button>
        {last ? (
          <DownloadButton />
        ) : (
          <button
            type="button"
            className="product-tour-nav-btn is-next"
            onClick={() => go(step + 1)}
          >
            Next <ArrowRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
