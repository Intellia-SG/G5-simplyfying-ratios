import React from 'react';
import { Volume2, VolumeX, Home } from 'lucide-react';

export default function TopBar({ audioEnabled, onToggleAudio, onHome, showHome = true }) {
  return (
    <>
      {showHome && (
        <button
          className="home-btn"
          aria-label="Go to home / intro screen"
          onClick={onHome}
        >
          <Home size={22} />
        </button>
      )}
      <button
        className="audio-toggle-btn"
        aria-label={audioEnabled ? 'Mute narration' : 'Unmute narration'}
        onClick={onToggleAudio}
      >
        {audioEnabled ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </button>
    </>
  );
}
