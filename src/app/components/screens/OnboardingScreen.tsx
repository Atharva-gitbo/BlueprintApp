import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { B, serif, sansHN } from '../blueprint-theme';

// ─────────────────────────────────────────────────────────────
//  KEYFRAMES
// ─────────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes bpSplashWordmark {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes bpRuleExpand {
    from { width: 0;    opacity: 0; }
    to   { width: 36px; opacity: 1; }
  }

  @keyframes bpF1 {
    0%,100% { transform: translate(  0px,  0px) rotate(-5.2deg); }
    40%     { transform: translate( -3px, -6px) rotate(-4.8deg); }
    70%     { transform: translate(  1px, -2px) rotate(-5.5deg); }
  }
  @keyframes bpF2 {
    0%,100% { transform: translate(0px,   0px) rotate(3.8deg); }
    50%     { transform: translate(4px,  -5px) rotate(4.3deg); }
  }
  @keyframes bpF3 {
    0%,100% { transform: translate(0px, 0px) rotate(6.2deg); }
    50%     { transform: translate(-3px,4px) rotate(5.8deg); }
  }
  @keyframes bpF4 {
    0%,100% { transform: translate(  0px, 0px) rotate(2.4deg); }
    35%     { transform: translate( -2px, 5px) rotate(2.0deg); }
    65%     { transform: translate(  1px, 2px) rotate(2.8deg); }
  }
  @keyframes bpF5 {
    0%,100% { transform: translate(0px,  0px) rotate(-3.8deg); }
    50%     { transform: translate(3px, -4px) rotate(-3.4deg); }
  }
  @keyframes bpF6 {
    0%,100% { transform: translate(  0px, 0px) rotate(-2.2deg); }
    50%     { transform: translate(  2px,-5px) rotate(-1.8deg); }
  }
`;

// ─────────────────────────────────────────────────────────────
//  TILE DATA — images intentionally different from moodboard screen
// ─────────────────────────────────────────────────────────────
const TILES = [
  // Large, bleeds left edge
  {
    id: 't1',
    x: -12, y: 18, w: 154, h: 188,
    float: 'bpF1', dur: 5.8, delay: 0.0, z: 2,
    type: 'photo' as const,
    src: 'https://images.unsplash.com/photo-1774280898104-d329acaae7b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  // Medium, top-right
  {
    id: 't2',
    x: 152, y: 4, w: 138, h: 162,
    float: 'bpF2', dur: 4.6, delay: 0.6, z: 1,
    type: 'photo' as const,
    src: 'https://images.unsplash.com/photo-1764923753986-c3f564e295d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  // Small, bleeds right
  {
    id: 't3',
    x: 292, y: 52, w: 118, h: 106,
    float: 'bpF3', dur: 6.4, delay: 0.3, z: 3,
    type: 'photo' as const,
    src: 'https://images.unsplash.com/photo-1760552817030-39f6e83f52c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  // Dark quote card, mid-left
  {
    id: 't4',
    x: 20, y: 202, w: 152, h: 112,
    float: 'bpF4', dur: 5.2, delay: 1.2, z: 4,
    type: 'quote' as const,
    src: '',
  },
  // Medium photo, mid-right
  {
    id: 't5',
    x: 188, y: 178, w: 144, h: 130,
    float: 'bpF5', dur: 4.9, delay: 0.5, z: 3,
    type: 'photo' as const,
    src: 'https://images.unsplash.com/photo-1769775874528-7372eaaad212?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  // Small photo, lower — bleeds bottom of hero slightly
  {
    id: 't6',
    x: 68, y: 336, w: 124, h: 102,
    float: 'bpF6', dur: 5.5, delay: 0.9, z: 2,
    type: 'photo' as const,
    src: 'https://images.unsplash.com/photo-1764557359097-f15dd0c0a17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
];

// ─────────────────────────────────────────────────────────────
//  GRAIN
// ─────────────────────────────────────────────────────────────
function Grain({ id }: { id: string }) {
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.038, zIndex:10 }} xmlns="http://www.w3.org/2000/svg">
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────────────────────
export function OnboardingScreen() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'loading' | 'fading' | 'done'>('loading');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fading'), 1600);
    const t2 = setTimeout(() => setPhase('done'),   2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const tileShadow = '0 8px 28px rgba(20,20,18,0.14), 0 2px 8px rgba(20,20,18,0.07)';

  return (
    <div style={{ height:'100%', minHeight:794, backgroundColor:B.bg, position:'relative', overflow:'hidden', fontFamily:sansHN }}>
      <style>{KEYFRAMES}</style>

      {/* ═══════════ WELCOME SCREEN ═══════════ */}
      <div
        style={{
          position:'absolute', inset:0,
          display:'flex', flexDirection:'column',
          opacity: phase === 'loading' ? 0 : 1,
          transition: 'opacity 0.85s ease',
        }}
      >
        <Grain id="grain-welcome" />

        {/* Hero canvas — top 62% */}
        <div style={{ flex:'0 0 62%', position:'relative', overflow:'hidden' }}>
          {TILES.map(tile => (
            <div
              key={tile.id}
              style={{
                position: 'absolute',
                top: tile.y, left: tile.x,
                width: tile.w, height: tile.h,
                zIndex: tile.z,
                animation: `${tile.float} ${tile.dur}s ease-in-out ${tile.delay}s infinite`,
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: tile.type === 'quote'
                  ? '0 10px 36px rgba(20,20,18,0.22), 0 3px 10px rgba(20,20,18,0.12)'
                  : tileShadow,
              }}
            >
              {tile.type === 'photo' && (
                <img
                  src={tile.src}
                  alt=""
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                />
              )}

              {tile.type === 'quote' && (
                <div
                  style={{
                    width:'100%', height:'100%',
                    backgroundColor: '#1C1A14',
                    display:'flex', flexDirection:'column',
                    justifyContent:'center',
                    padding: '18px 20px',
                    position:'relative',
                    boxSizing:'border-box',
                  }}
                >
                  <div style={{
                    position:'absolute', top:16, left:20,
                    width:22, height:1.5,
                    backgroundColor: B.bronze, opacity:0.75,
                  }} />
                  <p style={{
                    fontFamily: serif,
                    fontSize: 14.5,
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: '#F5EDD8',
                    lineHeight: 1.46,
                    margin: 0,
                    letterSpacing: '-0.1px',
                  }}>
                    "The best time for new beginnings is now."
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Vignette fade into bottom section */}
          <div style={{
            position:'absolute', bottom:0, left:0, right:0, height:90,
            background:`linear-gradient(to bottom, transparent, ${B.bg})`,
            pointerEvents:'none', zIndex:20,
          }} />
        </div>

        {/* Bottom 38% — headline + CTA */}
        <div style={{
          flex:'0 0 38%',
          display:'flex', flexDirection:'column', justifyContent:'space-between',
          padding:'8px 30px 44px', zIndex:2,
        }}>
          <p style={{
            fontFamily: serif,
            fontSize: 42,
            fontWeight: 400,
            fontStyle: 'italic',
            color: B.ink,
            lineHeight: 1.18,
            letterSpacing: '-0.8px',
            margin: 0,
          }}>
            Design your life.
            <br />
            Then go live it.
          </p>

          <div>
            <button
              onClick={() => navigate('/moodboard')}
              style={{
                width:'100%',
                backgroundColor: B.ink,
                color:'#F5EDD8',
                border:'none',
                borderRadius: 22,
                padding:'20px 28px',
                fontFamily: sansHN,
                fontSize: 16,
                fontWeight: 500,
                letterSpacing:'0.01em',
                cursor:'pointer',
                display:'block',
                textAlign:'center',
                boxShadow:'0 4px 20px rgba(20,20,18,0.18)',
                transition:'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseDown={e => {
                e.currentTarget.style.transform = 'scale(0.985)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(20,20,18,0.14)';
              }}
              onMouseUp={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(20,20,18,0.18)';
              }}
            >
              Start my canvas
            </button>
            <p style={{
              fontFamily: sansHN,
              fontSize: 12, fontWeight:400,
              color: B.inkFaint,
              textAlign:'center',
              margin:'14px 0 0',
              letterSpacing:'0.01em',
            }}>
              No account needed to start
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════ SPLASH OVERLAY ═══════════ */}
      {phase !== 'done' && (
        <div style={{
          position:'absolute', inset:0,
          backgroundColor: B.bg,
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          zIndex:100,
          opacity: phase === 'fading' ? 0 : 1,
          transition:'opacity 0.7s ease',
        }}>
          <Grain id="grain-splash" />
          <div style={{
            display:'flex', flexDirection:'column', alignItems:'center',
            animation:'bpSplashWordmark 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both',
            position:'relative', zIndex:2,
          }}>
            <span style={{
              fontFamily: serif,
              fontSize: 52,
              fontWeight: 400,
              fontStyle: 'italic',
              color: B.ink,
              letterSpacing:'-1px',
              lineHeight:1,
              display:'block',
            }}>
              Blueprint
            </span>
            <div style={{
              height:1.5,
              backgroundColor: B.bronze,
              borderRadius:1,
              marginTop:16,
              animation:'bpRuleExpand 0.6s cubic-bezier(0.22,1,0.36,1) 0.65s both',
            }} />
          </div>
        </div>
      )}
    </div>
  );
}
