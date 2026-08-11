// src/utils/audioMap.js
// Static asset mapping for offline generated narration phrases in Simplifying Ratios

export const audioMap = {
  "Hi! I'm Leo. Ready to explore and simplify ratios? Let's begin our journey!": "/assets/audio/audio_intro.mp3",

  // Wonder Phase
  "The Big Smoothie Mystery!": "/assets/audio/audio_wonder_title.mp3",
  "If a smoothie master mixes twenty-four strawberries and thirty-six blueberries into identical mini-cups, what is the simplest recipe ratio, and how many cups can they make?": "/assets/audio/audio_wonder_hook.mp3",
  "Let's investigate how finding common factors simplifies any ratio!": "/assets/audio/audio_wonder_investigate.mp3",

  // Story Phase
  "Leo runs a popular juice bar in Sunnyside Town. For the big summer festival, he prepares a giant batch with 24 ripe strawberries and 36 plump blueberries! Leo wonders: 'What is the simplest ratio of strawberries to blueberries?'": "/assets/audio/audio_story_0.mp3",
  "Leo starts arranging the fruit into equal trays. He finds that 12 is the Greatest Common Factor of 24 and 36! That means 24 strawberries make 12 pairs of 2, and 36 blueberries make 12 groups of 3.": "/assets/audio/audio_story_1.mp3",
  "Aria, a mural painter, stops by! She explains: 'When you divide both numbers by their Greatest Common Factor (12), 24 divided by 12 equals 2 and 36 divided by 12 equals 3. So the simplest ratio is 2 to 3! Both quantities keep the exact same proportion.'": "/assets/audio/audio_story_2.mp3",
  "Leo and Aria are thrilled! With the simplified ratio of 2 to 3, Leo can scale his smoothie recipe to make 5 cups, 50 cups, or 500 cups without ever changing the delicious balanced taste! Let's practice simplifying more ratios!": "/assets/audio/audio_story_3.mp3",

  // Simulate Phase
  "Station A: Sort the fruits into equal grouping baskets to find the simplest ratio! Watch the bar model update as you sort.": "/assets/audio/audio_sim_0.mp3",
  "Station B: Find the Greatest Common Factor chip and divide both terms step by step to find the simplest ratio.": "/assets/audio/audio_sim_1.mp3",
  "Station C: Move the scale multiplier slider. Watch how scaling changes both terms together while preserving the exact ratio!": "/assets/audio/audio_sim_2.mp3",
  "Station D: One of the simplification steps has an error! Can you spot the mistake and tap the incorrect term?": "/assets/audio/audio_sim_3.mp3",

  "Amazing! You simplified the ratio perfectly!": "/assets/audio/audio_sim_correct.mp3",
  "Not quite! Check your common factors and try again.": "/assets/audio/audio_sim_tryagain.mp3",

  // Play Phase
  "The Boss Battle begins! Answer the questions correctly with your 3 lives to defeat the boss!": "/assets/audio/audio_boss_start.mp3",
  "Victory! You defeated the boss and claimed your Ratio Master reward!": "/assets/audio/audio_boss_win.mp3",
  "Excellent work! You completed this district!": "/assets/audio/audio_district_done.mp3",
  "Amazing! You simplified it perfectly!": "/assets/audio/audio_play_correct_1.mp3",
  "Brilliant! That is exactly right!": "/assets/audio/audio_play_correct_2.mp3",
  "Superb! You know your common factors!": "/assets/audio/audio_play_correct_3.mp3",
  "Excellent! Ratio mastery at work!": "/assets/audio/audio_play_correct_4.mp3",
  "Perfect! That's in simplest form!": "/assets/audio/audio_play_correct_5.mp3",
  "Fantastic streak! Keep on rolling!": "/assets/audio/audio_play_streak.mp3",
  "Let's check the Greatest Common Factor again!": "/assets/audio/audio_play_wrong.mp3",
  "Hint: Find the greatest number that divides into both terms.": "/assets/audio/audio_play_hint1.mp3",
  "Hint: Divide both terms by the GCF to reach the simplest integer ratio.": "/assets/audio/audio_play_hint2.mp3",

  // Reflect Phase
  "Take a moment to reflect on your learning and check your ratio mastery!": "/assets/audio/audio_reflect_intro.mp3",
  "Congratulations! You have mastered simplifying ratios, equal groups, and greatest common factors! You are a certified Ratio Master!": "/assets/audio/audio_reflect_done.mp3",
};

export default audioMap;
