// Renders the social share image (public/og.png, 1200x630) from an HTML card,
// using the site's own font and colours. Re-run after changing the design:
//   npm run share-image
// Needs Microsoft Edge or Google Chrome installed (uses playwright-core).

import { chromium } from 'playwright-core';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const fontFile = (pkg, file) =>
  readFileSync(join(root, 'node_modules/@fontsource-variable', pkg, 'files', file)).toString('base64');
const inter = fontFile('inter', 'inter-latin-wght-normal.woff2');
const grotesk = fontFile('space-grotesk', 'space-grotesk-latin-wght-normal.woff2');

const html = `<!doctype html>
<html><head><style>
  @font-face { font-family: Inter; src: url(data:font/woff2;base64,${inter}) format('woff2'); font-weight: 100 900; }
  @font-face { font-family: Grotesk; src: url(data:font/woff2;base64,${grotesk}) format('woff2'); font-weight: 300 700; }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; color: #f5f3ff; font-family: Inter, sans-serif;
         background: radial-gradient(900px 600px at 100% 0%, rgba(157,123,255,.45), transparent 60%),
                     radial-gradient(700px 500px at 0% 100%, rgba(94,227,255,.22), transparent 60%), #0b0a14;
         display: flex; flex-direction: column; justify-content: space-between; padding: 64px 80px; }
  .brand { font-family: Grotesk; font-size: 36px; font-weight: 700; display: flex; align-items: center; gap: 16px; }
  .mark { display: grid; place-items: center; width: 60px; height: 60px; border-radius: 14px; background: #c4f542;
          color: #0b0a14; font: 800 26px ui-monospace, monospace; transform: rotate(-6deg); }
  h1 { font-family: Grotesk; font-size: 96px; font-weight: 700; letter-spacing: -0.04em; line-height: 0.98; }
  .grad { background: linear-gradient(100deg, #c4f542, #5ee3ff 45%, #ff6ad5); -webkit-background-clip: text; color: transparent; }
  .row { display: flex; justify-content: space-between; align-items: flex-end; }
  .tracks { display: flex; gap: 12px; }
  .tag { font-size: 24px; font-weight: 600; padding: 8px 20px; border-radius: 999px; border: 2px solid #2c2843; color: #b4afc9; }
  .tag.accent { border-color: #c4f542; color: #0b0a14; background: #c4f542; }
  .url { font-family: Grotesk; font-size: 30px; font-weight: 700; color: #c4f542; }
</style></head>
<body>
  <div class="brand"><span class="mark">&gt;_</span>mycsmajor</div>
  <h1>One CS problem a day.<br><span class="grad">Zero brain rot.</span></h1>
  <div class="row">
    <div class="tracks"><span class="tag accent">Python</span><span class="tag">Cyber security</span><span class="tag">Data structures</span></div>
    <div class="url">mycsmajor.com</div>
  </div>
</body></html>`;

const browserPaths = [
  process.env.CHROME_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const executablePath = browserPaths.find((p) => p && existsSync(p));
if (!executablePath) throw new Error('No Edge or Chrome found.');

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const out = join(root, 'public', 'og.png');
await page.screenshot({ path: out, type: 'png' });
await browser.close();
console.log('Wrote', out);
