// src/components/shared/RatioVisual.jsx
import React from 'react';

export default function RatioVisual({ type = 'bar_model', data, compact = false }) {
  if (!data) return null;

  const { valA = 2, valB = 3, valC, simpA = 2, simpB = 3, simpC, labelA = 'Part A', labelB = 'Part B', labelC = 'Part C' } = data;

  if (type === 'three_part' && simpC !== undefined) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%', margin: '4px 0' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Part A */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(Math.min(simpA, 8))].map((_, i) => (
                <div key={i} style={{ width: compact ? '18px' : '24px', height: compact ? '18px' : '24px', background: '#ff7043', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ff9f43' }}>{simpA}</span>
          </div>

          <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffc107' }}>:</span>

          {/* Part B */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(Math.min(simpB, 8))].map((_, i) => (
                <div key={i} style={{ width: compact ? '18px' : '24px', height: compact ? '18px' : '24px', background: '#3f51b5', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#7c5cbf' }}>{simpB}</span>
          </div>

          <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffc107' }}>:</span>

          {/* Part C */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(Math.min(simpC, 8))].map((_, i) => (
                <div key={i} style={{ width: compact ? '18px' : '24px', height: compact ? '18px' : '24px', background: '#4caf50', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#81c784' }}>{simpC}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%', margin: '4px 0' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Part A */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,112,67,0.18)', padding: compact ? '6px 12px' : '8px 14px', borderRadius: '12px', border: '1.5px solid rgba(255,112,67,0.4)' }}>
          <div style={{ display: 'flex', gap: '3px' }}>
            {[...Array(Math.min(simpA, 8))].map((_, i) => (
              <div key={i} style={{ width: compact ? '18px' : '22px', height: compact ? '18px' : '22px', background: '#ff7043', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
            ))}
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#ff9f43', fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)' }}>
            {labelA.split(' ')[0]} ({simpA})
          </span>
        </div>

        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.4rem', color: 'var(--gold)' }}>:</span>

        {/* Part B */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(63,81,181,0.18)', padding: compact ? '6px 12px' : '8px 14px', borderRadius: '12px', border: '1.5px solid rgba(63,81,181,0.4)' }}>
          <div style={{ display: 'flex', gap: '3px' }}>
            {[...Array(Math.min(simpB, 8))].map((_, i) => (
              <div key={i} style={{ width: compact ? '18px' : '22px', height: compact ? '18px' : '22px', background: '#3f51b5', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
            ))}
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#a5b4fc', fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)' }}>
            {labelB.split(' ')[0]} ({simpB})
          </span>
        </div>
      </div>
    </div>
  );
}


