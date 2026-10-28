// GET /api/download?session_id=cs_...&book=slug  ->  the PDF, stamped with
// the buyer's email on every page.
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { loadOrder, countDownload, bookFileUrl, sendError, HttpError } from './_orders.js';

export default async function handler(req, res) {
  try {
    const order = await loadOrder(String(req.query.session_id ?? ''));
    const slug = String(req.query.book ?? '');
    const book = order.books.find((b) => b.slug === slug);
    if (!book) throw new HttpError(404, 'That book is not part of this order.');
    if (order.expired) throw new HttpError(410, 'This download link has expired. Email hello@mycsmajor.com with your receipt for a new one.');
    if (book.remaining < 1) throw new HttpError(429, 'This book has reached its download limit. Email hello@mycsmajor.com with your receipt.');

    const file = await fetch(bookFileUrl(slug));
    if (!file.ok) throw new HttpError(502, 'The book file could not be loaded. Try again in a minute.');
    const pdf = await PDFDocument.load(await file.arrayBuffer());

    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const order8 = order.session.id.slice(-8);
    const stamp = `Licensed to ${order.email} (order ${order8}). Personal copy: do not share or upload.`;
    for (const page of pdf.getPages()) {
      const { width } = page.getSize();
      const size = 7;
      const textWidth = font.widthOfTextAtSize(stamp, size);
      page.drawText(stamp, {
        x: Math.max(12, (width - textWidth) / 2),
        y: 10,
        size,
        font,
        color: rgb(0.45, 0.45, 0.45),
      });
    }
    pdf.setSubject(`Licensed to ${order.email}, order ${order8}`);
    pdf.setKeywords(['mycsmajor', `order:${order8}`]);
    const bytes = await pdf.save();

    await countDownload(order, slug);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="mycsmajor-${slug}.pdf"`);
    res.setHeader('Cache-Control', 'private, no-store');
    res.status(200).send(Buffer.from(bytes));
  } catch (err) {
    sendError(res, err);
  }
}
