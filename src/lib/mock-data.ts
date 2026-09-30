export const MOCK_MEETINGS = [
  {
    id: "m1",
    title: "Product sync — design review",
    when: "Today · 10:32",
    platform: "Google Meet",
    status: "ready" as const,
    tag: "Team",
    duration: "42 min",
  },
  {
    id: "m2",
    title: "Q3 pipeline planning",
    when: "Today · 09:15",
    platform: "Zoom",
    status: "ready" as const,
    tag: "Review",
    duration: "58 min",
  },
  {
    id: "m3",
    title: "Daily standup",
    when: "Yesterday · 09:00",
    platform: "Teams",
    status: "ready" as const,
    tag: "Standup",
    duration: "14 min",
  },
  {
    id: "m4",
    title: "Customer discovery — Northwind",
    when: "Yesterday · 16:40",
    platform: "Zoom",
    status: "summarizing" as const,
    tag: "Customer",
    duration: "36 min",
  },
  {
    id: "m5",
    title: "Launch checklist huddle",
    when: "Mon · 14:20",
    platform: "Slack",
    status: "ready" as const,
    tag: "1:1",
    duration: "22 min",
  },
  {
    id: "m6",
    title: "Partner briefing",
    when: "Mon · 11:05",
    platform: "Webex",
    status: "recovery" as const,
    tag: "Customer",
    duration: "31 min",
  },
];

export const MOCK_SUMMARY = {
  title: "Product sync — design review",
  model: "Local · Llama 3.2",
  summary:
    "Team aligned on onboarding empty states, deferred the pricing experiment to next sprint, and assigned owners for the Friday launch checklist polish.",
  decisions: [
    "Ship empty-state illustrations before Friday.",
    "Defer pricing A/B until next sprint.",
    "Keep calendar prompts enabled for product series.",
  ],
  actions: [
    { text: "Finalize onboarding empty states", owner: "Alex", cite: "04:12" },
    { text: "Review Q3 pipeline deck", owner: "Jordan", cite: "11:40" },
    { text: "Confirm partner briefing agenda", owner: "Sam", cite: "28:05" },
  ],
  transcript: [
    { t: "04:12", speaker: "Alex", text: "Let's lock the empty states before Friday so design can ship." },
    { t: "11:40", speaker: "Jordan", text: "Pricing experiment can wait — pipeline review is the blocker." },
    { t: "28:05", speaker: "Sam", text: "I'll send the partner agenda tonight with the three open questions." },
  ],
  notes: "Remember to ping legal about the recording banner for customer calls.",
};

export const MOCK_ASK = {
  threads: [
    { id: "a1", title: "Launch owners this week", preview: "Alex owns empty states…" },
    { id: "a2", title: "Compare Q3 goals", preview: "Pipeline vs launch checklist…" },
  ],
  messages: [
    {
      role: "user" as const,
      text: "Who owns the Friday launch checklist items?",
    },
    {
      role: "assistant" as const,
      text: "From Product sync — design review, Alex owns onboarding empty states, Jordan owns the Q3 pipeline deck review, and Sam owns the partner briefing agenda.",
      cites: [
        { meeting: "Product sync — design review", t: "04:12" },
        { meeting: "Product sync — design review", t: "11:40" },
      ],
    },
  ],
  suggestions: [
    "What decisions did we make yesterday?",
    "Compare goals across last two planning calls",
    "List open action items with owners",
  ],
};

export const MOCK_NOTES = [
  { id: "n1", title: "Friday launch agenda", updated: "Today · 08:10", snippet: "Checklist, owners, fallback plan…" },
  { id: "n2", title: "Customer call prep — Northwind", updated: "Yesterday", snippet: "Pain points, demo path, ask list…" },
  { id: "n3", title: "Hiring notes", updated: "Mon", snippet: "Senior design interview scorecard…" },
];

export const MOCK_CALENDAR = [
  { id: "c1", title: "Weekly product sync", when: "Today · 10:00", platform: "Google Meet", link: true },
  { id: "c2", title: "1:1 with Jordan", when: "Today · 15:30", platform: "Zoom", link: true },
  { id: "c3", title: "Design critique", when: "Thu · 11:00", platform: "Teams", link: false },
];

export const MOCK_HOME = {
  needsYou: [
    { id: "h1", label: "Partner briefing", reason: "Recovery needed", tone: "warn" as const },
    { id: "h2", label: "Customer discovery", reason: "Summarizing…", tone: "info" as const },
  ],
  readiness: [
    { label: "Microphone", ok: true },
    { label: "Accessibility", ok: true },
    { label: "Local model", ok: true },
  ],
  week: [2, 4, 3, 5, 1, 0, 3],
};

export const FEATURE_CATALOG = [
  {
    id: "detect",
    title: "Detection & series rules",
    items: [
      { title: "Bot-free detection", body: "Meet, Teams, Zoom, Webex, Slack Huddles — never joins as a participant." },
      { title: "Fail-closed join proof", body: "Only verified Leave/mic controls prove a call. URL or title alone never start capture." },
      { title: "Detection prompt", body: "Start or Skip. Live prompts hide after ~15s; still actionable from the menu bar." },
      { title: "Calendar opportunities", body: "Scheduled prompts at start−30s until Start, Skip, cancel, or verified leave." },
      { title: "Always transcribe this series", body: "Revocable automation that still waits for verified join." },
      { title: "Browser audio consent", body: "Per-session ScreenCaptureKit scope disclosure before browser capture." },
    ],
  },
  {
    id: "capture",
    title: "Capture & mute sync",
    items: [
      { title: "App-scoped audio", body: "Meeting app or selected browser — never silent whole-system broaden." },
      { title: "Mic follows mute", body: "Muted, unknown, or unsupported mute truth keeps the mic off." },
      { title: "Mic policy overrides", body: "Off or Always-on with a visible, reversible override." },
      { title: "Floating recording pill", body: "Live timer, Pause/Include mic, Stop, Open TrueMinutes." },
      { title: "Auto-stop on leave", body: "Stops on verified leave — silence alone never ends a call." },
      { title: "Route recovery", body: "Bluetooth and device swaps heal without dropping the session." },
      { title: "Saved-audio recovery", body: "If live ASR misses drain, rebuild locally with Retry." },
    ],
  },
  {
    id: "library",
    title: "Meetings library",
    items: [
      { title: "Status-aware library", body: "Ready, summarizing, recovery, failed — at a glance." },
      { title: "Full-text search", body: "Search meetings, notes, and transcripts instantly." },
      { title: "Auto-categories", body: "1:1, Team, Customer, Standup, Review, General." },
      { title: "Manual & smart folders", body: "Organize by hand or virtual rules without wiping folders." },
      { title: "Archive & delete", body: "Archive views plus hard delete of transcript, notes, and audio." },
    ],
  },
  {
    id: "detail",
    title: "Meeting notes & detail",
    items: [
      { title: "Executive summary", body: "Regenerate summaries; see which model produced them." },
      { title: "Minutes of Meeting", body: "Editable MOM section with save." },
      { title: "Decisions & action items", body: "Structured lists with transcript citation chips." },
      { title: "Your notes", body: "Freeform notes beside the generated brief." },
      { title: "Timestamped transcript", body: "Speakers, copy with timestamps, re-transcribe from saved audio." },
      { title: "Audio share & recycle", body: "Share recording or soft-delete audio to the recycle bin." },
    ],
  },
  {
    id: "ask",
    title: "Ask TrueMinutes",
    items: [
      { title: "Private library chat", body: "On-device Q&A over your captured transcripts." },
      { title: "Scoped memory", body: "Ask across all meetings, a folder, or one recording." },
      { title: "Citations", body: "Answers cite source meetings — tap to open." },
      { title: "Artifacts", body: "Tasks, decision logs, comparisons, tables from answers." },
      { title: "Export threads", body: "Markdown and PDF export of Ask conversations." },
    ],
  },
  {
    id: "notes-cal",
    title: "Notes & calendar",
    items: [
      { title: "Notes workspace", body: "Private pages for agendas and follow-ups beside meetings." },
      { title: "Calendar accounts", body: "Apple, Google, and Outlook with OAuth where needed." },
      { title: "Up next", body: "Home countdown chips and jump-to-calendar." },
      { title: "Linked transcripts", body: "See which events already have notes." },
    ],
  },
  {
    id: "export",
    title: "Export & share",
    items: [
      { title: "Clipboard", body: "Copy summary, MOM, full Markdown report, or transcript." },
      { title: "PDF export", body: "Export a clean meeting PDF." },
      { title: "Notion", body: "Create a Notion page from markdown with token + parent page." },
      { title: "Slack", body: "Webhook preview or full transcript post." },
      { title: "Menu bar quick export", body: "Copy or PDF the last transcript from the menu bar." },
    ],
  },
  {
    id: "ai",
    title: "Local AI & cloud opt-in",
    items: [
      { title: "WhisperKit ASR", body: "Download Core ML models; transcription stays on your Mac." },
      { title: "On-device summarization", body: "Managed local models for summaries and Ask." },
      { title: "Discover local GGUFs", body: "Scan HF, LM Studio, Ollama, GPT4All, llama.cpp folders." },
      { title: "Cloud summary opt-in", body: "ChatGPT, Claude, Groq, OpenRouter — Keychain keys only." },
      { title: "Cloud transcription opt-in", body: "Post-meeting quality pass; live capture stays WhisperKit." },
      { title: "Local-only mode", body: "Force on-device processing until you turn it off." },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & system",
    items: [
      { title: "Local-first default", body: "Audio, transcripts, summaries stay on Mac unless you opt in." },
      { title: "Configurable audio retention", body: "24h through indefinitely — you choose." },
      { title: "Audio recycle bin", body: "Soft-delete, restore, or empty on your schedule." },
      { title: "Menu bar always-on", body: "Status, Start/Skip, Stop, Open, Settings — shortcut ⇧⌘K." },
      { title: "Permissions clarity", body: "Accessibility, mic, ScreenCaptureKit, calendar — each with a job." },
      { title: "Anonymous telemetry opt-in", body: "Never includes audio, transcripts, titles, or participants." },
    ],
  },
] as const;
