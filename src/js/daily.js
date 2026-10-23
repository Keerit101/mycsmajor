import { addDays, dateKey, problemFor } from '../data/problems.js';
import { formatDate, problemBody, problemCard, problemTags } from './problem-view.js';
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
    const p = problemFor(date);
    const done = state.solved.has(dateKey(date));
    items.push(`
      <li>
        <details>
          <summary>
            <span class="archive-date">${formatDate(date)}</span>
            <span class="archive-title">${p.title}</span>
            ${done ? '<span class="archive-done">Solved</span>' : ''}
          </summary>
          <div class="archive-body">
            ${problemTags(p)}
            ${problemBody(p)}
          </div>
        </details>
      </li>`);
  }
  archive.innerHTML = items.join('');
}

mountSolveControls(todaySlot.querySelector('[data-solve]'), renderStats);
renderArchive(getStreak(today));
markScrollableCode();
