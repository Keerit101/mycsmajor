import { dateKey } from '../data/problems.js';

export const problemUrl = (p) => `/problems/${p.slug}/`;

export const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const codeBlock = (code) => `<pre><code>${escapeHtml(code)}</code></pre>`;

export function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Body of a problem: prompt, example, then hint and solution hidden in <details>.
export function problemBody(p) {
  return `
    <div class="problem-body">
      ${p.prompt}
      ${p.example ? codeBlock(p.example) : ''}
    </div>
    <details class="reveal">
      <summary>Show hint</summary>
      <div class="reveal-body">${p.hint}</div>
    </details>
    <details class="reveal">
      <summary>Show solution</summary>
      <div class="reveal-body">
        ${p.code ? codeBlock(p.code) : ''}
        ${p.answer}
      </div>
    </details>`;
}

export function problemTags(p) {
  return `
    <ul class="tags" aria-label="Topic and difficulty">
      <li class="tag tag-accent">${p.topic}</li>
      <li class="tag">${p.difficulty}</li>
    </ul>`;
}

// Full card for today's problem, with a slot for the "I solved it" controls.
export function problemCard(p, date, headingTag = 'h2') {
  return `
    <article class="card problem" aria-labelledby="problem-title">
      <div class="problem-meta">
        <span><time datetime="${dateKey(date)}">${formatDate(date)}</time> &middot; ${p.topic} ${p.number} of ${p.of}</span>
        ${problemTags(p)}
      </div>
      <${headingTag} id="problem-title" class="problem-title">${p.title}</${headingTag}>
      ${problemBody(p)}
      <div class="solve" data-solve></div>
      <p class="small permalink"><a href="${problemUrl(p)}">Open this problem's own page</a> to bookmark or share it.</p>
    </article>`;
}
