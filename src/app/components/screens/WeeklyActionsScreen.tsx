import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { B, serif, sans } from '../blueprint-theme';

interface Action {
  id: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  categoryBorder: string;
  area: string;
  text: string;
  context: string;
}

const defaultActions: Record<string, Action> = {
  financial: {
    id: 'financial',
    category: 'Financial',
    categoryColor: B.sage,
    categoryBg: B.sageFaint,
    categoryBorder: B.sageBorder,
    area: 'Financial Health',
    text: 'Move £200 into your emergency fund.',
    context: "You're £600 away from 3 months of runway. Three more of these and it's done.",
  },
  life: {
    id: 'life',
    category: 'Life Design',
    categoryColor: B.amber,
    categoryBg: B.amberFaint,
    categoryBorder: B.amberBorder,
    area: 'Place',
    text: "Write down three cities you'd genuinely consider living in.",
    context: 'Be honest. Not aspirational — honest. This breaks the "decision" block.',
  },
};

const swapAlternatives: Record<string, Action[]> = {
  financial: [
    {
      id: 'financial-a',
      category: 'Financial',
      categoryColor: B.sage,
      categoryBg: B.sageFaint,
      categoryBorder: B.sageBorder,
      area: 'Financial Health',
      text: 'Cancel one subscription you haven\'t used this month.',
      context: 'Frees up recurring money, no lifestyle hit.',
    },
    {
      id: 'financial-b',
      category: 'Financial',
      categoryColor: B.sage,
      categoryBg: B.sageFaint,
      categoryBorder: B.sageBorder,
      area: 'Financial Health',
      text: 'Check your bank statement and tag last week\'s top 3 spends.',
      context: 'Awareness before action.',
    },
  ],
  life: [
    {
      id: 'life-a',
      category: 'Life Design',
      categoryColor: B.amber,
      categoryBg: B.amberFaint,
      categoryBorder: B.amberBorder,
      area: 'Place',
      text: 'Look up the cost of living in one city on your shortlist.',
      context: 'Turn the abstract into a number.',
    },
    {
      id: 'life-b',
      category: 'Life Design',
      categoryColor: B.amber,
      categoryBg: B.amberFaint,
      categoryBorder: B.amberBorder,
      area: 'Identity',
      text: 'Block 90 minutes this week for something you designed into your canvas.',
      context: 'Time is the real currency.',
    },
  ],
};

// Last 7 days history
const historyDays = [
  { label: 'M', done: true },
  { label: 'T', done: true },
  { label: 'W', done: true },
  { label: 'T', done: false },
  { label: 'F', done: false },
  { label: 'S', done: false },
  { label: 'S', done: false, today: true },
];

interface SwapSheetProps {
  actionId: string;
  currentAction: Action;
  onClose: () => void;
  onSwap: (newAction: Action) => void;
}

function SwapSheet({ actionId, currentAction, onClose, onSwap }: SwapSheetProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const alternatives = swapAlternatives[actionId] || [];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(28,28,26,0.35)',
          zIndex: 100,
        }}
      />
      {/* Sheet */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: B.bg,
          borderRadius: '24px 24px 0 0',
          padding: '0 0 36px',
          zIndex: 101,
          boxShadow: '0 -8px 40px rgba(28,28,26,0.12)',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 0 10px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: B.border }} />
        </div>

        <div style={{ padding: '4px 24px 0' }}>
          {/* Heading */}
          <p
            style={{
              fontFamily: sans, fontSize: 11, fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: B.inkFaint, margin: 0, marginBottom: 14,
            }}
          >
            Swap action
          </p>
          <p
            style={{
              fontFamily: sans, fontSize: 13, fontWeight: 300,
              color: B.inkLight, margin: '0 0 18px',
              letterSpacing: '0.01em',
            }}
          >
            Pick what fits your week.
          </p>

          {/* Current action — greyed out */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: 14,
              border: `1px solid ${B.border}`,
              backgroundColor: B.bgAlt,
              marginBottom: 14,
              opacity: 0.55,
            }}
          >
            <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 500, color: B.inkFaint, margin: '0 0 5px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Current
            </p>
            <p
              style={{
                fontFamily: serif, fontSize: 15, fontWeight: 400,
                color: B.inkLight, margin: 0, lineHeight: 1.5,
                textDecoration: 'line-through',
                letterSpacing: '-0.1px',
              }}
            >
              {currentAction.text}
            </p>
          </div>

          {/* Alternatives */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {alternatives.map((alt) => {
              const isSelected = selected === alt.id;
              return (
                <button
                  key={alt.id}
                  onClick={() => setSelected(isSelected ? null : alt.id)}
                  style={{
                    width: '100%',
                    padding: '16px 16px',
                    borderRadius: 14,
                    border: `1.5px solid ${isSelected ? alt.categoryBorder : B.border}`,
                    backgroundColor: isSelected ? alt.categoryBg : B.card,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    {/* Select indicator */}
                    <div
                      style={{
                        width: 16, height: 16, borderRadius: '50%',
                        border: `1.5px solid ${isSelected ? alt.categoryColor : B.border}`,
                        backgroundColor: isSelected ? alt.categoryColor : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'all 0.18s ease',
                      }}
                    >
                      {isSelected && (
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: sans, fontSize: 11, fontWeight: 500,
                        color: isSelected ? alt.categoryColor : B.inkFaint,
                        letterSpacing: '0.03em', textTransform: 'uppercase',
                      }}
                    >
                      {alt.area}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: serif, fontSize: 15, fontWeight: 400,
                      color: isSelected ? B.ink : B.inkMid,
                      margin: 0, lineHeight: 1.5, letterSpacing: '-0.1px',
                    }}
                  >
                    {alt.text}
                  </p>
                  <p
                    style={{
                      fontFamily: sans, fontSize: 12, fontWeight: 300,
                      color: B.inkLight, margin: '6px 0 0', lineHeight: 1.55,
                    }}
                  >
                    {alt.context}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Confirm */}
          <button
            onClick={() => {
              const chosen = alternatives.find((a) => a.id === selected);
              if (chosen) { onSwap(chosen); onClose(); }
            }}
            style={{
              width: '100%',
              backgroundColor: selected ? B.ink : B.border,
              color: selected ? B.bg : B.inkFaint,
              border: 'none',
              borderRadius: 14,
              padding: '17px 24px',
              fontFamily: sans,
              fontSize: 15,
              fontWeight: 500,
              cursor: selected ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
            }}
          >
            Confirm swap
          </button>
        </div>
      </div>
    </>
  );
}

export function WeeklyActionsScreen() {
  const navigate = useNavigate();
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [actions, setActions] = useState<Record<string, Action>>(defaultActions);
  const [swapOpen, setSwapOpen] = useState<string | null>(null);

  const completedToday = Object.values(done).filter(Boolean).length;
  const actionList = ['financial', 'life'].map((id) => actions[id]);

  return (
    <div
      style={{
        minHeight: '100%',
        backgroundColor: B.bg,
        fontFamily: sans,
        paddingBottom: 48,
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{ padding: '24px 28px 0' }}>
        <button
          onClick={() => navigate('/home')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 26,
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
            letterSpacing: '0.08em', textTransform: 'uppercase', color: B.inkLight,
            display: 'block', marginBottom: 8,
          }}
        >
          Week 12 · 22–28 March
        </span>
        <h1
          style={{
            fontFamily: serif,
            fontSize: 30,
            fontWeight: 500,
            color: B.ink,
            letterSpacing: '-0.5px',
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          This week's actions
        </h1>
        <p
          style={{
            fontFamily: sans, fontSize: 13, fontWeight: 300,
            color: B.inkLight, margin: '6px 0 0',
          }}
        >
          Two things. That's it. Do them.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: B.borderLight, margin: '22px 28px 0' }} />

      {/* Action cards */}
      <div style={{ padding: '20px 28px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {actionList.map((action) => {
          const isDone = done[action.id];
          return (
            <div
              key={action.id}
              style={{
                backgroundColor: isDone ? `${B.sage}08` : B.card,
                border: `1px solid ${isDone ? B.sageBorder : B.border}`,
                borderRadius: 20,
                padding: '20px 20px',
                boxShadow: isDone ? 'none' : '0 1px 4px rgba(28,28,26,0.05), 0 4px 16px rgba(28,28,26,0.04)',
                transition: 'all 0.25s ease',
                position: 'relative',
              }}
            >
              {/* Category tag + area */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      fontFamily: sans, fontSize: 11, fontWeight: 500,
                      letterSpacing: '0.02em',
                      color: isDone ? B.sage : action.categoryColor,
                      backgroundColor: isDone ? B.sageFaint : action.categoryBg,
                      border: `1px solid ${isDone ? B.sageBorder : action.categoryBorder}`,
                      borderRadius: 100, padding: '4px 10px',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {isDone ? '✓ Done' : action.category}
                  </span>
                  <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: B.inkFaint }}>
                    {action.area}
                  </span>
                </div>

                {/* Swap button — only when not done */}
                {!isDone && (
                  <button
                    onClick={() => setSwapOpen(action.id)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 4.5h10M2 4.5L5 2M2 4.5L5 7" stroke={B.inkFaint} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 9.5H2M12 9.5L9 7M12 9.5L9 12" stroke={B.inkFaint} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 300, color: B.inkFaint, letterSpacing: '0.01em' }}>
                      Swap
                    </span>
                  </button>
                )}
              </div>

              {/* Action text */}
              <p
                style={{
                  fontFamily: serif, fontSize: 18, fontWeight: 400,
                  color: isDone ? B.inkLight : B.ink,
                  lineHeight: 1.48, margin: 0, letterSpacing: '-0.2px',
                  textDecoration: isDone ? 'line-through' : 'none',
                  transition: 'color 0.25s ease',
                }}
              >
                {action.text}
              </p>

              {/* Context */}
              {!isDone && (
                <p
                  style={{
                    fontFamily: sans, fontSize: 13, fontWeight: 300,
                    color: B.inkLight, margin: '10px 0 0', lineHeight: 1.6,
                  }}
                >
                  {action.context}
                </p>
              )}

              {/* Done button */}
              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setDone((prev) => ({ ...prev, [action.id]: !isDone }))}
                  style={{
                    border: `1.5px solid ${isDone ? B.sage : B.border}`,
                    borderRadius: 100, padding: '9px 22px',
                    fontFamily: sans, fontSize: 13, fontWeight: 500,
                    color: isDone ? B.sage : B.inkMid,
                    backgroundColor: isDone ? B.sageFaint : 'transparent',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  {isDone ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke={B.sage} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Completed
                    </>
                  ) : (
                    'Mark done'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Past weeks row */}
      <div
        style={{
          margin: '20px 28px 0',
          padding: '16px 18px',
          backgroundColor: B.card,
          border: `1px solid ${B.border}`,
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(28,28,26,0.04)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: B.ink, margin: 0 }}>
            Recent weeks
          </p>
        </div>

        {/* Week rows */}
        {[
          { label: 'Wk 11 · 15–21 Mar', done: 2, total: 2 },
          { label: 'Wk 10 · 8–14 Mar', done: 2, total: 2 },
          { label: 'Wk 9 · 1–7 Mar', done: 1, total: 2 },
        ].map(({ label, done: d, total }) => (
          <div
            key={label}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 0',
              borderTop: `1px solid ${B.borderLight}`,
            }}
          >
            <span style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: B.inkLight }}>
              {label}
            </span>
            <div style={{ display: 'flex', gap: 5 }}>
              {Array.from({ length: total }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 18, height: 18, borderRadius: 5,
                    backgroundColor: i < d ? B.sage : 'transparent',
                    border: `1.5px solid ${i < d ? B.sage : B.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {i < d && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 12, borderTop: `1px solid ${B.borderLight}`, paddingTop: 12 }}>
          <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 300, color: B.inkMid, margin: 0, lineHeight: 1.6 }}>
            {completedToday === 2
              ? 'Both done for this week.'
              : completedToday === 1
              ? 'One completed. One remaining.'
              : 'Two things this week. That\'s the scope.'}
          </p>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: '20px 28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => navigate('/reflect')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontFamily: sans, fontSize: 12, fontWeight: 300, color: B.inkFaint,
          }}
        >
          ← Weekly reflection
        </button>
        <button
          onClick={() => navigate('/investment')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontFamily: sans, fontSize: 12, fontWeight: 300, color: B.inkFaint,
          }}
        >
          Investment number →
        </button>
      </div>

      {/* Swap bottom sheet */}
      {swapOpen && (
        <SwapSheet
          actionId={swapOpen}
          currentAction={actions[swapOpen]}
          onClose={() => setSwapOpen(null)}
          onSwap={(newAction) => {
            setActions((prev) => ({ ...prev, [swapOpen]: { ...newAction, id: swapOpen } }));
          }}
        />
      )}
    </div>
  );
}