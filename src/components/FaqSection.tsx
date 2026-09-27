import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Does TrueMinutes ever join a call as a meeting participant?",
    answer: "Never. TrueMinutes is a native macOS application that captures meeting audio directly from your designated browser or desktop meeting app using ScreenCaptureKit. It does not invite an AI bot account to your call, which means zero interruptions, zero awkward waiting room approvals, and no visible recording attendee."
  },
  {
    question: "What meeting providers are supported out of the box?",
    answer: "TrueMinutes has tested, verified compatibility with Google Meet, Zoom Workplace, Microsoft Teams, Slack Huddles, and Cisco Webex across both web browsers (Chrome, Edge, Brave, Arc, Safari) and native desktop client applications."
  },
  {
    question: "How does mute synchronization work?",
    answer: "When you click mute in Zoom, Teams, or Google Meet, TrueMinutes automatically detects your mute status and pauses microphone recording so you never accidentally capture private side conversations."
  },
  {
    question: "Where is my raw meeting audio saved and for how long?",
    answer: "All audio files are saved locally on your Mac's filesystem. By default, raw audio is retained for 7 days before being automatically purged to keep your disk usage lightweight. Your data remains under your full ownership and control."
  },
  {
    question: "Do other meeting participants know I am taking notes?",
    answer: "Because TrueMinutes operates purely client-side on your own machine without joining as a participant, there is no third-party bot visible in the participant roster. You should always abide by your local jurisdiction and company policies regarding conversation recording."
  },
  {
    question: "Can I export notes to Notion, Markdown, or Slack?",
    answer: "Yes! Every meeting document can be copied in clean Markdown format with one click or exported directly to Notion, Apple Notes, Obsidian, Linear, or your team's communication channels."
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      style={{
        padding: '80px 24px',
        maxWidth: '850px',
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
          Frequently Asked Questions
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          Everything you need to know about TrueMinutes and bot-free recording.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-card"
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                border: isOpen ? '1px solid var(--border-light)' : '1px solid var(--border-subtle)',
              }}
            >
              <button
                onClick={() => toggleFaq(idx)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-bright)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                <span>{faq.question}</span>
                {isOpen ? <ChevronUp size={20} style={{ color: 'var(--accent-emerald)' }} /> : <ChevronDown size={20} style={{ color: 'var(--text-dim)' }} />}
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0 24px 22px',
                    fontSize: '0.94rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
