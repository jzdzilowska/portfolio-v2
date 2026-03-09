import { sections } from '../data/content';

export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="site-foot">
      <nav className="site-foot__links">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="site-foot__link"
            onClick={(e) => scrollTo(e, s.id)}
          >
            {s.label}
          </a>
        ))}
      </nav>
      <span className="site-foot__copy">© 2026 Julia Zdzilowska</span>
    </footer>
  );
}
