document.addEventListener('DOMContentLoaded', () => {

  /* ================================================
     CUSTOM CURSOR  (mix-blend-mode: difference)
     – cursor ring lags behind mouse for a cool feel
     ================================================ */
  const cursor = document.getElementById('cursor');

  if (cursor && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth follow via rAF
    const followCursor = () => {
      curX += (mouseX - curX) * 0.14;
      curY += (mouseY - curY) * 0.14;
      cursor.style.left = curX + 'px';
      cursor.style.top  = curY + 'px';
      requestAnimationFrame(followCursor);
    };
    followCursor();

    // Grow on interactive elements
    const hoverEls = document.querySelectorAll('a, button, .project, .name-outline, .contact-email');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('big'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
    });

    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
  }


  /* ================================================
     LETTER SCRAMBLE  — hover JULIA in the hero
     ================================================ */
  const target = document.getElementById('scrambleTarget');
  if (target) {
    const CHARS   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const ORIGINAL = 'JULIA';
    let rafId  = null;
    let frame  = 0;

    const scramble = () => {
      const total = ORIGINAL.length * 5; // how many frames until fully resolved
      target.textContent = ORIGINAL.split('').map((letter, i) => {
        if (frame >= i * 5 + 5) return letter; // resolved
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      frame++;
      if (frame <= total) rafId = requestAnimationFrame(scramble);
      else target.textContent = ORIGINAL;
    };

    target.addEventListener('mouseenter', () => {
      cancelAnimationFrame(rafId);
      frame = 0;
      scramble();
    });
  }


  /* ================================================
     MOBILE NAV
     ================================================ */
  const navToggle  = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  const openMenu  = () => { mobileMenu.classList.add('open');  document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; };

  if (navToggle)   navToggle.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  mobileMenu && mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });


  /* ================================================
     SMOOTH SCROLL for anchor links
     ================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ================================================
     SCROLL REVEAL  — staggered fade-up
     ================================================ */
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), idx * 110);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => observer.observe(el));


  /* ================================================
     HERO — subtle parallax on name on scroll
     ================================================ */
  const nameSolid = document.querySelector('.name-solid');
  if (nameSolid) {
    window.addEventListener('scroll', () => {
      const y = window.pageYOffset;
      nameSolid.style.transform = `translateY(${y * 0.06}px)`;
    }, { passive: true });
  }

});
