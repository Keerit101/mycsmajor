// Renders the book shelf, each book's chapter list and each buy box at build
// time from src/data/books.js, so every price and checkout link lives in one
// file. The layout plugin in vite.config.js replaces these comments:
//
//   <!--books-shelf-->      the grid of all books, on /books/
//   <!--books-bundle-->     the bundle offer, on /books/
//   <!--chapters:SLUG-->    one book's chapter list
//   <!--buy:SLUG-->         one book's buy box
//   <!--buy-strip:SLUG-->   the short "rest of this book" box at the end of a
//                           free sample chapter
//
// With no checkout URL set, every buy box says the book is not on sale yet
// instead of showing a dead button. Nothing has to change on these pages when
// the links are ready: only src/data/books.js does.

import { books, bookBySlug, bookPath, chapterPath, freeChapters, BUNDLE, CURRENCY } from '../data/books.js';

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const money = (amount) => `${CURRENCY} $${amount}`;

const counts = (book) => {
  const free = freeChapters(book).length;
  return { free, total: book.chapters.length, paid: book.chapters.length - free };
};

export function renderShelf() {
  return `<div class="grid grid-2 book-shelf">
          ${books
            .map((book) => {
              const { free, total } = counts(book);
              return `<article class="card book-card">
              <h2><a href="${bookPath(book)}">${esc(book.title)}</a></h2>
              <p class="book-course">${book.course ? esc(book.course) : 'Any first year'} &middot; ${total} chapters</p>
              <p>${esc(book.summary)}</p>
              <p class="book-price"><strong>${money(book.price)}</strong> <span class="muted">&middot; ${free} chapter${free === 1 ? '' : 's'} free to read</span></p>
              <a class="btn btn-ghost" href="${bookPath(book)}">About this book</a>
            </article>`;
            })
            .join('\n          ')}
        </div>`;
}

export function renderBundle() {
  const total = books.reduce((sum, b) => sum + b.price, 0);
  const saving = total - BUNDLE.price;
  const button = BUNDLE.checkoutUrl
    ? `<a class="btn" href="${esc(BUNDLE.checkoutUrl)}" rel="noopener">Buy the bundle, ${money(BUNDLE.price)}</a>`
    : `<p class="muted small">Not on sale yet. The checkout is being set up; the free chapters are available now.</p>`;
  return `<section class="card buy-box" aria-labelledby="bundle-title">
          <h2 id="bundle-title">${esc(BUNDLE.title)}</h2>
          <p>${esc(BUNDLE.summary)}</p>
          <p class="book-price"><strong>${money(BUNDLE.price)}</strong> <span class="muted">&middot; ${money(total)} bought separately, so you save ${money(saving)}</span></p>
          ${button}
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
  const button = book.checkoutUrl
    ? `<a class="btn" href="${esc(book.checkoutUrl)}" rel="noopener">Buy the book, ${money(book.price)}</a>
          <p class="muted small">Secure checkout, instant download, no account needed.</p>`
    : `<p class="muted small">Not on sale yet. The checkout is being set up. ${
        free ? `${free} chapter${free === 1 ? '' : 's'} ${free === 1 ? 'is' : 'are'} free to read right now.` : ''
      }</p>`;
  return `<section class="card buy-box" aria-labelledby="buy-title">
          <h2 id="buy-title">Get the book</h2>
          <p class="book-price"><strong>${money(book.price)}</strong></p>
          <ul class="checklist">
            <li>${esc(book.formats)}</li>
            <li>${total} chapters in total${paid ? `, including the ${paid} not published on the site` : ''}</li>
            <li>Free updates when the book is revised</li>
          </ul>
          ${button}
          ${book.note ? `<p class="muted small">${esc(book.note)}</p>` : ''}
        </section>`;
}

export function renderBuyStrip(slug) {
  const book = bookBySlug(slug);
  if (!book) return '';
  const { paid } = counts(book);
  const button = book.checkoutUrl
    ? `<a class="btn" href="${esc(book.checkoutUrl)}" rel="noopener">Buy the book, ${money(book.price)}</a>`
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
    .replace(/<!--chapters:([a-z-]+)-->/g, (_, slug) => renderChapters(slug))
    .replace(/<!--buy:([a-z-]+)-->/g, (_, slug) => renderBuyBox(slug))
    .replace(/<!--buy-strip:([a-z-]+)-->/g, (_, slug) => renderBuyStrip(slug));
}
