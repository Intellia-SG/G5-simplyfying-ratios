// src/features/simulate/simulations/RatioScaler.jsx
import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button.jsx';
import { sounds } from '../../../utils/audio.js';

const ROUNDS = 3;

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

function genRound() {
  let a = randInt(1, 5);
  let b = randInt(1, 5);
  while (a === b || gcd(a, b) > 1) {
    a = randInt(1, 6);
    b = randInt(1, 6);
  }
  const scaleTarget = randInt(2, 5);
  return { baseA: a, baseB: b, targetScale: scaleTarget, targetA: a * scaleTarget, targetB: b * scaleTarget };
}

function genOptions(correct) {
  const opts = new Set([correct]);
  for (const off of [1, 2, 3, -1, -2, -3]) {
    if (opts.size >= 4) break;
    const c = correct + off;
    if (c > 0) opts.add(c);
  }
  while (opts.size < 4) opts.add(correct + randInt(4, 10));
  return [...opts].sort(() => Math.random() - 0.5);
}

export default function RatioScaler({ onComplete }) {
  const [round, setRound]         = useState(0);
  const [setup, setSetup]         = useState(null);
  const [scale, setScale]         = useState(1);
  const [options, setOptions]     = useState([]);
  const [selected, setSelected]   = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore]         = useState(0);

  const newRound = () => {
    const s = genRound();
    setSetup(s); setScale(1); setSelected(null); setConfirmed(false);
    setOptions(genOptions(s.targetB));
  };
  useEffect(() => { newRound(); }, []);
  if (!setup) return null;

  const currentA = setup.baseA * scale;
  const currentB = setup.baseB * scale;
  const isCorrect = selected === setup.targetB && scale === setup.targetScale;

  const handleConfirm = () => {
    if (!selected || confirmed) return;
    setConfirmed(true);
    isCorrect ? (sounds.correct(), setScore(s => s + 1)) : sounds.wrong();
  };

  const handleNext = () => {
    const next = round + 1;
    if (next >= ROUNDS) { onComplete?.(score + (confirmed && isCorrect ? 0 : 0)); return; }
    setRound(next); newRound();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1, minHeight: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6,
        fontSize: '0.85rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
        <span>Round {round + 1} / {ROUNDS}</span>
        <span>Score: {score}/{round}</span>
      </div>

      <p className="sim-instruction">
        Scale the ratio {setup.baseA} : {setup.baseB} by factor ×{setup.targetScale}!
      </p>

      {/* Multiplier controller */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '10px 0' }}>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => { sounds.click(); setScale(s => Math.max(1, s - 1)); }}
          disabled={scale <= 1 || confirmed}
        >
          -
        </button>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--gold)' }}>
          ×{scale}
        </span>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => { sounds.click(); setScale(s => Math.min(6, s + 1)); }}
          disabled={scale >= 6 || confirmed}
        >
          +
        </button>
      </div>

      <div className="running-sentence">
        {setup.baseA} × {scale} = {currentA} &nbsp;|&nbsp; {setup.baseB} × {scale} = {currentB}
      </div>

      <div className="running-sentence" style={{ borderColor: 'var(--gold)' }}>
        Current Equivalent Ratio: <span style={{ color: 'var(--gold)' }}>{currentA} : {currentB}</span>
      </div>

      {scale === setup.targetScale && (
        <>
          <p className="sim-instruction" style={{ marginTop: 8 }}>
            What is Part B when Part A is {setup.targetA}?
          </p>
          <div className="options-grid">
            {options.map(opt => {
              let cls = 'option-btn';
              if (confirmed) {
                if (opt === setup.targetB) cls += ' correct';
                else if (opt === selected) cls += ' wrong';
                else cls += ' disabled';
              } else if (selected === opt) cls += ' selected';
              return (
                <button key={opt} className={cls} onClick={() => !confirmed && setSelected(opt)}>
                  {opt}
                </button>
              );
            })}
          </div>
        </>
      )}

      <div style={{ marginTop: 'auto', paddingTop: 10, flexShrink: 0 }}>
        {scale === setup.targetScale && !confirmed && (
          <Button variant="primary" size="sm" onClick={handleConfirm} disabled={!selected} style={{ width: '100%' }}>
            Check Answer ✓
          </Button>
        )}
        {confirmed && (
          <>
            <div style={{
              padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: 10,
              background: isCorrect ? 'rgba(0,230,118,0.14)' : 'rgba(255,82,82,0.14)',
              border: `1px solid ${isCorrect ? 'rgba(0,230,118,0.4)' : 'rgba(255,82,82,0.4)'}`,
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', textAlign: 'center',
            }}>
              {isCorrect ? '🎉 Correct! Both terms are scaled by the exact same multiplier!' : `❌ Answer: ${setup.targetB}`}
            </div>
            <Button variant="primary" size="sm" onClick={handleNext} style={{ width: '100%' }}>
              {round + 1 >= ROUNDS ? 'Finish ⭐' : 'Next Round →'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
