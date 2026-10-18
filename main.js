(() => {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } },
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const LINKS = {
    email: 'brayanstivens66@gmail.com',
    linkedin: 'https://www.linkedin.com/in/brayansstivens',
    github: 'https://github.com/BrayansStivens',
    pitangus: 'https://pitangus.dev',
    pitangusRepo: 'https://github.com/Pitangus-Dev/pitangus',
  };

  const ORDER = ['whoami', 'skills', 'experiencia', 'pitangus', 'proyectos', 'educacion', 'contacto'];

  const T = {
    es: {
      title: 'Brayan Sepúlveda · SecOps / AppSec',
      desc: 'Ingeniero de software y especialista en ciberseguridad (SecOps, AppSec, GRC). Automatizo SAST, DAST, SCA e IaC en el pipeline. Creador de Pitangus.',
      ui: {
        lang: 'EN', langLabel: 'Switch to English',
        view: 'Vista', profile: 'perfil', terminal: 'terminal',
        chips: 'Secciones', skipProfile: 'Ir al contenido', skipTerm: 'Ir a la terminal',
        login: 'Último acceso', tty: 'en ttys001',
        placeholder: 'escribe help',
        welcome: [
          'Bienvenido a la terminal de Brayan Sepúlveda.',
          'Funciona como una consola real: ls, cd, cat, open, Tab para autocompletar y flechas para el historial.',
          'Escribe help para ver todo, o pulsa un comando de abajo. exit vuelve a la vista de perfil.',
        ],
      },
      titles: { whoami: 'Sobre mí', skills: 'Habilidades', experiencia: 'Experiencia', pitangus: 'Pitangus', proyectos: 'Proyectos', educacion: 'Educación', contacto: 'Contacto' },
      dirs: { whoami: 'sobre-mi', skills: 'skills', experiencia: 'experiencia', pitangus: 'pitangus', proyectos: 'proyectos', educacion: 'educacion', contacto: 'contacto' },
      files: { profile: 'perfil.txt', status: 'estado.txt' },
      cta: { mail: 'Escríbeme', linkedin: 'LinkedIn', pitangus: 'Ver Pitangus', terminal: 'Abrir terminal' },
      cmds: {
        whoami: 'whoami',
        skills: 'nmap -sV --script=skills brayan',
        experiencia: 'git log --graph experiencia',
        pitangus: 'pitangus --about',
        proyectos: 'ls -l ~/proyectos',
        educacion: 'cat educacion.txt certificaciones.txt',
        contacto: 'contact --secure',
      },
      whoami: {
        role: 'Ingeniero de software · SecOps / AppSec',
        place: 'Medellín, Colombia · UTC−5',
        summary: 'Desarrollador de origen que hoy protege el ciclo de vida del software. Convierto requisitos normativos y de riesgo en controles automatizados dentro del pipeline: SAST, DAST, SCA e IaC, con enfoque shift-left. Priorizo el riesgo real, no el ruido.',
        status: 'Abierto a proyectos freelance y consultoría en AppSec.',
      },
      skills: {
        report: 'Nmap scan report for brayan (Medellín, CO)',
        up: 'Host is up (0.0012s latency).',
        head: ['PORT', 'STATE', 'SERVICE', 'VERSION'],
        rows: [
          ['443/tcp', 'appsec', 'SAST · DAST · SCA · IaC · detección de secretos'],
          ['22/tcp', 'secops', 'Gestión de vulnerabilidades (TVM) · triage de pentest · remediación'],
          ['8443/tcp', 'devsecops', 'GitHub Enterprise · GitHub Actions · shift-left'],
          ['2376/tcp', 'containers', 'Docker · Trivy · Grype · Checkov'],
          ['9443/tcp', 'grc', 'Evidencias de auditoría · cumplimiento normativo'],
          ['3000/tcp', 'fullstack', 'Node.js · NestJS · React · Angular · diseño SOLID'],
          ['5432/tcp', 'data', 'SQL · NoSQL'],
        ],
        scripts: [
          ['lenguajes', 'Python, JavaScript, Shell, Go, C#, Java, PHP'],
          ['iac', 'Terraform, Docker, Azure'],
          ['herramientas', 'Checkov, Grype, Trivy, Dependabot, Gitleaks, TruffleHog, Fluid Attacks'],
        ],
        done: 'Nmap done: 1 IP address (1 host up) scanned',
      },
      jobs: [
        {
          hash: 'a3f9c21', head: true, company: 'Siigo', role: 'SecOps / Desarrollador FullStack', date: 'mar 2024 — hoy · Medellín',
          bullets: [
            'Lidero los dominios TVM (Threat & Vulnerability Management) e IPY (Information Protection & Governance), alineados con la estrategia global de ciberseguridad.',
            'Diseñé automatizaciones de detección y remediación temprana (SAST, DAST, SCA e IaC) que reducen el tiempo de exposición en los pipelines.',
            'Administro GitHub Enterprise: controles de acceso, seguridad y flujos automatizados para los equipos de ingeniería.',
            'Gestiono reportes de pentesting internos y externos y coordino los planes de mitigación con desarrollo.',
            'Agilicé la recolección de evidencias para auditorías de cumplimiento (GRC).',
            'Integré escaneo continuo con Checkov, Grype, Trivy, Dependabot, Gitleaks, TruffleHog y Fluid Attacks junto al equipo SRE.',
          ],
          tags: ['GitHub Enterprise', 'Terraform', 'Docker', 'Python', 'Shell', 'Go', 'C#', 'Azure'],
        },
        {
          hash: '7be1d04', company: 'Elite Automation Group', role: 'Desarrollador de software', date: 'ago 2023 — mar 2024',
          bullets: [
            'Automaticé la gestión masiva de tiendas en Amazon y Walmart con sus APIs oficiales.',
            'Construí software interno para administradores y operarios de bodega en EE. UU.: logística, devoluciones e inventario.',
          ],
          tags: ['Python', 'JavaScript', 'APIs de Amazon y Walmart'],
        },
        {
          hash: '51c0e9a', company: 'Operación Éxito Colombia', role: 'Desarrollador de software', date: 'feb 2023 — sep 2023',
          bullets: [
            'Único desarrollador de la compañía: software a medida y mantenimiento de todos los proyectos.',
            'Personalicé Moodle para escuelas y alcaldías y construí aplicaciones educativas con React, Angular y Spring Boot.',
          ],
          tags: ['React', 'Angular', 'Spring Boot', 'PHP', 'Moodle'],
        },
        {
          hash: '0d2e7f3', company: 'Colegio Mayor de Antioquia', role: 'Desarrollador (pasantía) · FrontEnd', date: 'mar 2022 — oct 2022',
          bullets: [
            'Construí el sitio de Rizomas, proyecto académico que visibiliza a la mujer en Latinoamérica: componentes accesibles en Angular y servicios en .NET.',
          ],
          tags: ['Angular', 'React', '.NET'],
        },
      ],
      pitangus: {
        meta: 'v0.15 · beta · AGPL-3.0',
        tagline: 'Detéctalo. Corrígelo. Demuéstralo.',
        lead: 'Seguridad de aplicaciones autoalojada y de código abierto que nunca envía tu código a ningún lado. La creé y hoy la publica Arodium, la empresa que cofundé.',
        steps: [
          ['detectar', 'Siete motores open source y 66 reglas propias, sin duplicados entre ellos.'],
          ['priorizar', 'Cada aviso se cruza con CISA KEV y EPSS.'],
          ['corregir', 'El comando exacto para tu gestor de paquetes.'],
          ['verificar', 'Reverify y checks en el PR que pueden bloquear el merge.'],
          ['vigilar', 'Reescaneo con cada cambio y alertas a Slack, Teams o webhook.'],
          ['demostrar', 'Evidencias para SOC 2 e ISO 27001, SARIF y reportes PDF.'],
        ],
        supply: 'Cadena de suministro verificable: imágenes fijadas por digest, releases firmadas y OpenSSF Scorecard público.',
        repo: 'código fuente',
      },
      projects: [
        { perm: 'drwxr-xr-x', name: 'pitangus/', href: '#s-pitangus', desc: 'AppSec autoalojado y de código abierto. Detalle arriba.' },
        { perm: 'drwxr-xr-x', name: 'arodium/', desc: 'Cofundador. Equipo colombiano de software a medida, web y seguridad de aplicaciones.' },
        { perm: 'drwxr-xr-x', name: 'rizomas/', desc: 'Sitio académico que visibiliza a la mujer en Latinoamérica. Angular y .NET.' },
        { perm: '-rwxr-xr-x', name: 'marketplace-sync', desc: 'Automatización de tiendas en Amazon y Walmart vía APIs oficiales. Python y JavaScript.' },
      ],
      edu: {
        file1: 'educacion.txt',
        items: [
          ['2025 — hoy', 'Ingeniería en desarrollo de software', 'Corporación Universitaria Iberoamericana'],
          ['2018 — 2024', 'Tecnología en sistemas', 'Instituto Tecnológico Metropolitano (ITM)'],
        ],
        file2: 'certificaciones.txt',
        certs: [
          ['2025', 'Técnicas de seguridad en desarrollo'],
          ['2025', 'Fundamentos de GitHub'],
          ['2025', 'Terraform'],
          ['2024', 'JavaScript intermedio'],
        ],
      },
      contact: { note: 'Canal cifrado establecido. Escríbeme por cualquiera de estos medios.' },
      help: [
        ['whoami', 'quién soy'],
        ['skills · experiencia · pitangus', 'secciones completas'],
        ['proyectos · educacion · contacto', 'más secciones'],
        ['ls [ruta]', 'lista el contenido'],
        ['cd <carpeta> · cd .. · cd -', 'cambia de carpeta'],
        ['cat <archivo>', 'lee un archivo'],
        ['open <pitangus|github|linkedin|email>', 'abre un enlace'],
        ['pwd · history · clear', 'lo de siempre'],
        ['lang es | en', 'cambia el idioma'],
        ['exit', 'vuelve a la vista de perfil'],
      ],
      suggest: ['help', 'whoami', 'ls', 'cd pitangus', 'cat README.md', 'experiencia', 'contacto', 'exit'],
      msg: {
        notFound: 'zsh: comando no encontrado: ',
        notFoundHint: 'Escribe help para ver los comandos.',
        noSuch: 'No existe el archivo o el directorio',
        notDir: 'No es un directorio',
        isDir: 'Es un directorio',
        sudo: 'brayan no está en el archivo sudoers. Este incidente será reportado.',
        rm: 'Buen intento. Este sistema es de solo lectura.',
        rmDenied: 'rm: permiso denegado',
        flag: 'cat: flag.txt: Permiso denegado. Pista: todo reconocimiento empieza por robots.txt.',
        lang: 'Idioma: español.',
        langUsage: 'uso: lang es | en',
        theme: 'Solo hay modo oscuro. Las consolas de verdad no tienen modo claro.',
        cv: 'El currículum completo está en LinkedIn:',
        openUsage: 'uso: open pitangus | repo | github | linkedin | email',
        opening: 'Abriendo ',
      },
    },

    en: {
      title: 'Brayan Sepúlveda · SecOps / AppSec',
      desc: 'Software engineer and cybersecurity specialist (SecOps, AppSec, GRC). I automate SAST, DAST, SCA and IaC in the pipeline. Creator of Pitangus.',
      ui: {
        lang: 'ES', langLabel: 'Cambiar a español',
        view: 'View', profile: 'profile', terminal: 'terminal',
        chips: 'Sections', skipProfile: 'Skip to content', skipTerm: 'Skip to the terminal',
        login: 'Last login', tty: 'on ttys001',
        placeholder: 'type help',
        welcome: [
          'Welcome to Brayan Sepúlveda\'s terminal.',
          'It works like a real shell: ls, cd, cat, open, Tab to complete and arrow keys for history.',
          'Type help to list everything, or tap a command below. exit takes you back to the profile view.',
        ],
      },
      titles: { whoami: 'About', skills: 'Skills', experiencia: 'Experience', pitangus: 'Pitangus', proyectos: 'Projects', educacion: 'Education', contacto: 'Contact' },
      dirs: { whoami: 'about', skills: 'skills', experiencia: 'experience', pitangus: 'pitangus', proyectos: 'projects', educacion: 'education', contacto: 'contact' },
      files: { profile: 'profile.txt', status: 'status.txt' },
      cta: { mail: 'Email me', linkedin: 'LinkedIn', pitangus: 'See Pitangus', terminal: 'Open terminal' },
      cmds: {
        whoami: 'whoami',
        skills: 'nmap -sV --script=skills brayan',
        experiencia: 'git log --graph experience',
        pitangus: 'pitangus --about',
        proyectos: 'ls -l ~/projects',
        educacion: 'cat education.txt certifications.txt',
        contacto: 'contact --secure',
      },
      whoami: {
        role: 'Software engineer · SecOps / AppSec',
        place: 'Medellín, Colombia · UTC−5',
        summary: 'A developer at heart who now secures the software lifecycle. I turn regulatory and risk requirements into automated controls inside the pipeline: SAST, DAST, SCA and IaC, shifted left. I prioritize real risk, not noise.',
        status: 'Open to freelance projects and AppSec consulting.',
      },
      skills: {
        report: 'Nmap scan report for brayan (Medellín, CO)',
        up: 'Host is up (0.0012s latency).',
        head: ['PORT', 'STATE', 'SERVICE', 'VERSION'],
        rows: [
          ['443/tcp', 'appsec', 'SAST · DAST · SCA · IaC · secret detection'],
          ['22/tcp', 'secops', 'Vulnerability management (TVM) · pentest triage · remediation'],
          ['8443/tcp', 'devsecops', 'GitHub Enterprise · GitHub Actions · shift-left'],
          ['2376/tcp', 'containers', 'Docker · Trivy · Grype · Checkov'],
          ['9443/tcp', 'grc', 'Audit evidence · regulatory compliance'],
          ['3000/tcp', 'fullstack', 'Node.js · NestJS · React · Angular · SOLID design'],
          ['5432/tcp', 'data', 'SQL · NoSQL'],
        ],
        scripts: [
          ['languages', 'Python, JavaScript, Shell, Go, C#, Java, PHP'],
          ['iac', 'Terraform, Docker, Azure'],
          ['tooling', 'Checkov, Grype, Trivy, Dependabot, Gitleaks, TruffleHog, Fluid Attacks'],
        ],
        done: 'Nmap done: 1 IP address (1 host up) scanned',
      },
      jobs: [
        {
          hash: 'a3f9c21', head: true, company: 'Siigo', role: 'SecOps / Full-stack developer', date: 'Mar 2024 — present · Medellín',
          bullets: [
            'I lead the TVM (Threat & Vulnerability Management) and IPY (Information Protection & Governance) domains, aligned with the company-wide security strategy.',
            'Designed early detection and remediation automation (SAST, DAST, SCA and IaC) that shortens exposure time in the pipelines.',
            'I run GitHub Enterprise: access controls, security settings and automated workflows for the engineering teams.',
            'I manage internal and external pentest reports and coordinate mitigation plans with development.',
            'Streamlined evidence collection for compliance audits (GRC).',
            'Integrated continuous scanning with Checkov, Grype, Trivy, Dependabot, Gitleaks, TruffleHog and Fluid Attacks alongside the SRE team.',
          ],
          tags: ['GitHub Enterprise', 'Terraform', 'Docker', 'Python', 'Shell', 'Go', 'C#', 'Azure'],
        },
        {
          hash: '7be1d04', company: 'Elite Automation Group', role: 'Software developer', date: 'Aug 2023 — Mar 2024',
          bullets: [
            'Automated large-scale management of Amazon and Walmart stores through their official APIs.',
            'Built internal software for warehouse managers and operators in the US: logistics, returns and inventory.',
          ],
          tags: ['Python', 'JavaScript', 'Amazon and Walmart APIs'],
        },
        {
          hash: '51c0e9a', company: 'Operación Éxito Colombia', role: 'Software developer', date: 'Feb 2023 — Sep 2023',
          bullets: [
            'Sole developer at the company: custom software and maintenance of every project.',
            'Customized Moodle for schools and city halls and built education apps with React, Angular and Spring Boot.',
          ],
          tags: ['React', 'Angular', 'Spring Boot', 'PHP', 'Moodle'],
        },
        {
          hash: '0d2e7f3', company: 'Colegio Mayor de Antioquia', role: 'Developer (internship) · Front-end', date: 'Mar 2022 — Oct 2022',
          bullets: [
            'Built the Rizomas site, an academic project that gives visibility to women in Latin America: accessible Angular components and .NET services.',
          ],
          tags: ['Angular', 'React', '.NET'],
        },
      ],
      pitangus: {
        meta: 'v0.15 · beta · AGPL-3.0',
        tagline: 'Spot it. Fix it. Prove it.',
        lead: 'Self-hosted, open-source application security that never sends your code anywhere. I created it; it is now published by Arodium, the company I co-founded.',
        steps: [
          ['find', 'Seven open-source engines and 66 custom rules, with no duplicates across them.'],
          ['prioritize', 'Every advisory is checked against CISA KEV and EPSS.'],
          ['fix', 'The exact command for your package manager.'],
          ['verify', 'Reverify, plus pull request checks that can block the merge.'],
          ['watch', 'Rescans on every change and alerts to Slack, Teams or a webhook.'],
          ['prove', 'SOC 2 and ISO 27001 evidence, SARIF and PDF reports.'],
        ],
        supply: 'A supply chain you can check: digest-pinned images, signed releases and a public OpenSSF Scorecard.',
        repo: 'source code',
      },
      projects: [
        { perm: 'drwxr-xr-x', name: 'pitangus/', href: '#s-pitangus', desc: 'Self-hosted, open-source AppSec. Details above.' },
        { perm: 'drwxr-xr-x', name: 'arodium/', desc: 'Co-founder. A Colombian team building custom software, websites and application security.' },
        { perm: 'drwxr-xr-x', name: 'rizomas/', desc: 'Academic site that gives visibility to women in Latin America. Angular and .NET.' },
        { perm: '-rwxr-xr-x', name: 'marketplace-sync', desc: 'Amazon and Walmart store automation through their official APIs. Python and JavaScript.' },
      ],
      edu: {
        file1: 'education.txt',
        items: [
          ['2025 — present', 'B.Eng. in Software Development (in progress)', 'Corporación Universitaria Iberoamericana'],
          ['2018 — 2024', 'Systems Technology degree', 'Instituto Tecnológico Metropolitano (ITM)'],
        ],
        file2: 'certifications.txt',
        certs: [
          ['2025', 'Secure development techniques'],
          ['2025', 'GitHub fundamentals'],
          ['2025', 'Terraform'],
          ['2024', 'Intermediate JavaScript'],
        ],
      },
      contact: { note: 'Encrypted channel established. Reach me through any of these.' },
      help: [
        ['whoami', 'who I am'],
        ['skills · experience · pitangus', 'full sections'],
        ['projects · education · contact', 'more sections'],
        ['ls [path]', 'list contents'],
        ['cd <dir> · cd .. · cd -', 'change directory'],
        ['cat <file>', 'read a file'],
        ['open <pitangus|github|linkedin|email>', 'open a link'],
        ['pwd · history · clear', 'the usual'],
        ['lang es | en', 'switch language'],
        ['exit', 'back to the profile view'],
      ],
      suggest: ['help', 'whoami', 'ls', 'cd pitangus', 'cat README.md', 'experience', 'contact', 'exit'],
      msg: {
        notFound: 'zsh: command not found: ',
        notFoundHint: 'Type help to list the commands.',
        noSuch: 'No such file or directory',
        notDir: 'Not a directory',
        isDir: 'Is a directory',
        sudo: 'brayan is not in the sudoers file. This incident will be reported.',
        rm: 'Nice try. This system is read-only.',
        rmDenied: 'rm: permission denied',
        flag: 'cat: flag.txt: Permission denied. Hint: every recon starts with robots.txt.',
        lang: 'Language: English.',
        langUsage: 'usage: lang es | en',
        theme: 'Dark mode only. Real terminals do not ship a light mode.',
        cv: 'The full résumé lives on LinkedIn:',
        openUsage: 'usage: open pitangus | repo | github | linkedin | email',
        opening: 'Opening ',
      },
    },
  };

  // Nombres aceptados como sección o carpeta, en cualquier idioma
  const ALIASES = {
    whoami: 'whoami', about: 'whoami', 'sobre-mi': 'whoami',
    skills: 'skills', habilidades: 'skills', nmap: 'skills',
    experiencia: 'experiencia', experience: 'experiencia', exp: 'experiencia', git: 'experiencia',
    pitangus: 'pitangus',
    proyectos: 'proyectos', projects: 'proyectos',
    educacion: 'educacion', 'educación': 'educacion', education: 'educacion',
    contacto: 'contacto', contact: 'contacto',
  };
  const COMMANDS = ['help', 'whoami', 'skills', 'experiencia', 'experience', 'pitangus', 'proyectos', 'projects', 'educacion',
    'education', 'contacto', 'contact', 'ls', 'cd', 'cat', 'open', 'pwd', 'history', 'clear', 'lang', 'cv', 'echo', 'date', 'exit'];

  let lang = 'es';
  let view = 'profile';
  let cwd = null;      // null = ~ ; si no, la clave de la sección
  let prevCwd = null;
  let welcomed = false;
  const hist = [];
  let hIdx = 0;

  const el = {
    term: $('#term'), profile: $('#profile'), sections: $('#sections'), console: $('#console'), scroll: $('#consoleScroll'),
    out: $('#out'), form: $('#promptForm'), input: $('#prompt'), ps1: $('#ps1'), suggest: $('#suggest'),
    chips: $('#chips'), langBtn: $('#langBtn'), viewProfile: $('#viewProfile'), viewTerm: $('#viewTerm'),
    viewGroup: $('#viewGroup'), barPath: $('#barPath'), skip: $('#skip'),
  };

  const t = () => T[lang];
  const ext = (href, label) => `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
  const pathOf = (k) => (k ? `~/${t().dirs[k]}` : '~');
  // VT323 dibuja mal la virgulilla: va en la fuente del texto
  const pathHtml = (path) => esc(path).replace('~', '<span class="tl">~</span>');
  const ps1 = (path = '~') => `<span class="ps1"><span class="u">brayan@sepulveda</span><span class="p">:</span><span class="d">${pathHtml(path)}</span><span class="p">$</span></span>`;

  // ---------- Contenido de cada sección (compartido por las dos vistas) ----------
  const jobHtml = (j) => `
    <div class="commit"><span class="hash">${j.hash}</span>${j.head ? ' <span class="ref">(HEAD -&gt; main)</span>' : ''} ${esc(j.company)} · ${esc(j.role)}</div>
    <div class="meta">${esc(j.date)}</div>
    <ul class="bullets">${j.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
    <ul class="tags">${j.tags.map((g) => `<li>${esc(g)}</li>`).join('')}</ul>`;

  const R = {
    whoami(c, inTerm) {
      const w = c.whoami;
      const name = 'Brayan Stivens<br>Sepúlveda Molina';
      const cta = inTerm ? '' : `<div class="cta">
          <a class="btn-cta primary" href="mailto:${LINKS.email}">${esc(c.cta.mail)}</a>
          <a class="btn-cta" href="${LINKS.linkedin}" target="_blank" rel="noopener noreferrer">${esc(c.cta.linkedin)}</a>
          <a class="btn-cta" href="#s-pitangus">${esc(c.cta.pitangus)}</a>
          <button type="button" class="btn-cta ghost" data-open-term>${esc(c.cta.terminal)}</button>
        </div>`;
      return `${inTerm ? `<p class="name">${name}</p>` : `<h1 class="name">${name}<span class="cursor" aria-hidden="true"></span></h1>`}
        <p class="role">${esc(w.role)}</p>
        <p class="muted">${esc(w.place)}</p>
        <p class="summary">${esc(w.summary)}</p>
        <p class="status"><span class="ok">[ OK ]</span> ${esc(w.status)}</p>${cta}`;
    },
    skills(c) {
      const s = c.skills;
      const rows = s.rows.map(([port, svc, ver]) =>
        `<tr><td class="port">${esc(port)}</td><td class="ok">open</td><td class="svc">${esc(svc)}</td><td class="ver">${esc(ver)}</td></tr>`).join('');
      const scripts = s.scripts.map(([k, v], i) =>
        `<li>${i === s.scripts.length - 1 ? '|_' : '| '} <b>${esc(k)}:</b> ${esc(v)}</li>`).join('');
      return `<p class="muted">${esc(s.report)}<br>${esc(s.up)}</p>
        <table class="nmap"><thead><tr>${s.head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>
        <p class="muted">Host script results:</p>
        <ul class="script">${scripts}</ul>
        <p class="muted">${esc(s.done)}</p>`;
    },
    experiencia(c) {
      return `<ol class="gitlog">${c.jobs.map((j) => `<li>${jobHtml(j)}</li>`).join('')}</ol>`;
    },
    pitangus(c) {
      const p = c.pitangus;
      return `<article class="card">
          <div class="card-head"><span class="pname">pitangus</span><span class="muted">${esc(p.meta)}</span></div>
          <p class="tagline">${esc(p.tagline)}</p>
          <p class="lead">${esc(p.lead)}</p>
          <ol class="pipeline">${p.steps.map(([s, d], i) =>
            `<li><span class="step"><span class="n">0${i + 1}</span>${esc(s)}</span><p>${esc(d)}</p></li>`).join('')}</ol>
          <p class="muted">${esc(p.supply)}</p>
          <p class="links">${ext(LINKS.pitangus, 'pitangus.dev')}${ext(LINKS.pitangusRepo, `github.com/Pitangus-Dev/pitangus (${p.repo})`)}</p>
        </article>`;
    },
    proyectos(c, inTerm) {
      return `<p class="muted">total ${c.projects.length}</p><ul class="ls">${c.projects.map((p) => `
        <li><span class="perm">${p.perm}</span><span class="fname">${p.href && !inTerm ? `<a href="${p.href}">${esc(p.name)}</a>` : esc(p.name)}</span><span class="desc">${esc(p.desc)}</span></li>`).join('')}</ul>`;
    },
    educacion(c) {
      const e = c.edu;
      return `<p class="file">==&gt; ${e.file1} &lt;==</p>${eduItems(e)}<p class="file">==&gt; ${e.file2} &lt;==</p>${eduCerts(e)}`;
    },
    contacto(c) {
      return `<p class="ok">${esc(c.contact.note)}</p>
        <dl class="kv">
          <dt>email</dt><dd><a href="mailto:${LINKS.email}">${LINKS.email}</a></dd>
          <dt>linkedin</dt><dd>${ext(LINKS.linkedin, 'linkedin.com/in/brayansstivens')}</dd>
          <dt>github</dt><dd>${ext(LINKS.github, 'github.com/BrayansStivens')}</dd>
        </dl>`;
    },
  };
  const eduItems = (e) => `<dl class="kv">${e.items.map(([d, title, school]) => `<dt>${esc(d)}</dt><dd><span class="hl">${esc(title)}</span><br>${esc(school)}</dd>`).join('')}</dl>`;
  const eduCerts = (e) => `<dl class="kv">${e.certs.map(([y, n]) => `<dt>${y}</dt><dd>${esc(n)}</dd>`).join('')}</dl>`;

  // Sistema de archivos de la terminal: cada carpeta es una sección
  const FILES = {
    whoami: (c) => [
      { n: c.files.profile, b: () => `<p>${esc(c.whoami.summary)}</p>` },
      { n: c.files.status, b: () => `<p><span class="ok">[ OK ]</span> ${esc(c.whoami.status)}</p>` },
    ],
    skills: (c) => c.skills.rows.map(([port, svc, ver]) => ({ n: svc, b: () => `<p><span class="muted">${port} open</span> ${esc(ver)}</p>` })),
    experiencia: (c) => c.jobs.map((j) => ({ n: slug(j.company), b: () => jobHtml(j) })),
    pitangus: (c) => [
      { n: 'README.md', b: () => `<p class="hl">${esc(c.pitangus.tagline)}</p><p>${esc(c.pitangus.lead)}</p>${c.pitangus.steps.map(([s, d], i) => `<p><span class="muted">0${i + 1}</span> <b>${esc(s)}</b> ${esc(d)}</p>`).join('')}` },
      { n: 'pitangus.dev', link: LINKS.pitangus },
      { n: 'repo.git', link: LINKS.pitangusRepo },
    ],
    proyectos: (c) => c.projects.map((p) => ({ n: p.name.replace(/\/$/, ''), b: () => `<p>${esc(p.desc)}</p>` })),
    educacion: (c) => [
      { n: c.edu.file1, b: () => eduItems(c.edu) },
      { n: c.edu.file2, b: () => eduCerts(c.edu) },
    ],
    contacto: () => [
      { n: 'email', link: `mailto:${LINKS.email}`, label: LINKS.email },
      { n: 'linkedin', link: LINKS.linkedin },
      { n: 'github', link: LINKS.github },
    ],
  };

  // ---------- Vista de perfil ----------
  function renderProfile() {
    const c = t();
    el.sections.innerHTML = ORDER.map((k) => {
      if (k === 'whoami') {
        return `<section class="block hero" id="s-whoami" aria-label="${esc(c.titles.whoami)}">
            <p class="login">${esc(loginLine())}</p>
            <div class="cmd">${ps1()} whoami</div>
            ${R.whoami(c, false)}
          </section>`;
      }
      return `<section class="block" id="s-${k}" aria-labelledby="h-${k}">
          <header class="sec-head">
            <h2 class="sec-title" id="h-${k}">${esc(c.titles[k])}</h2>
            <span class="sec-cmd" aria-hidden="true">$ ${esc(c.cmds[k])}</span>
          </header>
          <div class="output">${R[k](c, false)}</div>
        </section>`;
    }).join('');
    el.chips.innerHTML = ORDER.map((k) => `<a class="chip" href="#s-${k}" data-k="${k}">${esc(c.titles[k])}</a>`).join('');
  }

  function loginLine() {
    const c = t();
    const fmt = new Intl.DateTimeFormat(lang === 'es' ? 'es-CO' : 'en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    return `${c.ui.login}: ${fmt.format(new Date())} ${c.ui.tty}`;
  }

  // La ruta de la barra sigue a la sección visible
  let spy;
  function watchSections() {
    if (spy) spy.disconnect();
    if (!('IntersectionObserver' in window)) return;
    spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting || view !== 'profile') return;
        const k = e.target.id.slice(2);
        el.barPath.innerHTML = pathHtml(k === 'whoami' ? '~' : pathOf(k));
        el.chips.querySelectorAll('.chip').forEach((ch) => ch.classList.toggle('active', ch.dataset.k === k));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    el.sections.querySelectorAll('.block').forEach((b) => spy.observe(b));
  }

  // ---------- Vista de terminal ----------
  function setPrompt() {
    el.ps1.innerHTML = ps1(pathOf(cwd));
    if (view === 'terminal') el.barPath.innerHTML = pathHtml(pathOf(cwd));
  }

  function renderSuggest() {
    el.suggest.innerHTML = t().suggest.map((s) => `<button type="button" class="chip" data-cmd="${esc(s)}">${esc(s)}</button>`).join('');
  }

  function welcome() {
    const box = document.createElement('div');
    box.className = 'entry welcome';
    box.innerHTML = `<p class="muted">${esc(loginLine())}</p>
      <p class="banner">brayan@sepulveda</p>
      ${t().ui.welcome.map((l, i) => `<p class="${i ? 'muted' : 'strong'}">${esc(l)}</p>`).join('')}`;
    el.out.append(box);
  }

  const node = (cls, text) => { const p = document.createElement('p'); if (cls) p.className = cls; p.textContent = text; return p; };
  const errLine = (text) => node('err', text);

  function dirKey(s) {
    const k = ALIASES[s.toLowerCase()];
    return k || null;
  }

  // Resuelve una ruta relativa o absoluta (~/...) a { dir, file }; null si no existe
  function resolve(arg) {
    let cur = arg.startsWith('~') ? null : cwd;
    const segs = arg.replace(/^~\/?/, '').split('/').filter((s) => s && s !== '.');
    let file = null;
    for (let i = 0; i < segs.length; i++) {
      const s = segs[i];
      const last = i === segs.length - 1;
      if (s === '..') { if (file) return null; cur = null; continue; }
      if (file) return null;
      if (cur === null) {
        const k = dirKey(s);
        if (k) { cur = k; continue; }
        if (last && s.toLowerCase() === 'flag.txt') { file = 'flag.txt'; continue; }
        return null;
      }
      if (!last) return null;
      file = s;
    }
    return { dir: cur, file };
  }

  const findFile = (dir, name) => FILES[dir](t()).find((f) => f.n.toLowerCase() === name.toLowerCase());

  function listing(dir) {
    const c = t();
    if (dir === null) {
      const items = ORDER.map((k) => `<span class="dir">${esc(c.dirs[k])}/</span>`).concat('<span>flag.txt</span>');
      return `<div class="grid">${items.join('')}</div>`;
    }
    return `<div class="grid">${FILES[dir](c).map((f) => `<span${f.link ? ' class="lnk"' : ''}>${esc(f.n)}</span>`).join('')}</div>`;
  }

  function openUrl(url) {
    if (url.startsWith('mailto:')) location.href = url;
    else window.open(url, '_blank', 'noopener,noreferrer');
  }

  const OPEN = {
    pitangus: LINKS.pitangus, 'pitangus.dev': LINKS.pitangus, repo: LINKS.pitangusRepo, 'repo.git': LINKS.pitangusRepo,
    github: LINKS.github, linkedin: LINKS.linkedin, email: `mailto:${LINKS.email}`, mail: `mailto:${LINKS.email}`, cv: LINKS.linkedin,
  };

  function exec(line) {
    const c = t();
    const parts = line.split(/\s+/).filter(Boolean);
    if (!parts.length) return null;
    const cmd = parts[0].toLowerCase();
    const arg = parts[1] || '';

    // Una sección por su nombre imprime la sección completa
    if (ALIASES[cmd] && parts.length === 1) return R[ALIASES[cmd]](c, true);
    if (cmd === 'git' || cmd === 'nmap') return R[ALIASES[cmd]](c, true);

    switch (cmd) {
      case 'help': case 'ayuda': case 'man': case '?':
        return `<dl class="help">${c.help.map(([k, d]) => `<dt>${esc(k)}</dt><dd>${esc(d)}</dd>`).join('')}</dl>`;
      case 'ls': case 'dir': case 'll': {
        const target = parts.find((p, i) => i > 0 && !p.startsWith('-'));
        if (!target) return listing(cwd);
        const r = resolve(target);
        if (!r) return errLine(`ls: ${target}: ${c.msg.noSuch}`);
        if (r.file) {
          const ok = (r.dir === null && r.file === 'flag.txt') || (r.dir !== null && findFile(r.dir, r.file));
          return ok ? node('', r.file) : errLine(`ls: ${target}: ${c.msg.noSuch}`);
        }
        return listing(r.dir);
      }
      case 'cd': {
        if (!arg || arg === '~') { prevCwd = cwd; cwd = null; setPrompt(); return null; }
        if (arg === '-') { [cwd, prevCwd] = [prevCwd, cwd]; setPrompt(); return node('', pathOf(cwd)); }
        const r = resolve(arg);
        if (!r) return errLine(`cd: ${c.msg.noSuch}: ${arg}`);
        if (r.file) return errLine(`cd: ${c.msg.notDir}: ${arg}`);
        prevCwd = cwd; cwd = r.dir; setPrompt();
        return null;
      }
      case 'pwd':
        return node('', cwd ? `/home/brayan/${c.dirs[cwd]}` : '/home/brayan');
      case 'cat': case 'less': case 'more': case 'head': {
        if (!arg) return null;
        const r = resolve(arg);
        if (!r) return errLine(`cat: ${arg}: ${c.msg.noSuch}`);
        if (!r.file) return errLine(`cat: ${arg}: ${c.msg.isDir}`);
        if (r.dir === null) return errLine(c.msg.flag);
        const f = findFile(r.dir, r.file);
        if (!f) return errLine(`cat: ${arg}: ${c.msg.noSuch}`);
        return f.link ? `<p>${f.link.startsWith('mailto:') ? `<a href="${esc(f.link)}">${esc(f.label)}</a>` : ext(f.link, f.link)}</p>` : f.b();
      }
      case 'open': case 'xdg-open': case 'start': {
        if (!arg) return node('muted', c.msg.openUsage);
        let url = OPEN[arg.toLowerCase()];
        if (!url) {
          const r = resolve(arg);
          const f = r && r.dir && r.file && findFile(r.dir, r.file);
          url = f && f.link;
        }
        if (!url) return node('muted', c.msg.openUsage);
        openUrl(url);
        return node('ok', c.msg.opening + url.replace(/^mailto:/, ''));
      }
      case 'whoami':
        return R.whoami(c, true);
      case 'sudo': case 'su': case 'doas':
        return errLine(c.msg.sudo);
      case 'rm':
        return errLine(parts.some((a) => /^-\w*r/.test(a)) ? c.msg.rm : c.msg.rmDenied);
      case 'lang': case 'idioma': case 'language': {
        if (arg === 'es' || arg === 'en') { setLang(arg); return node('ok', T[lang].msg.lang); }
        return node('muted', c.msg.langUsage);
      }
      case 'theme': case 'tema':
        return node('muted', c.msg.theme);
      case 'history':
        return hist.map((h, i) => `<p><span class="muted">${String(i + 1).padStart(3, ' ')}</span>&nbsp;&nbsp;${esc(h)}</p>`).join('');
      case 'cv': case 'resume': case 'curriculum':
        return `<p>${esc(c.msg.cv)} ${ext(LINKS.linkedin, 'linkedin.com/in/brayansstivens')}</p>`;
      case 'date':
        return node('', new Date().toString());
      case 'echo':
        return node('', parts.slice(1).join(' '));
      case 'clear': case 'cls': case 'reset':
        return 'CLEAR';
      case 'exit': case 'logout': case 'quit': case 'salir': case 'gui': case 'perfil': case 'profile':
        return 'EXIT';
      default: {
        const wrap = document.createElement('div');
        wrap.append(errLine(c.msg.notFound + parts[0]), node('muted', c.msg.notFoundHint));
        return wrap;
      }
    }
  }

  function run(raw) {
    const line = raw.trim();
    if (line) { hist.push(line); hIdx = hist.length; }
    const path = pathOf(cwd);
    const res = exec(line);
    if (res === 'CLEAR') { el.out.innerHTML = ''; return; }
    if (res === 'EXIT') { setView('profile'); return; }
    const entry = document.createElement('div');
    entry.className = 'entry';
    const head = document.createElement('div');
    head.className = 'cmd';
    head.innerHTML = `${ps1(path)} `;
    head.append(document.createTextNode(line));
    entry.append(head);
    if (res) {
      const o = document.createElement('div');
      o.className = 'output';
      if (typeof res === 'string') o.innerHTML = res; else o.append(res);
      entry.append(o);
    }
    el.out.append(entry);
    requestAnimationFrame(() => { el.scroll.scrollTop = el.scroll.scrollHeight; });
  }

  // Autocompletado de comandos y rutas
  function complete() {
    const v = el.input.value;
    const parts = v.split(' ');
    const lastPart = parts[parts.length - 1];
    let pool;
    let prefix = lastPart;
    let base = '';
    if (parts.length === 1) {
      pool = COMMANDS;
    } else {
      const slash = lastPart.lastIndexOf('/');
      base = slash >= 0 ? lastPart.slice(0, slash + 1) : '';
      prefix = lastPart.slice(slash + 1);
      const r = base ? resolve(base) : { dir: cwd, file: null };
      if (!r || r.file) return;
      pool = r.dir === null
        ? ORDER.map((k) => `${t().dirs[k]}/`).concat('flag.txt')
        : FILES[r.dir](t()).map((f) => f.n);
    }
    const m = pool.filter((p) => p.toLowerCase().startsWith(prefix.toLowerCase()));
    if (!m.length) return;
    let fill;
    if (m.length === 1) fill = m[0] + (parts.length === 1 || !m[0].endsWith('/') ? ' ' : '');
    else {
      fill = m[0];
      m.forEach((x) => { while (!x.toLowerCase().startsWith(fill.toLowerCase())) fill = fill.slice(0, -1); });
      if (fill.length <= prefix.length) {
        // Varias opciones: se muestran como en una shell real
        const entry = document.createElement('div');
        entry.className = 'entry';
        entry.innerHTML = `<div class="grid">${m.map((x) => `<span>${esc(x)}</span>`).join('')}</div>`;
        el.out.append(entry);
        el.scroll.scrollTop = el.scroll.scrollHeight;
        return;
      }
    }
    parts[parts.length - 1] = base + fill;
    el.input.value = parts.join(' ');
  }

  // ---------- Vistas, idioma y arranque ----------
  function setView(v, focus = true) {
    view = v === 'terminal' ? 'terminal' : 'profile';
    const isTerm = view === 'terminal';
    store.set('view', view);
    el.term.classList.toggle('is-term', isTerm);
    el.profile.hidden = isTerm;
    el.console.hidden = !isTerm;
    el.chips.hidden = isTerm;
    el.viewProfile.setAttribute('aria-pressed', String(!isTerm));
    el.viewTerm.setAttribute('aria-pressed', String(isTerm));
    el.skip.href = isTerm ? '#prompt' : '#profile';
    el.skip.textContent = isTerm ? t().ui.skipTerm : t().ui.skipProfile;
    history.replaceState(null, '', isTerm ? '#terminal' : location.pathname + location.search);
    if (isTerm) {
      if (!welcomed) { welcome(); welcomed = true; }
      setPrompt();
      window.scrollTo(0, 0);
      if (focus) el.input.focus({ preventScroll: true });
      el.scroll.scrollTop = el.scroll.scrollHeight;
    } else {
      el.barPath.innerHTML = pathHtml('~');
    }
  }

  function setLang(l) {
    lang = l === 'en' ? 'en' : 'es';
    store.set('lang', lang);
    const c = t();
    document.documentElement.lang = lang;
    document.title = c.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', c.desc);
    el.langBtn.textContent = c.ui.lang;
    el.langBtn.setAttribute('aria-label', c.ui.langLabel);
    el.viewGroup.setAttribute('aria-label', c.ui.view);
    el.viewProfile.textContent = c.ui.profile;
    el.viewTerm.textContent = c.ui.terminal;
    el.chips.setAttribute('aria-label', c.ui.chips);
    el.input.placeholder = c.ui.placeholder;
    el.skip.textContent = view === 'terminal' ? c.ui.skipTerm : c.ui.skipProfile;
    renderProfile();
    renderSuggest();
    setPrompt();
    watchSections();
  }

  // Eventos
  el.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = el.input.value;
    el.input.value = '';
    run(v);
  });

  el.input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      if (!hist.length) return;
      e.preventDefault();
      hIdx = Math.max(0, hIdx - 1);
      el.input.value = hist[hIdx];
    } else if (e.key === 'ArrowDown') {
      if (!hist.length) return;
      e.preventDefault();
      hIdx = Math.min(hist.length, hIdx + 1);
      el.input.value = hist[hIdx] || '';
    } else if (e.key === 'Tab' && el.input.value.trim()) {
      // Con el campo vacío, Tab conserva la navegación por teclado
      e.preventDefault();
      complete();
    } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      el.out.innerHTML = '';
    } else if (e.ctrlKey && e.key.toLowerCase() === 'c' && !String(window.getSelection())) {
      e.preventDefault();
      const entry = document.createElement('div');
      entry.className = 'entry';
      entry.innerHTML = `<div class="cmd">${ps1(pathOf(cwd))} </div>`;
      entry.firstChild.append(document.createTextNode(`${el.input.value}^C`));
      el.out.append(entry);
      el.input.value = '';
      el.scroll.scrollTop = el.scroll.scrollHeight;
    }
  });

  el.suggest.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cmd]');
    if (!b) return;
    run(b.dataset.cmd);
    if (matchMedia('(pointer: fine)').matches) el.input.focus({ preventScroll: true });
  });

  el.chips.addEventListener('click', (e) => {
    const a = e.target.closest('.chip');
    if (!a) return;
    e.preventDefault();
    const target = document.getElementById(`s-${a.dataset.k}`);
    if (target) target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  });

  el.sections.addEventListener('click', (e) => {
    if (e.target.closest('[data-open-term]')) setView('terminal');
  });

  el.viewProfile.addEventListener('click', () => setView('profile'));
  el.viewTerm.addEventListener('click', () => setView('terminal'));
  el.langBtn.addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es'));

  // Un clic en la terminal enfoca el prompt (solo con ratón y sin texto seleccionado)
  el.scroll.addEventListener('click', (e) => {
    if (!matchMedia('(pointer: fine)').matches) return;
    if (e.target.closest('a, button, input')) return;
    if (String(window.getSelection())) return;
    el.input.focus({ preventScroll: true });
  });

  // Ctrl/Cmd+K abre la terminal desde cualquier vista
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      setView(view === 'terminal' ? 'profile' : 'terminal');
    }
  });

  window.addEventListener('hashchange', () => setView(location.hash === '#terminal' ? 'terminal' : view));

  // Arranque
  const params = new URLSearchParams(location.search);
  const initialLang = params.get('lang') || store.get('lang') || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en');
  setLang(initialLang);
  setView(location.hash === '#terminal' ? 'terminal' : 'profile', false);

  console.log('%cbrayan@sepulveda', 'color:#4ade80;font:700 14px monospace');
  console.log(lang === 'es'
    ? '¿Revisando el código? Bien. Hay una flag escondida en este sitio.'
    : 'Reading the source? Good. There is a flag hidden on this site.');
})();
