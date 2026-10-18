// Genera las páginas estáticas a partir de src/index.html y content.js:
//   index.html (es), en/index.html (en) y sitemap.xml.
// Uso: node scripts/build.mjs   (sin dependencias)
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { T, LINKS, profileHtml } from '../content.js';

const SITE = 'https://brayansstivens.github.io';
const root = new URL('../', import.meta.url);
const tpl = await readFile(new URL('src/index.html', root), 'utf8');

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pathFor = (l) => (l === 'en' ? '/en/' : '/');

const OG_ALT = {
  es: 'Brayan Sepúlveda, ingeniero de software y especialista en AppSec y SecOps',
  en: 'Brayan Sepúlveda, software engineer and AppSec / SecOps specialist',
};

function jsonLd(lang) {
  const c = T[lang];
  const url = SITE + pathFor(lang);
  const person = `${SITE}/#person`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#page`,
        url,
        name: c.title,
        description: c.desc,
        inLanguage: lang,
        mainEntity: { '@id': person },
      },
      {
        '@type': 'Person',
        '@id': person,
        name: 'Brayan Stivens Sepúlveda Molina',
        alternateName: 'Brayan Sepúlveda',
        jobTitle: c.jobTitle,
        description: c.whoami.summary,
        url: `${SITE}/`,
        image: `${SITE}/og-${lang}.png`,
        email: `mailto:${LINKS.email}`,
        address: { '@type': 'PostalAddress', addressLocality: 'Medellín', addressCountry: 'CO' },
        worksFor: { '@type': 'Organization', name: 'Siigo' },
        alumniOf: [
          { '@type': 'CollegeOrUniversity', name: 'Instituto Tecnológico Metropolitano' },
          { '@type': 'CollegeOrUniversity', name: 'Corporación Universitaria Iberoamericana' },
        ],
        knowsAbout: [
          'Application Security', 'DevSecOps', 'SecOps', 'SAST', 'DAST', 'SCA', 'Infrastructure as Code',
          'Vulnerability Management', 'GRC', 'GitHub Enterprise', 'GitHub Actions', 'Terraform', 'Docker',
          'Node.js', 'NestJS', 'React', 'Angular', 'Python',
        ],
        sameAs: [LINKS.linkedin, LINKS.github],
      },
      {
        '@type': 'SoftwareSourceCode',
        name: 'Pitangus',
        description: c.pitangus.lead.split('. ')[0] + '.',
        url: LINKS.pitangus,
        codeRepository: LINKS.pitangusRepo,
        license: 'https://www.gnu.org/licenses/agpl-3.0.html',
        creator: { '@id': person },
      },
    ],
  };
  // < escapado para que el JSON no pueda cerrar el <script>
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function loginLine(lang) {
  const fmt = new Intl.DateTimeFormat(lang === 'es' ? 'es-CO' : 'en-US', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota',
  });
  return `${T[lang].ui.login}: ${fmt.format(new Date())} ${T[lang].ui.tty}`;
}

for (const lang of ['es', 'en']) {
  const c = T[lang];
  const other = lang === 'es' ? 'en' : 'es';
  const { sections, chips } = profileHtml(c, loginLine(lang));
  const values = {
    lang,
    site: SITE,
    url: SITE + pathFor(lang),
    title: attr(c.title),
    desc: attr(c.desc),
    ogLocale: c.ogLocale,
    ogLocaleAlt: T[other].ogLocale,
    ogAlt: attr(OG_ALT[lang]),
    jsonld: jsonLd(lang),
    skip: attr(c.ui.skipProfile),
    viewLabel: attr(c.ui.view),
    profileLabel: attr(c.ui.profile),
    terminalLabel: attr(c.ui.terminal),
    other,
    otherPath: pathFor(other),
    langText: c.ui.lang,
    langLabel: attr(c.ui.langLabel),
    chipsLabel: attr(c.ui.chips),
    placeholder: attr(c.ui.placeholder),
    chips,
    sections,
  };
  const html = tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => {
    if (!(k in values)) throw new Error(`Falta el valor de {{${k}}}`);
    return values[k];
  });
  const out = lang === 'es' ? 'index.html' : 'en/index.html';
  await mkdir(new URL('en/', root), { recursive: true });
  await writeFile(new URL(out, root), html);
  console.log(`ok ${out}`);
}

const today = new Date().toISOString().slice(0, 10);
const alt = `<xhtml:link rel="alternate" hreflang="es" href="${SITE}/"/><xhtml:link rel="alternate" hreflang="en" href="${SITE}/en/"/><xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/>`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>${SITE}/</loc><lastmod>${today}</lastmod>${alt}</url>
  <url><loc>${SITE}/en/</loc><lastmod>${today}</lastmod>${alt}</url>
</urlset>
`;
await writeFile(new URL('sitemap.xml', root), sitemap);
console.log('ok sitemap.xml');
