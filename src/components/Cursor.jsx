import { useEffect, useRef } from 'react';

export default function Cursor() {
  const box = useRef(null);
  const root = useRef(null);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const el = root.current;
    const boxEl = box.current;
    if (!el || !boxEl) return;

    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (e) => {
      boxEl.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onOver = (e) => {
      if (e.target.closest('a, button, .js-link, [role="button"]')) {
        el.classList.add('is-link-hovered');
      }
    };

    const onOut = (e) => {
      if (e.target.closest('a, button, .js-link, [role="button"]')) {
        el.classList.remove('is-link-hovered');
      }
    };

    const onDown = () => el.classList.add('is-clicked');
    const onUp = () => el.classList.remove('is-clicked');
    const onLeave = () => el.classList.add('is-hidden');
    const onEnter = () => el.classList.remove('is-hidden');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <div ref={root} className="b-cursor">
      <div ref={box} className="b-cursor__box-item">
        <div className="b-cursor__item b-cursor__item--small" />
      </div>
    </div>
  );
}
