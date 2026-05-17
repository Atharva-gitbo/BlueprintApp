import React from 'react';
import { useNavigate } from 'react-router';
import { B, serif, sans } from '../blueprint-theme';

const breakdown = [
  { id: 'experiences', label: 'Experiences', amount: 95, pct: 28 },
  { id: 'place', label: 'Place', amount: 40, pct: 12 },
  { id: 'work', label: 'Work & Time', amount: 120, pct: 35 },
  { id: 'identity', label: 'Identity', amount: 55, pct: 16 },
  { id: 'financial', label: 'Financial Health', amount: 30, pct: 9 },
];

export function LifeInvestmentScreen() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100%',
        backgroundColor: B.bg,
        fontFamily: sans,
        paddingBottom: 48,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ padding: '28px 28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <button
          onClick={() => navigate('/home')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke={B.inkLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 400, color: B.inkLight }}>
            Canvas
          </span>
        </button>
      </div>

      {/* Hero number section */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 28px 0',
          textAlign: 'center',
        }}
      >
        {/* Label above */}
        <span
          style={{
            fontFamily: sans,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: B.inkFaint,
            display: 'block',
            marginBottom: 18,
          }}
        >
          Life Investment Number
        </span>

        {/* The number */}
        <div
          style={{
            backgroundColor: B.card,
            border: `1px solid ${B.border}`,
            borderRadius: 28,
            padding: '32px 40px',
            boxShadow: '0 2px 8px rgba(28,28,26,0.05), 0 8px 32px rgba(28,28,26,0.06)',
            marginBottom: 20,
          }}
        >
          <p
            style={{
              fontFamily: serif,
              fontSize: 58,
              fontWeight: 600,
              color: B.ink,
              margin: 0,
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            $340
          </p>
          <p
            style={{
              fontFamily: sans,
              fontSize: 14,
              fontWeight: 300,
              color: B.inkMid,
              margin: '10px 0 0',
              letterSpacing: '0.01em',
            }}
          >
            / month
          </p>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: sans,
            fontSize: 15,
            fontWeight: 300,
            color: B.inkMid,
            margin: 0,
            letterSpacing: '-0.1px',
            lineHeight: 1.6,
          }}
        >
          actively moving toward your canvas
        </p>

        {/* Context line */}
        <div
          style={{
            marginTop: 20,
            padding: '12px 20px',
            backgroundColor: B.sageFaint,
            border: `1px solid ${B.sageBorder}`,
            borderRadius: 100,
          }}
        >
          <p
            style={{
              fontFamily: sans,
              fontSize: 12,
              fontWeight: 400,
              color: B.sageDark,
              margin: 0,
              lineHeight: 1.5,
              textAlign: 'center',
            }}
          >
            You're 8 months from the threshold that unlocks your Place goal.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: B.borderLight, margin: '32px 28px 0' }} />

      {/* Breakdown */}
      <div style={{ padding: '20px 28px 0' }}>
        <span
          style={{
            fontFamily: sans, fontSize: 11, fontWeight: 500,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: B.inkLight, display: 'block', marginBottom: 14,
          }}
        >
          Where it's going
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {breakdown.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '13px 0',
                borderBottom: i < breakdown.length - 1 ? `1px solid ${B.borderLight}` : 'none',
              }}
            >
              {/* Area name */}
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 13,
                  fontWeight: 400,
                  color: B.inkMid,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {item.label}
              </span>

              {/* Bar */}
              <div
                style={{
                  width: 80,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: B.border,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: `${item.pct}%`,
                    height: '100%',
                    backgroundColor: B.sage,
                    borderRadius: 2,
                  }}
                />
              </div>

              {/* Amount */}
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 13,
                  fontWeight: 500,
                  color: B.ink,
                  letterSpacing: '-0.2px',
                  textAlign: 'right',
                  minWidth: 44,
                }}
              >
                ${item.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Total row */}
        <div
          style={{
            marginTop: 14,
            paddingTop: 12,
            borderTop: `1.5px solid ${B.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: B.ink }}>
            Total
          </span>
          <span
            style={{
              fontFamily: serif,
              fontSize: 18,
              fontWeight: 500,
              color: B.ink,
              letterSpacing: '-0.4px',
            }}
          >
            $340 / mo
          </span>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '24px 28px 0' }}>
        <button
          onClick={() => navigate('/weekly')}
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            color: B.inkMid,
            border: `1.5px solid ${B.border}`,
            borderRadius: 14,
            padding: '16px 24px',
            fontFamily: sans,
            fontSize: 14,
            fontWeight: 400,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>See this week's actions</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M8 3l5 5-5 5" stroke={B.inkMid} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}