// src/core/questions/questionFactory.js
import { generateSessionQuestions } from './questionBank.js';

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let _cachedSession = null;

export function getSession() {
  if (!_cachedSession) _cachedSession = generateSessionQuestions();
  return _cachedSession;
}

export function resetSession() {
  _cachedSession = generateSessionQuestions();
  return _cachedSession;
}

export function getWorldPool(worldId) {
  return getSession().filter((q) => q.world === worldId);
}

export function generateModeQuestions(worldId, count, { excludeHard = false } = {}) {
  let pool = getWorldPool(worldId);
  if (excludeHard) {
    const easier = pool.filter((q) => q.difficulty < 3);
    if (easier.length >= Math.min(count, 3)) pool = easier;
  }
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

export function getReflectQuestions(count = 5) {
  const session = getSession();
  const worldIds = shuffle([...new Set(session.map((q) => q.world))]).slice(0, count);
  return worldIds.map((w) => {
    const pool = session.filter((q) => q.world === w && q.difficulty <= 2);
    const fromPool = pool.length ? pool : session.filter((q) => q.world === w);
    return fromPool[Math.floor(Math.random() * fromPool.length)];
  }).filter(Boolean);
}
