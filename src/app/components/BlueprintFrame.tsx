import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { B, serif, sans } from './blueprint-theme';
import { BlueprintFAB } from './BlueprintFAB';

const screenGroups = [
  {
    label: 'Onboarding',
    screens: [
      { path: '/', label: 'Welcome' },
      { path: '/moodboard', label: 'Moodboard' },
      { path: '/moodboard-questions', label: 'Questions' },
      { path: '/prioritize', label: 'Prioritize' },
    ],
  },
  {
    label: 'Main',
    screens: [
      { path: '/home', label: 'Pulse' },
      { path: '/directions', label: 'Directions' },
      { path: '/reflect', label: 'Reflect' },
      { path: '/insights', label: 'Insights' },
      { path: '/year', label: 'Year' },
    ],
  },
  {
    label: 'Detail',
    screens: [
      { path: '/area/experiences', label: 'On Track' },
      { path: '/area/work', label: 'Drifting' },
      { path: '/area/place', label: 'Gap' },
      { path: '/weekly', label: 'Actions' },
      { path: '/investment', label: 'Investment' },
    ],
  },
];

const allScreens = screenGroups.flatMap((g) => g.screens);

function StatusBar() {
  return (
    <div
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 50,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        padding: '0 28px 8px', zIndex: 50, pointerEvents: 'none',
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 600, color: B.ink, fontFamily: sans, letterSpacing: '-0.2px' }}>
        9:41
      </span>
      {/* Dynamic island */}
      <div style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 32, backgroundColor: '#0A0908', borderRadius: 20,
      }} />
      {/* Right icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.8" fill={B.ink} />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" fill={B.ink} />
          <rect x="9" y="3" width="3" height="9" rx="0.8" fill={B.ink} />
          <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill={B.ink} opacity="0.2" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill={B.ink} />
          <path d="M4.5 7.5C5.8 6.2 6.85 5.5 8 5.5s2.2.7 3.5 2" stroke={B.ink} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M2 5C3.9 3.1 5.8 2 8 2s4.1 1.1 6 3" stroke={B.ink} strokeWidth="1.4" strokeLinecap="round" opacity="0.35" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={B.ink} strokeWidth="1" />
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill={B.ink} />
          <path d="M23 4.5v3" stroke={B.ink} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

export function BlueprintFrame() {
  const location = useLocation();
  const navigate = useNavigate();
  const onboardingPaths = ['/', '/moodboard', '/moodboard-questions', '/prioritize'];
  const showFAB = !onboardingPaths.includes(location.pathname);

  const currentScreen = allScreens.find((s) => s.path === location.pathname);
  const currentIndex = allScreens.findIndex((s) => s.path === location.pathname);
  const prevScreen = currentIndex > 0 ? allScreens[currentIndex - 1] : null;
  const nextScreen = currentIndex < allScreens.length - 1 ? allScreens[currentIndex + 1] : null;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: B.canvas,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: sans,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, rgba(245,240,232,0.05) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }} />

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 36px',
        borderBottom: '1px solid rgba(245,240,232,0.06)',
        zIndex: 10,
      }}>
        {/* Wordmark */}
        <span style={{ fontFamily: serif, color: B.bg, fontSize: 18, fontWeight: 600, letterSpacing: '-0.3px' }}>
          Blueprint
        </span>

        {/* Screen nav — grouped */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {screenGroups.map((group, gi) => (
            <div
              key={group.label}
              style={{
                display: 'flex', alignItems: 'center',
                paddingRight: gi < screenGroups.length - 1 ? 24 : 0,
                marginRight: gi < screenGroups.length - 1 ? 24 : 0,
                borderRight: gi < screenGroups.length - 1 ? '1px solid rgba(245,240,232,0.1)' : 'none',
                gap: 4,
              }}
            >
              <span style={{
                fontFamily: sans, fontSize: 9, fontWeight: 400,
                color: 'rgba(245,240,232,0.22)', letterSpacing: '0.1em',
                textTransform: 'uppercase', marginRight: 8,
              }}>
                {group.label}
              </span>
              {group.screens.map(({ path, label }) => {
                const active = location.pathname === path;
                return (
                  <button
                    key={path}
                    onClick={() => navigate(path)}
                    style={{
                      background: active ? 'rgba(245,240,232,0.1)' : 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: sans, fontSize: 11, fontWeight: active ? 500 : 400,
                      letterSpacing: '0.02em',
                      color: active ? B.bg : 'rgba(245,240,232,0.32)',
                      padding: '5px 10px',
                      borderRadius: 6,
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Current screen indicator */}
        <span style={{
          fontFamily: sans, fontSize: 11, fontWeight: 300,
          color: 'rgba(245,240,232,0.3)', letterSpacing: '0.04em',
          minWidth: 80, textAlign: 'right',
        }}>
          {currentIndex + 1} / {allScreens.length}
        </span>
      </div>

      {/* Left arrow */}
      {prevScreen && (
        <button
          onClick={() => navigate(prevScreen.path)}
          style={{
            position: 'absolute', left: 20,
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            padding: 12, zIndex: 5,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 4L7 10L13 16" stroke="rgba(245,240,232,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{
            fontFamily: sans, fontSize: 9, fontWeight: 300,
            color: 'rgba(245,240,232,0.22)', letterSpacing: '0.04em',
            textAlign: 'center', maxWidth: 60,
            textTransform: 'uppercase',
          }}>
            {prevScreen.label}
          </span>
        </button>
      )}

      {/* Right arrow */}
      {nextScreen && (
        <button
          onClick={() => navigate(nextScreen.path)}
          style={{
            position: 'absolute', right: 20,
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            padding: 12, zIndex: 5,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L13 10L7 16" stroke="rgba(245,240,232,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{
            fontFamily: sans, fontSize: 9, fontWeight: 300,
            color: 'rgba(245,240,232,0.22)', letterSpacing: '0.04em',
            textAlign: 'center', maxWidth: 60,
            textTransform: 'uppercase',
          }}>
            {nextScreen.label}
          </span>
        </button>
      )}

      {/* Phone shell */}
      <div
        style={{
          width: 390, height: 844,
          borderRadius: 50,
          overflow: 'hidden',
          background: B.bg,
          border: '8px solid #242220',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.04),
            0 32px 64px rgba(0,0,0,0.55),
            0 8px 24px rgba(0,0,0,0.3)
          `,
          position: 'relative',
          flexShrink: 0,
          marginTop: 32,
        }}
      >
        <StatusBar />

        {/* FAB — floats over every post-onboarding screen */}
        {showFAB && <BlueprintFAB hasPendingCheckin={true} />}

        <div
          style={{
            position: 'absolute',
            top: 50, left: 0, right: 0, bottom: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
          }}
        >
          <Outlet />
        </div>

        {/* Home indicator */}
        <div style={{
          position: 'absolute', bottom: 8,
          left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 4,
          backgroundColor: `${B.ink}18`,
          borderRadius: 2, zIndex: 200, pointerEvents: 'none',
        }} />
      </div>

      {/* Screen name below phone */}
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <p style={{
          fontFamily: sans, fontSize: 10, fontWeight: 400,
          color: 'rgba(245,240,232,0.28)', letterSpacing: '0.1em',
          margin: 0, textTransform: 'uppercase',
        }}>
          {currentScreen?.label ?? 'Blueprint'} · Life Design Platform
        </p>
      </div>
    </div>
  );
}