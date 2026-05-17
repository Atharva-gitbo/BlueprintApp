import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { B, serif, sans } from '../blueprint-theme';

const areas = [
  { id: 'experiences', label: 'Experiences' },
  { id: 'place', label: 'Place' },
  { id: 'work', label: 'Work & Time' },
  { id: 'identity', label: 'Identity' },
  { id: 'financial', label: 'Financial Health' },
];

// Pre-defined percentages that sum to 100 when all selected
const defaultPcts: Record<string, number> = {
  experiences: 18,
  place: 12,
  work: 34,
  identity: 8,
  financial: 28,
};

export function MonthlyCheckinScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Record<string, boolean>>({
    experiences: true,
    place: false,
    work: true,
    identity: false,
    financial: true,
  });
  const [purchase, setPurchase] = useState('');
  const [saved, setSaved] = useState(false);

  const activeAreas = areas.filter((a) => selected[a.id]);
  const totalPct = activeAreas.reduce((sum, a) => sum + defaultPcts[a.id], 0);

  const toggle = (id: string) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (saved) {
    return (
      <div
        style={{
          minHeight: '100%',
          backgroundColor: B.bg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: sans,
          padding: '40px 32px',
          gap: 16,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 48, height: 48, borderRadius: '50%',
            backgroundColor: B.sageFaint, border: `1.5px solid ${B.sageBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10L8.5 14.5L16 6" stroke={B.sage} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 style={{ fontFamily: serif, fontSize: 26, fontWeight: 500, color: B.ink, margin: 0, letterSpacing: '-0.4px' }}>
          Reflection saved.
        </h2>
        <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 300, color: B.inkLight, margin: 0, lineHeight: 1.65 }}>
          March 2025 is logged. See you next month.
        </p>
        <button
          onClick={() => navigate('/investment')}
          style={{
            marginTop: 16,
            backgroundColor: B.ink,
            color: B.bg,
            border: 'none',
            borderRadius: 14,
            padding: '16px 32px',
            fontFamily: sans,
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          See your investment number
        </button>
        <button
          onClick={() => navigate('/home')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 28,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke={B.inkLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 400, color: B.inkLight }}>
            Your Canvas
          </span>
        </button>

        <span
          style={{
            fontFamily: sans, fontSize: 11, fontWeight: 500,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: B.inkFaint, display: 'block', marginBottom: 10,
          }}
        >
          Monthly reflection · March 2025
        </span>
      </div>
    );
  }

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
      <div style={{ padding: '28px 28px 0' }}>
        <button
          onClick={() => navigate('/home')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 28,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke={B.inkLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 400, color: B.inkLight }}>
            Your Canvas
          </span>
        </button>

        <span
          style={{
            fontFamily: sans, fontSize: 11, fontWeight: 500,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: B.inkFaint, display: 'block', marginBottom: 10,
          }}
        >
          Monthly reflection · March 2025
        </span>

        <h1
          style={{
            fontFamily: serif,
            fontSize: 26,
            fontWeight: 500,
            color: B.ink,
            letterSpacing: '-0.4px',
            lineHeight: 1.38,
            margin: 0,
          }}
        >
          What did your money<br />go toward this month?
        </h1>
        <p
          style={{
            fontFamily: sans,
            fontSize: 13,
            fontWeight: 300,
            color: B.inkLight,
            margin: '8px 0 0',
            lineHeight: 1.65,
          }}
        >
          Tap the areas that got real spend. Don't overthink it.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: B.borderLight, margin: '22px 28px 0' }} />

      {/* Area pill selector */}
      <div style={{ padding: '20px 28px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {areas.map((area) => {
            const isOn = selected[area.id];
            const pct = defaultPcts[area.id];
            return (
              <button
                key={area.id}
                onClick={() => toggle(area.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '15px 18px',
                  borderRadius: 14,
                  border: `1.5px solid ${isOn ? B.sage : B.border}`,
                  backgroundColor: isOn ? B.sageFaint : B.card,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Checkbox */}
                  <div
                    style={{
                      width: 18, height: 18, borderRadius: 5,
                      border: `1.5px solid ${isOn ? B.sage : B.border}`,
                      backgroundColor: isOn ? B.sage : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.18s ease', flexShrink: 0,
                    }}
                  >
                    {isOn && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4.5 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: sans, fontSize: 14, fontWeight: isOn ? 500 : 400,
                      color: isOn ? B.ink : B.inkMid, letterSpacing: '-0.1px',
                      transition: 'color 0.18s ease',
                    }}
                  >
                    {area.label}
                  </span>
                </div>
                {/* Percentage badge */}
                {isOn && (
                  <span
                    style={{
                      fontFamily: sans, fontSize: 13, fontWeight: 500,
                      color: B.sage, letterSpacing: '-0.2px',
                    }}
                  >
                    ~{pct}%
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Total */}
        {activeAreas.length > 0 && (
          <div
            style={{
              marginTop: 12,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: B.inkFaint }}>
              Allocated
            </span>
            <span
              style={{
                fontFamily: sans, fontSize: 13, fontWeight: 500,
                color: totalPct === 100 ? B.sage : B.amber,
              }}
            >
              {totalPct}%
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: B.borderLight, margin: '24px 28px 0' }} />

      {/* Reflective prompt */}
      <div style={{ padding: '22px 28px 0' }}>
        <p
          style={{
            fontFamily: serif,
            fontSize: 18,
            fontWeight: 400,
            color: B.ink,
            margin: 0,
            lineHeight: 1.5,
            letterSpacing: '-0.2px',
          }}
        >
          One purchase you'd make again?
        </p>
        <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: B.inkLight, margin: '6px 0 0' }}>
          Not the most expensive one. The most right one.
        </p>

        <div
          style={{
            marginTop: 14,
            backgroundColor: B.card,
            border: `1px solid ${B.border}`,
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(28,28,26,0.04)',
          }}
        >
          <textarea
            value={purchase}
            onChange={(e) => setPurchase(e.target.value)}
            placeholder="The concert tickets, the climbing membership, the cooking class..."
            style={{
              width: '100%',
              height: 90,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              padding: '14px 16px',
              fontFamily: sans,
              fontSize: 14,
              fontWeight: 300,
              color: B.ink,
              lineHeight: 1.7,
              resize: 'none',
            }}
          />
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '24px 28px 0' }}>
        <button
          onClick={() => setSaved(true)}
          style={{
            width: '100%',
            backgroundColor: B.ink,
            color: B.bg,
            border: 'none',
            borderRadius: 16,
            padding: '18px 24px',
            fontFamily: sans,
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Save reflection</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 9h10M9 4l5 5-5 5" stroke={B.bg} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p
          style={{
            fontFamily: sans, fontSize: 11, fontWeight: 300,
            color: B.inkFaint, textAlign: 'center',
            margin: '12px 0 0', letterSpacing: '0.01em',
          }}
        >
          Takes about 2 minutes. Every month.
        </p>
      </div>
    </div>
  );
}