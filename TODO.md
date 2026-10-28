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

## Selling the books with Stripe (do this first if you want income)

The site already has everything else: Buy buttons, a bundle, a tip jar, a
thank-you page at `/thanks/`, and private delivery in `api/` that checks the
payment with Stripe, prints the buyer's email on every page of the PDF, and
lets each buyer download each book at most 5 times within 14 days. **Nothing
can be bought until you finish the steps below.** All of them are in your own
Stripe and Vercel dashboards, and I cannot do them for you.

### 1. Turn on payments in Stripe (about 15 minutes)

- [ ] Receiving payouts (like the Handshake money) is not the same as being
      able to *accept* payments. In the Stripe Dashboard, finish **Activate
      payments**: business type (individual / sole proprietor is fine), your
      details, bank account for payouts, and a public business name such as
      `mycsmajor`. Stripe requires the account holder to be an adult (18+ in
      most places); if you are not yet, a parent or guardian must own the
      account.
- [ ] **Settings > Public details**: support email `hello@mycsmajor.com`,
      website `https://mycsmajor.com`, statement descriptor `MYCSMAJOR`.
- [ ] Do everything below in **Test mode** first, then repeat it in live mode.

### 2. Create the products and Payment Links (about 20 minutes)

For each row below: **Product catalogue > Add product**, set the name and a
one-off price in **CAD**, and under **Metadata** add key `book` with the value
shown (this is how the site knows what was bought). Then open the product,
choose **Create payment link**, and on the **After payment** tab pick **Don't
show confirmation page** and enter exactly:

    https://mycsmajor.com/thanks/?session_id={CHECKOUT_SESSION_ID}

| Product name | Price | Metadata `book` |
|---|---|---|
| Python for your first year | 12 | `python-book` |
| Java after Python | 12 | `java` |
| C and how memory really works | 12 | `c-and-memory` |
| Data structures and algorithms, by hand | 14 | `data-structures` |
| Discrete math and logic | 14 | `discrete-math` |
| Security basics for programmers | 14 | `security-basics` |
| Git, Linux and the terminal | 10 | `toolkit` |
| The whole shelf | 39 | `bundle` |

- [ ] **Tip jar:** one more Payment Link, product "Tip", with **Let customers
      choose what to pay** (suggested CAD 5). No redirect needed.
- [ ] Only list books whose PDF is finished. A book without a link keeps its
      "Checkout opens soon" button.

### 3. Let the site check orders and deliver files (10 minutes)

- [ ] **Stripe > Developers > API keys > Create restricted key**, named
      `mycsmajor delivery`, with: Checkout Sessions **Read**, Products **Read**,
      Prices **Read**, PaymentIntents **Write**. Everything else None.
- [ ] **Vercel > mycsmajor > Settings > Environment Variables**: add
      `STRIPE_SECRET_KEY` with that restricted key (Production only). Never put
      it in the code or send it in a chat.
- [ ] **Upload the PDFs privately.** Vercel > Storage > Create > **Blob**,
      connect it to the project, and upload each finished PDF. Each file gets a
      long random URL. Add one more environment variable, `BOOK_FILES`, holding
      them as JSON, for example:
      `{"python-book":"https://....blob.vercel-storage.com/python-book-Ab3x.pdf","java":"https://..."}`
      Those URLs are the only unstamped copies: never post them anywhere.
- [ ] Redeploy (Deployments > ... > Redeploy) so the variables take effect.

### 4. Send me the links

Send me each Payment Link URL (they look like `https://buy.stripe.com/...`)
and I will paste them into `src/data/books.js` (`checkoutUrl` per book,
`BUNDLE.checkoutUrl`, `SUPPORT.url` for the tip) and deploy. Or paste them
yourself; find the spots with `grep -n "TODO(payments)" src/data/books.js`.

### 5. Test, then go live

- [ ] In Test mode, buy a book with card `4242 4242 4242 4242`. You should land
      on `/thanks/`, see the book, download a PDF with your email in the footer,
      and see "4 of 5 downloads left" after a refresh.
- [ ] Switch to live mode, create the live links and a live restricted key,
      replace the test ones, and redeploy.

### Tax (read once)

Stripe is a payment processor, not a merchant of record, so sales tax is your
responsibility. In Canada you do not need to register for GST/HST until your
sales pass CAD 30,000 in four consecutive quarters (the small supplier rule).
Selling digital products to buyers in the EU or UK can create VAT duties from
the first sale; **Stripe Tax** (Settings > Tax, small fee per transaction) can
calculate and collect it, or you can ask an accountant. Keep every Stripe
receipt and payout report: income from sales is taxable.

### Sales are final, and sharing

The site and `/terms/` say all sales are final except broken files, double
charges, and anything consumer law requires. If a buyer disputes a charge,
answer it in Stripe with the receipt and the download record. Stamping and
download limits discourage sharing, but nothing can fully stop someone who
is determined to copy a PDF; the stamp means a leaked copy points back to the
buyer, and `/terms/` lets you cancel that licence.

### Before the first sale

- [ ] **Keep the full books out of this public repo.** Upload only finished
      PDFs to Blob.
- [ ] **Read `/terms/`, `/privacy/` and `/books/`.** They are drafts written
      for Ontario, Canada with GDPR basics. Have a lawyer or your school's legal
      clinic check them before you rely on them, and add your legal name if you
      want it shown.

## Cyber Brief daily updates

The "Exploited this month" section of `/cyber-brief/` updates itself. There is
nothing to do unless it stops working.

- A GitHub Action (`.github/workflows/update-cyber-brief.yml`) runs at 22:30 UTC
  daily, downloads CISA's Known Exploited Vulnerabilities catalog, and commits
  `src/data/kev-latest.json` when CISA has published a new version. Vercel then
  deploys the new page. Days with no new entries produce no commit.
- [ ] **Check it ran** after a day or two: the Actions tab of the repo, and the
      "Last CISA update" line at the top of the section.
- [ ] If Actions are disabled on the repo, enable them in **Settings > Actions >
      General**, and make sure workflows have read and write permission.
- To run it by hand: the Actions tab, "Update Cyber Brief", "Run workflow". Or
  locally, `node scripts/update-cyber-brief.mjs`.
- The lessons attached to each entry are written per weakness type in
  `src/build/cyber-brief.js`. Everything else is CISA's own wording, so the
  section cannot invent an incident.

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
- [ ] The site sends a strict Content-Security-Policy (`vercel.json`). Vercel's analytics script is served from your own domain, so it should work as is; check the browser console after enabling.
- [ ] Commit, push, and check the Analytics tab after a day.

## Ads (later, for example Google AdSense)

Empty, hidden ad slots are already on the home page, every problem page, the problem index, every book chapter and the middle of Cyber Brief. Search for `AD SLOT` to find them. Nothing loads until you finish these steps:

- [ ] **Apply for AdSense** with the live site. Google usually wants a site with real content and some traffic, and reviews it before approving.
- [ ] **Consent banner first.** Google requires a Google-certified consent management platform (CMP) for visitors in the EEA, the UK and Switzerland. AdSense offers its own ("Privacy & messaging"). Set it up before turning ads on.
- [ ] **Update the privacy policy** (`privacy/index.html`): it currently promises no cookies, no trackers and no ads. AdSense uses cookies, so the policy must change *before* ads go live. The affiliate disclosure also says the policy will be updated first.
- [ ] **Turn the slots on** in `src/js/ads.js`: set `ADSENSE_CLIENT` to your publisher ID (`ca-pub-...`) and add an ad unit ID for each placement you want in `SLOT_IDS`. Placements without an ID stay hidden.
- [ ] **Add `public/ads.txt`** with the exact line AdSense shows you in its dashboard.
- [ ] **Loosen the Content-Security-Policy** in `vercel.json` for the Google domains AdSense needs, or every ad will be blocked.
- [ ] Re-run `npm run build` and `npm run check` after enabling, and check the pages still feel fast on a phone.

## Optional

- [ ] **About page bio.** `about/index.html` describes the site but not who runs it. Add a short paragraph about yourself if you want a personal touch.
- [ ] **Search engines.** After launch, add the site to Google Search Console and Bing Webmaster Tools and submit `https://mycsmajor.com/sitemap.xml`.
- [ ] **More problems.** There are 90, so the cycle repeats every 90 days. To add more, append to the end of a track in `src/data/tracks/` (keep the three tracks the same length so the rotation stays even), add a check for any Python solution in `tests/check_solutions.py`, and run `npm test`.
- [ ] **Per-problem share images** (optional). Every page currently shares one image (`public/og.png`). Separate images per problem would look better on social media but add about 3 MB of PNGs; `scripts/make-share-image.mjs` is the starting point.
- [ ] **License.** The public repo has no license file, which means all rights are reserved: people can read the code but not reuse it. That suits a site whose content is the product. If you want others to reuse the code (not the content), add one, for example MIT for code only.
- [ ] **Contact form service.** If you would rather receive form messages directly instead of through the visitor's email app, sign up for a form service such as Formspree and point the form at it.
