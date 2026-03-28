import { useState, useCallback } from 'react';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ProjectStack from './components/ProjectStack';
import AboutOverlay from './components/AboutOverlay';
import { sections } from './data/content';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(false);
  const handleLoaded = useCallback(() => setLoading(false), []);

  const blurred = loading || aboutOpen;

  return (
    <>
    {loading && <Loader onDone={handleLoaded} />}
    <Cursor />
    <Nav sections={sections} onAbout={() => setAboutOpen(true)} />
    <div className={`frame${blurred ? ' frame--blurred' : ''}`}>
      <main>
        <Hero />
      </main>
    </div>
    <ProjectStack />
    <div className="hero__footer">
      <p>Based in Providence, RI</p>
      <p>(Scroll Down)</p>
      <p>Available Worldwide</p>
    </div>
    <AboutOverlay open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
