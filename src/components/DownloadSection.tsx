import React, { useState } from 'react';
import { DmgDownloadButton } from './DmgDownloadButton';
import { Apple, Monitor, CheckCircle } from 'lucide-react';

export const DownloadSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section
      id="download"
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
          Download <span className="gradient-text-emerald">TrueMinutes</span>
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          Start taking bot-free meeting notes in under 60 seconds.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {/* macOS Card */}
        <div
          className="glass-card"
          style={{
            padding: '40px',
            border: '1px solid var(--border-emerald)',
            background: 'linear-gradient(180deg, rgba(24, 26, 32, 0.9) 0%, rgba(13, 24, 20, 0.9) 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 0 40px rgba(16, 185, 129, 0.1)',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <Apple size={30} style={{ color: '#ffffff' }} />
          </div>

          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '9999px',
              background: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--accent-emerald)',
              marginBottom: '12px',
              border: '1px solid var(--border-emerald)',
            }}
          >
            LATEST RELEASE
          </span>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>
            TrueMinutes for macOS
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
            Native Apple Silicon build (M1, M2, M3, M4)<br />Requires macOS 14.4 (Sonoma) or newer
          </p>

          <DmgDownloadButton variant="primary" showDetails={false} />

          {/* Quick Steps */}
          <div
            style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border-subtle)',
              width: '100%',
              fontSize: '0.82rem',
              color: 'var(--text-dim)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={14} style={{ color: 'var(--accent-emerald)' }} />
              <span>1. Download the universal <code>.dmg</code></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={14} style={{ color: 'var(--accent-emerald)' }} />
              <span>2. Drag TrueMinutes into Applications</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={14} style={{ color: 'var(--accent-emerald)' }} />
              <span>3. Open and join any call</span>
            </div>
          </div>
        </div>

        {/* Windows Waitlist Card */}
        <div
          className="glass-card"
          style={{
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <Monitor size={30} style={{ color: 'var(--text-muted)' }} />
          </div>

          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'var(--text-dim)',
              marginBottom: '12px',
            }}
          >
            COMING SOON
          </span>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>
            Windows & Linux
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
            Cross-platform desktop engine is in active beta testing. Sign up for early access.
          </p>

          {!subscribed ? (
            <form onSubmit={handleWaitlist} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="email"
                required
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
              >
                Join Windows Waitlist
              </button>
            </form>
          ) : (
            <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', fontSize: '0.9rem' }}>
              ✓ You're on the list! We'll notify you as soon as the Windows installer drops.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
