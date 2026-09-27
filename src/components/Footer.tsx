import React from 'react';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: '#07080a',
        padding: '60px 24px 40px',
        marginTop: '60px',
        color: 'var(--text-dim)',
        fontSize: '0.88rem',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '32px',
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: '360px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <img src="/brand/app-icon.png" alt="" style={{ width: '28px', height: '28px', borderRadius: '7px' }} />
              <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-bright)' }}>TrueMinutes</span>
            </div>
            <p style={{ lineHeight: 1.6, color: 'var(--text-muted)' }}>
              Bot-free, local-first meeting intelligence for macOS. Taking the awkwardness and privacy leaks out of call transcription.
            </p>
          </div>

          {/* Links Col 1: Product */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem', marginBottom: '4px' }}>Product</span>
            <a href="#experience" style={{ color: 'inherit', textDecoration: 'none' }}>Workflow Tour</a>
            <a href="#why-no-bots" style={{ color: 'inherit', textDecoration: 'none' }}>Why Bot-Free?</a>
            <a href="#features" style={{ color: 'inherit', textDecoration: 'none' }}>Features & Integrations</a>
            <a href="https://github.com/AbhiRishi96/TrueMinutes-releases/releases/latest" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-emerald)', textDecoration: 'none', fontWeight: 500 }}>
              Download for Mac (.dmg)
            </a>
          </div>

          {/* Links Col 2: Resources & Trust */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem', marginBottom: '4px' }}>Security & Source</span>
            <a href="https://github.com/AbhiRishi96/TrueMinutes" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub Repository</a>
            <a href="https://github.com/AbhiRishi96/TrueMinutes/blob/main/docs/PRD.md" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Product Specifications</a>
            <a href="https://github.com/AbhiRishi96/TrueMinutes/blob/main/PRIVACY.md" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="https://github.com/AbhiRishi96/TrueMinutes/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Security Disclosures</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.82rem',
          }}
        >
          <div>
            © {new Date().getFullYear()} TrueMinutes. Built for Apple Silicon macOS 14.4+.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shield size={14} style={{ color: 'var(--accent-emerald)' }} />
            <span>100% Client-Side Intelligence • No AI Bots In Calls</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
