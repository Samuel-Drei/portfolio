(() => {
  'use strict';

  /* ---------- CONFIG: edite aqui ---------- */
  const WHATSAPP = '5566984245364'; // DDI + DDD + número

  // Sites entregues. Preencha para exibir a vitrine "Sites no ar" (fica oculta se vazia).
  // Exemplo: { name: 'Clínica Exemplo', url: 'https://exemplo.com.br', note: 'Odontologia · Primavera do Leste' }
  // video/poster ficam em /videos. Adicione url: 'https://...' para exibir o botão "Ver site".
  const SITES = [
    { name: 'Tron Locações',        note: 'Geradores e içamento pesado',              video: 'tron',       url: 'https://www.tronlocacoes.com.br' },
    { name: 'Hotel Tezla',          note: 'Hotelaria · Primavera do Leste (MT)',      video: 'tezla',      url: 'https://www.tezlahotel.com.br' },
    { name: 'Klin',                 note: 'Sistema para clínicas de fisioterapia',    video: 'klin',       url: 'https://www.klintech.app.br', demo: 'https://demo.klintech.app.br' },
    { name: 'ConectAgro',           note: 'Agronegócio · Mato Grosso',                video: 'conectagro', url: 'https://agro-forge.vercel.app' },
    { name: 'Plenus',               note: 'Infraestrutura de TI e controle de ponto', video: 'plenus',     url: 'https://plenus-rho.vercel.app' },
    { name: 'MR Resgate',           note: 'Ambulância e UTI móvel · Primavera do Leste (MT)', video: 'ambulancia', url: 'https://mr-resgates.vercel.app' },
    { name: 'Kelly Jalecos',        note: 'Jalecos bordados · Primavera do Leste (MT)', video: 'jaleco',   url: 'https://kellyjalecos.vercel.app' },
    { name: 'Missões Espontâneas',  note: 'Institucional e doações',                  video: 'missoes',    url: 'https://www.missoesespontaneas.com.br' },
    // Help.Me removido da versão pública até confirmar os números e regravar sem a etiqueta do Lovable (arquivos em _reserva/)
    { name: 'Grupo Tech',           note: 'Institucional · tecnologia sob medida',    video: 'grupotech',  url: 'https://grupo-tech.vercel.app' }
  ];
  /* ---------------------------------------- */

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // WhatsApp links com mensagem pré-preenchida
  $$('[data-wa]').forEach(a => {
    a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(a.dataset.wa)}`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });

  // Vitrine de sites
  if (SITES.length) {
    const grid = $('#sitesGrid');
    SITES.forEach(s => {
      const li = document.createElement('li');
      li.className = 'site-card';
      const fig = document.createElement('div');
      fig.className = 'site-card__media';
      const v = document.createElement('video');
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'none';
      v.poster = `videos/${s.video}.jpg`;
      v.setAttribute('aria-label', `Rolagem do site ${s.name}`);
      v.dataset.src = `videos/${s.video}.mp4`;
      fig.append(v);
      const info = document.createElement('div');
      info.className = 'site-card__info';
      const strong = document.createElement('strong'); strong.textContent = s.name;
      const span = document.createElement('span'); span.textContent = s.note || '';
      info.append(strong, span);
      if (s.url || s.demo) {
        const links = document.createElement('div');
        links.className = 'site-card__links';
        [[s.url, 'Ver site ↗'], [s.demo, 'Testar demo ↗']].forEach(([href, label]) => {
          if (!href) return;
          const a = document.createElement('a');
          a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer';
          a.className = 'mono'; a.textContent = label;
          links.append(a);
        });
        info.append(links);
      }
      li.append(fig, info); grid.append(li);
    });
    $('#sites').hidden = false;

    // Carrega e toca o vídeo só quando o cartão está visível (economiza dados)
    const vio = new IntersectionObserver(es => es.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        if (!reduce) v.play().catch(() => {});
      } else if (v.src) v.pause();
    }), { threshold: .35 });
    $$('video', grid).forEach(v => vio.observe(v));
  }

  // Preloader
  const body = document.body;
  const count = $('#preloaderCount');
  const done = () => body.classList.add('is-loaded');
  if (reduce) { done(); } else {
    let n = 0;
    const t = setInterval(() => {
      n = Math.min(100, n + 7 + Math.random() * 9);
      count.textContent = String(Math.floor(n)).padStart(2, '0');
      if (n >= 100) { clearInterval(t); setTimeout(done, 150); }
    }, 45);
    setTimeout(done, 3000); // segurança
  }

  // Reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  $$('[data-reveal]').forEach(el => io.observe(el));

  // Header + progresso
  const head = $('#head'), bar = $('#progress');
  const onScroll = () => {
    head.classList.toggle('is-stuck', scrollY > 30);
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu mobile
  const btn = $('#menuBtn'), menu = $('#menu');
  const setMenu = open => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Fechar' : 'Menu';
    body.style.overflow = open ? 'hidden' : '';
  };
  btn.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  // Brasas (canvas leve)
  const cv = $('#field');
  if (cv && !reduce) {
    const ctx = cv.getContext('2d');
    let w, h, dpr, parts = [], running = true;
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.width = innerWidth * dpr; h = cv.height = innerHeight * dpr;
    };
    const make = () => ({
      x: Math.random() * w, y: h + Math.random() * h * .3,
      r: (Math.random() * 1.6 + .4) * dpr,
      vy: (Math.random() * .35 + .12) * dpr, vx: (Math.random() - .5) * .2 * dpr,
      a: Math.random() * .5 + .15, p: Math.random() * 6.28
    });
    resize();
    const N = innerWidth < 700 ? 28 : 60;
    parts = Array.from({ length: N }, () => { const p = make(); p.y = Math.random() * h; return p; });
    const tick = () => {
      if (running) {
        ctx.clearRect(0, 0, w, h);
        for (const p of parts) {
          p.y -= p.vy; p.p += .01; p.x += p.vx + Math.sin(p.p) * .25 * dpr;
          if (p.y < -10) Object.assign(p, make());
          ctx.beginPath();
          ctx.fillStyle = `rgba(255,82,39,${p.a * (p.y / h * .8 + .2)})`;
          ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
        }
      }
      requestAnimationFrame(tick);
    };
    addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => { running = !document.hidden; });
    tick();
  }
})();
