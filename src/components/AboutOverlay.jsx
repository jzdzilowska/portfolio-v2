import { useRef, useEffect, useCallback, useState } from 'react';

export default function AboutOverlay({ open, onClose }) {
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const [resumeHovered, setResumeHovered] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const rot = useRef(0);
  const raf = useRef(null);

  const STIFFNESS = 0.04;
  const DAMPING = 0.82;
  const ROT_FACTOR = 0.6;
  const ROT_DAMPING = 0.92;
  const MAX_ROT = 25;

  const tick = useCallback(() => {
    const dx = mouse.current.x - pos.current.x;
    const dy = mouse.current.y - pos.current.y;

    vel.current.x = (vel.current.x + dx * STIFFNESS) * DAMPING;
    vel.current.y = (vel.current.y + dy * STIFFNESS) * DAMPING;

    pos.current.x += vel.current.x;
    pos.current.y += vel.current.y;

    const targetRot = Math.max(-MAX_ROT, Math.min(MAX_ROT, vel.current.x * ROT_FACTOR));
    rot.current = rot.current * ROT_DAMPING + targetRot * (1 - ROT_DAMPING);

    if (imgRef.current) {
      imgRef.current.style.transform =
        `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) rotate(${rot.current}deg)`;
    }

    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!open) {
      if (raf.current) cancelAnimationFrame(raf.current);
      document.body.classList.remove('about-open');
      return;
    }

    document.body.classList.add('about-open');

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
      document.body.classList.remove('about-open');
    };
  }, [open, tick]);

  return (
    <div
      ref={overlayRef}
      className={`about-overlay${open ? ' about-overlay--open' : ''}`}
      onClick={onClose}
    >
      <img
        ref={imgRef}
        src="/images/about-photo.png"
        alt=""
        className={`about-overlay__img${resumeHovered ? ' about-overlay__img--hidden' : ''}`}
      />

      <div className="about-overlay__content" onClick={(e) => e.stopPropagation()}>
        <button className="about-overlay__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h2 className="about-overlay__heading">DEVELOPER & DESIGNER</h2>
        <p className="about-overlay__text">
          Hey, I'm Julia - full-stack dev & brand designer based in Providence, RI, and founder of an independent digital studio. I design and build production-ready digital products, pairing thoughtful engineering with intentional, detail-drivendesign to help founders and brands bring ideas from concept to launch. I'm a minimalism apologist and a white space lover.
        </p>
        <a
          href="/Julia-Zdzilowska-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="about-overlay__resume"
          onMouseEnter={() => setResumeHovered(true)}
          onMouseLeave={() => setResumeHovered(false)}
        >
          Resume ↗
        </a>
      </div>
    </div>
  );
}
