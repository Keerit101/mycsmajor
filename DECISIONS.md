# Decisions

Choices made while building the site without asking, and the reasoning behind each.

## Structure

- **Multi-page app, one HTML file per page.** Every page is real HTML at a clean URL (`/daily/`, `/python-book/loops/`), so search engines can read it without running JavaScript, and each page gets its own title and description.
- **Shared layout through a small Vite plugin** (`vite.config.js`) instead of a template engine. It injects `src/partials/head.html`, `header.html` and `footer.html`, marks the current menu item, and fills in the canonical URL and Open Graph tags from each page's title and description. No extra dependencies.
- **`sitemap.xml` is generated at build time** from the list of pages, so it can never miss a page. Pages marked `noindex` (only the 404) are left out.
- **`vercel.json` sets `trailingSlash: true`** so `/daily` redirects to `/daily/`, matching the canonical URLs.

## Daily problems

- **36 problems**: 12 Python, 12 data structures, 12 logic, interleaved so topics rotate. Every Python solution was run against its examples before shipping.
- **Rotation by local calendar date.** Days since 1 January 2026 in the visitor's time zone, modulo the number of problems. Everyone in the same time zone sees the same problem, and it changes at their midnight. After 36 days the cycle repeats. Adding problems at the end changes the cycle length, which reshuffles which problem older dates show. That is acceptable for a two-week archive.
- **The problem is chosen in JavaScript**, because a static build cannot know the visitor's date. Pages show a `<noscript>` message without JS. Everything else on the site works without JS.
- **Hidden solutions use `<details>`**, so they are accessible to keyboard and screen-reader users. They are hidden, not secret: a determined visitor can read them in the page source, which is fine for practice problems.
- **Streak rules**: pressing "I solved it" on consecutive days adds to the streak; missing a day resets it to 0. Stored in `localStorage` under `mycsmajor:streak:v1` with current streak, best streak, total and up to 400 solved dates. One-level **undo** is included for accidental clicks. Corrupt or blocked storage falls back safely.
- **Only today's problem counts** towards the streak. The archive shows the past 14 days for practice and marks which ones you solved.

## Content

- **Cyber Brief covers real, documented incidents** (Log4Shell, xz, Heartbleed and others) with links to their official NVD records, instead of "latest news". Without a news API or an editor, a news feed would be invented or quickly stale. Each brief ends with a coding lesson for students. See TODO.md about adding current news.
- **Gear Guides name product lines, not exact models or prices** (for example "Sony WH-1000X series"), because models and prices change often. Buy buttons go to each maker's site for now. Every one is marked `data-affiliate="TODO"` with an HTML comment, so `grep -rn 'data-affiliate="TODO"'` finds them all. They use `rel="nofollow noopener"`; add `sponsored` when you switch to real affiliate URLs. An affiliate disclosure is on the page and in the footer.
- **Python Book has six chapters**, each at its own URL with three exercises and hidden answers. Outputs shown in the chapters were checked by running them.
- **The About page describes the site, not a person.** I did not invent a founder bio. Add one if you want (see TODO.md).
- **Contact uses a mailto form** because the site has no backend. It needs no third-party service and sends no data anywhere until the visitor presses send in their own email app. The address `hello@mycsmajor.com` is a placeholder until you set up that mailbox.
- **No emoji anywhere**, per the brief.

## Design

- **One font: Inter** (variable), self-hosted through `@fontsource-variable/inter`, so no request goes to Google Fonts. That is better for privacy and means there are no third parties to disclose.
- **Code uses the same font.** The brief asked for one font, so code blocks use Inter too, with its disambiguation and tabular-figure features on and ligatures off, so `->` does not turn into an arrow. Python indentation still lines up because every line starts with the same spaces. To switch code to a monospace font, change `font-family` in the `code, pre, kbd` rule in `src/styles.css`.
- **Colours**: off-white `#faf9f6` background, near-black `#111` text, one blue accent `#1d4ed8` (6.4:1 contrast on the background, passes WCAG AA). A muted grey is used only for secondary text.
- **No shadows at all**; 1px borders separate surfaces.
- **No sideways scrolling**: code blocks wrap long lines instead of scrolling (`white-space: pre-wrap`), grids collapse to one column on phones, and `overflow-x: clip` on the body is a safety net. The check script verifies this at 320px and 360px on every page with all `<details>` opened.
- **Mobile menu**: on narrow screens the nav collapses behind a Menu button. A tiny inline script adds a `js` class before first paint, so the menu does not flash open, and without JavaScript the full menu simply stays visible.

## Privacy and SEO

- **No analytics and no cookies.** The privacy policy says so and promises an update before that changes. If you add analytics, update `privacy/index.html` first.
- **The privacy page is indexable** and listed in the sitemap. Only the 404 page is `noindex`.
- **Titles are at most about 65 characters and descriptions 105 to 170 characters**, each unique per page (checked with a script during the build).

## Tooling

- **Vite 8** (latest at build time) with no other build dependencies. `playwright-core` is a dev dependency for the check script; it drives the Edge or Chrome already installed rather than downloading a browser.
- **Git**: its own repository in this folder, LF line endings via `.gitattributes`, one commit per finished page.
