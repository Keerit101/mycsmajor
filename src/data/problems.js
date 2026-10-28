// Daily problems: three tracks of 30, each ordered from easiest to hardest.
//
// Scheduling: days rotate Python, Cyber security, Data structures, and each track moves
// one step harder every third day. The full cycle is 90 days, then it repeats.
// Add new problems to the end of a track (or keep tracks the same length) so
// that past dates keep showing the same problem.
//
// Fields (in src/data/tracks/*.js):
//   slug:                 URL of the problem page, /problems/<slug>/ (never change it)
//   prompt, hint, answer: trusted HTML written by us
//   example, code:        plain code, escaped when rendered
// Python solutions are checked by `npm test` (tests/check_solutions.py).

import python from './tracks/python.js';
import cyber from './tracks/cyber.js';
import structures from './tracks/structures.js';

export const TRACKS = [
  { key: 'python', name: 'Python', problems: python },
  { key: 'cyber', name: 'Cyber security', problems: cyber },
  { key: 'structures', name: 'Data structures', problems: structures },
];

// Every problem with its track and position filled in, in schedule order.
export const problems = [];
const LEVELS = Math.max(...TRACKS.map((t) => t.problems.length));
for (let level = 0; level < LEVELS; level++) {
  for (const track of TRACKS) {
    const p = track.problems[level];
    if (!p) continue;
    problems.push({ ...p, topic: track.name, track: track.key, number: level + 1, of: track.problems.length });
  }
}

export const bySlug = new Map(problems.map((p) => [p.slug, p]));

// Day 0 of the schedule (local time). Set to the launch week so the
// cycle starts with the easiest problems.
export const EPOCH = new Date(2026, 9, 23);
const DAY_MS = 24 * 60 * 60 * 1000;

export function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Whole calendar days since EPOCH, safe across daylight-saving changes.
export function dayIndex(date) {
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const epoch = Date.UTC(EPOCH.getFullYear(), EPOCH.getMonth(), EPOCH.getDate());
  return Math.floor((utc - epoch) / DAY_MS);
}

export function problemFor(date) {
  const n = problems.length;
  return problems[((dayIndex(date) % n) + n) % n];
}

export function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}
