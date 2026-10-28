// Every template in the shop, its price, and where its checkout lives.
//
// Like src/data/books.js, this is the ONLY file to edit when a payment link is
// ready: paste the product's checkout URL into `checkoutUrl` and the shop shows
// a real Buy button instead of a "not on sale yet" note.
//
// The product files themselves are NOT in this repo (it is public). They live
// in the project's shared folder and get uploaded to the checkout provider.
//
// Fields:
//   slug        id, also the anchor on /templates/ (/templates/#slug)
//   name        product name
//   tagline     one line under the name
//   summary     what it is, for the card and listing
//   price       suggested price in Canadian dollars. Confirm before launch.
//   format      what file types the buyer gets
//   includes    the main contents, as a short list
//   image       preview image under public/shop/
//   meme        the meme shown with it, under public/memes/
//   checkoutUrl '' until the payment account exists. See TODO.md.

export const CURRENCY = 'CAD';

export const TEMPLATE_BUNDLE = {
  name: 'Full Send Bundle',
  price: 19,
  summary: 'All four templates in one download: the planner, the grade tracker, the exam kit and the résumé kit.',
  image: '/shop/bundle.webp',
  checkoutUrl: '', // TODO(payments): bundle checkout URL
};

export const templates = [
  {
    slug: 'lock-in-planner',
    name: 'Lock In',
    tagline: 'The first-year CS planner',
    summary:
      'A 34-page planner for your first year of computer science. Print it, or open it in GoodNotes, Notability or any PDF note app, where every tab is a link.',
    price: 9,
    format: 'PDF, US Letter, printable and tablet-friendly',
    includes: [
      '16 weekly pages with top three, due dates and a habit tracker',
      '6 course pages with the grade breakdown and course rules',
      'Assignment and lab tracker',
      'Grade calculator page with a worked example',
      'Bug log, for errors that keep coming back',
    ],
    image: '/shop/lock-in-planner.webp',
    meme: { src: '/memes/lock-in.webp', alt: 'Meme: Byte the duck in sunglasses after buying a new planner, then asleep three days later.' },
    checkoutUrl: '', // TODO(payments): checkout URL for Lock In
  },
  {
    slug: 'grade-glow-up',
    name: 'Grade Glow-Up',
    tagline: 'Study and grade tracker',
    summary:
      'A spreadsheet that works out your current average and exactly what you need on everything left, the moment you type in a mark. Works in Excel and Google Sheets, with a Notion import pack.',
    price: 7,
    format: 'Excel file (opens in Google Sheets), plus Notion CSV import pack',
    includes: [
      'Grade calculator for six courses, with a "what do I need" status line',
      'Study log with weekly hours against your goal',
      'Due-date list that turns red three days out',
      'Notion databases for courses, due dates, study log and bugs',
    ],
    image: '/shop/grade-glow-up.webp',
    meme: { src: '/memes/final-needed.webp', alt: 'Meme: the spreadsheet says you need 52 percent on the final, and Byte the duck is healed.' },
    checkoutUrl: '', // TODO(payments): checkout URL for Grade Glow-Up
  },
  {
    slug: 'exam-szn',
    name: 'Exam Szn',
    tagline: 'The 14-day exam prep kit',
    summary:
      'A countdown that turns "the exam is in two weeks" into one box a day, plus a scheduler that spaces every topic across the fourteen days and gives weak topics an extra review.',
    price: 6,
    format: 'PDF, US Letter, plus an Excel auto-scheduler',
    includes: [
      'Topic confidence tracker, rated on day 14, 7 and 2',
      'Fourteen daily countdown boxes',
      'Practice test log and mistake log',
      'Panic-to-plan page and night-before checklist',
      'Scheduler that writes your day-by-day plan',
    ],
    image: '/shop/exam-szn.webp',
    meme: { src: '/memes/exam-countdown.webp', alt: 'Meme: Byte the duck relaxed with the exam in 14 days, and on fire with the exam in 14 hours.' },
    checkoutUrl: '', // TODO(payments): checkout URL for Exam Szn
  },
  {
    slug: 'hire-me-pls',
    name: 'Hire Me Pls',
    tagline: 'The CS student résumé kit',
    summary:
      'A one-page, one-column résumé template and a cover letter template for Word or Google Docs, with a nine-page guide that shows how to write bullets about projects when you have "no experience".',
    price: 8,
    format: 'Word templates (open in Google Docs) and a PDF guide',
    includes: [
      'ATS-friendly résumé template with every field marked',
      'Four-paragraph cover letter template',
      'The bullet formula, with before and after examples',
      '16 bullet shapes for real project types and 60 action verbs',
      'LinkedIn headline formulas and a GitHub checklist',
    ],
    image: '/shop/hire-me-pls.webp',
    meme: { src: '/memes/resume-skills.webp', alt: 'Meme: a sad duck with "Skills: Microsoft Word" next to a cool duck with a real project bullet.' },
    checkoutUrl: '', // TODO(payments): checkout URL for Hire Me Pls
  },
];

// Memes for the gallery on the home page and the shop. All drawn for this site.
export const memes = [
  { src: '/memes/rubber-duck.webp', alt: 'Meme: explaining code to the duck line by line, then finding the bug on line 4. The duck is undefeated.' },
  { src: '/memes/indentation-error.webp', alt: 'Meme: you write one line of Python and Python answers IndentationError: unexpected indent.' },
  { src: '/memes/nobody-2am.webp', alt: 'Meme: Nobody. Me at 2am: colour-coding my study plan for the fourth time instead of studying.' },
  { src: '/memes/group-project.webp', alt: 'Meme: every group project. One duck on fire doing everything, the others doing slides, saying looks good, or gone since week 2.' },
  { src: '/memes/brain-study.webp', alt: 'Meme: expanding brain from rereading the slides up to letting the spreadsheet schedule spaced repetition.' },
  { src: '/memes/deadlines-nah-yes.webp', alt: 'Meme: no to keeping six deadlines in your head, yes to one tracker that remembers them.' },
];
