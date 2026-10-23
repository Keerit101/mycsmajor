// Code blocks scroll sideways when a line is too long. A scrolling block must be
// focusable so keyboard users can scroll it too, so give tabindex only to those.
function update() {
  for (const pre of document.querySelectorAll('pre')) {
    if (pre.scrollWidth > pre.clientWidth + 1) {
      pre.tabIndex = 0;
      pre.setAttribute('aria-label', 'Code sample, scrollable');
    } else {
      pre.removeAttribute('tabindex');
      pre.removeAttribute('aria-label');
    }
  }
}

let queued = false;
export function markScrollableCode() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    update();
  });
}

window.addEventListener('resize', markScrollableCode);
// <details> content has no width until opened.
document.addEventListener('toggle', markScrollableCode, true);
