// src/features/play/QuestionCard.jsx
import React from 'react';
import HintBubble from '../../components/HintBubble.jsx';
import RatioDiagram from '../../components/RatioDiagram.jsx';
import BarModelDiagram from '../../components/BarModelDiagram.jsx';

export default function QuestionCard({
  question,
  selected,
  confirmed,
  onSelect,
  showHint,
  worldAccent,
}) {
  const { type, questionText, visual, options, correctAnswer, explanation,
    origA, origB, simpA, simpB, missingSlot, itemA, itemB, emojiA, emojiB } = question;

  const topicLabel = type.replace(/_/g, ' ');

  return (
    <div className="question-card glass-card">
      {/* Topic badge */}
      <div className="topic-badge" style={{ borderColor: `${worldAccent}66`, color: worldAccent }}>
        {topicLabel}
      </div>

      {/* Question text (Large font) */}
      <p className="question-text">{questionText}</p>

      {/* Visual aid */}
      {visual === 'ratio_diagram' && (
        <div className="question-visual">
          <RatioDiagram valA={origA} valB={origB} simpA={simpA} simpB={simpB} missing={missingSlot || 'none'} animated />
        </div>
      )}
      {visual === 'bar_model' && (
        <div className="question-visual">
          <BarModelDiagram partsA={simpA || 3} partsB={simpB || 4} labelA={itemA || 'Part A'} labelB={itemB || 'Part B'} emojiA={emojiA || '🍓'} emojiB={emojiB || '🫐'} />
        </div>
      )}

      {/* Hint */}
      {showHint && !confirmed && (
        <HintBubble>{question.hint1}</HintBubble>
      )}

      {/* Options */}
      <div className="options-grid">
        {options.map((opt) => {
          let cls = 'option-btn';
          if (confirmed) {
            if (opt === correctAnswer) cls += ' correct';
            else if (opt === selected) cls += ' wrong';
            else cls += ' disabled';
          } else if (selected === opt) {
            cls += ' selected';
          }
          return (
            <button key={opt} className={cls} onClick={() => onSelect(opt)} disabled={confirmed}>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation shown after confirmation */}
      {confirmed && explanation && (
        <div style={{
          marginTop: 16,
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 'var(--radius-md)',
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.88)',
        }}>
          💡 {explanation}
        </div>
      )}

      {/* Mascot */}
      <div className="mascot-container" style={{ marginTop: 18 }}>
        <span className="mascot" aria-hidden="true">🐣</span>
        <div className="speech-bubble">
          {confirmed
            ? selected === correctAnswer
              ? "Brilliant ratio skills! You got it! 🎉"
              : "Keep trying! Divide by the GCF! 💪"
            : "Think about dividing both terms by GCF…"}
        </div>
      </div>
    </div>
  );
}
