import { useEffect, useRef, useState } from 'react';

const lines = [
  { text: 'Products that ship.', type: 'heading' },
  { text: 'Interfaces that convert.', type: 'heading' },
  { text: 'Systems that scale.', type: 'heading' },
  { text: '', type: 'spacer' },
  { text: 'I build all three.', type: 'closer' },
];

const subtitle = 'Fullstack engineering · Interface design · Brand systems';

export default function Pitch() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const clamp = (value, min = 0, max = 1) =>
      Math.max(min, Math.min(max, value));

    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();

      // distance the section scrolls while the sticky block is pinned
      const scrollRange = rect.height - window.innerHeight;

      if (scrollRange <= 0) {
        setProgress(0);
        return;
      }

      const p = clamp(-rect.top / scrollRange);
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const visibleLines = lines.filter((l) => l.type !== 'spacer');
  const segments = visibleLines.length - 1;

  let contentIndex = -1;

  return (
    <section ref={sectionRef} className="pitch">
      <div className="pitch__sticky">
        <div className="pitch__lines">
          {lines.map((line, i) => {
            if (line.type === 'spacer') {
              return <span key={i} className="pitch__spacer" />;
            }

            contentIndex += 1;

            const threshold = contentIndex / visibleLines.length;
            const lineProgress = Math.max(
              0,
              Math.min(1, (progress - threshold) * visibleLines.length)
            );

            return (
              <span
                key={i}
                className={`pitch__line ${
                  line.type === 'closer' ? 'pitch__line--closer' : ''
                }`}
                style={{
                  opacity: lineProgress,
                  transform: `translateY(${(1 - lineProgress) * 40}px)`,
                }}
              >
                {line.text}
              </span>
            );
          })}
        </div>

        <span
          className="pitch__sub"
          style={{
            opacity: Math.max(0, Math.min(1, (progress - 0.82) * 5)),
          }}
        >
          {subtitle}
        </span>
      </div>
    </section>
  );
}