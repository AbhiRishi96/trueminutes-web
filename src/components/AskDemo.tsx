"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { MOCK_SUMMARY } from "@/lib/mock-data";

const PROMPTS = [
  {
    label: "Find the owners",
    q: "Who owns the Friday launch checklist?",
    a: "Alex will finalize the onboarding empty states. Jordan will review the pipeline deck, and Sam will confirm the partner agenda.",
    file: "owners",
    cites: ["04:12", "11:40", "28:05"],
  },
  {
    label: "Recall a decision",
    q: "What did we decide about pricing?",
    a: "The team moved the pricing experiment to the next sprint. The pipeline review takes priority for this launch.",
    file: "decision",
    cites: ["11:40"],
  },
  {
    label: "Prepare a follow-up",
    q: "What is Sam following up on?",
    a: "Sam will send the partner briefing agenda tonight, including the three open questions.",
    file: "follow-up",
    cites: ["28:05"],
  },
];

export function AskDemo({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(0);
  const [source, setSource] = useState<string | null>(null);
  const [exported, setExported] = useState(false);
  const item = PROMPTS[active];
  return (
    <div className={`ask-demo ${className}`}>
      <div className="ask-demo-prompts">
        <p className="eyebrow">TRY A SAMPLE QUESTION</p>
        {PROMPTS.map((p, i) => (
          <button
            key={p.q}
            aria-pressed={i === active}
            onClick={() => {
              setActive(i);
              setSource(null);
              setExported(false);
            }}
          >
            <span>
              <small>{p.label}</small>
              {p.q}
            </span>
            <ArrowUpRight size={17} />
          </button>
        ))}
        <p className="demo-disclaimer">
          Prewritten examples with fictional data. No live AI or microphone
          access.
        </p>
      </div>
      <div className="ask-demo-answer">
        <div className="ask-demo-header">
          <span>
            <MessageSquare size={16} /> Ask TrueMinutes
          </span>
          <span className="preview-badge">Example</span>
        </div>
        <div className="ask-demo-conversation" aria-live="polite">
          <p className="ask-question">{item.q}</p>
          <span className="ask-avatar">
            <Sparkles size={18} />
          </span>
          <p className="ask-answer">{item.a}</p>
          <p className="ask-source-label">
            SOURCE · PRODUCT SYNC — DESIGN REVIEW
          </p>
          <div className="ask-citations">
            {item.cites.map((c) => (
              <button
                className="citation"
                key={c}
                aria-pressed={source === c}
                aria-label={`Show example transcript at ${c}`}
                onClick={() => setSource(source === c ? null : c)}
              >
                {c}
                <ArrowUpRight size={11} />
              </button>
            ))}
          </div>
          {source && (
            <blockquote className="ask-transcript">
              <strong>
                {MOCK_SUMMARY.transcript.find((t) => t.t === source)?.speaker} ·{" "}
                {source}
              </strong>
              <p>
                “{MOCK_SUMMARY.transcript.find((t) => t.t === source)?.text}”
              </p>
            </blockquote>
          )}
        </div>
        <div className="ask-demo-bottom">
          <span>Check the source. Keep the context.</span>
          <a
            href={`/examples/${item.file}.md`}
            download={`trueminutes-example-${item.file}.md`}
            onClick={() => setExported(true)}
          >
            {exported ? <Check size={14} /> : <ArrowDownToLine size={14} />}{" "}
            {exported ? "Download requested" : "Export example"}
          </a>
        </div>
      </div>
    </div>
  );
}
