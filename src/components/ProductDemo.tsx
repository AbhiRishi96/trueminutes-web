"use client";

import { useState, useId, useRef } from "react";
import {
  FileText,
  MessageSquare,
  CalendarDays,
  ShieldCheck,
  Search,
} from "lucide-react";
import { ProductPreview, type PreviewView } from "@/components/ProductPreview";

const TABS: {
  id: PreviewView;
  label: string;
  icon: typeof FileText;
  description: string;
}[] = [
  {
    id: "summary",
    label: "Meeting notes",
    icon: FileText,
    description:
      "The decisions, owners, and next steps. Without rebuilding the conversation from memory.",
  },
  {
    id: "meetings",
    label: "Your library",
    icon: Search,
    description:
      "Search the fictional library and open a meeting to explore its notes.",
  },
  {
    id: "ask",
    label: "Ask TrueMinutes",
    icon: MessageSquare,
    description:
      "Find answers in past conversations, with sources you can return to.",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: CalendarDays,
    description:
      "See what’s next. Calendar prompts help you prepare; you choose when to record.",
  },
  {
    id: "settings",
    label: "Privacy",
    icon: ShieldCheck,
    description:
      "On-device processing by default. Cloud AI and encrypted Drive sync are your choice.",
  },
];

export function ProductDemo({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = TABS[active];
  return (
    <div className={className}>
      <h2 className="sr-only">Explore TrueMinutes</h2>
      <div
        className="demo-tabs"
        role="tablist"
        aria-label="Explore TrueMinutes"
        onKeyDown={(e) => {
          let next = active;
          if (e.key === "ArrowRight") next = (active + 1) % TABS.length;
          else if (e.key === "ArrowLeft")
            next = (active + TABS.length - 1) % TABS.length;
          else if (e.key === "Home") next = 0;
          else if (e.key === "End") next = TABS.length - 1;
          else return;
          e.preventDefault();
          setActive(next);
          refs.current[next]?.focus();
        }}
      >
        {TABS.map((t, i) => (
          <button
            ref={(el) => {
              refs.current[i] = el;
            }}
            key={t.id}
            id={`${id}-tab-${i}`}
            type="button"
            role="tab"
            tabIndex={active === i ? 0 : -1}
            aria-selected={active === i}
            aria-controls={`${id}-panel`}
            onClick={() => setActive(i)}
          >
            <t.icon size={16} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>
      <div
        className="product-frame demo-frame"
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
      >
        <div className="demo-titlebar">
          <div className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span>TrueMinutes — {tab.label}</span>
          <span className="demo-example-label">Interactive example</span>
        </div>
        <ProductPreview key={tab.id} view={tab.id} interactive />
      </div>
      <div className="demo-caption">
        <p>{tab.description}</p>
        <span>Illustrative preview · Fictional data</span>
      </div>
    </div>
  );
}
