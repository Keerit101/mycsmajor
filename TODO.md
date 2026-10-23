# TODO: things that need you

## Before launch

- [ ] **Domain.** Register or confirm `mycsmajor.com`, then add it in Vercel under **Project > Settings > Domains** and set the DNS records Vercel gives you. If the final domain is different, change `SITE` in `vite.config.js` and the sitemap line in `public/robots.txt`.
- [ ] **Vercel account and project.** Push the repo to GitHub and import it in Vercel (steps in README.md).
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
- [ ] Some programs (Amazon's included) require specific disclosure wording. Check the disclosure on the gear page and in `src/partials/footer.html` against your program's rules.

## Optional

- [ ] **About page bio.** `about/index.html` describes the site but not who runs it. Add a short paragraph about yourself if you want a personal touch.
- [ ] **Search engines.** After launch, add the site to Google Search Console and Bing Webmaster Tools and submit `https://mycsmajor.com/sitemap.xml`.
- [ ] **Social preview image.** Pages have Open Graph titles and descriptions but no image. Add a 1200 by 630 PNG to `public/` and an `og:image` tag in `src/partials/head.html`.
- [ ] **Analytics.** None is installed. If you add one (Vercel Web Analytics is cookieless), update the privacy policy first.
- [ ] **Current security news.** Cyber Brief covers well-known past incidents. To add current news, either write new `<article class="brief">` entries yourself (newest at the top) or set up a news API. Most need an API key and a server or a scheduled build.
- [ ] **More problems.** There are 36, so the cycle repeats after 36 days. Append more to `src/data/problems.js` (append only).
- [ ] **Contact form service.** If you would rather receive form messages directly instead of through the visitor's email app, sign up for a form service such as Formspree and point the form at it.
