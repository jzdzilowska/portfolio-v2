import { useEffect, useState, useCallback, useRef } from 'react';

const words = ['beautiful?', 'scalable?', 'efficient?', 'intuitive?', 'intentional?', 'timeless?', 'accessible?'];

export default function Hero() {
  const [typed, setTyped] = useState('');
  const bodyRef = useRef(null);

  const startCycle = useCallback(() => {
    let cancelled = false;

    const typeWord = (word, onDone) => {
      let i = 0;
      const step = () => {
        if (cancelled) return;
        if (i <= word.length) {
          setTyped(word.slice(0, i));
          i++;
          setTimeout(step, 110);
        } else {
          setTimeout(onDone, 1800);
        }
      };
      step();
    };

    const deleteWord = (word, onDone) => {
      let i = word.length;
      const step = () => {
        if (cancelled) return;
        if (i >= 0) {
          setTyped(word.slice(0, i));
          i--;
          setTimeout(step, 60);
        } else {
          setTimeout(onDone, 350);
        }
      };
      step();
    };

    const cycle = (index) => {
      if (cancelled) return;
      const word = words[index % words.length];
      typeWord(word, () => deleteWord(word, () => cycle(index + 1)));
    };

    cycle(0);
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const lines = document.querySelectorAll('.hero__line');
    const timeouts = [];

    lines.forEach((line, i) => {
      timeouts.push(setTimeout(() => line.classList.add('visible'), 300 + i * 140));
    });

    const startDelay = 300 + lines.length * 140 + 400;
    let cancelCycle;
    timeouts.push(setTimeout(() => { cancelCycle = startCycle(); }, startDelay));

    return () => {
      timeouts.forEach(clearTimeout);
      if (cancelCycle) cancelCycle();
    };
  }, [startCycle]);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    const onScroll = () => {
      const vh = window.innerHeight;
      const progress = Math.min(1, window.scrollY / (vh * 0.9));
      const blur = progress * 14;
      const translateY = -progress * 80;
      el.style.filter = `blur(${blur}px)`;
      el.style.transform = `translateY(${translateY}px)`;
      el.style.opacity = 1 - progress;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero">
      <div className="hero__body" ref={bodyRef}>
        <h1 className="hero__heading">
        <span className="hero__line">(*)</span>
        <span className="hero__line">Julia Zdzilowska</span>
          <span className="hero__line">Full-Stack & Branding</span>
          <span className="hero__line">
            why, if not <em className="hero__typed">{typed}</em>
          </span>
        </h1>
      </div>

    </section>
  );
}
