"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  Mic,
  MicOff,
  Square,
  X,
} from "lucide-react";

type Phase = "join" | "menu" | "recording" | "expanded";

const PHASES: { id: Phase; label: string; caption: string }[] = [
  {
    id: "join",
    label: "Join island",
    caption:
      "When a call is verified, a compact island drops in under the camera. You choose Transcribe — nothing starts on its own.",
  },
  {
    id: "menu",
    label: "Join menu",
    caption:
      "Open the chevron for Join meeting, Always transcribe this series, or Skip for this meeting.",
  },
  {
    id: "recording",
    label: "Recording pill",
    caption:
      "While capturing, a floating pill shows the timer and mic status. Stay in the call — controls stay on top.",
  },
  {
    id: "expanded",
    label: "Mic & stop",
    caption:
      "Expand for Mic on/off and Stop. Mic follows verified mute by default; you can include your voice when you want.",
  },
];

function formatTimer(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Illustrative join island + floating recording/mic pill — fictional UI, no live capture. */
export function MeetingChromeDemo({ className = "" }: { className?: string }) {
  const [phase, setPhase] = useState<Phase>("join");
  const [seconds, setSeconds] = useState(94);
  const [micOn, setMicOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = PHASES.find((p) => p.id === phase) ?? PHASES[0];

  useEffect(() => {
    if (phase !== "recording" && phase !== "expanded") return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    setMenuOpen(phase === "menu");
  }, [phase]);

  return (
    <div className={`chrome-demo ${className}`}>
      <div
        className="chrome-demo-stage"
        role="img"
        aria-label={`Example ${active.label} overlay`}
      >
        <div className="chrome-demo-desktop">
          <div className="chrome-demo-camera" aria-hidden />
          <div className="chrome-demo-meeting">
            <p>Weekly product sync</p>
            <small>Google Meet · illustrative preview</small>
          </div>

          {(phase === "join" || phase === "menu") && (
            <div
              className={`chrome-join-island ${phase === "join" || phase === "menu" ? "is-visible" : ""}`}
            >
              <button
                type="button"
                className="chrome-join-dismiss"
                aria-label="Dismiss example prompt"
                onClick={() => setPhase("join")}
              >
                <X size={12} />
              </button>
              <div className="chrome-join-body">
                <span className="chrome-join-title">Meeting detected</span>
                <div className="chrome-join-actions">
                  <button
                    type="button"
                    className="chrome-join-primary"
                    onClick={() => {
                      setPhase("recording");
                      setSeconds(0);
                    }}
                  >
                    Transcribe
                  </button>
                  <button
                    type="button"
                    className={`chrome-join-chevron ${menuOpen ? "is-open" : ""}`}
                    aria-expanded={menuOpen}
                    aria-label="More join options"
                    onClick={() => {
                      setMenuOpen((v) => !v);
                      setPhase(menuOpen ? "join" : "menu");
                    }}
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
              {menuOpen && (
                <ul className="chrome-join-menu" role="menu">
                  {[
                    "Join meeting",
                    "Always transcribe this series",
                    "Skip for this meeting",
                  ].map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          if (item.startsWith("Join") || item.startsWith("Always")) {
                            setPhase("recording");
                            setSeconds(0);
                          } else {
                            setPhase("join");
                            setMenuOpen(false);
                          }
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {(phase === "recording" || phase === "expanded") && (
            <div
              className={`chrome-rec-pill ${phase === "expanded" ? "is-expanded" : ""}`}
            >
              <button
                type="button"
                className="chrome-rec-compact"
                aria-expanded={phase === "expanded"}
                aria-label={
                  phase === "expanded"
                    ? "Collapse recording controls"
                    : "Expand recording controls"
                }
                onClick={() =>
                  setPhase(phase === "expanded" ? "recording" : "expanded")
                }
              >
                <span className="chrome-rec-dot" aria-hidden />
                <span className="chrome-rec-wave" aria-hidden>
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className="chrome-rec-timer">{formatTimer(seconds)}</span>
                <span
                  className={`chrome-rec-mic-badge ${micOn ? "is-on" : ""}`}
                  aria-hidden
                >
                  {micOn ? <Mic size={12} /> : <MicOff size={12} />}
                </span>
              </button>
              {phase === "expanded" && (
                <div className="chrome-rec-expanded">
                  <p className="chrome-rec-title">Weekly product sync</p>
                  <div className="chrome-rec-controls">
                    <button
                      type="button"
                      onClick={() => setMicOn((v) => !v)}
                      aria-pressed={micOn}
                    >
                      {micOn ? <Mic size={14} /> : <MicOff size={14} />}
                      {micOn ? "Mic on" : "Mic off"}
                    </button>
                    <button
                      type="button"
                      className="is-stop"
                      onClick={() => {
                        setPhase("join");
                        setMenuOpen(false);
                        setSeconds(94);
                      }}
                    >
                      <Square size={12} />
                      Stop
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="chrome-demo-controls">
        <div className="chrome-demo-tabs" role="tablist" aria-label="Overlay demo steps">
          {PHASES.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={phase === p.id}
              onClick={() => {
                setPhase(p.id);
                if (p.id === "recording" || p.id === "expanded") {
                  setSeconds((s) => (s < 5 ? 94 : s));
                }
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p>{active.caption}</p>
        <span>Illustrative preview · Fictional data · No microphone access</span>
      </div>
    </div>
  );
}
