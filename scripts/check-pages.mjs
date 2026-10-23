// Loads every built page at phone and desktop widths and reports
// horizontal overflow, console errors, failed requests and accessibility
// problems found by axe-core (WCAG 2.1 A and AA rules).
//
// Usage: npm run build && npm run preview  (in another terminal)
//        node scripts/check-pages.mjs [baseUrl] [screenshotDir]
//
// Needs Microsoft Edge or Google Chrome installed (uses playwright-core).

import { chromium } from 'playwright-core';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, relative } from 'node:path';

const base = process.argv[2] ?? 'http://localhost:4173';
const shotDir = process.argv[3];
const dist = join(import.meta.dirname, '..', 'dist');
const axeSource = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');

const VIEWPORTS = [
  { name: 'phone-s', width: 320, height: 640 },
  { name: 'phone', width: 360, height: 780 },
  { name: 'desktop', width: 1366, height: 900 },
];

function pages(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...pages(full));
    else if (name.endsWith('.html')) {
      const rel = relative(dist, full).replace(/\\/g, '/');
      out.push('/' + rel.replace(/(^|\/)index\.html$/, '$1'));
    }
  }
  return out.sort();
}

const browserPaths = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const executablePath = browserPaths.find((p) => existsSync(p));
if (!executablePath) throw new Error('No Edge or Chrome found.');

if (shotDir) mkdirSync(shotDir, { recursive: true });
const browser = await chromium.launch({ executablePath });
let problems = 0;

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  for (const path of pages(dist)) {
    const page = await context.newPage();
    const errors = [];
    page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('requestfailed', (req) => errors.push(`failed: ${req.url()}`));

    const res = await page.goto(base + path, { waitUntil: 'networkidle' });
    // Open every <details> so hidden content is measured too.
    await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));

    const overflow = await page.evaluate(() => {
      const width = document.documentElement.clientWidth;
      const wide = [...document.querySelectorAll('body *')]
        // Content inside a code block scrolls within that block, which is fine.
        .filter((el) => !el.closest('pre') && el.getBoundingClientRect().right > width + 1)
        .slice(0, 3)
        .map((el) => `${el.tagName.toLowerCase()}.${el.className}`);
      return { scroll: document.documentElement.scrollWidth, width, wide };
    });

    await page.addScriptTag({ content: axeSource });
    const a11y = await page.evaluate(async () => {
      const result = await window.axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      });
      return result.violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes[0].target.join(' ')}`);
    });

    const status = path === '/404.html' ? 200 : res.status();
    const bad =
      status >= 400 || errors.length || overflow.scroll > overflow.width || overflow.wide.length || a11y.length;
    if (bad) problems++;
    console.log(
      `${bad ? 'FAIL' : 'ok  '} ${vp.name.padEnd(7)} ${path.padEnd(42)} ` +
        (bad ? JSON.stringify({ status, errors, overflow, a11y }) : ''),
    );

    if (shotDir) {
      await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = false)));
      const file = `${vp.name}-${path.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home'}.png`;
      await page.screenshot({ path: join(shotDir, file), fullPage: true });
    }
    await page.close();
  }
  await context.close();
}

await browser.close();
console.log(problems ? `\n${problems} problem(s) found.` : '\nAll pages passed.');
process.exit(problems ? 1 : 0);
