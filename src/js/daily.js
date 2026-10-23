import { addDays, dateKey, dayIndex, problemFor } from '../data/problems.js';
import { formatDate, problemCard, problemUrl } from './problem-view.js';
import { mountSolveControls } from './solve-controls.js';
import { getStreak } from './streak.js';
import { markScrollableCode } from './scrollable.js';

const ARCHIVE_DAYS = 14;
const today = new Date();

const todaySlot = document.querySelector('[data-today]');
todaySlot.innerHTML = problemCard(problemFor(today), today);

const archive = document.querySelector('[data-archive]');

function renderStats(state) {
  for (const key of ['current', 'best', 'total']) {
    document.querySelector(`[data-stat="${key}"]`).textContent = String(state[key]);
  }
}

function renderArchive(state) {
  const items = [];
  for (let i = 1; i <= ARCHIVE_DAYS; i++) {
    const date = addDays(today, -i);
    if (dayIndex(date) < 0) break; // before the schedule started
    const p = problemFor(date);
    const done = state.solved.has(dateKey(date));
    items.push(`
      <li>
        <a class="archive-row" href="${problemUrl(p)}">
          <span class="archive-date">${formatDate(date)}</span>
          <span class="archive-title">${p.title}</span>
          <span class="archive-done">${p.topic} &middot; ${p.difficulty}${done ? ' &middot; Solved' : ''}</span>
        </a>
      </li>`);
  }
  archive.innerHTML = items.length
    ? items.join('')
    : '<li class="archive-empty muted">No earlier problems yet. This list fills up as the days go by.</li>';
}

mountSolveControls(todaySlot.querySelector('[data-solve]'), renderStats);
renderArchive(getStreak(today));
markScrollableCode();
