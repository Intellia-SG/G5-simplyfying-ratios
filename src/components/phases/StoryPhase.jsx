// src/components/phases/StoryPhase.jsx
import React, { useEffect, useState } from 'react';
import './StoryPhase.css';
import { STORY_PANELS } from '../../data/storyContent.js';
import { useAudio } from '../../hooks/useAudio.js';
import { storyNarration } from '../../utils/narration.js';

function StoryImage({ panel }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [panel.panel]);

  return (
    <div className="story-image-container">
      {!imgError ? (
        <img
          key={panel.panel}
          src={`/assets/images/story_${panel.panel}.png`}
          alt={panel.title}
          onError={() => setImgError(true)}
          className="story-full-img"
        />
      ) : (
        <div className="story-img-fallback" style={{ background: panel.imageBg }}>
          <span className="fallback-emoji">{panel.imageEmoji}</span>
          <span className="fallback-title">{panel.title}</span>
          <span className="fallback-highlight">{panel.highlight}</span>
        </div>
      )}
    </div>
  );
}

export default function StoryPhase({ state, dispatch }) {
  const panel = STORY_PANELS[state.storyPanel] || STORY_PANELS[0];
  const { narrate, stopAll } = useAudio(state.audioEnabled);
  const totalPanels = STORY_PANELS.length;
  const isLastPanel = state.storyPanel >= totalPanels - 1;

  useEffect(() => {
    stopAll();
    const timer = setTimeout(() => narrate(storyNarration(state.storyPanel)), 300);
    return () => { clearTimeout(timer); stopAll(); };
  }, [state.storyPanel, narrate, stopAll]);

  function handleNext() {
    stopAll();
    dispatch({ type: 'NEXT_STORY_PANEL' });
  }

  function handlePrev() {
    stopAll();
    dispatch({ type: 'PREV_STORY_PANEL' });
  }

  return (
    <div className="story-wrap">
      <div className="story-container anim-slide-up" key={state.storyPanel}>
        {/* Top Progress Bar Row matching Reference Image */}
        <div className="story-progress-bar-row">
          <div className="story-track">
            <div
              className="story-fill"
              style={{ width: `${((state.storyPanel + 1) / totalPanels) * 100}%` }}
            />
          </div>
          <span className="story-counter-text">{state.storyPanel + 1} / {totalPanels}</span>
        </div>

        {/* Main Horizontal Story Card */}
        <div className="story-main-card">
          {/* Left: Complete Image in full original frame */}
          <div className="story-image-section">
            <StoryImage panel={panel} />
          </div>

          {/* Right: Story Content */}
          <div className="story-content-section">
            <h2 className="story-title">{panel.title}</h2>
            <p className="story-text">{panel.text}</p>

            {panel.highlight && (
              <div className="story-prompt-pill">
                <span className="prompt-icon">💡</span>
                <span className="prompt-text">{panel.highlight}</span>
              </div>
            )}

            {/* Character Badge */}
            <div className="story-character-badge">
              <div className="character-avatar-circle">
                <span className="character-emoji">🦁</span>
              </div>
              <span className="character-name">{panel.character || 'Leo'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Centered Dots + Right Next Button */}
        <div className="story-footer-nav">
          <div className="story-dots-center">
            {STORY_PANELS.map((_, i) => (
              <span
                key={i}
                className={`story-nav-dot ${i === state.storyPanel ? 'active' : ''} ${i < state.storyPanel ? 'done' : ''}`}
              />
            ))}
          </div>

          <div className="story-nav-actions">
            {state.storyPanel > 0 && (
              <button
                type="button"
                id="story-prev-btn"
                className="btn-outline story-prev-btn"
                onClick={handlePrev}
                aria-label="Previous story"
              >
                ← Previous
              </button>
            )}
            <button
              type="button"
              id="story-next-btn"
              className="btn-primary story-next-btn"
              onClick={handleNext}
              aria-label={isLastPanel ? 'Start Simulating' : 'Next story'}
            >
              {!isLastPanel ? 'Next →' : 'Start Simulating! 🧪'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
