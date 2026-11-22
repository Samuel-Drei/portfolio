const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

const body = document.body;

// Preloader
const count = $('#preloaderCount');
const done = () => body.classList.add('is-loaded');
if (reduce || !count) {
  done();
} else {
  let n = 0;
  const t = setInterval(() => {
    n = Math.min(100, n + 7 + Math.random() * 9);
    count.textContent = String(Math.floor(n)).padStart(2, '0');
    if (n >= 100) { clearInterval(t); setTimeout(done, 150); }
  }, 45);
  setTimeout(done, 3000); // segurança
}

// Reveal on scroll
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}), { threshold: 0.12 });
$$('[data-reveal]').forEach((el) => io.observe(el));

// Vídeos: só carrega e toca quando o cartão está visível
const vio = new IntersectionObserver((es) => es.forEach((e) => {
  const v = e.target as HTMLVideoElement;
  if (e.isIntersecting) {
    if (!v.src) v.src = v.dataset.src ?? '';
    if (!reduce) v.play().catch(() => {});
  } else if (v.src) {
    v.pause();
  }
}), { threshold: 0.35 });
$$<HTMLVideoElement>('video[data-src]').forEach((v) => vio.observe(v));

// Header + barra de progresso
const head = $('#head');
const bar = $('#progress');
const onScroll = () => {
  head?.classList.toggle('is-stuck', scrollY > 30);
  const h = document.documentElement.scrollHeight - innerHeight;
  if (bar) bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu mobile
const btn = $<HTMLButtonElement>('#menuBtn');
const menu = $('#menu');
if (btn && menu) {
  const setMenu = (open: boolean) => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Fechar' : 'Menu';
    body.style.overflow = open ? 'hidden' : '';
  };
  btn.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
}

// Brasas (canvas leve)
const cv = $<HTMLCanvasElement>('#field');
if (cv && !reduce) {
  const ctx = cv.getContext('2d')!;
  let w = 0, h = 0, dpr = 1, running = true;
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
  const N = innerWidth < 700 ? 28 : 60;
  const parts = Array.from({ length: N }, () => { const p = make(); p.y = Math.random() * h; return p; });
  const tick = () => {
    if (running) {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.vy; p.p += 0.01; p.x += p.vx + Math.sin(p.p) * 0.25 * dpr;
        if (p.y < -10) Object.assign(p, make());
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,82,39,${p.a * ((p.y / h) * 0.8 + 0.2)})`;
        ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fill();
      }
    }
    requestAnimationFrame(tick);
  };
  addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => { running = !document.hidden; });
  tick();
}
