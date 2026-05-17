import React from 'react';
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
// Insight data
// ─────────────────────────────────────────────────────────────
type InsightKind = 'pattern' | 'tension' | 'drift' | 'milestone';

interface Insight {
  id: string;
  kind: InsightKind;
  when: string;
  title: string;
  body: string;
}

const INSIGHTS: Insight[] = [
  {
    id: 'i1',
    kind: 'pattern',
    when: 'This week',
    title: 'Work & Time has been louder than the rest.',
    body: 'Three mornings in a row before nine. The pattern is steadier when meetings start after ten.',
  },
  {
    id: 'i2',
    kind: 'tension',
    when: 'Recurring',
    title: 'Financial Health and Experiences tend to move in opposite directions.',
    body: 'When savings-focused weeks intensify, the experiences direction quiets. Not a verdict — a tendency to notice.',
  },
  {
    id: 'i3',
    kind: 'drift',
    when: 'Three weeks',
    title: 'Place has gone quieter.',
    body: 'Blueprint is holding this lightly — it may want to evolve into something smaller or different.',
  },
  {
    id: 'i4',
    kind: 'milestone',
    when: 'Yesterday',
    title: 'You returned to an intention you set down two months ago.',
    body: 'Identity work surfaced again. These returns rarely happen by accident — worth noticing.',
  },
];

const KIND_COLOR: Record<InsightKind, string> = {
  pattern:   BP.accent,
  tension:   BP.clay,
  drift:     BP.ink3,
  milestone: BP.sage,
};

const KIND_LABEL: Record<InsightKind, string> = {
  pattern:   'Pattern',
  tension:   'Recurring tension',
  drift:     'Quieting',
  milestone: 'Returning',
};

// ─────────────────────────────────────────────────────────────
// Insight card
// ─────────────────────────────────────────────────────────────
function InsightCard({ insight }: { insight: Insight }) {
  const color = KIND_COLOR[insight.kind];
  return (
    <div style={{
      background: BP.card, border: `0.5px solid ${BP.hairline}`,
      borderRadius: 20, padding: 22,
      boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 2px rgba(60,50,30,0.03)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 11, letterSpacing: '0.4px', textTransform: 'uppercase', fontWeight: 590,
          color, fontFamily: fontUI,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 6, background: color, opacity: 0.85, display: 'inline-block' }} />
          {KIND_LABEL[insight.kind]}
        </span>
        <span style={{ fontSize: 11, color: BP.ink4, letterSpacing: '0.2px', fontFamily: fontUI }}>{insight.when}</span>
      </div>
      <div style={{
        fontFamily: fontUI, fontSize: 19, fontWeight: 300, lineHeight: 1.32, color: BP.ink,
        letterSpacing: '-0.2px',
      }}>
        {insight.title}
      </div>
      <p style={{
        fontFamily: fontUI, fontSize: 13.5, color: BP.ink3, lineHeight: 1.55,
        letterSpacing: '-0.05px', margin: '12px 0 0',
      }}>
        {insight.body}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Insights screen
// ─────────────────────────────────────────────────────────────
export function InsightsScreen() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100%', backgroundColor: BP.paper, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '74px 24px 32px' }}>

        {/* Header */}
        <div style={{ marginBottom: 8 }}>
          <span style={{
            fontFamily: fontUI, fontSize: 28, fontWeight: 300,
            color: BP.ink, letterSpacing: '-0.5px', lineHeight: 1.12,
          }}>
            Insights
          </span>
        </div>
        <p style={{
          fontFamily: fontUI, fontSize: 14, color: BP.ink3, lineHeight: 1.55,
          margin: '0 0 28px', letterSpacing: '-0.1px',
        }}>
          Quiet observations. Saved for whenever you&rsquo;d like to read them.
        </p>

        {/* Featured: Year in Alignment */}
        <button
          onClick={() => navigate('/year')}
          style={{
            width: '100%', textAlign: 'left', cursor: 'pointer',
            padding: '26px 24px 24px',
            background: BP.ink, color: '#F4EFE6',
            border: 0, borderRadius: 22, marginBottom: 22,
            boxShadow: '0 16px 50px rgba(26,22,18,0.18)',
            boxSizing: 'border-box',
          }}
        >
          <div style={{
            fontSize: 11, fontWeight: 590, letterSpacing: '1.2px', textTransform: 'uppercase',
            color: 'rgba(244,239,230,0.55)', marginBottom: 12, fontFamily: fontUI,
          }}>
            A larger view
          </div>
          <div style={{
            fontFamily: fontUI, fontSize: 26, fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.4px',
          }}>
            Your year, in alignment.
          </div>
          <div style={{
            fontFamily: fontUI, fontSize: 13.5, color: 'rgba(244,239,230,0.65)',
            marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '-0.05px',
          }}>
            Open the longer reflection
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="rgba(244,239,230,0.65)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        {/* Insight cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {INSIGHTS.map(i => <InsightCard key={i.id} insight={i} />)}
        </div>

      </div>
      <PulseBottomNav active="insights" />
    </div>
  );
}
