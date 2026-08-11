// src/utils/ratioMath.js
// Mathematical helpers for Simplifying Ratios, GCF, and Distractor Generation

export function gcd(a, b) {
  let x = Math.abs(Number(a));
  let y = Math.abs(Number(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function gcd3(a, b, c) {
  return gcd(a, gcd(b, c));
}

export function simplifyRatio(a, b) {
  const common = gcd(a, b);
  return {
    origA: a,
    origB: b,
    simpA: a / common,
    simpB: b / common,
    gcf: common,
    ratioString: `${a / common}:${b / common}`,
  };
}

export function simplify3PartRatio(a, b, c) {
  const common = gcd3(a, b, c);
  return {
    origA: a,
    origB: b,
    origC: c,
    simpA: a / common,
    simpB: b / common,
    simpC: c / common,
    gcf: common,
    ratioString: `${a / common}:${b / common}:${c / common}`,
  };
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateDistractorsRatio(correctStr, simpA, simpB) {
  const opts = new Set([correctStr]);
  const offsets = [
    `${simpA + 1}:${simpB}`,
    `${simpA}:${simpB + 1}`,
    `${simpB}:${simpA}`,
    `${simpA * 2}:${simpB}`,
    `${simpA}:${simpB * 2}`,
    `${simpA + 1}:${simpB + 1}`,
    `${Math.max(1, simpA - 1)}:${simpB}`,
    `${simpA}:${Math.max(1, simpB - 1)}`,
  ];
  for (const candidate of shuffleArray(offsets)) {
    if (opts.size >= 4) break;
    opts.add(candidate);
  }
  while (opts.size < 4) {
    const a = randInt(1, 8);
    const b = randInt(1, 8);
    if (a !== b) opts.add(`${a}:${b}`);
  }
  return shuffleArray([...opts]);
}

export function generateDistractorsNum(correct, min = 1, max = 50) {
  const opts = new Set([correct]);
  const offsets = [1, 2, 3, -1, -2, -3, 5, -5, 10];
  for (const off of shuffleArray(offsets)) {
    if (opts.size >= 4) break;
    const cand = correct + off;
    if (cand >= min && cand <= max) opts.add(cand);
  }
  while (opts.size < 4) {
    opts.add(randInt(min, Math.max(max, correct + 8)));
  }
  return shuffleArray([...opts]);
}
