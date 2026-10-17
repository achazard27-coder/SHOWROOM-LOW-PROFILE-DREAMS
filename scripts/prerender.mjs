import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { render, getPageMeta, staticPaths } from '../.prerender/entry-server.js';
const template = await readFile('dist/index.html', 'utf8');
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
for (const path of staticPaths) {
  const meta = getPageMeta(path);
  const metadata = `<link rel="canonical" href="${escape(meta.canonical)}" />\n<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow'}" />\n<meta property="og:type" content="website" />\n<meta property="og:title" content="${escape(meta.title)}" />\n<meta property="og:description" content="${escape(meta.description)}" />\n<meta property="og:url" content="${escape(meta.canonical)}" />`;
  const html = template.replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(meta.description)}" />`).replace('</head>', metadata + '\n</head>').replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`);
  const output = path === '/404/' ? 'dist/404.html' : join('dist', path, 'index.html');
  await mkdir(join(output, '..'), { recursive: true });
  await writeFile(output, html);
}
const indexable = staticPaths.filter(path => path !== '/404/');
await writeFile('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + indexable.map(path => `<url><loc>${escape(getPageMeta(path).canonical)}</loc></url>`).join('') + '</urlset>\n');
await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\nSitemap: https://showroom-low-profile-dreams.netlify.app/sitemap.xml\n');
await rm('.prerender', { recursive: true, force: true });
console.log(`Pre-rendered ${staticPaths.length} pages, sitemap.xml and robots.txt.`);
