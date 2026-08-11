// src/config/worlds.config.js
export const WORLDS = [
  { id: 0, name: 'Flavor Lab',       emoji: '🥤', accent: '#ff7043',
    description: 'Mix fruit smoothies using exact ratio recipes',
    boss: { name: 'Chef Ratio',       emoji: '👨‍🍳', reward: 'Master Mixologist Badge 🥤' } },
  { id: 1, name: 'Paint Workshop',  emoji: '🎨', accent: '#4caf50',
    description: 'Blend red, blue and yellow paints in simplest ratios',
    boss: { name: 'Color Boss',       emoji: '🖌️', reward: 'Artisan Palette Badge 🎨' } },
  { id: 2, name: 'Ocean Expedition',emoji: '🌊', accent: '#0ea5e9',
    description: 'Compare schools of fish, corals, and submarine gears',
    boss: { name: 'Captain Scale',    emoji: '⚓', reward: 'Deep Sea Ratio Badge 🌊' } },
  { id: 3, name: 'Golden Bakery',    emoji: '🥐', accent: '#ffd54f',
    description: 'Scale flour to sugar ratios for giant batches',
    boss: { name: 'Grand Baker',      emoji: '🥖', reward: 'Baker Gold Badge 🥐' } },
  { id: 4, name: 'Lava Forge',       emoji: '🌋', accent: '#ef5350',
    description: 'Combine metal ores in simplest integer ratios',
    boss: { name: 'Forge Master',     emoji: '🔥', reward: 'Titanium Ratio Badge 🌋' } },
  { id: 5, name: 'Cosmic Observatory', emoji: '🚀', accent: '#9c27b0',
    description: 'Calculate planetary distance & rocket fuel ratios',
    boss: { name: 'Starlight Boss',   emoji: '☄️', reward: 'Cosmic Navigator Badge 🚀' } },
  { id: 6, name: 'Dragon Sanctuary', emoji: '🐉', accent: '#ff5722',
    description: 'Balance gem feeds for fire and ice dragons',
    boss: { name: 'Dragon Keeper',    emoji: '🐲', reward: 'Dragon Master Badge 🐉' } },
  { id: 7, name: 'Crystal Academy',  emoji: '💎', accent: '#3f51b5',
    description: 'Simplify 3-part crystal ratios to their lowest terms',
    boss: { name: 'Prism Scholar',    emoji: '🔮', reward: 'Crystal Crown Badge 💎' } },
  { id: 8, name: 'Spectrum Studio',  emoji: '🌈', accent: '#e91e63',
    description: 'Convert mixed units into uniform simplest ratios',
    boss: { name: 'Prismatic Boss',   emoji: '✨', reward: 'Spectrum Elite Badge 🌈' } },
  { id: 9, name: 'Ratio Citadel',   emoji: '🏰', accent: '#00bcd4',
    description: 'Conquer the final Grade 5 Ratio Master challenge',
    boss: { name: 'Citadel Monarch',  emoji: '👑', reward: 'Ratio Grand Master Badge 🏰' } },
];

// ── Play / Practice modes (within each world) ──
export const PLAY_MODES = [
  {
    id: 'guided',
    name: 'Guided Practice',
    icon: '🧭',
    desc: '5 questions with hints, step-by-step guidance',
    questionCount: 5,
    hints: true,
    timed: false,
    lives: false,
  },
  {
    id: 'independent',
    name: 'Independent Practice',
    icon: '✍️',
    desc: '10 questions, no hints, full XP reward',
    questionCount: 10,
    hints: false,
    timed: false,
    lives: false,
  },
  {
    id: 'timed',
    name: 'Timed Challenge',
    icon: '⏱️',
    desc: '8 questions in 60 seconds, speed bonus XP',
    questionCount: 8,
    hints: false,
    timed: true,
    timeLimit: 60,
    lives: false,
  },
  {
    id: 'boss',
    name: 'Boss Battle',
    icon: '👑',
    desc: '5 questions, 3 lives — defeat the ratio boss!',
    questionCount: 5,
    hints: false,
    timed: false,
    lives: true,
  },
];

// ── Badges ──
export const BADGES = [
  { id: 'first_ratio',          name: 'First Ratio',          icon: '🏅', desc: 'First correct ratio simplification' },
  { id: 'hot_streak',           name: 'Hot Streak',            icon: '🔥', desc: '5 consecutive correct answers' },
  { id: 'lab_simplifier',       name: 'Lab Simplifier',        icon: '🧪', desc: 'Completed all Simulation stations' },
  { id: 'ratio_master',         name: 'Ratio Master',          icon: '🥇', desc: '80%+ score on Grade 5 Practice' },
  { id: 'perfect_simplifier',   name: 'Perfect Simplifier',    icon: '💎', desc: '100% score on any world' },
  { id: 'boss_slayer',          name: 'Boss Slayer',           icon: '👑', desc: 'Defeated a world Ratio Boss' },
  { id: 'full_journey',         name: 'Full Journey',          icon: '🌟', desc: 'Completed all 5 learning phases' },
];

// ── XP economy ──
export const XP_REWARDS = {
  CORRECT: 10,
  STREAK_BONUS: 15,
  STATION_COMPLETE: 20,
  WORLD_COMPLETE: 50,
  BOSS_WIN: 100,
};
