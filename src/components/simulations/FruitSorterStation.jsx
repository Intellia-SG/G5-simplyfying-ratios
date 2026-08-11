// src/components/simulations/FruitSorterStation.jsx
import React, { useState } from 'react';
import './Stations.css';
import RatioVisual from '../shared/RatioVisual.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { randInt, gcd } from '../../utils/ratioMath.js';

function getNewTarget() {
  const simpA = randInt(2, 4);
  const simpB = randInt(2, 4);
  const scale = randInt(2, 4);
  const totalA = simpA * scale;
  const totalB = simpB * scale;
  return {
    simpA,
    simpB,
    scale,
    totalA,
    totalB,
    gcf: gcd(totalA, totalB),
  };
}

export default function FruitSorterStation({ onComplete, audioEnabled }) {
  const { narrate, stopAll, sounds } = useAudio(audioEnabled);
  const [target, setTarget] = useState(() => getNewTarget());
  const [placed, setPlaced] = useState({ a: 0, b: 0 });
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  function addFruit(key) {
    const maxVal = key === 'a' ? target.totalA : target.totalB;
    if (placed[key] >= maxVal) return;
    const next = { ...placed, [key]: placed[key] + 1 };
    setPlaced(next);
    sounds.click();

    if (next.a === target.totalA && next.b === target.totalB) {
      setSuccess(true);
      sounds.correct();
      narrate([{ text: "Amazing! You simplified the ratio perfectly!", style: 'celebration' }]);
    }
  }

  function removeFruit(key) {
    if (placed[key] <= 0) return;
    setPlaced(p => ({ ...p, [key]: p[key] - 1 }));
    setSuccess(false);
  }

  function newProblem() {
    stopAll();
    setTarget(getNewTarget());
    setPlaced({ a: 0, b: 0 });
    setSuccess(false);
  }

  function handleCheck() {
    if (placed.a === target.totalA && placed.b === target.totalB) {
      setSuccess(true);
      sounds.correct();
      narrate([{ text: "Amazing! You simplified the ratio perfectly!", style: 'celebration' }]);
    } else {
      setShake(true);
      sounds.wrong();
      narrate([{ text: "Not quite! Check your common factors and try again.", style: 'encouragement' }]);
      setTimeout(() => setShake(false), 600);
    }
  }

  return (
    <div className="station-wrap">
      <div className="station-header">
        <h3 className="station-title subheadline">🧺 Station A: Fruit Sorter & Equal Groups</h3>
        <div className={`station-target-box ${shake ? 'anim-shake' : ''}`}>
          <span className="station-target-label">Target Ratio:</span>
          <span className="station-target-num number-display">{target.totalA} : {target.totalB}</span>
        </div>
      </div>

      <div className="fruit-sorter-body">
        {/* Supply Bins */}
        <div className="fruit-supply">
          <div className="fruit-supply-item">
            <button
              className="fruit-btn"
              style={{ background: '#e53935' }}
              onClick={() => addFruit('a')}
              disabled={success}
            >
              <span className="fruit-icon">🍓</span>
              <span className="fruit-label">Strawberries</span>
              <span className="fruit-count">{placed.a} / {target.totalA}</span>
            </button>
            <button
              className="fruit-minus"
              onClick={() => removeFruit('a')}
              disabled={placed.a === 0}
            >
              −
            </button>
          </div>

          <div className="fruit-supply-item">
            <button
              className="fruit-btn"
              style={{ background: '#1e88e5' }}
              onClick={() => addFruit('b')}
              disabled={success}
            >
              <span className="fruit-icon">🫐</span>
              <span className="fruit-label">Blueberries</span>
              <span className="fruit-count">{placed.b} / {target.totalB}</span>
            </button>
            <button
              className="fruit-minus"
              onClick={() => removeFruit('b')}
              disabled={placed.b === 0}
            >
              −
            </button>
          </div>
        </div>

        {/* Visual grouping & calculation */}
        <div className="fruit-baskets-area">
          <RatioVisual
            type="bar_model"
            data={{
              valA: placed.a,
              valB: placed.b,
              simpA: target.simpA,
              simpB: target.simpB,
              labelA: 'Strawberries 🍓',
              labelB: 'Blueberries 🫐',
            }}
          />

          <div className="running-ratio-bar">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Equal Groups Formed:</span>
            <span className="running-ratio-text">
              {placed.a > 0 && placed.b > 0
                ? `${target.scale} baskets of (${target.simpA} 🍓 and ${target.simpB} 🫐) ➔ Simplest Ratio = ${target.simpA} : ${target.simpB}`
                : 'Add fruits to form equal groups!'}
            </span>
          </div>
        </div>
      </div>

      {/* Success banner or Action buttons */}
      {success ? (
        <div className="station-success anim-bounce-in">
          <span className="success-icon">🎉</span>
          <p className="body-text" style={{ color: '#fff' }}>
            Great job! {target.totalA} : {target.totalB} simplifies to <strong>{target.simpA} : {target.simpB}</strong> (GCF = {target.gcf})!
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={newProblem}>Try Another</button>
            <button className="btn-green" onClick={onComplete}>Complete Station ✓</button>
          </div>
        </div>
      ) : (
        <div className="station-actions">
          <button className="btn-outline" onClick={() => setPlaced({ a: 0, b: 0 })}>Reset</button>
          <button className="btn-primary" onClick={handleCheck}>Check Groups</button>
          <button className="btn-outline" onClick={newProblem}>New Ratio</button>
        </div>
      )}
    </div>
  );
}
