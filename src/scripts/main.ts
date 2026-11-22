const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const body = document.body;

// Letras do título entrando com desfoque, uma de cada vez
const blurEls = $$('[data-blur]');
if (!reduce) {
  blurEls.forEach((el) => {
    el.setAttribute('aria-label', (el.textContent ?? '').replace(/\s+/g, ' ').trim());
    let i = 0;
    const walk = (node: Node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          (n.textContent ?? '').split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = 'bword';
            w.setAttribute('aria-hidden', 'true');
            [...part].forEach((ch) => {
              const s = document.createElement('span');
              s.className = 'bchar';
              s.textContent = ch;
              s.style.setProperty('--i', String(i++));
              w.append(s);
            });
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && (n as Element).tagName !== 'BR') {
          walk(n);
        }
      });
    };
    walk(el);
  });
}
const bio = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); bio.unobserve(e.target); }
}), { threshold: 0.4 });
blurEls.filter((el) => el.dataset.blur !== 'manual').forEach((el) => bio.observe(el));

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
}), { rootMargin: '0px 1400px 400px 1400px' });
const vio = new IntersectionObserver((es) => es.forEach((e) => {
  const v = e.target as HTMLVideoElement;
  if (e.isIntersecting && !saver && !reduce) {
    if (!v.src) v.src = v.dataset.src ?? '';
    v.play().catch(() => {});
  } else {
    v.pause();
  }
}), { threshold: 0.5 });
videos.forEach((v) => { pio.observe(v); vio.observe(v); });

// Cabeçalho (fundo ao rolar, uma leitura por quadro)
const nav = $('#nav');
let ticking = false;
const lightSecs = $$('#projetos, #google-meu-negocio, [data-light-sec]');
const workSec = $('#projetos');
const paint = () => {
  ticking = false;
  nav?.classList.toggle('is-stuck', scrollY > 30);
  if (nav) {
    nav.classList.toggle('on-work', !!workSec && (() => { const r = workSec.getBoundingClientRect(); return r.top <= 40 && r.bottom > 40; })());
    nav.classList.toggle('on-light', lightSecs.some((s) => { const r = s.getBoundingClientRect(); return r.top <= 40 && r.bottom > 40; }));
  }
};
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

// Projetos: a seção fica presa na tela e a rolagem vertical move os cartões para o lado
const work = $('#projetos');
const track = work ? $('.work__track', work) : null;
const endPanel = $('.wpanel--end');
const desktop = matchMedia('(min-width: 768px)');
if (work && track) {
  const panels = $$('.wpanel', track);
  const endPlus = $<SVGElement>('.wend__plus');
  const endLine = $('.wend__line');
  const underBig = $('.work__big');
  let over = 0;
  const size = () => {
    if (!desktop.matches) { work.style.height = ''; track.style.transform = ''; return; }
    over = Math.max(0, track.scrollWidth); // o último painel sai inteiro para a esquerda
    work.style.height = `${innerHeight + over}px`;
  };
  let tk = false;
  const frame = () => {
    tk = false;
    if (!desktop.matches) { panels.forEach((c) => c.classList.add('is-in')); underBig?.classList.add('is-in'); return; }
    const r = work.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, over > 0 ? -r.top / over : 0));
    const x = p * over;
    track.style.transform = `translate3d(${-x}px,0,0)`;
    const vw = innerWidth;
    panels.forEach((c) => {
      const inner = c.querySelector<HTMLElement>('.wcard__inner');
      const centre = (c.offsetLeft + c.offsetWidth / 2 - x) / vw;
      if (inner) {
        // sobe devagar quando o cartão aparece pela direita
        const t = Math.min(1, Math.max(0, (1.2 - centre) / 0.7));
        inner.style.transform = reduce ? '' : `translate3d(0,${Math.round(550 * Math.pow(1 - t, 3))}px,0)`;
      }
      if (centre < 1.05) c.classList.add('is-in');
    });
    if (endPanel && endPlus && endLine) {
      const edge = endPanel.offsetLeft + endPanel.offsetWidth - x;
      const n = edge <= vw ? Math.min(1, Math.max(0, (vw - edge) / vw)) : 0;
      endLine.style.transform = `scaleY(${n})`;
      endPlus.style.opacity = n <= 0.01 || edge < 0 ? '0' : '1';
      endPlus.style.transform = `rotate(${360 * n}deg)`;
      if (edge < vw * 0.55) underBig?.classList.add('is-in');
    }
  };
  const queue = () => { if (!tk) { tk = true; requestAnimationFrame(frame); } };
  size(); frame();
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', () => { size(); queue(); });
  addEventListener('load', () => { size(); queue(); });
  desktop.addEventListener('change', () => { size(); queue(); });
}

// Vídeo do topo: só toca se a pessoa aceita movimento e não está em economia de dados
const heroVideo = $<HTMLVideoElement>('#heroVideo');
if (heroVideo && (reduce || saver)) {
  heroVideo.removeAttribute('autoplay');
  heroVideo.pause();
}

// Vídeo da chamada final: toca só quando aparece
const ctaVideo = $<HTMLVideoElement>('[data-cta]');
if (ctaVideo && !reduce && !saver) {
  new IntersectionObserver(([e]) => { if (e.isIntersecting) ctaVideo.play().catch(() => {}); else ctaVideo.pause(); }, { threshold: 0.1 }).observe(ctaVideo);
}
