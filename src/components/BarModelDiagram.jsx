// src/components/BarModelDiagram.jsx
import React from 'react';

export default function BarModelDiagram({
  partsA = 3,
  partsB = 4,
  labelA = 'Quantity A',
  labelB = 'Quantity B',
  emojiA = '🍓',
  emojiB = '🫐',
}) {
  const maxParts = Math.max(partsA, partsB, 1);

  return (
    <div className="bar-model-container">
      {/* Row A */}
      <div className="bar-model-row">
        <div className="bar-model-label">
          <span>{emojiA}</span> {labelA} ({partsA})
        </div>
        <div className="bar-model-blocks">
          {Array.from({ length: partsA }).map((_, i) => (
            <div
              key={i}
              className="bar-model-block"
              style={{
                width: `${100 / maxParts}%`,
                background: 'linear-gradient(135deg, #ff7043, #f4511e)',
                color: '#fff',
              }}
            >
              1 unit
            </div>
          ))}
        </div>
      </div>

      {/* Row B */}
      <div className="bar-model-row">
        <div className="bar-model-label">
          <span>{emojiB}</span> {labelB} ({partsB})
        </div>
        <div className="bar-model-blocks">
          {Array.from({ length: partsB }).map((_, i) => (
            <div
              key={i}
              className="bar-model-block"
              style={{
                width: `${100 / maxParts}%`,
                background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                color: '#fff',
              }}
            >
              1 unit
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
