// src/components/shared/FloatingNumbers.jsx
import React from 'react';
import './FloatingNumbers.css';

const RATIO_ITEMS = [
  '2 : 3', '4 : 5', '1 : 2', '3 : 4', '5 : 6', '÷ GCF', '⚖️', '🍓 : 🫐',
  '10 : 15', '12 : 18', '7 : 9', '2 : 5', '3 : 5 : 7', '× scale', '🍇 : 🍊', '1 : 4'
];

export default function FloatingNumbers() {
  return (
    <div className="floating-symbols-container" aria-hidden="true">
      {RATIO_ITEMS.map((symbol, idx) => (
        <span
          key={idx}
          className="floating-symbol"
          style={{
            left: `${((idx * 6.3) + 3) % 94}%`,
            top: `${((idx * 7.7) + 5) % 90}%`,
            animationDelay: `${idx * 1.3}s`,
            animationDuration: `${18 + (idx % 5) * 4}s`,
            fontSize: `${1.4 + (idx % 3) * 0.5}rem`,
          }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}
