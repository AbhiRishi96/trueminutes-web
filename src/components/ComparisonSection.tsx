import React from 'react';
import { XCircle, CheckCircle2, UserX, UserCheck } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  return (
    <section
      id="why-no-bots"
      style={{
        padding: '80px 24px',
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            marginBottom: '16px',
          }}
        >
          Why "Bot-Free" is the <span className="gradient-text-cyan">New Standard</span>
        </h2>
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            maxWidth: '650px',
            margin: '0 auto',
          }}
        >
          Having an uninvited AI bot enter a high-stakes call creates tension and privacy risks. 
          See how TrueMinutes changes the game.
        </p>
      </div>

      {/* Comparison Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Traditional Bots Card */}
        <div
          className="glass-card"
          style={{
            padding: '36px',
            borderColor: 'rgba(244, 63, 94, 0.2)',
            background: 'rgba(23, 14, 18, 0.6)',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--accent-rose)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '16px',
            }}
          >
            <UserX size={18} />
            <span>Legacy Meeting Bots (Otter, Fireflies, etc.)</span>
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px', color: '#fecdd3' }}>
            Awkward, Visible & Intrusion-Prone
          </h3>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem', color: '#fda4af' }}>
              <XCircle size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent-rose)' }} />
              <span><strong>Appears as a participant</strong> ("AI Notetaker Bot") — immediately alerting external clients and investors.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem', color: '#fda4af' }}>
              <XCircle size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent-rose)' }} />
              <span><strong>Requires waiting room approval</strong>, slowing down meeting start times and requiring host action.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem', color: '#fda4af' }}>
              <XCircle size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent-rose)' }} />
              <span><strong>Cloud audio uploads</strong> send confidential internal IP and strategy to third-party databases.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem', color: '#fda4af' }}>
              <XCircle size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent-rose)' }} />
              <span><strong>Ghost recordings</strong>: Can linger in the room long after you leave if someone forgets to remove it.</span>
            </li>
          </ul>
        </div>

        {/* TrueMinutes Card */}
        <div
          className="glass-card"
          style={{
            padding: '36px',
            borderColor: 'rgba(16, 185, 129, 0.4)',
            background: 'rgba(10, 24, 20, 0.65)',
            boxShadow: '0 0 35px -5px rgba(16, 185, 129, 0.15)',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--accent-emerald)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '16px',
            }}
          >
            <UserCheck size={18} />
            <span>TrueMinutes</span>
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px', color: '#a7f3d0' }}>
            Invisible, Sovereign & Native
          </h3>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem', color: '#d1fae5' }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent-emerald)' }} />
              <span><strong>Zero bot presence</strong>: TrueMinutes runs natively on your desktop. Nobody sees a recording bot.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem', color: '#d1fae5' }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent-emerald)' }} />
              <span><strong>Starts only with you</strong>: Starts transcribing when you join, with zero waiting room or admission hassles.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem', color: '#d1fae5' }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent-emerald)' }} />
              <span><strong>100% on-device audio</strong>: Raw sound files remain safely inside your Mac's protected sandbox.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem', color: '#d1fae5' }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent-emerald)' }} />
              <span><strong>Auto-stops on leave</strong>: The instant you click Leave or close your call, recording terminates immediately.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
