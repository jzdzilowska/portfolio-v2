import { useEffect, useRef } from 'react';

export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(pointer:fine)').matches) return;

    let mx = 0, my = 0, cx = 0, cy = 0;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { el.style.opacity = '0'; };
    const onEnter = () => { el.style.opacity = '1'; };

    const tick = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      el.style.left = cx + 'px';
      el.style.top = cy + 'px';
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    tick();

    const grow = () => el.classList.add('big');
    const shrink = () => el.classList.remove('big');
    const targets = document.querySelectorAll('a, button, .entry, .gallery__item, .fun-card, .contact-email');
    targets.forEach((t) => {
      t.addEventListener('mouseenter', grow);
      t.addEventListener('mouseleave', shrink);
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      targets.forEach((t) => {
        t.removeEventListener('mouseenter', grow);
        t.removeEventListener('mouseleave', shrink);
      });
    };
  }, []);

  return <div className="cursor" ref={ref} />;
}
