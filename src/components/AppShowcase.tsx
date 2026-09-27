import React from 'react';
import { FileText, Shield, Play } from 'lucide-react';

export const AppShowcase: React.FC = () => {
  return (
    <section
      style={{
        padding: '20px 24px 100px',
        maxWidth: '1240px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Container with Window Border Glow */}
      <div
        style={{
          position: 'relative',
          borderRadius: '20px',
          padding: '1px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.02) 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(99, 102, 241, 0.15)',
        }}
      >
        <div
          style={{
            background: 'var(--bg-surface)',
            borderRadius: '19px',
            overflow: 'hidden',
          }}
        >
          {/* macOS Window Topbar */}
          <div
            style={{
              height: '42px',
              background: '#14161a',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px',
            }}
          >
            {/* macOS Traffic Lights */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
            </div>

            {/* Window Title */}
            <div
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--text-dim)',
                letterSpacing: '-0.01em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <img src="/brand/app-icon.png" alt="" style={{ width: '14px', height: '14px', borderRadius: '3px' }} />
              <span>TrueMinutes — Meetings Library</span>
            </div>

            <div style={{ width: '60px' }}></div>
          </div>

          {/* Screenshot Display */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src="/screenshots/meetings-library.png"
              alt="TrueMinutes Mac Application Meetings Library"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'brightness(1.02)',
              }}
            />

            {/* Subtle Gradient Fog at bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '80px',
                background: 'linear-gradient(to top, var(--bg-surface) 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Feature Callout Cards below the mockup */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '32px',
        }}
      >
        <div
          className="glass-card"
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                padding: '8px',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--accent-emerald)',
              }}
            >
              <FileText size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Structured Executive Notes</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Automated synthesized meeting summaries, decisions, key takeaways, and prioritized action checklists generated instantly right after you leave the call.
          </p>
        </div>

        <div
          className="glass-card"
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                padding: '8px',
                borderRadius: '8px',
                background: 'rgba(56, 189, 248, 0.1)',
                color: 'var(--accent-cyan)',
              }}
            >
              <Play size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Timestamped Audio Playback</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Every transcript sentence links directly to the underlying high-fidelity audio point. Click any quote to listen to the exact speaker moment.
          </p>
        </div>

        <div
          className="glass-card"
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                padding: '8px',
                borderRadius: '8px',
                background: 'rgba(168, 85, 247, 0.1)',
                color: '#c084fc',
              }}
            >
              <Shield size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>7-Day Local Retention</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Your audio and transcripts remain stored safely on your machine. Automatically pruned after 7 days, giving you total sovereignty over sensitive discussions.
          </p>
        </div>
      </div>
    </section>
  );
};
