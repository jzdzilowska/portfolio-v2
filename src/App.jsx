import { useEffect, useState, useCallback } from 'react';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Pitch from './components/Pitch';
import EntryList from './components/EntryList';
import Gallery from './components/Gallery';
import FunGrid from './components/FunGrid';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { sections, software, research, fun, contactInfo } from './data/content';

function Section({ id, num, title, className, children }) {
  return (
    <section id={id} className={`sec${className ? ` ${className}` : ''}`}>
      <div className="sec__head">
        <span className="sec__num">{num}</span>
        <h2 className="sec__title">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const handleLoaded = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
    {loading && <Loader onDone={handleLoaded} />}
    <Cursor />
    <div className="frame">
      <Nav sections={sections} />

      <main>
        <Hero />
        <Pitch />

        <Section id="software" num="/001" title="Selected Work">
          <EntryList entries={software} />
        </Section>

        <Section id="research" num="/002" title="Research">
          <EntryList entries={research} />
        </Section>

        <Section id="fun" num="/004" title="Fun Stuff">
          <FunGrid items={fun} />
        </Section>

        <Section id="contact" num="/005" title="Get in Touch" className="sec--last">
          <Contact info={contactInfo} />
        </Section>
      </main>

      <Footer />
    </div>
    </>
  );
}
