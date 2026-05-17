import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { B, sans } from './blueprint-theme';

export interface BlueprintFABProps {
  hasPendingCheckin?: boolean;
}

const menuItems = [
  { id: 'canvas',  label: 'Canvas',    sub: 'Return to home',       path: '/home',    icon: 'canvas'  },
  { id: 'actions', label: 'Actions',   sub: 'Weekly actions',       path: '/weekly',  icon: 'actions' },
  { id: 'checkin', label: 'Check-in',  sub: 'Monthly check-in',     path: '/checkin', icon: 'checkin' },
  { id: 'settings',label: 'Settings',  sub: 'App preferences',      path: '#',        icon: 'settings'},
];

function MenuIcon({ name, color }: { name: string; color: string }) {
  switch (name) {
    case 'canvas':
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <rect x="1.5" y="1.5" width="5" height="5" rx="1.4" stroke={color} strokeWidth="1.25" />
          <rect x="8.5" y="1.5" width="5" height="5" rx="1.4" stroke={color} strokeWidth="1.25" />
          <rect x="1.5" y="8.5" width="5" height="5" rx="1.4" stroke={color} strokeWidth="1.25" />
          <rect x="8.5" y="8.5" width="5" height="5" rx="1.4" stroke={color} strokeWidth="1.25" />
        </svg>
      );
    case 'actions':
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M7.5 12.5V2.5" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
          <path d="M4 6L7.5 2.5L11 6" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 12.5h10" stroke={color} strokeWidth="1.25" strokeLinecap="round" opacity="0.32" />
        </svg>
      );
    case 'checkin':
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="7.5" cy="7.5" r="5.25" stroke={color} strokeWidth="1.25" />
          <path d="M5 7.5L6.8 9.3L10.3 5.8" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'settings':
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <line x1="2" y1="4.5" x2="13" y2="4.5" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
          <line x1="2" y1="10.5" x2="13" y2="10.5" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
          <circle cx="5" cy="4.5" r="1.75" fill={B.card} stroke={color} strokeWidth="1.25" />
          <circle cx="10" cy="10.5" r="1.75" fill={B.card} stroke={color} strokeWidth="1.25" />
        </svg>
      );
    default: return null;
  }
}

export function BlueprintFAB({ hasPendingCheckin = false }: BlueprintFABProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fabIn {
          from { opacity: 0; transform: scale(0.94) translateY(-5px); }
          to   { opacity: 1; transform: scale(1)    translateY(0px);  }
        }
      `}</style>

      <div
        ref={ref}
        style={{
          position: 'absolute', top: 68, right: 16, zIndex: 100,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
        }}
      >
        {/* ── The button ── */}
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            backgroundColor: open ? '#272521' : B.ink,
            border: 'none', cursor: 'pointer', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
            boxShadow: open
              ? '0 4px 22px rgba(20,20,18,0.26), 0 1px 6px rgba(20,20,18,0.14)'
              : '0 2px 12px rgba(20,20,18,0.18), 0 1px 3px rgba(20,20,18,0.10)',
            transition: 'background-color 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease',
            transform: open ? 'scale(0.92)' : 'scale(1)',
          }}
        >
          {/* 4-square grid glyph — evokes the four life-area canvas */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.2" fill="rgba(242,237,228,0.88)" />
            <rect x="8"   y="1.5" width="4.5" height="4.5" rx="1.2" fill="rgba(242,237,228,0.88)" />
            <rect x="1.5" y="8"   width="4.5" height="4.5" rx="1.2" fill="rgba(242,237,228,0.88)" />
            <rect x="8"   y="8"   width="4.5" height="4.5" rx="1.2" fill="rgba(242,237,228,0.88)" />
          </svg>

          {/* Bronze dot — quiet check-in signal */}
          {hasPendingCheckin && (
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: 9, height: 9, borderRadius: '50%',
              backgroundColor: B.bronze,
              border: `1.5px solid ${B.bg}`,
              transform: 'translate(1px, -1px)',
            }} />
          )}
        </button>

        {/* ── Dropdown card ── */}
        {open && (
          <div style={{
            marginTop: 8, width: 222,
            backgroundColor: B.card,
            borderRadius: 20,
            border: '1px solid rgba(20,20,18,0.07)',
            boxShadow: '0 14px 48px rgba(20,20,18,0.14), 0 2px 10px rgba(20,20,18,0.07)',
            overflow: 'hidden',
            animation: 'fabIn 0.2s cubic-bezier(0.34,1.06,0.64,1)',
          }}>
            {menuItems.map((item, i) => {
              const isLast     = i === menuItems.length - 1;
              const isHovered  = hovered === item.id;
              const isPending  = item.id === 'checkin' && hasPendingCheckin;
              const iconColor  = isPending || isHovered ? B.bronze : B.inkMid;
              const labelColor = isPending ? B.bronze : isHovered ? B.bronzeDark : B.ink;

              return (
                <React.Fragment key={item.id}>
                  <button
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => { setOpen(false); if (item.path !== '#') navigate(item.path); }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      gap: 13, padding: '13px 18px',
                      background: isPending
                        ? 'rgba(139,115,85,0.06)'
                        : isHovered
                        ? 'rgba(139,115,85,0.07)'
                        : 'transparent',
                      border: 'none', cursor: 'pointer', textAlign: 'left',
                      transition: 'background 0.12s ease',
                    }}
                  >
                    <MenuIcon name={item.icon} color={iconColor} />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: sans, fontSize: 14, fontWeight: 400,
                        color: labelColor, letterSpacing: '-0.1px',
                      }}>
                        {item.label}
                      </div>
                      <div style={{
                        fontFamily: sans, fontSize: 11, fontWeight: 300,
                        color: B.inkFaint, marginTop: 1,
                      }}>
                        {item.sub}
                      </div>
                    </div>
                    {/* Bronze dot on check-in row when pending */}
                    {isPending && (
                      <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        backgroundColor: B.bronze, flexShrink: 0,
                      }} />
                    )}
                  </button>
                  {!isLast && (
                    <div style={{
                      height: 1,
                      backgroundColor: 'rgba(20,20,18,0.055)',
                      margin: '0 18px',
                    }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────
   Static specimens — used by FABScreen showcase
───────────────────────────────────────────────── */
export function FABButtonSpecimen({ hasDot, label }: { hasDot: boolean; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%', backgroundColor: B.ink,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        boxShadow: '0 2px 12px rgba(20,20,18,0.2), 0 1px 3px rgba(20,20,18,0.1)',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.2" fill="rgba(242,237,228,0.88)" />
          <rect x="8"   y="1.5" width="4.5" height="4.5" rx="1.2" fill="rgba(242,237,228,0.88)" />
          <rect x="1.5" y="8"   width="4.5" height="4.5" rx="1.2" fill="rgba(242,237,228,0.88)" />
          <rect x="8"   y="8"   width="4.5" height="4.5" rx="1.2" fill="rgba(242,237,228,0.88)" />
        </svg>
        {hasDot && (
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: 9, height: 9, borderRadius: '50%',
            backgroundColor: B.bronze, border: `1.5px solid ${B.bg}`,
            transform: 'translate(1px, -1px)',
          }} />
        )}
      </div>
      <span style={{
        fontFamily: sans, fontSize: 10, fontWeight: 300,
        color: B.inkLight, letterSpacing: '0.04em', textTransform: 'uppercase',
      }}>
        {label}
      </span>
    </div>
  );
}

export function MenuCardSpecimen({ hasPendingCheckin = false }: { hasPendingCheckin?: boolean }) {
  return (
    <div style={{
      backgroundColor: B.card, borderRadius: 20,
      border: '1px solid rgba(20,20,18,0.07)',
      boxShadow: '0 8px 32px rgba(20,20,18,0.10), 0 2px 6px rgba(20,20,18,0.05)',
      overflow: 'hidden',
    }}>
      {menuItems.map((item, i) => {
        const isLast    = i === menuItems.length - 1;
        const isPending = item.id === 'checkin' && hasPendingCheckin;
        return (
          <React.Fragment key={item.id}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 13, padding: '12px 18px',
              background: isPending ? 'rgba(139,115,85,0.06)' : 'transparent',
            }}>
              <MenuIcon name={item.icon} color={isPending ? B.bronze : B.inkMid} />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: sans, fontSize: 14, fontWeight: 400,
                  color: isPending ? B.bronze : B.ink, letterSpacing: '-0.1px',
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: sans, fontSize: 11, fontWeight: 300,
                  color: B.inkFaint, marginTop: 1,
                }}>
                  {item.sub}
                </div>
              </div>
              {isPending && (
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: B.bronze }} />
              )}
            </div>
            {!isLast && (
              <div style={{ height: 1, backgroundColor: 'rgba(20,20,18,0.055)', margin: '0 18px' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}