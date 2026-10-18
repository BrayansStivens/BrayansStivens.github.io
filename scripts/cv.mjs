// Genera el CV en PDF (es/en) a partir de content.js, con Chrome headless.
// Formato pensado para ATS: una columna, texto real, encabezados estándar.
// Uso: node scripts/cv.mjs   (CHROME=/ruta/a/chrome si no está en la ruta por defecto de macOS)
import { writeFile, mkdir, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { T, LINKS, esc } from '../content.js';

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SITE = 'brayansstivens.github.io';
const root = new URL('../', import.meta.url);

const L = {
  es: {
    summary: 'Perfil', ai: 'IA aplicada', skills: 'Habilidades', exp: 'Experiencia', projects: 'Proyectos',
    edu: 'Educación', certs: 'Certificaciones', founder: 'Cofundador',
    groups: {
      appsec: 'Seguridad de aplicaciones', secops: 'Operaciones de seguridad', devsecops: 'DevSecOps',
      'ai-security': 'Seguridad de IA', containers: 'Contenedores', grc: 'GRC y cumplimiento',
      fullstack: 'Desarrollo', data: 'Datos',
    },
  },
  en: {
    summary: 'Summary', ai: 'Applied AI', skills: 'Skills', exp: 'Experience', projects: 'Projects',
    edu: 'Education', certs: 'Certifications', founder: 'Co-founder',
    groups: {
      appsec: 'Application security', secops: 'Security operations', devsecops: 'DevSecOps',
      'ai-security': 'AI security', containers: 'Containers', grc: 'GRC and compliance',
      fullstack: 'Development', data: 'Data',
    },
  },
};

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
// Etiquetas de las líneas de script de nmap tal como deben verse en un CV
const KEYS = { iac: 'IaC', ia: 'IA', ai: 'AI' };
const a = (href, label) => `<a href="${esc(href)}">${esc(label)}</a>`;

function cvHtml(lang) {
  const c = T[lang];
  const l = L[lang];
  const skills = c.skills.rows.map(([, svc, ver]) => [l.groups[svc] || svc, ver.replace(/ · /g, ', ')])
    .concat(c.skills.scripts.map(([k, v]) => [KEYS[k] || cap(k), v]));
  const arodium = c.projects.find((p) => p.name.startsWith('arodium'));
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>Brayan Sepúlveda · CV</title>
<meta name="author" content="Brayan Stivens Sepúlveda Molina">
<style>
  @page { size: Letter; margin: 14mm 15mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 9.6pt/1.42 Helvetica, Arial, sans-serif; color: #16191b; }
  a { color: #0b5c8f; text-decoration: none; }
  h1 { margin: 0; font-size: 21pt; line-height: 1.1; letter-spacing: -0.01em; }
  .title { margin: 3pt 0 4pt; font-size: 11pt; font-weight: 700; color: #14532d; }
  .contact { margin: 0 0 10pt; font-size: 9pt; color: #3b4448; }
  .contact span + span::before { content: " · "; color: #9aa4a8; }
  h2 { margin: 11pt 0 5pt; padding-bottom: 2pt; font-size: 10pt; text-transform: uppercase; letter-spacing: 0.06em; color: #14532d; border-bottom: 1px solid #c9d2cd; break-after: avoid; }
  p { margin: 0 0 4pt; }
  ul { margin: 2pt 0 0; padding-left: 13pt; }
  li { margin-bottom: 2pt; }
  .job { margin-bottom: 7pt; }
  .job-head { break-after: avoid; }
  li { break-inside: avoid; }
  .job-head { display: flex; justify-content: space-between; gap: 10pt; font-weight: 700; }
  .job-head .date { font-weight: 400; color: #3b4448; white-space: nowrap; }
  .tags { margin-top: 2pt; font-size: 8.6pt; color: #3b4448; }
  .skills { display: grid; grid-template-columns: max-content 1fr; gap: 1.5pt 10pt; }
  .skills dt { font-weight: 700; }
  .skills dd { margin: 0; }
  .ai li b, .proj b { color: #16191b; }
</style>
</head>
<body>
  <h1>Brayan Stivens Sepúlveda Molina</h1>
  <p class="title">${esc(c.whoami.role)}</p>
  <p class="contact">
    <span>Medellín, Colombia</span>
    <span>${a(`mailto:${LINKS.email}`, LINKS.email)}</span>
    <span>${a(LINKS.linkedin, 'linkedin.com/in/brayansstivens')}</span>
    <span>${a(LINKS.github, 'github.com/BrayansStivens')}</span>
    <span>${a(`https://${SITE}${lang === 'en' ? '/en/' : '/'}`, SITE)}</span>
  </p>

  <h2>${l.summary}</h2>
  <p>${esc(c.whoami.summary)}</p>
  <p>${esc(c.whoami.status)}</p>

  <h2>${l.ai}</h2>
  <ul class="ai">${c.ia.items.map(([t, d]) => `<li><b>${esc(cap(t))}:</b> ${esc(d)}</li>`).join('')}</ul>

  <h2>${l.skills}</h2>
  <dl class="skills">${skills.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>

  <h2>${l.exp}</h2>
  ${c.jobs.map((j) => `<div class="job">
    <div class="job-head"><span>${esc(j.role)} · ${esc(j.company)}</span><span class="date">${esc(j.date)}</span></div>
    <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
    <p class="tags">${esc(j.tags.join(' · '))}</p>
  </div>`).join('')}

  <h2>${l.projects}</h2>
  <div class="job proj">
    <div class="job-head"><span>Pitangus · ${esc(c.pitangus.tagline)}</span><span class="date">${esc(c.pitangus.meta)}</span></div>
    <p>${esc(c.pitangus.lead)}</p>
    <p>${a(LINKS.pitangus, 'pitangus.dev')} · ${a(LINKS.pitangusRepo, 'github.com/Pitangus-Dev/pitangus')}</p>
  </div>
  <div class="job proj">
    <div class="job-head"><span>Arodium · ${l.founder}</span></div>
    <p>${esc(arodium.desc.replace(/^[^.]+\.\s*/, ''))}</p>
  </div>

  <h2>${l.edu}</h2>
  ${c.edu.items.map(([d, t, s]) => `<div class="job-head"><span>${esc(t)} · <span style="font-weight:400">${esc(s)}</span></span><span class="date">${esc(d)}</span></div>`).join('')}

  <h2>${l.certs}</h2>
  <p>${c.edu.certs.map(([y, n]) => `${esc(n)} (${y})`).join(' · ')}</p>
</body>
</html>`;
}

await mkdir(new URL('cv/', root), { recursive: true });
for (const lang of ['es', 'en']) {
  const html = join(tmpdir(), `cv-${lang}-${process.pid}.html`);
  await writeFile(html, cvHtml(lang));
  const out = new URL(`cv/brayan-sepulveda-cv-${lang}.pdf`, root).pathname;
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${out}`, `file://${html}`], { stdio: 'ignore' });
  await rm(html);
  console.log(`ok cv/brayan-sepulveda-cv-${lang}.pdf`);
}
