// src/components/shared/FeedbackOverlay.jsx
import React from 'react';
import './FeedbackOverlay.css';

export default function FeedbackOverlay({ isCorrect, explanation, onContinue }) {
  return (
    <div className={`feedback-overlay-backdrop ${isCorrect ? 'correct' : 'incorrect'}`} onClick={onContinue}>
      <div className="feedback-overlay-card glass-card anim-bounce-in" onClick={e => e.stopPropagation()}>
        <div className="feedback-icon">
          {isCorrect ? '🎉' : '💡'}
        </div>
        <h3 className="feedback-title">
          {isCorrect ? 'Correct!' : 'Keep Going!'}
        </h3>
        {explanation && (
          <p className="feedback-explanation">
            {explanation}
          </p>
        )}
        <button className={isCorrect ? 'btn-green' : 'btn-primary'} onClick={onContinue} autoFocus>
          {isCorrect ? 'Next Question →' : 'Got It! →'}
        </button>
      </div>
    </div>
  );
}
