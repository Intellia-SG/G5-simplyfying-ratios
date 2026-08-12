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
        <h3 className="station-title">🧪 Station B: GCF Simplifier Lab</h3>
        <div className="station-target-box">
          <span className="station-target-label">Original Ratio:</span>
          <span className="station-target-num">{problem.origA} : {problem.origB}</span>
        </div>
      </div>

      <div className="station-grid-2col">
        {/* Left Column: GCF Chips Pool & Actions */}
        <div className="station-col-left">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p className="station-guide-text" style={{ textAlign: 'left', fontWeight: 700 }}>
              Select the <strong>Greatest Common Factor (GCF)</strong> to divide both terms:
            </p>

            <div className="gcf-chips-pool">
              {problem.chips.map(chip => (
                <button
                  key={chip}
                  className={`gcf-chip ${selectedChip === chip && success ? 'correct' : ''} ${errorChip === chip ? 'wrong' : ''}`}
                  onClick={() => handleSelectChip(chip)}
                  disabled={success}
                  aria-label={`Divide by ${chip}`}
                >
                  <span style={{ opacity: 0.7 }}>÷</span>
                  <span>{chip}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="station-actions">
            <button className="btn-outline" onClick={newProblem}>New Ratio</button>
          </div>
        </div>

        {/* Right Column: Live Equation, Visual & Success Banner */}
        <div className="station-col-right">
          <div className="gcf-equation-box">
            <span className="gcf-term">{problem.origA}</span>
            <span className="gcf-op">÷</span>
            <span className="gcf-term" style={{ color: 'var(--gold)' }}>{selectedChip || '?'}</span>
            <span className="gcf-op">=</span>
            <span className="gcf-term" style={{ color: success ? 'var(--green-light)' : '#fff' }}>
              {success ? problem.simpA : '?'}
            </span>

            <span className="gcf-op" style={{ margin: '0 4px', opacity: 0.4 }}>|</span>

            <span className="gcf-term">{problem.origB}</span>
            <span className="gcf-op">÷</span>
            <span className="gcf-term" style={{ color: 'var(--gold)' }}>{selectedChip || '?'}</span>
            <span className="gcf-op">=</span>
            <span className="gcf-term" style={{ color: success ? 'var(--green-light)' : '#fff' }}>
              {success ? problem.simpB : '?'}
            </span>
          </div>

          <RatioVisual
            type="bar_model"
            compact={true}
            data={{
              valA: success ? problem.origA : (selectedChip ? Math.round(problem.origA / selectedChip) : problem.origA),
              valB: success ? problem.origB : (selectedChip ? Math.round(problem.origB / selectedChip) : problem.origB),
              simpA: problem.simpA,
              simpB: problem.simpB,
              labelA: 'Part A',
              labelB: 'Part B',
            }}
          />

          {success ? (
            <div className="station-success anim-bounce-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="success-icon">🎉</span>
                <p className="station-success-msg">
                  Dividing by GCF <strong>{problem.gcf}</strong> gives the simplest ratio <strong>{problem.simpA} : {problem.simpB}</strong>!
                </p>
              </div>
              <div className="station-success-actions">
                <button className="btn-primary" onClick={newProblem}>Try Another</button>
                <button className="btn-green" onClick={onComplete}>Complete Station ✓</button>
              </div>
            </div>
          ) : (
            <div className="station-guide-card">
              <span className="station-guide-text">
                Find the highest number on the left that divides both <strong>{problem.origA}</strong> and <strong>{problem.origB}</strong> with no remainder.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

