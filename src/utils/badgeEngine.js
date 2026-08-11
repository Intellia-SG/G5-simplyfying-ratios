// src/utils/badgeEngine.js
// Badge definitions and unlock triggers for Simplifying Ratios

export const BADGES = [
  { id: 'first_ratio',       icon: '🏅', label: 'First Ratio',       description: 'Simplified your very first ratio!' },
  { id: 'hot_streak',        icon: '🔥', label: 'On Fire!',          description: 'Achieved a streak of 5 correct answers!' },
  { id: 'super_streak',      icon: '⚡', label: 'Ratio Prodigy',     description: 'Achieved a 10-question winning streak!' },
  { id: 'sim_master',        icon: '🧪', label: 'Simulation Master', description: 'Completed all 4 simulation stations!' },
  { id: 'district_champ',    icon: '⭐', label: 'District Star',     description: 'Scored 3 stars in a Practice district!' },
  { id: 'boss_slayer',       icon: '👑', label: 'Boss Slayer',       description: 'Defeated a World Ratio Boss!' },
  { id: 'century_scorer',    icon: '🎯', label: 'Centurion',         description: 'Answered over 20 questions in Practice!' },
  { id: 'ratio_grandmaster', icon: '🏆', label: 'Ratio Master',      description: 'Completed the full 5-phase learning journey!' },
];

export function checkBadges(state) {
  const unlocked = [];

  // First correct answer
  const totalCorrect = state.districtCorrect?.reduce((s, c) => s + (c || 0), 0) || 0;
  if (totalCorrect >= 1) unlocked.push('first_ratio');

  // Streak checks
  if (state.maxStreak >= 5) unlocked.push('hot_streak');
  if (state.maxStreak >= 10) unlocked.push('super_streak');

  // Simulation completion
  if (state.simStationsComplete && state.simStationsComplete.every(Boolean)) {
    unlocked.push('sim_master');
  }

  // 3-star district check
  if (state.districtScores && state.districtScores.some(score => score !== null && score >= 9)) {
    unlocked.push('district_champ');
  }

  // Centurion
  if (state.currentQuestion >= 20 || totalCorrect >= 20) {
    unlocked.push('century_scorer');
  }

  // Boss slayer
  if (state.bossDefeated) {
    unlocked.push('boss_slayer');
  }

  // Full journey
  if (state.phaseComplete && Object.values(state.phaseComplete).every(Boolean)) {
    unlocked.push('ratio_grandmaster');
  }

  return unlocked;
}
