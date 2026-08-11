// src/components/gamification/StreakCounter.jsx
import React from 'react';

export default function StreakCounter({ streak = 0 }) {
  if (streak <= 0) return null;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(255,112,67,0.2)',
        border: '1px solid rgba(255,112,67,0.5)',
        color: '#ff7043',
        padding: '4px 12px',
        borderRadius: '20px',
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        fontSize: '0.85rem',
        boxShadow: '0 2px 8px rgba(255,112,67,0.25)',
      }}
      className="anim-bounce-in"
    >
      <span>🔥</span>
      <span>{streak}x Streak</span>
    </div>
  );
}
