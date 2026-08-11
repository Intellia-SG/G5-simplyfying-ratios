// src/components/simulations/SpotErrorStation.jsx
import React, { useState } from 'react';
import './Stations.css';
import { useAudio } from '../../hooks/useAudio.js';

const ERROR_SCENARIOS = [
  {
    id: 0,
    problem: "Simplify 12 : 18",
    steps: [
      { text: "Find common factor of 6", isError: false },
      { text: "Divide 12 ÷ 6 = 2", isError: false },
      { text: "Divide 18 ÷ 3 = 6 ➔ 2 : 6", isError: true, errorReason: "Must divide BOTH sides by the SAME number (6)!" },
    ],
    correctSimplification: "12 ÷ 6 = 2 and 18 ÷ 6 = 3 ➔ 2 : 3",
  },
  {
    id: 1,
    problem: "Simplify 20 : 35",
    steps: [
      { text: "Identify common factor 5", isError: false },
      { text: "Subtract 5 from 20 = 15", isError: true, errorReason: "Ratios are simplified by DIVIDING, not subtracting!" },
      { text: "Subtract 5 from 35 = 30", isError: false },
    ],
    correctSimplification: "20 ÷ 5 = 4 and 35 ÷ 5 = 7 ➔ 4 : 7",
  },
  {
    id: 2,
    problem: "Simplify 24 : 36",
    steps: [
      { text: "Divide 24 ÷ 2 = 12", isError: false },
      { text: "Divide 36 ÷ 2 = 18", isError: false },
      { text: "Final answer is 12 : 18 (Done!)", isError: true, errorReason: "12 : 18 is not the simplest form — both still divide by 6 to reach 2 : 3!" },
    ],
    correctSimplification: "24 ÷ 12 = 2 and 36 ÷ 12 = 3 ➔ 2 : 3",
  },
];

export default function SpotErrorStation({ onComplete, audioEnabled }) {
  const { narrate, stopAll, sounds } = useAudio(audioEnabled);
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selectedStep, setSelectedStep] = useState(null);
  const [success, setSuccess] = useState(false);

  const scenario = ERROR_SCENARIOS[scenarioIdx];

  function handleSelectStep(stepIndex) {
    if (success) return;
    const step = scenario.steps[stepIndex];
    setSelectedStep(stepIndex);

    if (step.isError) {
      setSuccess(true);
      sounds.correct();
      narrate([{ text: "Spot on! You found the mistake!", style: 'celebration' }]);
    } else {
      sounds.wrong();
      narrate([{ text: "That step is correct. Look closely at the other steps!", style: 'encouragement' }]);
    }
  }

  function nextScenario() {
    stopAll();
    setScenarioIdx((s) => (s + 1) % ERROR_SCENARIOS.length);
    setSelectedStep(null);
    setSuccess(false);
  }

  return (
    <div className="station-wrap">
      <div className="station-header">
        <h3 className="station-title subheadline">🔍 Station D: Spot the Ratio Error</h3>
        <div className="station-target-box">
          <span className="station-target-label">Problem:</span>
          <span className="station-target-num number-display">{scenario.problem}</span>
        </div>
      </div>

      <div className="spot-error-body">
        <p className="body-text" style={{ color: 'var(--text-secondary)' }}>
          A student worked out this problem with a mistake. Tap the <strong>incorrect step</strong>:
        </p>

        {/* Steps List */}
        <div className="spot-steps-list">
          {scenario.steps.map((step, idx) => {
            const isSelected = selectedStep === idx;
            return (
              <div
                key={idx}
                className={`spot-step-card ${isSelected && step.isError ? 'selected-error' : ''} ${isSelected && !step.isError ? 'selected-correct-step' : ''}`}
                onClick={() => handleSelectStep(idx)}
                role="button"
                tabIndex={0}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--gold)' }}>
                    Step {idx + 1}:
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.02rem', color: '#ffffff' }}>
                    {step.text}
                  </span>
                </div>
                {isSelected && step.isError && <span style={{ fontSize: '1.4rem' }}>🎯</span>}
              </div>
            );
          })}
        </div>

        {/* Error Explanation on Success */}
        {success && selectedStep !== null && (
          <div className="station-success anim-bounce-in">
            <span className="success-icon">💡</span>
            <p className="body-text" style={{ color: '#fff' }}>
              <strong>Error Diagnosed:</strong> {scenario.steps[selectedStep].errorReason}
            </p>
            <p style={{ color: 'var(--green-light)', fontWeight: 800, fontSize: '1.1rem', marginTop: '4px' }}>
              Correct Solution: {scenario.correctSimplification}
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px', justifyContent: 'center' }}>
              <button className="btn-primary" onClick={nextScenario}>Try Another</button>
              <button className="btn-green" onClick={onComplete}>Complete Station ✓</button>
            </div>
          </div>
        )}
      </div>

      {!success && (
        <div className="station-actions">
          <button className="btn-outline" onClick={nextScenario}>Next Problem</button>
        </div>
      )}
    </div>
  );
}
