// Writes /problems/index.html and one /problems/<slug>/index.html per problem,
// from the data in src/data/tracks. Runs before every dev and build.
// The output folder is generated, so it is not committed (see .gitignore).

import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { TRACKS, problems } from '../src/data/problems.js';
import { escapeHtml, problemBody, problemTags, problemUrl } from '../src/js/problem-view.js';

const root = join(import.meta.dirname, '..');
const outDir = join(root, 'problems');

const ENTITIES = { '&times;': '×', '&minus;': '−', '&le;': '≤', '&ge;': '≥', '&middot;': '·', '&lt;': '<', '&gt;': '>', '&quot;': "'", '&amp;': '&' };

// HTML fragment -> one line of plain text.
function plain(html) {
  return html
    .replace(/<sup>(.*?)<\/sup>/g, '^$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, (e) => ENTITIES[e] ?? ' ')
    .replace(/"/g, "'") // keeps the meta attribute free of &quot; escapes
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.]$/, '') + '…';
}

const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function titleFor(p) {
  const options = [
    `${p.title}: ${p.topic} Practice Problem | mycsmajor`,
    `${p.title}: ${p.topic} Problem | mycsmajor`,
    `${p.title} | mycsmajor`,
  ];
  return options.find((t) => t.length <= 65) ?? options.at(-1);
}

function descriptionFor(p) {
  const lead = `${p.difficulty} ${p.topic.toLowerCase()} problem: `;
  const tail = ' Hint and full solution included.';
  return lead + truncate(plain(p.prompt), 160 - lead.length - tail.length) + tail;
}

function page({ title, description, body }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <!--head-->
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${attr(description)}" />
  </head>
  <body>
    <!--header-->
    <main id="main">
${body}
    </main>
    <!--footer-->
  </body>
</html>
`;
}

function problemPage(p, trackProblems) {
  const i = p.number - 1;
  const prev = trackProblems[i - 1];
  const next = trackProblems[i + 1];
  const navLink = (q, label, cls) =>
    q ? `<a class="btn ${cls}" href="${problemUrl(q)}">${label}: ${escapeHtml(q.title)}</a>` : '';
  return page({
    title: titleFor(p),
    description: descriptionFor(p),
    body: `      <article class="wrap">
        <nav class="breadcrumb small" aria-label="Breadcrumb">
          <a href="/problems/">Problems</a> <span aria-hidden="true">/</span> <a href="/problems/#${p.track}">${p.topic}</a>
        </nav>
        <header class="page-head">
          <span class="eyebrow">${p.topic} problem ${p.number} of ${p.of}</span>
          <h1>${p.title}</h1>
          ${problemTags(p)}
        </header>
        <div class="card problem">
          ${problemBody(p)}
        </div>
        <p class="small muted below-card">Want a problem like this every day? <a href="/daily/">See today's problem</a> and keep a streak going.</p>

        <!-- AD SLOT: problem-end. Hidden until ads are set up; see src/js/ads.js and TODO.md. -->
        <aside class="ad-slot" data-ad-slot="problem-end" aria-label="Advertisement" hidden></aside>

        <nav class="chapter-nav" aria-label="More ${p.topic} problems">
          ${navLink(prev, 'Easier', 'btn-ghost') || `<a class="btn btn-ghost" href="/problems/">All problems</a>`}
          ${navLink(next, 'Harder', '') || `<a class="btn" href="/daily/">Today's problem</a>`}
        </nav>
      </article>`,
  });
}

function indexPage() {
  const sections = TRACKS.map((t) => {
    const rows = t.problems
      .map((raw, i) => {
        const p = problems.find((q) => q.slug === raw.slug);
        return `            <li>
              <a class="archive-row" href="${problemUrl(p)}">
                <span class="archive-date">${t.name} ${i + 1}</span>
                <span class="archive-title">${p.title}</span>
                <span class="archive-done">${p.difficulty}</span>
              </a>
            </li>`;
      })
      .join('\n');
    return `        <section class="track-section" id="${t.key}" aria-labelledby="${t.key}-title">
          <h2 id="${t.key}-title">${t.name}</h2>
          <ol class="archive">
${rows}
          </ol>
        </section>`;
  }).join('\n\n');

  return page({
    title: `${problems.length} CS Practice Problems with Solutions | mycsmajor`,
    description: `Every mycsmajor practice problem in one place: ${problems.length} Python, cyber security and data structures problems for CS students, from easy to hard, each with a hint and a solution.`,
    body: `      <div class="wrap">
        <header class="page-head">
          <span class="eyebrow">Problems</span>
          <h1>Every problem</h1>
          <p class="lede">${problems.length} problems in three tracks, each ordered from easiest to hardest. Every one has a hint and a full solution. The <a href="/daily/">daily problem</a> works through them one day at a time.</p>
        </header>
        <ul class="toc" aria-label="Tracks">
${TRACKS.map((t) => `          <li><a href="#${t.key}">${t.name}</a></li>`).join('\n')}
        </ul>

        <!-- AD SLOT: problems-index. Hidden until ads are set up; see src/js/ads.js and TODO.md. -->
        <aside class="ad-slot" data-ad-slot="problems-index" aria-label="Advertisement" hidden></aside>

${sections}
      </div>`,
  });
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'index.html'), indexPage());
for (const track of TRACKS) {
  const trackProblems = problems.filter((p) => p.track === track.key);
  for (const p of trackProblems) {
    mkdirSync(join(outDir, p.slug), { recursive: true });
    writeFileSync(join(outDir, p.slug, 'index.html'), problemPage(p, trackProblems));
  }
}
console.log(`Generated ${problems.length} problem pages and the problem index.`);
