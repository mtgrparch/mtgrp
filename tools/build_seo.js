#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
//  build_seo.js — regenerates search / AI-search metadata from script.js
//
//  Run from the repo root after editing PROJECTS or PARTNERS in script.js:
//      node tools/build_seo.js
//
//  Writes:
//    • index.html  — JSON-LD structured data (between SEO:JSONLD markers)
//                  — <noscript> fallback content (between SEO:NOSCRIPT markers)
//    • projects/<slug>/index.html — one real page per project, built from
//                    index.html with its own title, description, link preview
//                    and the project already open, so crawlers that don't
//                    run JavaScript (most AI search bots) still see it all
//    • sitemap.xml — homepage + every project page
//    • llms.txt    — plain-text site summary for AI search engines
//
//  Link-preview images come from tools/make_og_images.py (run that first
//  when a project gets new photos).
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://www.mtgrp.xyz';
const EMAIL = 'studio@mtgrp.xyz';
const INSTAGRAM = 'https://www.instagram.com/metagroupe/';
const DESCRIPTION = 'MTGRP (Metagroupe) is a collaborative architecture practice working at the intersection of metabolism, circularity, thermal conditions, and collective space. Founded in 2018, with offices in Beirut, Madrid, and Milan.';
const COUNTRIES = { LB: 'Lebanon', CZ: 'Czech Republic', CH: 'Switzerland', ES: 'Spain', RU: 'Russia', IT: 'Italy', CL: 'Chile' };

// ── Read data and render functions straight out of script.js ──
// (so project pages use exactly the same markup as the on-site modal)
const src = fs.readFileSync(path.join(ROOT, 'script.js'), 'utf8');
function extractBlock(startText, open) {
  const start = src.indexOf(startText);
  if (start < 0) throw new Error(`"${startText}" not found in script.js`);
  const close = { '[': ']', '{': '}' }[open];
  let i = src.indexOf(open, start + startText.length - 1), depth = 0, j = i;
  for (; j < src.length; j++) {
    if (src[j] === open) depth++;
    if (src[j] === close && --depth === 0) break;
  }
  return src.slice(start, j + 1);
}
const lib = Function([
  extractBlock('const PARTNERS = [', '['),
  extractBlock('const PROJECTS = [', '['),
  extractBlock('const OFFICE_LINKS = {', '{'),
  extractBlock('function linkCollaborator(', '{'),
  extractBlock('function projectSlug(', '{'),
  extractBlock('function buildProjectHTML(', '{'),
  'return { PARTNERS, PROJECTS, projectSlug, buildProjectHTML };',
].join(';\n'))();
const { PARTNERS, PROJECTS, projectSlug, buildProjectHTML } = lib;
const pageUrl = p => `${SITE}/projects/${projectSlug(p)}/`;

const info = (p, label) => (p.info || []).find(r => r.label === label)?.value;
const place = loc => loc ? loc.replace(/, ([A-Z]{2})$/, (_, c) => `, ${COUNTRIES[c] || c}`) : undefined;
const clean = s => String(s).replace(/\u200B/g, '').trim();
const esc = s => clean(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ── JSON-LD ──
const org = {
  '@type': 'ArchitectureFirm',
  '@id': `${SITE}/#org`,
  name: 'MTGRP',
  alternateName: 'Metagroupe',
  url: `${SITE}/`,
  logo: `${SITE}/photos/FAVICON/favicon.ico`,
  image: `${SITE}/photos/og-cover.jpg`,
  description: DESCRIPTION,
  email: EMAIL,
  foundingDate: '2018',
  sameAs: [INSTAGRAM],
  knowsAbout: ['Architecture', 'Adaptive reuse', 'Collective housing', 'Circular construction',
    'Material metabolism', 'Passive climate design', 'Thermal comfort', 'Urbanism', 'Architecture competitions'],
  location: ['Beirut, Lebanon', 'Madrid, Spain', 'Milan, Italy'].map(name => ({ '@type': 'Place', name })),
  founder: PARTNERS.map(p => ({ '@type': 'Person', name: p.name, jobTitle: p.role, description: clean(p.bio) })),
};

const ogImage = p => fs.existsSync(path.join(ROOT, `photos/og/${p.id}.jpg`))
  ? `${SITE}/photos/og/${p.id}.jpg` : `${SITE}/photos/og-cover.jpg`;
const shortDesc = p => {
  const d = clean(p.desc || '');
  if (d.length <= 160) return d;
  return d.slice(0, 157).replace(/\s+\S*$/, '') + '…';
};

const works = PROJECTS.map(p => {
  const w = {
    '@type': 'CreativeWork',
    '@id': `${pageUrl(p)}#work`,
    url: pageUrl(p),
    name: p.title,
    alternativeHeadline: p.subtitle,
    description: p.desc,
    genre: info(p, 'Type'),
    creator: { '@id': `${SITE}/#org` },
  };
  const loc = place(info(p, 'Location'));
  if (loc) w.locationCreated = { '@type': 'Place', name: loc };
  const status = info(p, 'Status');
  if (status && /prize|winner|mention/i.test(status + p.subtitle)) w.award = p.subtitle.replace(/^.*—\s*/, '');
  if (p.photos > 0) w.image = ogImage(p);
  return w;
});

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    org,
    { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'MTGRP', publisher: { '@id': `${SITE}/#org` }, inLanguage: 'en' },
    { '@type': 'ItemList', name: 'Selected works by MTGRP', itemListElement: works.map((w, i) => ({ '@type': 'ListItem', position: i + 1, item: w })) },
  ],
};

// ── <noscript> fallback ──
const noscript = `<noscript>
    <main>
      <h1>MTGRP — Metagroupe</h1>
      <p>${esc(DESCRIPTION)}</p>
      <h2>Partners</h2>
      <ul>
${PARTNERS.map(p => `        <li>${esc(p.name)} — ${esc(p.role)}</li>`).join('\n')}
      </ul>
      <h2>Projects</h2>
${PROJECTS.map(p => `      <article>
        <h3><a href="/projects/${projectSlug(p)}/">${esc(p.title)}</a></h3>
        <p>${esc([p.subtitle, info(p, 'Location')].filter(Boolean).join(' — '))}</p>
        <p>${esc(p.desc || '')}</p>
      </article>`).join('\n')}
      <h2>Contact</h2>
      <p>Instagram: <a href="${INSTAGRAM}">@metagroupe</a></p>
    </main>
  </noscript>`;

// ── llms.txt ──
const llms = `# MTGRP (Metagroupe)

> ${DESCRIPTION}

MTGRP is an architecture practice run by four co-founders across Beirut (Lebanon), Madrid (Spain) and Milan (Italy). The work spans competitions, housing, adaptive reuse, interiors and ephemeral installations, with a focus on passive climate design, material circularity and collective space.

Website: ${SITE}/
Contact: ${EMAIL}
Instagram: ${INSTAGRAM}

## Usage

AI search engines and assistants may read, index, quote and link to this site with attribution to MTGRP. Use of any text or images for training AI models is not permitted (see ${SITE}/robots.txt and ${SITE}/.well-known/tdmrep.json).

## Partners

${PARTNERS.map(p => `- **${p.name}** (${p.role}): ${clean(p.bio)}`).join('\n')}

## Projects

${PROJECTS.map(p => {
  const meta = [p.subtitle, place(info(p, 'Location')), info(p, 'Status')].filter(Boolean);
  return `### ${p.title}\n${[...new Set(meta)].join(' · ')}\nPage: ${pageUrl(p)}\n\n${p.desc || ''}`;
}).join('\n\n')}
`;

// ── Write ──
function replaceBetween(html, marker, content) {
  const re = new RegExp(`(<!-- ${marker}:START -->)[\\s\\S]*?(<!-- ${marker}:END -->)`);
  if (!re.test(html)) throw new Error(`Markers ${marker}:START/END missing in index.html`);
  return html.replace(re, (_, a, b) => `${a}\n  ${content}\n  ${b}`);
}
function setAttr(html, selector, value) {
  // selector like 'name="description"' or 'property="og:url"' or 'rel="canonical"'
  const re = new RegExp(`(<(?:meta|link) ${selector} (?:content|href)=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`<${selector}> missing in index.html`);
  return html.replace(re, (_, a, b) => a + value.replace(/"/g, '&quot;') + b);
}
const jsonLd = obj => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n  </script>`;

const indexPath = path.join(ROOT, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
const oldIndex = html;

// Cache-busting: ?v= is a fingerprint of the CSS + JS, so browsers fetch fresh
// files exactly when they change — no manual version bumps needed.
const version = require('crypto').createHash('md5')
  .update(fs.readFileSync(path.join(ROOT, 'script.js')))
  .update(fs.readFileSync(path.join(ROOT, 'style.css')))
  .digest('hex').slice(0, 8);
html = html.replace(/(style\.css|script\.js)\?v=\w+/g, `$1?v=${version}`);
html = replaceBetween(html, 'SEO:JSONLD', jsonLd(graph));
html = replaceBetween(html, 'SEO:NOSCRIPT', noscript);
// Grid tile proportions (from tools/make_grid_tiles.py), so the parallax grid
// can lay every tile out before its image has downloaded
const sizesPath = path.join(ROOT, 'photos/grid/sizes.json');
const gridSizes = fs.existsSync(sizesPath) ? fs.readFileSync(sizesPath, 'utf8').trim() : '{}';
html = replaceBetween(html, 'GRID:SIZES', `<script>window.GRID_SIZES = ${gridSizes};</script>`);
fs.writeFileSync(indexPath, html);

// ── Project pages ──
const projectsDir = path.join(ROOT, 'projects');
const today = new Date().toISOString().slice(0, 10);
// Sitemap dates only move when a page's content actually changes
const sitemapPath = path.join(ROOT, 'sitemap.xml');
const oldDates = {};
if (fs.existsSync(sitemapPath)) {
  for (const [, loc, d] of fs.readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) oldDates[loc] = d;
}
const pageFile = url => path.join(ROOT, url.replace(SITE, ''), 'index.html');
const oldPages = {};
for (const url of [`${SITE}/`, ...PROJECTS.map(pageUrl)]) {
  if (fs.existsSync(pageFile(url))) oldPages[url] = fs.readFileSync(pageFile(url), 'utf8');
}
fs.rmSync(projectsDir, { recursive: true, force: true });   // drop pages of removed/renamed projects
const navList = PROJECTS.map(p => `        <li><a href="/projects/${projectSlug(p)}/">${esc(p.title)}</a></li>`).join('\n');

PROJECTS.forEach((p, i) => {
  const url = pageUrl(p);
  const loc = place(info(p, 'Location'));
  const title = `${p.title} — ${[p.subtitle, loc].filter(Boolean).join(', ')} | MTGRP`;
  const desc = shortDesc(p);
  let page = html;

  // (index.html's <base href="/"> makes photos/, fonts/… resolve from the site root here too)
  if (!page.includes('<base href="/">')) throw new Error('index.html must keep <base href="/">');
  page = page.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  page = setAttr(page, 'name="description"', desc);
  page = setAttr(page, 'rel="canonical"', url);
  page = setAttr(page, 'property="og:type"', 'article');
  page = setAttr(page, 'property="og:url"', url);
  page = setAttr(page, 'property="og:title"', `${p.title} — MTGRP`);
  page = setAttr(page, 'property="og:description"', desc);
  page = setAttr(page, 'property="og:image"', ogImage(p));
  page = setAttr(page, 'name="twitter:title"', `${p.title} — MTGRP`);
  page = setAttr(page, 'name="twitter:description"', desc);
  page = setAttr(page, 'name="twitter:image"', ogImage(p));

  page = replaceBetween(page, 'SEO:JSONLD', jsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      { ...works[i], isPartOf: { '@id': `${SITE}/#website` } },
      { '@type': 'ArchitectureFirm', '@id': `${SITE}/#org`, name: 'MTGRP', alternateName: 'Metagroupe', url: `${SITE}/` },
      { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'MTGRP' },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'MTGRP', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: p.title, item: url },
      ] },
    ],
  }));

  // Project already open in the modal — readable without JavaScript
  page = page.replace('<div id="modal-container" class="hidden">', '<div id="modal-container">');
  page = page.replace('<div id="modal-content"></div>', `<div id="modal-content">${buildProjectHTML(p)}</div>`);

  page = replaceBetween(page, 'SEO:NOSCRIPT', `<noscript>
    <nav>
      <p><a href="/">MTGRP — Metagroupe</a>: architecture practice in Beirut, Madrid and Milan.</p>
      <h2>More projects</h2>
      <ul>
${navList}
      </ul>
    </nav>
  </noscript>`);

  const dir = path.join(projectsDir, projectSlug(p));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page);
});

// ── Sitemap ──
const lastmod = url => {
  const now = fs.readFileSync(pageFile(url), 'utf8');
  const before = url === `${SITE}/` ? oldIndex : oldPages[url];
  const strip = h => h && h.replace(/\?v=\w+/g, '');   // a new asset version alone isn't new content
  return strip(before) === strip(now) && oldDates[url] ? oldDates[url] : today;
};
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[`${SITE}/`, ...PROJECTS.map(pageUrl)].map(u => `  <url>
    <loc>${u}</loc>
    <lastmod>${lastmod(u)}</lastmod>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(ROOT, 'llms.txt'), llms);

const slugs = PROJECTS.map(projectSlug);
const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (dupes.length) throw new Error(`Two projects share the page address: ${dupes.join(', ')} — add a unique slug: "…" to one of them`);
console.log(`Updated index.html, sitemap.xml, llms.txt and ${PROJECTS.length} project pages (${PARTNERS.length} partners).`);
