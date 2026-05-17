import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { BP, fontUI } from '../blueprint-theme';

const SEEDS = [
  'Health', 'Calmness', 'Creativity', 'Relationships',
  'Financial freedom', 'Stability', 'Exploration', 'Confidence',
  'Flexibility', 'Learning', 'Recovery', 'Purpose',
];

const GROUNDING_OPTIONS = [
  'Quiet, undistracted time',
  'A clearer sense of direction',
  'Trust in my own pace',
  'Less noise',
];

const PHILOSOPHY_LINES = [
  'Blueprint evolves with you.',
  'Changing priorities are normal.',
  'Drift is information, not failure.',
  'You are not locked into the version of life you define today.',
];

// ─── Step 0 — Opening Philosophy ───────────────────────────
function Step0({ onBegin, onExplore }: { onBegin: () => void; onExplore: () => void }) {
  return (
    <div style={{ flex: 1, padding: '0 28px 44px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <svg width="42" height="14" viewBox="0 0 42 14" style={{ marginBottom: 36, opacity: 0.45 }}>
          <path d="M1 7 Q 11 0, 21 7 T 41 7" stroke={BP.ink} strokeWidth="1" fill="none" strokeLinecap="round"/>
        </svg>
        <div style={{
          fontFamily: fontUI, fontSize: 36, fontWeight: 300, lineHeight: 1.12,
          color: BP.ink, letterSpacing: '-0.7px', maxWidth: 320,
        }}>
          A meaningful future should still feel like{' '}
          <span style={{ fontWeight: 500 }}>you</span>.
        </div>
        <p style={{
          fontFamily: fontUI, fontSize: 15, fontWeight: 300, color: BP.ink2,
          lineHeight: 1.6, marginTop: 28, maxWidth: 300, letterSpacing: '-0.1px',
        }}>
          Blueprint helps you grow intentionally — through reflection, behavior, and direction that evolves with who you&rsquo;re becoming.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={onBegin}
          style={{
            width: '100%', height: 54, borderRadius: 999,
            background: BP.ink, color: BP.paper,
            border: 'none', fontFamily: fontUI, fontSize: 16,
            fontWeight: 500, cursor: 'pointer', letterSpacing: '-0.1px',
          }}
        >
          Begin
        </button>
        <button
          onClick={onExplore}
          style={{
            background: 'transparent', border: 0, padding: 10,
            cursor: 'pointer', fontSize: 14.5, fontWeight: 400,
            color: BP.ink3, letterSpacing: '-0.05px', fontFamily: fontUI,
          }}
        >
          Explore first
        </button>
      </div>
    </div>
  );
}

// ─── Step 1 — Direction Selection ──────────────────────────
function Step1({
  selections, toggle, onContinue, onSkip,
}: {
  selections: Set<string>;
  toggle: (s: string) => void;
  onContinue: () => void;
  onSkip: () => void;
}) {
  const count = selections.size;
  const ok = count >= 2;

  return (
    <div style={{ flex: 1, padding: '40px 28px 32px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontFamily: fontUI, fontSize: 26, fontWeight: 300, lineHeight: 1.18, letterSpacing: '-0.4px', color: BP.ink, maxWidth: 300 }}>
        What feels important right now?
      </div>
      <p style={{ fontFamily: fontUI, fontSize: 13.5, fontWeight: 300, color: BP.ink3, lineHeight: 1.6, margin: '14px 0 0', maxWidth: 320, letterSpacing: '-0.05px' }}>
        Choose a few. These aren&rsquo;t goals — just where your attention wants to settle. They will change.
      </p>

      <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {SEEDS.map(s => {
          const on = selections.has(s);
          return (
            <button
              key={s}
              onClick={() => toggle(s)}
              style={{
                background: on ? BP.ink : 'transparent',
                color: on ? BP.paper : BP.ink,
                border: `0.5px solid ${on ? BP.ink : 'rgba(26,22,18,0.18)'}`,
                borderRadius: 999, padding: '10px 16px',
                fontSize: 14, fontWeight: on ? 500 : 400,
                letterSpacing: '-0.1px', cursor: 'pointer',
                transition: 'all 240ms ease', fontFamily: fontUI,
              }}
            >
              {s}
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />
      <div style={{
        fontFamily: fontUI, fontSize: 12, color: BP.ink4, letterSpacing: '0.3px',
        textAlign: 'center', marginBottom: 14,
        opacity: count > 0 ? 1 : 0, transition: 'opacity 400ms ease',
      }}>
        {count} of 4 · feel free to pick fewer
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={onSkip}
          style={{
            height: 54, borderRadius: 999, padding: '0 24px',
            background: 'transparent', color: BP.ink3,
            border: '0.5px solid transparent',
            fontFamily: fontUI, fontSize: 15, fontWeight: 400, cursor: 'pointer',
          }}
        >
          Skip
        </button>
        <button
          onClick={ok ? onContinue : undefined}
          style={{
            flex: 1, height: 54, borderRadius: 999,
            background: BP.ink, color: BP.paper, border: 'none',
            fontFamily: fontUI, fontSize: 16, fontWeight: 500,
            cursor: ok ? 'pointer' : 'default',
            opacity: ok ? 1 : 0.45, transition: 'opacity 300ms ease',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// ─── Step 2 — Gentle Grounding ─────────────────────────────
function Step2({
  selected, setSelected, text, setText, onContinue,
}: {
  selected: string | null;
  setSelected: (s: string | null) => void;
  text: string;
  setText: (t: string) => void;
  onContinue: () => void;
}) {
  return (
    <div style={{ flex: 1, padding: '40px 28px 32px', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        fontSize: 11, fontWeight: 590, letterSpacing: '1.2px', textTransform: 'uppercase',
        color: BP.ink4, fontFamily: fontUI, marginBottom: 18,
      }}>
        One small question
      </div>
      <div style={{ fontFamily: fontUI, fontSize: 26, fontWeight: 300, lineHeight: 1.18, letterSpacing: '-0.4px', color: BP.ink, maxWidth: 320 }}>
        What do you want more{' '}
        <span style={{ fontWeight: 500 }}>space</span> for?
      </div>
      <p style={{ fontFamily: fontUI, fontSize: 13.5, fontWeight: 300, color: BP.ink3, lineHeight: 1.6, margin: '14px 0 0', maxWidth: 320, letterSpacing: '-0.05px' }}>
        Optional. Blueprint will hold your answer quietly — never to grade you against it.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 28 }}>
        {GROUNDING_OPTIONS.map(o => {
          const on = selected === o;
          return (
            <button
              key={o}
              onClick={() => { setSelected(o); setText(''); }}
              style={{
                textAlign: 'left', cursor: 'pointer', padding: '14px 18px',
                background: on ? BP.ink : BP.card, color: on ? BP.paper : BP.ink,
                border: `0.5px solid ${on ? BP.ink : BP.hairline}`,
                borderRadius: 14, fontSize: 15, fontWeight: on ? 500 : 400,
                letterSpacing: '-0.15px', transition: 'background 240ms ease, color 240ms ease',
                fontFamily: fontUI,
              }}
            >
              {o}
            </button>
          );
        })}
      </div>

      <input
        value={text}
        onChange={e => { setText(e.target.value); if (e.target.value) setSelected(null); }}
        placeholder="Or write a few words…"
        style={{
          marginTop: 18, width: '100%', background: 'transparent',
          border: 0, borderBottom: `0.5px solid ${BP.hairline}`,
          padding: '12px 4px', fontFamily: fontUI, fontSize: 14.5,
          fontWeight: 300, color: BP.ink, letterSpacing: '-0.1px', outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={onContinue} style={{ height: 54, borderRadius: 999, padding: '0 24px', background: 'transparent', color: BP.ink3, border: 0, fontFamily: fontUI, fontSize: 15, fontWeight: 400, cursor: 'pointer' }}>
          Skip for now
        </button>
        <button onClick={onContinue} style={{ flex: 1, height: 54, borderRadius: 999, background: BP.ink, color: BP.paper, border: 'none', fontFamily: fontUI, fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>
          Continue
        </button>
      </div>
    </div>
  );
}

// ─── Step 3 — Philosophy (dark screen) ─────────────────────
function Step3({ onContinue }: { onContinue: () => void }) {
  const [reveal, setReveal] = useState(1);

  useEffect(() => {
    if (reveal >= PHILOSOPHY_LINES.length) return;
    const t = setTimeout(() => setReveal(r => r + 1), 1400);
    return () => clearTimeout(t);
  }, [reveal]);

  const done = reveal >= PHILOSOPHY_LINES.length;

  return (
    <div
      onClick={() => !done && setReveal(PHILOSOPHY_LINES.length)}
      style={{ flex: 1, padding: '60px 28px 36px', display: 'flex', flexDirection: 'column', cursor: done ? 'default' : 'pointer' }}
    >
      <div style={{ fontSize: 11, fontWeight: 590, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(244,239,230,0.5)', fontFamily: fontUI, marginBottom: 32 }}>
        How Blueprint thinks
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
        {PHILOSOPHY_LINES.map((line, i) => (
          <div key={i} style={{
            fontFamily: fontUI,
            fontSize: i === PHILOSOPHY_LINES.length - 1 ? 18 : 22,
            fontWeight: i === PHILOSOPHY_LINES.length - 1 ? 300 : 400,
            lineHeight: 1.28, color: '#F4EFE6',
            letterSpacing: '-0.3px', maxWidth: 320,
            opacity: i < reveal ? 1 : 0,
            transform: i < reveal ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 900ms ease, transform 900ms ease',
          }}>
            {line}
          </div>
        ))}
      </div>
      <button
        onClick={e => { e.stopPropagation(); if (done) onContinue(); }}
        style={{
          alignSelf: 'stretch', height: 54, borderRadius: 999,
          background: done ? '#F4EFE6' : 'transparent',
          color: done ? BP.ink : 'rgba(244,239,230,0.5)',
          border: done ? '0.5px solid transparent' : '0.5px solid rgba(244,239,230,0.18)',
          fontFamily: fontUI, fontSize: 16, fontWeight: 500, letterSpacing: '-0.1px',
          cursor: done ? 'pointer' : 'default',
          transition: 'background 700ms ease, color 700ms ease',
        }}
      >
        {done ? 'I understand' : 'Reading…'}
      </button>
    </div>
  );
}

// ─── Step 4 — Entry Transition ──────────────────────────────
function Step4({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1500);
    const t2 = setTimeout(() => onDone(), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '60px 32px',
      opacity: fading ? 0 : 1, filter: fading ? 'blur(6px)' : 'blur(0px)',
      transition: 'opacity 900ms ease, filter 900ms ease',
    }}>
      <div style={{
        width: 14, height: 14, borderRadius: 14, background: BP.ink, opacity: 0.7,
        marginBottom: 40, animation: 'bpBreath 2200ms ease-in-out infinite',
      }} />
      <div style={{ fontFamily: fontUI, fontSize: 28, fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.4px', color: BP.ink, textAlign: 'center' }}>
        Welcome.
      </div>
      <div style={{ fontFamily: fontUI, fontSize: 13.5, fontWeight: 500, color: BP.ink3, marginTop: 16, letterSpacing: '0.2px', textTransform: 'uppercase' }}>
        Entering Blueprint
      </div>
    </div>
  );
}

// ─── Main Onboarding ───────────────────────────────────────
export function OnboardingNewScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Set<string>>(new Set());
  const [grounding, setGrounding] = useState<string | null>(null);
  const [groundingText, setGroundingText] = useState('');

  const toggle = (s: string) => {
    const n = new Set(selections);
    if (n.has(s)) { n.delete(s); } else if (n.size < 4) { n.add(s); }
    setSelections(n);
  };

  const next = () => setStep(s => s + 1);
  const toApp = () => navigate('/home');

  // Step 3 is dark ink background
  const bgByStep = [BP.paper, BP.paper, BP.paper, BP.ink, BP.paper];
  const isInk = step === 3;

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: bgByStep[step],
      transition: 'background 800ms ease',
    }}>
      {/* Progress dashes */}
      <div style={{ display: 'flex', gap: 5, padding: '70px 28px 0' }}>
        {[0, 1, 2, 3, 4].map(i => (
          <span key={i} style={{
            flex: 1, height: 2, borderRadius: 2, display: 'block',
            background: isInk ? '#F4EFE6' : BP.ink,
            opacity: i <= step ? 0.9 : 0.15,
            transition: 'opacity 500ms ease',
          }} />
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {step === 0 && <Step0 onBegin={next} onExplore={toApp} />}
        {step === 1 && <Step1 selections={selections} toggle={toggle} onContinue={next} onSkip={next} />}
        {step === 2 && <Step2 selected={grounding} setSelected={setGrounding} text={groundingText} setText={setGroundingText} onContinue={next} />}
        {step === 3 && <Step3 onContinue={next} />}
        {step === 4 && <Step4 onDone={toApp} />}
      </div>

      {/* Breathing keyframe */}
      <style>{`@keyframes bpBreath { 0%,100%{transform:scale(1);opacity:0.7} 50%{transform:scale(1.4);opacity:0.35} }`}</style>
    </div>
  );
}
