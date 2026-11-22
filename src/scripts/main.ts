const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const body = document.body;

// Aparecer ao rolar
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}), { threshold: 0.12 });
$$('[data-reveal]').forEach((el) => io.observe(el));

// Vídeos: capa carrega um pouco antes, vídeo só quando visível, um de cada vez.
// Com economia de dados ou movimento reduzido, fica só a capa (o clique abre o site).
const saver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
const videos = $$<HTMLVideoElement>('video[data-src]');
const pio = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  const v = e.target as HTMLVideoElement;
  if (!v.poster) v.poster = v.dataset.poster ?? '';
  pio.unobserve(v);
}), { rootMargin: '400px' });
const vio = new IntersectionObserver((es) => es.forEach((e) => {
  const v = e.target as HTMLVideoElement;
  if (e.isIntersecting && !saver && !reduce) {
    videos.forEach((o) => { if (o !== v) o.pause(); });
    if (!v.src) v.src = v.dataset.src ?? '';
    v.play().catch(() => {});
  } else {
    v.pause();
  }
}), { threshold: 0.6 });
videos.forEach((v) => { pio.observe(v); vio.observe(v); });

// Cabeçalho + barra de progresso (uma leitura por quadro)
const head = $('#head');
const bar = $('#progress');
let ticking = false;
const paint = () => {
  ticking = false;
  head?.classList.toggle('is-stuck', scrollY > 30);
  const h = document.documentElement.scrollHeight - innerHeight;
  if (bar) bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
};
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }, { passive: true });
paint();

// Menu mobile (foco vai para dentro e volta ao botão)
const btn = $<HTMLButtonElement>('#menuBtn');
const menu = $('#menu');
const main = $('#main');
if (btn && menu) {
  const setMenu = (open: boolean) => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Fechar' : 'Menu';
    body.style.overflow = open ? 'hidden' : '';
    main?.toggleAttribute('inert', open);
    if (open) menu.querySelector<HTMLElement>('a')?.focus();
    else btn.focus();
  };
  btn.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });
}

// Barra de WhatsApp no celular: some quando a seção de contato aparece
const ctaBar = $('#ctaBar');
const contact = $('#contato');
if (ctaBar && contact) {
  new IntersectionObserver(([e]) => ctaBar.classList.toggle('is-off', e.isIntersecting)).observe(contact);
}

// Brasas (só em telas grandes; pausa fora do topo e com a aba escondida)
const cv = $<HTMLCanvasElement>('#field');
const hero = $('#inicio');
if (cv && hero && !reduce && innerWidth >= 700) {
  const ctx = cv.getContext('2d')!;
  let w = 0, h = 0, dpr = 1, running = false, raf = 0, inHero = true;
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = cv.width = innerWidth * dpr;
    h = cv.height = innerHeight * dpr;
  };
  const make = () => ({
    x: Math.random() * w, y: h + Math.random() * h * 0.3,
    r: (Math.random() * 1.6 + 0.4) * dpr,
    vy: (Math.random() * 0.35 + 0.12) * dpr, vx: (Math.random() - 0.5) * 0.2 * dpr,
    a: Math.random() * 0.5 + 0.15, p: Math.random() * 6.28,
  });
  resize();
  const parts = Array.from({ length: 50 }, () => { const p = make(); p.y = Math.random() * h; return p; });
  const tick = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.y -= p.vy; p.p += 0.01; p.x += p.vx + Math.sin(p.p) * 0.25 * dpr;
      if (p.y < -10) Object.assign(p, make());
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,82,39,${p.a * ((p.y / h) * 0.8 + 0.2)})`;
      ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fill();
    }
    raf = requestAnimationFrame(tick);
  };
  const setRun = (on: boolean) => {
    if (on && !running) { running = true; raf = requestAnimationFrame(tick); }
    else if (!on && running) { running = false; cancelAnimationFrame(raf); ctx.clearRect(0, 0, w, h); }
  };
  let lastW = innerWidth;
  addEventListener('resize', () => { if (innerWidth !== lastW) { lastW = innerWidth; resize(); } });
  new IntersectionObserver(([e]) => { inHero = e.isIntersecting; setRun(inHero && !document.hidden); }).observe(hero);
  document.addEventListener('visibilitychange', () => setRun(inHero && !document.hidden));
  setRun(true);
}
