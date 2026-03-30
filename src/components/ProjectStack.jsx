import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { software } from '../data/content';

/* ── per-slide layout config (mirrors Luzía's data-anims approach) ── */
const slideConfig = [
  { w: 180, x: 0, scale: 1, speed: 0.32, zIndex: 1, aspectRatio: 0.86 },
  { w: 120, x: -10, scale: 1.2, speed: 0.2, zIndex: 20, aspectRatio: 0.93 },
  { w: 300, x: 10, scale: 1, speed: 0.32, zIndex: 1, aspectRatio: 0.8 },
  { w: 150, x: 0, scale: 1, speed: 0.18, zIndex: 1, aspectRatio: 0.67 },
];

export default function ProjectCarousel() {
  const rootRef = useRef(null);
  const tlRef = useRef(null);
  const ctxRef = useRef(null);
  const pausedRef = useRef(false);

  /* pause / resume helpers */
  const handleMouseEnter = useCallback(() => {
    tlRef.current?.pause();
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!pausedRef.current) tlRef.current?.play();
  }, []);

  const handleLinkClick = useCallback(() => {
    pausedRef.current = true;
    tlRef.current?.pause();
  }, []);

  /* set --vh for mobile viewport */
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  /* build the marquee */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    ctxRef.current = gsap.context(() => {
      const slider = root.querySelector('.csp__slider');
      const slidesContainer = root.querySelector('.csp__slides');
      if (!slider || !slidesContainer) return;

      /* — duplicate slides for seamless loop — */
      const viewportW = slider.offsetWidth;
      const contentW = slidesContainer.offsetWidth;

      const clone1 = slidesContainer.cloneNode(true);
      slider.appendChild(clone1);

      if (contentW < viewportW) {
        const clone2 = slidesContainer.cloneNode(true);
        slider.appendChild(clone2);
      }

      /* — apply per-slide transforms (scale, offset) — */
      const allSlides = root.querySelectorAll('.csp__slide');
      allSlides.forEach((slide) => {
        const raw = slide.dataset.anims;
        if (!raw) return;
        const anims = JSON.parse(raw);
        const wrapperImg = slide.querySelector('.csp__slide-wrapper-image');
        if (!wrapperImg) return;

        const newHeight = slide.offsetHeight * anims.scale;
        const diffHeight = (slide.offsetHeight - newHeight) / 2;
        const offsetY = diffHeight + 17;

        gsap.set(slide, { '--t': `${offsetY.toFixed(2)}px` });
        gsap.set(wrapperImg, {
          x: anims.x,
          scale: anims.scale,
          zIndex: anims.zIndex,
        });
      });

      /* — marquee timeline — */
      const allContainers = root.querySelectorAll('.csp__slides');
      const speed = 100; // px per second
      const duplicateCount = slider.querySelectorAll('.csp__slides').length - 1;
      const totalContentW = contentW * (duplicateCount + 1);
      const duration = totalContentW / speed;

      tlRef.current = gsap.to(allContainers, {
        x: -contentW,
        duration,
        ease: 'linear',
        repeat: -1,
      });

      /* start paused, play after visibility */
      tlRef.current.pause();

      /* — hover listeners on each image card — */
      const allImages = root.querySelectorAll('.csp__slide-box-image');
      allImages.forEach((img) => {
        img.addEventListener('mouseenter', handleMouseEnter);
        img.addEventListener('mouseleave', handleMouseLeave);
        const parent = img.parentElement;
        if (parent) {
          parent.addEventListener('mouseenter', handleMouseEnter);
          parent.addEventListener('mouseleave', handleMouseLeave);
        }
      });

      /* — link click listeners — */
      const links = root.querySelectorAll('.csp__slide-box-link');
      links.forEach((link) => link.addEventListener('click', handleLinkClick));
    });

    /* trigger visibility + play after a short delay */
    const timer = setTimeout(() => {
      root.classList.add('is-visible');
      tlRef.current?.play();
    }, 400);

    return () => {
      clearTimeout(timer);
      tlRef.current?.kill();
      ctxRef.current?.revert();

      /* remove cloned containers */
      const slider = root.querySelector('.csp__slider');
      if (slider) {
        const containers = slider.querySelectorAll('.csp__slides');
        containers.forEach((el, i) => { if (i > 0) el.remove(); });
      }
    };
  }, [handleMouseEnter, handleMouseLeave, handleLinkClick]);

  /* ── render ── */
  return (
    <section className="csp" ref={rootRef}>
      <div className="csp__slider">
        <div className="csp__slides">
          {software.map((project, i) => {
            const cfg = slideConfig[i % slideConfig.length];
            return (
              <div
                key={`${project.num}-${i}`}
                className="csp__slide"
                style={{
                  '--aspect-ratio': cfg.aspectRatio,
                  '--w': `${cfg.w}px`,
                  '--x': `${cfg.x}px`,
                  '--s': cfg.scale,
                  '--z-index': cfg.zIndex,
                }}
                data-anims={JSON.stringify({
                  w: cfg.w,
                  x: cfg.x,
                  scale: cfg.scale,
                  speed: cfg.speed,
                  zIndex: cfg.zIndex,
                })}
              >
                <div className="csp__slide-inner">
                  <a
                    className="csp__slide-box-link"
                    href={project.href}
                  >
                    <div className="csp__slide-box-image">
                      {/* category term */}
                      <div className="csp__slide-box-terms">
                        <span className="csp__term">{project.categories[0]}</span>
                      </div>

                      {/* image */}
                      <div className="csp__slide-wrapper-image">
                        {project.image ? (
                          <img
                            className="csp__slide-image"
                            src={project.image}
                            alt={project.name}
                          />
                        ) : (
                          <div className="csp__slide-placeholder" />
                        )}
                      </div>

                      {/* project title (centered, appears on hover) */}
                      <div className="csp__slide-box-title">
                        <span className="csp__slide-title">{project.name}</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
