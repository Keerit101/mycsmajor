// Renders src/data/kev-latest.json into the "Exploited this month" section of
// /cyber-brief/ at build time, so the page is plain HTML that search engines
// can read. Called from the layout plugin in vite.config.js.
//
// The facts (names, descriptions, dates) come from CISA's feed unchanged. The
// only text written here is the lesson for each weakness type (CWE), which
// explains the general kind of bug, not the specific incident.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DATA = join(import.meta.dirname, '..', 'data', 'kev-latest.json');

// One lesson per weakness family. Several CWE numbers share a lesson.
const LESSONS = [
  [['CWE-89'], 'SQL injection: never build a query by gluing strings together. Use parameterised queries, so user input is always treated as data, never as SQL.'],
  [['CWE-78', 'CWE-77', 'CWE-88'], 'Command injection: avoid passing user input to a shell. Call programs with a list of arguments (in Python, <code>subprocess.run([...])</code> without <code>shell=True</code>) and allow only values you expect.'],
  [['CWE-94', 'CWE-95', 'CWE-917', 'CWE-1336'], 'Code injection: never feed untrusted input to anything that evaluates code, such as <code>eval</code>, template engines or expression languages.'],
  [['CWE-22', 'CWE-23', 'CWE-24', 'CWE-35', 'CWE-36', 'CWE-73', 'CWE-158', 'CWE-177', 'CWE-552', 'CWE-59', 'CWE-98'], 'Path traversal: a file name from a user can contain <code>../</code> or encoded tricks. Resolve the full path, then check it is still inside the folder you meant before opening it.'],
  [['CWE-918'], 'Server-side request forgery: if your server fetches a URL a user supplies, an attacker can point it at internal services. Allow-list the hosts it may contact.'],
  [['CWE-287', 'CWE-288', 'CWE-290', 'CWE-294', 'CWE-306', 'CWE-1390'], 'Broken authentication: every route that does something sensitive must check who is asking. Do not rely on a header, IP address or hidden path to prove identity.'],
  [['CWE-284', 'CWE-285', 'CWE-862', 'CWE-863', 'CWE-639', 'CWE-269', 'CWE-266', 'CWE-250'], 'Broken access control: logging in is not the same as being allowed. Check permissions on the server for every action, and give each part of a system only the rights it needs.'],
  [['CWE-502'], 'Unsafe deserialization: turning untrusted bytes back into objects (for example with Python\'s <code>pickle</code>) can run code. Use a data-only format such as JSON for anything that crosses a trust boundary.'],
  [['CWE-119', 'CWE-120', 'CWE-121', 'CWE-122', 'CWE-125', 'CWE-787', 'CWE-788'], 'Memory safety: in C and C++, reading or writing past the end of a buffer corrupts memory. Check every length and index, or use a memory-safe language.'],
  [['CWE-416', 'CWE-415', 'CWE-825'], 'Use after free: memory used after it has been freed can be taken over by an attacker. Set pointers to <code>NULL</code> after freeing and keep ownership of each allocation clear.'],
  [['CWE-190', 'CWE-191', 'CWE-680'], 'Integer overflow: a number that wraps around can turn a size check into a tiny allocation. Check arithmetic on sizes before you use the result.'],
  [['CWE-843'], 'Type confusion: code that treats a value as the wrong type can read or write memory it should not. Validate types before casting.'],
  [['CWE-434'], 'Unrestricted file upload: an uploaded file can be a script the server later runs. Check type and size, rename files, and store uploads outside any folder the server executes.'],
  [['CWE-79', 'CWE-80', 'CWE-84'], 'Cross-site scripting: user input placed in a web page can run as JavaScript in other people\'s browsers. Escape output for the place it goes, or use a framework that does it for you.'],
  [['CWE-352'], 'Cross-site request forgery: a browser sends cookies with requests from any site. Require a token or a same-site cookie for actions that change data.'],
  [['CWE-384', 'CWE-613'], 'Session handling: issue a new session ID when someone logs in, and make sessions expire, so a stolen or planted ID stops working.'],
  [['CWE-798', 'CWE-259', 'CWE-321', 'CWE-312', 'CWE-319', 'CWE-200', 'CWE-532'], 'Exposed secrets: passwords, keys and personal data stored or logged in plain text end up in the wrong hands. Keep secrets out of code and logs, and encrypt sensitive data.'],
  [['CWE-427', 'CWE-426', 'CWE-428'], 'Search path hijacking: if a program loads a file by name from a folder an attacker can write to, the attacker\'s file runs instead. Load libraries and programs by full path.'],
  [['CWE-347', 'CWE-345', 'CWE-494', 'CWE-1220'], 'Missing integrity checks: software that accepts updates or data without verifying a signature will accept an attacker\'s version too.'],
  [['CWE-506', 'CWE-912'], 'Malicious code: this weakness means code was added on purpose. Pin your dependencies, review updates, and watch for unexpected changes in packages you install.'],
  [['CWE-20', 'CWE-1287', 'CWE-1284', 'CWE-19', 'CWE-841', 'CWE-693', 'CWE-670'], 'Input validation: decide exactly what valid input looks like and reject everything else, on the server, before any other code touches it.'],
];

const lessonFor = new Map(LESSONS.flatMap(([cwes, text]) => cwes.map((c) => [c, text])));
const GENERAL =
  'When a vendor ships a fix for an actively exploited bug, updating quickly matters more than anything else. Know what software you run, and keep it up to date.';

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const formatDay = (iso) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'link';
  }
}

function renderItem(v) {
  const cwe = v.cwes.find((c) => lessonFor.has(c));
  const lesson = cwe ? lessonFor.get(cwe) : GENERAL;
  const cweLinks = v.cwes
    .filter((c) => /^CWE-\d+$/.test(c))
    .map((c) => `<a href="https://cwe.mitre.org/data/definitions/${c.slice(4)}.html" rel="noopener">${c}</a>`)
    .join(', ');
  const advisories = v.links
    .map((url) => `<a href="${esc(url)}" rel="noopener">${esc(hostOf(url))}</a>`)
    .join(', ');
  const ransomware = v.knownRansomwareCampaignUse === 'Known' ? ' &middot; <strong>Used in ransomware</strong>' : '';
  return `<article class="brief brief-kev" id="${esc(v.cveID.toLowerCase())}">
            <p class="brief-meta">${esc(v.product.startsWith(v.vendorProject) ? v.product : `${v.vendorProject} ${v.product}`)} &middot; <a href="https://nvd.nist.gov/vuln/detail/${esc(v.cveID)}" rel="noopener">${esc(v.cveID)}</a>${ransomware}</p>
            <h4>${esc(v.vulnerabilityName)}</h4>
            <p>${esc(v.shortDescription)}</p>
            <p class="brief-links small">${advisories ? `Vendor advisory: ${advisories}. ` : ''}${cweLinks ? `Weakness: ${cweLinks}.` : ''}</p>
            <p class="takeaway"><strong>Lesson:</strong> ${lesson}</p>
          </article>`;
}

export function renderKevSection() {
  if (!existsSync(DATA)) return '<p>The latest entries are not available right now.</p>';
  const data = JSON.parse(readFileSync(DATA, 'utf8'));
  const byDay = new Map();
  for (const v of data.items) {
    if (!byDay.has(v.dateAdded)) byDay.set(v.dateAdded, []);
    byDay.get(v.dateAdded).push(v);
  }
  const updated = formatDay(data.dateReleased.slice(0, 10));
  const days = [...byDay]
    .map(
      ([day, items]) => `<section class="kev-day" aria-labelledby="day-${day}">
          <h3 class="kev-date" id="day-${day}">Added ${formatDay(day)}</h3>
          ${items.map(renderItem).join('\n          ')}
        </section>`,
    )
    .join('\n        ');
  return `<p class="notice small">Updated automatically every day from the <a href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog" rel="noopener">CISA Known Exploited Vulnerabilities Catalog</a>, the US government's list of security bugs that attackers are using right now. Last CISA update: <time datetime="${esc(data.dateReleased)}">${updated}</time> (catalog version ${esc(data.catalogVersion)}). Descriptions are CISA's own words; the lessons are ours.</p>
        ${days}`;
}
