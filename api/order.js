// GET /api/order?session_id=cs_...  ->  what the buyer can download.
import { loadOrder, sendError, DOWNLOAD_DAYS, MAX_DOWNLOADS } from './_orders.js';

export default async function handler(req, res) {
  try {
    const order = await loadOrder(String(req.query.session_id ?? ''));
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      email: order.email,
      expired: order.expired,
      expiresAt: order.expiresAt,
      days: DOWNLOAD_DAYS,
      max: MAX_DOWNLOADS,
      books: order.books,
    });
  } catch (err) {
    sendError(res, err);
  }
}
