/* ══════════════════════════════════════════════════════════
   Julia Zdzilowska Portfolio — Main JS
   cathydolle.com-style interactions
   ══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Loading Screen ── */
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');

  if (loader && loaderBar) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25 + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add('hide');
          revealProjectItems();
        }, 400);
      }
      loaderBar.style.width = progress + '%';
    }, 200);
  } else {
    // No loader (subpages) — init reveals immediately
    initScrollReveal();
  }

  /* ── Project List: Staggered Reveal ── */
  function revealProjectItems() {
    const items = document.querySelectorAll('.project-item');
    items.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('visible');
        item.style.transition = `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s`;
      }, i * 60);
    });
  }

  /* ── Project Hover → Preview Image ── */
  const projectItems = document.querySelectorAll('.project-item');
  const previewImages = document.querySelectorAll('.preview-image');

  projectItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const id = item.getAttribute('data-id');
      previewImages.forEach(img => {
        if (img.getAttribute('data-preview') === id) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });
    });

    item.addEventListener('mouseleave', () => {
      // Keep the last hovered image visible
    });
  });

  // Clear all previews when mouse leaves the list
  const projectList = document.getElementById('projectList');
  if (projectList) {
    projectList.addEventListener('mouseleave', () => {
      previewImages.forEach(img => img.classList.remove('active'));
    });
  }

  /* ── Scroll Reveal (About & Project pages) ── */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.06}s`;
      observer.observe(el);
    });
  }

  // Init scroll reveal for non-homepage pages
  if (document.body.classList.contains('about-page') ||
      document.body.classList.contains('project-page')) {
    initScrollReveal();
  }

});

/* ── Page Transitions ── */
function navigateTo(event, url) {
  event.preventDefault();
  const transition = document.getElementById('pageTransition');
  if (transition) {
    transition.classList.add('active');
    setTimeout(() => {
      window.location.href = url;
    }, 400);
  } else {
    window.location.href = url;
  }
}

/* ── On page load: fade in from black ── */
window.addEventListener('pageshow', () => {
  const transition = document.getElementById('pageTransition');
  if (transition) {
    transition.classList.add('active');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        transition.classList.remove('active');
      });
    });
  }
});
