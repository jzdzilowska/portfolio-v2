import { useState, useCallback } from 'react';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ProjectStack from './components/ProjectStack';
import Outro from './components/Outro';
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
    <div className={`frame${blurred ? ' frame--blurred' : ''}`}>
      <Nav sections={sections} onAbout={() => setAboutOpen(true)} />

      <main>
        <Hero />
      </main>
    </div>
    <ProjectStack />
    <div className="scroll-spacer" />
    <Outro />
    <AboutOverlay open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
