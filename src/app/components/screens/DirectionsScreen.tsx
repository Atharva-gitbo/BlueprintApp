import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BP, fontUI } from '../blueprint-theme';
import { PulseBottomNav } from './PulseScreen';

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────
type DirState = 'active' | 'drifting' | 'paused';

interface Direction {
  id: string;
  title: string;
  cat: string;
  presence: number; // 0-4
  state: DirState;
  pattern: string;
  intent: string;
  moments: { date: string; text: string }[];
  observation: string;
}

const DIRECTIONS: Direction[] = [
  {
    id: 'experiences',
    title: 'Collect real experiences',
    cat: 'Life',
    presence: 4,
    state: 'active',
    pattern: 'Weekends, live music, travel planning. One bigger trip a year.',
    intent: 'Fill the calendar with things worth remembering.',
    moments: [
      { date: 'Sat', text: 'Booked tickets for the concert next month.' },
      { date: 'Sun', text: 'Long walk through a neighbourhood I hadn\'t seen.' },
    ],
    observation: 'Experiences tick upward when work weeks are lighter. Worth noticing.',
  },
  {
    id: 'work',
    title: 'Creative work I own',
    cat: 'Work & Time',
    presence: 3,
    state: 'active',
    pattern: 'Mornings, four days a week, before the calendar fills.',
    intent: 'Work that feels like mine, with time protected for deep focus.',
    moments: [
      { date: 'Mon', text: '2 hours before standup. Best session in weeks.' },
      { date: 'Wed', text: 'Shipped something small but completely mine.' },
    ],
    observation: 'You create best when the first two hours are unscheduled.',
  },
  {
    id: 'identity',
    title: 'Stay genuinely curious',
    cat: 'Identity',
    presence: 3,
    state: 'active',
    pattern: 'Reading, learning something unrelated to work each week.',
    intent: 'Someone who follows through and stays genuinely curious.',
    moments: [
      { date: 'Thu', text: 'Finished a chapter outside my usual topics.' },
    ],
    observation: 'Curiosity stays high when screens go down after nine.',
  },
  {
    id: 'place',
    title: 'A walkable place near nature',
    cat: 'Place',
    presence: 1,
    state: 'drifting',
    pattern: 'Variable. The intention is there, the movement hasn\'t started.',
    intent: 'A city that\'s walkable, close to mountains or water.',
    moments: [],
    observation: 'Has been quieter than your other directions for several weeks. Blueprint is holding it lightly.',
  },
  {
    id: 'financial',
    title: 'Six months runway',
    cat: 'Financial Health',
    presence: 2,
    state: 'paused',
    pattern: 'Paused, by choice — revisiting in autumn.',
    intent: 'Enough buffer to make decisions from a place of freedom.',
    moments: [],
    observation: 'Paused on your terms. Will surface again when you ask.',
  },
];

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

function Energy({ presence }: { presence: number }) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {[0, 1, 2, 3].map(i => (
        <span key={i} style={{
          width: 5, height: 5, borderRadius: 5, display: 'inline-block',
          background: i < presence ? BP.ink2 : BP.ink5,
          opacity: i < presence ? 0.85 : 0.6,
        }} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Direction row
// ─────────────────────────────────────────────────────────────
function DirectionRow({ d, onClick, muted = false }: { d: Direction; onClick: () => void; muted?: boolean }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        background: BP.card, border: `0.5px solid ${BP.hairline}`,
        borderRadius: 18, padding: '18px 20px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
        opacity: muted ? 0.7 : 1, width: '100%', boxSizing: 'border-box',
        transform: pressed ? 'scale(0.985)' : 'scale(1)',
        transition: 'transform 0.13s ease',
        boxShadow: pressed
          ? '0 1px 4px rgba(28,28,26,0.05)'
          : '0 2px 8px rgba(28,28,26,0.05), 0 1px 0 rgba(255,255,255,0.5) inset',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-0.2px', color: BP.ink, fontFamily: fontUI }}>
          {d.title}
        </div>
        <div style={{ fontSize: 12.5, color: BP.ink3, marginTop: 4, letterSpacing: '0.15px', fontFamily: fontUI }}>
          {d.cat} · {d.pattern.split('.')[0]}
        </div>
      </div>
      {d.state !== 'paused' && <Energy presence={d.presence} />}
      {d.state === 'paused' && (
        <span style={{
          fontSize: 11, color: BP.ink4, letterSpacing: '0.4px', textTransform: 'uppercase',
          fontWeight: 500, fontFamily: fontUI,
        }}>Paused</span>
      )}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 6l6 6-6 6" stroke={BP.ink4} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Direction detail
// ─────────────────────────────────────────────────────────────
function DirectionDetail({ d, onBack }: { d: Direction; onBack: () => void }) {
  return (
    <div style={{ padding: '64px 24px 110px', background: BP.paper, minHeight: '100%' }}>
      {/* nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 0, padding: 4, cursor: 'pointer', color: BP.ink2,
          display: 'flex', alignItems: 'center', gap: 4, marginLeft: -4, fontFamily: fontUI,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke={BP.ink2} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: 15, letterSpacing: '-0.1px', fontFamily: fontUI }}>Directions</span>
        </button>
      </div>

      <SectionLabel style={{ marginBottom: 12 }}>{d.cat}</SectionLabel>
      <span style={{
        fontFamily: fontUI, fontSize: 32, fontWeight: 300,
        letterSpacing: '-0.5px', lineHeight: 1.12, color: BP.ink,
        display: 'block', maxWidth: 320,
      }}>
        {d.title}
      </span>
      <p style={{
        fontFamily: fontUI, fontSize: 15, color: BP.ink2, lineHeight: 1.6,
        margin: '18px 0 0', maxWidth: 320, letterSpacing: '-0.1px',
      }}>
        {d.intent}
      </p>

      {/* Pattern observed */}
      <div style={{ marginTop: 36 }}>
        <SectionLabel style={{ marginBottom: 12 }}>Pattern observed</SectionLabel>
        <div style={{
          background: BP.card, border: `0.5px solid ${BP.hairline}`,
          borderRadius: 20, padding: 20,
          boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset',
        }}>
          <div style={{
            fontFamily: fontUI, fontSize: 18, lineHeight: 1.4, color: BP.ink,
            letterSpacing: '-0.2px',
          }}>
            {d.pattern}
          </div>
          <div style={{
            marginTop: 14, paddingTop: 14, borderTop: `0.5px solid ${BP.hairline}`,
            fontFamily: fontUI, fontSize: 13, color: BP.ink3, lineHeight: 1.55,
            letterSpacing: '-0.05px',
          }}>
            {d.observation}
          </div>
        </div>
      </div>

      {/* Recent moments */}
      {d.moments.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <SectionLabel style={{ marginBottom: 12 }}>Recent moments</SectionLabel>
          <div style={{
            background: BP.card, border: `0.5px solid ${BP.hairline}`,
            borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset',
          }}>
            {d.moments.map((m, i) => (
              <div key={i} style={{
                padding: '14px 20px',
                borderBottom: i < d.moments.length - 1 ? `0.5px solid ${BP.hairline}` : 'none',
                display: 'flex', gap: 16, alignItems: 'baseline',
              }}>
                <span style={{
                  fontSize: 11.5, color: BP.ink4, letterSpacing: '0.4px', textTransform: 'uppercase',
                  fontWeight: 500, width: 56, flexShrink: 0, fontFamily: fontUI,
                }}>{m.date}</span>
                <span style={{ fontSize: 14.5, color: BP.ink2, lineHeight: 1.5, letterSpacing: '-0.1px', fontFamily: fontUI }}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Soft actions */}
      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SectionLabel style={{ marginBottom: 4 }}>If this is shifting</SectionLabel>
        {[
          { icon: '◦', label: 'Let this evolve', hint: 'Rename or adjust without losing the thread.' },
          { icon: '⏸', label: 'Pause this direction', hint: 'Set it aside, gently. No failure.' },
        ].map(a => (
          <button key={a.label} style={{
            background: BP.card, border: `0.5px solid ${BP.hairline}`,
            borderRadius: 16, padding: '14px 18px', cursor: 'pointer', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 14, width: '100%', boxSizing: 'border-box',
          }}>
            <span style={{
              width: 36, height: 36, borderRadius: 36, flexShrink: 0,
              background: BP.paper2, border: `0.5px solid ${BP.hairline}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: BP.ink2, fontSize: 16,
            }}>{a.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 500, color: BP.ink, letterSpacing: '-0.1px', fontFamily: fontUI }}>{a.label}</div>
              <div style={{ fontSize: 12.5, color: BP.ink3, marginTop: 2, fontFamily: fontUI }}>{a.hint}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke={BP.ink4} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Directions screen (list view)
// ─────────────────────────────────────────────────────────────
export function DirectionsScreen() {
  const [detail, setDetail] = useState<Direction | null>(null);

  const active  = DIRECTIONS.filter(d => d.state === 'active');
  const drifting = DIRECTIONS.filter(d => d.state === 'drifting');
  const paused  = DIRECTIONS.filter(d => d.state === 'paused');

  if (detail) {
    return (
      <div style={{ minHeight: '100%', backgroundColor: BP.paper, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <DirectionDetail d={detail} onBack={() => setDetail(null)} />
        </div>
        <PulseBottomNav active="directions" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100%', backgroundColor: BP.paper, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '74px 24px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <span style={{
            fontFamily: fontUI, fontSize: 28, fontWeight: 300,
            color: BP.ink, letterSpacing: '-0.5px', lineHeight: 1.12,
          }}>
            Directions
          </span>
          <button style={{
            background: 'transparent', border: 0, padding: 6, cursor: 'pointer', color: BP.ink2,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke={BP.ink2} strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <p style={{
          fontFamily: fontUI, fontSize: 14, color: BP.ink3, lineHeight: 1.55,
          margin: '0 0 28px', letterSpacing: '-0.1px',
        }}>
          The shape of what you&rsquo;re moving toward. These will change.
        </p>

        {/* Active */}
        {active.length > 0 && (
          <div style={{ marginBottom: 26 }}>
            <SectionLabel style={{ marginBottom: 10 }}>Active</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {active.map(d => <DirectionRow key={d.id} d={d} onClick={() => setDetail(d)} />)}
            </div>
          </div>
        )}

        {/* Drifting */}
        {drifting.length > 0 && (
          <div style={{ marginBottom: 26 }}>
            <SectionLabel style={{ marginBottom: 10 }}>Drifting</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {drifting.map(d => <DirectionRow key={d.id} d={d} onClick={() => setDetail(d)} />)}
            </div>
          </div>
        )}

        {/* Paused */}
        {paused.length > 0 && (
          <div style={{ marginBottom: 26 }}>
            <SectionLabel style={{ marginBottom: 10 }}>Paused</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {paused.map(d => <DirectionRow key={d.id} d={d} onClick={() => setDetail(d)} muted />)}
            </div>
          </div>
        )}

      </div>
      <PulseBottomNav active="directions" />
    </div>
  );
}
