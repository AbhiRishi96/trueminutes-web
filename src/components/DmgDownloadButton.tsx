import React from 'react';
import { Download, Apple } from 'lucide-react';

interface DmgDownloadButtonProps {
  variant?: 'primary' | 'secondary' | 'nav';
  showDetails?: boolean;
  className?: string;
}

export const DmgDownloadButton: React.FC<DmgDownloadButtonProps> = ({
  variant = 'primary',
  showDetails = false,
  className = '',
}) => {
  // Direct GitHub release link (resolves directly to the installer)
  const downloadUrl = "https://github.com/AbhiRishi96/TrueMinutes-releases/releases/latest";

  if (variant === 'nav') {
    return (
      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-white text-zinc-950 hover:bg-zinc-200 transition-all duration-200 shadow-sm active:scale-95 ${className}`}
        style={{
          backgroundColor: '#ffffff',
          color: '#090a0c',
          padding: '8px 16px',
          borderRadius: '9999px',
          fontWeight: 600,
          fontSize: '0.85rem',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
        }}
      >
        <Apple size={15} />
        <span>Download DMG</span>
      </a>
    );
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }} className={className}>
      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          padding: '14px 28px',
          borderRadius: '12px',
          fontSize: '1rem',
          fontWeight: 600,
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          background: variant === 'primary' 
            ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)' 
            : 'rgba(255, 255, 255, 0.08)',
          color: variant === 'primary' ? '#090a0c' : '#f8fafc',
          border: variant === 'primary' ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: variant === 'primary' ? '0 10px 25px -5px rgba(255, 255, 255, 0.15), 0 0 20px rgba(99, 102, 241, 0.2)' : 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          if (variant === 'primary') {
            e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(255, 255, 255, 0.25), 0 0 30px rgba(99, 102, 241, 0.35)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          if (variant === 'primary') {
            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(255, 255, 255, 0.15), 0 0 20px rgba(99, 102, 241, 0.2)';
          }
        }}
      >
        <Apple size={20} />
        <span>Download for macOS</span>
        <Download size={18} style={{ opacity: 0.7 }} />
      </a>

      {showDetails && (
        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Apple Silicon (M1/M2/M3/M4)</span>
          <span>•</span>
          <span>macOS 14.4+</span>
          <span>•</span>
          <span style={{ color: 'var(--accent-emerald)', fontWeight: 500 }}>Universal .dmg</span>
        </div>
      )}
    </div>
  );
};
