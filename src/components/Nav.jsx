import { useState, useEffect, useCallback } from 'react';

export default function Nav({ sections, onAbout }) {
  const [active, setActive] = useState(sections[0]?.id || '');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const mid = window.scrollY + window.innerHeight / 2;
    const els = document.querySelectorAll('section[id]');
    let found = false;
    els.forEach((sec) => {
      if (mid >= sec.offsetTop && mid < sec.offsetTop + sec.offsetHeight) {
        setActive(sec.id);
        found = true;
      }
    });
    if (!found && window.scrollY < 200) {
      setActive(sections[0]?.id || '');
    }
  }, [sections]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    setMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <header className="site-nav">
        <nav className="site-nav__links">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`site-nav__link${active === s.id ? ' active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                if (s.id === 'about') { onAbout?.(); return; }
                scrollTo(e, s.id);
              }}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <button className="site-nav__toggle" onClick={openMenu} aria-label="Menu">
          <span /><span />
        </button>
      </header>

      <div className={`mob-menu${menuOpen ? ' open' : ''}`}>
        <button className="mob-menu__close" onClick={closeMenu} aria-label="Close menu">
          ✕
        </button>
        <nav className="mob-menu__links">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="mob-menu__link"
              onClick={(e) => {
                e.preventDefault();
                if (s.id === 'about') { closeMenu(); onAbout?.(); return; }
                scrollTo(e, s.id);
              }}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
