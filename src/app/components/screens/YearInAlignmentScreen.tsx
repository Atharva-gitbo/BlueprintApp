import React from 'react';
import { useNavigate } from 'react-router';
import { BP, fontUI } from '../blueprint-theme';

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
// Chapter
// ─────────────────────────────────────────────────────────────
function YearChapter({ n, eyebrow, title, body }: {
  n: string; eyebrow: string; title: string; body: string;
}) {
  return (
    <div style={{
      padding: '32px 24px',
      borderTop: `0.5px solid ${BP.hairline}`,
    }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
        <span style={{
          fontFamily: fontUI, fontSize: 13, color: BP.ink4,
          fontStyle: 'italic', flexShrink: 0,
        }}>{n}</span>
        <div style={{ flex: 1 }}>
          <SectionLabel style={{ marginBottom: 10 }}>{eyebrow}</SectionLabel>
          <div style={{
            fontFamily: fontUI, fontSize: 22, fontWeight: 300, lineHeight: 1.28, color: BP.ink,
            letterSpacing: '-0.3px',
          }}>{title}</div>
          <p style={{
            fontFamily: fontUI, fontSize: 14, color: BP.ink2, lineHeight: 1.65,
            letterSpacing: '-0.05px', margin: '14px 0 0',
          }}>{body}</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Year in Alignment screen
// ─────────────────────────────────────────────────────────────
export function YearInAlignmentScreen() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100%', backgroundColor: BP.paper2, paddingBottom: 60 }}>

      {/* Header */}
      <div style={{ padding: '64px 24px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SectionLabel>2025</SectionLabel>
        <button
          onClick={() => navigate('/insights')}
          style={{
            width: 34, height: 34, borderRadius: 34,
            background: BP.card, border: `0.5px solid ${BP.hairline}`,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke={BP.ink2} strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Title — editorial */}
      <div style={{ padding: '0 24px 50px' }}>
        <div style={{
          fontFamily: fontUI, fontSize: 44, lineHeight: 1.04, color: BP.ink,
          letterSpacing: '-0.8px', fontWeight: 300,
        }}>
          Your year,<br />in alignment.
        </div>
        <p style={{
          fontFamily: fontUI, fontSize: 14.5, color: BP.ink3, lineHeight: 1.6,
          letterSpacing: '-0.05px', marginTop: 22, maxWidth: 320,
        }}>
          A quiet record of who you&rsquo;ve been moving toward — and the priorities that have evolved along the way.
        </p>
      </div>

      {/* Chapters */}
      <YearChapter
        n="01"
        eyebrow="Returned to"
        title="Work you care about, before the world began."
        body="You engaged meaningfully with creative or purposeful work on more mornings than last year. Most of them quiet, focused, before the day took over."
      />
      <YearChapter
        n="02"
        eyebrow="Quietly evolved"
        title={'“Financial freedom” became something steadier.'}
        body="What started as a savings goal became a quieter kind of security. The direction you named in spring is not what you're holding now — and that may be just right."
      />
      <YearChapter
        n="03"
        eyebrow="Recurring tension"
        title="Experiences and work still trade places."
        body="In busier months, the experiences direction quieted. This pattern has appeared before. Worth holding with care, not judgment."
      />
      <YearChapter
        n="04"
        eyebrow="Set aside, without failure"
        title="Two directions you let rest this year."
        body="Place and identity work each quieted for stretches. Both were chosen, not abandoned. Both can return when they're ready."
      />

      {/* Closing reflection */}
      <div style={{ padding: '40px 24px 20px' }}>
        <div style={{
          background: BP.ink, color: '#F4EFE6',
          borderRadius: 22, padding: '28px 24px',
        }}>
          <SectionLabel style={{ color: 'rgba(244,239,230,0.55)', marginBottom: 14 }}>
            A closing thought
          </SectionLabel>
          <div style={{
            fontFamily: fontUI, fontSize: 22, fontWeight: 300, lineHeight: 1.32, letterSpacing: '-0.3px',
          }}>
            You moved more like the person you&rsquo;re becoming than the one who set this year in motion.
          </div>
        </div>
      </div>

    </div>
  );
}
