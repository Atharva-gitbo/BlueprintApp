import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { B, serif, sansHN } from '../blueprint-theme';

// ─────────────────────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────────────────────
const CARD_H = 90;
const GAP    = 10;
const SLOT   = CARD_H + GAP;   // 100px per slot
const N      = 5;

const CHARCOAL   = '#1C1C1A';
const WARM_WHITE = '#F2EDE4';
const BRONZE     = '#8B7355';
const W_35       = 'rgba(242,237,228,0.35)';
const W_25       = 'rgba(242,237,228,0.25)';

// Bronze rank opacity: full at #1, near-invisible at #5
const RANK_ALPHA = [1.0, 0.68, 0.40, 0.20, 0.10];

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// ─────────────────────────────────────────────────────────────
//  DATA
// ────────────────────────────────────────────────────────────
type Area = { id: string; label: string; insight: string };

const INITIAL: Area[] = [
  { id: 'place',       label: 'Place',           insight: 'A walkable city, close to nature.' },
  { id: 'experiences', label: 'Experiences',      insight: 'Travel, live music, meaningful adventure.' },
  { id: 'work',        label: 'Work & Time',      insight: 'Creative work with flexibility and ownership.' },
  { id: 'identity',    label: 'Identity',         insight: 'Someone curious, authentic, and present.' },
  { id: 'financial',   label: 'Financial Health', insight: 'Freedom and security, not excess.' },
];

// ─────────────────────────────────────────────────────────────
//  DRAG MATH
//  All cards: position absolute, top 0, translateY is the ONLY
//  positional axis. This prevents any jump on reorder.
// ─────────────────────────────────────────────────────────────

/**
 * Where should card[cardIdx] visually appear while dragging?
 * Removes the dragged card from the sequence, then opens a
 * gap at insertIdx for where it will land.
 */
function visualSlot(cardIdx: number, fromIdx: number, insertIdx: number): number {
  // position in the sequence without the dragged card
  const seqPos = cardIdx < fromIdx ? cardIdx : cardIdx - 1;
  // open a gap at insertIdx
  return seqPos >= insertIdx ? seqPos + 1 : seqPos;
}

// ─────────────────────────────────────────────────────────────
//  ICONS
// ─────────────────────────────────────────────────────────────
function AreaIcon({ id }: { id: string }) {
  const p = {
    stroke: W_25,
    strokeWidth: '1.5',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (id) {
    case 'place':
      return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2C7.2 2 5 4.2 5 7c0 4.5 5 11 5 11s5-6.5 5-11c0-2.8-2.2-5-5-5z" {...p}/><circle cx="10" cy="7" r="2" {...p}/></svg>;
    case 'experiences':
      return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 16l5-7 4 5 3-5 4 7H2z" {...p}/><circle cx="15" cy="4.5" r="1.5" {...p}/></svg>;
    case 'work':
      return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="7" width="14" height="10" rx="2.5" {...p}/><path d="M7.5 7V5.5A1.5 1.5 0 0 1 9 4h2a1.5 1.5 0 0 1 1.5 1.5V7" {...p}/><path d="M3 12h14" {...p}/></svg>;
    case 'identity':
      return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7.5" r="3.5" {...p}/><path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" {...p}/></svg>;
    case 'financial':
      return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" {...p}/><path d="M10 6.5v7" {...p}/><path d="M8 8.5a2 2 0 1 1 4 0c0 1.1-2 2-2 2s-2 .9-2 2a2 2 0 1 0 4 0" {...p}/></svg>;
    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────
//  GRAIN
// ─────────────────────────────────────────────────────────────
function BgGrain() {
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.038, zIndex:0 }} xmlns="http://www.w3.org/2000/svg">
      <filter id="pgbg"><feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
      <rect width="100%" height="100%" filter="url(#pgbg)"/>
    </svg>
  );
}

function CardGrain({ n }: { n: number }) {
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.065, zIndex:0, borderRadius: 22 }} xmlns="http://www.w3.org/2000/svg">
      <filter id={`pgcg${n}`}><feTurbulence type="fractalNoise" baseFrequency="0.60" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
      <rect width="100%" height="100%" filter={`url(#pgcg${n})`}/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
//  MAIN SCREEN
// ─────────────────────────────────────────────────────────────
export function PrioritizeGoalsScreen() {
  const navigate = useNavigate();

  // Committed order — only mutates on drop
  const [items, setItems] = useState<Area[]>([...INITIAL]);

  // Render counter — lets us force re-render from ref-based drag state
  const [, setTick] = useState(0);
  const rerender = useCallback(() => setTick(t => t + 1), []);

  // Drag state in a ref — reads are always fresh in event handlers
  const drag = useRef<{
    fromIdx:    number;
    startY:     number;   // e.clientY at pointerdown
    currentY:   number;   // e.clientY at latest pointermove
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Derived values for render
  const isDragging  = drag.current !== null;
  const fromIdx     = drag.current?.fromIdx ?? 0;
  const rawDy       = drag.current ? drag.current.currentY - drag.current.startY : 0;
  const clampedDy   = isDragging
    ? clamp(rawDy, -fromIdx * SLOT, (N - 1 - fromIdx) * SLOT)
    : 0;
  const insertIdx   = isDragging
    ? clamp(Math.round(fromIdx + clampedDy / SLOT), 0, N - 1)
    : 0;

  // ── Pointer down on a card ──────────────────────────────
  const handleCardDown = useCallback((e: React.PointerEvent, idx: number) => {
    if (drag.current) return;
    e.preventDefault();
    e.stopPropagation();

    // Capture on the CONTAINER so move/up fire there even if pointer leaves
    containerRef.current?.setPointerCapture(e.pointerId);

    drag.current = {
      fromIdx:  idx,
      startY:   e.clientY,
      currentY: e.clientY,
    };
    rerender();
  }, [rerender]);

  // ── Pointer move on container ────────────────────────────
  const handleContainerMove = useCallback((e: React.PointerEvent) => {
    if (!drag.current) return;
    drag.current = { ...drag.current, currentY: e.clientY };
    rerender();
  }, [rerender]);

  // ── Pointer up on container ──────────────────────────────
  const handleContainerUp = useCallback(() => {
    const d = drag.current;
    if (!d) return;

    // Compute target slot from clamped dy
    const dy     = clamp(d.currentY - d.startY, -d.fromIdx * SLOT, (N - 1 - d.fromIdx) * SLOT);
    const target = clamp(Math.round(d.fromIdx + dy / SLOT), 0, N - 1);

    drag.current = null;

    setItems(prev => {
      if (target === d.fromIdx) return prev;
      const next = [...prev];
      const [moved] = next.splice(d.fromIdx, 1);
      next.splice(target, 0, moved);
      return next;
    });

    rerender();
  }, [rerender]);

  // ────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: '100%',
        backgroundColor: B.bg,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: sansHN,
        position: 'relative',
      }}
    >
      <BgGrain />

      {/* ── Back arrow ── */}
      <div style={{ padding: '18px 24px 0', position: 'relative', zIndex: 2, flexShrink: 0 }}>
        <button
          onClick={() => navigate('/home')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '8px 0', display: 'flex', alignItems: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 4L7 10L13 16" stroke={B.inkLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* ── Headline ── */}
      <div style={{ padding: '8px 28px 22px', position: 'relative', zIndex: 2, flexShrink: 0 }}>
        <h1 style={{
          fontFamily: serif, fontSize: 34, fontWeight: 400,
          fontStyle: 'italic', color: B.ink,
          lineHeight: 1.18, letterSpacing: '-0.55px',
          margin: '0 0 8px',
        }}>
          What matters most<br/>right now?
        </h1>
        <p style={{
          fontFamily: sansHN, fontSize: 14, fontWeight: 400,
          color: B.inkLight, lineHeight: 1.5,
          margin: 0, letterSpacing: '0.01em',
        }}>
          Drag to rank. Be honest, not aspirational.
        </p>
      </div>

      {/* ── Card list ── */}
      <div
        ref={containerRef}
        onPointerMove={handleContainerMove}
        onPointerUp={handleContainerUp}
        onPointerCancel={handleContainerUp}
        style={{
          position: 'relative',
          // Height fits exactly N cards + gaps
          height: N * SLOT - GAP,
          margin: '0 20px',
          zIndex: 3,
          flexShrink: 0,
          touchAction: 'none',
          // Overflow visible so the lifted card's shadow isn't clipped
          overflow: 'visible',
        }}
      >
        {items.map((area, idx) => {
          const isLifted = isDragging && idx === fromIdx;

          // Compute translateY
          let ty: number;
          if (!isDragging) {
            ty = idx * SLOT;
          } else if (isLifted) {
            ty = clamp(fromIdx * SLOT + clampedDy, 0, (N - 1) * SLOT);
          } else {
            ty = visualSlot(idx, fromIdx, insertIdx) * SLOT;
          }

          // Compute visual rank (live)
          let rank: number;
          if (!isDragging) {
            rank = idx + 1;
          } else if (isLifted) {
            rank = insertIdx + 1;
          } else {
            rank = visualSlot(idx, fromIdx, insertIdx) + 1;
          }

          const rankAlpha = RANK_ALPHA[rank - 1] ?? 0.10;

          // Transitions:
          // - Lifted card: no transform transition (instant follow), only shadow
          // - Others while dragging: quick spring to part fluidly
          // - All cards after drop: relaxed spring settle
          let transition: string;
          if (isLifted) {
            transition = 'box-shadow 0.18s ease, transform 0.0s';
          } else if (isDragging) {
            transition = 'transform 0.26s cubic-bezier(0.34, 1.5, 0.64, 1)';
          } else {
            transition = 'transform 0.44s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease';
          }

          return (
            <div
              key={area.id}
              onPointerDown={(e) => handleCardDown(e, idx)}
              style={{
                // Fixed positioning via transform only — top never changes
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: CARD_H,
                borderRadius: 22,
                backgroundColor: CHARCOAL,
                overflow: 'hidden',
                cursor: isLifted ? 'grabbing' : 'grab',
                userSelect: 'none',
                touchAction: 'none',
                zIndex: isLifted ? 20 : (isDragging ? 1 : 1),
                willChange: isLifted ? 'transform' : 'auto',
                transform: `translateY(${ty}px) scale(${isLifted ? 1.028 : 1})`,
                boxShadow: isLifted
                  ? '0 28px 80px rgba(0,0,0,0.60), 0 10px 30px rgba(0,0,0,0.38), 0 3px 8px rgba(0,0,0,0.22)'
                  : '0 4px 18px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.14)',
                transition,
              }}
            >
              {/* Card grain overlay */}
              <CardGrain n={idx} />

              {/* Bronze left-edge accent — only for rank 1 */}
              {rank === 1 && !isLifted && (
                <div style={{
                  position: 'absolute', left: 0, top: '18%', height: '64%',
                  width: 3, borderRadius: '0 2px 2px 0',
                  backgroundColor: BRONZE, opacity: 0.80, zIndex: 2,
                  transition: 'opacity 0.2s ease',
                }} />
              )}

              {/* Card body */}
              <div style={{
                position: 'relative', zIndex: 2,
                height: '100%', display: 'flex', alignItems: 'center',
                padding: '0 22px 0 28px',
                gap: 14,
                boxSizing: 'border-box',
              }}>
                {/* Bronze rank number */}
                <span style={{
                  fontFamily: sansHN,
                  fontSize: 16, fontWeight: 600,
                  color: BRONZE,
                  opacity: rankAlpha,
                  minWidth: 18,
                  flexShrink: 0,
                  letterSpacing: '-0.3px',
                  transition: isDragging ? 'opacity 0.22s ease' : 'opacity 0.38s ease',
                }}>
                  {rank}
                </span>

                {/* Text block */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: serif,
                    fontSize: 22, fontWeight: 400,
                    fontStyle: 'italic',
                    color: WARM_WHITE,
                    margin: '0 0 5px',
                    letterSpacing: '-0.3px', lineHeight: 1.08,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {area.label}
                  </p>
                  <p style={{
                    fontFamily: sansHN,
                    fontSize: 12, fontWeight: 400,
                    color: W_35,
                    margin: 0, lineHeight: 1.4,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {area.insight}
                  </p>
                </div>

                {/* Area icon */}
                <div style={{ flexShrink: 0 }}>
                  <AreaIcon id={area.id} />
                </div>

                {/* Drag handle — three horizontal lines */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 18, height: 1.5,
                      backgroundColor: WARM_WHITE,
                      borderRadius: 1,
                      opacity: 0.25,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Spacer ── */}
      <div style={{ flex: 1 }} />

      {/* ── Bottom CTA ── */}
      <div style={{ padding: '20px 24px 40px', position: 'relative', zIndex: 2, flexShrink: 0 }}>
        <button
          onClick={() => navigate('/home')}
          style={{
            width: '100%',
            backgroundColor: B.ink,
            color: WARM_WHITE,
            border: 'none',
            borderRadius: 20,
            padding: '20px 28px',
            fontFamily: sansHN,
            fontSize: 16, fontWeight: 500,
            letterSpacing: '0.01em',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 4px 20px rgba(20,20,18,0.18)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseDown={e => {
            e.currentTarget.style.transform = 'scale(0.987)';
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(20,20,18,0.12)';
          }}
          onMouseUp={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(20,20,18,0.18)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(20,20,18,0.18)';
          }}
        >
          <span>This feels right</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 9h10M9 4l5 5-5 5" stroke={WARM_WHITE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}