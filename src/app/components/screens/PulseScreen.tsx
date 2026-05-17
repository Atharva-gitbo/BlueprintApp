import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { BP, fontUI } from '../blueprint-theme';

// ─────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────
function SectionLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 590, letterSpacing: '1.2px', textTransform: 'uppercase',
      color: BP.ink4, fontFamily: fontUI, ...style,
    }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Signal card — observational, never alarming
// ─────────────────────────────────────────────────────────────
type SignalKind = 'tension' | 'evolving' | 'sustained';
function SignalCard({ kind, tag, body }: { kind: SignalKind; tag: string; body: string }) {
  const dot: Record<SignalKind, string> = {
    tension:   BP.clay,
    evolving:  BP.accent,
    sustained: BP.sage,
  };

  return (
    <div style={{
      background: BP.card, border: `0.5px solid ${BP.hairline}`,
      borderRadius: 18, padding: '20px 20px 18px',
      boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 2px rgba(60,50,30,0.03)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ width: 6, height: 6, borderRadius: 6, background: dot[kind], opacity: 0.85, display: 'inline-block' }} />
        <span style={{
          fontSize: 11, fontWeight: 590, letterSpacing: '0.6px', textTransform: 'uppercase',
          color: BP.ink3, fontFamily: fontUI,
        }}>{tag}</span>
      </div>
      <div style={{
        fontFamily: fontUI, fontSize: 18, fontWeight: 300, lineHeight: 1.36, color: BP.ink,
        letterSpacing: '-0.2px',
      }}>
        {body}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Movement card — quiet, optional next step
// ─────────────────────────────────────────────────────────────
function MovementCard({ tag, body }: { tag: string; body: string }) {
  const [held, setHeld] = useState(false);

  return (
    <div style={{
      background: BP.card, border: `0.5px solid ${BP.hairline}`,
      borderRadius: 18, padding: '18px 20px',
      display: 'flex', alignItems: 'flex-start', gap: 16,
      opacity: held ? 0.6 : 1, transition: 'opacity 300ms ease',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 11, fontWeight: 590, letterSpacing: '0.6px', textTransform: 'uppercase',
          color: BP.ink4, marginBottom: 8, fontFamily: fontUI,
        }}>{tag}</div>
        <div style={{
          fontFamily: fontUI, fontSize: 15, lineHeight: 1.45, color: BP.ink,
          letterSpacing: '-0.2px',
        }}>
          {body}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
          <button
            onClick={() => setHeld(true)}
            style={{
              background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
              fontSize: 12.5, color: held ? BP.sage : BP.ink2, fontWeight: 500,
              letterSpacing: '-0.05px', fontFamily: fontUI,
            }}
          >
            {held ? 'Held in mind ✓' : 'Hold this in mind'}
          </button>
          <button style={{
            background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
            fontSize: 12.5, color: BP.ink4, letterSpacing: '-0.05px', fontFamily: fontUI,
          }}>
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Energy row — ambient sparkline per direction, no axes/numbers
// ─────────────────────────────────────────────────────────────
type CurveKey = 'rising' | 'dipping' | 'level' | 'wave' | 'fading';
type EnergyState = 'Energizing' | 'Heavy' | 'Steady' | 'Returning' | 'Quiet';

const ALL_CURVES: Record<CurveKey, number[]> = {
  rising:  [0.62, 0.55, 0.58, 0.50, 0.46, 0.42, 0.40, 0.36, 0.30, 0.26, 0.22, 0.18],
  dipping: [0.28, 0.32, 0.30, 0.38, 0.46, 0.52, 0.58, 0.62, 0.68, 0.72, 0.74, 0.78],
  level:   [0.50, 0.46, 0.52, 0.48, 0.46, 0.50, 0.48, 0.52, 0.46, 0.50, 0.48, 0.50],
  wave:    [0.60, 0.52, 0.46, 0.40, 0.46, 0.54, 0.46, 0.40, 0.34, 0.40, 0.46, 0.42],
  fading:  [0.34, 0.40, 0.46, 0.50, 0.54, 0.58, 0.60, 0.62, 0.64, 0.66, 0.68, 0.70],
};

const STATE_COLOR: Record<EnergyState, string> = {
  Energizing: BP.sage,
  Heavy:      BP.clay,
  Steady:     BP.ink3,
  Returning:  BP.accent,
  Quiet:      BP.ink4,
};

function EnergyRow({
  label, state, curve, first = false,
}: {
  label: string; state: EnergyState; curve: CurveKey; first?: boolean;
}) {
  const series = ALL_CURVES[curve];
  const stateColor = STATE_COLOR[state];
  const W = 96, H = 28;
  const step = W / (series.length - 1);
  const pts = series.map((y, i) => [i * step, H * y] as [number, number]);
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const last = pts[pts.length - 1];

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '16px 20px',
      borderTop: first ? 'none' : `0.5px solid ${BP.hairline}`,
    }}>
      <div style={{
        fontSize: 15, color: BP.ink, fontWeight: 500, letterSpacing: '-0.15px',
        flex: '0 0 84px', fontFamily: fontUI,
      }}>{label}</div>

      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id={`bp-grad-${label.replace(/\s/g, '')}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={stateColor} stopOpacity="0.16" />
              <stop offset="100%" stopColor={stateColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`${d} L ${W} ${H} L 0 ${H} Z`}
            fill={`url(#bp-grad-${label.replace(/\s/g, '')})`}
          />
          <path
            d={d}
            fill="none" stroke={stateColor} strokeOpacity="0.7"
            strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
          />
          <circle cx={last[0]} cy={last[1]} r="2.4" fill={stateColor} />
        </svg>
      </div>

      <div style={{
        flex: '0 0 78px', textAlign: 'right',
        fontSize: 12, fontWeight: 500, letterSpacing: '0.1px',
        color: stateColor, fontFamily: fontUI,
      }}>{state}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Drift axis — Quieting ←────────→ Growing
// ─────────────────────────────────────────────────────────────
const DRIFT_ITEMS = [
  { name: 'Financial',    pos: 0.18, note: 'cooling' },
  { name: 'Place',        pos: 0.28, note: 'quieter' },
  { name: 'Identity',     pos: 0.55, note: 'steady' },
  { name: 'Experiences',  pos: 0.72, note: 'rising' },
  { name: 'Work & Time',  pos: 0.88, note: 'louder' },
];

function DriftAxis() {
  return (
    <div style={{
      background: BP.card, border: `0.5px solid ${BP.hairline}`,
      borderRadius: 20, padding: '28px 22px 22px',
    }}>
      <div style={{ position: 'relative', height: 116 }}>
        {DRIFT_ITEMS.map((it, i) => {
          const above = i % 2 === 0;
          return (
            <div key={it.name} style={{
              position: 'absolute',
              left: `${it.pos * 100}%`,
              top: above ? 0 : 60,
              transform: 'translateX(-50%)',
              textAlign: 'center',
              width: 80,
            }}>
              {above ? (
                <>
                  <div style={{ fontSize: 12.5, fontWeight: 500, color: BP.ink, letterSpacing: '-0.1px', fontFamily: fontUI }}>{it.name}</div>
                  <div style={{ fontSize: 10.5, color: BP.ink4, marginTop: 2, letterSpacing: '0.3px', fontFamily: fontUI }}>{it.note}</div>
                  <div style={{ width: 1, height: 14, background: BP.ink5, margin: '6px auto 0' }} />
                </>
              ) : (
                <>
                  <div style={{ width: 1, height: 14, background: BP.ink5, margin: '0 auto 6px' }} />
                  <div style={{ fontSize: 12.5, fontWeight: 500, color: BP.ink, letterSpacing: '-0.1px', fontFamily: fontUI }}>{it.name}</div>
                  <div style={{ fontSize: 10.5, color: BP.ink4, marginTop: 2, letterSpacing: '0.3px', fontFamily: fontUI }}>{it.note}</div>
                </>
              )}
            </div>
          );
        })}

        <div style={{
          position: 'absolute', left: 0, right: 0, top: 58, height: 1,
          background: BP.hairline,
        }} />

        {DRIFT_ITEMS.map((it) => (
          <div key={it.name + 'dot'} style={{
            position: 'absolute', left: `${it.pos * 100}%`, top: 55,
            transform: 'translateX(-50%)',
            width: 7, height: 7, borderRadius: 7,
            background: BP.ink, border: `2px solid ${BP.card}`,
            boxShadow: `0 0 0 0.5px ${BP.ink}`,
          }} />
        ))}
      </div>

      <div style={{
        marginTop: 8, display: 'flex', justifyContent: 'space-between',
        fontSize: 10.5, fontWeight: 590, letterSpacing: '0.6px', textTransform: 'uppercase',
        color: BP.ink4, fontFamily: fontUI,
      }}>
        <span>Quieting</span>
        <span>Steady</span>
        <span>Growing</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Bottom nav shared by all main screens
// ─────────────────────────────────────────────────────────────
const NAV_TABS = [
  { id: 'pulse',      label: 'Pulse',      path: '/home' },
  { id: 'directions', label: 'Directions', path: '/directions' },
  { id: 'reflect',    label: 'Reflect',    path: '/reflect' },
  { id: 'insights',   label: 'Insights',   path: '/insights' },
];

export function PulseBottomNav({ active }: { active: string }) {
  const navigate = useNavigate();
  return (
    <div style={{
      position: 'relative', zIndex: 10, flexShrink: 0,
      borderTop: `0.5px solid ${BP.hairline}`,
      background: `linear-gradient(to top, rgba(244,239,230,0.97) 60%, rgba(244,239,230,0))`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      padding: '10px 0 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
    }}>
      {NAV_TABS.map(t => {
        const on = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => navigate(t.path)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px 12px',
              fontFamily: fontUI,
              fontSize: 12.5,
              fontWeight: on ? 590 : 440,
              color: on ? BP.ink : BP.ink4,
              letterSpacing: on ? '0.01em' : '0.005em',
              transition: 'color 0.15s ease',
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Pulse screen
// ─────────────────────────────────────────────────────────────
export function PulseScreen() {
  return (
    <div style={{ minHeight: '100%', backgroundColor: BP.paper, display: 'flex', flexDirection: 'column' }}>
      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '64px 24px 24px' }}>

        {/* Top eyebrow */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 56,
        }}>
          <SectionLabel>Pulse · May 16, 2026</SectionLabel>
          <div style={{
            width: 36, height: 36, borderRadius: 18,
            border: `0.5px solid ${BP.hairline}`,
            background: BP.card,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              width: 18, height: 18, borderRadius: 18, display: 'block',
              background: 'linear-gradient(135deg, #C9C2B5 0%, #A8A095 100%)',
            }} />
          </div>
        </div>

        {/* 1 — Opening Observation */}
        <section style={{ marginBottom: 68 }}>
          <SectionLabel style={{ marginBottom: 20, color: BP.ink3 }}>Right now</SectionLabel>
          <div style={{
            fontFamily: fontUI, fontSize: 30, lineHeight: 1.18, color: BP.ink,
            letterSpacing: '-0.5px', fontWeight: 300,
          }}>
            Your attention has been shifting toward <em style={{ fontStyle: 'italic' }}>work</em> and <em style={{ fontStyle: 'italic' }}>financial stability</em>.
          </div>
          <p style={{
            fontFamily: fontUI, fontSize: 13.5, color: BP.ink3, lineHeight: 1.6,
            letterSpacing: '-0.05px', margin: '20px 0 0', maxWidth: 300,
          }}>
            A pattern Blueprint has noticed across the last three weeks. Held lightly — nothing has to change.
          </p>
        </section>

        {/* 2 — Alignment Signals */}
        <section style={{ marginBottom: 60 }}>
          <SectionLabel style={{ marginBottom: 18 }}>Alignment signals</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SignalCard
              kind="tension"
              tag="Recurring tension"
              body="Experiences have received less attention than the importance you assigned to them."
            />
            <SignalCard
              kind="evolving"
              tag="Evolving interest"
              body="Your recent actions suggest financial security matters more than new experiences right now."
            />
            <SignalCard
              kind="sustained"
              tag="Sustainable pattern"
              body="Identity work has stayed quietly present, even through your busier weeks."
            />
          </div>
        </section>

        {/* 3 — Quiet Movement */}
        <section style={{ marginBottom: 60 }}>
          <div style={{ marginBottom: 18 }}>
            <SectionLabel>Quiet movement</SectionLabel>
            <p style={{
              fontFamily: fontUI, fontSize: 13, color: BP.ink3, lineHeight: 1.55,
              letterSpacing: '-0.05px', margin: '8px 0 0', maxWidth: 320,
            }}>
              Three small things, if any of them feel right. Skip what doesn&rsquo;t.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <MovementCard tag="Experiences" body="Plan one thing this weekend that isn't work-adjacent." />
            <MovementCard tag="Financial"   body="Review one line item in your budget — not to fix it, just to see it." />
            <MovementCard tag="Place"       body="Spend 20 minutes outside in a neighbourhood you don't usually visit." />
          </div>
        </section>

        {/* 4 — Energy */}
        <section style={{ marginBottom: 60 }}>
          <div style={{ marginBottom: 18 }}>
            <SectionLabel>Energy</SectionLabel>
            <p style={{
              fontFamily: fontUI, fontSize: 13, color: BP.ink3, lineHeight: 1.55,
              letterSpacing: '-0.05px', margin: '8px 0 0', maxWidth: 320,
            }}>
              What has felt light, what has felt heavy, what keeps returning.
            </p>
          </div>
          <div style={{
            background: BP.card, border: `0.5px solid ${BP.hairline}`,
            borderRadius: 20,
            boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 2px rgba(60,50,30,0.03)',
          }}>
            <EnergyRow label="Experiences" state="Energizing" curve="rising"  first />
            <EnergyRow label="Work & Time" state="Heavy"      curve="dipping"        />
            <EnergyRow label="Identity"    state="Steady"     curve="level"          />
            <EnergyRow label="Place"       state="Returning"  curve="wave"           />
            <EnergyRow label="Financial"   state="Quiet"      curve="fading"         />
          </div>
        </section>

        {/* 5 — Quiet Shifts */}
        <section style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 22 }}>
            <SectionLabel>Quiet shifts</SectionLabel>
            <p style={{
              fontFamily: fontUI, fontSize: 13, color: BP.ink3, lineHeight: 1.55,
              letterSpacing: '-0.05px', margin: '8px 0 0', maxWidth: 320,
            }}>
              How your priorities have been moving lately. Adaptation, not failure.
            </p>
          </div>
          <DriftAxis />
        </section>

      </div>

      <PulseBottomNav active="pulse" />
    </div>
  );
}
