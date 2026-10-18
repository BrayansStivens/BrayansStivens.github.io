import { esc, LINKS, ORDER, T, ext, pathHtml, ps1, R, FILES, profileHtml } from './content.js';

(() => {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } },
  };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;


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
  const pathOf = (k) => (k ? `~/${t().dirs[k]}` : '~');

  // ---------- Vista de perfil ----------
  function renderProfile() {
    const { sections, chips } = profileHtml(t(), loginLine());
    el.sections.innerHTML = sections;
    el.chips.innerHTML = chips;
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

  // Cada elemento de ls se puede pulsar: una carpeta hace cd + ls, un archivo hace cat
  const fsBtn = (label, cls, cmd, then) =>
    `<button type="button" class="fs ${cls}" data-cmd="${esc(cmd)}"${then ? ` data-then="${esc(then)}"` : ''}>${esc(label)}</button>`;

  function listing(dir) {
    const c = t();
    if (dir === null) {
      const items = ORDER.map((k) => fsBtn(`${c.dirs[k]}/`, 'dir', `cd ~/${c.dirs[k]}`, 'ls'))
        .concat(fsBtn('flag.txt', 'file', 'cat ~/flag.txt'));
      return `<div class="grid">${items.join('')}</div>`;
    }
    const base = dir === cwd ? '' : `~/${c.dirs[dir]}/`;
    return `<div class="grid">${FILES[dir](c).map((f) => fsBtn(f.n, f.link ? 'lnk' : 'file', `cat ${base}${f.n}`)).join('')}</div>`;
  }

  // Busca un archivo por nombre en todas las carpetas, para sugerir dónde está
  function locate(name) {
    const n = name.replace(/^.*\//, '').toLowerCase();
    for (const k of ORDER) {
      const f = FILES[k](t()).find((x) => x.n.toLowerCase() === n);
      if (f) return `~/${t().dirs[k]}/${f.n}`;
    }
    return null;
  }

  function withHint(err, hint) {
    const w = document.createElement('div');
    w.append(errLine(err));
    if (hint) w.append(node('muted', hint));
    return w;
  }
  const foundHint = (name) => { const p = locate(name); return p ? t().msg.foundAt(p) : null; };

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
        if (!r) return withHint(`ls: ${target}: ${c.msg.noSuch}`, foundHint(target));
        if (r.file) {
          const ok = (r.dir === null && r.file === 'flag.txt') || (r.dir !== null && findFile(r.dir, r.file));
          return ok ? node('', r.file) : withHint(`ls: ${target}: ${c.msg.noSuch}`, foundHint(target));
        }
        return listing(r.dir);
      }
      case 'cd': {
        if (!arg || arg === '~') { prevCwd = cwd; cwd = null; setPrompt(); return null; }
        if (arg === '-') { [cwd, prevCwd] = [prevCwd, cwd]; setPrompt(); return node('', pathOf(cwd)); }
        const r = resolve(arg);
        if (!r) return withHint(`cd: ${c.msg.noSuch}: ${arg}`, foundHint(arg));
        if (r.file) return withHint(`cd: ${c.msg.notDir}: ${arg}`, c.msg.fileHint(arg));
        prevCwd = cwd; cwd = r.dir; setPrompt();
        return null;
      }
      case 'pwd':
        return node('', cwd ? `/home/brayan/${c.dirs[cwd]}` : '/home/brayan');
      case 'cat': case 'less': case 'more': case 'head': {
        if (!arg) return null;
        const r = resolve(arg);
        if (!r) return withHint(`cat: ${arg}: ${c.msg.noSuch}`, foundHint(arg));
        if (!r.file) return errLine(`cat: ${arg}: ${c.msg.isDir}`);
        if (r.dir === null) return errLine(c.msg.flag);
        const f = findFile(r.dir, r.file);
        if (!f) return withHint(`cat: ${arg}: ${c.msg.noSuch}`, foundHint(arg));
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
        if (arg === 'es' || arg === 'en') { setLang(arg); history.replaceState(null, '', pathFor(lang) + location.hash); return node('ok', T[lang].msg.lang); }
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
        // Si el nombre es un archivo, se sugiere cómo leerlo
        const here = cwd && findFile(cwd, parts[0]);
        const hint = here ? c.msg.fileHint(here.n) : (foundHint(parts[0]) || c.msg.notFoundHint);
        return withHint(c.msg.notFound + parts[0], hint);
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

  // Cada idioma tiene su URL prerenderizada: / (es) y /en/ (en)
  const pathFor = (l) => (l === 'en' ? '/en/' : '/');

  function setLang(l, { render = true, persist = true } = {}) {
    lang = l === 'en' ? 'en' : 'es';
    if (persist) store.set('lang', lang);
    const c = t();
    const other = lang === 'es' ? 'en' : 'es';
    document.documentElement.lang = lang;
    document.title = c.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', c.desc);
    el.langBtn.firstChild.textContent = `${c.ui.lang} `;
    el.langBtn.querySelector('.sr-only').textContent = c.ui.langLabel;
    el.langBtn.setAttribute('href', pathFor(other));
    el.langBtn.setAttribute('hreflang', other);
    el.langBtn.setAttribute('lang', other);
    el.viewGroup.setAttribute('aria-label', c.ui.view);
    el.viewProfile.textContent = c.ui.profile;
    el.viewTerm.textContent = c.ui.terminal;
    el.chips.setAttribute('aria-label', c.ui.chips);
    el.input.placeholder = c.ui.placeholder;
    el.skip.textContent = view === 'terminal' ? c.ui.skipTerm : c.ui.skipProfile;
    if (render) renderProfile();
    else { const login = document.getElementById('login'); if (login) login.textContent = loginLine(); }
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

  el.out.addEventListener('click', (e) => {
    const b = e.target.closest('.fs');
    if (!b) return;
    run(b.dataset.cmd);
    if (b.dataset.then) run(b.dataset.then);
    if (matchMedia('(pointer: fine)').matches) el.input.focus({ preventScroll: true });
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
  // El botón de idioma es un enlace real (rastreable); con JS cambia sin recargar
  el.langBtn.addEventListener('click', (e) => {
    e.preventDefault();
    setLang(lang === 'es' ? 'en' : 'es');
    history.replaceState(null, '', pathFor(lang) + location.hash);
  });

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
  // La página ya viene renderizada en su idioma; solo se cambia si el
  // visitante eligió otro antes (o llega con ?lang=)
  const pageLang = document.documentElement.lang === 'en' ? 'en' : 'es';
  const params = new URLSearchParams(location.search);
  const wanted = params.get('lang') || store.get('lang') || pageLang;
  if (wanted !== pageLang && (wanted === 'es' || wanted === 'en')) {
    setLang(wanted, { persist: false });
    history.replaceState(null, '', pathFor(wanted) + location.hash);
  } else {
    setLang(pageLang, { render: false, persist: false });
  }
  setView(location.hash === '#terminal' ? 'terminal' : 'profile', false);

  console.log('%cbrayan@sepulveda', 'color:#4ade80;font:700 14px monospace');
  console.log(lang === 'es'
    ? '¿Revisando el código? Bien. Hay una flag escondida en este sitio.'
    : 'Reading the source? Good. There is a flag hidden on this site.');
})();
