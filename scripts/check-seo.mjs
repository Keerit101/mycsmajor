// Checks every built page for SEO basics: a unique title and description of
// sensible length, one <h1>, canonical and social tags, and sitemap coverage.
// Usage: npm run build && node scripts/check-seo.mjs

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = join(import.meta.dirname, '..', 'dist');
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return name.endsWith('.html') ? [full] : [];
  });

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
const seenTitles = new Map();
const seenDescriptions = new Map();
const problems = [];
let pages = 0;

for (const file of walk(dist)) {
  pages++;
  const rel = relative(dist, file).replace(/\\/g, '/');
  const url = '/' + rel.replace(/(^|\/)index\.html$/, '$1');
  const html = readFileSync(file, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
  const description = html.match(/<meta name="description" content="(.*?)"/)?.[1] ?? '';
  const noindex = html.includes('content="noindex"');
  const fail = (msg) => problems.push(`${url}: ${msg}`);

  if (title.length < 10 || title.length > 70) fail(`title length ${title.length}: ${title}`);
  if (description.length < 70 || description.length > 170) fail(`description length ${description.length}`);
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) fail('needs exactly one <h1>');
  if (!html.includes('<html lang="en">')) fail('missing lang');
  for (const tag of ['og:title', 'og:description', 'og:image', 'twitter:card', 'twitter:image']) {
    if (!html.includes(`"${tag}"`)) fail(`missing ${tag}`);
  }
  if (seenTitles.has(title)) fail(`duplicate title with ${seenTitles.get(title)}`);
  if (seenDescriptions.has(description)) fail(`duplicate description with ${seenDescriptions.get(description)}`);
  seenTitles.set(title, url);
  seenDescriptions.set(description, url);

  if (!noindex) {
    if (!html.includes(`<link rel="canonical" href="https://mycsmajor.com${url}"`)) fail('canonical missing or wrong');
    if (!sitemap.includes(`<loc>https://mycsmajor.com${url}</loc>`)) fail('not in sitemap');
  } else if (sitemap.includes(`<loc>https://mycsmajor.com${url}</loc>`)) {
    fail('noindex page is in the sitemap');
  }
}

console.log(`${pages} pages checked.`);
if (problems.length) {
  console.log(problems.join('\n'));
  process.exit(1);
}
console.log('SEO checks passed.');
