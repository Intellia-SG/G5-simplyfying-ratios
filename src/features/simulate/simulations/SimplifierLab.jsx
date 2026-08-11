// src/features/simulate/simulations/SimplifierLab.jsx
import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button.jsx';
import RatioDiagram from '../../../components/RatioDiagram.jsx';
import { sounds } from '../../../utils/audio.js';

const ROUNDS = 3;

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

function genRound() {
  let simpA = randInt(1, 5);
  let simpB = randInt(1, 5);
  while (simpA === simpB || gcd(simpA, simpB) > 1) {
    simpA = randInt(1, 6);
    simpB = randInt(1, 6);
  }
  const commonGcf = randInt(2, 6);
  const origA = simpA * commonGcf;
  const origB = simpB * commonGcf;
  const correct = `${simpA}:${simpB}`;
  return { origA, origB, simpA, simpB, gcf: commonGcf, correct };
}

function genOptions(correctStr, simpA, simpB) {
  const opts = new Set([correctStr]);
  const offsets = [
    `${simpA + 1}:${simpB}`,
    `${simpA}:${simpB + 1}`,
    `${simpB}:${simpA}`,
    `${simpA * 2}:${simpB}`,
  ];
  for (const o of offsets) {
    if (opts.size >= 4) break;
    opts.add(o);
  }
  while (opts.size < 4) opts.add(`${randInt(1, 7)}:${randInt(1, 7)}`);
  return [...opts].sort(() => Math.random() - 0.5);
}

export default function SimplifierLab({ onComplete }) {
  const [round, setRound]         = useState(0);
  const [setup, setSetup]         = useState(null);
  const [options, setOptions]     = useState([]);
  const [selected, setSelected]   = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore]         = useState(0);

  const newRound = () => {
    const s = genRound();
    setSetup(s);
    setOptions(genOptions(s.correct, s.simpA, s.simpB));
    setSelected(null);
    setConfirmed(false);
  };
  useEffect(() => { newRound(); }, []);
  if (!setup) return null;

  const isCorrect = selected === setup.correct;

  const handleConfirm = () => {
    if (!selected || confirmed) return;
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

      <p className="sim-instruction">Divide both terms by GCF ({setup.gcf}) to simplify!</p>

      <RatioDiagram valA={setup.origA} valB={setup.origB} simpA={setup.simpA} simpB={setup.simpB} animated />

      <div className="running-sentence" style={{ marginTop: 4 }}>
        {setup.origA} ÷ {setup.gcf} = {setup.simpA} &nbsp;|&nbsp; {setup.origB} ÷ {setup.gcf} = {setup.simpB}
      </div>

      <div className="options-grid">
        {options.map(opt => {
          let cls = 'option-btn';
          if (confirmed) {
            if (opt === setup.correct) cls += ' correct';
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

      <div style={{ marginTop: 'auto', paddingTop: 10, flexShrink: 0 }}>
        {!confirmed ? (
          <Button variant="primary" size="sm" onClick={handleConfirm} disabled={!selected} style={{ width: '100%' }}>
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
              {isCorrect ? '🎉 Correct! Dividing by GCF gives the simplest integer ratio!' : `❌ Answer: ${setup.correct}`}
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
