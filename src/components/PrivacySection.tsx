import React from 'react';
import { ShieldCheck, HardDrive, EyeOff, Lock } from 'lucide-react';

export const PrivacySection: React.FC = () => {
  return (
    <section
      id="privacy"
      style={{
        padding: '80px 24px',
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div
        className="glass-card"
        style={{
          padding: '48px 36px',
          borderRadius: '24px',
          border: '1px solid var(--border-light)',
          background: 'linear-gradient(135deg, rgba(17, 19, 23, 0.95) 0%, rgba(13, 24, 20, 0.95) 100%)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid var(--border-emerald)',
              color: 'var(--accent-emerald)',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '16px',
            }}
          >
            <ShieldCheck size={16} />
            <span>UNCOMPROMISING DATA PRIVACY</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '16px',
            }}
          >
            Your Private Conversations Stay on Your Mac
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Meeting intelligence shouldn't require surrendering your company's intellectual property. 
            TrueMinutes is engineered from day one around local data residency.
          </p>
        </div>

        {/* 3 Privacy Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'var(--accent-emerald)',
              }}
            >
              <HardDrive size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Local 7-Day Pruning</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Raw audio files are automatically wiped after seven days to keep your disk lean and ensure ephemeral data security.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'var(--accent-cyan)',
              }}
            >
              <EyeOff size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Zero Secret Listening</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Audio capture strictly requires a live meeting context. No background listening or ambient desktop recording ever occurs.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#a855f7',
              }}
            >
              <Lock size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Enterprise Safe</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Complies with strict corporate guidelines against third-party meeting bots and vendor data harvesting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
