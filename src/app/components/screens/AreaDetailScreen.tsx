import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { B, serif, sansHN } from '../blueprint-theme';

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────
type Status = 'on-track' | 'drifting' | 'gap';

interface Task {
  id: string;
  text: string;
  context: string;
}

interface AreaData {
  label: string;
  status: Status;
  vision: string;
  writtenDate: string;
  editCount: number;
  reality: string;
  realityDate: string;
  tasks: Task[];
}

// ─────────────────────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────────────────────
const AREA_DATA: Record<string, AreaData> = {
  experiences: {
    label: 'Experiences',
    status: 'on-track',
    vision: 'One big trip a year, more live music, less scrolling.',
    writtenDate: 'Jan 12',
    editCount: 3,
    reality: 'Went to two concerts last month, booked Portugal for August. This one is actually working.',
    realityDate: 'Mar 21',
    tasks: [
      {
        id: 'e1',
        text: 'Book that next trip you\'ve been putting off.',
        context: 'Portugal is locked in. What\'s after it? You mentioned Japan last year.',
      },
      {
        id: 'e2',
        text: 'Go to one live event this month.',
        context: 'Check Resident Advisor. Something local counts — it doesn\'t need to be a festival.',
      },
      {
        id: 'e3',
        text: 'Delete one social app for 48 hours.',
        context: 'The "less scrolling" part of this canvas area still needs attention.',
      },
    ],
  },
  work: {
    label: 'Work & Time',
    status: 'drifting',
    vision: 'Creative work I own, four days a week, mornings protected.',
    writtenDate: 'Jan 12',
    editCount: 5,
    reality: 'Still in the five-day role. Mornings are getting eaten by Slack. The side project has been "almost ready" for six weeks.',
    realityDate: 'Mar 14',
    tasks: [
      {
        id: 'w1',
        text: 'Block one morning this week that\'s fully yours.',
        context: 'No meetings, no Slack. Even two hours without interruption counts.',
      },
      {
        id: 'w2',
        text: 'Identify one commitment draining your time that isn\'t on your canvas.',
        context: 'Name it. Then decide what to do with it. Naming it is half the work.',
      },
      {
        id: 'w3',
        text: 'Ship one small thing from the side project.',
        context: 'A post, a prototype, a screenshot. Break the "almost ready" loop.',
      },
    ],
  },
  place: {
    label: 'Place',
    status: 'gap',
    vision: 'A walkable city, close to nature and the mountains.',
    writtenDate: 'Jan 12',
    editCount: 2,
    reality: 'Still in London. No active plan. Keep saying "maybe next year" — which is now three years running.',
    realityDate: 'Feb 28',
    tasks: [
      {
        id: 'p1',
        text: 'Write down three cities you\'d genuinely consider living in.',
        context: 'Be honest. Not aspirational — honest. This breaks the decision block.',
      },
      {
        id: 'p2',
        text: 'Calculate the actual cost of the move.',
        context: 'The number is probably less frightening than the idea of it. Run it.',
      },
      {
        id: 'p3',
        text: 'Spend one weekend somewhere on your shortlist.',
        context: 'Live it briefly. Then decide if it\'s real or just an idea.',
      },
    ],
  },
  identity: {
    label: 'Identity',
    status: 'on-track',
    vision: 'Someone who follows through and stays genuinely curious.',
    writtenDate: 'Jan 12',
    editCount: 2,
    reality: 'Shipped three things this quarter. Reading more. Still shows up.',
    realityDate: 'Mar 20',
    tasks: [
      {
        id: 'i1',
        text: 'Finish what you started this week.',
        context: 'Follow-through is the identity. One small thing counts.',
      },
      {
        id: 'i2',
        text: 'Read something outside your usual domain.',
        context: 'Curiosity needs to be fed. Something totally unrelated to work.',
      },
      {
        id: 'i3',
        text: 'Reflect on one thing you\'ve changed your mind about recently.',
        context: 'Flexibility is part of this. Note it down somewhere.',
      },
    ],
  },
  financial: {
    label: 'Financial Health',
    status: 'drifting',
    vision: 'Six months runway, investing steadily, no lifestyle debt.',
    writtenDate: 'Jan 12',
    editCount: 4,
    reality: 'Have about two months runway. Investing inconsistently. One credit card that shouldn\'t exist.',
    realityDate: 'Mar 10',
    tasks: [
      {
        id: 'f1',
        text: 'Move £200 into your emergency fund this week.',
        context: 'You\'re £600 from three months of runway. Three more of these and it\'s done.',
      },
      {
        id: 'f2',
        text: 'Cancel one subscription you haven\'t used this month.',
        context: 'Frees up recurring money, no lifestyle hit.',
      },
      {
        id: 'f3',
        text: 'Set up a £50 standing order to your investment account.',
        context: 'Automate it so it doesn\'t require a decision each month.',
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
//  STATUS CONFIG
// ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  'on-track': {
    color: '#6B9E74',
    bgColor: 'rgba(107,158,116,0.09)',
    borderColor: 'rgba(107,158,116,0.28)',
    accentBorder: 'rgba(107,158,116,0.55)',
    label: 'On Track',
    summary: 'You\'re living close to what you designed.',
  },
  'drifting': {
    color: '#C9935A',
    bgColor: 'rgba(201,147,90,0.08)',
    borderColor: 'rgba(201,147,90,0.28)',
    accentBorder: 'rgba(201,147,90,0.55)',
    label: 'Drifting',
    summary: 'You\'re moving, but not quite toward what you designed.',
  },
  'gap': {
    color: '#C47060',
    bgColor: 'rgba(196,112,96,0.08)',
    borderColor: 'rgba(196,112,96,0.28)',
    accentBorder: 'rgba(196,112,96,0.55)',
    label: 'Gap',
    summary: '~2 years at current pace.',
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
        pointerEvents: 'none', opacity: 0.032, zIndex: 0,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="adgrain">
        <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#adgrain)"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
//  TASK CARD
// ─────────────────────────────────────────────────────────────
function TaskCard({
  task, areaLabel, status,
}: {
  task: Task; areaLabel: string; status: Status;
}) {
  const [done, setDone] = useState(false);
  const cfg = STATUS_CONFIG[status];

  return (
    <div
      style={{
        backgroundColor: done ? `${cfg.color}08` : B.card,
        border: `1px solid ${done ? cfg.borderColor : B.border}`,
        borderRadius: 20,
        padding: '18px 20px',
        boxShadow: done
          ? 'none'
          : '0 1px 4px rgba(28,28,26,0.05), 0 4px 16px rgba(28,28,26,0.04)',
        transition: 'all 0.25s ease',
        position: 'relative',
      }}
    >
      {/* Top row: area label + swap */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: 12,
      }}>
        <span style={{
          fontFamily: sansHN, fontSize: 10.5, fontWeight: 500,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: done ? cfg.color : B.inkFaint,
          transition: 'color 0.25s ease',
        }}>
          {done ? '✓ Done' : areaLabel}
        </span>
        {!done && (
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1.5 4h9M1.5 4L4 1.5M1.5 4L4 6.5" stroke={B.inkFaint} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.5 9H2.5M11.5 9L9 6.5M11.5 9L9 11.5" stroke={B.inkFaint} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontFamily: sansHN, fontSize: 11, fontWeight: 300, color: B.inkFaint }}>
              Swap
            </span>
          </button>
        )}
      </div>

      {/* Action text */}
      <p style={{
        fontFamily: serif, fontSize: 17, fontWeight: 400,
        color: done ? B.inkLight : B.ink,
        lineHeight: 1.48, margin: 0, letterSpacing: '-0.15px',
        textDecoration: done ? 'line-through' : 'none',
        transition: 'color 0.25s ease',
      }}>
        {task.text}
      </p>

      {/* Context */}
      {!done && (
        <p style={{
          fontFamily: sansHN, fontSize: 12.5, fontWeight: 300,
          color: B.inkLight, margin: '9px 0 0', lineHeight: 1.58,
        }}>
          {task.context}
        </p>
      )}

      {/* Mark done */}
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => setDone(v => !v)}
          style={{
            border: `1.5px solid ${done ? cfg.borderColor : B.border}`,
            borderRadius: 100, padding: '8px 20px',
            fontFamily: sansHN, fontSize: 12.5, fontWeight: 500,
            color: done ? cfg.color : B.inkMid,
            backgroundColor: done ? cfg.bgColor : 'transparent',
            cursor: 'pointer', transition: 'all 0.2s ease',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          {done ? (
            <>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1.5 5.5L4 8L9.5 2.5" stroke={cfg.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Completed
            </>
          ) : 'Mark done'}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  BLOCKING ROW (Gap state only)
// ─────────────────────────────────────────────────────────────
const GAP_BLOCKS = [
  { id: 'money',    label: 'Money',    color: '#C47060', detail: 'Moving feels financially out of reach right now.' },
  { id: 'decision', label: 'Decision', color: B.inkMid,  detail: 'No clear shortlist. The choice feels too open.' },
  { id: 'time',     label: 'Time',     color: '#C47060', detail: 'Work doesn\'t allow for a real exploration period.' },
];

function BlockingRows() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div>
      <span style={{
        fontFamily: sansHN, fontSize: 10, fontWeight: 500,
        color: B.inkFaint, letterSpacing: '0.12em', textTransform: 'uppercase',
        display: 'block', marginBottom: 10,
      }}>
        What's blocking it
      </span>
      <div style={{
        backgroundColor: B.card, borderRadius: 18,
        border: `1px solid ${B.border}`,
        overflow: 'hidden',
      }}>
        {GAP_BLOCKS.map((block, i) => {
          const isOpen = expanded === block.id;
          return (
            <React.Fragment key={block.id}>
              <button
                onClick={() => setExpanded(isOpen ? null : block.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  gap: 12, padding: '14px 18px',
                  background: isOpen ? 'rgba(196,112,96,0.05)' : 'transparent',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  transition: 'background 0.15s ease',
                }}
              >
                <div style={{
                  width: 7, height: 7, borderRadius: '50%',
                  backgroundColor: block.color, flexShrink: 0,
                }} />
                <span style={{
                  flex: 1, fontFamily: sansHN, fontSize: 13.5, fontWeight: 400,
                  color: isOpen ? block.color : B.ink, letterSpacing: '-0.05px',
                  transition: 'color 0.15s ease',
                }}>
                  {block.label}
                </span>
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}
                >
                  <path d="M5 3l4 4-4 4" stroke={B.inkFaint} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {isOpen && (
                <div style={{ padding: '2px 18px 14px 37px' }}>
                  <p style={{
                    fontFamily: sansHN, fontSize: 12.5, fontWeight: 300,
                    color: B.inkLight, margin: 0, lineHeight: 1.6,
                  }}>
                    {block.detail}
                  </p>
                </div>
              )}
              {i < GAP_BLOCKS.length - 1 && (
                <div style={{ height: 1, backgroundColor: B.borderLight, margin: '0 18px' }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  MAIN SCREEN
// ─────────────────────────────────────────────────────────────
export function AreaDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const area = AREA_DATA[id ?? ''] ?? AREA_DATA.experiences;
  const cfg = STATUS_CONFIG[area.status];

  return (
    <div style={{
      minHeight: '100%',
      backgroundColor: B.bg,
      fontFamily: sansHN,
      position: 'relative',
    }}>
      <BgGrain />

      <div style={{
        position: 'relative', zIndex: 2,
        padding: '0 22px 56px',
      }}>

        {/* ── Back nav ── */}
        <div style={{ paddingTop: 22, marginBottom: 28 }}>
          <button
            onClick={() => navigate('/home')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8L10 12" stroke={B.inkLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{
              fontFamily: sansHN, fontSize: 10.5, fontWeight: 500,
              color: B.bronze, letterSpacing: '0.10em', textTransform: 'uppercase',
            }}>
              {area.label}
            </span>
          </button>
        </div>

        {/* ── Vision block ── */}
        <div style={{
          borderLeft: `2.5px solid ${cfg.accentBorder}`,
          paddingLeft: 16, marginBottom: 10,
        }}>
          <p style={{
            fontFamily: serif, fontSize: 28, fontWeight: 400, fontStyle: 'italic',
            color: B.ink, lineHeight: 1.28, letterSpacing: '-0.4px',
            margin: 0,
          }}>
            {area.vision}
          </p>
        </div>

        {/* Written date */}
        <p style={{
          fontFamily: sansHN, fontSize: 11, fontWeight: 300,
          color: B.inkFaint, margin: '0 0 26px', paddingLeft: 1,
          letterSpacing: '0.01em',
        }}>
          Written {area.writtenDate} · {area.editCount} edits
        </p>

        {/* ── Gap connector (Gap state only) ── */}
        {area.status === 'gap' && (
          <div style={{ marginBottom: 14 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: `${cfg.color}12`,
              border: `1px solid ${cfg.borderColor}`,
              borderRadius: 100, padding: '6px 14px',
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                backgroundColor: cfg.color, flexShrink: 0,
              }} />
              <span style={{
                fontFamily: sansHN, fontSize: 11, fontWeight: 500,
                color: cfg.color, letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                Gap · ~2 years at current pace
              </span>
            </div>
          </div>
        )}

        {/* ── Drifting connector (Drifting state only) ── */}
        {area.status === 'drifting' && (
          <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 1, backgroundColor: cfg.borderColor }} />
            <span style={{
              fontFamily: sansHN, fontSize: 10, fontWeight: 400,
              color: cfg.color, letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              diverging
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: cfg.borderColor }} />
          </div>
        )}

        {/* ── Current reality card ── */}
        <div style={{
          backgroundColor: B.card,
          borderRadius: 20, padding: '18px 20px',
          marginBottom: 16,
          border: `1px solid ${B.border}`,
          boxShadow: '0 1px 4px rgba(28,28,26,0.05), 0 4px 16px rgba(28,28,26,0.04)',
        }}>
          <span style={{
            fontFamily: sansHN, fontSize: 10, fontWeight: 500,
            color: B.inkFaint, letterSpacing: '0.10em', textTransform: 'uppercase',
            display: 'block', marginBottom: 10,
          }}>
            Current reality
          </span>
          <p style={{
            fontFamily: serif, fontSize: 17, fontWeight: 400, fontStyle: 'italic',
            color: B.inkMid, lineHeight: 1.52, margin: 0, letterSpacing: '-0.1px',
          }}>
            {area.reality}
          </p>
          <p style={{
            fontFamily: sansHN, fontSize: 11, fontWeight: 300,
            color: B.inkFaint, margin: '10px 0 0',
          }}>
            Updated {area.realityDate}
          </p>
        </div>

        {/* ── Status section ── */}
        {(area.status === 'on-track' || area.status === 'drifting') && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            marginBottom: 28, padding: '2px 0',
          }}>
            {/* Status pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              backgroundColor: cfg.bgColor,
              border: `1px solid ${cfg.borderColor}`,
              borderRadius: 100, padding: '5px 12px', flexShrink: 0,
              marginTop: 1,
            }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%',
                backgroundColor: cfg.color,
              }} />
              <span style={{
                fontFamily: sansHN, fontSize: 11, fontWeight: 500,
                color: cfg.color, letterSpacing: '0.04em',
              }}>
                {cfg.label}
              </span>
            </div>
            {/* Summary */}
            <p style={{
              fontFamily: sansHN, fontSize: 13, fontWeight: 300,
              color: B.inkLight, margin: 0, lineHeight: 1.55,
            }}>
              {cfg.summary}
            </p>
          </div>
        )}

        {/* ── What's blocking it (Gap state only) ── */}
        {area.status === 'gap' && (
          <div style={{ marginBottom: 28 }}>
            <BlockingRows />
          </div>
        )}

        {/* ── Task cards ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{
              fontFamily: sansHN, fontSize: 10, fontWeight: 500,
              color: B.bronze, letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              Actions for this area
            </span>
            <span style={{
              fontFamily: sansHN, fontSize: 11, fontWeight: 300,
              color: B.inkFaint,
            }}>
              AI generated
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {area.tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                areaLabel={area.label}
                status={area.status}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
