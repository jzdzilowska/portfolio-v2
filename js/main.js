/* ══════════════════════════════════════════════════════════
   Julia Zdzilowska Portfolio — Main JS
   Cathy Dolle replica interactions
   ══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  const loaderSquare = document.getElementById('loaderSquare');
  const isHomePage = !!loaderSquare;
  const isProjectPage = document.body.classList.contains('project-page');
  const isAboutPage = document.body.classList.contains('about-page');

  /* ══════════════════════════════════════════════════════════
     CUSTOM CROSSHAIR CURSOR
     ══════════════════════════════════════════════════════════ */

  const crosshairBorder = document.getElementById('crosshairBorder');
  const crosshairFill = document.getElementById('crosshairFill');
  const pixelText = document.getElementById('pixelText');
  const projectTextSpan = document.getElementById('projectText');

  if (crosshairBorder && crosshairFill && window.innerWidth > 767) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      const x = Math.round(cursorX * 10) / 10;
      const y = Math.round(cursorY * 10) / 10;

      crosshairBorder.style.left = x + 'px';
      crosshairBorder.style.top = y + 'px';
      crosshairFill.style.left = x + 'px';
      crosshairFill.style.top = y + 'px';

      if (pixelText) {
        pixelText.style.left = (x + 6) + 'px';
        pixelText.style.top = y + 'px';
      }

      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  /* ══════════════════════════════════════════════════════════
     LOADING ANIMATION
     ══════════════════════════════════════════════════════════ */

  if (isHomePage) {
    const loaderBar = document.getElementById('loaderBar');
    const projectListWrap = document.getElementById('projectListWrap');
    const mobileList = document.getElementById('mobileProjectList');
    const viewToggle = document.getElementById('viewToggle');

    let progress = 0;

    function animateLoader() {
      progress += Math.random() * 0.06 + 0.02;

      if (progress >= 1) {
        progress = 1;
        loaderBar.style.transform = 'scaleY(1)';

        setTimeout(() => {
          // Fade out loader
          loaderSquare.style.opacity = '0';

          setTimeout(() => {
            loaderSquare.style.display = 'none';

            // Fade in project list
            if (projectListWrap) projectListWrap.style.opacity = '1';
            if (mobileList) mobileList.style.opacity = '1';
            if (viewToggle) viewToggle.style.opacity = '1';

            // Stagger reveal project items
            revealProjectItems();
          }, 250);
        }, 350);

        return;
      }

      loaderBar.style.transform = `scaleY(${progress})`;
      requestAnimationFrame(animateLoader);
    }

    setTimeout(() => requestAnimationFrame(animateLoader), 300);
  }

  /* ══════════════════════════════════════════════════════════
     STAGGERED PROJECT REVEAL
     ══════════════════════════════════════════════════════════ */

  function revealProjectItems() {
    const items = document.querySelectorAll('.project-li');
    const mobileItems = document.querySelectorAll('.mobile-project-item');

    items.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, i * 70);
    });

    mobileItems.forEach((item, i) => {
      setTimeout(() => {
        item.style.opacity = '1';
      }, i * 80);
    });
  }

  /* ══════════════════════════════════════════════════════════
     PROJECT HOVER → CANVAS PREVIEW + CURSOR STATE
     ══════════════════════════════════════════════════════════ */

  const canvas = document.getElementById('projectCanvas');

  if (canvas && isHomePage) {
    const ctx = canvas.getContext('2d');
    let canvasW, canvasH;
    let hoveredIdx = null;
    let displayIdx = null;
    let currentAlpha = 0;
    let targetAlpha = 0;

    const colors = [
      ['#1a1a2e', '#16213e'], // Runwave
      ['#2d1b2e', '#4a2c6e'], // Saute
      ['#1b2d1e', '#2e6e35'], // Giraffe
      ['#2e2a1b', '#6e5f2e'], // Amazon
      ['#1b2a2e', '#2e5f6e'], // Tryp
      ['#1e2d1b', '#3d6e2e'], // GreenCarLane
      ['#2e1b1b', '#6e2e2e'], // Drowsiness
      ['#1b1b2e', '#2e2e6e'], // Freelance
    ];

    const names = [
      'RUNWAVE', 'SAUTE', 'GIRAFFE LAB', 'AMAZON',
      'TRYP', 'GREENCARLANE', 'DROWSINESS DETECTION', 'FREELANCE'
    ];

    function resize() {
      canvasW = window.innerWidth;
      canvasH = window.innerHeight;
      canvas.width = canvasW * devicePixelRatio;
      canvas.height = canvasH * devicePixelRatio;
      canvas.style.width = canvasW + 'px';
      canvas.style.height = canvasH + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, canvasW, canvasH);

      targetAlpha = hoveredIdx !== null ? 1 : 0;
      currentAlpha += (targetAlpha - currentAlpha) * 0.08;

      if (currentAlpha > 0.005 && displayIdx !== null) {
        ctx.save();
        ctx.globalAlpha = currentAlpha;

        // Preview rectangle — large, centered between columns
        const w = canvasW * 0.28;
        const h = canvasH * 0.55;
        const x = canvasW * 0.5 - w / 2;
        const y = (canvasH - h) / 2;

        const c = colors[displayIdx] || colors[0];
        const grad = ctx.createLinearGradient(x, y, x + w, y + h);
        grad.addColorStop(0, c[0]);
        grad.addColorStop(1, c[1]);

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, w, h);

        // Label
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.font = '500 10px "General Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(names[displayIdx] || '', x + w / 2, y + h / 2 + 3);

        ctx.restore();
      }

      requestAnimationFrame(draw);
    }

    draw();

    // Hover listeners
    document.querySelectorAll('.project-li').forEach((li) => {
      li.addEventListener('mouseenter', () => {
        const id = li.getAttribute('data-id');
        const idx = parseInt(id.replace('project-', ''));
        hoveredIdx = idx;
        displayIdx = idx;
        if (crosshairFill) crosshairFill.classList.add('active');
        if (projectTextSpan) projectTextSpan.classList.add('visible');
      });

      li.addEventListener('mouseleave', () => {
        hoveredIdx = null;
        if (crosshairFill) crosshairFill.classList.remove('active');
        if (projectTextSpan) projectTextSpan.classList.remove('visible');
      });
    });
  }

  /* ══════════════════════════════════════════════════════════
     ABOUT OVERLAY
     ══════════════════════════════════════════════════════════ */

  const aboutBtn = document.getElementById('aboutBtn');
  const aboutOverlay = document.getElementById('aboutOverlay');
  const aboutClose = document.getElementById('aboutClose');

  if (aboutBtn && aboutOverlay) {
    aboutBtn.addEventListener('click', () => aboutOverlay.classList.add('active'));
  }

  if (aboutClose && aboutOverlay) {
    aboutClose.addEventListener('click', () => aboutOverlay.classList.remove('active'));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutOverlay && aboutOverlay.classList.contains('active')) {
      aboutOverlay.classList.remove('active');
    }
  });

  /* ══════════════════════════════════════════════════════════
     SCROLL REVEAL (Project & About pages)
     ══════════════════════════════════════════════════════════ */

  if (isProjectPage || isAboutPage) {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

      reveals.forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.06}s`;
        observer.observe(el);
      });
    }
  }

});

/* ══════════════════════════════════════════════════════════
   PAGE TRANSITIONS
   ══════════════════════════════════════════════════════════ */

function navigateTo(event, url) {
  event.preventDefault();
  let t = document.getElementById('pageTransition');
  if (!t) {
    t = document.createElement('div');
    t.id = 'pageTransition';
    t.className = 'page-transition';
    document.body.appendChild(t);
  }
  void t.offsetHeight;
  t.classList.add('active');
  setTimeout(() => { window.location.href = url; }, 400);
}

window.addEventListener('pageshow', () => {
  const t = document.getElementById('pageTransition');
  if (t) {
    t.classList.add('active');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => t.classList.remove('active'));
    });
  }
});
