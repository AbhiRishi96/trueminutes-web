import React from 'react';
import { Layers, Mic, Search, Share2, Zap, RefreshCw } from 'lucide-react';

export const FeaturesBento: React.FC = () => {
  return (
    <section
      id="features"
      style={{
        padding: '80px 24px',
        maxWidth: '1240px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            marginBottom: '16px',
          }}
        >
          Engineered for <span className="gradient-text-cyan">Absolute Reliability</span>
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto' }}>
          Every feature is built around privacy, speed, and zero friction in your daily meetings.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Card 1: 5 Major Providers */}
        <div
          className="glass-card"
          style={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(99, 102, 241, 0.12)',
                color: '#818cf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <Layers size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
              Universal Provider Compatibility
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Works across browser tabs and native desktop apps. Instant verified join recognition for:
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '24px',
            }}
          >
            {['Google Meet', 'Zoom Workplace', 'Microsoft Teams', 'Slack Huddles', 'Cisco Webex'].map((app) => (
              <span
                key={app}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'var(--text-main)',
                }}
              >
                {app}
              </span>
            ))}
          </div>
        </div>

        {/* Card 2: Local Hardware Mute Sync */}
        <div
          className="glass-card"
          style={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.12)',
                color: 'var(--accent-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <Mic size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
              Mute State Synchronization
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Never worry about your microphone being captured when you think you're muted. TrueMinutes tracks your in-app mute status and automatically pauses local microphone recording.
            </p>
          </div>

          <div
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid var(--border-emerald)',
              fontSize: '0.82rem',
              color: 'var(--accent-emerald)',
              fontWeight: 500,
              marginTop: '24px',
            }}
          >
            ✓ Respects your privacy in real time
          </div>
        </div>

        {/* Card 3: Instant Global Search */}
        <div
          className="glass-card"
          style={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(56, 189, 248, 0.12)',
                color: 'var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <Search size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
              Instant Meeting Search
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Can't remember what was decided last Tuesday? Type any keyword or person's name to search through all transcripts, summaries, and action notes in milliseconds.
            </p>
          </div>

          <div
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-dim)',
              marginTop: '24px',
            }}
          >
            ⌘F: "pipeline targets Q3" &rarr; 4 matches
          </div>
        </div>

        {/* Card 4: One-Click Export */}
        <div
          className="glass-card"
          style={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.12)',
                color: 'var(--accent-amber)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <Share2 size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
              Export Anywhere
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Copy clean Markdown or formatted notes straight to Notion, Apple Notes, Obsidian, Linear, or Slack without ugly boilerplate or extra formatting.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              fontSize: '0.82rem',
              color: 'var(--text-dim)',
              marginTop: '24px',
            }}
          >
            <span>Markdown</span> • <span>Notion</span> • <span>Clipboard</span>
          </div>
        </div>

        {/* Card 5: Auto Route Recovery */}
        <div
          className="glass-card"
          style={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(168, 85, 247, 0.12)',
                color: '#c084fc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <RefreshCw size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
              AirPods & Device Hot-Swapping
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Switching from MacBook speakers to AirPods mid-call? TrueMinutes automatically heals the audio route instantly without dropping a single frame of speech.
            </p>
          </div>

          <div style={{ fontSize: '0.82rem', color: '#c084fc', fontWeight: 500, marginTop: '24px' }}>
            Seamless CoreAudio route recovery
          </div>
        </div>

        {/* Card 6: Apple Silicon Battery Optimized */}
        <div
          className="glass-card"
          style={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(239, 68, 68, 0.12)',
                color: '#f87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <Zap size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
              Negligible CPU & Battery Impact
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Leveraging Apple's native ScreenCaptureKit APIs and M-series Neural Engine accelerators, TrueMinutes uses almost zero noticeable energy on your laptop.
            </p>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginTop: '24px' }}>
            Built specifically for macOS 14.4+
          </div>
        </div>
      </div>
    </section>
  );
};
