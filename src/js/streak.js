// Streak tracking, stored only in this browser's localStorage.
import { addDays, dateKey } from '../data/problems.js';

const KEY = 'mycsmajor:streak:v1';
const MAX_HISTORY = 400;

const empty = () => ({ last: null, current: 0, best: 0, total: 0, solved: [], undo: null });

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty(), ...JSON.parse(raw) } : empty();
  } catch {
    return empty();
  }
}

function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function storageAvailable() {
  try {
    const probe = KEY + ':probe';
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

// Current streak only counts if the last solve was today or yesterday.
export function getStreak(today = new Date()) {
  const s = load();
  const todayKey = dateKey(today);
  const yesterdayKey = dateKey(addDays(today, -1));
  const alive = s.last === todayKey || s.last === yesterdayKey;
  return {
    current: alive ? s.current : 0,
    best: s.best,
    total: s.total,
    solvedToday: s.last === todayKey,
    solved: new Set(s.solved),
  };
}

export function markSolved(today = new Date()) {
  const s = load();
  const todayKey = dateKey(today);
  if (s.last === todayKey) return getStreak(today);

  const { undo, ...before } = s;
  const continues = s.last === dateKey(addDays(today, -1));
  s.current = continues ? s.current + 1 : 1;
  s.best = Math.max(s.best, s.current);
  s.total += 1;
  s.last = todayKey;
  s.solved = [...s.solved, todayKey].slice(-MAX_HISTORY);
  s.undo = { date: todayKey, before };
  save(s);
  return getStreak(today);
}

// Undo today's "solved" click, restoring the state from before it.
export function undoSolved(today = new Date()) {
  const s = load();
  if (s.undo && s.undo.date === dateKey(today)) save({ ...s.undo.before, undo: null });
  return getStreak(today);
}
