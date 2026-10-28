// Renders the book shelf, each book's chapter list, each buy box and the tip
// jar at build time from src/data/books.js, so every price and checkout link
// lives in one file. The layout plugin in vite.config.js replaces these
// comments:
//
//   <!--books-shelf-->      the grid of all books, on /books/ and /support/
//   <!--books-bundle-->     the bundle offer, on /books/, /support/ and home
//   <!--chapters:SLUG-->    one book's chapter list
//   <!--buy:SLUG-->         one book's buy box
//   <!--buy-strip:SLUG-->   the short "rest of this book" box at the end of a
//                           free sample chapter
//   <!--support-tip-->      the tip jar box
//
// With no checkout URL set, every buy button shows as a greyed-out "Checkout
// opens soon" button instead of a dead link. Nothing has to change on these
// pages when the links are ready: only src/data/books.js does.

import { books, bookBySlug, bookPath, chapterPath, freeChapters, BUNDLE, CURRENCY, SUPPORT } from '../data/books.js';

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const money = (amount) => `${CURRENCY} $${amount}`;

const counts = (book) => {
  const free = freeChapters(book).length;
  return { free, total: book.chapters.length, paid: book.chapters.length - free };
};

// A real checkout link when one is set, otherwise a disabled button that says
// so. `extra` adds classes such as btn-lg.
function buyButton(url, label, extra = '') {
  const cls = `btn${extra ? ' ' + extra : ''}`;
  return url
    ? `<a class="${cls}" href="${esc(url)}" rel="noopener">${label}</a>`
    : `<button class="${cls}" type="button" disabled>Checkout opens soon</button>`;
}

function cover(book, { link = false } = {}) {
  const { emoji = '📘', hue = 260 } = book.cover ?? {};
  const inner = `<span class="book-cover-title">${esc(book.title)}</span>
                <span class="book-cover-emoji" aria-hidden="true">${emoji}</span>`;
  return link
    ? `<a class="book-cover" href="${bookPath(book)}" style="--hue: ${hue}" tabindex="-1" aria-hidden="true">
                ${inner}
              </a>`
    : `<div class="book-cover" style="--hue: ${hue}" aria-hidden="true">
                ${inner}
              </div>`;
}

export function renderShelf() {
  return `<div class="grid grid-2 book-shelf" id="shelf">
          ${books
            .map((book) => {
              const { free, total } = counts(book);
              return `<article class="card book-card">
              ${cover(book)}
              <p class="book-course">${book.course ? esc(book.course) : 'Any first year'} &middot; ${total} chapters</p>
              <h2><a href="${bookPath(book)}">${esc(book.title)}</a></h2>
              <p>${esc(book.summary)}</p>
              <p class="book-price"><span class="price-tag">${money(book.price)}</span> <span class="muted">${free} chapter${free === 1 ? '' : 's'} free to read</span></p>
              <div class="book-actions">
                ${buyButton(book.checkoutUrl, `Buy, ${money(book.price)}`)}
                <a class="btn btn-ghost" href="${bookPath(book)}">Read free chapters</a>
              </div>
            </article>`;
            })
            .join('\n          ')}
        </div>`;
}

export function renderBundle() {
  const total = books.reduce((sum, b) => sum + b.price, 0);
  const saving = total - BUNDLE.price;
  return `<section class="card buy-box bundle" aria-labelledby="bundle-title">
          <div>
            <p class="sticker sticker-pink">Save ${money(saving)}</p>
            <h2 id="bundle-title">${esc(BUNDLE.title)}</h2>
            <p>${esc(BUNDLE.summary)} ${books.length} books, cheaper than one used textbook.</p>
            <p class="book-price"><span class="price-tag"><s>$${total}</s>${money(BUNDLE.price)}</span></p>
          </div>
          <div class="bundle-side">
            <p class="bundle-covers" aria-hidden="true">${books.map((b) => b.cover?.emoji ?? '📘').join(' ')}</p>
            ${buyButton(BUNDLE.checkoutUrl, `Get all ${books.length} books, ${money(BUNDLE.price)}`, 'btn-lg')}
            <p class="buy-note">PDF and EPUB &middot; instant download &middot; 30-day refund</p>
          </div>
        </section>`;
}

export function renderTip() {
  const button = SUPPORT.url
    ? `<a class="btn btn-pink btn-lg" href="${esc(SUPPORT.url)}" rel="noopener">${esc(SUPPORT.label)} &#9749;</a>`
    : `<button class="btn btn-lg" type="button" disabled>Tip jar opens soon</button>`;
  return `<section class="card tip-box" aria-labelledby="tip-title">
          <div>
            <h2 id="tip-title">Not buying a book? Tip the dev &#9749;</h2>
            <p class="muted">Every problem, solution and free chapter here stays free. A tip of any size keeps it that way and fuels the next chapter.</p>
          </div>
          <div>
            ${button}
          </div>
        </section>`;
}

export function renderChapters(slug) {
  const book = bookBySlug(slug);
  if (!book) return '';
  return `<ol class="chapter-list">
          ${book.chapters
            .map((chapter) => {
              const path = chapterPath(book, chapter);
              const label = chapter.free
                ? '<span class="chapter-tag">Free to read</span>'
                : '<span class="chapter-tag chapter-tag-paid">In the book</span>';
              const inner = `<span class="chapter-title">${esc(chapter.title)}</span>
              <span class="chapter-desc">${esc(chapter.desc)}</span>
              ${label}`;
              return `<li>${
                chapter.free && path
                  ? `<a href="${path}">\n              ${inner}\n            </a>`
                  : `<div class="chapter-locked">\n              ${inner}\n            </div>`
              }</li>`;
            })
            .join('\n          ')}
        </ol>`;
}

export function renderBuyBox(slug) {
  const book = bookBySlug(slug);
  if (!book) return '';
  const { free, paid, total } = counts(book);
  const status = book.checkoutUrl
    ? 'Secure checkout, instant download, no account needed. 30-day refund.'
    : `The checkout is being set up. ${
        free ? `${free} chapter${free === 1 ? '' : 's'} ${free === 1 ? 'is' : 'are'} free to read right now.` : ''
      }`;
  return `<section class="card buy-box" aria-labelledby="buy-title">
          <h2 id="buy-title">Get the book</h2>
          <p class="book-price"><span class="price-tag">${money(book.price)}</span> <span class="muted">or every book for ${money(BUNDLE.price)}</span></p>
          <ul class="checklist">
            <li>${esc(book.formats)}</li>
            <li>${total} chapters in total${paid ? `, including the ${paid} not published on the site` : ''}</li>
            <li>Free updates when the book is revised</li>
          </ul>
          <div class="btn-row">
            ${buyButton(book.checkoutUrl, `Buy the book, ${money(book.price)}`, 'btn-lg')}
            <a class="btn btn-ghost btn-lg" href="/books/#bundle-title">See the bundle</a>
          </div>
          <p class="buy-note">${status}</p>
          ${book.note ? `<p class="buy-note">${esc(book.note)}</p>` : ''}
        </section>`;
}

export function renderBuyStrip(slug) {
  const book = bookBySlug(slug);
  if (!book) return '';
  const { paid } = counts(book);
  const button = book.checkoutUrl
    ? buyButton(book.checkoutUrl, `Buy the book, ${money(book.price)}`)
    : `<a class="btn btn-ghost" href="${bookPath(book)}">See the full chapter list</a>`;
  return `<section class="card buy-box buy-strip" aria-label="About this book">
          <p><strong>This is a free sample chapter of ${esc(book.title)}.</strong> ${
            paid ? `The other ${paid} chapters come with the book` : 'The full book'
          }: ${esc(book.formats.toLowerCase())}. ${book.checkoutUrl ? money(book.price) + '.' : ''}</p>
          ${button}
        </section>`;
}

// Replaces every books comment in a page of HTML.
export function renderBookPlaceholders(html) {
  return html
    .replace('<!--books-shelf-->', () => renderShelf())
    .replace('<!--books-bundle-->', () => renderBundle())
    .replace('<!--support-tip-->', () => renderTip())
    .replace(/<!--chapters:([a-z-]+)-->/g, (_, slug) => renderChapters(slug))
    .replace(/<!--buy:([a-z-]+)-->/g, (_, slug) => renderBuyBox(slug))
    .replace(/<!--buy-strip:([a-z-]+)-->/g, (_, slug) => renderBuyStrip(slug));
}
