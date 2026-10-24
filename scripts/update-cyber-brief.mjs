// Downloads CISA's Known Exploited Vulnerabilities (KEV) catalog and keeps the
// newest entries in src/data/kev-latest.json, which the build turns into the
// "Exploited this month" section of /cyber-brief/.
//
// Usage: node scripts/update-cyber-brief.mjs
//
// Runs every day from .github/workflows/update-cyber-brief.yml. It only
// rewrites the file when CISA has published a new catalog version, so days
// with no new entries produce no commit. Nothing here is written by hand: every
// field comes straight from CISA's feed.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SOURCES = [
  'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json',
  // CISA's own mirror of the same file, used if the main URL fails.
  'https://raw.githubusercontent.com/cisagov/kev-data/main/known_exploited_vulnerabilities.json',
];
const OUT = join(import.meta.dirname, '..', 'src', 'data', 'kev-latest.json');
const WINDOW_DAYS = 30; // keep entries added in the last 30 days...
const MIN_ITEMS = 15; // ...but never fewer than this many
const MAX_ITEMS = 60;

async function fetchCatalog() {
  const failures = [];
  for (const url of SOURCES) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': 'mycsmajor.com cyber brief updater' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data.vulnerabilities) || !data.catalogVersion) throw new Error('unexpected format');
      return { data, url };
    } catch (err) {
      failures.push(`${url}: ${err.message}`);
    }
  }
  throw new Error(`Could not download the KEV catalog.\n${failures.join('\n')}`);
}

// The notes field is a " ; "-separated list of URLs, some with a label like
// "BOD 26-04: https://...". Keep the vendor and advisory links and drop
// CISA's directive boilerplate and the NVD link (the page links NVD itself).
function advisoryLinks(notes) {
  return (notes ?? '')
    .split(';')
    .map((part) => part.trim().match(/https?:\/\/\S+/)?.[0])
    .filter((url) => url && !/cisa\.gov\/news-events\/directives|nvd\.nist\.gov/.test(url))
    .filter((url, i, all) => all.indexOf(url) === i)
    .slice(0, 3);
}

const { data, url } = await fetchCatalog();

if (existsSync(OUT)) {
  const current = JSON.parse(readFileSync(OUT, 'utf8'));
  if (current.catalogVersion === data.catalogVersion) {
    console.log(`No change: catalog ${data.catalogVersion} is already saved.`);
    process.exit(0);
  }
}

const sorted = [...data.vulnerabilities].sort(
  (a, b) => b.dateAdded.localeCompare(a.dateAdded) || b.cveID.localeCompare(a.cveID, 'en', { numeric: true }),
);
const newest = sorted[0]?.dateAdded;
const cutoff = new Date(Date.parse(newest) - WINDOW_DAYS * 86400000).toISOString().slice(0, 10);
let items = sorted.filter((v) => v.dateAdded > cutoff);
if (items.length < MIN_ITEMS) items = sorted.slice(0, MIN_ITEMS);
items = items.slice(0, MAX_ITEMS);

const out = {
  source: 'CISA Known Exploited Vulnerabilities Catalog',
  sourceUrl: url,
  catalogVersion: data.catalogVersion,
  dateReleased: data.dateReleased,
  totalInCatalog: data.count ?? data.vulnerabilities.length,
  items: items.map((v) => ({
    cveID: v.cveID,
    vendorProject: v.vendorProject?.trim(),
    product: v.product?.trim(),
    vulnerabilityName: v.vulnerabilityName?.trim(),
    dateAdded: v.dateAdded,
    shortDescription: v.shortDescription?.trim(),
    knownRansomwareCampaignUse: v.knownRansomwareCampaignUse,
    cwes: v.cwes ?? [],
    links: advisoryLinks(v.notes),
  })),
};

writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`Saved ${out.items.length} entries from catalog ${out.catalogVersion} (newest added ${newest}).`);
