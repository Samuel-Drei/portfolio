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

// Cabeçalho (fundo ao rolar, uma leitura por quadro)
const nav = $('#nav');
let ticking = false;
const paint = () => { ticking = false; nav?.classList.toggle('is-stuck', scrollY > 30); };
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }, { passive: true });
paint();

// Menu: painel branco em círculo a partir do canto (foco vai para dentro e volta ao botão)
const btn = $<HTMLButtonElement>('#menuBtn');
const label = $('#menuLabel');
const panel = $('#menuPanel');
const overlay = $('#menuOverlay');
const main = $('#main');
if (btn && panel && overlay) {
  const setMenu = (open: boolean) => {
    panel.classList.toggle('is-open', open);
    overlay.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = open ? 'Fechar' : 'Menu';
    body.style.overflow = open ? 'hidden' : '';
    main?.toggleAttribute('inert', open);
    if (open) panel.querySelector<HTMLElement>('a')?.focus();
    else btn.focus();
  };
  btn.addEventListener('click', () => setMenu(!panel.classList.contains('is-open')));
  overlay.addEventListener('click', () => setMenu(false));
  $$('a', panel).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('is-open')) setMenu(false); });
}

// Barra de WhatsApp no celular: some quando a seção final aparece
const ctaBar = $('#ctaBar');
const contact = $('#contato');
if (ctaBar && contact) {
  new IntersectionObserver(([e]) => ctaBar.classList.toggle('is-off', e.isIntersecting)).observe(contact);
}
