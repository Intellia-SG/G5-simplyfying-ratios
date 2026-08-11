// src/utils/narration.js
// Narration helper segments with exact 1:1 parity with UI and audioMap

export const say       = (text) => ({ text, style: 'statement' });
export const ask       = (text) => ({ text, style: 'question' });
export const cheer     = (text) => ({ text, style: 'celebration' });
export const emphasize = (text) => ({ text, style: 'emphasis' });
export const think     = (text) => ({ text, style: 'thinking' });
export const celebrate = (text) => ({ text, style: 'celebration' });
export const instruct  = (text) => ({ text, style: 'instruction' });
export const encourage = (text) => ({ text, style: 'encouragement' });

// ─── INTRO ────────────────────────────────────────────────────────────────
export function introNarration() {
  return [
    cheer("Hi! I'm Leo. Ready to explore and simplify ratios? Let's begin our journey!"),
  ];
}

// ─── WONDER ──────────────────────────────────────────────────────────────
export function wonderNarration() {
  return [
    cheer("The Big Smoothie Mystery!"),
    ask("If a smoothie master mixes twenty-four strawberries and thirty-six blueberries into identical mini-cups, what is the simplest recipe ratio, and how many cups can they make?"),
    encourage("Let's investigate how finding common factors simplifies any ratio!"),
  ];
}

// ─── STORY ───────────────────────────────────────────────────────────────
export function storyNarration(panelIndex) {
  const panels = [
    [say("Leo runs a popular juice bar in Sunnyside Town. For the big summer festival, he prepares a giant batch with 24 ripe strawberries and 36 plump blueberries! Leo wonders: 'What is the simplest ratio of strawberries to blueberries?'")],
    [say("Leo starts arranging the fruit into equal trays. He finds that 12 is the Greatest Common Factor of 24 and 36! That means 24 strawberries make 12 pairs of 2, and 36 blueberries make 12 groups of 3.")],
    [instruct("Aria, a mural painter, stops by! She explains: 'When you divide both numbers by their Greatest Common Factor (12), 24 divided by 12 equals 2 and 36 divided by 12 equals 3. So the simplest ratio is 2 to 3! Both quantities keep the exact same proportion.'")],
    [celebrate("Leo and Aria are thrilled! With the simplified ratio of 2 to 3, Leo can scale his smoothie recipe to make 5 cups, 50 cups, or 500 cups without ever changing the delicious balanced taste! Let's practice simplifying more ratios!")],
  ];
  return panels[panelIndex] || panels[0];
}

// ─── SIMULATE ────────────────────────────────────────────────────────────
export function simStationIntro(stationIndex) {
  const intros = [
    [instruct("Station A: Sort the fruits into equal grouping baskets to find the simplest ratio! Watch the bar model update as you sort.")],
    [instruct("Station B: Find the Greatest Common Factor chip and divide both terms step by step to find the simplest ratio.")],
    [instruct("Station C: Move the scale multiplier slider. Watch how scaling changes both terms together while preserving the exact ratio!")],
    [ask("Station D: One of the simplification steps has an error! Can you spot the mistake and tap the incorrect term?")],
  ];
  return intros[stationIndex] || intros[0];
}

export function simFeedback(correct) {
  if (correct) return [celebrate("Amazing! You simplified the ratio perfectly!")];
  return [encourage("Not quite! Check your common factors and try again.")];
}

// ─── PLAY / PRACTICE ──────────────────────────────────────────────────────
export function playQuestionNarration(questionText) {
  return [ask(questionText)];
}

export function playCorrectNarration(streak = 1) {
  const compliments = [
    "Amazing! You simplified it perfectly!",
    "Brilliant! That is exactly right!",
    "Superb! You know your common factors!",
    "Excellent! Ratio mastery at work!",
    "Perfect! That's in simplest form!",
  ];
  const msg = compliments[Math.floor(Math.random() * compliments.length)];
  if (streak >= 5) {
    return [
      celebrate(msg),
      celebrate("Fantastic streak! Keep on rolling!"),
    ];
  }
  return [celebrate(msg)];
}

export function playWrongNarration() {
  return [encourage("Let's check the Greatest Common Factor again!")];
}

export function playHint1Narration() {
  return [think("Hint: Find the greatest number that divides into both terms.")];
}

export function playHint2Narration() {
  return [think("Hint: Divide both terms by the GCF to reach the simplest integer ratio.")];
}

export function districtCompleteNarration() {
  return [celebrate("Excellent work! You completed this district!")];
}

export function bossStartNarration() {
  return [emphasize("The Boss Battle begins! Answer the questions correctly with your 3 lives to defeat the boss!")];
}

export function bossWinNarration() {
  return [celebrate("Victory! You defeated the boss and claimed your Ratio Master reward!")];
}

// ─── REFLECT ─────────────────────────────────────────────────────────────
export function reflectNarration() {
  return [ask("Take a moment to reflect on your learning and check your ratio mastery!")];
}

export function reflectCompleteNarration() {
  return [
    celebrate("Congratulations! You have mastered simplifying ratios, equal groups, and greatest common factors! You are a certified Ratio Master!"),
  ];
}
