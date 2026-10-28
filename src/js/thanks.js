// Shows the buyer's download buttons after a Stripe Payment Link redirects to
// /thanks/?session_id=cs_... The order is checked by /api/order (see api/).

const box = document.querySelector('[data-order]');
const sessionId = new URLSearchParams(location.search).get('session_id') ?? '';

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function show(html) {
  box.innerHTML = html;
}

async function load() {
  if (!sessionId) {
    show('<p>No order found in this link. If you just paid, use the link from the payment page, or email <a href="mailto:hello@mycsmajor.com">hello@mycsmajor.com</a> with your receipt.</p>');
    return;
  }
  let data;
  try {
    const res = await fetch(`/api/order/?session_id=${encodeURIComponent(sessionId)}`, { cache: 'no-store' });
    data = await res.json();
    if (!res.ok) throw new Error(data.error);
  } catch (err) {
    show(`<p>${esc(err.message || 'Could not load your order.')}</p>`);
    return;
  }
  const until = new Date(data.expiresAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
  const rows = data.books
    .map((b) => {
      const href = `/api/download/?session_id=${encodeURIComponent(sessionId)}&book=${encodeURIComponent(b.slug)}`;
      const action =
        data.expired || b.remaining < 1
          ? '<button class="btn" type="button" disabled>Link used up</button>'
          : `<a class="btn" href="${href}">Download PDF</a>`;
      return `<li><strong>${esc(b.title)}</strong><br /><span class="muted small">${b.remaining} of ${data.max} downloads left</span><div class="btn-row">${action}</div></li>`;
    })
    .join('');
  show(`
    <h2>Your books</h2>
    <p class="muted small">Licensed to ${esc(data.email)}. ${
      data.expired ? 'These links have expired. Email us with your receipt for new ones.' : `Links work until ${until}.`
    }</p>
    <ul class="order-list">${rows}</ul>`);
}

load();
