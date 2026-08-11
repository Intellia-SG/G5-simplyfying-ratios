// src/data/questionBank.js
// 100 Comprehensive Questions for Simplifying Ratios across 10 Themed Worlds (Grade 5/6)

import { gcd, gcd3, simplifyRatio, simplify3PartRatio, generateDistractorsRatio, generateDistractorsNum, shuffleArray } from '../utils/ratioMath.js';

export const DISTRICTS = [
  { id: 0, name: 'Flavor Lab',        icon: '🥤', boss: { name: 'Chef Ratio',    emoji: '👨‍🍳', reward: 'Master Mixologist Badge 🥤' } },
  { id: 1, name: 'Paint Workshop',   icon: '🎨', boss: { name: 'Color Boss',    emoji: '🖌️', reward: 'Artisan Palette Badge 🎨' } },
  { id: 2, name: 'Ocean Expedition', icon: '🌊', boss: { name: 'Captain Scale', emoji: '⚓', reward: 'Deep Sea Ratio Badge 🌊' } },
  { id: 3, name: 'Golden Bakery',    icon: '🥐', boss: { name: 'Grand Baker',   emoji: '🥖', reward: 'Baker Gold Badge 🥐' } },
  { id: 4, name: 'Lava Forge',        icon: '🌋', boss: { name: 'Forge Master',  emoji: '🔥', reward: 'Titanium Ratio Badge 🌋' } },
  { id: 5, name: 'Cosmic Observatory',icon: '🚀', boss: { name: 'Starlight Boss',emoji: '☄️', reward: 'Cosmic Navigator Badge 🚀' } },
  { id: 6, name: 'Dragon Sanctuary',  icon: '🐉', boss: { name: 'Dragon Keeper', emoji: '🐲', reward: 'Dragon Master Badge 🐉' } },
  { id: 7, name: 'Crystal Academy',   icon: '💎', boss: { name: 'Prism Scholar', emoji: '🔮', reward: 'Crystal Crown Badge 💎' } },
  { id: 8, name: 'Spectrum Studio',   icon: '🌈', boss: { name: 'Prismatic Boss',emoji: '✨', reward: 'Spectrum Elite Badge 🌈' } },
  { id: 9, name: 'Ratio Citadel',    icon: '🏰', boss: { name: 'Citadel Monarch',emoji: '👑', reward: 'Ratio Grand Master Badge 🏰' } },
];

const RAW_QUESTIONS = [
  // ── WORLD 0: FLAVOR LAB (Questions 1 - 10) ────────────────────────────────
  {
    id: 1, districtId: 0, category: 'SIMPLIFY RATIO', visual: 'recipe',
    questionText: "Simplify the smoothie ratio of 6 strawberries to 9 blueberries.",
    options: ['2 : 3', '3 : 2', '1 : 3', '2 : 4'],
    correctAnswer: '2 : 3',
    explanation: "Divide both 6 and 9 by their GCF of 3: 6 ÷ 3 = 2 and 9 ÷ 3 = 3. The simplest ratio is 2 : 3.",
    hint1: "What number divides evenly into both 6 and 9?",
    hint2: "The GCF is 3. Divide 6 ÷ 3 and 9 ÷ 3.",
    visualData: { valA: 6, valB: 9, simpA: 2, simpB: 3, labelA: 'Strawberries 🍓', labelB: 'Blueberries 🫐' }
  },
  {
    id: 2, districtId: 0, category: 'BAR MODEL', visual: 'bar_model',
    questionText: "A juice blend has 10 parts orange and 15 parts mango. What is the ratio in simplest form?",
    options: ['2 : 3', '3 : 2', '5 : 3', '1 : 2'],
    correctAnswer: '2 : 3',
    explanation: "Both numbers divide by 5: 10 ÷ 5 = 2 and 15 ÷ 5 = 3. The simplest ratio is 2 : 3.",
    hint1: "Both numbers end in 0 or 5, so they are divisible by 5.",
    hint2: "10 ÷ 5 = 2 and 15 ÷ 5 = 3.",
    visualData: { valA: 10, valB: 15, simpA: 2, simpB: 3, labelA: 'Orange 🍊', labelB: 'Mango 🥭' }
  },
  {
    id: 3, districtId: 0, category: 'FIND GCF', visual: 'recipe',
    questionText: "What is the Greatest Common Factor (GCF) used to simplify 12 : 18?",
    options: ['6', '3', '2', '9'],
    correctAnswer: '6',
    explanation: "The factors of 12 are 1, 2, 3, 4, 6, 12. The factors of 18 are 1, 2, 3, 6, 9, 18. The greatest common factor is 6.",
    hint1: "List the factors of 12 and 18.",
    hint2: "6 is the largest number that divides both without remainder."
  },
  {
    id: 4, districtId: 0, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Express 8 cups of apple juice to 20 cups of sparkling water in simplest form.",
    options: ['2 : 5', '4 : 10', '2 : 10', '1 : 5'],
    correctAnswer: '2 : 5',
    explanation: "Divide both 8 and 20 by their GCF of 4: 8 ÷ 4 = 2 and 20 ÷ 4 = 5.",
    hint1: "Find the greatest factor common to 8 and 20.",
    hint2: "8 ÷ 4 = 2 and 20 ÷ 4 = 5.",
    visualData: { valA: 8, valB: 20, simpA: 2, simpB: 5, labelA: 'Apple Juice 🍏', labelB: 'Sparkling Water 💧' }
  },
  {
    id: 5, districtId: 0, category: 'MISSING TERM', visual: 'recipe',
    questionText: "If the ratio 2 : 3 is scaled up to 14 : ?, what is the missing term?",
    options: ['21', '18', '24', '15'],
    correctAnswer: '21',
    explanation: "The multiplier is 14 ÷ 2 = 7. Multiply the second term by 7: 3 × 7 = 21.",
    hint1: "How many times does 2 go into 14?",
    hint2: "2 × 7 = 14, so compute 3 × 7."
  },
  {
    id: 6, districtId: 0, category: 'TRUE/FALSE',
    questionText: "True or False: The ratio 14 : 21 is in simplest form.",
    options: ['False', 'True'],
    correctAnswer: 'False',
    explanation: "False. Both 14 and 21 are divisible by 7, so it simplifies to 2 : 3.",
    hint1: "Can both 14 and 21 be divided by 7?",
    hint2: "Since both share the factor 7, 14 : 21 is not yet in simplest form."
  },
  {
    id: 7, districtId: 0, category: 'WORD PROBLEM', visual: 'recipe',
    questionText: "Emma mixes 16 lemon slices with 24 lime slices. What is the ratio of lemons to limes in simplest terms?",
    options: ['2 : 3', '4 : 6', '1 : 2', '3 : 4'],
    correctAnswer: '2 : 3',
    explanation: "Divide both 16 and 24 by 8: 16 ÷ 8 = 2 and 24 ÷ 8 = 3.",
    hint1: "Find the largest number that divides into 16 and 24.",
    hint2: "The GCF is 8. 16 ÷ 8 = 2 and 24 ÷ 8 = 3."
  },
  {
    id: 8, districtId: 0, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Simplify the ratio 25 grams of sugar to 35 grams of cocoa.",
    options: ['5 : 7', '5 : 6', '3 : 5', '1 : 7'],
    correctAnswer: '5 : 7',
    explanation: "Divide both 25 and 35 by 5: 25 ÷ 5 = 5 and 35 ÷ 5 = 7.",
    hint1: "Divide both sides by 5.",
    hint2: "25 ÷ 5 = 5 and 35 ÷ 5 = 7."
  },
  {
    id: 9, districtId: 0, category: 'EQUAL GROUPS', visual: 'recipe',
    questionText: "A recipe uses 18 cherries for every 6 kiwi slices. What is the simplified ratio of cherries to kiwis?",
    options: ['3 : 1', '1 : 3', '6 : 2', '4 : 1'],
    correctAnswer: '3 : 1',
    explanation: "Divide both 18 and 6 by 6: 18 ÷ 6 = 3 and 6 ÷ 6 = 1.",
    hint1: "Divide both terms by 6.",
    hint2: "18 ÷ 6 = 3 and 6 ÷ 6 = 1, so the ratio is 3 : 1."
  },
  {
    id: 10, districtId: 0, category: 'BOSS CHALLENGE', visual: 'recipe',
    questionText: "Chef Ratio Challenge: A giant punch bowl uses 36 cups of berry juice and 54 cups of lemonade. What is the simplest ratio?",
    options: ['2 : 3', '3 : 4', '4 : 6', '1 : 3'],
    correctAnswer: '2 : 3',
    explanation: "The GCF of 36 and 54 is 18. 36 ÷ 18 = 2 and 54 ÷ 18 = 3. The simplest ratio is 2 : 3.",
    hint1: "Find the highest common factor of 36 and 54.",
    hint2: "18 divides both numbers: 36 ÷ 18 = 2 and 54 ÷ 18 = 3."
  },

  // ── WORLD 1: PAINT WORKSHOP (Questions 11 - 20) ───────────────────────────
  {
    id: 11, districtId: 1, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Aria mixes 12 cans of yellow paint and 16 cans of blue paint. What is the simplest ratio?",
    options: ['3 : 4', '4 : 3', '6 : 8', '2 : 3'],
    correctAnswer: '3 : 4',
    explanation: "Divide both 12 and 16 by 4: 12 ÷ 4 = 3 and 16 ÷ 4 = 4.",
    hint1: "What is the GCF of 12 and 16?",
    hint2: "12 ÷ 4 = 3 and 16 ÷ 4 = 4."
  },
  {
    id: 12, districtId: 1, category: 'FIND GCF',
    questionText: "What is the Greatest Common Factor of 21 and 28?",
    options: ['7', '3', '4', '14'],
    correctAnswer: '7',
    explanation: "21 = 3 × 7 and 28 = 4 × 7. The GCF is 7.",
    hint1: "Think of your 7 times tables.",
    hint2: "7 divides evenly into both 21 and 28."
  },
  {
    id: 13, districtId: 1, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Simplify the paint pigment ratio 21 : 28.",
    options: ['3 : 4', '4 : 3', '2 : 5', '7 : 4'],
    correctAnswer: '3 : 4',
    explanation: "21 ÷ 7 = 3 and 28 ÷ 7 = 4, giving 3 : 4.",
    hint1: "Divide both sides by 7.",
    hint2: "21 ÷ 7 = 3 and 28 ÷ 7 = 4."
  },
  {
    id: 14, districtId: 1, category: 'MISSING TERM',
    questionText: "Find the missing number to make the ratios equivalent: 4 : 5 = ? : 25",
    options: ['20', '16', '24', '15'],
    correctAnswer: '20',
    explanation: "25 ÷ 5 = 5. Multiply the first term by 5: 4 × 5 = 20.",
    hint1: "5 × 5 = 25.",
    hint2: "Multiply 4 by 5 to find the missing term."
  },
  {
    id: 15, districtId: 1, category: 'WORD PROBLEM', visual: 'bar_model',
    questionText: "An art class has 15 round brushes and 25 flat brushes. What is the ratio of round to flat brushes in simplest form?",
    options: ['3 : 5', '5 : 3', '1 : 5', '2 : 5'],
    correctAnswer: '3 : 5',
    explanation: "Divide both 15 and 25 by 5: 15 ÷ 5 = 3 and 25 ÷ 5 = 5.",
    hint1: "Divide both numbers by 5.",
    hint2: "15 ÷ 5 = 3 and 25 ÷ 5 = 5."
  },
  {
    id: 16, districtId: 1, category: 'TRUE/FALSE',
    questionText: "True or False: The ratios 6 : 8 and 9 : 12 simplify to the exact same ratio.",
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: "True. 6 : 8 simplifies to 3 : 4 (÷2), and 9 : 12 also simplifies to 3 : 4 (÷3).",
    hint1: "Simplify both ratios completely.",
    hint2: "Both simplify to 3 : 4, so they are equivalent!"
  },
  {
    id: 17, districtId: 1, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Simplify the ratio of 30 red drops to 45 yellow drops.",
    options: ['2 : 3', '3 : 2', '5 : 9', '6 : 9'],
    correctAnswer: '2 : 3',
    explanation: "Divide both by 15: 30 ÷ 15 = 2 and 45 ÷ 15 = 3.",
    hint1: "Find the GCF of 30 and 45.",
    hint2: "15 divides both: 30 ÷ 15 = 2 and 45 ÷ 15 = 3."
  },
  {
    id: 18, districtId: 1, category: 'EQUAL GROUPS',
    questionText: "If 18 canvases are shared equally among 6 easels, what is the ratio of canvases to easels in simplest terms?",
    options: ['3 : 1', '1 : 3', '6 : 1', '2 : 1'],
    correctAnswer: '3 : 1',
    explanation: "18 ÷ 6 = 3 and 6 ÷ 6 = 1. The ratio is 3 : 1.",
    hint1: "Divide both numbers by 6.",
    hint2: "18 ÷ 6 = 3."
  },
  {
    id: 19, districtId: 1, category: 'MISSING TERM',
    questionText: "Complete the equivalent ratio: 3 : 7 = 18 : ?",
    options: ['42', '35', '49', '36'],
    correctAnswer: '42',
    explanation: "18 ÷ 3 = 6. 7 × 6 = 42.",
    hint1: "3 × 6 = 18.",
    hint2: "Multiply 7 by 6."
  },
  {
    id: 20, districtId: 1, category: 'BOSS CHALLENGE',
    questionText: "Color Boss Challenge: Mix 48 ml of magenta with 72 ml of cyan. What is the ratio in lowest terms?",
    options: ['2 : 3', '3 : 4', '4 : 6', '1 : 2'],
    correctAnswer: '2 : 3',
    explanation: "The GCF of 48 and 72 is 24. 48 ÷ 24 = 2 and 72 ÷ 24 = 3.",
    hint1: "What is the largest number that divides 48 and 72?",
    hint2: "24 divides both: 48 ÷ 24 = 2 and 72 ÷ 24 = 3."
  },

  // ── WORLD 2: OCEAN EXPEDITION (Questions 21 - 30) ─────────────────────────
  {
    id: 21, districtId: 2, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "A diver spots 15 clownfish and 20 angelfish. Simplify the ratio of clownfish to angelfish.",
    options: ['3 : 4', '4 : 3', '5 : 4', '1 : 4'],
    correctAnswer: '3 : 4',
    explanation: "Divide both by 5: 15 ÷ 5 = 3 and 20 ÷ 5 = 4.",
    hint1: "Divide by 5.",
    hint2: "15 ÷ 5 = 3 and 20 ÷ 5 = 4."
  },
  {
    id: 22, districtId: 2, category: 'FIND GCF',
    questionText: "What is the GCF of 32 and 40?",
    options: ['8', '4', '16', '2'],
    correctAnswer: '8',
    explanation: "32 = 4 × 8 and 40 = 5 × 8. The GCF is 8.",
    hint1: "Look at factors like 4, 8, 16.",
    hint2: "8 is the largest common factor."
  },
  {
    id: 23, districtId: 2, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Simplify the submarine gear ratio 32 : 40.",
    options: ['4 : 5', '5 : 4', '8 : 10', '2 : 5'],
    correctAnswer: '4 : 5',
    explanation: "Divide both 32 and 40 by 8: 32 ÷ 8 = 4 and 40 ÷ 8 = 5.",
    hint1: "Divide by the GCF of 8.",
    hint2: "32 ÷ 8 = 4 and 40 ÷ 8 = 5."
  },
  {
    id: 24, districtId: 2, category: 'MISSING TERM',
    questionText: "If the ratio of sea turtles to dolphins is 5 : 2, and there are 35 sea turtles, how many dolphins are there?",
    options: ['14', '10', '12', '16'],
    correctAnswer: '14',
    explanation: "35 ÷ 5 = 7. Multiply 2 by 7: 2 × 7 = 14 dolphins.",
    hint1: "35 ÷ 5 = 7 scale factor.",
    hint2: "2 × 7 = 14."
  },
  {
    id: 25, districtId: 2, category: 'WORD PROBLEM', visual: 'bar_model',
    questionText: "A research vessel counted 18 octopuses and 24 squid. What is the simplified ratio of octopuses to squid?",
    options: ['3 : 4', '4 : 3', '2 : 3', '6 : 8'],
    correctAnswer: '3 : 4',
    explanation: "Divide both by 6: 18 ÷ 6 = 3 and 24 ÷ 6 = 4.",
    hint1: "Divide both numbers by 6.",
    hint2: "18 ÷ 6 = 3 and 24 ÷ 6 = 4."
  },
  {
    id: 26, districtId: 2, category: 'TRUE/FALSE',
    questionText: "True or False: The ratio 10 : 15 is equal to the ratio 14 : 21.",
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: "True. 10 : 15 simplifies to 2 : 3 (÷5), and 14 : 21 also simplifies to 2 : 3 (÷7).",
    hint1: "Simplify both ratios to lowest terms.",
    hint2: "Both simplify to 2 : 3."
  },
  {
    id: 27, districtId: 2, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Simplify the ratio of 14 blue corals to 42 pink corals.",
    options: ['1 : 3', '2 : 6', '1 : 4', '7 : 21'],
    correctAnswer: '1 : 3',
    explanation: "Divide both by 14: 14 ÷ 14 = 1 and 42 ÷ 14 = 3.",
    hint1: "Notice that 14 × 3 = 42.",
    hint2: "14 ÷ 14 = 1 and 42 ÷ 14 = 3."
  },
  {
    id: 28, districtId: 2, category: 'EQUAL GROUPS',
    questionText: "A submarine has 28 oxygen tanks for 7 crew members. What is the ratio of tanks to crew members in simplest form?",
    options: ['4 : 1', '1 : 4', '7 : 1', '3 : 1'],
    correctAnswer: '4 : 1',
    explanation: "28 ÷ 7 = 4 and 7 ÷ 7 = 1, giving 4 : 1.",
    hint1: "Divide 28 by 7.",
    hint2: "28 ÷ 7 = 4."
  },
  {
    id: 29, districtId: 2, category: 'MISSING TERM',
    questionText: "Find the missing term: 5 : 8 = ? : 56",
    options: ['35', '40', '30', '45'],
    correctAnswer: '35',
    explanation: "56 ÷ 8 = 7. 5 × 7 = 35.",
    hint1: "8 × 7 = 56.",
    hint2: "Multiply 5 by 7."
  },
  {
    id: 30, districtId: 2, category: 'BOSS CHALLENGE',
    questionText: "Captain Scale Challenge: A submarine propeller spins 60 times for every 84 meters traveled. What is the simplest ratio of spins to meters?",
    options: ['5 : 7', '6 : 8', '10 : 14', '3 : 4'],
    correctAnswer: '5 : 7',
    explanation: "The GCF of 60 and 84 is 12. 60 ÷ 12 = 5 and 84 ÷ 12 = 7.",
    hint1: "Divide both 60 and 84 by 12.",
    hint2: "60 ÷ 12 = 5 and 84 ÷ 12 = 7."
  },

  // ── WORLD 3: GOLDEN BAKERY (Questions 31 - 40) ────────────────────────────
  {
    id: 31, districtId: 3, category: 'SIMPLIFY RATIO', visual: 'recipe',
    questionText: "A cake recipe calls for 18 cups of flour and 12 cups of sugar. What is the simplest ratio of flour to sugar?",
    options: ['3 : 2', '2 : 3', '6 : 4', '4 : 3'],
    correctAnswer: '3 : 2',
    explanation: "Divide both 18 and 12 by 6: 18 ÷ 6 = 3 and 12 ÷ 6 = 2.",
    hint1: "Divide by 6.",
    hint2: "18 ÷ 6 = 3 and 12 ÷ 6 = 2."
  },
  {
    id: 32, districtId: 3, category: 'FIND GCF',
    questionText: "What is the GCF of 36 and 48?",
    options: ['12', '6', '8', '18'],
    correctAnswer: '12',
    explanation: "36 = 3 × 12 and 48 = 4 × 12. The GCF is 12.",
    hint1: "Look for the greatest multiple of 6 or 12.",
    hint2: "12 divides both numbers evenly."
  },
  {
    id: 33, districtId: 3, category: 'SIMPLIFY RATIO', visual: 'recipe',
    questionText: "Simplify the pastry batch ratio 36 : 48.",
    options: ['3 : 4', '4 : 3', '6 : 8', '2 : 3'],
    correctAnswer: '3 : 4',
    explanation: "Divide both by 12: 36 ÷ 12 = 3 and 48 ÷ 12 = 4.",
    hint1: "Divide both terms by 12.",
    hint2: "36 ÷ 12 = 3 and 48 ÷ 12 = 4."
  },
  {
    id: 34, districtId: 3, category: 'MISSING TERM',
    questionText: "If the ratio of butter to milk is 3 : 5, and the baker uses 45 cups of milk, how many cups of butter are needed?",
    options: ['27', '24', '30', '15'],
    correctAnswer: '27',
    explanation: "45 ÷ 5 = 9. 3 × 9 = 27 cups of butter.",
    hint1: "45 ÷ 5 = 9.",
    hint2: "Multiply 3 by 9."
  },
  {
    id: 35, districtId: 3, category: 'WORD PROBLEM', visual: 'recipe',
    questionText: "The bakery has 24 blueberry muffins and 32 chocolate muffins. What is the ratio in simplest form?",
    options: ['3 : 4', '4 : 3', '2 : 3', '6 : 8'],
    correctAnswer: '3 : 4',
    explanation: "Divide both by 8: 24 ÷ 8 = 3 and 32 ÷ 8 = 4.",
    hint1: "Divide by 8.",
    hint2: "24 ÷ 8 = 3 and 32 ÷ 8 = 4."
  },
  {
    id: 36, districtId: 3, category: 'TRUE/FALSE',
    questionText: "True or False: The ratio 40 : 50 simplifies to 4 : 5.",
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: "True. Dividing both 40 and 50 by 10 gives 4 : 5.",
    hint1: "Divide both sides by 10.",
    hint2: "40 ÷ 10 = 4 and 50 ÷ 10 = 5."
  },
  {
    id: 37, districtId: 3, category: 'SIMPLIFY RATIO', visual: 'recipe',
    questionText: "Simplify the ratio of 16 eggs to 40 cookies.",
    options: ['2 : 5', '4 : 10', '1 : 5', '3 : 5'],
    correctAnswer: '2 : 5',
    explanation: "Divide both by 8: 16 ÷ 8 = 2 and 40 ÷ 8 = 5.",
    hint1: "What is the GCF of 16 and 40?",
    hint2: "16 ÷ 8 = 2 and 40 ÷ 8 = 5."
  },
  {
    id: 38, districtId: 3, category: 'EQUAL GROUPS',
    questionText: "A baker puts 30 cupcakes onto 5 trays equally. What is the simplified ratio of cupcakes to trays?",
    options: ['6 : 1', '1 : 6', '5 : 1', '4 : 1'],
    correctAnswer: '6 : 1',
    explanation: "30 ÷ 5 = 6 and 5 ÷ 5 = 1. The ratio is 6 : 1.",
    hint1: "Divide 30 by 5.",
    hint2: "30 ÷ 5 = 6."
  },
  {
    id: 39, districtId: 3, category: 'MISSING TERM',
    questionText: "Find the missing term: 7 : 4 = ? : 28",
    options: ['49', '42', '56', '35'],
    correctAnswer: '49',
    explanation: "28 ÷ 4 = 7. 7 × 7 = 49.",
    hint1: "4 × 7 = 28.",
    hint2: "7 × 7 = 49."
  },
  {
    id: 40, districtId: 3, category: 'BOSS CHALLENGE',
    questionText: "Grand Baker Challenge: A royal wedding cake recipe uses 75 cups of flour and 100 cups of powdered sugar. What is the simplest ratio?",
    options: ['3 : 4', '4 : 5', '15 : 20', '2 : 3'],
    correctAnswer: '3 : 4',
    explanation: "The GCF of 75 and 100 is 25. 75 ÷ 25 = 3 and 100 ÷ 25 = 4.",
    hint1: "Divide both numbers by 25.",
    hint2: "75 ÷ 25 = 3 and 100 ÷ 25 = 4."
  },

  // ── WORLD 4: LAVA FORGE (Questions 41 - 50) ───────────────────────────────
  {
    id: 41, districtId: 4, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "A blacksmith combines 20 kg of iron with 30 kg of copper. What is the simplest ratio of iron to copper?",
    options: ['2 : 3', '3 : 2', '4 : 6', '1 : 3'],
    correctAnswer: '2 : 3',
    explanation: "Divide both by 10: 20 ÷ 10 = 2 and 30 ÷ 10 = 3.",
    hint1: "Divide by 10.",
    hint2: "20 ÷ 10 = 2 and 30 ÷ 10 = 3."
  },
  {
    id: 42, districtId: 4, category: 'FIND GCF',
    questionText: "What is the GCF of 28 and 42?",
    options: ['14', '7', '4', '6'],
    correctAnswer: '14',
    explanation: "28 = 2 × 14 and 42 = 3 × 14. The GCF is 14.",
    hint1: "Think about 7 and 14.",
    hint2: "14 is the largest number that divides both 28 and 42."
  },
  {
    id: 43, districtId: 4, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Simplify the alloy ratio 28 : 42.",
    options: ['2 : 3', '3 : 2', '4 : 6', '1 : 2'],
    correctAnswer: '2 : 3',
    explanation: "Divide both by 14: 28 ÷ 14 = 2 and 42 ÷ 14 = 3.",
    hint1: "Divide by 14.",
    hint2: "28 ÷ 14 = 2 and 42 ÷ 14 = 3."
  },
  {
    id: 44, districtId: 4, category: 'MISSING TERM',
    questionText: "In a steel alloy, the ratio of carbon to iron is 1 : 8. If 9 kg of carbon is used, how much iron is needed?",
    options: ['72 kg', '64 kg', '81 kg', '56 kg'],
    correctAnswer: '72 kg',
    explanation: "1 × 9 = 9, so 8 × 9 = 72 kg.",
    hint1: "Multiply 8 by 9.",
    hint2: "8 × 9 = 72."
  },
  {
    id: 45, districtId: 4, category: 'WORD PROBLEM', visual: 'bar_model',
    questionText: "The forge has 35 hammers and 49 tongs. What is the ratio of hammers to tongs in simplest form?",
    options: ['5 : 7', '7 : 5', '5 : 6', '1 : 7'],
    correctAnswer: '5 : 7',
    explanation: "Divide both by 7: 35 ÷ 7 = 5 and 49 ÷ 7 = 7.",
    hint1: "Divide by 7.",
    hint2: "35 ÷ 7 = 5 and 49 ÷ 7 = 7."
  },
  {
    id: 46, districtId: 4, category: 'TRUE/FALSE',
    questionText: "True or False: 18 : 24 simplifies to 3 : 4.",
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: "True. 18 ÷ 6 = 3 and 24 ÷ 6 = 4.",
    hint1: "Divide both by 6.",
    hint2: "18 ÷ 6 = 3 and 24 ÷ 6 = 4."
  },
  {
    id: 47, districtId: 4, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Simplify the molten metal ratio 45 : 60.",
    options: ['3 : 4', '4 : 3', '9 : 12', '5 : 6'],
    correctAnswer: '3 : 4',
    explanation: "Divide both by 15: 45 ÷ 15 = 3 and 60 ÷ 15 = 4.",
    hint1: "Find the GCF of 45 and 60.",
    hint2: "15 divides both: 45 ÷ 15 = 3 and 60 ÷ 15 = 4."
  },
  {
    id: 48, districtId: 4, category: 'EQUAL GROUPS',
    questionText: "A forge produces 48 ingots in 6 hours. What is the simplified ratio of ingots to hours?",
    options: ['8 : 1', '1 : 8', '6 : 1', '4 : 1'],
    correctAnswer: '8 : 1',
    explanation: "48 ÷ 6 = 8 and 6 ÷ 6 = 1. The ratio is 8 : 1.",
    hint1: "48 ÷ 6 = 8.",
    hint2: "The ratio is 8 : 1."
  },
  {
    id: 49, districtId: 4, category: 'MISSING TERM',
    questionText: "Find the missing term: 6 : 11 = ? : 66",
    options: ['36', '30', '42', '48'],
    correctAnswer: '36',
    explanation: "66 ÷ 11 = 6. 6 × 6 = 36.",
    hint1: "11 × 6 = 66.",
    hint2: "6 × 6 = 36."
  },
  {
    id: 50, districtId: 4, category: 'BOSS CHALLENGE',
    questionText: "Forge Master Challenge: A master blade uses 56 grams of titanium and 84 grams of tungsten. What is the simplest ratio?",
    options: ['2 : 3', '4 : 6', '7 : 12', '3 : 4'],
    correctAnswer: '2 : 3',
    explanation: "The GCF of 56 and 84 is 28. 56 ÷ 28 = 2 and 84 ÷ 28 = 3.",
    hint1: "Divide both by 28.",
    hint2: "56 ÷ 28 = 2 and 84 ÷ 28 = 3."
  },

  // ── WORLD 5: COSMIC OBSERVATORY (Questions 51 - 60) ───────────────────────
  {
    id: 51, districtId: 5, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "A telescope detects 14 moons and 21 satellites. Simplify the ratio of moons to satellites.",
    options: ['2 : 3', '3 : 2', '1 : 3', '7 : 10'],
    correctAnswer: '2 : 3',
    explanation: "Divide both by 7: 14 ÷ 7 = 2 and 21 ÷ 7 = 3.",
    hint1: "Divide by 7.",
    hint2: "14 ÷ 7 = 2 and 21 ÷ 7 = 3."
  },
  {
    id: 52, districtId: 5, category: 'FIND GCF',
    questionText: "What is the GCF of 45 and 75?",
    options: ['15', '5', '25', '9'],
    correctAnswer: '15',
    explanation: "45 = 3 × 15 and 75 = 5 × 15. The GCF is 15.",
    hint1: "Look at factors ending in 5.",
    hint2: "15 divides both numbers."
  },
  {
    id: 53, districtId: 5, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Simplify the rocket propellant ratio 45 : 75.",
    options: ['3 : 5', '5 : 3', '9 : 15', '1 : 3'],
    correctAnswer: '3 : 5',
    explanation: "Divide both by 15: 45 ÷ 15 = 3 and 75 ÷ 15 = 5.",
    hint1: "Divide by 15.",
    hint2: "45 ÷ 15 = 3 and 75 ÷ 15 = 5."
  },
  {
    id: 54, districtId: 5, category: 'MISSING TERM',
    questionText: "If the gear ratio in a space probe is 4 : 7 = 36 : ?, find the missing term.",
    options: ['63', '56', '70', '49'],
    correctAnswer: '63',
    explanation: "36 ÷ 4 = 9. 7 × 9 = 63.",
    hint1: "4 × 9 = 36.",
    hint2: "7 × 9 = 63."
  },
  {
    id: 55, districtId: 5, category: 'WORD PROBLEM', visual: 'bar_model',
    questionText: "An observatory logs 30 solar flares and 40 lunar eclipses over a century. What is the simplest ratio?",
    options: ['3 : 4', '4 : 3', '6 : 8', '1 : 2'],
    correctAnswer: '3 : 4',
    explanation: "Divide both by 10: 30 ÷ 10 = 3 and 40 ÷ 10 = 4.",
    hint1: "Divide by 10.",
    hint2: "30 ÷ 10 = 3 and 40 ÷ 10 = 4."
  },
  {
    id: 56, districtId: 5, category: 'TRUE/FALSE',
    questionText: "True or False: The ratio 24 : 30 simplifies to 4 : 5.",
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: "True. 24 ÷ 6 = 4 and 30 ÷ 6 = 5.",
    hint1: "Divide by 6.",
    hint2: "24 ÷ 6 = 4 and 30 ÷ 6 = 5."
  },
  {
    id: 57, districtId: 5, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Simplify the orbital velocity ratio 54 : 72.",
    options: ['3 : 4', '4 : 3', '6 : 8', '9 : 12'],
    correctAnswer: '3 : 4',
    explanation: "Divide both by 18: 54 ÷ 18 = 3 and 72 ÷ 18 = 4.",
    hint1: "What is the GCF of 54 and 72?",
    hint2: "18 divides both: 54 ÷ 18 = 3 and 72 ÷ 18 = 4."
  },
  {
    id: 58, districtId: 5, category: 'EQUAL GROUPS',
    questionText: "A cosmic radio telescope scans 72 star sectors across 8 radio bands. What is the simplified ratio of sectors to bands?",
    options: ['9 : 1', '1 : 9', '8 : 1', '6 : 1'],
    correctAnswer: '9 : 1',
    explanation: "72 ÷ 8 = 9 and 8 ÷ 8 = 1. The ratio is 9 : 1.",
    hint1: "72 ÷ 8 = 9.",
    hint2: "The ratio is 9 : 1."
  },
  {
    id: 59, districtId: 5, category: 'MISSING TERM',
    questionText: "Find the missing term: 8 : 9 = ? : 72",
    options: ['64', '56', '72', '81'],
    correctAnswer: '64',
    explanation: "72 ÷ 9 = 8. 8 × 8 = 64.",
    hint1: "9 × 8 = 72.",
    hint2: "8 × 8 = 64."
  },
  {
    id: 60, districtId: 5, category: 'BOSS CHALLENGE',
    questionText: "Starlight Boss Challenge: A starship requires 96 units of hydrogen for every 144 units of helium. What is the simplest ratio?",
    options: ['2 : 3', '3 : 4', '4 : 6', '1 : 2'],
    correctAnswer: '2 : 3',
    explanation: "The GCF of 96 and 144 is 48. 96 ÷ 48 = 2 and 144 ÷ 48 = 3.",
    hint1: "Divide both by 48.",
    hint2: "96 ÷ 48 = 2 and 144 ÷ 48 = 3."
  },

  // ── WORLD 6: DRAGON SANCTUARY (Questions 61 - 70) ─────────────────────────
  {
    id: 61, districtId: 6, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "The dragon keeper feeds 22 fire gems and 33 ice gems. Simplify the ratio of fire gems to ice gems.",
    options: ['2 : 3', '3 : 2', '1 : 3', '2 : 5'],
    correctAnswer: '2 : 3',
    explanation: "Divide both by 11: 22 ÷ 11 = 2 and 33 ÷ 11 = 3.",
    hint1: "Divide by 11.",
    hint2: "22 ÷ 11 = 2 and 33 ÷ 11 = 3."
  },
  {
    id: 62, districtId: 6, category: 'FIND GCF',
    questionText: "What is the GCF of 36 and 60?",
    options: ['12', '6', '18', '4'],
    correctAnswer: '12',
    explanation: "36 = 3 × 12 and 60 = 5 × 12. The GCF is 12.",
    hint1: "Look at factors like 6 and 12.",
    hint2: "12 is the greatest common factor."
  },
  {
    id: 63, districtId: 6, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Simplify the dragon wingspan ratio 36 : 60.",
    options: ['3 : 5', '5 : 3', '6 : 10', '2 : 5'],
    correctAnswer: '3 : 5',
    explanation: "Divide both by 12: 36 ÷ 12 = 3 and 60 ÷ 12 = 5.",
    hint1: "Divide by 12.",
    hint2: "36 ÷ 12 = 3 and 60 ÷ 12 = 5."
  },
  {
    id: 64, districtId: 6, category: 'MISSING TERM',
    questionText: "If the ratio of baby dragons to adult dragons is 3 : 8 = 21 : ?, find the missing term.",
    options: ['56', '48', '64', '42'],
    correctAnswer: '56',
    explanation: "21 ÷ 3 = 7. 8 × 7 = 56 adult dragons.",
    hint1: "3 × 7 = 21.",
    hint2: "8 × 7 = 56."
  },
  {
    id: 65, districtId: 6, category: 'WORD PROBLEM', visual: 'bar_model',
    questionText: "A sanctuary protects 27 emerald dragons and 45 sapphire dragons. What is the ratio in simplest form?",
    options: ['3 : 5', '5 : 3', '9 : 15', '1 : 3'],
    correctAnswer: '3 : 5',
    explanation: "Divide both by 9: 27 ÷ 9 = 3 and 45 ÷ 9 = 5.",
    hint1: "Divide by 9.",
    hint2: "27 ÷ 9 = 3 and 45 ÷ 9 = 5."
  },
  {
    id: 66, districtId: 6, category: 'TRUE/FALSE',
    questionText: "True or False: The ratio 15 : 25 is equivalent to 24 : 40.",
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: "True. 15 : 25 simplifies to 3 : 5 (÷5), and 24 : 40 simplifies to 3 : 5 (÷8).",
    hint1: "Simplify both ratios.",
    hint2: "Both equal 3 : 5!"
  },
  {
    id: 67, districtId: 6, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Simplify the ratio of 42 dragon scales to 70 dragon teeth.",
    options: ['3 : 5', '5 : 3', '6 : 10', '2 : 5'],
    correctAnswer: '3 : 5',
    explanation: "Divide both by 14: 42 ÷ 14 = 3 and 70 ÷ 14 = 5.",
    hint1: "What divides into 42 and 70?",
    hint2: "14 divides both: 42 ÷ 14 = 3 and 70 ÷ 14 = 5."
  },
  {
    id: 68, districtId: 6, category: 'EQUAL GROUPS',
    questionText: "A dragon keeper organizes 63 glowing crystals into 7 treasure chests. What is the simplified ratio of crystals to chests?",
    options: ['9 : 1', '1 : 9', '7 : 1', '6 : 1'],
    correctAnswer: '9 : 1',
    explanation: "63 ÷ 7 = 9 and 7 ÷ 7 = 1. The ratio is 9 : 1.",
    hint1: "63 ÷ 7 = 9.",
    hint2: "The ratio is 9 : 1."
  },
  {
    id: 69, districtId: 6, category: 'MISSING TERM',
    questionText: "Find the missing term: 9 : 4 = ? : 36",
    options: ['81', '72', '63', '90'],
    correctAnswer: '81',
    explanation: "36 ÷ 4 = 9. 9 × 9 = 81.",
    hint1: "4 × 9 = 36.",
    hint2: "9 × 9 = 81."
  },
  {
    id: 70, districtId: 6, category: 'BOSS CHALLENGE',
    questionText: "Dragon Keeper Challenge: An ancient elder dragon hoards 80 ruby gems and 120 topaz gems. What is the simplest ratio?",
    options: ['2 : 3', '4 : 6', '3 : 5', '1 : 2'],
    correctAnswer: '2 : 3',
    explanation: "The GCF of 80 and 120 is 40. 80 ÷ 40 = 2 and 120 ÷ 40 = 3.",
    hint1: "Divide both numbers by 40.",
    hint2: "80 ÷ 40 = 2 and 120 ÷ 40 = 3."
  },

  // ── WORLD 7: CRYSTAL ACADEMY (3-PART RATIOS) (Questions 71 - 80) ──────────
  {
    id: 71, districtId: 7, category: '3-PART RATIO', visual: 'three_part',
    questionText: "Simplify the 3-part crystal ratio 6 : 9 : 12.",
    options: ['2 : 3 : 4', '3 : 4 : 5', '1 : 2 : 3', '2 : 3 : 6'],
    correctAnswer: '2 : 3 : 4',
    explanation: "Divide all three terms by their GCF of 3: 6 ÷ 3 = 2, 9 ÷ 3 = 3, and 12 ÷ 3 = 4.",
    hint1: "Find a number that divides evenly into 6, 9, and 12.",
    hint2: "The GCF of 6, 9, and 12 is 3. Divide all three by 3."
  },
  {
    id: 72, districtId: 7, category: '3-PART RATIO', visual: 'three_part',
    questionText: "Simplify the crystal prism ratio 10 : 15 : 25.",
    options: ['2 : 3 : 5', '1 : 3 : 5', '2 : 4 : 5', '5 : 3 : 2'],
    correctAnswer: '2 : 3 : 5',
    explanation: "Divide all three terms by 5: 10 ÷ 5 = 2, 15 ÷ 5 = 3, 25 ÷ 5 = 5.",
    hint1: "Divide all three terms by 5.",
    hint2: "10 ÷ 5 = 2, 15 ÷ 5 = 3, 25 ÷ 5 = 5."
  },
  {
    id: 73, districtId: 7, category: 'FIND GCF',
    questionText: "What is the Greatest Common Factor of the three numbers 12, 18, and 24?",
    options: ['6', '3', '2', '12'],
    correctAnswer: '6',
    explanation: "6 divides all three numbers: 12 = 2×6, 18 = 3×6, and 24 = 4×6.",
    hint1: "Look for the largest number that divides 12, 18, and 24.",
    hint2: "6 divides all three numbers."
  },
  {
    id: 74, districtId: 7, category: '3-PART RATIO', visual: 'three_part',
    questionText: "Simplify the ratio 12 : 18 : 24.",
    options: ['2 : 3 : 4', '3 : 4 : 5', '4 : 6 : 8', '1 : 2 : 3'],
    correctAnswer: '2 : 3 : 4',
    explanation: "Divide all three terms by 6: 12 ÷ 6 = 2, 18 ÷ 6 = 3, and 24 ÷ 6 = 4.",
    hint1: "Divide by 6.",
    hint2: "12 ÷ 6 = 2, 18 ÷ 6 = 3, 24 ÷ 6 = 4."
  },
  {
    id: 75, districtId: 7, category: '3-PART RATIO', visual: 'three_part',
    questionText: "Simplify the magic crystal ratio 14 : 28 : 35.",
    options: ['2 : 4 : 5', '1 : 2 : 3', '2 : 3 : 5', '7 : 4 : 5'],
    correctAnswer: '2 : 4 : 5',
    explanation: "Divide all three terms by 7: 14 ÷ 7 = 2, 28 ÷ 7 = 4, 35 ÷ 7 = 5.",
    hint1: "Divide all three terms by 7.",
    hint2: "14 ÷ 7 = 2, 28 ÷ 7 = 4, 35 ÷ 7 = 5."
  },
  {
    id: 76, districtId: 7, category: 'TRUE/FALSE',
    questionText: "True or False: The 3-part ratio 8 : 12 : 16 simplifies to 2 : 3 : 4.",
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: "True. Dividing all three terms by 4 yields 2 : 3 : 4.",
    hint1: "Divide 8, 12, and 16 by 4.",
    hint2: "8 ÷ 4 = 2, 12 ÷ 4 = 3, 16 ÷ 4 = 4."
  },
  {
    id: 77, districtId: 7, category: '3-PART RATIO', visual: 'three_part',
    questionText: "Simplify the gemstone blend ratio 16 : 24 : 40.",
    options: ['2 : 3 : 5', '4 : 6 : 10', '1 : 2 : 5', '2 : 4 : 5'],
    correctAnswer: '2 : 3 : 5',
    explanation: "Divide all three terms by 8: 16 ÷ 8 = 2, 24 ÷ 8 = 3, 40 ÷ 8 = 5.",
    hint1: "Divide all three by 8.",
    hint2: "16 ÷ 8 = 2, 24 ÷ 8 = 3, 40 ÷ 8 = 5."
  },
  {
    id: 78, districtId: 7, category: 'WORD PROBLEM', visual: 'three_part',
    questionText: "A crystal pendant has 9 rubies, 12 diamonds, and 15 emeralds. What is the simplest ratio of rubies to diamonds to emeralds?",
    options: ['3 : 4 : 5', '2 : 3 : 4', '1 : 2 : 3', '4 : 5 : 6'],
    correctAnswer: '3 : 4 : 5',
    explanation: "Divide all three terms by 3: 9 ÷ 3 = 3, 12 ÷ 3 = 4, 15 ÷ 3 = 5.",
    hint1: "Divide by 3.",
    hint2: "9 ÷ 3 = 3, 12 ÷ 3 = 4, 15 ÷ 3 = 5."
  },
  {
    id: 79, districtId: 7, category: 'MISSING TERM',
    questionText: "If the ratio 2 : 3 : 5 is scaled up to 8 : 12 : ?, find the missing term.",
    options: ['20', '15', '25', '18'],
    correctAnswer: '20',
    explanation: "8 ÷ 2 = 4. 5 × 4 = 20.",
    hint1: "Scale factor is 4.",
    hint2: "5 × 4 = 20."
  },
  {
    id: 80, districtId: 7, category: 'BOSS CHALLENGE',
    questionText: "Prism Scholar Challenge: A master crystal prism refracts 36 red rays, 54 green rays, and 72 blue rays. What is the simplest ratio?",
    options: ['2 : 3 : 4', '3 : 4 : 5', '4 : 6 : 8', '1 : 2 : 3'],
    correctAnswer: '2 : 3 : 4',
    explanation: "The GCF of 36, 54, and 72 is 18. 36 ÷ 18 = 2, 54 ÷ 18 = 3, and 72 ÷ 18 = 4.",
    hint1: "Divide all three numbers by 18.",
    hint2: "36 ÷ 18 = 2, 54 ÷ 18 = 3, 72 ÷ 18 = 4."
  },

  // ── WORLD 8: SPECTRUM STUDIO (UNIT CONVERSIONS) (Questions 81 - 90) ───────
  {
    id: 81, districtId: 8, category: 'UNIT CONVERSION',
    questionText: "Simplify the ratio of 40 cm to 2 meters. (Hint: 1 meter = 100 cm)",
    options: ['1 : 5', '20 : 1', '1 : 20', '2 : 5'],
    correctAnswer: '1 : 5',
    explanation: "Convert 2 meters to 200 cm. The ratio is 40 cm : 200 cm. Divide both by 40 to get 1 : 5.",
    hint1: "Convert 2 meters into centimeters: 2 m = 200 cm.",
    hint2: "40 : 200 = 1 : 5 (divide by 40)."
  },
  {
    id: 82, districtId: 8, category: 'UNIT CONVERSION',
    questionText: "Simplify the ratio of 500 grams to 2 kilograms. (Hint: 1 kg = 1000 g)",
    options: ['1 : 4', '1 : 2', '5 : 2', '1 : 5'],
    correctAnswer: '1 : 4',
    explanation: "Convert 2 kg to 2000 g. 500 : 2000 simplifies to 1 : 4 (divide both by 500).",
    hint1: "Convert 2 kg into grams: 2 kg = 2000 g.",
    hint2: "500 : 2000 = 1 : 4."
  },
  {
    id: 83, districtId: 8, category: 'UNIT CONVERSION',
    questionText: "Simplify the ratio of 15 minutes to 1 hour. (Hint: 1 hour = 60 minutes)",
    options: ['1 : 4', '1 : 3', '15 : 1', '1 : 6'],
    correctAnswer: '1 : 4',
    explanation: "1 hour = 60 minutes. 15 : 60 simplifies to 1 : 4 (divide by 15).",
    hint1: "Convert 1 hour into 60 minutes.",
    hint2: "15 : 60 = 1 : 4."
  },
  {
    id: 84, districtId: 8, category: 'UNIT CONVERSION',
    questionText: "Simplify the ratio of 250 ml to 1 liter. (Hint: 1 liter = 1000 ml)",
    options: ['1 : 4', '1 : 5', '2 : 5', '1 : 2'],
    correctAnswer: '1 : 4',
    explanation: "1 liter = 1000 ml. 250 : 1000 simplifies to 1 : 4 (divide by 250).",
    hint1: "1 liter = 1000 ml.",
    hint2: "250 ÷ 250 = 1 and 1000 ÷ 250 = 4."
  },
  {
    id: 85, districtId: 8, category: 'TRUE/FALSE',
    questionText: "True or False: Before simplifying a ratio with different units, you must convert them to the same unit.",
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: "True! Ratios compare quantities of the same unit, so you must always convert units first.",
    hint1: "Can you compare centimeters directly to meters without converting?",
    hint2: "Always convert to the smaller unit first!"
  },
  {
    id: 86, districtId: 8, category: 'UNIT CONVERSION',
    questionText: "Simplify the ratio of 75 cm to 1.5 meters. (Hint: 1.5 m = 150 cm)",
    options: ['1 : 2', '1 : 3', '3 : 5', '1 : 4'],
    correctAnswer: '1 : 2',
    explanation: "1.5 m = 150 cm. 75 : 150 simplifies to 1 : 2 (divide both by 75).",
    hint1: "Convert 1.5 m into 150 cm.",
    hint2: "75 ÷ 75 = 1 and 150 ÷ 75 = 2."
  },
  {
    id: 87, districtId: 8, category: 'UNIT CONVERSION',
    questionText: "Simplify the ratio of 30 seconds to 2 minutes. (Hint: 2 minutes = 120 seconds)",
    options: ['1 : 4', '1 : 2', '1 : 6', '3 : 2'],
    correctAnswer: '1 : 4',
    explanation: "2 minutes = 120 seconds. 30 : 120 simplifies to 1 : 4 (divide by 30).",
    hint1: "2 minutes = 120 seconds.",
    hint2: "30 ÷ 30 = 1 and 120 ÷ 30 = 4."
  },
  {
    id: 88, districtId: 8, category: 'UNIT CONVERSION',
    questionText: "Simplify the ratio of 400 meters to 2 kilometers. (Hint: 2 km = 2000 m)",
    options: ['1 : 5', '2 : 5', '1 : 4', '4 : 2'],
    correctAnswer: '1 : 5',
    explanation: "2 km = 2000 m. 400 : 2000 simplifies to 1 : 5 (divide by 400).",
    hint1: "Convert 2 km into 2000 m.",
    hint2: "400 ÷ 400 = 1 and 2000 ÷ 400 = 5."
  },
  {
    id: 89, districtId: 8, category: 'WORD PROBLEM',
    questionText: "Maya cuts a ribbon into two pieces: 60 cm and 3 meters. What is the simplest ratio of the short piece to the long piece?",
    options: ['1 : 5', '1 : 3', '2 : 5', '6 : 3'],
    correctAnswer: '1 : 5',
    explanation: "3 m = 300 cm. 60 : 300 simplifies to 1 : 5 (divide by 60).",
    hint1: "3 meters = 300 cm.",
    hint2: "60 ÷ 60 = 1 and 300 ÷ 60 = 5."
  },
  {
    id: 90, districtId: 8, category: 'BOSS CHALLENGE',
    questionText: "Prismatic Boss Challenge: A laser spectrum mixes 800 grams of crystal powder with 3.2 kg of prism glass. What is the simplest ratio?",
    options: ['1 : 4', '1 : 5', '2 : 5', '1 : 3'],
    correctAnswer: '1 : 4',
    explanation: "3.2 kg = 3200 grams. 800 : 3200 simplifies to 1 : 4 (divide by 800).",
    hint1: "Convert 3.2 kg to 3200 grams.",
    hint2: "800 ÷ 800 = 1 and 3200 ÷ 800 = 4."
  },

  // ── WORLD 9: RATIO CITADEL (GRAND MASTER) (Questions 91 - 100) ────────────
  {
    id: 91, districtId: 9, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Citadel Trial 1: Simplify the ratio 48 : 64 to lowest terms.",
    options: ['3 : 4', '4 : 5', '6 : 8', '2 : 3'],
    correctAnswer: '3 : 4',
    explanation: "The GCF of 48 and 64 is 16. 48 ÷ 16 = 3 and 64 ÷ 16 = 4.",
    hint1: "Divide both numbers by 16.",
    hint2: "48 ÷ 16 = 3 and 64 ÷ 16 = 4."
  },
  {
    id: 92, districtId: 9, category: 'FIND GCF',
    questionText: "Citadel Trial 2: What is the Greatest Common Factor of 42, 56, and 70?",
    options: ['14', '7', '6', '2'],
    correctAnswer: '14',
    explanation: "42 = 3×14, 56 = 4×14, and 70 = 5×14. The GCF is 14.",
    hint1: "Look for multiples of 7 or 14.",
    hint2: "14 divides all three numbers evenly."
  },
  {
    id: 93, districtId: 9, category: '3-PART RATIO', visual: 'three_part',
    questionText: "Citadel Trial 3: Simplify the royal guard ratio 42 : 56 : 70.",
    options: ['3 : 4 : 5', '2 : 3 : 4', '4 : 5 : 6', '6 : 7 : 8'],
    correctAnswer: '3 : 4 : 5',
    explanation: "Divide all three by 14: 42 ÷ 14 = 3, 56 ÷ 14 = 4, 70 ÷ 14 = 5.",
    hint1: "Divide all terms by 14.",
    hint2: "42 ÷ 14 = 3, 56 ÷ 14 = 4, 70 ÷ 14 = 5."
  },
  {
    id: 94, districtId: 9, category: 'MISSING TERM',
    questionText: "Citadel Trial 4: If 5 : 9 = 45 : ?, find the missing term.",
    options: ['81', '72', '90', '63'],
    correctAnswer: '81',
    explanation: "45 ÷ 5 = 9. 9 × 9 = 81.",
    hint1: "5 × 9 = 45.",
    hint2: "9 × 9 = 81."
  },
  {
    id: 95, districtId: 9, category: 'UNIT CONVERSION',
    questionText: "Citadel Trial 5: Simplify the ratio of 150 ml to 1.5 liters.",
    options: ['1 : 10', '1 : 5', '1 : 15', '3 : 10'],
    correctAnswer: '1 : 10',
    explanation: "1.5 liters = 1500 ml. 150 : 1500 simplifies to 1 : 10 (divide by 150).",
    hint1: "Convert 1.5 liters to 1500 ml.",
    hint2: "150 ÷ 150 = 1 and 1500 ÷ 150 = 10."
  },
  {
    id: 96, districtId: 9, category: 'TRUE/FALSE',
    questionText: "Citadel Trial 6: True or False: Two ratios are equivalent if their simplest forms are identical.",
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: "True! Equivalent ratios represent the exact same proportional relationship.",
    hint1: "If both reduce to 2 : 3, are they equal?",
    hint2: "Yes, simplest form reveals the core relationship!"
  },
  {
    id: 97, districtId: 9, category: 'SIMPLIFY RATIO', visual: 'bar_model',
    questionText: "Citadel Trial 7: Simplify the citadel banner ratio 63 : 81.",
    options: ['7 : 9', '9 : 7', '7 : 8', '3 : 9'],
    correctAnswer: '7 : 9',
    explanation: "Divide both by 9: 63 ÷ 9 = 7 and 81 ÷ 9 = 9.",
    hint1: "Divide both sides by 9.",
    hint2: "63 ÷ 9 = 7 and 81 ÷ 9 = 9."
  },
  {
    id: 98, districtId: 9, category: 'WORD PROBLEM', visual: 'bar_model',
    questionText: "Citadel Trial 8: The Grand Vault holds 54 gold keys and 90 silver keys. What is the simplest ratio of gold to silver keys?",
    options: ['3 : 5', '5 : 3', '6 : 10', '2 : 5'],
    correctAnswer: '3 : 5',
    explanation: "The GCF of 54 and 90 is 18. 54 ÷ 18 = 3 and 90 ÷ 18 = 5.",
    hint1: "Divide both numbers by 18.",
    hint2: "54 ÷ 18 = 3 and 90 ÷ 18 = 5."
  },
  {
    id: 99, districtId: 9, category: 'EQUAL GROUPS',
    questionText: "Citadel Trial 9: 72 knights are divided equally into 9 squads. What is the simplified ratio of knights to squads?",
    options: ['8 : 1', '1 : 8', '9 : 1', '6 : 1'],
    correctAnswer: '8 : 1',
    explanation: "72 ÷ 9 = 8 and 9 ÷ 9 = 1. The ratio is 8 : 1.",
    hint1: "72 ÷ 9 = 8.",
    hint2: "The ratio is 8 : 1."
  },
  {
    id: 100, districtId: 9, category: 'BOSS CHALLENGE', visual: 'three_part',
    questionText: "Citadel Monarch Grand Master Challenge: The citadel crown is forged from 100 grams of gold, 150 grams of platinum, and 250 grams of silver. What is the simplest 3-part ratio?",
    options: ['2 : 3 : 5', '1 : 3 : 5', '2 : 4 : 5', '4 : 6 : 10'],
    correctAnswer: '2 : 3 : 5',
    explanation: "Divide all three by 50: 100 ÷ 50 = 2, 150 ÷ 50 = 3, and 250 ÷ 50 = 5. You are the Ratio Grand Master! 👑",
    hint1: "Find the GCF of 100, 150, and 250.",
    hint2: "Divide all three by 50: 100 ÷ 50 = 2, 150 ÷ 50 = 3, 250 ÷ 50 = 5."
  },
];

export default RAW_QUESTIONS;
