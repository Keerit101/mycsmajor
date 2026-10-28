// Shared helpers for the two delivery functions (api/order.js and
// api/download.js). Files starting with "_" are not routes on Vercel.
//
// How delivery works, with no database:
//   1. A Stripe Payment Link redirects the buyer to
//      /thanks/?session_id={CHECKOUT_SESSION_ID}
//   2. /api/order asks Stripe whether that Checkout Session is paid and which
//      books it bought (from each Stripe product's `book` metadata, or its name).
//   3. /api/download fetches the private PDF, prints the buyer's email on every
//      page, and counts the download in the PaymentIntent's metadata.
// Links stop working DOWNLOAD_DAYS after purchase or after MAX_DOWNLOADS per book.
//
// Environment variables (Vercel > Project > Settings > Environment Variables):
//   STRIPE_SECRET_KEY  a restricted key with read access to Checkout Sessions
//                      and Products, and write access to PaymentIntents
//   BOOK_FILES         JSON mapping book slug to the private URL of its PDF,
//                      for example {"python-book": "https://...pdf"}

import { books, BUNDLE } from '../src/data/books.js';

export const DOWNLOAD_DAYS = 14;
export const MAX_DOWNLOADS = 5;

const SESSION_RE = /^cs_(test|live)_[A-Za-z0-9]{10,200}$/;

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function stripe(path, { method = 'GET', body } = {}) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new HttpError(503, 'Downloads are not set up yet. Email hello@mycsmajor.com with your receipt.');
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
    },
    body: body ? new URLSearchParams(body).toString() : undefined,
  });
  if (res.status === 404) throw new HttpError(404, 'We could not find that order.');
  if (!res.ok) throw new HttpError(502, 'The payment provider did not answer. Try again in a minute.');
  return res.json();
}

const normal = (s = '') => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

// Which book slugs a Stripe product stands for. A product's `book` metadata
// wins ("bundle" means every book); otherwise its name is matched to a title.
function slugsForProduct(product) {
  const tag = product?.metadata?.book;
  if (tag === 'bundle' || normal(product?.name) === normal(BUNDLE.title)) return books.map((b) => b.slug);
  if (tag && books.some((b) => b.slug === tag)) return [tag];
  const match = books.find((b) => normal(b.title) === normal(product?.name));
  return match ? [match.slug] : [];
}

// Loads a paid Checkout Session and everything delivery needs from it.
export async function loadOrder(sessionId) {
  if (!SESSION_RE.test(sessionId ?? '')) throw new HttpError(400, 'That download link is not valid.');
  const session = await stripe(
    `checkout/sessions/${sessionId}?expand[]=line_items.data.price.product&expand[]=payment_intent`,
  );
  if (session.payment_status !== 'paid') throw new HttpError(402, 'This order has not been paid yet.');

  const slugs = new Set();
  for (const item of session.line_items?.data ?? []) {
    for (const slug of slugsForProduct(item.price?.product)) slugs.add(slug);
  }
  if (!slugs.size) throw new HttpError(404, 'This order has no books in it. Email hello@mycsmajor.com with your receipt.');

  const expiresAt = (session.created + DOWNLOAD_DAYS * 86400) * 1000;
  const pi = session.payment_intent;
  const counts = pi?.metadata ?? {};
  return {
    session,
    email: session.customer_details?.email ?? '',
    paymentIntentId: typeof pi === 'string' ? pi : pi?.id,
    expired: Date.now() > expiresAt,
    expiresAt,
    books: books
      .filter((b) => slugs.has(b.slug))
      .map((b) => ({
        slug: b.slug,
        title: b.title,
        remaining: Math.max(0, MAX_DOWNLOADS - Number(counts[`dl_${b.slug}`] ?? 0)),
      })),
  };
}

export async function countDownload(order, slug) {
  if (!order.paymentIntentId) return;
  const used = MAX_DOWNLOADS - order.books.find((b) => b.slug === slug).remaining;
  await stripe(`payment_intents/${order.paymentIntentId}`, {
    method: 'POST',
    body: { [`metadata[dl_${slug}]`]: String(used + 1) },
  });
}

export function bookFileUrl(slug) {
  let files = {};
  try {
    files = JSON.parse(process.env.BOOK_FILES ?? '{}');
  } catch {
    throw new HttpError(503, 'Downloads are not set up yet. Email hello@mycsmajor.com with your receipt.');
  }
  const url = files[slug];
  if (!url) throw new HttpError(503, 'This book file is not uploaded yet. Email hello@mycsmajor.com with your receipt.');
  return url;
}

export function sendError(res, err) {
  const status = err instanceof HttpError ? err.status : 500;
  if (status === 500) console.error(err);
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).json({ error: status === 500 ? 'Something went wrong. Email hello@mycsmajor.com with your receipt.' : err.message });
}
