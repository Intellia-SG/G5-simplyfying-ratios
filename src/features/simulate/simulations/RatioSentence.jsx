// src/features/simulate/simulations/RatioSentence.jsx
import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button.jsx';
import NumberPad from '../../../components/NumberPad.jsx';
import { sounds } from '../../../utils/audio.js';

const ROUNDS = 3;

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function genRound() {
  const simpA = randInt(1, 5);
  const simpB = randInt(1, 5);
  const factor = randInt(2, 6);
  const origA = simpA * factor;
  const origB = simpB * factor;
  const findSecond = Math.random() > 0.5;
  return { simpA, simpB, factor, origA, origB, findSecond, answer: findSecond ? origB : origA };
}

export default function RatioSentence({ onComplete }) {
  const [round, setRound]         = useState(0);
  const [setup, setSetup]         = useState(null);
  const [value, setValue]         = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore]         = useState(0);

  const newRound = () => { setSetup(genRound()); setValue(''); setConfirmed(false); };
  useEffect(() => { newRound(); }, []);
  if (!setup) return null;

  const isCorrect = Number(value) === setup.answer;

  const handleSubmit = () => {
    if (!value || confirmed) return;
    setConfirmed(true);
    isCorrect ? (sounds.correct(), setScore(s => s + 1)) : sounds.wrong();
  };

  const handleNext = () => {
    const next = round + 1;
    if (next >= ROUNDS) { onComplete?.(score); return; }
    setRound(next); newRound();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1, minHeight: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6,
        fontSize: '0.85rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
        <span>Round {round + 1} / {ROUNDS}</span>
        <span>Score: {score}/{round}</span>
      </div>

      <p className="sim-instruction">Fill in the blank to make the ratios equivalent!</p>

      <div className="ratio-sentence">
        <span className="rs-num">{setup.simpA}</span>
        <span className="rs-op">:</span>
        <span className="rs-num">{setup.simpB}</span>
        <span className="rs-op">=</span>
        <span className="rs-num">{setup.findSecond ? setup.origA : (value || '?')}</span>
        <span className="rs-op">:</span>
        <span className="rs-num">{setup.findSecond ? (value || '?') : setup.origB}</span>
      </div>

      {!confirmed && <NumberPad value={value} onChange={setValue} onSubmit={handleSubmit} />}

      <div style={{ marginTop: 'auto', paddingTop: 10, flexShrink: 0 }}>
        {!confirmed ? (
          <Button variant="primary" size="sm" onClick={handleSubmit} disabled={!value} style={{ width: '100%' }}>
            Check Answer ✓
          </Button>
        ) : (
          <>
            <div style={{
              padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: 10,
              background: isCorrect ? 'rgba(0,230,118,0.14)' : 'rgba(255,82,82,0.14)',
              border: `1px solid ${isCorrect ? 'rgba(0,230,118,0.4)' : 'rgba(255,82,82,0.4)'}`,
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', textAlign: 'center',
            }}>
              {isCorrect ? '🎉 Correct! Equivalent ratios maintain the same proportion!' : `❌ Answer: ${setup.answer}`}
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
