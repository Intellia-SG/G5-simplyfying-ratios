// src/components/gamification/StarRating.jsx
import React from 'react';

export default function StarRating({ stars = 0, max = 3, size = 'md' }) {
  const starSizes = { sm: '0.9rem', md: '1.25rem', lg: '1.8rem' };
  return (
    <div style={{ display: 'inline-flex', gap: '3px', fontSize: starSizes[size] || '1.25rem' }}>
      {[...Array(max)].map((_, i) => (
        <span
          key={i}
          style={{
            color: i < stars ? '#ffc107' : 'rgba(255,255,255,0.2)',
            filter: i < stars ? 'drop-shadow(0 0 4px rgba(255,193,7,0.6))' : 'none',
            transition: 'all 0.2s ease',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
