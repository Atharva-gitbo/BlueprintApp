import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { B, serif, sansHN } from '../blueprint-theme';

// ─────────────────────────────────────────────────────────────
//  TYPES & DATA
// ─────────────────────────────────────────────────────────────
type Status = 'on-track' | 'drifting' | 'gap';

interface AreaCard {
  id: string;
  label: string;
  vision: string;
  status: Status;
}

const AREAS: AreaCard[] = [
  {
    id: 'experiences',
    label: 'Experiences',
    vision: 'One big trip a year, more live music, less scrolling.',
    status: 'on-track',
  },
  {
    id: 'place',
    label: 'Place',
    vision: 'A walkable city, close to nature and the mountains.',
    status: 'gap',
  },
  {
    id: 'work',
    label: 'Work & Time',
    vision: 'Creative work I own, four days a week, mornings protected.',
    status: 'drifting',
  },
  {
    id: 'identity',
    label: 'Identity',
    vision: 'Someone who follows through and stays genuinely curious.',
    status: 'on-track',
  },
  {
    id: 'financial',
    label: 'Financial Health',
    vision: 'Six months runway, investing steadily, no lifestyle debt.',
    status: 'drifting',
  },
];

interface WeeklyAction {
  id: string;
  tag: string;
  title: string;
}

const WEEKLY_ACTIONS: WeeklyAction[] = [
  { id: 'w1', tag: 'Financial',    title: 'Review investment allocation' },
  { id: 'w2', tag: 'Life Design',  title: 'Block two mornings next week' },
];

// ─────────────────────────────────────────────────────────────
//  STATUS CONFIG
// ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<Status, { color: string; label: string; cardTint: string }> = {
  'on-track': {
    color:    '#6B9E74',
    label:    'On Track',
    cardTint: 'transparent',
  },
  'drifting': {
    color:    '#C9935A',
    label:    'Drifting',
    cardTint: 'rgba(201,147,90,0.055)',
  },
  'gap': {
    color:    '#C47060',
    label:    'Gap',
    cardTint: 'rgba(196,112,96,0.065)',
  },
};

// ─────────────────────────────────────────────────────────────
//  GRAIN
// ─────────────────────────────────────────────────────────────
function BgGrain() {
  return (
    <svg
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', opacity: 0.036, zIndex: 0,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="chgrain">
        <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#chgrain)"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
//  AREA CARD
// ─────────────────────────────────────────────────────────────
function AreaCardItem({ area, onTap }: { area: AreaCard; onTap: () => void }) {
  const [pressed, setPressed] = useState(false);
  const cfg = STATUS_CONFIG[area.status];

  return (
    <button
      onClick={onTap}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        width: '100%',
        background: cfg.cardTint !== 'transparent'
          ? `linear-gradient(135deg, ${cfg.cardTint}, transparent 70%), ${B.card}`
          : B.card,
        border: 'none',
        borderRadius: 18,
        padding: '18px 20px 17px',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        boxSizing: 'border-box',
        boxShadow: pressed
          ? '0 1px 4px rgba(28,28,26,0.06)'
          : '0 2px 8px rgba(28,28,26,0.06), 0 6px 20px rgba(28,28,26,0.06)',
        transform: pressed ? 'scale(0.992)' : 'scale(1)',
        transition: 'transform 0.13s ease, box-shadow 0.13s ease',
      }}
    >
      {/* Text block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Area label — small caps */}
        <span style={{
          fontFamily: sansHN,
          fontSize: 10,
          fontWeight: 500,
          color: B.inkLight,
          letterSpacing: '0.11em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 7,
        }}>
          {area.label}
        </span>

        {/* Vision — italic serif, the hero */}
        <p style={{
          fontFamily: serif,
          fontSize: 17,
          fontWeight: 400,
          fontStyle: 'italic',
          color: B.inkMid,
          lineHeight: 1.40,
          letterSpacing: '-0.15px',
          margin: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {area.vision}
        </p>
      </div>

      {/* Status + chevron */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 6,
        flexShrink: 0,
      }}>
        {/* Dot + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: cfg.color,
          }} />
          <span style={{
            fontFamily: sansHN,
            fontSize: 10.5,
            fontWeight: 400,
            color: cfg.color,
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
          }}>
            {cfg.label}
          </span>
        </div>

        {/* Chevron */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 3l4 4-4 4" stroke={B.inkFaint} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
//  ACTION PILL
// ─────────────────────────────────────────────────────────────
function ActionPill({ action, onTap }: { action: WeeklyAction; onTap: () => void }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onTap}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        flex: 1,
        backgroundColor: B.card,
        border: `1px solid ${B.borderLight}`,
        borderRadius: 14,
        padding: '13px 14px',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        boxSizing: 'border-box',
        boxShadow: pressed
          ? 'none'
          : '0 1px 4px rgba(28,28,26,0.05), 0 3px 10px rgba(28,28,26,0.04)',
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.12s ease, box-shadow 0.12s ease',
        minWidth: 0,
      }}
    >
      <span style={{
        fontFamily: sansHN,
        fontSize: 9.5,
        fontWeight: 500,
        color: B.bronze,
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
      }}>
        {action.tag}
      </span>
      <span style={{
        fontFamily: sansHN,
        fontSize: 12.5,
        fontWeight: 400,
        color: B.inkMid,
        lineHeight: 1.35,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {action.title}
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
//  BOTTOM NAV
// ─────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Pulse',      path: '/home' },
  { label: 'Directions', path: '/directions' },
  { label: 'Reflect',    path: '/reflect' },
  { label: 'Insights',   path: '/insights' },
];

function BottomNav() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const active    = location.pathname;

  return (
    <div style={{
      position: 'relative',
      zIndex: 10,
      flexShrink: 0,
      borderTop: `1px solid ${B.borderLight}`,
      backgroundColor: B.bg,
      padding: '14px 0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
    }}>
      {NAV_ITEMS.map(item => {
        const isActive = active === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
              fontFamily: sansHN,
              fontSize: 12.5,
              fontWeight: isActive ? 500 : 400,
              color: isActive ? B.bronze : B.inkLight,
              letterSpacing: isActive ? '0.01em' : '0.005em',
              transition: 'color 0.15s ease',
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  MAIN SCREEN
// ─────────────────────────────────────────────────────────────
export function CanvasHomeScreen() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100%',
      backgroundColor: B.bg,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: sansHN,
      position: 'relative',
    }}>
      <BgGrain />

      {/* ── Scrollable body ── */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 2 }}>

        {/* ── Greeting + headline ── */}
        <div style={{ padding: '42px 26px 28px' }}>
          <p style={{
            fontFamily: sansHN,
            fontSize: 14,
            fontWeight: 400,
            color: B.inkLight,
            margin: '0 0 10px',
            letterSpacing: '0.01em',
          }}>
            Good morning, Alex.
          </p>
          <h1 style={{
            fontFamily: serif,
            fontSize: 38,
            fontWeight: 400,
            fontStyle: 'italic',
            color: B.ink,
            lineHeight: 1.15,
            letterSpacing: '-0.65px',
            margin: 0,
          }}>
            Your canvas.
          </h1>
        </div>

        {/* ── Area cards ── */}
        <div style={{
          padding: '0 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          {AREAS.map(area => (
            <AreaCardItem
              key={area.id}
              area={area}
              onTap={() => navigate(`/area/${area.id}`)}
            />
          ))}
        </div>

        {/* ── This week ── */}
        <div style={{ padding: '32px 18px 28px' }}>
          {/* Section label */}
          <span style={{
            fontFamily: sansHN,
            fontSize: 10,
            fontWeight: 500,
            color: B.bronze,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 14,
            opacity: 0.85,
          }}>
            This week
          </span>

          {/* Action pills */}
          <div style={{ display: 'flex', gap: 10 }}>
            {WEEKLY_ACTIONS.map(action => (
              <ActionPill
                key={action.id}
                action={action}
                onTap={() => navigate('/weekly')}
              />
            ))}
          </div>
        </div>

      </div>

      {/* ── Bottom nav ── */}
      <BottomNav />
    </div>
  );
}