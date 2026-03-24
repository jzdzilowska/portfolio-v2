import { useState, useCallback } from 'react';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { sections } from './data/content';

export default function App() {
  const [loading, setLoading] = useState(true);
  const handleLoaded = useCallback(() => setLoading(false), []);

  return (
    <>
    {loading && <Loader onDone={handleLoaded} />}
    <Cursor />
    <div className={`frame${loading ? ' frame--blurred' : ''}`}>
      <Nav sections={sections} />

      <main>
        <Hero />
      </main>

      <Footer />
    </div>
    </>
  );
}
