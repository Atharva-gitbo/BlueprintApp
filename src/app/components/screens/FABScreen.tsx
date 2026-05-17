import React, { useState } from 'react';
import { B, serif, sans } from '../blueprint-theme';
import { BlueprintFAB, FABButtonSpecimen, MenuCardSpecimen } from '../BlueprintFAB';

/* ── Post check-in bottom rows ───────────────────── */
function PostCheckinRows() {
  const [hovered, setHovered] = useState<string | null>(null);

  const rows = [
    {
      id: 'redo',
      label: 'Redo',
      sub: 'Start the check-in again',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3.5 8A4.5 4.5 0 1 0 5.2 4.8" stroke={B.inkMid} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M5.5 2.5V5.5H2.5" stroke={B.inkMid} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'notes',
      label: 'Add notes',
      sub: 'Append a reflection to this entry',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M9.5 2.5H4.5A1.5 1.5 0 0 0 3 4v8a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 13 12V6L9.5 2.5Z"
            stroke={B.inkMid} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.5 2.5V6H13" stroke={B.inkMid} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
          <path d="M6 9h4M6 11.5h2.5" stroke={B.inkMid} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'edit',
      label: 'Edit',
      sub: 'Adjust your responses',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10.5 2.5L13.5 5.5L5.5 13.5H2.5V10.5L10.5 2.5Z"
            stroke={B.inkMid} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 4.5L11.5 7.5" stroke={B.inkMid} strokeWidth="1.3" strokeLinecap="round" opacity="0.4" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      backgroundColor: B.card, borderRadius: 20,
      border: '1px solid rgba(20,20,18,0.06)',
      overflow: 'hidden',
    }}>
      {rows.map((row, i) => {
        const isHovered = hovered === row.id;
        return (
          <React.Fragment key={row.id}>
            <button
              onMouseEnter={() => setHovered(row.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                gap: 14, padding: '13px 18px',
                background: isHovered ? 'rgba(20,20,18,0.03)' : 'transparent',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                transition: 'background 0.12s ease',
              }}
            >
              <div style={{ flexShrink: 0 }}>{row.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 400, color: B.ink, letterSpacing: '-0.1px' }}>
                  {row.label}
                </div>
                <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: B.inkFaint, marginTop: 1 }}>
                  {row.sub}
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke={isHovered ? B.inkMid : B.inkFaint}
                  strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {i < rows.length - 1 && (
              <div style={{ height: 1, backgroundColor: 'rgba(20,20,18,0.05)', margin: '0 18px' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── Section label ───────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: sans, fontSize: 10, fontWeight: 500,
      letterSpacing: '0.09em', textTransform: 'uppercase',
      color: B.bronze, display: 'block',
    }}>
      {children}
    </span>
  );
}

/* ── Thin divider ────────────────────────────────── */
function Divider() {
  return <div style={{ height: 1, backgroundColor: B.border, margin: '0' }} />;
}

/* ── Main screen ─────────────────────────────────── */
export function FABScreen() {
  const [hasDot, setHasDot] = useState(true);

  return (
    <div style={{ position: 'relative', minHeight: '100%', backgroundColor: B.bg }}>

      {/* Live interactive FAB — anchored top-right */}
      <BlueprintFAB hasPendingCheckin={hasDot} />

      {/* ── Content ── */}
      <div style={{ padding: '0 24px 40px' }}>

        {/* ── Header ── */}
        <div style={{ paddingTop: 64, paddingBottom: 28 }}>
          <Eyebrow>Blueprint · Component</Eyebrow>

          <h1 style={{
            fontFamily: serif, fontSize: 34, fontWeight: 400,
            fontStyle: 'italic', color: B.ink,
            lineHeight: 1.2, letterSpacing: '-0.5px',
            margin: '10px 0 0', maxWidth: 260,
          }}>
            The floating<br />action button.
          </h1>

          <p style={{
            fontFamily: sans, fontSize: 13, fontWeight: 300,
            color: B.inkLight, lineHeight: 1.65,
            margin: '12px 0 0', maxWidth: 270,
          }}>
            Lives top-right on every screen. Tap it above — four destinations, one quiet gesture.
          </p>
        </div>

        <Divider />

        {/* ── Toggle ── */}
        <div style={{ paddingTop: 20, paddingBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 400, color: B.ink }}>
              Check-in pending
            </span>
            <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: B.inkFaint, display: 'block', marginTop: 1 }}>
              Adds bronze dot to button above
            </span>
          </div>
          <button
            onClick={() => setHasDot(v => !v)}
            style={{
              width: 44, height: 26, borderRadius: 13,
              backgroundColor: hasDot ? B.bronze : B.border,
              border: 'none', cursor: 'pointer', position: 'relative',
              transition: 'background-color 0.2s ease', flexShrink: 0,
            }}
          >
            <div style={{
              width: 20, height: 20, borderRadius: '50%',
              backgroundColor: '#fff',
              position: 'absolute', top: 3,
              left: hasDot ? 21 : 3,
              transition: 'left 0.2s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
            }} />
          </button>
        </div>

        <Divider />

        {/* ── Button states ── */}
        <div style={{ paddingTop: 22, paddingBottom: 24 }}>
          <Eyebrow>Button · States</Eyebrow>

          <div style={{
            marginTop: 18,
            display: 'flex', alignItems: 'flex-start',
            gap: 0,
          }}>
            {/* Default */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FABButtonSpecimen hasDot={false} label="Default" />
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 72, backgroundColor: B.border, alignSelf: 'center' }} />

            {/* Check-in pending */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FABButtonSpecimen hasDot={true} label="Check-in pending" />
            </div>
          </div>

          <p style={{
            fontFamily: sans, fontSize: 11, fontWeight: 300, fontStyle: 'italic',
            color: B.inkFaint, margin: '14px 0 0', lineHeight: 1.6,
            textAlign: 'center',
          }}>
            A 9px bronze dot. Not a badge — a quiet signal.
          </p>
        </div>

        <Divider />

        {/* ── Menu card ── */}
        <div style={{ paddingTop: 22, paddingBottom: 24 }}>
          <Eyebrow>On tap · The menu</Eyebrow>
          <p style={{
            fontFamily: sans, fontSize: 12, fontWeight: 300,
            color: B.inkLight, margin: '6px 0 14px', lineHeight: 1.6,
          }}>
            A warm card drops from the button. The check-in row carries the bronze state.
          </p>

          <MenuCardSpecimen hasPendingCheckin={hasDot} />
        </div>

        <Divider />

        {/* ── Post check-in ── */}
        <div style={{ paddingTop: 22, paddingBottom: 8 }}>
          <Eyebrow>After check-in · Bottom options</Eyebrow>
          <p style={{
            fontFamily: sans, fontSize: 12, fontWeight: 300,
            color: B.inkLight, margin: '6px 0 14px', lineHeight: 1.6,
          }}>
            Three tappable rows appear at the bottom of the check-in screen on completion.
          </p>

          <PostCheckinRows />
        </div>

      </div>
    </div>
  );
}
