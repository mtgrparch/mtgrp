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
//    • llms.txt    — plain-text site summary for AI search engines
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://www.mtgrp.xyz';
const EMAIL = 'studio@mtgrp.xyz';
const INSTAGRAM = 'https://www.instagram.com/metagroupe/';
const DESCRIPTION = 'MTGRP (Metagroupe) is a collaborative architecture practice working at the intersection of metabolism, circularity, thermal conditions, and collective space. Founded in 2018, with offices in Beirut, Madrid, and Milan.';
const COUNTRIES = { LB: 'Lebanon', CZ: 'Czech Republic', CH: 'Switzerland', ES: 'Spain', RU: 'Russia', IT: 'Italy', CL: 'Chile' };

// ── Read data arrays straight out of script.js ──
const src = fs.readFileSync(path.join(ROOT, 'script.js'), 'utf8');
function extractArray(name) {
  const start = src.indexOf(`const ${name} = [`);
  if (start < 0) throw new Error(`${name} not found in script.js`);
  let i = src.indexOf('[', start), depth = 0, j = i;
  for (; j < src.length; j++) {
    if (src[j] === '[') depth++;
    if (src[j] === ']' && --depth === 0) break;
  }
  return Function(`return ${src.slice(i, j + 1)}`)();
}
const PARTNERS = extractArray('PARTNERS');
const PROJECTS = extractArray('PROJECTS');

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

const works = PROJECTS.map(p => {
  const w = {
    '@type': 'CreativeWork',
    '@id': `${SITE}/#${p.id}`,
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
  const img = ['webp', 'jpg', 'gif'].map(ext => `photos/${p.id}-01.${ext}`).find(f => fs.existsSync(path.join(ROOT, f)));
  if (img) w.image = `${SITE}/${img}`;
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
        <h3>${esc(p.title)}</h3>
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
  return `### ${p.title}\n${[...new Set(meta)].join(' · ')}\n\n${p.desc || ''}`;
}).join('\n\n')}
`;

// ── Write ──
function replaceBetween(html, marker, content) {
  const re = new RegExp(`(<!-- ${marker}:START -->)[\\s\\S]*?(<!-- ${marker}:END -->)`);
  if (!re.test(html)) throw new Error(`Markers ${marker}:START/END missing in index.html`);
  return html.replace(re, `$1\n  ${content}\n  $2`);
}
const indexPath = path.join(ROOT, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
html = replaceBetween(html, 'SEO:JSONLD', `<script type="application/ld+json">\n${JSON.stringify(graph, null, 2)}\n  </script>`);
html = replaceBetween(html, 'SEO:NOSCRIPT', noscript);
fs.writeFileSync(indexPath, html);
fs.writeFileSync(path.join(ROOT, 'llms.txt'), llms);
console.log(`Updated index.html and llms.txt (${PROJECTS.length} projects, ${PARTNERS.length} partners).`);
