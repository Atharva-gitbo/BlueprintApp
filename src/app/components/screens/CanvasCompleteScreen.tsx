import React from 'react';
import { useNavigate } from 'react-router';
import { B, serif, sans } from '../blueprint-theme';

const areas = [
  {
    id: 'experiences',
    label: 'Experiences',
    preview: 'One meaningful trip abroad each year. More live music and cultural events.',
  },
  {
    id: 'place',
    label: 'Place',
    preview: 'A walkable city, close to nature — somewhere with a creative scene.',
  },
  {
    id: 'work',
    label: 'Work & Time',
    preview: 'Creative work, four days a week, full ownership of mornings.',
  },
  {
    id: 'identity',
    label: 'Identity',
    preview: 'Someone who follows through, stays curious, shows up for people.',
  },
  {
    id: 'financial',
    label: 'Financial Health',
    preview: 'Six months runway, investing steadily, no lifestyle debt.',
  },
];

export function CanvasCompleteScreen() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100%',
        backgroundColor: B.bg,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: sans,
        paddingBottom: 48,
      }}
    >
      {/* Top space */}
      <div style={{ padding: '36px 28px 0' }}>
        {/* Decorative rule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ flex: 1, height: 1, backgroundColor: B.sage, opacity: 0.4 }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: B.sage }} />
          <div style={{ flex: 1, height: 1, backgroundColor: B.sage, opacity: 0.4 }} />
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: serif,
            fontSize: 34,
            fontWeight: 500,
            color: B.ink,
            letterSpacing: '-0.8px',
            lineHeight: 1.25,
            margin: 0,
          }}
        >
          Your canvas<br />is set.
        </h1>
        <p
          style={{
            fontFamily: sans,
            fontSize: 14,
            fontWeight: 300,
            color: B.inkLight,
            margin: '12px 0 0',
            lineHeight: 1.65,
            maxWidth: 280,
          }}
        >
          Five areas, written honestly. This is what you're designing toward.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: B.borderLight, margin: '24px 28px 0' }} />

      {/* Area summary cards */}
      <div style={{ padding: '20px 28px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {areas.map((area, i) => (
          <div
            key={area.id}
            style={{
              backgroundColor: B.card,
              border: `1px solid ${B.border}`,
              borderRadius: 16,
              padding: '16px 18px',
              boxShadow: '0 1px 3px rgba(28,28,26,0.04)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
            }}
          >
            <span
              style={{
                fontFamily: serif,
                fontSize: 13,
                fontWeight: 400,
                color: B.sage,
                flexShrink: 0,
                marginTop: 1,
                minWidth: 16,
                fontStyle: 'italic',
              }}
            >
              {i + 1}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 12,
                  fontWeight: 500,
                  color: B.inkMid,
                  margin: 0,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {area.label}
              </p>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 13,
                  fontWeight: 300,
                  color: B.ink,
                  margin: '5px 0 0',
                  lineHeight: 1.6,
                  letterSpacing: '0.01em',
                }}
              >
                {area.preview}
              </p>
            </div>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                backgroundColor: B.sageFaint,
                border: `1px solid ${B.sageBorder}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke={B.sage} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Closing thought */}
      <div
        style={{
          margin: '20px 28px 0',
          padding: '16px 18px',
          backgroundColor: B.sageFaint,
          border: `1px solid ${B.sageBorder}`,
          borderRadius: 14,
        }}
      >
        <p
          style={{
            fontFamily: serif,
            fontSize: 14,
            fontWeight: 400,
            fontStyle: 'italic',
            color: B.inkMid,
            margin: 0,
            lineHeight: 1.7,
            letterSpacing: '-0.1px',
          }}
        >
          "A designed life isn't a perfect life. It's a directed one."
        </p>
      </div>

      {/* CTA */}
      <div style={{ padding: '24px 28px 0' }}>
        <button
          onClick={() => navigate('/home')}
          style={{
            width: '100%',
            backgroundColor: B.ink,
            color: B.bg,
            border: 'none',
            borderRadius: 16,
            padding: '19px 24px',
            fontFamily: sans,
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: '0.01em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          <span>Go to my canvas</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 9h10M9 4l5 5-5 5" stroke={B.bg} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
