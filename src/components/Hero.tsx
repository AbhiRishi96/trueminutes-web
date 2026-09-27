import React from 'react';
import { DmgDownloadButton } from './DmgDownloadButton';
import { Sparkles, ShieldCheck, Cpu, Volume2, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        padding: '60px 24px 80px',
        maxWidth: '1240px',
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Category Pill Tag */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '9999px',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          color: '#a5b4fc',
          fontSize: '0.82rem',
          fontWeight: 600,
          marginBottom: '28px',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Sparkles size={14} style={{ color: '#818cf8' }} />
        <span>TrueMinutes for macOS — Apple Silicon Native</span>
      </div>

      {/* Main Headline */}
      <h1
        style={{
          fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
          fontWeight: 800,
          lineHeight: 1.12,
          letterSpacing: '-0.035em',
          maxWidth: '920px',
          margin: '0 auto 24px',
          color: 'var(--text-bright)',
        }}
      >
        Meeting intelligence <br />
        <span className="gradient-text-emerald">without the awkward bot.</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
          lineHeight: 1.6,
          maxWidth: '740px',
          margin: '0 auto 40px',
          color: 'var(--text-muted)',
          fontWeight: 400,
        }}
      >
        Flawless meeting notes, real-time transcription, and prioritized action items across 
        <strong style={{ color: 'var(--text-main)', fontWeight: 600 }}> Google Meet, Zoom, Teams, Slack Huddles, and Webex</strong>. 
        Zero participant bots in your call. 100% private on your Mac.
      </p>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '50px',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
          <DmgDownloadButton variant="primary" showDetails={true} />
          <a
            href="#experience"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 24px',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-subtle)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'var(--border-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            <span>Try Interactive Demo</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Trust Micro-Pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
          padding: '14px 24px',
          borderRadius: '9999px',
          background: 'rgba(17, 19, 23, 0.5)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.84rem',
          color: 'var(--text-dim)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={16} style={{ color: 'var(--accent-emerald)' }} />
          <span>No uninvited AI bots</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={16} style={{ color: 'var(--accent-cyan)' }} />
          <span>Local Apple Silicon capture</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Volume2 size={16} style={{ color: '#a855f7' }} />
          <span>Auto-syncs with mute button</span>
        </div>
      </div>
    </section>
  );
};
