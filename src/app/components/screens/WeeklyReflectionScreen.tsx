import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BP, fontUI } from '../blueprint-theme';
import { PulseBottomNav } from './PulseScreen';

// ─────────────────────────────────────────────────────────────
// Primitives
// ─────────────────────────────────────────────────────────────
function SectionLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 590, letterSpacing: '1.2px', textTransform: 'uppercase',
      color: BP.ink4, fontFamily: fontUI, ...style,
    }}>{children}</div>
  );
}

// ─────────────────────────────────────────────────────────────
// Saved state
// ─────────────────────────────────────────────────────────────
function SavedState({ onBack }: { onBack: () => void }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '60px 32px', gap: 16, textAlign: 'center',
      background: BP.paper,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        background: BP.card, border: `0.5px solid ${BP.hairline}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10L8.5 14.5L16 6" stroke={BP.sage} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ fontFamily: fontUI, fontSize: 26, fontWeight: 300, color: BP.ink, letterSpacing: '-0.4px' }}>
        Thank you for telling Blueprint.
      </div>
      <p style={{ fontFamily: fontUI, fontSize: 14.5, color: BP.ink2, lineHeight: 1.6, letterSpacing: '-0.05px', margin: 0, maxWidth: 280 }}>
        Nothing has to change today. We&rsquo;ll hold this as your directions evolve.
      </p>
      <button
        onClick={onBack}
        style={{
          marginTop: 8,
          background: BP.ink, color: BP.paper,
          border: 'none', borderRadius: 999,
          padding: '15px 32px',
          fontFamily: fontUI, fontSize: 16, fontWeight: 500, cursor: 'pointer',
        }}
      >
        Back to Pulse
      </button>
      <p style={{
        fontFamily: fontUI, fontSize: 11, color: BP.ink4,
        margin: '4px 0 0', letterSpacing: '0.6px', textTransform: 'uppercase',
      }}>
        Three to five minutes. Every week.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Reflect screen
// ─────────────────────────────────────────────────────────────
export function WeeklyReflectionScreen() {
  const navigate = useNavigate();
  const [choice, setChoice] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const options = [
    { id: 'yes',    label: 'Still mine.' },
    { id: 'mostly', label: "Mostly — though it's shifting." },
    { id: 'less',   label: 'Less than it did.' },
    { id: 'unsure', label: "I'm not sure yet." },
  ];

  if (saved) {
    return (
      <div style={{ minHeight: '100%', backgroundColor: BP.paper, display: 'flex', flexDirection: 'column' }}>
        <SavedState onBack={() => navigate('/home')} />
        <PulseBottomNav active="reflect" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100%', backgroundColor: BP.paper, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '74px 24px 24px' }}>

        <SectionLabel style={{ marginBottom: 14 }}>A small check-in</SectionLabel>
        <div style={{
          fontFamily: fontUI, fontSize: 28, fontWeight: 300, lineHeight: 1.22, color: BP.ink,
          letterSpacing: '-0.4px', marginBottom: 28,
        }}>
          When you think about <em style={{ fontStyle: 'italic' }}>your directions right now</em>, do they still feel like yours?
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {options.map(o => {
            const on = choice === o.id;
            return (
              <button
                key={o.id}
                onClick={() => setChoice(o.id)}
                style={{
                  background: on ? BP.ink : BP.card,
                  color: on ? BP.paper : BP.ink,
                  border: `0.5px solid ${on ? BP.ink : BP.hairline}`,
                  borderRadius: 16, padding: '16px 20px',
                  textAlign: 'left', cursor: 'pointer',
                  fontSize: 15, fontWeight: on ? 500 : 400,
                  letterSpacing: '-0.15px', fontFamily: fontUI,
                  transition: 'background 220ms ease, color 220ms ease',
                  boxSizing: 'border-box', width: '100%',
                }}
              >
                {o.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => navigate('/home')}
          style={{
            background: 'transparent', border: 0, cursor: 'pointer',
            fontSize: 14, color: BP.ink3, padding: '8px 0',
            display: 'block', margin: '0 auto', fontFamily: fontUI,
          }}
        >
          Skip for now
        </button>

      </div>

      <div style={{ padding: '0 24px 16px' }}>
        <button
          onClick={() => choice && setSaved(true)}
          style={{
            width: '100%', boxSizing: 'border-box',
            background: choice ? BP.ink : BP.ink5,
            color: BP.paper, border: 'none', borderRadius: 999,
            padding: '17px 24px',
            fontFamily: fontUI, fontSize: 16, fontWeight: 500,
            cursor: choice ? 'pointer' : 'default',
            transition: 'background 300ms ease',
          }}
        >
          Save reflection
        </button>
      </div>

      <PulseBottomNav active="reflect" />
    </div>
  );
}
