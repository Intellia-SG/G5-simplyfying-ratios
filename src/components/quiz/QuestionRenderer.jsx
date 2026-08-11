// src/components/quiz/QuestionRenderer.jsx
import React from 'react';
import './QuestionRenderer.css';
import RatioVisual from '../shared/RatioVisual.jsx';

export default function QuestionRenderer({ question, onAnswer, hintsShown, showHint, onHint, isLocked }) {
  if (!question) return null;

  const { category, questionText, options, visual, visualData, hint1, hint2 } = question;
  const categoryTag = category || 'SIMPLIFYING RATIOS';

  return (
    <div className="qr-wrap glass-card">
      {/* Top category badge tag */}
      <div className="qr-category-badge">
        <span className="cat-icon">⚖️</span> {categoryTag}
      </div>

      {/* Question text */}
      <p className="qr-question">{questionText}</p>

      {/* Visual aid if available */}
      {visual && visualData && (
        <div className="qr-visual">
          <RatioVisual type={visual} data={visualData} />
        </div>
      )}

      {/* Options — 2x2 grid */}
      <div className={`qr-options ${options?.length === 2 ? 'two-cols' : 'four-cols'}`}>
        {options?.map((opt, i) => (
          <button
            key={i}
            className="qr-option"
            onClick={() => !isLocked && onAnswer(opt)}
            disabled={isLocked}
            aria-label={`Option: ${opt}`}
          >
            <span className="qr-opt-text">{opt}</span>
          </button>
        ))}
      </div>

      {/* Hint area */}
      <div className="qr-hint-area">
        {showHint === 1 && hint1 && (
          <div className="qr-hint anim-slide-up">
            <span className="hint-icon">💡</span>
            <span>{hint1}</span>
          </div>
        )}
        {showHint === 2 && hint2 && (
          <div className="qr-hint anim-slide-up">
            <span className="hint-icon">🔑</span>
            <span>{hint2}</span>
          </div>
        )}
        {hintsShown < 2 && (
          <button className="hint-btn" onClick={onHint} aria-label="Show hint">
            💡 Hint {hintsShown + 1}
          </button>
        )}
      </div>
    </div>
  );
}
