import { defineConfig } from 'vite';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';
import { renderKevSection } from './src/build/cyber-brief.js';
import { renderBookPlaceholders } from './src/build/books.js';

const root = import.meta.dirname;
const SITE = 'https://mycsmajor.com';

const NAV = [
  { href: '/daily/', label: 'Daily Problem', section: 'daily' },
  { href: '/problems/', label: 'Problems', section: 'problems' },
  { href: '/books/', label: 'Books', section: 'books' },
  { href: '/cyber-brief/', label: 'Cyber Brief', section: 'cyber-brief' },
  { href: '/gear/', label: 'Gear Guides', section: 'gear' },
  { href: '/about/', label: 'About', section: 'about' },
];

// Every .html file outside node_modules/dist is a page.
function findPages(dir) {
  const pages = [];
  for (const name of readdirSync(dir)) {
    if (['node_modules', 'dist', 'public', '.git', '.claude', '.vercel', 'src', 'scripts', 'tests'].includes(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) pages.push(...findPages(full));
    else if (name.endsWith('.html')) pages.push(full);
  }
  return pages;
}

// "daily/index.html" -> "/daily/", "404.html" -> "/404.html"
function urlPath(file) {
  const rel = relative(root, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'index.html'.length);
  return '/' + rel;
}

const partial = (name) => readFileSync(resolve(root, 'src/partials', name), 'utf8');

function layout() {
  return {
    name: 'mycsmajor-layout',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const path = urlPath(ctx.filename);
        let section = path.split('/')[1];
        if (section === 'python-book') section = 'books';
        const navLinks = NAV.map(({ href, label, section: s }) => {
          const current = s === section ? ' aria-current="page"' : '';
          return `<li><a href="${href}"${current}>${label}</a></li>`;
        }).join('\n          ');

        const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? 'mycsmajor';
        const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
        let head = partial('head.html')
          .replaceAll('{{url}}', SITE + path)
          .replaceAll('{{title}}', title)
          .replaceAll('{{description}}', description)
          .replaceAll('{{site}}', SITE)
          // Problem pages and book chapters are articles; everything else is the website.
          .replaceAll('{{ogType}}', /^\/(problems|python-book)\/[^/]+\/$|^\/books\/[^/]+\/[^/]+\/$/.test(path) ? 'article' : 'website');
        // Pages that opt out of indexing get no canonical URL.
        if (html.includes('content="noindex"')) head = head.replace(/\s*<link rel="canonical"[^>]*>/, '');

        return renderBookPlaceholders(html)
          .replace('<!--head-->', head)
          .replace('<!--header-->', partial('header.html').replace('{{nav}}', navLinks))
          .replace('<!--footer-->', partial('footer.html'))
          .replace('<!--kev-latest-->', () => renderKevSection());
      },
    },
  };
}

// Preloads the Latin subset of Inter so text does not reflow when it arrives.
// The file name has a content hash, so it is looked up in the finished bundle.
function preloadFont() {
  return {
    name: 'mycsmajor-preload-font',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const font = Object.keys(ctx.bundle ?? {}).find((f) => /inter-latin-wght-normal-.*\.woff2$/.test(f));
        if (!font) return html;
        return html.replace(
          '</head>',
          `  <link rel="preload" href="/${font}" as="font" type="font/woff2" crossorigin>\n  </head>`,
        );
      },
    },
  };
}

// Writes sitemap.xml for every page that is not marked noindex.
function sitemap() {
  return {
    name: 'mycsmajor-sitemap',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const urls = findPages(root)
        .filter((file) => !readFileSync(file, 'utf8').includes('content="noindex"'))
        .map((file) => urlPath(file))
        .sort()
        .map((path) => `  <url><loc>${SITE}${path}</loc><lastmod>${today}</lastmod></url>`);
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`,
      });
    },
  };
}

export default defineConfig({
  plugins: [layout(), preloadFont(), sitemap()],
  build: {
    rolldownOptions: {
      input: Object.fromEntries(
        findPages(root).map((file) => [relative(root, file).replace(/\\/g, '/').replace(/\.html$/, ''), file]),
      ),
    },
  },
});
