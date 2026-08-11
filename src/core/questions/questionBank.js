// src/core/questions/questionBank.js
// Procedural Grade 5 Ratio Question Generator — 100 questions, 10 types, 10 worlds
import { BADGES } from '../../config/worlds.config.js';

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function gcd3(a, b, c) {
  return gcd(a, gcd(b, c));
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateRatioPair(diff) {
  let simpleA, simpleB, factor;
  if (diff === 1) {
    simpleA = randInt(1, 5);
    simpleB = randInt(1, 5);
    while (simpleA === simpleB) simpleB = randInt(1, 5);
    factor = randInt(2, 6);
  } else if (diff === 2) {
    simpleA = randInt(2, 7);
    simpleB = randInt(2, 7);
    while (gcd(simpleA, simpleB) > 1 || simpleA === simpleB) {
      simpleA = randInt(2, 8);
      simpleB = randInt(2, 8);
    }
    factor = randInt(3, 9);
  } else {
    simpleA = randInt(3, 11);
    simpleB = randInt(3, 11);
    while (gcd(simpleA, simpleB) > 1 || simpleA === simpleB) {
      simpleA = randInt(3, 12);
      simpleB = randInt(3, 12);
    }
    factor = randInt(4, 12);
  }
  const origA = simpleA * factor;
  const origB = simpleB * factor;
  const commonGcf = gcd(origA, origB);
  const simpA = origA / commonGcf;
  const simpB = origB / commonGcf;
  return { origA, origB, simpA, simpB, gcf: commonGcf, factor };
}

function generateDistractorsRatio(correctStr, simpA, simpB) {
  const opts = new Set([correctStr]);
  const offsets = [
    `${simpA + 1}:${simpB}`,
    `${simpA}:${simpB + 1}`,
    `${simpB}:${simpA}`,
    `${simpA * 2}:${simpB}`,
    `${simpA}:${simpB * 2}`,
    `${simpA + 1}:${simpB + 1}`,
  ];
  for (const candidate of shuffleArray(offsets)) {
    if (opts.size >= 4) break;
    opts.add(candidate);
  }
  while (opts.size < 4) {
    const a = randInt(1, 9);
    const b = randInt(1, 9);
    if (a !== b) opts.add(`${a}:${b}`);
  }
  return shuffleArray([...opts]);
}

function generateDistractorsNum(correct, min = 1, max = 50) {
  const opts = new Set([correct]);
  const offsets = [1, 2, 3, -1, -2, -3, 5, -5];
  for (const off of shuffleArray(offsets)) {
    if (opts.size >= 4) break;
    const cand = correct + off;
    if (cand >= min && cand <= max) opts.add(cand);
  }
  while (opts.size < 4) opts.add(randInt(min, Math.max(max, correct + 10)));
  return shuffleArray([...opts]);
}

const names = ['Sophia', 'Liam', 'Olivia', 'Ethan', 'Emma', 'Noah', 'Ava', 'Lucas', 'Mia', 'Jackson'];
const contexts = [
  { itemA: 'strawberries', itemB: 'blueberries', emojiA: '🍓', emojiB: '🫐' },
  { itemA: 'red apples',   itemB: 'green apples', emojiA: '🍎', emojiB: '🍏' },
  { itemA: 'blue pens',    itemB: 'red pens',     emojiA: '🖊️', emojiB: '🖋️' },
  { itemA: 'yellow beads', itemB: 'purple beads', emojiA: '🟡', emojiB: '🟣' },
  { itemA: 'vanilla cupcakes', itemB: 'chocolate cupcakes', emojiA: '🧁', emojiB: '🍩' },
  { itemA: 'white marbles', itemB: 'black marbles', emojiA: '⚪', emojiB: '⚫' },
];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Q1: Simplify basic 2-term ratio (e.g. 12 : 16 -> 3 : 4)
function genQ1(id, diff) {
  const { origA, origB, simpA, simpB, gcf } = generateRatioPair(diff);
  const correct = `${simpA}:${simpB}`;
  return {
    id, type: 'ratio_simplification_basic', world: 0, difficulty: diff,
    origA, origB, simpA, simpB, gcf,
    questionText: `Express the ratio ${origA} : ${origB} in its simplest form.`,
    visual: 'ratio_diagram',
    hint1: `Find a number that divides both ${origA} and ${origB} evenly.`,
    hint2: `Divide both numbers by their Greatest Common Factor (${gcf}).`,
    explanation: `${origA} ÷ ${gcf} = ${simpA} and ${origB} ÷ ${gcf} = ${simpB}. The simplest ratio is ${correct}.`,
    options: generateDistractorsRatio(correct, simpA, simpB),
    correctAnswer: correct,
  };
}

// Q2: Ratio GCF simplification (Find the GCF or simplified form)
function genQ2(id, diff) {
  const { origA, origB, simpA, simpB, gcf } = generateRatioPair(diff);
  return {
    id, type: 'ratio_simplification_gcf', world: 0, difficulty: diff,
    origA, origB, simpA, simpB, gcf,
    questionText: `What is the Greatest Common Factor (GCF) used to simplify ${origA} : ${origB}?`,
    visual: 'ratio_diagram',
    hint1: `List the factors of ${origA} and ${origB}.`,
    hint2: `What is the largest number that divides into both ${origA} and ${origB}?`,
    explanation: `The largest common divisor of ${origA} and ${origB} is ${gcf}.`,
    options: generateDistractorsNum(gcf, 1, 20),
    correctAnswer: gcf,
  };
}

// Q3: Equivalent ratio find blank (e.g. 3 : 5 = 12 : _)
function genQ3(id, diff) {
  const { origA, origB, simpA, simpB, factor } = generateRatioPair(diff);
  const findSecond = Math.random() > 0.5;
  const questionText = findSecond
    ? `${simpA} : ${simpB} = ${origA} : ___`
    : `${simpA} : ${simpB} = ___ : ${origB}`;
  const correctVal = findSecond ? origB : origA;
  return {
    id, type: 'ratio_equivalence_blank', world: 0, difficulty: diff,
    simpA, simpB, origA, origB, factor,
    questionText: `Find the missing number to make the ratios equivalent: ${questionText}`,
    visual: 'ratio_sentence',
    hint1: `How do you get from ${findSecond ? simpA : simpB} to ${findSecond ? origA : origB}? Multiply by ${factor}!`,
    hint2: `Multiply ${findSecond ? simpB : simpA} by ${factor} to get the missing term.`,
    explanation: `Both sides of ${simpA}:${simpB} are multiplied by ${factor}. So ${questionText.replace('___', correctVal)}.`,
    options: generateDistractorsNum(correctVal, 1, 100),
    correctAnswer: correctVal,
  };
}

// Q4: 3-part ratio simplification (e.g. 8 : 12 : 20 -> 2 : 3 : 5)
function genQ4(id, diff) {
  const sA = randInt(1, 5);
  const sB = randInt(1, 5);
  const sC = randInt(1, 5);
  const g = randInt(2, 5);
  const oA = sA * g;
  const oB = sB * g;
  const oC = sC * g;
  const common = gcd3(oA, oB, oC);
  const correct = `${oA / common}:${oB / common}:${oC / common}`;
  const opts = new Set([correct]);
  opts.add(`${oA / common + 1}:${oB / common}:${oC / common}`);
  opts.add(`${oA / common}:${oB / common + 1}:${oC / common}`);
  opts.add(`${oA / common}:${oB / common}:${oC / common + 1}`);
  opts.add(`${oC / common}:${oB / common}:${oA / common}`);
  return {
    id, type: 'three_part_ratio_simplification', world: 0, difficulty: diff,
    oA, oB, oC, gcf: common,
    questionText: `Simplify the 3-part ratio ${oA} : ${oB} : ${oC} to its simplest form.`,
    visual: 'ratio_diagram',
    hint1: `Divide all 3 numbers by their common factor ${common}.`,
    hint2: `${oA}÷${common} : ${oB}÷${common} : ${oC}÷${common}.`,
    explanation: `Dividing ${oA}, ${oB}, and ${oC} by ${common} gives ${correct}.`,
    options: shuffleArray([...opts]).slice(0, 4),
    correctAnswer: correct,
  };
}

// Q5: Word problem ratio story
function genQ5(id, diff) {
  const name = pick(names);
  const c = pick(contexts);
  const { origA, origB, simpA, simpB, gcf } = generateRatioPair(diff);
  const correct = `${simpA}:${simpB}`;
  return {
    id, type: 'word_problem_ratio', world: 0, difficulty: diff,
    name, origA, origB, simpA, simpB, gcf,
    questionText: `${name} has ${origA} ${c.itemA} and ${origB} ${c.itemB}. What is the ratio of ${c.itemA} to ${c.itemB} in simplest form?`,
    visual: 'bar_model', itemA: c.itemA, itemB: c.itemB, emojiA: c.emojiA, emojiB: c.emojiB,
    hint1: `First write the ratio as ${origA} : ${origB}.`,
    hint2: `Divide both ${origA} and ${origB} by ${gcf}.`,
    explanation: `${origA} : ${origB} simplifies to ${correct} by dividing both terms by ${gcf}.`,
    options: generateDistractorsRatio(correct, simpA, simpB),
    correctAnswer: correct,
  };
}

// Q6: Ratio with unit conversion (e.g. 40 cm to 2 m -> 1 : 5)
function genQ6(id, diff) {
  const units = [
    { nameA: 'cm', nameB: 'm', factor: 100, valA: 40, valB: 2, simpA: 1, simpB: 5 },
    { nameA: 'cm', nameB: 'm', factor: 100, valA: 50, valB: 2, simpA: 1, simpB: 4 },
    { nameA: 'mins', nameB: 'hours', factor: 60, valA: 15, valB: 1, simpA: 1, simpB: 4 },
    { nameA: 'mins', nameB: 'hours', factor: 60, valA: 30, valB: 2, simpA: 1, simpB: 4 },
    { nameA: 'g', nameB: 'kg', factor: 1000, valA: 250, valB: 1, simpA: 1, simpB: 4 },
    { nameA: 'g', nameB: 'kg', factor: 1000, valA: 500, valB: 2, simpA: 1, simpB: 4 },
  ];
  const u = pick(units);
  const totalBInA = u.valB * u.factor;
  const correct = `${u.simpA}:${u.simpB}`;
  return {
    id, type: 'ratio_with_unit_conversion', world: 0, difficulty: diff,
    valA: u.valA, valB: u.valB, unitA: u.nameA, unitB: u.nameB,
    questionText: `Express the ratio of ${u.valA} ${u.nameA} to ${u.valB} ${u.nameB} in simplest form.`,
    visual: 'ratio_sentence',
    hint1: `First convert ${u.valB} ${u.nameB} into ${u.nameA} (${u.valB * u.factor} ${u.nameA}).`,
    hint2: `Simplify the ratio ${u.valA} : ${totalBInA}.`,
    explanation: `${u.valB} ${u.nameB} = ${totalBInA} ${u.nameA}. ${u.valA} : ${totalBInA} simplifies to ${correct}.`,
    options: generateDistractorsRatio(correct, u.simpA, u.simpB),
    correctAnswer: correct,
  };
}

// Q7: True / False equivalence test
function genQ7(id, diff) {
  const { origA, origB, simpA, simpB } = generateRatioPair(diff);
  const isTrue = Math.random() > 0.5;
  const testRatio = isTrue ? `${simpA}:${simpB}` : `${simpA + 1}:${simpB}`;
  return {
    id, type: 'true_false_ratio', world: 0, difficulty: diff,
    origA, origB, simpA, simpB, testRatio,
    questionText: `Is this statement True or False? "${origA} : ${origB} in simplest form is ${testRatio}"`,
    visual: 'ratio_sentence',
    hint1: `Simplify ${origA} : ${origB} by dividing both numbers by their GCF.`,
    hint2: `${origA} : ${origB} simplifies to ${simpA}:${simpB}.`,
    explanation: `${origA} : ${origB} simplifies to ${simpA}:${simpB}, so the statement is ${isTrue ? 'True ✓' : 'False ✗'}.`,
    options: ['True', 'False'],
    correctAnswer: isTrue ? 'True' : 'False',
  };
}

// Q8: Bar model ratio question
function genQ8(id, diff) {
  const { origA, origB, simpA, simpB, gcf } = generateRatioPair(diff);
  const correct = `${simpA}:${simpB}`;
  return {
    id, type: 'ratio_visual_diagram', world: 0, difficulty: diff,
    origA, origB, simpA, simpB, gcf,
    questionText: `Look at the bar model. What is the ratio of Block A (${origA} units) to Block B (${origB} units) in simplest form?`,
    visual: 'bar_model', itemA: 'Block A', itemB: 'Block B',
    hint1: `Count the equal units for Block A and Block B.`,
    hint2: `Divide ${origA} and ${origB} by ${gcf}.`,
    explanation: `Block A to Block B is ${origA} : ${origB} = ${correct}.`,
    options: generateDistractorsRatio(correct, simpA, simpB),
    correctAnswer: correct,
  };
}

// Q9: Find missing ratio total or share
function genQ9(id, diff) {
  const simpA = randInt(2, 5);
  const simpB = randInt(2, 5);
  const unitVal = randInt(3, 10);
  const total = (simpA + simpB) * unitVal;
  const partA = simpA * unitVal;
  return {
    id, type: 'find_missing_ratio_term', world: 0, difficulty: diff,
    simpA, simpB, unitVal, total, partA,
    questionText: `Two quantities are in the ratio ${simpA} : ${simpB}. If the total amount is ${total}, what is the first share?`,
    visual: 'bar_model',
    hint1: `Total parts = ${simpA} + ${simpB} = ${simpA + simpB} parts.`,
    hint2: `1 part = ${total} ÷ ${simpA + simpB} = ${unitVal}. Multiply ${unitVal} × ${simpA}.`,
    explanation: `${simpA} + ${simpB} = ${simpA + simpB} parts. 1 part = ${unitVal}. First share = ${simpA} × ${unitVal} = ${partA}.`,
    options: generateDistractorsNum(partA, 1, 100),
    correctAnswer: partA,
  };
}

// Q10: Ratio as simplified fraction relation
function genQ10(id, diff) {
  const { origA, origB, simpA, simpB, gcf } = generateRatioPair(diff);
  const fractionStr = `${simpA}/${simpB}`;
  return {
    id, type: 'ratio_to_fraction_relationship', world: 0, difficulty: diff,
    origA, origB, simpA, simpB, gcf,
    questionText: `Express the ratio ${origA} : ${origB} as a fraction in simplest form.`,
    visual: 'ratio_sentence',
    hint1: `Write the ratio ${origA} : ${origB} as the fraction ${origA}/${origB}.`,
    hint2: `Divide top and bottom by ${gcf}.`,
    explanation: `${origA}/${origB} simplifies to ${fractionStr}.`,
    options: shuffleArray([fractionStr, `${simpA + 1}/${simpB}`, `${simpA}/${simpB + 1}`, `${simpB}/${simpA}`]),
    correctAnswer: fractionStr,
  };
}

const DISTRIBUTION = [
  ['ratio_simplification_basic',       genQ1,  [5, 3, 2]],
  ['ratio_simplification_gcf',         genQ2,  [4, 4, 2]],
  ['ratio_equivalence_blank',          genQ3,  [5, 3, 2]],
  ['three_part_ratio_simplification',  genQ4,  [3, 4, 3]],
  ['word_problem_ratio',               genQ5,  [4, 3, 3]],
  ['ratio_with_unit_conversion',       genQ6,  [3, 4, 3]],
  ['true_false_ratio',                 genQ7,  [5, 3, 2]],
  ['ratio_visual_diagram',             genQ8,  [4, 4, 2]],
  ['find_missing_ratio_term',          genQ9,  [3, 4, 3]],
  ['ratio_to_fraction_relationship',   genQ10, [4, 3, 3]],
];

export function generateSessionQuestions() {
  let all = [];
  let counter = 1;
  for (const [type, genFn, [e, m, h]] of DISTRIBUTION) {
    for (let i = 0; i < e; i++) all.push(genFn(`${type}_${counter++}`, 1));
    for (let i = 0; i < m; i++) all.push(genFn(`${type}_${counter++}`, 2));
    for (let i = 0; i < h; i++) all.push(genFn(`${type}_${counter++}`, 3));
  }
  all = shuffleArray(all);
  all.forEach((q, idx) => { q.world = Math.floor(idx / 10); });
  return all;
}

export const BADGE_TESTS = {
  first_ratio:          (s) => s.totalScore > 0,
  hot_streak:           (s) => s.maxStreak >= 5,
  lab_simplifier:       (s) => s.simulateDone,
  ratio_master:         (s) => s.totalQuestions > 0 && s.totalScore / s.totalQuestions >= 0.8,
  perfect_simplifier:   (s) => s.worldResults.some(w => w && w.correct === w.total),
  boss_slayer:          (s) => s.bossWon,
  full_journey:         (s) => s.reflectDone,
};

export function checkBadges(sessionState) {
  return BADGES.filter(b => (BADGE_TESTS[b.id] ? BADGE_TESTS[b.id](sessionState) : false));
}

export function scoreAnswer({ isCorrect, isFirstTry, streak }) {
  if (!isCorrect) return { xp: 0, newStreak: 0 };
  let xp = isFirstTry ? 10 : 5;
  const newStreak = streak + 1;
  if (newStreak >= 5 && newStreak % 5 === 0) xp += 5;
  return { xp, newStreak };
}

export function calcStars(correctCount, totalCount = 10) {
  const pct = totalCount > 0 ? correctCount / totalCount : 0;
  if (pct >= 0.9) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.5) return 1;
  return 0;
}

export function isWorldUnlocked() {
  return true;
}
