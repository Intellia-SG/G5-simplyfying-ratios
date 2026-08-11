// src/components/simulations/RatioSliderStation.jsx
import React, { useState } from 'react';
import './Stations.css';
import RatioVisual from '../shared/RatioVisual.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { randInt, gcd } from '../../utils/ratioMath.js';

function getNewSliderChallenge() {
  const baseA = randInt(1, 4);
  let baseB = randInt(1, 4);
  while (baseB === baseA || gcd(baseA, baseB) > 1) {
    baseB = randInt(1, 5);
  }
  const targetScale = randInt(2, 5);
  return {
    baseA,
    baseB,
    targetScale,
    targetA: baseA * targetScale,
    targetB: baseB * targetScale,
  };
}

export default function RatioSliderStation({ onComplete, audioEnabled }) {
  const { narrate, stopAll, sounds } = useAudio(audioEnabled);
  const [challenge, setChallenge] = useState(() => getNewSliderChallenge());
  const [scale, setScale] = useState(1);
  const [success, setSuccess] = useState(false);

  const currentA = challenge.baseA * scale;
  const currentB = challenge.baseB * scale;

  function handleSliderChange(e) {
    const val = Number(e.target.value);
    setScale(val);
    sounds.click();

    if (val === challenge.targetScale) {
      setSuccess(true);
      sounds.correct();
      narrate([{ text: "Amazing! You scaled the ratio to exact proportions!", style: 'celebration' }]);
    }
  }

  function newChallenge() {
    stopAll();
    setChallenge(getNewSliderChallenge());
    setScale(1);
    setSuccess(false);
  }

  return (
    <div className="station-wrap">
      <div className="station-header">
        <h3 className="station-title subheadline">🎚️ Station C: Live Ratio Slider & Scaler</h3>
        <div className="station-target-box">
          <span className="station-target-label">Target Batch:</span>
          <span className="station-target-num number-display">{challenge.targetA} : {challenge.targetB}</span>
        </div>
      </div>

      <div className="slider-station-body">
        <p className="body-text" style={{ color: 'var(--text-secondary)' }}>
          Base Ratio: <strong style={{ color: 'var(--gold)' }}>{challenge.baseA} : {challenge.baseB}</strong>. Drag the slider to scale the recipe!
        </p>

        {/* Slider Controls */}
        <div className="scale-slider-wrap">
          <span className="scale-factor-display">
            Scale Multiplier: ×{scale}
          </span>
          <input
            type="range"
            min="1"
            max="6"
            step="1"
            value={scale}
            onChange={handleSliderChange}
            className="scale-range-input"
            aria-label="Scale Multiplier Slider"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '400px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>×1</span>
            <span>×2</span>
            <span>×3</span>
            <span>×4</span>
            <span>×5</span>
            <span>×6</span>
          </div>
        </div>

        {/* Live Calculation Display */}
        <div className="running-ratio-bar" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#fff' }}>
            ({challenge.baseA} × {scale} = <span style={{ color: '#ff9f43' }}>{currentA}</span>) &nbsp;|&nbsp; ({challenge.baseB} × {scale} = <span style={{ color: '#7c5cbf' }}>{currentB}</span>)
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.35rem', color: 'var(--gold)', marginTop: '4px' }}>
            Current Ratio = {currentA} : {currentB}
          </div>
        </div>

        {/* Visual representation */}
        <RatioVisual
          type="bar_model"
          data={{
            valA: currentA,
            valB: currentB,
            simpA: challenge.baseA,
            simpB: challenge.baseB,
            labelA: 'Part A',
            labelB: 'Part B',
          }}
        />
      </div>

      {/* Success banner */}
      {success ? (
        <div className="station-success anim-bounce-in">
          <span className="success-icon">🎉</span>
          <p className="body-text" style={{ color: '#fff' }}>
            Target reached! Scaling {challenge.baseA} : {challenge.baseB} by ×{challenge.targetScale} makes <strong>{challenge.targetA} : {challenge.targetB}</strong>!
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={newChallenge}>Try Another</button>
            <button className="btn-green" onClick={onComplete}>Complete Station ✓</button>
          </div>
        </div>
      ) : (
        <div className="station-actions">
          <button className="btn-outline" onClick={newChallenge}>New Challenge</button>
        </div>
      )}
    </div>
  );
}
