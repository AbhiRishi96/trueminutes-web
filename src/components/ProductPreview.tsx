"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronRight,
  FileText,
  Folder,
  LockKeyhole,
  MessageSquare,
  Search,
  Settings2,
  Sparkles,
} from "lucide-react";
import {
  MOCK_CALENDAR,
  MOCK_MEETINGS,
  MOCK_SUMMARY,
  MOCK_MEETING_DETAILS,
} from "@/lib/mock-data";

export type PreviewView =
  | "summary"
  | "meetings"
  | "ask"
  | "calendar"
  | "settings";

/** Public, fictional product examples. Never render a customer's library or credentials. */
export function ProductPreview({
  view = "summary",
  interactive = false,
}: {
  view?: PreviewView;
  interactive?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState(false);
  const [selectedId, setSelectedId] = useState("m1");
  const selectedMeeting =
    MOCK_MEETINGS.find((m) => m.id === selectedId) ?? MOCK_MEETINGS[0];
  const summary = MOCK_MEETING_DETAILS[selectedId] ?? MOCK_SUMMARY;
  const [section, setSection] = useState("Summary");
  const [source, setSource] = useState<string | null>(null);
  const current = detail && view === "meetings" ? "summary" : view;
  const matches = MOCK_MEETINGS.filter((m) =>
    `${m.title} ${m.platform}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="preview-shell">
      <aside className="preview-sidebar" aria-label="Preview workspace">
        <div className="preview-brand">
          <Image src="/brand/app-icon.png" alt="" width={28} height={28} />
          <span>TrueMinutes</span>
        </div>
        <p className="preview-sidebar-label">WORKSPACE</p>
        {[
          [FileText, "Meetings", "summary"],
          [MessageSquare, "Ask TrueMinutes", "ask"],
          [CalendarDays, "Calendar", "calendar"],
        ].map(([Icon, label, id]) => {
          const Glyph = Icon as typeof FileText;
          return (
            <div
              key={String(label)}
              className={`preview-sidebar-item ${current === id || (id === "summary" && current === "meetings") ? "is-active" : ""}`}
            >
              <Glyph size={16} />
              <span>{String(label)}</span>
            </div>
          );
        })}
        <p className="preview-sidebar-label">YOUR FOLDERS</p>
        <div className="preview-sidebar-item">
          <Folder size={15} /> Product & design
        </div>
        <div className="preview-sidebar-item">
          <Folder size={15} /> Customer calls
        </div>
        <div className="preview-local">
          <LockKeyhole size={13} />
          <span>Stored on this Mac</span>
        </div>
      </aside>
      <div className="preview-main">
        <div className="preview-toolbar">
          <span>
            <FileText size={14} />{" "}
            {current === "summary"
              ? "Product & design"
              : current === "ask"
                ? "Your meeting library"
                : current === "calendar"
                  ? "Calendar"
                  : current === "settings"
                    ? "Privacy & processing"
                    : "All meetings"}
          </span>
          <span className="preview-badge">
            <span /> Local-first
          </span>
        </div>
        {current === "summary" && (
          <div className="preview-document">
            {detail && (
              <button
                className="preview-back"
                onClick={() => {
                  setDetail(false);
                  setSection("Summary");
                  setSource(null);
                }}
              >
                ← All meetings
              </button>
            )}
            <p className="preview-eyebrow">
              {selectedMeeting.title === MOCK_SUMMARY.title
                ? "TEAM MEETING"
                : "EXAMPLE MEETING"}
            </p>
            <h3>{selectedMeeting.title}</h3>
            <p className="preview-meta">
              {selectedMeeting.when} <span>·</span> {selectedMeeting.platform}{" "}
              <span>·</span> {selectedMeeting.duration}
            </p>
            <div
              className="preview-document-tabs"
              aria-label="Example meeting sections"
            >
              {["Summary", "Transcript", "Your notes"].map((label) =>
                interactive ? (
                  <button
                    key={label}
                    className={section === label ? "is-active" : ""}
                    aria-pressed={section === label}
                    onClick={() => {
                      setSection(label);
                      setSource(null);
                    }}
                  >
                    {label}
                  </button>
                ) : (
                  <span
                    key={label}
                    className={label === "Summary" ? "is-active" : ""}
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
            {section === "Summary" ? (
              <>
                <div className="preview-summary">
                  <p className="preview-section-label">
                    <Sparkles size={15} /> Executive summary
                  </p>
                  <p>{summary.summary}</p>
                </div>
                <div className="preview-outcomes">
                  <div>
                    <p className="preview-section-label">Decisions</p>
                    <ul>
                      {summary.decisions.slice(0, 2).map((d) => (
                        <li key={d}>
                          <Check size={14} />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="preview-section-label">Action items</p>
                    <ul>
                      {summary.actions.slice(0, 2).map((a) => (
                        <li key={a.owner}>
                          <span className="preview-initial">{a.owner[0]}</span>
                          <span>
                            {a.text}
                            <small>{a.owner} · Friday</small>
                          </span>
                          {interactive ? (
                            <button
                              className="citation"
                              aria-label={`Read transcript at ${a.cite}`}
                              onClick={() => setSource(a.cite)}
                            >
                              {a.cite}
                            </button>
                          ) : (
                            <span className="citation">{a.cite}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {source && (
                  <div className="preview-source" role="status">
                    <strong>Transcript · {source}</strong>
                    <p>
                      {summary.transcript.find((t) => t.t === source)?.text}
                    </p>
                  </div>
                )}
              </>
            ) : section === "Transcript" ? (
              <div className="preview-transcript">
                {summary.transcript.map((t) => (
                  <p key={t.t}>
                    <span className="citation">{t.t}</span>
                    <strong>{t.speaker}</strong>
                    <span>{t.text}</span>
                  </p>
                ))}
              </div>
            ) : (
              <div className="preview-summary">
                <p className="preview-section-label">Your notes</p>
                <p>{summary.notes}</p>
                <p className="preview-meta">
                  Example note · Your notes stay alongside the meeting.
                </p>
              </div>
            )}
          </div>
        )}
        {current === "meetings" && (
          <div className="preview-document">
            <p className="preview-eyebrow">YOUR MEETING MEMORY</p>
            <h3>All meetings</h3>
            <label className="preview-search">
              <Search size={16} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search example meetings…"
                aria-label="Search example meetings"
                readOnly={!interactive}
              />
            </label>
            <div className="preview-meetings">
              {matches.slice(0, 4).map((m) => (
                <button
                  disabled={!interactive || m.status !== "ready"}
                  key={m.id}
                  onClick={() => {
                    setSelectedId(m.id);
                    setDetail(true);
                  }}
                >
                  <span className="preview-meeting-icon">
                    <FileText size={18} />
                  </span>
                  <span>
                    <strong>{m.title}</strong>
                    <small>
                      {m.when} · {m.platform} · {m.duration}
                    </small>
                  </span>
                  <span className="preview-status">
                    {m.status === "ready" ? "Ready" : "Summarizing"}
                  </span>
                  <ChevronRight size={14} />
                </button>
              ))}
              {!matches.length && (
                <p className="preview-meta">
                  No example meetings match “{query}”. Try “design” or “Zoom”.
                </p>
              )}
            </div>
          </div>
        )}
        {current === "ask" && (
          <div className="preview-document">
            <p className="preview-eyebrow">ASK TRUEMINUTES</p>
            <h3>Your meetings. Answers included.</h3>
            <p className="preview-meta">
              Ask across your library, a folder, or one meeting.
            </p>
            <div className="preview-question">
              What did we decide about the launch?
            </div>
            <div className="preview-summary">
              <p className="preview-section-label">
                <Sparkles size={15} /> From your meeting notes
              </p>
              <p>
                The team agreed to ship the onboarding empty states before
                Friday and move the pricing experiment to the next sprint.
              </p>
              <span className="citation">Product sync — design review</span>
            </div>
            <p className="preview-meta">
              Try the sample questions in the Ask section below.
            </p>
          </div>
        )}
        {current === "calendar" && (
          <div className="preview-document">
            <p className="preview-eyebrow">PLAN YOUR DAY</p>
            <h3>A little more prepared.</h3>
            <p className="preview-meta">
              Upcoming meetings · Example Google Calendar
            </p>
            <div className="preview-calendar">
              {MOCK_CALENDAR.map((event, i) => (
                <div key={event.id}>
                  <span className="preview-calendar-time">
                    {["10:00", "15:30", "11:00"][i]}
                  </span>
                  <div>
                    <strong>{event.title}</strong>
                    <p>
                      {event.when} · {event.platform}
                    </p>
                  </div>
                  <CalendarDays size={17} />
                </div>
              ))}
            </div>
            <div className="preview-summary">
              <p className="preview-section-label">
                <LockKeyhole size={14} /> You choose when to record
              </p>
              <p>
                A calendar event can prompt you. It never starts a recording on
                its own.
              </p>
            </div>
          </div>
        )}
        {current === "settings" && (
          <div className="preview-document">
            <p className="preview-eyebrow">YOUR CHOICES</p>
            <h3>Private by default.</h3>
            <p className="preview-meta">
              Processing & storage · Example configuration
            </p>
            <div className="preview-settings">
              {[
                [
                  "Transcription",
                  "On-device",
                  "WhisperKit processes audio on your Mac.",
                ],
                [
                  "Summaries & Ask",
                  "Local model",
                  "Choose your model during guided setup.",
                ],
                [
                  "Google account",
                  "Connect",
                  "Optional Calendar and Drive sign-in via secure OAuth.",
                ],
                [
                  "Google Drive sync",
                  "Optional",
                  "Encrypt notes and Ask chats before upload. Audio is excluded.",
                ],
                [
                  "Cloud AI",
                  "Opt-in",
                  "A selected provider receives the data needed for processing.",
                ],
              ].map(([title, status, body]) => (
                <div key={title}>
                  <Settings2 size={17} />
                  <div>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </div>
                  <span className="preview-status">{status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
