# Summary of round 2 (23 October 2026)

This round grew the content, gave every problem its own page, prepared the site to earn money and to be deployed, and published the code on GitHub. The site is **not live yet**. The next step is importing the repo into Vercel (see "Waiting on you").

Code: <https://github.com/Keerit101/mycsmajor> (public, branch `main`).

## What changed

### 1. Content
- **Problems: 36 → 90.** Three tracks of 30 (Python, Logic, Data structures), each ordered from easy to hard. The daily problem rotates tracks and gets harder over a 90-day cycle, starting with the easiest problem on 23 October 2026.
- **Every answer is tested.** `npm test` runs all 60 Python solutions against their examples and edge cases, and checks the logic answers by computing them (for example: bridge crossing by search, two eggs by dynamic programming, Josephus by simulation). All pass.
- **Python Book: 6 → 12 chapters.** New: More functions, Dictionaries and sets, Working with files, Classes and objects, Errors and exceptions, Testing your code. Functions and dictionaries already had beginner chapters, so the new ones go further rather than repeat them. Every output shown was checked by running it.
- **Cyber Brief: 8 → 12 real incidents**, each linked to its official NVD record: Ivanti Connect Secure (2024), Citrix Bleed (2023), Baron Samedit in sudo (2021) and Spectre (2018).

### 2. Code blocks
Code now uses a monospace font (system fonts, nothing extra to download), with real indentation and aligned comments. Long lines scroll inside the code block on phones; the page itself never scrolls sideways.

### 3. Growth
- **Every problem has its own page** at `/problems/<slug>/`, with a unique title and description, the hint and solution, and links to the next easier and harder problem. `/problems/` lists all 90.
- **The sitemap now has 112 URLs.** The problem pages are generated from the problem data at build time, so they can never fall out of sync.
- **Open Graph and Twitter Card tags** on every page, with a generated 1200×630 share image (`public/og.png`).

### 4. Money prep
- New **`/affiliate-disclosure/`** page, linked from the footer on every page, from Gear Guides and from the privacy policy.
- The 9 gear links keep their `data-affiliate="TODO"` markers.
- **Hidden ad slots** (search the code for `AD SLOT`) on Home, every problem page, the problem index, every book chapter and Cyber Brief. `src/js/ads.js` is the single on/off switch. It does nothing until you add an AdSense publisher ID.

### 5. Analytics
A cookieless **Vercel Web Analytics** snippet is in `src/partials/head.html`, commented out. TODO.md explains how to turn it on, including the privacy policy wording to add first.

### 6. Quality
- **Lighthouse (mobile, local): 100** for performance, accessibility, best practices and SEO on every audited page. Fixing Home and Daily (previously 77 and 81) meant removing a layout jump and preloading the font.
- **Every page passes axe-core's WCAG 2.1 AA checks** at all three sizes, with every hint and solution opened.
- **Keyboard focus:** every focusable element shows a visible blue focus ring.
- **Contrast:** all text passes AA.
- **Images:** the site has no content images; the share image has alt text.

### 7. Deploy prep
`vercel.json` sets clean URLs with trailing slashes, `npm ci`, security headers and asset caching. Vercel serves the 404 page automatically. A fresh clone builds a complete `dist/` with `npm ci && npm run build`.

### 8. GitHub
`gh` was logged in as Keerit101, so I created the **public repo Keerit101/mycsmajor** and pushed. Before pushing, I scanned the whole history for personal email, school, city, LinkedIn, secrets and AI credit lines; none were found. Every commit uses your GitHub no-reply email.

## Final checks (all passing)
- `npm run build`: clean, with no errors or warnings.
- `npm test`: 90 problems; all 60 Python solutions and the logic answers pass.
- `npm run check:seo`: 113 pages with unique titles and descriptions, canonicals, social tags and full sitemap coverage.
- `npm run check`: 339 of 339 page loads pass (113 pages at 320, 360 and 1366 px) with no sideways scroll, no console errors, no failed requests and no accessibility violations.
- Browser test of the streak (solve, continue, undo, reset after a missed day), the archive and the problem links: all pass.

## Waiting on you
Full details are in `TODO.md`. The main items:

1. **Import the repo into Vercel** and deploy. `vercel.json` already has every setting.
2. **Connect the domain** `mycsmajor.com` in Vercel.
3. **Set up the `hello@mycsmajor.com` mailbox** (or change the address in the 3 files listed).
4. **Join affiliate programmes** and swap in the 9 links in `gear/index.html`.
5. **Read the privacy policy and the affiliate disclosure.** They make promises on your behalf.
6. **Optional: analytics.** Enable it in Vercel, paste the script path, and update the privacy policy first.
7. **Later: AdSense.** Apply, set up a consent banner, update the privacy policy, then flip the switch in `src/js/ads.js` and add `ads.txt`.
8. **Optional:** Google Search Console, a license choice, per-problem share images, and a Content-Security-Policy header.

I did not create any other accounts or buy anything.
