// src/components/simulations/SimplifierLabStation.jsx
import React, { useState } from 'react';
import './Stations.css';
import RatioVisual from '../shared/RatioVisual.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { randInt, gcd } from '../../utils/ratioMath.js';

function getNewLabProblem() {
  const simpA = randInt(1, 5);
  let simpB = randInt(1, 5);
  while (simpB === simpA || gcd(simpA, simpB) > 1) {
    simpB = randInt(1, 6);
  }
  const factor = randInt(2, 6);
  const origA = simpA * factor;
  const origB = simpB * factor;
  const trueGcf = gcd(origA, origB);

  // Distractor factors
  const candidateChips = new Set([trueGcf]);
  [2, 3, 4, 5, 6, 8].forEach(c => {
    if (c !== trueGcf && candidateChips.size < 5) candidateChips.add(c);
  });

  return {
    origA,
    origB,
    simpA: origA / trueGcf,
    simpB: origB / trueGcf,
    gcf: trueGcf,
    chips: [...candidateChips].sort((a, b) => a - b),
  };
}

export default function SimplifierLabStation({ onComplete, audioEnabled }) {
  const { narrate, stopAll, sounds } = useAudio(audioEnabled);
  const [problem, setProblem] = useState(() => getNewLabProblem());
  const [selectedChip, setSelectedChip] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errorChip, setErrorChip] = useState(null);

  function handleSelectChip(chip) {
    if (success) return;
    setSelectedChip(chip);

    if (chip === problem.gcf) {
      setErrorChip(null);
      setSuccess(true);
      sounds.correct();
      narrate([{ text: "Amazing! You simplified the ratio perfectly!", style: 'celebration' }]);
    } else {
      setErrorChip(chip);
      sounds.wrong();
      narrate([{ text: "Not quite! Check your common factors and try again.", style: 'encouragement' }]);
      setTimeout(() => setErrorChip(null), 700);
    }
  }

  function newProblem() {
    stopAll();
    setProblem(getNewLabProblem());
    setSelectedChip(null);
    setSuccess(false);
    setErrorChip(null);
  }

  return (
    <div className="station-wrap">
      <div className="station-header">
        <h3 className="station-title subheadline">🧪 Station B: GCF Simplifier Lab</h3>
        <div className="station-target-box">
          <span className="station-target-label">Original Ratio:</span>
          <span className="station-target-num number-display">{problem.origA} : {problem.origB}</span>
        </div>
      </div>

      <div className="gcf-station-body">
        <p className="body-text" style={{ color: 'var(--text-secondary)' }}>
          Select the <strong>Greatest Common Factor (GCF)</strong> to divide both terms:
        </p>

        {/* GCF Chips Pool */}
        <div className="gcf-chips-pool">
          {problem.chips.map(chip => (
            <button
              key={chip}
              className={`gcf-chip ${selectedChip === chip && success ? 'correct' : ''} ${errorChip === chip ? 'wrong' : ''}`}
              onClick={() => handleSelectChip(chip)}
              disabled={success}
            >
              <span>÷</span> <span>{chip}</span>
            </button>
          ))}
        </div>

        {/* Live Equation / Division breakdown */}
        <div className="gcf-equation-box">
          <span className="gcf-term">{problem.origA}</span>
          <span className="gcf-op">÷</span>
          <span className="gcf-term" style={{ color: 'var(--gold)' }}>{selectedChip || '?'}</span>
          <span className="gcf-op">=</span>
          <span className="gcf-term" style={{ color: success ? 'var(--green-light)' : '#fff' }}>
            {success ? problem.simpA : '?'}
          </span>

          <span className="gcf-op" style={{ margin: '0 8px' }}>|</span>

          <span className="gcf-term">{problem.origB}</span>
          <span className="gcf-op">÷</span>
          <span className="gcf-term" style={{ color: 'var(--gold)' }}>{selectedChip || '?'}</span>
          <span className="gcf-op">=</span>
          <span className="gcf-term" style={{ color: success ? 'var(--green-light)' : '#fff' }}>
            {success ? problem.simpB : '?'}
          </span>
        </div>

        {/* Visual Bar representation */}
        {success && (
          <RatioVisual
            type="bar_model"
            data={{
              valA: problem.origA,
              valB: problem.origB,
              simpA: problem.simpA,
              simpB: problem.simpB,
              labelA: 'Part A',
              labelB: 'Part B',
            }}
          />
        )}
      </div>

      {/* Success Result */}
      {success ? (
        <div className="station-success anim-bounce-in">
          <span className="success-icon">🎉</span>
          <p className="body-text" style={{ color: '#fff' }}>
            Dividing {problem.origA} and {problem.origB} by GCF {problem.gcf} yields the simplest ratio <strong>{problem.simpA} : {problem.simpB}</strong>!
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={newProblem}>Try Another</button>
            <button className="btn-green" onClick={onComplete}>Complete Station ✓</button>
          </div>
        </div>
      ) : (
        <div className="station-actions">
          <button className="btn-outline" onClick={newProblem}>New Ratio</button>
        </div>
      )}
    </div>
  );
}
