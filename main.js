document.addEventListener('DOMContentLoaded', () => {

  /* ════════════════════════════════════════════
     CUSTOM CURSOR  (mix-blend-mode: difference)
     White disc that inverts color of everything
     beneath it.  Lags slightly for personality.
  ════════════════════════════════════════════ */
  const cursor = document.getElementById('cursor');

  if (cursor && window.matchMedia('(pointer:fine)').matches) {
    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    const tick = () => {
      cx += (mx - cx) * 0.13;
      cy += (my - cy) * 0.13;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
      requestAnimationFrame(tick);
    };
    tick();

    // Grow on interactive targets
    document.querySelectorAll('a, button, .proj, .c-email').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('big'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
    });

    // Fade out when pointer leaves window
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
  }


  /* ════════════════════════════════════════════
     SIDEBAR SCROLL PROGRESS
     A 1.5px bar that climbs the sidebar's right
     edge as the user scrolls down.
  ════════════════════════════════════════════ */
  const progressBar = document.getElementById('sidebarProgress');

  if (progressBar) {
    const update = () => {
      const scrolled  = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const pct       = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
      progressBar.style.height = pct + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }


  /* ════════════════════════════════════════════
     ACTIVE NAV LINK  (sidebar)
  ════════════════════════════════════════════ */
  const sLinks   = document.querySelectorAll('.s-link');
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const mid = window.scrollY + window.innerHeight / 2;
    sections.forEach(sec => {
      if (mid >= sec.offsetTop && mid < sec.offsetTop + sec.offsetHeight) {
        sLinks.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.s-link[href="#${sec.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();


  /* ════════════════════════════════════════════
     MOBILE NAV
  ════════════════════════════════════════════ */
  const mobToggle  = document.getElementById('mobToggle');
  const mobOverlay = document.getElementById('mobOverlay');
  const mobClose   = document.getElementById('mobClose');

  const openMenu  = () => { mobOverlay.classList.add('open');  document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { mobOverlay.classList.remove('open'); document.body.style.overflow = ''; };

  mobToggle  && mobToggle.addEventListener('click', openMenu);
  mobClose   && mobClose.addEventListener('click', closeMenu);
  mobOverlay && mobOverlay.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', closeMenu));


  /* ════════════════════════════════════════════
     SMOOTH SCROLL  (anchor links)
  ════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ════════════════════════════════════════════
     SCROLL REVEAL  — staggered fade-up
  ════════════════════════════════════════════ */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

});
