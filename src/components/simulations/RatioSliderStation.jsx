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
        <h3 className="station-title">🎚️ Station C: Live Ratio Slider & Scaler</h3>
        <div className="station-target-box">
          <span className="station-target-label">Target Batch:</span>
          <span className="station-target-num">{challenge.targetA} : {challenge.targetB}</span>
        </div>
      </div>

      <div className="station-grid-2col">
        {/* Left Column: Slider Controls & Actions */}
        <div className="station-col-left">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p className="station-guide-text" style={{ textAlign: 'left', fontWeight: 700 }}>
              Base Ratio: <strong style={{ color: 'var(--gold)' }}>{challenge.baseA} : {challenge.baseB}</strong>. Drag the slider to scale!
            </p>

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
              <div className="slider-ticks-row">
                <span>×1</span>
                <span>×2</span>
                <span>×3</span>
                <span>×4</span>
                <span>×5</span>
                <span>×6</span>
              </div>
            </div>
          </div>

          <div className="station-actions">
            <button className="btn-outline" onClick={newChallenge}>New Challenge</button>
          </div>
        </div>

        {/* Right Column: Live Calculations, Visual & Success Banner */}
        <div className="station-col-right">
          <div className="running-ratio-bar">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.02rem, 1.25vw, 1.22rem)', color: '#fff' }}>
              ({challenge.baseA} × {scale} = <strong style={{ color: '#ff9f43' }}>{currentA}</strong>) &nbsp;|&nbsp; ({challenge.baseB} × {scale} = <strong style={{ color: '#a5b4fc' }}>{currentB}</strong>)
            </div>
            <div className="running-ratio-text">
              Current Ratio = {currentA} : {currentB}
            </div>
          </div>

          <RatioVisual
            type="bar_model"
            compact={true}
            data={{
              valA: currentA,
              valB: currentB,
              simpA: challenge.baseA,
              simpB: challenge.baseB,
              labelA: 'Part A',
              labelB: 'Part B',
            }}
          />

          {success ? (
            <div className="station-success anim-bounce-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="success-icon">🎉</span>
                <p className="station-success-msg">
                  Target reached! Scaling {challenge.baseA} : {challenge.baseB} by ×{challenge.targetScale} makes <strong>{challenge.targetA} : {challenge.targetB}</strong>!
                </p>
              </div>
              <div className="station-success-actions">
                <button className="btn-primary" onClick={newChallenge}>Try Another</button>
                <button className="btn-green" onClick={onComplete}>Complete Station ✓</button>
              </div>
            </div>
          ) : (
            <div className="station-guide-card">
              <span className="station-guide-text">
                Slide the multiplier until the current ratio reaches <strong>{challenge.targetA} : {challenge.targetB}</strong>.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

