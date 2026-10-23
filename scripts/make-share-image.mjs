// Renders the social share image (public/og.png, 1200x630) from an HTML card,
// using the site's own font and colours. Re-run after changing the design:
//   npm run share-image
// Needs Microsoft Edge or Google Chrome installed (uses playwright-core).

import { chromium } from 'playwright-core';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const font = readFileSync(
  join(root, 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'),
).toString('base64');

const html = `<!doctype html>
<html><head><style>
  @font-face { font-family: Inter; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 100 900; }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #faf9f6; color: #111; font-family: Inter, sans-serif;
         display: flex; flex-direction: column; justify-content: space-between; padding: 72px 80px;
         border-top: 14px solid #1d4ed8; }
  .brand { font-size: 34px; font-weight: 750; letter-spacing: -0.02em; }
  h1 { font-size: 104px; font-weight: 780; letter-spacing: -0.035em; line-height: 1.02; max-width: 960px; }
  .row { display: flex; justify-content: space-between; align-items: flex-end; }
  .tracks { display: flex; gap: 14px; }
  .tag { font-size: 26px; font-weight: 600; padding: 8px 22px; border-radius: 999px; border: 2px solid #e2e0d9; color: #4a4a4a; background: #fff; }
  .tag.accent { border-color: #1d4ed8; color: #1d4ed8; background: #e8eefc; }
  .url { font-size: 30px; font-weight: 600; color: #1d4ed8; }
</style></head>
<body>
  <div class="brand">mycsmajor</div>
  <h1>One CS problem a day</h1>
  <div class="row">
    <div class="tracks"><span class="tag accent">Python</span><span class="tag">Logic</span><span class="tag">Data structures</span></div>
    <div class="url">mycsmajor.com</div>
  </div>
</body></html>`;

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

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const out = join(root, 'public', 'og.png');
await page.screenshot({ path: out, type: 'png' });
await browser.close();
console.log('Wrote', out);
