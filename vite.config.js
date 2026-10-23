import { defineConfig } from 'vite';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';

const root = import.meta.dirname;
const SITE = 'https://mycsmajor.com';

const NAV = [
  { href: '/daily/', label: 'Daily Problem', section: 'daily' },
  { href: '/cyber-brief/', label: 'Cyber Brief', section: 'cyber-brief' },
  { href: '/gear/', label: 'Gear Guides', section: 'gear' },
  { href: '/python-book/', label: 'Python Book', section: 'python-book' },
  { href: '/about/', label: 'About', section: 'about' },
  { href: '/contact/', label: 'Contact', section: 'contact' },
];

// Every .html file outside node_modules/dist is a page.
function findPages(dir) {
  const pages = [];
  for (const name of readdirSync(dir)) {
    if (['node_modules', 'dist', 'public', '.git', '.claude', 'src', 'scripts'].includes(name)) continue;
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
        const section = path.split('/')[1];
        const navLinks = NAV.map(({ href, label, section: s }) => {
          const current = s === section ? ' aria-current="page"' : '';
          return `<li><a href="${href}"${current}>${label}</a></li>`;
        }).join('\n          ');

        const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? 'mycsmajor';
        const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
        let head = partial('head.html')
          .replaceAll('{{url}}', SITE + path)
          .replaceAll('{{title}}', title)
          .replaceAll('{{description}}', description);
        // Pages that opt out of indexing get no canonical URL.
        if (html.includes('content="noindex"')) head = head.replace(/\s*<link rel="canonical"[^>]*>/, '');

        return html
          .replace('<!--head-->', head)
          .replace('<!--header-->', partial('header.html').replace('{{nav}}', navLinks))
          .replace('<!--footer-->', partial('footer.html'));
      },
    },
  };
}

export default defineConfig({
  plugins: [layout()],
  build: {
    rolldownOptions: {
      input: Object.fromEntries(
        findPages(root).map((file) => [relative(root, file).replace(/\\/g, '/').replace(/\.html$/, ''), file]),
      ),
    },
  },
});
