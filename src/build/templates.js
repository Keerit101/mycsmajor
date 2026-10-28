// Renders the template shop and the meme gallery at build time from
// src/data/templates.js. The layout plugin in vite.config.js replaces:
//
//   <!--templates-shop-->     every template as a product card, on /templates/
//   <!--templates-bundle-->   the bundle offer, on /templates/
//   <!--templates-teaser-->   a compact row of the templates, on the home page
//   <!--memes:N-->            the first N memes as a gallery
//
// With no checkout URL set, a product shows a "not on sale yet" note instead
// of a dead button, so the shop is safe to deploy before payments exist.

import { templates, TEMPLATE_BUNDLE, memes, CURRENCY } from '../data/templates.js';

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const money = (amount) => `${CURRENCY} $${amount}`;

const buy = (url, label) =>
  url
    ? `<a class="btn btn-buy" href="${esc(url)}" rel="noopener">${esc(label)}</a>`
    : `<p class="not-on-sale">Not on sale yet. The checkout is being set up.</p>`;

export function renderShop() {
  return `<div class="shop-grid">
          ${templates
            .map(
              (t) => `<article class="card shop-card" id="${t.slug}">
            <img class="shop-img" src="${t.image}" alt="Preview of ${esc(t.name)}: ${esc(t.tagline)}" width="1200" height="900" loading="lazy" decoding="async">
            <div class="shop-body">
              <p class="shop-kicker">${esc(t.tagline)}</p>
              <h2>${esc(t.name)}</h2>
              <p>${esc(t.summary)}</p>
              <ul class="checklist">
                ${t.includes.map((i) => `<li>${esc(i)}</li>`).join('\n                ')}
              </ul>
              <p class="small muted">${esc(t.format)}</p>
              <div class="shop-buy"><span class="price-pill">${money(t.price)}</span>${buy(t.checkoutUrl, `Buy ${t.name}`)}</div>
            </div>
          </article>`,
            )
            .join('\n          ')}
        </div>`;
}

export function renderTemplateBundle() {
  const total = templates.reduce((sum, t) => sum + t.price, 0);
  return `<section class="card bundle-card" aria-labelledby="bundle-title">
          <img class="shop-img" src="${TEMPLATE_BUNDLE.image}" alt="Preview of the ${esc(TEMPLATE_BUNDLE.name)}: all four templates" width="1200" height="900" loading="lazy" decoding="async">
          <div class="shop-body">
            <p class="shop-kicker">Best value</p>
            <h2 id="bundle-title">${esc(TEMPLATE_BUNDLE.name)}</h2>
            <p>${esc(TEMPLATE_BUNDLE.summary)}</p>
            <p class="muted">${money(total)} bought separately, so you save ${money(total - TEMPLATE_BUNDLE.price)}.</p>
            <div class="shop-buy"><span class="price-pill">${money(TEMPLATE_BUNDLE.price)}</span>${buy(TEMPLATE_BUNDLE.checkoutUrl, 'Buy the bundle')}</div>
          </div>
        </section>`;
}

export function renderTeaser() {
  return `<div class="teaser-grid">
          ${templates
            .map(
              (t) => `<a class="card card-link teaser" href="/templates/#${t.slug}">
            <img src="${t.image}" alt="" width="1200" height="900" loading="lazy" decoding="async">
            <span class="teaser-name">${esc(t.name)}</span>
            <span class="teaser-meta">${esc(t.tagline)} &middot; ${money(t.price)}</span>
          </a>`,
            )
            .join('\n          ')}
        </div>`;
}

export function renderMemes(count) {
  return `<ul class="meme-grid">
          ${memes
            .slice(0, count)
            .map((m) => `<li><img src="${m.src}" alt="${esc(m.alt)}" width="800" height="800" loading="lazy" decoding="async"></li>`)
            .join('\n          ')}
        </ul>`;
}

export function renderTemplatePlaceholders(html) {
  return html
    .replace('<!--templates-shop-->', () => renderShop())
    .replace('<!--templates-bundle-->', () => renderTemplateBundle())
    .replace('<!--templates-teaser-->', () => renderTeaser())
    .replace(/<!--memes:(\d+)-->/g, (_, n) => renderMemes(Number(n)));
}
