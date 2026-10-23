import { problemFor } from '../data/problems.js';
import { problemCard } from './problem-view.js';
import { mountSolveControls } from './solve-controls.js';

const today = new Date();
const slot = document.querySelector('[data-today]');
slot.innerHTML = problemCard(problemFor(today), today);
mountSolveControls(slot.querySelector('[data-solve]'));
