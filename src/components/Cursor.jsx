import { useEffect, useRef } from 'react';

const MAGNETIC_SELECTOR = 'a, button, .js-link, [role="button"]';
const STRENGTH = 0.4;

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

    let activeMagnetic = null;

    const onMove = (e) => {
      boxEl.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

      if (activeMagnetic) {
        const rect = activeMagnetic.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * STRENGTH;
        const dy = (e.clientY - cy) * STRENGTH;
        activeMagnetic.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };

    const onOver = (e) => {
      const target = e.target.closest(MAGNETIC_SELECTOR);
      if (target) {
        el.classList.add('is-link-hovered');
        activeMagnetic = target;
        target.style.transition = 'transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)';
      }
    };

    const onOut = (e) => {
      const target = e.target.closest(MAGNETIC_SELECTOR);
      if (target) {
        el.classList.remove('is-link-hovered');
        target.style.transition = 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)';
        target.style.transform = 'translate(0, 0)';
        if (activeMagnetic === target) activeMagnetic = null;
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
