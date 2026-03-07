document.addEventListener('DOMContentLoaded', () => {

  /* ════════════════════════════════════════════
     CUSTOM CURSOR
  ════════════════════════════════════════════ */
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  if (window.matchMedia('(pointer:fine)').matches) {
    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    const tick = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
      requestAnimationFrame(tick);
    };
    tick();

    const hoverEls = 'a, button, .work-item__header, .gallery__item, .fun-card, .contact__email';
    document.querySelectorAll(hoverEls).forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('big'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
    });

    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
  } else {
    cursor.style.display = 'none';
  }


  /* ════════════════════════════════════════════
     HERO — staggered line reveal
  ════════════════════════════════════════════ */
  const heroLines = document.querySelectorAll('.hero__line');
  heroLines.forEach((line, i) => {
    setTimeout(() => line.classList.add('visible'), 350 + i * 130);
  });


  /* ════════════════════════════════════════════
     FULLSCREEN MENU
  ════════════════════════════════════════════ */
  const navToggle = document.getElementById('navToggle');
  const menu      = document.getElementById('menu');
  const menuClose = document.getElementById('menuClose');

  const openMenu  = () => { menu.classList.add('open');    document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { menu.classList.remove('open'); document.body.style.overflow = ''; };

  if (navToggle) navToggle.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);

  // Close on link click
  menu.querySelectorAll('.menu__link').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });


  /* ════════════════════════════════════════════
     SMOOTH SCROLL — anchor links
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
     EXPANDABLE WORK ITEMS
  ════════════════════════════════════════════ */
  document.querySelectorAll('[data-expandable]').forEach(item => {
    const header = item.querySelector('.work-item__header');
    if (!header) return;

    header.addEventListener('click', () => {
      const wasExpanded = item.classList.contains('expanded');

      // Close all siblings
      item.closest('.work-list').querySelectorAll('.work-item.expanded').forEach(open => {
        if (open !== item) open.classList.remove('expanded');
      });

      // Toggle current
      item.classList.toggle('expanded', !wasExpanded);
    });
  });


  /* ════════════════════════════════════════════
     SCROLL REVEAL — staggered fade-up
  ════════════════════════════════════════════ */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

});
