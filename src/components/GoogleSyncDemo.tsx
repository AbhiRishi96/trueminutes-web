"use client";

import { useState } from "react";
import {
  Check,
  Cloud,
  LockKeyhole,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

type Step = "connect" | "calendar" | "drive" | "chats";

const STEPS: {
  id: Step;
  label: string;
  title: string;
  body: string;
}[] = [
  {
    id: "connect",
    label: "Sign in",
    title: "Connect Google account",
    body: "Optional during setup. Opens Google sign-in through a separate OAuth service — no client secret in the app.",
  },
  {
    id: "calendar",
    label: "Calendar",
    title: "Upcoming meetings",
    body: "Read-only calendar access surfaces join links and starting-soon prompts. Events never start recording alone.",
  },
  {
    id: "drive",
    label: "Drive sync",
    title: "Encrypted Drive sync",
    body: "Notes, transcripts, summaries, folders, and rules encrypt on your Mac before upload to Drive’s private app folder.",
  },
  {
    id: "chats",
    label: "Chat sync",
    title: "Ask chats travel with you",
    body: "Ask TrueMinutes conversations sync with the vault. A second Mac on the same Google account can pull the same threads — audio stays local.",
  },
];

/** Illustrative Google connect + Drive/chat sync flow with fictional data. */
export function GoogleSyncDemo({ className = "" }: { className?: string }) {
  const [step, setStep] = useState<Step>("connect");
  const [connected, setConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const active = STEPS.find((s) => s.id === step) ?? STEPS[0];

  return (
    <div className={`sync-demo ${className}`}>
      <div className="sync-demo-tabs" role="tablist" aria-label="Google connect demo">
        {STEPS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={step === s.id}
            onClick={() => setStep(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="sync-demo-panel" role="tabpanel">
        <div className="sync-demo-header">
          <span>
            <Cloud size={16} /> Google connections
          </span>
          <span className="preview-badge">Example</span>
        </div>

        {step === "connect" && (
          <div className="sync-demo-card">
            <p className="preview-eyebrow">SETUP</p>
            <h3>{active.title}</h3>
            <p className="preview-meta">{active.body}</p>
            <button
              type="button"
              className="sync-demo-cta"
              onClick={() => {
                setConnected(true);
                setStep("calendar");
              }}
            >
              {connected ? (
                <>
                  <Check size={15} /> Connected
                </>
              ) : (
                "Connect Google account"
              )}
            </button>
            <button
              type="button"
              className="sync-demo-skip"
              onClick={() => setStep("calendar")}
            >
              Skip for now
            </button>
          </div>
        )}

        {step === "calendar" && (
          <div className="sync-demo-card">
            <p className="preview-eyebrow">CALENDAR</p>
            <h3>{active.title}</h3>
            <p className="preview-meta">{active.body}</p>
            <ul className="sync-demo-list">
              {[
                ["Weekly product sync", "Today · 10:00 · Meet"],
                ["1:1 with Jordan", "Today · 15:30 · Zoom"],
              ].map(([title, meta]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <small>{meta}</small>
                </li>
              ))}
            </ul>
            <p className="sync-demo-note">
              <LockKeyhole size={13} /> Calendar credentials stay in Keychain
            </p>
          </div>
        )}

        {step === "drive" && (
          <div className="sync-demo-card">
            <p className="preview-eyebrow">CLOUD SYNC</p>
            <h3>{active.title}</h3>
            <p className="preview-meta">{active.body}</p>
            <div className="sync-demo-status">
              <span>
                <LockKeyhole size={14} /> Encrypted before upload
              </span>
              <span className="preview-status">
                {synced ? "Synced" : connected ? "Ready" : "Optional"}
              </span>
            </div>
            <button
              type="button"
              className="sync-demo-cta"
              disabled={syncing}
              onClick={() => {
                setConnected(true);
                setSyncing(true);
                window.setTimeout(() => {
                  setSyncing(false);
                  setSynced(true);
                  setStep("chats");
                }, 900);
              }}
            >
              <RefreshCw size={15} className={syncing ? "is-spinning" : ""} />
              {syncing ? "Syncing…" : synced ? "Sync again" : "Sync Now"}
            </button>
            <p className="sync-demo-note">Meeting audio is excluded from sync</p>
          </div>
        )}

        {step === "chats" && (
          <div className="sync-demo-card">
            <p className="preview-eyebrow">ASK MEMORY</p>
            <h3>{active.title}</h3>
            <p className="preview-meta">{active.body}</p>
            <ul className="sync-demo-list">
              {[
                ["Launch owners this week", "Alex owns empty states…"],
                ["Compare Q3 goals", "Pipeline vs launch checklist…"],
              ].map(([title, preview]) => (
                <li key={title}>
                  <MessageSquare size={15} />
                  <span>
                    <strong>{title}</strong>
                    <small>{preview}</small>
                  </span>
                </li>
              ))}
            </ul>
            <p className="sync-demo-note">
              <Check size={13} /> Same Google account · vault on each Mac
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
