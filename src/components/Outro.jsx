import { useEffect, useRef, useState } from 'react';
import { contactInfo } from '../data/content';

export default function Outro() {
  const outerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const onScroll = () => {
      const vh = window.innerHeight;
      const scrollable = document.documentElement.scrollHeight - vh;
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));

      const translateY = (1 - progress) * 100;
      el.style.transform = `translateY(${translateY}%)`;
      setVisible(progress > 0.02);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={outerRef}
      className={`outro${visible ? ' outro--visible' : ''}`}
    >
      <div className="outro__bg" />
      <div className="outro__content">

        <div className="outro__cta">
          <span className="outro__asterisk">(*)</span>
          <h2 className="outro__heading">
            <span>Got a project in mind?</span>
            <span className="outro__heading--italic">Let's make it happen</span>
          </h2>
          <p className="outro__sub">
            Shoot me an email<br />and let's bring your ideas to life.
          </p>
        </div>

        <div className="outro__dot">●</div>

        <footer className="outro__footer">
          <div className="outro__footer-top">
            <div className="outro__footer-col">
              <span className="outro__footer-label">New Projects / Enquiries</span>
              <a href={`mailto:${contactInfo.email}`} className="outro__footer-val">
                {contactInfo.email}
              </a>
              <a
                href={`tel:${contactInfo.phone.replace(/[^+\d]/g, '')}`}
                className="outro__footer-val"
              >
                {contactInfo.phone}
              </a>
            </div>
            <div className="outro__footer-col">
              <span className="outro__footer-label">Online</span>
              {contactInfo.links
                .filter((l) => l.label === 'LinkedIn' || l.label === 'Instagram')
                .map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="outro__footer-val"
                  >
                    {link.label}
                  </a>
                ))}
            </div>
          </div>

          <div className="outro__footer-bottom">
            <span className="outro__footer-small">
              Code by Julia Zdzilowska
            </span>
            <span className="outro__footer-small outro__footer-right">
              © 2026<br />Julia Zdzilowska
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
}
