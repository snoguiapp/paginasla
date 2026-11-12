const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

/* ===== Menú móvil ===== */
const toggle = $('.menu-toggle'), menu = $('#menu');
function setMenu(open) {
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? 'Cerrar' : 'Menú';
  root.classList.toggle('lock', open);
}
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', e => { if (e.target.closest('a, button')) setMenu(false); });
addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
matchMedia('(min-width:900px)').addEventListener('change', () => setMenu(false));

/* ===== Áreas (Productos, Servicios, Capacitación, Logística, MRO, Soporte) ===== */
const tabs = $$('.hub-tab'), panels = $$('.panel');
function showPanel(id, scroll) {
  tabs.forEach(t => {
    const on = t.dataset.panel === id;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
  });
  panels.forEach(p => { p.hidden = p.id !== id; });
  if (scroll) $('#' + id).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
function route(scroll) {
  const id = location.hash.slice(1);
  if (panels.some(p => p.id === id)) showPanel(id, scroll);
}
tabs.forEach(t => t.addEventListener('click', () => {
  const id = t.dataset.panel;
  if (location.hash === '#' + id) showPanel(id, true); else location.hash = id;
}));
$('.hub')?.addEventListener('keydown', e => {
  const i = tabs.indexOf(document.activeElement);
  if (i < 0 || !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
  e.preventDefault();
  const n = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  tabs[n].focus();
});
/* "Ver también": enlaces a las otras áreas al final de cada panel */
panels.forEach(p => {
  const nav = document.createElement('nav');
  nav.className = 'also';
  nav.setAttribute('aria-label', 'Ver también');
  nav.innerHTML = '<span>Ver también:</span>' + tabs.filter(t => t.dataset.panel !== p.id)
    .map(t => `<a href="#${t.dataset.panel}">${$('.hub-name', t).textContent}</a>`).join('');
  p.appendChild(nav);
});
if (panels.length) { addEventListener('hashchange', () => route(true)); route(!!location.hash); }

/* ===== Filtro del catálogo (empieza en Infraestructura) ===== */
$$('.chip').forEach(chip => chip.addEventListener('click', () => {
  $$('.chip').forEach(c => c.setAttribute('aria-pressed', c === chip));
  const f = chip.dataset.filter;
  $$('.catalog li').forEach(li => {
    li.hidden = li.dataset.cat !== f;
    if (!li.hidden) { li.style.animation = 'none'; li.offsetHeight; li.style.animation = ''; }
  });
}));

/* ===== Las animaciones de las imágenes solo corren mientras se ven ===== */
const cardIO = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting)),
  { rootMargin: '80px' });
$$('.card').forEach(c => cardIO.observe(c));

/* ===== Asunto prellenado desde el enlace (contacto.html?asunto=...) ===== */
const asunto = new URLSearchParams(location.search).get('asunto');
if (asunto) $$('.cform').forEach(f => { f.subject.value = 'Cotización: ' + asunto; });

/* ===== Envío de formularios (Web3Forms; ver LEEME.txt) ===== */
$$('.cform').forEach(form => form.addEventListener('submit', async e => {
  e.preventDefault();
  const st = $('.form-status', form), btn = $('button[type=submit]', form);
  const say = (msg, cls) => { st.textContent = msg; st.className = 'form-status ' + cls; };
  if (form.access_key.value.startsWith('TU_')) {
    say('El formulario aún no está conectado. Mientras tanto llámanos al (614) 259 09 99.', 'err');
    return;
  }
  btn.disabled = true; say('Enviando…', '');
  try {
    const r = await fetch(form.action, { method: 'POST', body: new FormData(form) });
    const d = await r.json();
    if (!d.success) throw new Error(d.message);
    form.reset();
    say('Gracias, recibimos tu mensaje. Te contactaremos pronto.', 'ok');
  } catch (err) {
    say('No pudimos enviar tu mensaje. Inténtalo de nuevo o llámanos al (614) 259 09 99.', 'err');
  } finally { btn.disabled = false; }
}));

/* ===== Reloj de 24 marcas (7x24) ===== */
const ticks = $('#ticks');
if (ticks) for (let i = 0; i < 24; i++) {
  const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
  const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  l.setAttribute('x1', 120 + Math.cos(a) * 92); l.setAttribute('y1', 120 + Math.sin(a) * 92);
  l.setAttribute('x2', 120 + Math.cos(a) * 112); l.setAttribute('y2', 120 + Math.sin(a) * 112);
  l.style.setProperty('--i', i);
  ticks.appendChild(l);
}

/* ===== Red de nodos del hero ===== */
(function () {
  const c = $('#net'); if (!c) return;
  const ctx = c.getContext('2d'), hero = c.parentElement;
  let w, h, nodes = [], raf = 0, running = false;
  const ptr = { x: -999, y: -999 };
  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(80, Math.max(26, (w * h) / 15000)));
    nodes = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: Math.random() * 1.5 + 1
    }));
    draw(false);
  }
  function draw(move = true) {
    ctx.clearRect(0, 0, w, h);
    const max = w < 600 ? 105 : 150;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      if (move) {
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
      }
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < max) {
          const near = Math.hypot((a.x + b.x) / 2 - ptr.x, (a.y + b.y) / 2 - ptr.y) < 140;
          ctx.strokeStyle = `rgba(${near ? '156,197,90' : '150,185,235'},${(1 - d / max) * (near ? .8 : .32)})`;
          ctx.lineWidth = near ? 1.2 : 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.fillStyle = 'rgba(156,197,90,.85)';
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill();
    }
  }
  function loop() { draw(); raf = requestAnimationFrame(loop); }
  function start() { if (!running && !reduce) { running = true; loop(); } }
  function stop() { running = false; cancelAnimationFrame(raf); }
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top;
  });
  hero.addEventListener('pointerleave', () => { ptr.x = ptr.y = -999; });
  new ResizeObserver(size).observe(hero);
  new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop()).observe(hero);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
})();

/* ===== Imágenes faltantes: logo -> nombre en texto, foto de ciudad -> círculo azul ===== */
function onBroken(img, fn) {
  if (img.complete && !img.naturalWidth) fn(); else img.addEventListener('error', fn, { once: true });
}
$$('.logos img').forEach(img => onBroken(img, () => {
  const s = document.createElement('span');
  s.className = 'logo-fallback'; s.textContent = img.alt; img.replaceWith(s);
}));
$$('.city-photo img, .media img').forEach(img => onBroken(img, () => img.remove()));

/* ===== Panel Novedades en IT =====
   Lee data/novedades.json (lo actualiza la tarea automática de GitHub).
   Si no existe o falla, usa la lista manual de js/novedades.js. */
(async function () {
  const box = $('#news'); if (!box) return;
  let data = window.NOVEDADES || [], auto = false;
  try {
    const r = await fetch('data/novedades.json', { cache: 'no-cache' });
    if (r.ok) {
      const j = await r.json();
      if (Array.isArray(j.items) && j.items.length) { data = j.items; auto = true; }
    }
  } catch (e) { /* sin JSON: se queda la lista manual */ }
  if (!data.length) return;

  const esc = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const seguro = u => (/^(https?:\/\/|img\/)/.test(u || '') ? u : '');
  const fecha = d => d.fecha || (d.fechaISO ? new Date(d.fechaISO).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }) : '');
  const track = $('.news-track', box), dots = $('.news-dots', box), n = data.length;
  track.innerHTML = data.map((d, i) => `<article class="news-slide" role="group" aria-roledescription="diapositiva" aria-label="${i + 1} de ${n}">
    <div class="news-media"><img src="${esc(seguro(d.imagen))}" alt="" referrerpolicy="no-referrer" ${i ? 'loading="lazy"' : ''}><span class="news-tag">${esc(d.etiqueta)}</span></div>
    <div class="news-body"><span class="news-date">${esc(fecha(d))}${d.fuente ? ' · ' + esc(d.fuente) : ''}</span><h3 class="news-h">${esc(d.titulo)}</h3>
    <p class="news-p">${esc(d.texto)}</p><a class="news-link" href="${esc(seguro(d.enlace))}" target="_blank" rel="noopener noreferrer">${d.fuente ? 'Leer en ' + esc(d.fuente) : 'Ver fuente'}</a></div></article>`).join('');
  dots.innerHTML = data.map((d, i) => `<button type="button" class="news-dot" data-i="${i}" aria-label="Ir a la novedad ${i + 1}"></button>`).join('');
  if (auto) dots.insertAdjacentHTML('afterend', '<p class="news-note">' + (data.some(d => d.traducido) ? 'Resúmenes traducidos automáticamente. ' : '') + 'Noticias e imágenes pertenecen a sus fuentes.</p>');
  $$('.news-media img', box).forEach(img => onBroken(img, () => img.remove()));
  box.hidden = false;

  let idx = 0, timer = 0;
  const mark = () => $$('.news-dot', dots).forEach((b, i) => b.setAttribute('aria-current', i === idx));
  const go = i => {
    idx = (i + n) % n; mark();
    track.scrollTo({ left: idx * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
  };
  const play = () => { if (!reduce && !timer) timer = setInterval(() => go(idx + 1), 7000); };
  const pause = () => { clearInterval(timer); timer = 0; };

  track.addEventListener('scroll', () => {
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== idx) { idx = i; mark(); }
  }, { passive: true });
  $$('.news-btn', box).forEach(b => b.addEventListener('click', () => go(idx + +b.dataset.dir)));
  dots.addEventListener('click', e => { const b = e.target.closest('.news-dot'); if (b) go(+b.dataset.i); });
  box.addEventListener('pointerenter', pause); box.addEventListener('pointerleave', play);
  box.addEventListener('focusin', pause); box.addEventListener('focusout', play);
  document.addEventListener('visibilitychange', () => document.hidden ? pause() : play());
  new IntersectionObserver(([e]) => e.isIntersecting ? play() : pause()).observe(box);
  addEventListener('resize', () => track.scrollTo({ left: idx * track.clientWidth, behavior: 'auto' }));
  mark();
})();

$('#year').textContent = new Date().getFullYear();
