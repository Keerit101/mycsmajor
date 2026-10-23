# mycsmajor.com

A static site for computer science students: one CS problem a day with a streak counter, security briefs, gear guides and a free beginner Python book.

Built with Vite, vanilla JavaScript and plain CSS. There is no backend, database or framework.

## Run it locally

You need [Node.js](https://nodejs.org/) 20.19+ or 22.12+ (it was built with Node 24).

```sh
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). Pages reload as you edit.

## Build

```sh
npm run build     # outputs the static site to dist/
npm run preview   # serves dist/ at http://localhost:4173
```

## Check the pages

With `npm run preview` running in another terminal:

```sh
npm run check
```

This opens every built page in headless Edge or Chrome at 320px, 360px and 1366px wide. It fails if a page scrolls sideways, logs a console error or has a broken request. To save screenshots, pass a base URL and an output folder:

```sh
node scripts/check-pages.mjs http://localhost:4173 ./screenshots
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, choose **Add New > Project** and import the repo. It reads `vercel.json`, so the defaults are already right: build command `npm run build`, output directory `dist`.
3. Deploy. Every push to `main` then deploys automatically.
4. In **Project > Settings > Domains**, add `mycsmajor.com` (and `www.mycsmajor.com` redirecting to it), then set the DNS records Vercel shows you at your domain registrar.

Or from the command line: `npx vercel` for a preview deploy and `npx vercel --prod` for production.

## Project layout

```
index.html                 Home
daily/index.html           Daily Problem
cyber-brief/index.html     Cyber Brief
gear/index.html            Gear Guides
python-book/               Python Book index and one folder per chapter
about/ contact/ privacy/   Other pages
404.html                   Not found page

src/partials/              Shared <head>, header and footer, injected at build time
src/styles.css             All styles
src/data/problems.js       The daily problems and the date rotation
src/js/                    Page scripts (home, daily, contact) and shared modules
public/                    Copied as-is: robots.txt, favicon
scripts/check-pages.mjs    Layout and error check
vite.config.js             Page discovery, layout injection, sitemap generation
```

## Common edits

**Add a page.** Create `some-page/index.html` with the same structure as `about/index.html`: put `<!--head-->` first in `<head>`, then a unique `<title>` and `<meta name="description">`, and use `<!--header-->` and `<!--footer-->` in the body. The build picks it up automatically and adds it to `sitemap.xml`. To add it to the main menu, add it to `NAV` in `vite.config.js`.

**Add daily problems.** Append objects to the `problems` array in `src/data/problems.js`. Append only: inserting in the middle changes which problem past dates showed. The fields are explained at the top of that file.

**Hide a page from search engines.** Add `<meta name="robots" content="noindex" />` to its `<head>`. It is then left out of the sitemap and gets no canonical link.

**Change the accent colour or font.** Edit the variables at the top of `src/styles.css`.

**Turn on analytics.** Vercel Web Analytics (cookieless) is ready but commented out in `src/partials/head.html`. Enable it in the Vercel dashboard, paste the script path it gives you over `UNIQUE-PATH`, uncomment the two script tags and update the privacy policy. Step by step in `TODO.md`.

**Turn on ads.** Hidden ad slots are already placed (search for `AD SLOT`). `src/js/ads.js` is the single switch; it does nothing until you set an AdSense publisher ID. Read the ads section of `TODO.md` first: the privacy policy and a consent banner must come before ads.

See `DECISIONS.md` for why things are built this way, and `TODO.md` for what still needs you.
