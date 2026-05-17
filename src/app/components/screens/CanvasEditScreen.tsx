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

const initialTexts: Record<string, string> = {
  experiences:
    'One meaningful trip abroad each year. More live music and cultural events. Cooking classes. Reading 30 books. Time in nature regularly. Less passive consumption, more active experience.',
  place:
    'A walkable city, close to nature — somewhere with a creative scene I can actually be part of. Close enough to get out of the city on weekends.',
  work:
    'Creative work, four days a week, full ownership of mornings. No commute. Projects I can point to.',
  identity:
    'Someone who follows through, stays curious, shows up for people I care about. Less reactive. More intentional.',
  financial:
    'Six months runway, investing steadily, no lifestyle debt. Clear on where money goes.',
};

const lastUpdated: Record<string, string> = {
  experiences: '14 Jan 2025',
  place: '14 Jan 2025',
  work: '22 Feb 2025',
  identity: '14 Jan 2025',
  financial: '8 Mar 2025',
};

const prompts: Record<string, string> = {
  experiences: 'What does a full life of experiences look like for you?',
  place: 'Where do you actually want to live — and what does that place let you become?',
  work: 'What does your ideal relationship with work and time look like?',
  identity: 'Who are you becoming? What values guide the person you want to be?',
  financial: 'What does genuine financial health look and feel like in your life?',
};

export function CanvasEditScreen() {
  const navigate = useNavigate();
  const [activeArea, setActiveArea] = useState('place');
  const [texts, setTexts] = useState<Record<string, string>>(initialTexts);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [justSaved, setJustSaved] = useState(false);

  const handleSave = () => {
    setSaved((prev) => ({ ...prev, [activeArea]: true }));
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  };

  const hasChanged = texts[activeArea] !== initialTexts[activeArea];

  return (
    <div
      style={{
        minHeight: '100%',
        backgroundColor: B.bg,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: sans,
      }}
    >
      {/* Header */}
      <div style={{ padding: '24px 28px 0' }}>
        {/* Nav row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <button
            onClick={() => navigate('/home')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6, padding: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8L10 12" stroke={B.inkLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 400, color: B.inkLight }}>
              Canvas
            </span>
          </button>

          {/* Save indicator */}
          <span
            style={{
              fontFamily: sans, fontSize: 12, fontWeight: 400,
              color: justSaved ? B.sage : B.inkFaint,
              transition: 'color 0.3s ease',
              letterSpacing: '0.01em',
            }}
          >
            {justSaved ? '✓ Saved' : 'Editing'}
          </span>
        </div>

        {/* Eyebrow */}
        <span
          style={{
            fontFamily: sans, fontSize: 11, fontWeight: 500,
            letterSpacing: '0.09em', textTransform: 'uppercase',
            color: B.sage, display: 'block', marginBottom: 10,
          }}
        >
          Edit · {areas.find((a) => a.id === activeArea)?.label}
        </span>

        {/* Prompt — journal-like, no imperative */}
        <h2
          style={{
            fontFamily: serif,
            fontSize: 21,
            fontWeight: 400,
            fontStyle: 'italic',
            color: B.ink,
            lineHeight: 1.45,
            letterSpacing: '-0.2px',
            margin: 0,
          }}
        >
          {prompts[activeArea]}
        </h2>
      </div>

      {/* Text input */}
      <div style={{ flex: 1, padding: '18px 28px 0' }}>
        <div
          style={{
            backgroundColor: B.card,
            borderRadius: 20,
            border: `1px solid ${hasChanged ? B.sageBorder : B.border}`,
            overflow: 'hidden',
            boxShadow: hasChanged
              ? `0 0 0 3px ${B.sageFaint}, 0 1px 4px rgba(28,28,26,0.04)`
              : '0 1px 4px rgba(28,28,26,0.04)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          <textarea
            value={texts[activeArea]}
            onChange={(e) =>
              setTexts((prev) => ({ ...prev, [activeArea]: e.target.value }))
            }
            style={{
              width: '100%',
              minHeight: 180,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              padding: '20px 20px 16px',
              fontFamily: sans,
              fontSize: 15,
              fontWeight: 300,
              color: B.ink,
              lineHeight: 1.78,
              resize: 'none',
            }}
          />
          {/* Footer bar */}
          <div
            style={{
              borderTop: `1px solid ${B.borderLight}`,
              padding: '10px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontFamily: sans, fontSize: 11, color: B.inkFaint, fontWeight: 300 }}>
              Last updated {lastUpdated[activeArea]}
            </span>
            <span style={{ fontFamily: sans, fontSize: 11, color: B.inkFaint, fontWeight: 300 }}>
              {texts[activeArea]?.split(/\s+/).filter(Boolean).length || 0} words
            </span>
          </div>
        </div>

        {/* Change indicator */}
        {hasChanged && (
          <div
            style={{
              marginTop: 10,
              padding: '10px 14px',
              backgroundColor: B.sageFaint,
              borderRadius: 10,
              border: `1px solid ${B.sageBorder}`,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: B.sage, flexShrink: 0 }} />
            <span style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: B.inkMid }}>
              Unsaved changes — save before leaving.
            </span>
          </div>
        )}
      </div>

      {/* Area tabs */}
      <div style={{ padding: '20px 28px 0' }}>
        <div
          style={{
            display: 'flex', gap: 7,
            overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2,
          }}
        >
          {areas.map((a) => {
            const isActive = a.id === activeArea;
            const isSaved = saved[a.id];
            return (
              <button
                key={a.id}
                onClick={() => setActiveArea(a.id)}
                style={{
                  flexShrink: 0,
                  fontFamily: sans,
                  fontSize: 12,
                  fontWeight: isActive ? 500 : 400,
                  border: `1.5px solid ${isActive ? B.ink : isSaved ? B.sageBorder : B.border}`,
                  borderRadius: 100,
                  padding: '7px 13px',
                  backgroundColor: isActive ? B.ink : isSaved ? B.sageFaint : 'transparent',
                  color: isActive ? B.bg : isSaved ? B.sage : B.inkFaint,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}
              >
                {isSaved && !isActive && (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke={B.sage} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {a.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Save button */}
      <div style={{ padding: '16px 28px 32px' }}>
        <button
          onClick={handleSave}
          style={{
            width: '100%',
            backgroundColor: hasChanged ? B.ink : B.border,
            color: hasChanged ? B.bg : B.inkFaint,
            border: 'none',
            borderRadius: 16,
            padding: '18px 24px',
            fontFamily: sans,
            fontSize: 15,
            fontWeight: 500,
            cursor: hasChanged ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'background-color 0.2s, color 0.2s',
          }}
        >
          <span>Save this area</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 9h10M9 4l5 5-5 5"
              stroke={hasChanged ? B.bg : B.inkFaint}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}