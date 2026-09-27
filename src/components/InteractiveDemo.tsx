import React, { useState } from 'react';
import { Play, Mic, MicOff, CheckSquare, Clock, ArrowRight } from 'lucide-react';

export const InteractiveDemo: React.FC = () => {
  const [activeStep, setActiveStep] = useState<'prompt' | 'recording' | 'notes'>('prompt');
  const [micMuted, setMicMuted] = useState(false);

  return (
    <section
      id="experience"
      style={{
        padding: '80px 24px',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            marginBottom: '16px',
          }}
        >
          Experience the <span className="gradient-text-emerald">Seamless Workflow</span>
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          See how effortless TrueMinutes feels from the moment you join a call to final action items.
        </p>
      </div>

      {/* Step Switcher Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setActiveStep('prompt')}
          style={{
            padding: '10px 20px',
            borderRadius: '9999px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            border: activeStep === 'prompt' ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
            background: activeStep === 'prompt' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
            color: activeStep === 'prompt' ? '#34d399' : 'var(--text-muted)',
            transition: 'all 0.2s ease',
          }}
        >
          1. Meeting Detected
        </button>
        <button
          onClick={() => setActiveStep('recording')}
          style={{
            padding: '10px 20px',
            borderRadius: '9999px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            border: activeStep === 'recording' ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
            background: activeStep === 'recording' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
            color: activeStep === 'recording' ? '#34d399' : 'var(--text-muted)',
            transition: 'all 0.2s ease',
          }}
        >
          2. Live Recording Strip
        </button>
        <button
          onClick={() => setActiveStep('notes')}
          style={{
            padding: '10px 20px',
            borderRadius: '9999px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            border: activeStep === 'notes' ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
            background: activeStep === 'notes' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
            color: activeStep === 'notes' ? '#34d399' : 'var(--text-muted)',
            transition: 'all 0.2s ease',
          }}
        >
          3. Synthesized Notes & Actions
        </button>
      </div>

      {/* Simulator Frame */}
      <div
        className="glass-card"
        style={{
          padding: '36px',
          minHeight: '340px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          border: '1px solid var(--border-light)',
          background: 'rgba(17, 19, 23, 0.8)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Step 1: Meeting Detected Prompt */}
        {activeStep === 'prompt' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                color: 'var(--accent-cyan)',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              Google Meet Call Detected
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              "Weekly Product Sync with Abhishek Rai"
            </h3>

            <p style={{ color: 'var(--text-muted)', maxWidth: '520px', fontSize: '0.95rem' }}>
              TrueMinutes notices you just entered a call. It will never record without your click.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                onClick={() => setActiveStep('recording')}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  background: 'var(--accent-emerald)',
                  color: '#062817',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
                }}
              >
                <Play size={16} fill="#062817" />
                <span>Start Transcribing</span>
              </button>
              <button
                style={{
                  padding: '12px 20px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-subtle)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                Skip Call
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Live Recording Pill */}
        {activeStep === 'recording' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 24px',
                borderRadius: '9999px',
                background: '#14161a',
                border: '1px solid var(--border-light)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="pulse-dot" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em', color: 'var(--accent-emerald)' }}>
                  RECORDING
                </span>
              </div>

              <div style={{ height: '16px', width: '1px', background: 'var(--border-subtle)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                <Clock size={15} style={{ color: 'var(--text-dim)' }} />
                <span>18:42</span>
              </div>

              <div style={{ height: '16px', width: '1px', background: 'var(--border-subtle)' }} />

              <button
                onClick={() => setMicMuted(!micMuted)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: micMuted ? 'var(--accent-rose)' : 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}
              >
                {micMuted ? <MicOff size={16} /> : <Mic size={16} style={{ color: 'var(--accent-emerald)' }} />}
                <span>{micMuted ? 'Mic Muted' : 'Mic Active'}</span>
              </button>
            </div>

            <div
              style={{
                width: '100%',
                maxWidth: '650px',
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Real-Time Streaming Transcript Preview
              </p>
              <p style={{ fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--accent-cyan)' }}>Abhishek:</strong> "We should finalize the Q3 pipeline review before Thursday. Rishi, can you update the financial projections table and share the link in Slack?"
              </p>
            </div>

            <button
              onClick={() => setActiveStep('notes')}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'var(--text-bright)',
                border: '1px solid var(--border-subtle)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>Simulate Leaving Call</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 3: Notes & Action Items */}
        {activeStep === 'notes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Weekly Product Sync Summary</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>Ended at 10:32 AM • 22 mins duration • Google Meet</p>
              </div>
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: 'var(--accent-emerald)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  border: '1px solid var(--border-emerald)',
                }}
              >
                ● Ready
              </span>
            </div>

            {/* Key Action Items */}
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '16px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.85rem' }}>
                <CheckSquare size={16} />
                <span>ACTION ITEMS (SYNTHESIZED)</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-emerald)' }} />
                  <span>Update financial projections table for Q3 review (Assignee: Rishi)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
                  <input type="checkbox" style={{ accentColor: 'var(--accent-emerald)' }} />
                  <span>Share finalized pipeline link in #team-leads Slack channel (Due: Thursday)</span>
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => setActiveStep('prompt')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                ↺ Restart Interactive Tour
              </button>
              <div style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>
                Exportable directly to Markdown, Notion & Apple Notes
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
