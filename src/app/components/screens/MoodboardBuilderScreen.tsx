import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { B, serif, sansHN } from '../blueprint-theme';

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────
type TileType = 'photo' | 'video' | 'quote' | 'person';

type Tile = {
  id: string;
  type: TileType;
  imageUrl?: string;
  quoteText?: string;
  personName?: string;
};

// ─────────────────────────────────────────────────────────────
//  SLOT LAYOUT — scattered, organic angles
// ─────────────────────────────────────────────────────────────
type SlotLayout = {
  id: string;
  x: number; y: number; w: number; h: number;
  rotate: string;
  z: number;
};

const SLOTS: SlotLayout[] = [
  { id: 's1', x: -6,  y: 28,  w: 164, h: 198, rotate: '-3.8deg', z: 3 },
  { id: 's2', x: 148, y: 10,  w: 144, h: 168, rotate:  '2.8deg', z: 2 },
  { id: 's3', x: 22,  y: 220, w: 152, h: 110, rotate:  '1.4deg', z: 4 },
  { id: 's4', x: 208, y: 186, w: 130, h: 160, rotate: '-2.2deg', z: 3 },
  { id: 's5', x: 96,  y: 308, w: 118, h: 128, rotate:  '3.5deg', z: 5 },
];

// ─────────────────────────────────────────────────────────────
//  KEYFRAMES
// ─────────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes bpSheetIn {
    from { transform: translateY(100%); }
    to   { transform: translateY(0);    }
  }
  @keyframes bpSheetOut {
    from { transform: translateY(0);    }
    to   { transform: translateY(100%); }
  }
  @keyframes bpSheetBgIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

// ─────────────────────────────────────────────────────────────
//  TYPE SHEET OPTIONS
// ─────────────────────────────────────────────────────────────
const SHEET_OPTIONS: { type: TileType; label: string; sub: string; icon: React.ReactNode }[] = [
  {
    type: 'photo',
    label: 'Photo',
    sub: 'From your camera roll',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="4" width="18" height="14" rx="3" stroke={B.ink} strokeWidth="1.5" />
        <circle cx="8" cy="9" r="2" stroke={B.ink} strokeWidth="1.4" />
        <path d="M2 16L7 11.5L10.5 15L14 12L20 16" stroke={B.ink} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    type: 'video',
    label: 'Video',
    sub: 'A clip that moves you',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="5" width="13" height="12" rx="3" stroke={B.ink} strokeWidth="1.5" />
        <path d="M15 8.5L20 6V16L15 13.5" stroke={B.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    type: 'quote',
    label: 'Quote',
    sub: 'Words that pull you forward',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 8C3 6.3 4.3 5 6 5H8C8 9 6.5 11 3 12V8Z" stroke={B.ink} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M13 8C13 6.3 14.3 5 16 5H18C18 9 16.5 11 13 12V8Z" stroke={B.ink} strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    type: 'person',
    label: 'Person',
    sub: 'Someone who inspires you',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="4" stroke={B.ink} strokeWidth="1.5" />
        <path d="M3 20C3 16.1 6.6 13 11 13C15.4 13 19 16.1 19 20" stroke={B.ink} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────
//  GRAIN
// ─────────────────────────────────────────────────────────────
function Grain() {
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.038, zIndex:10 }} xmlns="http://www.w3.org/2000/svg">
      <filter id="grain-mb">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-mb)" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
//  QUOTE INPUT OVERLAY
// ─────────────────────────────────────────────────────────────
function QuoteOverlay({ onSave, onCancel }: { onSave: (text: string) => void; onCancel: () => void }) {
  const [text, setText] = useState('');
  return (
    <div
      style={{ position:'fixed', inset:0, backgroundColor:'rgba(20,20,18,0.45)', display:'flex', alignItems:'flex-end', zIndex:999 }}
      onClick={onCancel}
    >
      <div
        style={{ width:'100%', backgroundColor:B.bg, borderRadius:'24px 24px 0 0', padding:'28px 24px 44px', boxSizing:'border-box' }}
        onClick={e => e.stopPropagation()}
      >
        <p style={{ fontFamily:serif, fontSize:22, fontStyle:'italic', color:B.ink, margin:'0 0 18px', fontWeight:400, letterSpacing:'-0.3px' }}>
          Add a quote
        </p>
        <textarea
          autoFocus
          placeholder='"Something that pulls you forward..."'
          value={text}
          onChange={e => setText(e.target.value)}
          style={{
            width:'100%', height:96, backgroundColor:B.card,
            border:`1.5px solid ${B.border}`, borderRadius:14,
            padding:'14px 16px', fontFamily:sansHN, fontSize:15,
            color:B.ink, resize:'none', outline:'none', boxSizing:'border-box', lineHeight:1.5,
          }}
        />
        <button
          onClick={() => text.trim() && onSave(text.trim())}
          style={{
            marginTop:14, width:'100%', backgroundColor:B.ink, color:'#F5EDD8',
            border:'none', borderRadius:18, padding:'18px', fontFamily:sansHN,
            fontSize:15, fontWeight:500, cursor:'pointer',
          }}
        >
          Add to board
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  PERSON INPUT OVERLAY
// ─────────────────────────────────────────────────────────────
function PersonOverlay({ onSave, onCancel }: { onSave: (name: string) => void; onCancel: () => void }) {
  const [name, setName] = useState('');
  return (
    <div
      style={{ position:'fixed', inset:0, backgroundColor:'rgba(20,20,18,0.45)', display:'flex', alignItems:'flex-end', zIndex:999 }}
      onClick={onCancel}
    >
      <div
        style={{ width:'100%', backgroundColor:B.bg, borderRadius:'24px 24px 0 0', padding:'28px 24px 44px', boxSizing:'border-box' }}
        onClick={e => e.stopPropagation()}
      >
        <p style={{ fontFamily:serif, fontSize:22, fontStyle:'italic', color:B.ink, margin:'0 0 18px', fontWeight:400, letterSpacing:'-0.3px' }}>
          Who inspires you?
        </p>
        <input
          autoFocus
          placeholder='e.g. "Ilse Crawford"'
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            width:'100%', backgroundColor:B.card,
            border:`1.5px solid ${B.border}`, borderRadius:14,
            padding:'14px 16px', fontFamily:sansHN, fontSize:15,
            color:B.ink, outline:'none', boxSizing:'border-box',
          }}
        />
        <button
          onClick={() => name.trim() && onSave(name.trim())}
          style={{
            marginTop:14, width:'100%', backgroundColor:B.ink, color:'#F5EDD8',
            border:'none', borderRadius:18, padding:'18px', fontFamily:sansHN,
            fontSize:15, fontWeight:500, cursor:'pointer',
          }}
        >
          Add to board
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  TYPE PICKER BOTTOM SHEET
// ─────────────────────────────────────────────────────────────
function TypeSheet({
  onSelect,
  onCancel,
}: {
  onSelect: (type: TileType) => void;
  onCancel: () => void;
}) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(20,20,18,0.45)',
        display: 'flex', alignItems: 'flex-end',
        zIndex: 500,
        animation: 'bpSheetBgIn 0.22s ease both',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: B.bg,
          borderRadius: '24px 24px 0 0',
          padding: '10px 20px 44px',
          boxSizing: 'border-box',
          animation: 'bpSheetIn 0.32s cubic-bezier(0.22, 1, 0.36, 1) both',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div style={{
          width: 36, height: 4, borderRadius: 2,
          backgroundColor: B.border,
          margin: '10px auto 22px',
        }} />

        <p style={{
          fontFamily: serif, fontSize: 22, fontStyle: 'italic',
          color: B.ink, margin: '0 4px 16px', fontWeight: 400,
          letterSpacing: '-0.3px',
        }}>
          What are you adding?
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SHEET_OPTIONS.map((opt, i) => (
            <button
              key={opt.type}
              onClick={() => onSelect(opt.type)}
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                width: '100%', textAlign: 'left',
                backgroundColor: B.card,
                border: `1px solid ${B.borderLight}`,
                borderRadius: 18,
                padding: '16px 20px',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
              }}
              onMouseDown={e => { e.currentTarget.style.backgroundColor = B.cardAlt; }}
              onMouseUp={e => { e.currentTarget.style.backgroundColor = B.card; }}
            >
              {/* Icon pill */}
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                backgroundColor: B.bg,
                border: `1px solid ${B.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {opt.icon}
              </div>

              {/* Text */}
              <div>
                <p style={{ fontFamily: sansHN, fontSize: 16, fontWeight: 500, color: B.ink, margin: '0 0 2px', letterSpacing: '-0.1px' }}>
                  {opt.label}
                </p>
                <p style={{ fontFamily: sansHN, fontSize: 13, fontWeight: 400, color: B.inkLight, margin: 0 }}>
                  {opt.sub}
                </p>
              </div>

              {/* Chevron */}
              <div style={{ marginLeft: 'auto' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke={B.inkFaint} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export function MoodboardBuilderScreen() {
  const navigate = useNavigate();

  const [tiles, setTiles] = useState<Record<string, Tile>>({});

  // Sheet / overlay state
  const [showTypeSheet, setShowTypeSheet]   = useState(false);
  const [showQuoteInput, setShowQuoteInput] = useState(false);
  const [showPersonInput, setShowPersonInput] = useState(false);
  const [pendingSlot, setPendingSlot] = useState<string | null>(null);
  const [pendingType, setPendingType] = useState<TileType | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Step 1: tap empty tile → show type sheet ──────────────
  const handleSlotTap = (slotId: string) => {
    if (tiles[slotId]) return; // already filled — could add edit later
    setPendingSlot(slotId);
    setShowTypeSheet(true);
  };

  // ── Step 2: user picks a type ─────────────────────────────
  const handleTypeSelect = (type: TileType) => {
    setShowTypeSheet(false);
    setPendingType(type);

    if (type === 'photo' || type === 'video') {
      // slight delay so sheet finishes animating out
      setTimeout(() => fileInputRef.current?.click(), 120);
    } else if (type === 'quote') {
      setTimeout(() => setShowQuoteInput(true), 120);
    } else if (type === 'person') {
      setTimeout(() => setShowPersonInput(true), 120);
    }
  };

  // ── File picked ───────────────────────────────────────────
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && pendingSlot && pendingType) {
      const reader = new FileReader();
      reader.onload = ev => {
        setTiles(prev => ({
          ...prev,
          [pendingSlot]: { id: pendingSlot, type: pendingType, imageUrl: ev.target?.result as string },
        }));
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
    setPendingSlot(null);
    setPendingType(null);
  };

  // ── Quote saved ───────────────────────────────────────────
  const handleQuoteSave = (text: string) => {
    if (pendingSlot) {
      setTiles(prev => ({ ...prev, [pendingSlot]: { id: pendingSlot, type: 'quote', quoteText: text } }));
    }
    setShowQuoteInput(false);
    setPendingSlot(null);
    setPendingType(null);
  };

  // ── Person saved ──────────────────────────────────────────
  const handlePersonSave = (name: string) => {
    if (pendingSlot) {
      setTiles(prev => ({ ...prev, [pendingSlot]: { id: pendingSlot, type: 'person', personName: name } }));
    }
    setShowPersonInput(false);
    setPendingSlot(null);
    setPendingType(null);
  };

  // ── Render a single slot ──────────────────────────────────
  const renderSlot = (slot: SlotLayout) => {
    const tile = tiles[slot.id];

    if (!tile) {
      // Empty dashed slot
      return (
        <div style={{
          width: '100%', height: '100%',
          border: `1.6px dashed ${B.border}`,
          borderRadius: 20,
          backgroundColor: 'rgba(237,234,224,0.55)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 8,
          boxSizing: 'border-box',
        }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M13 5v16M5 13h16" stroke={B.bronze} strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      );
    }

    if (tile.type === 'quote') {
      return (
        <div style={{
          width: '100%', height: '100%',
          backgroundColor: '#1C1A14',
          borderRadius: 20,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '18px 20px', boxSizing: 'border-box', position: 'relative',
        }}>
          <div style={{ position:'absolute', top:16, left:20, width:22, height:1.5, backgroundColor:B.bronze, opacity:0.75 }} />
          <p style={{
            fontFamily: serif, fontSize: 14, fontWeight: 400,
            fontStyle: 'italic', color: '#F5EDD8',
            lineHeight: 1.48, margin: 0, letterSpacing: '-0.1px',
          }}>
            "{tile.quoteText}"
          </p>
        </div>
      );
    }

    if (tile.type === 'person') {
      return (
        <div style={{
          width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden',
          backgroundColor: B.card, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8,
        }}>
          {tile.imageUrl ? (
            <>
              <img src={tile.imageUrl} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
              <div style={{
                position:'absolute', bottom:0, left:0, right:0,
                padding:'24px 12px 12px',
                background:'linear-gradient(to top, rgba(20,20,18,0.82), transparent)',
              }}>
                <p style={{ fontFamily:sansHN, fontSize:11, fontWeight:500, color:'#F5EDD8', margin:0, letterSpacing:'0.04em', textTransform:'uppercase' }}>
                  {tile.personName}
                </p>
              </div>
            </>
          ) : (
            <>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="12" r="6" stroke={B.inkFaint} strokeWidth="1.5" />
                <path d="M5 29c0-6 4.9-11 11-11s11 4.9 11 11" stroke={B.inkFaint} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily:sansHN, fontSize:12, color:B.inkFaint }}>{tile.personName}</span>
            </>
          )}
        </div>
      );
    }

    // photo / video
    return (
      <div style={{ width:'100%', height:'100%', borderRadius:20, overflow:'hidden', position:'relative' }}>
        {tile.imageUrl && (
          <img src={tile.imageUrl} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        )}
        {tile.type === 'video' && (
          <div style={{
            position:'absolute', top:8, right:8,
            width:24, height:24, borderRadius:12,
            backgroundColor:'rgba(20,20,18,0.6)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 1.5L8 5L2 8.5V1.5z" fill="#F5EDD8" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  // ──────────────────────────────────────────────────────────
  return (
    <div style={{
      height: '100%', minHeight: 794,
      backgroundColor: B.bg,
      display: 'flex', flexDirection: 'column',
      fontFamily: sansHN, position: 'relative', overflow: 'hidden',
    }}>
      <style>{KEYFRAMES}</style>
      <Grain />
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleFile} />

      {/* ── Header ── */}
      <div style={{ padding:'52px 28px 0', zIndex:2, position:'relative', flexShrink:0 }}>
        <h1 style={{
          fontFamily: serif, fontSize: 36, fontWeight: 400,
          fontStyle: 'italic', color: B.ink,
          lineHeight: 1.15, letterSpacing: '-0.5px',
          margin: '0 0 10px 0',
        }}>
          Add what inspires you.
        </h1>
        <p style={{
          fontFamily: sansHN, fontSize: 14, fontWeight: 400,
          color: B.inkLight, lineHeight: 1.5, margin: 0, letterSpacing: '0.01em',
        }}>
          Photos, people, places, quotes. Anything.
        </p>
      </div>

      {/* ── Moodboard canvas — fills all available space ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
        {SLOTS.map(slot => (
          <div
            key={slot.id}
            onClick={() => handleSlotTap(slot.id)}
            style={{
              position: 'absolute',
              top: slot.y, left: slot.x,
              width: slot.w, height: slot.h,
              zIndex: slot.z,
              transform: `rotate(${slot.rotate})`,
              cursor: 'pointer',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: tiles[slot.id]
                ? (tiles[slot.id].type === 'quote'
                  ? '0 10px 36px rgba(20,20,18,0.22), 0 3px 10px rgba(20,20,18,0.12)'
                  : '0 8px 28px rgba(20,20,18,0.14), 0 2px 8px rgba(20,20,18,0.07)')
                : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {renderSlot(slot)}
          </div>
        ))}
      </div>

      {/* ── CTA only — no pill row ── */}
      <div style={{
        padding: '16px 24px 40px',
        zIndex: 5, position: 'relative',
        flexShrink: 0,
      }}>
        <button
          onClick={() => navigate('/moodboard-questions')}
          style={{
            width: '100%',
            backgroundColor: B.ink,
            color: '#F5EDD8',
            border: 'none',
            borderRadius: 22,
            padding: '20px 28px',
            fontFamily: sansHN,
            fontSize: 16, fontWeight: 500,
            letterSpacing: '0.01em',
            cursor: 'pointer',
            display: 'block', textAlign: 'center',
            boxShadow: '0 4px 20px rgba(20,20,18,0.18)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
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
          Done, ask me about this
        </button>
      </div>

      {/* ── Type picker bottom sheet ── */}
      {showTypeSheet && (
        <TypeSheet
          onSelect={handleTypeSelect}
          onCancel={() => { setShowTypeSheet(false); setPendingSlot(null); }}
        />
      )}

      {/* ── Quote input overlay ── */}
      {showQuoteInput && (
        <QuoteOverlay
          onSave={handleQuoteSave}
          onCancel={() => { setShowQuoteInput(false); setPendingSlot(null); setPendingType(null); }}
        />
      )}

      {/* ── Person input overlay ── */}
      {showPersonInput && (
        <PersonOverlay
          onSave={handlePersonSave}
          onCancel={() => { setShowPersonInput(false); setPendingSlot(null); setPendingType(null); }}
        />
      )}
    </div>
  );
}
