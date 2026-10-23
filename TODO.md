# TODO: things that need you

## Before launch

- [ ] **Domain.** Register or confirm `mycsmajor.com`, then add it in Vercel under **Project > Settings > Domains** and set the DNS records Vercel gives you. If the final domain is different, change `SITE` in `vite.config.js` and the sitemap line in `public/robots.txt`.
- [ ] **Vercel project.** The code is already on GitHub at <https://github.com/Keerit101/mycsmajor> (public, branch `main`). Sign in to Vercel with GitHub, choose **Add New > Project**, import `Keerit101/mycsmajor` and deploy; `vercel.json` already holds every setting. After that, every push to `main` deploys automatically.
- [ ] **After the first deploy**, open a few pages on your phone (`/`, `/daily/`, a problem page, `/gear/`) and a missing URL to see the 404 page. Then set the repo's website link: `"C:\Program Files\GitHub CLI\gh.exe" repo edit Keerit101/mycsmajor --homepage https://mycsmajor.com`.
- [ ] **Contact email.** Set up a mailbox or forwarding for `hello@mycsmajor.com`, for example with your registrar's email forwarding or Cloudflare Email Routing. If you use a different address, change it in:
  - `src/js/contact.js` (the `EMAIL` constant)
  - `contact/index.html`
  - `privacy/index.html`
- [ ] **Read the privacy policy** (`privacy/index.html`) and make sure it matches how you will run the site. Update the "Last updated" date if you change it.

## Affiliate links

- [ ] **Join affiliate programs** for the products you want to link, for example Amazon Associates or the brands' own programs. Most require a live site with some content first.
- [ ] **Replace the nine placeholder links** in `gear/index.html`. Find them with:

  ```sh
  grep -n 'data-affiliate="TODO"' gear/index.html
  ```

  For each one, swap the `href` for your affiliate URL, change `rel="nofollow noopener"` to `rel="sponsored nofollow noopener"`, and remove `data-affiliate="TODO"` and the `<!-- TODO: affiliate link -->` comment above it.
- [ ] **Check the picks are still current** and that you are happy recommending them. They are product lines (for example "Sony WH-1000X series"), not specific models or prices.
- [ ] Some programs (Amazon's included) require specific disclosure wording. Check the disclosure on the gear page, in `src/partials/footer.html` and on `/affiliate-disclosure/` against your program's rules. Amazon Associates, for example, requires the sentence "As an Amazon Associate I earn from qualifying purchases."
- [ ] **Read the affiliate disclosure page** (`affiliate-disclosure/index.html`). It makes promises on your behalf (commissions never decide recommendations, ads will be labelled and kept away from solutions). Edit anything you are not comfortable committing to, and update its "Last updated" date. Once real affiliate links are live, delete the sentence saying buy links still point to the makers' sites.

## Analytics (optional, privacy-friendly)

Vercel Web Analytics is cookieless and counts page views without tracking individuals. The snippet is already in `src/partials/head.html`, commented out.

- [ ] In Vercel, open the project, go to **Analytics** and click **Enable** (or run `npx vercel project web-analytics enable mycsmajor`). Check the current free allowance on the Hobby plan.
- [ ] Vercel shows a script path for your project. In `src/partials/head.html`, find the `ANALYTICS` comment, replace `UNIQUE-PATH` with that path, and delete the `<!-- ANALYTICS ...` line and the closing `-->` so the two `<script>` tags are live.
- [ ] **Update the privacy policy before deploying.** Replace the "Cookies and analytics" section of `privacy/index.html` with something like: "We use Vercel Web Analytics to count page views. It does not use cookies and does not track you across sites. It records the page you visited, the referring site, and your approximate country, browser and device type." Then update "Last updated".
- [ ] Commit, push, and check the Analytics tab after a day.

## Ads (later, for example Google AdSense)

Empty, hidden ad slots are already on the home page, every problem page, the problem index, every book chapter and the middle of Cyber Brief. Search for `AD SLOT` to find them. Nothing loads until you finish these steps:

- [ ] **Apply for AdSense** with the live site. Google usually wants a site with real content and some traffic, and reviews it before approving.
- [ ] **Consent banner first.** Google requires a Google-certified consent management platform (CMP) for visitors in the EEA, the UK and Switzerland. AdSense offers its own ("Privacy & messaging"). Set it up before turning ads on.
- [ ] **Update the privacy policy** (`privacy/index.html`): it currently promises no cookies, no trackers and no ads. AdSense uses cookies, so the policy must change *before* ads go live. The affiliate disclosure also says the policy will be updated first.
- [ ] **Turn the slots on** in `src/js/ads.js`: set `ADSENSE_CLIENT` to your publisher ID (`ca-pub-...`) and add an ad unit ID for each placement you want in `SLOT_IDS`. Placements without an ID stay hidden.
- [ ] **Add `public/ads.txt`** with the exact line AdSense shows you in its dashboard.
- [ ] Re-run `npm run build` and `npm run check` after enabling, and check the pages still feel fast on a phone.

## Optional

- [ ] **About page bio.** `about/index.html` describes the site but not who runs it. Add a short paragraph about yourself if you want a personal touch.
- [ ] **Search engines.** After launch, add the site to Google Search Console and Bing Webmaster Tools and submit `https://mycsmajor.com/sitemap.xml`.
- [ ] **Current security news.** Cyber Brief covers well-known past incidents. To add current news, either write new `<article class="brief">` entries yourself (newest at the top) or set up a news API. Most need an API key and a server or a scheduled build.
- [ ] **More problems.** There are 90, so the cycle repeats every 90 days. To add more, append to the end of a track in `src/data/tracks/` (keep the three tracks the same length so the rotation stays even), add a check for any Python solution in `tests/check_solutions.py`, and run `npm test`.
- [ ] **Per-problem share images** (optional). Every page currently shares one image (`public/og.png`). Separate images per problem would look better on social media but add about 3 MB of PNGs; `scripts/make-share-image.mjs` is the starting point.
- [ ] **Content-Security-Policy header** (optional hardening). Add one to `vercel.json` once you have decided on analytics and ads, since both need entries in it.
- [ ] **License.** The public repo has no license file, which means all rights are reserved: people can read the code but not reuse it. That suits a site whose content is the product. If you want others to reuse the code (not the content), add one, for example MIT for code only.
- [ ] **Contact form service.** If you would rather receive form messages directly instead of through the visitor's email app, sign up for a form service such as Formspree and point the form at it.
