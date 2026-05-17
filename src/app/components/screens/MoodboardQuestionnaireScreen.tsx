import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { B, serif, sansHN } from '../blueprint-theme';

// ─────────────────────────────────────────────────────────────
//  QUESTIONS
// ─────────────────────────────────────────────────────────────
type Question = {
  id: string;
  question: string;
  imageUrl: string;
  isQuote: boolean;
  quoteText?: string;
};

const QUESTIONS: Question[] = [
  {
    id: '1',
    question: 'You added photos of coastal towns. What about that life pulls you in?',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80',
    isQuote: false,
  },
  {
    id: '2',
    question: 'You chose a quote about new beginnings. What change are you quietly hoping to make?',
    imageUrl: '',
    isQuote: true,
    quoteText: '"The best time for new beginnings is now."',
  },
  {
    id: '3',
    question: 'Someone who inspires you made it onto your board. What quality of theirs do you want to grow in yourself?',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
    isQuote: false,
  },
  {
    id: '4',
    question: 'Your images keep returning to wide open spaces. What does that craving tell you about how you want to spend your days?',
    imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200&q=80',
    isQuote: false,
  },
  {
    id: '5',
    question: 'Looking at everything you chose — what\u2019s the life your board is quietly pointing towards?',
    imageUrl: '',
    isQuote: false,
  },
];

const TOTAL = QUESTIONS.length;

// ─────────────────────────────────────────────────────────────
//  GRAIN
// ─────────────────────────────────────────────────────────────
function Grain() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.04, zIndex: 0 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="grain-q">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-q)" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
//  THUMBNAIL
// ─────────────────────────────────────────────────────────────
function Thumbnail({ q }: { q: Question }) {
  if (q.isQuote && q.quoteText) {
    return (
      <div
        style={{
          width: 64, height: 64,
          borderRadius: 14,
          backgroundColor: '#1C1A14',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '10px 12px',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          boxShadow: '0 4px 14px rgba(20,20,18,0.2)',
        }}
      >
        <div style={{
          position: 'absolute', top: 8, left: 10,
          width: 12, height: 1, backgroundColor: B.bronze, opacity: 0.8,
        }} />
        <p style={{
          fontFamily: serif, fontSize: 9, fontStyle: 'italic', fontWeight: 400,
          color: '#F5EDD8', lineHeight: 1.4, margin: 0, letterSpacing: '-0.05px',
        }}>
          {q.quoteText?.slice(0, 36)}…
        </p>
      </div>
    );
  }

  if (q.imageUrl) {
    return (
      <div style={{
        width: 64, height: 64,
        borderRadius: 14,
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: '0 4px 14px rgba(20,20,18,0.15)',
      }}>
        <img
          src={q.imageUrl}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    );
  }

  // No image — show a subtle board icon
  return (
    <div style={{
      width: 64, height: 64,
      borderRadius: 14,
      backgroundColor: B.card,
      border: `1.5px solid ${B.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="2" stroke={B.inkFaint} strokeWidth="1.3" />
        <rect x="12" y="3" width="7" height="7" rx="2" stroke={B.inkFaint} strokeWidth="1.3" />
        <rect x="3" y="12" width="7" height="7" rx="2" stroke={B.inkFaint} strokeWidth="1.3" />
        <rect x="12" y="12" width="7" height="7" rx="2" stroke={B.inkFaint} strokeWidth="1.3" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  PROGRESS DOTS
// ─────────────────────────────────────────────────────────────
function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div
              key={i}
              style={{
                width: active ? 20 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: done || active ? B.bronze : B.border,
                opacity: done ? 0.55 : 1,
                transition: 'width 0.28s cubic-bezier(0.22,1,0.36,1), background-color 0.2s ease',
              }}
            />
          );
        })}
      </div>
      <span style={{
        fontFamily: sansHN, fontSize: 11, fontWeight: 400,
        color: B.inkFaint, letterSpacing: '0.04em',
      }}>
        {current + 1} of {total}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export function MoodboardQuestionnaireScreen() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [animating, setAnimating] = useState(false);

  const q = QUESTIONS[index];
  const answer = answers[q.id] ?? '';
  const wordCount = answer.trim() === '' ? 0 : answer.trim().split(/\s+/).length;
  const hasAnswer = wordCount > 0;
  const isLast = index === TOTAL - 1;

  const handleBack = () => {
    if (index > 0) {
      setAnimating(true);
      setTimeout(() => { setIndex(i => i - 1); setAnimating(false); }, 180);
    } else {
      navigate('/moodboard');
    }
  };

  const handleContinue = () => {
    if (!hasAnswer) return;
    if (isLast) {
      navigate('/prioritize');
    } else {
      setAnimating(true);
      setTimeout(() => { setIndex(i => i + 1); setAnimating(false); }, 180);
    }
  };

  return (
    <div style={{
      minHeight: '100%',
      backgroundColor: B.bg,
      display: 'flex', flexDirection: 'column',
      fontFamily: sansHN,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Grain />

      {/* ── Top bar — back arrow ── */}
      <div style={{ padding: '18px 24px 0', position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <button
          onClick={handleBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '8px 0', display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 4L7 10L13 16" stroke={B.inkLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Main content ── */}
      <div
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          padding: '10px 28px 0',
          position: 'relative', zIndex: 1,
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(6px)' : 'translateY(0)',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
        }}
      >
        {/* Bronze small-caps label */}
        <p style={{
          fontFamily: sansHN, fontSize: 10, fontWeight: 500,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: B.bronze, margin: '0 0 22px 0',
        }}>
          Based on your board
        </p>

        {/* Question — the hero */}
        <h2 style={{
          fontFamily: serif, fontSize: 30, fontWeight: 400,
          fontStyle: 'italic', color: B.ink,
          lineHeight: 1.28, letterSpacing: '-0.5px',
          margin: '0 0 24px 0',
        }}>
          {q.question}
        </h2>

        {/* Thumbnail */}
        <div style={{ marginBottom: 26 }}>
          <Thumbnail q={q} />
        </div>

        {/* Text input card */}
        <div style={{
          backgroundColor: B.card,
          borderRadius: 22,
          border: `1.5px solid ${B.border}`,
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(20,20,18,0.06)',
          position: 'relative',
        }}>
          <textarea
            key={q.id}
            value={answer}
            onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
            placeholder="Write freely..."
            style={{
              width: '100%',
              minHeight: 160,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              padding: '22px 22px 12px',
              fontFamily: sansHN, fontSize: 15, fontWeight: 400,
              color: B.ink,
              lineHeight: 1.65,
              resize: 'none',
              boxSizing: 'border-box',
              letterSpacing: '0.005em',
            }}
          />

          {/* Meta bar */}
          <div style={{
            borderTop: `1px solid ${B.borderLight}`,
            padding: '10px 22px 14px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{
              fontFamily: sansHN, fontSize: 11, fontWeight: 400,
              color: wordCount > 0 ? B.bronze : B.inkFaint,
              letterSpacing: '0.02em',
              transition: 'color 0.2s ease',
            }}>
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </span>
            <span style={{
              fontFamily: sansHN, fontSize: 11, fontWeight: 400,
              color: B.inkFaint, fontStyle: 'italic',
              letterSpacing: '0.01em',
            }}>
              You can refine later
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom area — progress + CTA ── */}
      <div style={{
        padding: '20px 28px 34px',
        position: 'relative', zIndex: 1, flexShrink: 0,
      }}>
        {/* Progress dots */}
        <div style={{ marginBottom: 18 }}>
          <ProgressDots current={index} total={TOTAL} />
        </div>

        {/* Continue CTA */}
        <button
          onClick={handleContinue}
          disabled={!hasAnswer}
          style={{
            width: '100%',
            backgroundColor: hasAnswer ? B.bronze : B.card,
            color: hasAnswer ? '#F5EDD8' : B.inkFaint,
            border: hasAnswer ? 'none' : `1.5px solid ${B.border}`,
            borderRadius: 22,
            padding: '20px 28px',
            fontFamily: sansHN, fontSize: 16, fontWeight: 500,
            letterSpacing: '0.01em',
            cursor: hasAnswer ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: hasAnswer ? '0 4px 20px rgba(139,115,85,0.28)' : 'none',
            transition: 'background-color 0.22s ease, color 0.22s ease, box-shadow 0.22s ease',
          }}
          onMouseDown={e => { if (hasAnswer) { e.currentTarget.style.transform = 'scale(0.985)'; } }}
          onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <span>{isLast ? 'Finish' : 'Continue'}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 9h10M9 4l5 5-5 5"
              stroke={hasAnswer ? '#F5EDD8' : B.inkFaint}
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
