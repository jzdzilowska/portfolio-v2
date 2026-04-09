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
    const projectLayout = document.getElementById('projectLayout');
    const mobileList = document.getElementById('mobileProjectList');

    let progress = 0;

    function animateLoader() {
      progress += Math.random() * 0.06 + 0.02;

      if (progress >= 1) {
        progress = 1;
        loaderBar.style.transform = 'scaleY(1)';

        setTimeout(() => {
          loaderSquare.style.opacity = '0';

          setTimeout(() => {
            loaderSquare.style.display = 'none';

            if (projectLayout) projectLayout.style.opacity = '1';
            if (mobileList) mobileList.style.opacity = '1';

            revealProjectNames();
            revealPhotos();
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
     STAGGERED NAME & PHOTO REVEAL
     ══════════════════════════════════════════════════════════ */

  function revealProjectNames() {
    const names = document.querySelectorAll('.project-name');
    const mobileItems = document.querySelectorAll('.mobile-project-item');

    names.forEach((el, i) => {
      setTimeout(() => el.classList.add('revealed'), i * 70);
    });

    mobileItems.forEach((item, i) => {
      setTimeout(() => { item.style.opacity = '1'; }, i * 80);
    });
  }

  function revealPhotos() {
    const photos = document.getElementById('projectPhotos');
    if (!photos) return;

    const items = photos.querySelectorAll('.photo-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.08, root: photos });

    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.08}s`;
      observer.observe(item);
    });
  }

  /* ══════════════════════════════════════════════════════════
     SCROLL-BASED NAME HIGHLIGHTING
     ══════════════════════════════════════════════════════════ */

  if (isHomePage) {
    const photos = document.getElementById('projectPhotos');

    if (photos) {
      const allNames = document.querySelectorAll('.project-name');
      const photoItems = photos.querySelectorAll('.photo-item');

      function updateActiveNames() {
        const containerRect = photos.getBoundingClientRect();
        const center = containerRect.top + containerRect.height / 2;
        let closestIdx = 0;
        let closestDist = Infinity;

        photoItems.forEach((item, i) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.top + rect.height / 2;
          const dist = Math.abs(itemCenter - center);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
          }
        });

        allNames.forEach(n => n.classList.remove('active'));
        const match = document.querySelector(`.project-name[data-index="${closestIdx}"]`);
        if (match) match.classList.add('active');
      }

      function updateParallax() {
        const containerRect = photos.getBoundingClientRect();
        const containerH = containerRect.height;

        photoItems.forEach(item => {
          const rect = item.getBoundingClientRect();
          const inner = item.querySelector('.photo-inner');
          if (!inner) return;

          const itemCenter = rect.top + rect.height / 2;
          const viewCenter = containerRect.top + containerH / 2;
          const ratio = (itemCenter - viewCenter) / containerH;
          const shift = ratio * 15;
          inner.style.transform = `translateY(${shift}%)`;
        });
      }

      function onScroll() {
        updateActiveNames();
        updateParallax();
      }

      photos.addEventListener('scroll', onScroll);
      setTimeout(onScroll, 800);

      const hoverTargets = document.querySelectorAll('.project-name, .photo-item');
      hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (crosshairFill) crosshairFill.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
          if (crosshairFill) crosshairFill.classList.remove('active');
        });
      });
    }
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
