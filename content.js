// Contenido y renderizado del portfolio. Lo usan el navegador (main.js)
// y el build estático (scripts/build.mjs), así que aquí no se toca el DOM.

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const LINKS = {
  email: 'brayanstivens66@gmail.com',
  linkedin: 'https://www.linkedin.com/in/brayansstivens',
  github: 'https://github.com/BrayansStivens',
  pitangus: 'https://pitangus.dev',
  pitangusRepo: 'https://github.com/Pitangus-Dev/pitangus',
  cv: (lang) => `/cv/brayan-sepulveda-cv-${lang}.pdf`,
};

export const mailto = (subject) => `mailto:${LINKS.email}?subject=${encodeURIComponent(subject)}`;

export const ORDER = ['whoami', 'ia', 'servicios', 'skills', 'experiencia', 'pitangus', 'proyectos', 'educacion', 'contacto'];

export const T = {
  es: {
    title: 'Brayan Sepúlveda · AppSec, DevSecOps y seguridad de IA',
    desc: 'Ingeniero de software y AppSec en Medellín. Automatizo SAST, DAST, SCA e IaC en CI/CD, aseguro código y apps con IA (OWASP LLM) y creé Pitangus.',
    code: 'es',
    ogLocale: 'es_CO',
    jobTitle: 'Ingeniero de software · AppSec / DevSecOps · Seguridad de IA',
    ui: {
      lang: 'EN', langLabel: 'Switch to English',
      view: 'Vista', profile: 'perfil', terminal: 'terminal',
      chips: 'Secciones', skipProfile: 'Ir al contenido', skipTerm: 'Ir a la terminal',
      login: 'Último acceso', tty: 'en ttys001',
      placeholder: 'escribe help',
      welcome: [
        'Bienvenido a la terminal de Brayan Sepúlveda.',
        'Funciona como una consola real: ls, cd, cat, open, Tab para autocompletar y flechas para el historial.',
        'Escribe help para ver todo, o pulsa un comando de abajo. Lo que lista ls también se puede pulsar. exit vuelve a la vista de perfil.',
      ],
    },
    titles: { whoami: 'Sobre mí', ia: 'IA aplicada', servicios: 'Servicios', skills: 'Habilidades', experiencia: 'Experiencia', pitangus: 'Pitangus', proyectos: 'Proyectos', educacion: 'Educación', contacto: 'Contacto' },
    dirs: { whoami: 'sobre-mi', ia: 'ia', servicios: 'servicios', skills: 'skills', experiencia: 'experiencia', pitangus: 'pitangus', proyectos: 'proyectos', educacion: 'educacion', contacto: 'contacto' },
    files: { profile: 'perfil.txt', status: 'estado.txt' },
    cta: { mail: 'Escríbeme', linkedin: 'LinkedIn', cv: 'Descargar CV', terminal: 'Abrir terminal' },
    cmds: {
      whoami: 'whoami',
      ia: 'cat ia/*.md',
      servicios: 'systemctl list-units --type=service',
      skills: 'nmap -sV --script=skills brayan',
      experiencia: 'git log --graph experiencia',
      pitangus: 'pitangus --about',
      proyectos: 'ls -l ~/proyectos',
      educacion: 'cat educacion.txt certificaciones.txt',
      contacto: 'contact --secure',
    },
    whoami: {
      role: 'Ingeniero de software · AppSec / DevSecOps · Seguridad de IA',
      place: 'Medellín, Colombia · UTC−5 · 4+ años en software, 2+ en seguridad',
      summary: 'Llevo más de cuatro años construyendo software y más de dos asegurándolo. En Siigo lidero la gestión de vulnerabilidades: automatizo SAST, DAST, SCA, secretos e IaC dentro de los pipelines para que los equipos corrijan antes de desplegar, y priorizo por riesgo real, no por volumen de alertas. Trabajo con agentes de IA a diario y sé dónde fallan: reviso el código que generan y las aplicaciones con LLM.',
      status: 'Disponible para proyectos freelance y consultoría en AppSec, DevSecOps y seguridad de IA.',
    },
    ia: {
      lead: 'Uso IA para entregar más rápido y sé cómo asegurarla. Las dos cosas a la vez, con revisión humana en cada paso.',
      items: [
        ['desarrollo con agentes', 'Construyo con agentes de IA como Claude Code y reviso cada cambio: diff, pruebas y auditoría de seguridad antes del merge. Pitangus se desarrolló así.', 'agentes.md'],
        ['código generado por IA', 'Detecto los errores que más repite el código escrito con IA. Pitangus trae reglas propias para eso y para el control de acceso en Supabase y Firebase.', 'codigo-ia.md'],
        ['aplicaciones con LLM', 'Reviso aplicaciones con LLM, agentes y RAG: prompt injection, salida sin validar, fuga de datos y agencia excesiva, según el OWASP Top 10 para LLM y MITRE ATLAS.', 'apps-llm.md'],
        ['operación de seguridad', 'En Siigo uso IA para acelerar el triage de hallazgos, la redacción de reportes y la recolección de evidencias de auditoría.', 'operacion.md'],
      ],
      rule: 'Regla de trabajo: la herramienta propone, yo dispongo. Verifico cada hallazgo y cada cambio antes de aplicarlo.',
    },
    servicios: {
      lead: 'Trabajo por proyecto, en remoto. Estos son los encargos que mejor resuelvo:',
      deliv: 'Entrego',
      ask: 'Pedir propuesta',
      items: [
        {
          unit: 'appsec-audit.service', name: 'Auditoría AppSec',
          desc: 'Reviso un repositorio o una aplicación: código, dependencias, secretos, IaC y pipeline. Cada hallazgo, verificado y priorizado por riesgo real.',
          deliv: 'informe con hallazgos verificados y plan de remediación por prioridad.',
          subject: 'Auditoría AppSec',
        },
        {
          unit: 'devsecops-ci.service', name: 'DevSecOps en tu CI/CD',
          desc: 'Integro SAST, SCA, secretos e IaC en GitHub Actions u otro CI, con umbrales que frenan lo grave sin bloquear al equipo.',
          deliv: 'pipelines configurados, políticas documentadas y traspaso al equipo.',
          subject: 'DevSecOps en CI/CD',
        },
        {
          unit: 'ai-security.service', name: 'Seguridad de IA',
          desc: 'Reviso aplicaciones con LLM, agentes o RAG y el código escrito con IA: prompt injection, fuga de datos, permisos excesivos.',
          deliv: 'informe según el OWASP Top 10 para LLM, con correcciones concretas.',
          subject: 'Seguridad de IA',
        },
        {
          unit: 'compliance-evidence.service', name: 'Cumplimiento y evidencias',
          desc: 'Preparo los controles técnicos y las evidencias para una auditoría SOC 2 o ISO 27001 a partir de lo que ya tienes.',
          deliv: 'mapa de controles, evidencias técnicas y brechas por cerrar.',
          subject: 'Cumplimiento SOC 2 / ISO 27001',
        },
      ],
      more: '¿Necesitas software a medida? Lo construimos con seguridad desde el diseño en Arodium, la empresa que cofundé.',
    },
    skills: {
      report: 'Nmap scan report for brayan (Medellín, CO)',
      up: 'Host is up (0.0012s latency).',
      head: ['PORT', 'STATE', 'SERVICE', 'VERSION'],
      rows: [
        ['443/tcp', 'appsec', 'SAST · DAST · SCA · IaC · detección de secretos · modelado de amenazas'],
        ['22/tcp', 'secops', 'Gestión de vulnerabilidades (TVM) · triage de pentest · remediación'],
        ['8443/tcp', 'devsecops', 'GitHub Enterprise · GitHub Actions · CI/CD · shift-left'],
        ['11434/tcp', 'ai-security', 'OWASP Top 10 para LLM · prompt injection · MITRE ATLAS · código generado por IA'],
        ['2376/tcp', 'containers', 'Docker · Trivy · Grype · Checkov'],
        ['9443/tcp', 'grc', 'Evidencias de auditoría · SOC 2 · ISO 27001 · cumplimiento normativo'],
        ['3000/tcp', 'fullstack', 'Node.js · NestJS · React · Angular · Python · diseño SOLID'],
        ['5432/tcp', 'data', 'PostgreSQL · SQL · NoSQL'],
      ],
      scripts: [
        ['lenguajes', 'Python, JavaScript, TypeScript, Shell, Go, C#, Java, PHP'],
        ['iac', 'Terraform, Docker, Azure'],
        ['herramientas', 'Checkov, Grype, Trivy, Dependabot, Betterleaks, TruffleHog, Opengrep, OSV-Scanner, zizmor, Fluid Attacks'],
        ['ia', 'Claude Code y agentes de IA, OWASP Top 10 para LLM, MITRE ATLAS'],
      ],
      done: 'Nmap done: 1 IP address (1 host up) scanned',
    },
    jobs: [
      {
        hash: 'a3f9c21', head: true, company: 'Siigo', role: 'SecOps / Desarrollador FullStack', date: 'mar 2024 — hoy · Medellín',
        bullets: [
          'Lidero los dominios TVM (Threat & Vulnerability Management) e IPY (Information Protection & Governance), alineados con la estrategia global de ciberseguridad.',
          'Automaticé la detección y remediación temprana en los pipelines (SAST, DAST, SCA, secretos e IaC) para acortar el tiempo de exposición de cada vulnerabilidad.',
          'Integré escaneo continuo con Checkov, Grype, Trivy, Dependabot, Betterleaks, TruffleHog y Fluid Attacks junto al equipo SRE.',
          'Administro GitHub Enterprise: controles de acceso, políticas de seguridad y flujos automatizados para los equipos de ingeniería.',
          'Gestiono los reportes de pentesting internos y externos y coordino con desarrollo los planes de mitigación hasta el cierre.',
          'Agilicé la recolección de evidencias para auditorías GRC e incorporé IA al triage de hallazgos y a los reportes, siempre con validación humana.',
        ],
        tags: ['GitHub Enterprise', 'GitHub Actions', 'Terraform', 'Docker', 'Python', 'Go', 'Azure', 'IA'],
      },
      {
        hash: '7be1d04', company: 'Elite Automation Group', role: 'Desarrollador de software', date: 'ago 2023 — mar 2024',
        bullets: [
          'Automaticé la gestión masiva de tiendas en Amazon y Walmart con sus APIs oficiales, reduciendo tiempos operativos y errores manuales.',
          'Construí software interno para administradores y operarios de bodega en EE. UU.: logística, devoluciones e inventario.',
        ],
        tags: ['Python', 'JavaScript', 'APIs de Amazon y Walmart'],
      },
      {
        hash: '51c0e9a', company: 'Operación Éxito Colombia', role: 'Desarrollador de software', date: 'feb 2023 — sep 2023',
        bullets: [
          'Único desarrollador de la compañía: diseñé, construí y mantuve todo su software a medida.',
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
      lead: 'Las herramientas de seguridad avisan mucho y demuestran poco. Pitangus es AppSec autoalojado y de código abierto: prioriza lo explotable, dice cómo corregirlo y comprueba que la corrección funcionó, sin enviar tu código a ningún lado. Lo diseñé y lo construí con agentes de IA; hoy lo publica Arodium, la empresa que cofundé.',
      steps: [
        ['detectar', 'Siete motores open source y 66 reglas propias, incluidas las de errores típicos del código escrito con IA.'],
        ['priorizar', 'Cada aviso se cruza con CISA KEV y EPSS.'],
        ['corregir', 'El comando exacto para tu gestor de paquetes.'],
        ['verificar', 'Reverify y checks en el PR que pueden bloquear el merge.'],
        ['vigilar', 'Reescaneo con cada cambio y alertas a Slack, Teams o webhook.'],
        ['demostrar', 'Evidencias para SOC 2 e ISO 27001, SARIF y reportes PDF.'],
      ],
      supply: 'Cadena de suministro verificable: imágenes fijadas por digest, releases firmadas y OpenSSF Scorecard público.',
      repo: 'código fuente',
      case: {
        problemT: 'El problema',
        problem: 'Un equipo pequeño que quiere AppSec acaba con cinco herramientas sueltas, alertas duplicadas, ninguna prioridad clara y servicios que le piden subir su código a la nube.',
        decisionsT: 'Decisiones',
        decisions: [
          'Autoalojado y AGPL-3.0: el código y los hallazgos nunca salen de tu servidor.',
          'Un solo servicio sobre FastAPI, PostgreSQL y React que orquesta siete motores abiertos y elimina los duplicados entre ellos.',
          'Priorizar por explotabilidad real (CISA KEV y EPSS), no por la severidad que declara cada herramienta.',
          'Cerrar el ciclo: guía de corrección por gestor de paquetes, Reverify y checks en el PR.',
          'Cadena de suministro verificable: motores fijados por digest e imágenes firmadas y analizadas con Trivy antes de publicarse.',
          'Desarrollado con agentes de IA, con una auditoría de seguridad antes de cada PR.',
        ],
        resultT: 'Resultado',
        results: [
          'Beta pública v0.15, en inglés y español, con releases firmadas.',
          'Se instala con Docker en menos de un minuto más las descargas, usando imágenes precompiladas.',
          'OpenSSF Scorecard público y proyecto registrado en OpenSSF Best Practices.',
          'Evidencias listas para SOC 2 e ISO 27001 y modelado de amenazas ligado a los hallazgos reales.',
        ],
        featuresT: 'Qué hace',
        shotsT: 'Capturas con datos de prueba (organización ficticia).',
        shots: [
          { src: '/img/pitangus/pitangus-overview-es.webp', w: 1800, h: 1125, alt: 'Resumen del panel de Pitangus: puntuación de riesgo, hallazgos abiertos, plazos, tasa de corrección y vulnerabilidades en CISA KEV', caption: 'Resumen: riesgo, plazos y lo que ya está en explotación activa.' },
          { src: '/img/pitangus/pitangus-findings-es.webp', w: 1800, h: 1125, alt: 'Hallazgos de una organización en Pitangus priorizados en actuar ya, atender, críticos y en CISA KEV', caption: 'Hallazgos de toda una organización, priorizados.' },
          { src: '/img/pitangus/pitangus-fix-es.webp', w: 1800, h: 1125, alt: 'Detalle de un hallazgo en Pitangus con CISA KEV, EPSS, la guía para corregirlo, el comando exacto y el botón Reverificar', caption: 'Cómo corregirlo, con el comando exacto y Reverificar.' },
        ],
      },
    },
    projects: [
      { perm: 'drwxr-xr-x', name: 'pitangus/', href: '#s-pitangus', desc: 'AppSec autoalojado y de código abierto, construido con agentes de IA. Detalle arriba.' },
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
      ['ia', 'cómo uso y aseguro la IA'],
      ['servicios', 'qué puedo hacer por ti'],
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
    suggest: ['help', 'whoami', 'ia', 'servicios', 'ls', 'cd pitangus', 'cat README.md', 'experiencia', 'contacto', 'exit'],
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
      cv: 'CV en PDF:',
      openUsage: 'uso: open pitangus | repo | github | linkedin | email | cv',
      opening: 'Abriendo ',
      fileHint: (n) => `${n} es un archivo. Para leerlo: cat ${n}`,
      foundAt: (p) => `Está en ${p}. Prueba: cat ${p}`,
    },
  },

  en: {
    title: 'Brayan Sepúlveda · AppSec, DevSecOps & AI Security Engineer',
    desc: 'Software and AppSec engineer in Medellín, Colombia. I automate SAST, DAST, SCA and IaC in CI/CD, secure AI code and LLM apps, and built Pitangus.',
    code: 'en',
    ogLocale: 'en_US',
    jobTitle: 'Software engineer · AppSec / DevSecOps · AI security',
    ui: {
      lang: 'ES', langLabel: 'Cambiar a español',
      view: 'View', profile: 'profile', terminal: 'terminal',
      chips: 'Sections', skipProfile: 'Skip to content', skipTerm: 'Skip to the terminal',
      login: 'Last login', tty: 'on ttys001',
      placeholder: 'type help',
      welcome: [
        'Welcome to Brayan Sepúlveda\'s terminal.',
        'It works like a real shell: ls, cd, cat, open, Tab to complete and arrow keys for history.',
        'Type help to list everything, or tap a command below. Whatever ls lists can be tapped too. exit takes you back to the profile view.',
      ],
    },
    titles: { whoami: 'About', ia: 'Applied AI', servicios: 'Services', skills: 'Skills', experiencia: 'Experience', pitangus: 'Pitangus', proyectos: 'Projects', educacion: 'Education', contacto: 'Contact' },
    dirs: { whoami: 'about', ia: 'ai', servicios: 'services', skills: 'skills', experiencia: 'experience', pitangus: 'pitangus', proyectos: 'projects', educacion: 'education', contacto: 'contact' },
    files: { profile: 'profile.txt', status: 'status.txt' },
    cta: { mail: 'Email me', linkedin: 'LinkedIn', cv: 'Download CV', terminal: 'Open terminal' },
    cmds: {
      whoami: 'whoami',
      ia: 'cat ai/*.md',
      servicios: 'systemctl list-units --type=service',
      skills: 'nmap -sV --script=skills brayan',
      experiencia: 'git log --graph experience',
      pitangus: 'pitangus --about',
      proyectos: 'ls -l ~/projects',
      educacion: 'cat education.txt certifications.txt',
      contacto: 'contact --secure',
    },
    whoami: {
      role: 'Software engineer · AppSec / DevSecOps · AI security',
      place: 'Medellín, Colombia · UTC−5 · 4+ years building software, 2+ in security',
      summary: 'I have spent more than four years building software and more than two securing it. At Siigo I lead vulnerability management: I automate SAST, DAST, SCA, secret and IaC scanning inside the pipelines so teams fix issues before they ship, and I prioritize by real risk, not alert volume. I work with AI agents every day and know where they fail: I review the code they write and the LLM applications built on them.',
      status: 'Available for freelance projects and consulting in AppSec, DevSecOps and AI security.',
    },
    ia: {
      lead: 'I use AI to ship faster and I know how to secure it. Both at once, with a human review at every step.',
      items: [
        ['agentic development', 'I build with AI agents such as Claude Code and review every change: diff, tests and a security audit before the merge. Pitangus was built this way.', 'agents.md'],
        ['AI-generated code', 'I catch the mistakes AI-written code makes most often. Pitangus ships its own rules for them and for Supabase and Firebase access control.', 'ai-code.md'],
        ['LLM applications', 'I review LLM, agent and RAG applications for prompt injection, unvalidated output, data leakage and excessive agency, following the OWASP Top 10 for LLM Applications and MITRE ATLAS.', 'llm-apps.md'],
        ['security operations', 'At Siigo I use AI to speed up finding triage, report writing and audit evidence collection.', 'operations.md'],
      ],
      rule: 'Working rule: the tool proposes, I decide. I verify every finding and every change before applying it.',
    },
    servicios: {
      lead: 'I work per project, remotely. These are the engagements I deliver best:',
      deliv: 'Deliverable',
      ask: 'Request a proposal',
      items: [
        {
          unit: 'appsec-audit.service', name: 'AppSec audit',
          desc: 'I review a repository or an application: code, dependencies, secrets, IaC and pipeline. Every finding verified and ranked by real risk.',
          deliv: 'a report of verified findings and a prioritized remediation plan.',
          subject: 'AppSec audit',
        },
        {
          unit: 'devsecops-ci.service', name: 'DevSecOps in your CI/CD',
          desc: 'I wire SAST, SCA, secret and IaC scanning into GitHub Actions or your CI, with thresholds that stop what matters without blocking the team.',
          deliv: 'configured pipelines, documented policies and a handover to your team.',
          subject: 'DevSecOps in CI/CD',
        },
        {
          unit: 'ai-security.service', name: 'AI security',
          desc: 'I review LLM, agent and RAG applications and AI-written code: prompt injection, data leakage, excessive permissions.',
          deliv: 'a report mapped to the OWASP Top 10 for LLM Applications, with concrete fixes.',
          subject: 'AI security',
        },
        {
          unit: 'compliance-evidence.service', name: 'Compliance and evidence',
          desc: 'I prepare the technical controls and evidence for a SOC 2 or ISO 27001 audit, starting from what you already have.',
          deliv: 'a control map, technical evidence and the gaps left to close.',
          subject: 'SOC 2 / ISO 27001 compliance',
        },
      ],
      more: 'Need custom software? We build it secure by design at Arodium, the company I co-founded.',
    },
    skills: {
      report: 'Nmap scan report for brayan (Medellín, CO)',
      up: 'Host is up (0.0012s latency).',
      head: ['PORT', 'STATE', 'SERVICE', 'VERSION'],
      rows: [
        ['443/tcp', 'appsec', 'SAST · DAST · SCA · IaC · secret detection · threat modeling'],
        ['22/tcp', 'secops', 'Vulnerability management (TVM) · pentest triage · remediation'],
        ['8443/tcp', 'devsecops', 'GitHub Enterprise · GitHub Actions · CI/CD · shift-left'],
        ['11434/tcp', 'ai-security', 'OWASP Top 10 for LLM · prompt injection · MITRE ATLAS · AI-generated code'],
        ['2376/tcp', 'containers', 'Docker · Trivy · Grype · Checkov'],
        ['9443/tcp', 'grc', 'Audit evidence · SOC 2 · ISO 27001 · regulatory compliance'],
        ['3000/tcp', 'fullstack', 'Node.js · NestJS · React · Angular · Python · SOLID design'],
        ['5432/tcp', 'data', 'PostgreSQL · SQL · NoSQL'],
      ],
      scripts: [
        ['languages', 'Python, JavaScript, TypeScript, Shell, Go, C#, Java, PHP'],
        ['iac', 'Terraform, Docker, Azure'],
        ['tooling', 'Checkov, Grype, Trivy, Dependabot, Betterleaks, TruffleHog, Opengrep, OSV-Scanner, zizmor, Fluid Attacks'],
        ['ai', 'Claude Code and AI agents, OWASP Top 10 for LLM, MITRE ATLAS'],
      ],
      done: 'Nmap done: 1 IP address (1 host up) scanned',
    },
    jobs: [
      {
        hash: 'a3f9c21', head: true, company: 'Siigo', role: 'SecOps / Full-stack developer', date: 'Mar 2024 — present · Medellín',
        bullets: [
          'Lead the TVM (Threat & Vulnerability Management) and IPY (Information Protection & Governance) domains, aligned with the company-wide security strategy.',
          'Automated early detection and remediation in the pipelines (SAST, DAST, SCA, secrets and IaC) to shorten each vulnerability\'s exposure window.',
          'Integrated continuous scanning with Checkov, Grype, Trivy, Dependabot, Betterleaks, TruffleHog and Fluid Attacks alongside the SRE team.',
          'Run GitHub Enterprise: access controls, security policies and automated workflows for the engineering teams.',
          'Manage internal and external pentest reports and drive mitigation plans with development through to closure.',
          'Streamlined evidence collection for GRC audits and brought AI into finding triage and reporting, always with human validation.',
        ],
        tags: ['GitHub Enterprise', 'GitHub Actions', 'Terraform', 'Docker', 'Python', 'Go', 'Azure', 'AI'],
      },
      {
        hash: '7be1d04', company: 'Elite Automation Group', role: 'Software developer', date: 'Aug 2023 — Mar 2024',
        bullets: [
          'Automated large-scale management of Amazon and Walmart stores through their official APIs, cutting operating time and manual errors.',
          'Built internal software for warehouse managers and operators in the US: logistics, returns and inventory.',
        ],
        tags: ['Python', 'JavaScript', 'Amazon and Walmart APIs'],
      },
      {
        hash: '51c0e9a', company: 'Operación Éxito Colombia', role: 'Software developer', date: 'Feb 2023 — Sep 2023',
        bullets: [
          'Sole developer at the company: designed, built and maintained all of its custom software.',
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
      lead: 'Security tools warn a lot and prove little. Pitangus is self-hosted, open-source AppSec: it prioritizes what is exploitable, tells you how to fix it and confirms the fix worked, without sending your code anywhere. I designed it and built it with AI agents; it is now published by Arodium, the company I co-founded.',
      steps: [
        ['find', 'Seven open-source engines and 66 custom rules, including rules for the typical mistakes in AI-written code.'],
        ['prioritize', 'Every advisory is checked against CISA KEV and EPSS.'],
        ['fix', 'The exact command for your package manager.'],
        ['verify', 'Reverify, plus pull request checks that can block the merge.'],
        ['watch', 'Rescans on every change and alerts to Slack, Teams or a webhook.'],
        ['prove', 'SOC 2 and ISO 27001 evidence, SARIF and PDF reports.'],
      ],
      supply: 'A supply chain you can check: digest-pinned images, signed releases and a public OpenSSF Scorecard.',
      repo: 'source code',
      case: {
        problemT: 'The problem',
        problem: 'A small team that wants AppSec ends up with five disconnected tools, duplicate alerts, no clear priority and services that ask them to upload their code to the cloud.',
        decisionsT: 'Decisions',
        decisions: [
          'Self-hosted and AGPL-3.0: code and findings never leave your server.',
          'A single service on FastAPI, PostgreSQL and React that orchestrates seven open engines and removes duplicates across them.',
          'Prioritize by real exploitability (CISA KEV and EPSS), not by the severity each tool reports.',
          'Close the loop: per-package-manager fix guidance, Reverify and pull request checks.',
          'A verifiable supply chain: digest-pinned engines and images signed and scanned with Trivy before release.',
          'Built with AI agents, with a security audit before every pull request.',
        ],
        resultT: 'Outcome',
        results: [
          'Public beta v0.15, in English and Spanish, with signed releases.',
          'Installs with Docker in under a minute plus downloads, using prebuilt images.',
          'Public OpenSSF Scorecard and a project registered with OpenSSF Best Practices.',
          'Evidence ready for SOC 2 and ISO 27001, and threat modeling tied to real findings.',
        ],
        featuresT: 'What it does',
        shotsT: 'Screenshots with test data (fictional organization).',
        shots: [
          { src: '/img/pitangus/pitangus-overview-en.webp', w: 1800, h: 1125, alt: 'Pitangus panel overview: risk score, open findings, deadlines, fix rate and vulnerabilities in CISA KEV', caption: 'Overview: risk, deadlines and what is already being exploited.' },
          { src: '/img/pitangus/pitangus-findings-en.webp', w: 1800, h: 1125, alt: 'Findings for an organization in Pitangus ranked into act now, attend, critical and CISA KEV', caption: 'Findings across a whole organization, prioritized.' },
          { src: '/img/pitangus/pitangus-fix-en.webp', w: 1800, h: 1125, alt: 'Pitangus finding detail with CISA KEV, EPSS, fix guidance, the exact command and the Reverify button', caption: 'How to fix it, with the exact command and Reverify.' },
        ],
      },
    },
    projects: [
      { perm: 'drwxr-xr-x', name: 'pitangus/', href: '#s-pitangus', desc: 'Self-hosted, open-source AppSec, built with AI agents. Details above.' },
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
      ['ai', 'how I use and secure AI'],
      ['services', 'what I can do for you'],
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
    suggest: ['help', 'whoami', 'ai', 'services', 'ls', 'cd pitangus', 'cat README.md', 'experience', 'contact', 'exit'],
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
      cv: 'CV as PDF:',
      openUsage: 'usage: open pitangus | repo | github | linkedin | email | cv',
      opening: 'Opening ',
      fileHint: (n) => `${n} is a file. To read it: cat ${n}`,
      foundAt: (p) => `It lives at ${p}. Try: cat ${p}`,
    },
  },
};

export const ext = (href, label) => `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
// VT323 dibuja mal la virgulilla: va en la fuente del texto
export const pathHtml = (path) => esc(path).replace('~', '<span class="tl">~</span>');
export const ps1 = (path = '~') => `<span class="ps1"><span class="u">brayan@sepulveda</span><span class="p">:</span><span class="d">${pathHtml(path)}</span><span class="p">$</span></span>`;

// ---------- Contenido de cada sección (compartido por las dos vistas) ----------
export const jobHtml = (j) => `
  <div class="commit"><span class="hash">${j.hash}</span>${j.head ? ' <span class="ref">(HEAD -&gt; main)</span>' : ''} ${esc(j.company)} · ${esc(j.role)}</div>
  <div class="meta">${esc(j.date)}</div>
  <ul class="bullets">${j.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
  <ul class="tags">${j.tags.map((g) => `<li>${esc(g)}</li>`).join('')}</ul>`;

export const R = {
  whoami(c, inTerm) {
    const w = c.whoami;
    const name = 'Brayan Stivens<br>Sepúlveda Molina';
    const cta = inTerm ? '' : `<div class="cta">
        <a class="btn-cta primary" href="mailto:${LINKS.email}">${esc(c.cta.mail)}</a>
        <a class="btn-cta" href="${LINKS.linkedin}" target="_blank" rel="noopener noreferrer">${esc(c.cta.linkedin)}</a>
        <a class="btn-cta" href="${LINKS.cv(c.code)}" download>${esc(c.cta.cv)}</a>
        <button type="button" class="btn-cta ghost" data-open-term>${esc(c.cta.terminal)}</button>
      </div>`;
    return `${inTerm ? `<p class="name">${name}</p>` : `<h1 class="name">${name}<span class="cursor" aria-hidden="true"></span></h1>`}
      <p class="role">${esc(w.role)}</p>
      <p class="muted">${esc(w.place)}</p>
      <p class="summary">${esc(w.summary)}</p>
      <p class="status"><span class="ok">[ OK ]</span> ${esc(w.status)}</p>${cta}`;
  },
  ia(c) {
    const a = c.ia;
    return `<p class="lead">${esc(a.lead)}</p>
      <ol class="pipeline ai">${a.items.map(([s, d], i) =>
        `<li><span class="step"><span class="n">0${i + 1}</span>${esc(s)}</span><p>${esc(d)}</p></li>`).join('')}</ol>
      <p class="rule"><span class="ok">$</span> ${esc(a.rule)}</p>`;
  },
  servicios(c) {
    const v = c.servicios;
    return `<p class="lead">${esc(v.lead)}</p>
      <ul class="services">${v.items.map((it) => `
        <li class="svc">
          <div class="svc-unit"><span class="ok">active</span> ${esc(it.unit)}</div>
          <h3 class="svc-name">${esc(it.name)}</h3>
          <p>${esc(it.desc)}</p>
          <p class="svc-deliv"><span class="muted">${esc(v.deliv)}:</span> ${esc(it.deliv)}</p>
          <a class="svc-cta" href="${esc(mailto(it.subject))}">${esc(v.ask)}</a>
        </li>`).join('')}</ul>
      <p class="muted">${esc(v.more)}</p>`;
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
        <div class="case">
          <div><h3 class="case-h">${esc(p.case.problemT)}</h3><p>${esc(p.case.problem)}</p></div>
          <div><h3 class="case-h">${esc(p.case.decisionsT)}</h3><ul class="bullets">${p.case.decisions.map((d) => `<li>${esc(d)}</li>`).join('')}</ul></div>
          <div><h3 class="case-h">${esc(p.case.resultT)}</h3><ul class="bullets">${p.case.results.map((d) => `<li>${esc(d)}</li>`).join('')}</ul></div>
        </div>
        ${p.case.shots.length ? `<div class="shots">${p.case.shots.map((sh) => `<figure class="shot"><a href="${sh.src}"><img src="${sh.src}" width="${sh.w}" height="${sh.h}" alt="${esc(sh.alt)}" loading="lazy" decoding="async"></a><figcaption>${esc(sh.caption)}</figcaption></figure>`).join('')}</div><p class="muted shots-note">${esc(p.case.shotsT)}</p>` : ''}
        <h3 class="case-h">${esc(p.case.featuresT)}</h3>
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
        <dt>cv</dt><dd><a href="${LINKS.cv(c.code)}" download>${esc(LINKS.cv(c.code).split('/').pop())}</a></dd>
      </dl>`;
  },
};
export const eduItems = (e) => `<dl class="kv">${e.items.map(([d, title, school]) => `<dt>${esc(d)}</dt><dd><span class="hl">${esc(title)}</span><br>${esc(school)}</dd>`).join('')}</dl>`;
export const eduCerts = (e) => `<dl class="kv">${e.certs.map(([y, n]) => `<dt>${y}</dt><dd>${esc(n)}</dd>`).join('')}</dl>`;

// Sistema de archivos de la terminal: cada carpeta es una sección
export const FILES = {
  whoami: (c) => [
    { n: c.files.profile, b: () => `<p>${esc(c.whoami.summary)}</p>` },
    { n: c.files.status, b: () => `<p><span class="ok">[ OK ]</span> ${esc(c.whoami.status)}</p>` },
  ],
  ia: (c) => c.ia.items.map(([s, d, n]) => ({ n, b: () => `<p class="hl">${esc(s)}</p><p>${esc(d)}</p>` })),
  servicios: (c) => c.servicios.items.map((it) => ({ n: it.unit, b: () => `<p class="hl">${esc(it.name)}</p><p>${esc(it.desc)}</p><p><span class="muted">${esc(c.servicios.deliv)}:</span> ${esc(it.deliv)}</p><p><a href="${esc(mailto(it.subject))}">${esc(c.servicios.ask)}</a></p>` })),
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
  contacto: (c) => [
    { n: 'email', link: `mailto:${LINKS.email}`, label: LINKS.email },
    { n: 'linkedin', link: LINKS.linkedin },
    { n: 'github', link: LINKS.github },
    { n: 'cv.pdf', link: LINKS.cv(c.code) },
  ],
};
// Secciones y menú de la vista de perfil, como HTML
export function profileHtml(c, login) {
  const sections = ORDER.map((k) => {
    if (k === 'whoami') {
      return `<section class="block hero" id="s-whoami" aria-label="${esc(c.titles.whoami)}">
        <p class="login" id="login">${esc(login)}</p>
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
  }).join('\n');
  const chips = ORDER.map((k) => `<a class="chip" href="#s-${k}" data-k="${k}">${esc(c.titles[k])}</a>`).join('');
  return { sections, chips };
}
