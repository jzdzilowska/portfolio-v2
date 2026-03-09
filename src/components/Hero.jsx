import { useEffect, useState } from 'react';

export default function Hero() {
  const [typed, setTyped] = useState('');
  const word = 'Krakow';

  useEffect(() => {
    const lines = document.querySelectorAll('.hero__line');
    const timeouts = [];

    lines.forEach((line, i) => {
      timeouts.push(setTimeout(() => line.classList.add('visible'), 300 + i * 140));
    });

    const typeStart = 300 + lines.length * 140 + 400;
    for (let i = 0; i <= word.length; i++) {
      timeouts.push(
        setTimeout(() => setTyped(word.slice(0, i)), typeStart + i * 130),
      );
    }

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <section className="hero">
      <div className="hero__body">
        <h1 className="hero__heading">
          <span className="hero__line">JULIA</span>
          <span className="hero__line">ZDZILOWSKA</span>
          <span className="hero__line">
            - FROM{' '}
            <em className="hero__typed">{typed}</em>
          </span>
          <span className="hero__line">FULL-STACK</span>
          <span className="hero__line">& UI</span>

        </h1>
      </div>

      <div className="hero__footer">
        <div className="hero__disciplines">
          <span>Full-stack</span>
          <span className="hero__sep">·</span>
          <span>Research</span>
          <span className="hero__sep">·</span>
          <span>3D Design</span>
        </div>
        <span className="hero__scroll">scroll ↓</span>
      </div>
    </section>
  );
}
