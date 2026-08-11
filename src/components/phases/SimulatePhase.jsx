// src/components/phases/SimulatePhase.jsx
import React, { useEffect, useRef } from 'react';
import './SimulatePhase.css';
import FruitSorterStation from '../simulations/FruitSorterStation.jsx';
import SimplifierLabStation from '../simulations/SimplifierLabStation.jsx';
import RatioSliderStation from '../simulations/RatioSliderStation.jsx';
import SpotErrorStation from '../simulations/SpotErrorStation.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { simStationIntro } from '../../utils/narration.js';

const STATIONS = [
  { id: 0, label: 'A', name: 'Fruit Sorter',     icon: '🧺', desc: 'Equal groups & ratio baskets' },
  { id: 1, label: 'B', name: 'Simplifier Lab',   icon: '🧪', desc: 'Divide by GCF step by step' },
  { id: 2, label: 'C', name: 'Ratio Scaler',     icon: '🎚️', desc: 'Live multiplier & proportion slider' },
  { id: 3, label: 'D', name: 'Spot the Error',   icon: '🔍', desc: 'Find & diagnose simplification errors' },
];

export default function SimulatePhase({ state, dispatch }) {
  const { narrate, stopAll } = useAudio(state.audioEnabled);
  const prevStation = useRef(-1);

  const s = state.currentSimStation || 0;

  useEffect(() => {
    if (prevStation.current !== s) {
      prevStation.current = s;
      stopAll();
      setTimeout(() => narrate(simStationIntro(s)), 400);
    }
  }, [s, narrate, stopAll]);

  useEffect(() => {
    return () => stopAll();
  }, [stopAll]);

  function handleStationComplete(stationIdx) {
    stopAll();
    dispatch({ type: 'COMPLETE_SIM_STATION', payload: stationIdx });
    if (stationIdx < 3) {
      setTimeout(() => dispatch({ type: 'ADVANCE_SIM_STATION' }), 600);
    } else {
      setTimeout(() => dispatch({ type: 'SET_PHASE', payload: 'play' }), 900);
    }
  }

  function goToPrev() {
    stopAll();
    dispatch({ type: 'PREV_SIM_STATION' });
  }

  function goToNext() {
    stopAll();
    dispatch({ type: 'ADVANCE_SIM_STATION' });
  }

  return (
    <div className="sim-wrap">
      <div className="sim-card glass-card">
        {/* Stations Tab Bar */}
        <div className="sim-tabs" role="tablist">
          {STATIONS.map((st) => (
            <button
              key={st.id}
              role="tab"
              aria-selected={s === st.id}
              className={`sim-tab ${s === st.id ? 'active' : ''} ${state.simStationsComplete[st.id] ? 'done' : ''}`}
              onClick={() => {
                if (st.id > s && !state.simStationsComplete[s]) return;
                stopAll();
                if (st.id > s) {
                  for (let i = 0; i < st.id - s; i++) dispatch({ type: 'ADVANCE_SIM_STATION' });
                } else if (st.id < s) {
                  for (let i = 0; i < s - st.id; i++) dispatch({ type: 'PREV_SIM_STATION' });
                }
              }}
              aria-label={`Station ${st.label}: ${st.name}`}
              disabled={st.id > s && !state.simStationsComplete[s]}
            >
              <span className="tab-icon">{state.simStationsComplete[st.id] ? '✅' : st.icon}</span>
              <span className="tab-name">{st.name}</span>
            </button>
          ))}
        </div>

        {/* Station Content Area */}
        <div className="sim-station-area" role="tabpanel" key={s}>
          {s === 0 && <FruitSorterStation onComplete={() => handleStationComplete(0)} audioEnabled={state.audioEnabled} />}
          {s === 1 && <SimplifierLabStation onComplete={() => handleStationComplete(1)} audioEnabled={state.audioEnabled} />}
          {s === 2 && <RatioSliderStation onComplete={() => handleStationComplete(2)} audioEnabled={state.audioEnabled} />}
          {s === 3 && <SpotErrorStation onComplete={() => handleStationComplete(3)} audioEnabled={state.audioEnabled} />}
        </div>

        {/* Footer Navigation */}
        <div className="sim-footer">
          <button className="btn-outline" onClick={goToPrev} disabled={s === 0}>
            ← Previous Station
          </button>
          <div className="sim-progress-dots">
            {STATIONS.map((st) => (
              <span
                key={st.id}
                className={`sim-dot ${s === st.id ? 'active' : ''} ${state.simStationsComplete[st.id] ? 'done' : ''}`}
              />
            ))}
          </div>
          {s < 3 ? (
            <button
              className={state.simStationsComplete[s] ? "btn-primary" : "btn-outline"}
              onClick={goToNext}
              disabled={!state.simStationsComplete[s]}
            >
              Next Station →
            </button>
          ) : state.simStationsComplete[3] ? (
            <button
              className="btn-primary"
              onClick={() => {
                stopAll();
                dispatch({ type: 'SET_PHASE', payload: 'play' });
              }}
            >
              Start Practicing! 🎮
            </button>
          ) : (
            <button className="btn-outline" disabled>
              Next Station →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
