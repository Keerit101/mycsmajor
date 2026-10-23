import { getStreak, markSolved, undoSolved, storageAvailable } from './streak.js';

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

// Renders the "I solved it" button and keeps any streak displays in sync.
export function mountSolveControls(container, onChange = () => {}) {
  if (!container) return;

  if (!storageAvailable()) {
    container.innerHTML = `<p class="muted small">Your browser is blocking local storage, so streaks cannot be saved here.</p>`;
    return;
  }

  const render = (state, justSolved = false) => {
    if (state.solvedToday) {
      container.innerHTML = `
        <div class="btn-row">
          <button class="btn" type="button" disabled>Solved today</button>
          <button class="btn btn-ghost" type="button" data-undo>Undo</button>
        </div>
        <p class="status-note" role="status">${justSolved ? 'Nice work. ' : ''}Current streak: ${plural(state.current, 'day')}. Come back tomorrow for the next one.</p>`;
      container.querySelector('[data-undo]').addEventListener('click', () => update(undoSolved(), false, true));
    } else {
      container.innerHTML = `
        <div class="btn-row">
          <button class="btn" type="button" data-solve-btn>I solved it</button>
        </div>
        <p class="status-note muted" role="status">${
          state.current > 0
            ? `Current streak: ${plural(state.current, 'day')}. Solve today's to keep it going.`
            : 'Solve it, then mark it to start a streak.'
        }</p>`;
      container.querySelector('[data-solve-btn]').addEventListener('click', () => update(markSolved(), true, true));
    }
  };

  const update = (state, justSolved = false, fromClick = false) => {
    render(state, justSolved);
    // The clicked button was replaced, so keep keyboard focus nearby.
    if (fromClick) container.querySelector('button:not([disabled])')?.focus();
    onChange(state);
  };

  update(getStreak());
}
