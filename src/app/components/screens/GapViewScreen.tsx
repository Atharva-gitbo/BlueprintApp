import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { B, serif, sans } from '../blueprint-theme';

const blockers = [
  {
    id: 'money',
    label: 'Money',
    color: B.amber,
    bg: B.amberFaint,
    border: B.amberBorder,
    detail: 'Cost of moving + breaking current lease. Estimated £4–8k.',
  },
  {
    id: 'decision',
    label: 'Decision',
    color: B.ink,
    bg: `${B.ink}07`,
    border: `${B.ink}18`,
    detail: "Haven't committed to a specific city yet. Stuck in research mode.",
  },
  {
    id: 'time',
    label: 'Time',
    color: B.red,
    bg: B.redFaint,
    border: B.redBorder,
    detail: 'Waiting for the "right moment." Last review: 6 months ago.',
  },
];

export function GapViewScreen() {
  const navigate = useNavigate();
  const [activeBlocker, setActiveBlocker] = useState<string | null>(null);

  return (
    <div
      style={{
        minHeight: '100%',
        backgroundColor: B.bg,
        fontFamily: sans,
        paddingBottom: 48,
      }}
    >
      {/* Header */}
      <div style={{ padding: '24px 28px 0' }}>
        {/* Back */}
        <button
          onClick={() => navigate('/home')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 24,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke={B.inkLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 400, color: B.inkLight }}>
            Your Canvas
          </span>
        </button>

        {/* Area label */}
        <span
          style={{
            fontFamily: sans, fontSize: 11, fontWeight: 500,
            letterSpacing: '0.09em', textTransform: 'uppercase', color: B.red,
          }}
        >
          Gap · Place
        </span>

        {/* Area heading */}
        <h1
          style={{
            fontFamily: serif,
            fontSize: 34,
            fontWeight: 500,
            color: B.ink,
            letterSpacing: '-0.8px',
            margin: '6px 0 0',
            lineHeight: 1.2,
          }}
        >
          Place
        </h1>
        <p
          style={{
            fontFamily: sans, fontSize: 13, fontWeight: 300, color: B.inkLight,
            margin: '6px 0 0',
          }}
        >
          Where you live shapes everything else.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: B.border, margin: '22px 28px 0' }} />

      {/* Gap analysis */}
      <div style={{ padding: '24px 28px 0' }}>

        {/* VISION block */}
        <div
          style={{
            backgroundColor: B.card,
            border: `1px solid ${B.sageBorder}`,
            borderLeft: `3px solid ${B.sage}`,
            borderRadius: 16,
            padding: '18px 20px',
            boxShadow: '0 1px 4px rgba(28,28,26,0.04)',
          }}
        >
          <span
            style={{
              fontFamily: sans, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: B.sage,
              display: 'block', marginBottom: 10,
            }}
          >
            Vision
          </span>
          <p
            style={{
              fontFamily: serif,
              fontSize: 17,
              fontWeight: 400,
              fontStyle: 'italic',
              color: B.ink,
              lineHeight: 1.55,
              margin: 0,
              letterSpacing: '-0.1px',
            }}
          >
            "Live in a walkable city, close to nature — somewhere with a creative scene I can be part of."
          </p>
          <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: B.inkLight, margin: '10px 0 0' }}>
            Written 14 Jan 2025 · 2 edits
          </p>
        </div>

        {/* Gap connector */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2px 0' }}>
          {/* Top line */}
          <div
            style={{
              width: 1,
              height: 22,
              background: `linear-gradient(to bottom, ${B.border}, ${B.redBorder})`,
            }}
          />
          {/* Gap badge */}
          <div
            style={{
              border: `1.5px solid ${B.redBorder}`,
              borderRadius: 100,
              padding: '6px 18px',
              backgroundColor: B.bg,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: B.red }} />
            <span
              style={{
                fontFamily: sans, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: B.red,
              }}
            >
              Gap
            </span>
            <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: B.inkLight }}>
              ·&nbsp; ~2 years at current pace
            </span>
          </div>
          {/* Bottom line */}
          <div
            style={{
              width: 1,
              height: 22,
              background: `linear-gradient(to bottom, ${B.redBorder}, ${B.border})`,
            }}
          />
        </div>

        {/* NOW block */}
        <div
          style={{
            backgroundColor: B.card,
            border: `1px solid ${B.border}`,
            borderLeft: `3px solid ${B.inkFaint}`,
            borderRadius: 16,
            padding: '18px 20px',
            boxShadow: '0 1px 4px rgba(28,28,26,0.04)',
          }}
        >
          <span
            style={{
              fontFamily: sans, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: B.inkLight,
              display: 'block', marginBottom: 10,
            }}
          >
            Now
          </span>
          <p
            style={{
              fontFamily: serif,
              fontSize: 17,
              fontWeight: 400,
              color: B.inkMid,
              lineHeight: 1.55,
              margin: 0,
              letterSpacing: '-0.1px',
            }}
          >
            "Suburban, car-dependent, been here four years. Far from anything I actually want to be near."
          </p>
          <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: B.inkLight, margin: '10px 0 0' }}>
            Honest reflection · Updated 5 Mar 2025
          </p>
        </div>
      </div>

      {/* Blockers section */}
      <div style={{ padding: '28px 28px 0' }}>
        <div style={{ marginBottom: 14 }}>
          <span
            style={{
              fontFamily: sans, fontSize: 11, fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: B.inkLight,
            }}
          >
            What's blocking it
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {blockers.map(({ id, label, color, bg, border, detail }) => {
            const isActive = activeBlocker === id;
            return (
              <button
                key={id}
                onClick={() => setActiveBlocker(isActive ? null : id)}
                style={{
                  width: '100%',
                  backgroundColor: isActive ? bg : B.card,
                  border: `1px solid ${isActive ? border : B.border}`,
                  borderRadius: 14,
                  padding: '14px 18px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  boxShadow: '0 1px 3px rgba(28,28,26,0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 8, height: 8,
                        borderRadius: '50%',
                        backgroundColor: color,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: sans, fontSize: 14, fontWeight: 500,
                        color: isActive ? color : B.ink,
                        letterSpacing: '-0.1px',
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    style={{
                      transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.18s ease',
                    }}
                  >
                    <path d="M3 7h8M7 3l4 4-4 4" stroke={B.inkFaint} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {isActive && (
                  <p
                    style={{
                      fontFamily: sans, fontSize: 13, fontWeight: 300,
                      color: B.inkMid, margin: '10px 0 0', lineHeight: 1.6,
                    }}
                  >
                    {detail}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action prompt */}
      <div
        style={{
          margin: '24px 28px 0',
          padding: '18px 20px',
          backgroundColor: B.card,
          borderRadius: 16,
          border: `1px solid ${B.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          cursor: 'pointer',
        }}
        onClick={() => navigate('/weekly')}
      >
        <div>
          <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: B.ink, margin: 0 }}>
            See actions for this week
          </p>
          <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: B.inkLight, margin: '3px 0 0' }}>
            2 specific steps to close this gap
          </p>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M8 3l5 5-5 5" stroke={B.inkMid} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Update prompt */}
      <div style={{ padding: '16px 28px 0' }}>
        <button
          style={{
            width: '100%',
            background: 'none',
            border: `1px dashed ${B.border}`,
            borderRadius: 14,
            padding: '14px',
            fontFamily: sans,
            fontSize: 13,
            fontWeight: 300,
            color: B.inkLight,
            cursor: 'pointer',
            letterSpacing: '0.01em',
          }}
        >
          Update my "now" — something changed
        </button>
      </div>
    </div>
  );
}