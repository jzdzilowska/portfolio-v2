import { useEffect, useState } from 'react';

export default function Loader({ onDone }) {
  const [phase, setPhase] = useState('loading');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    const t1 = setTimeout(() => setPhase('exit'), 2800);
    const t2 = setTimeout(() => onDone(), 3700);
    return () => { clearInterval(blink); clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`loader loader--${phase}`}>
      <div className="loader__content">
        <span className="loader__row loader__row--right">KRK → BOS</span>
        <div className="loader__table">
          <span className="loader__key">FIELD</span>
          <span className="loader__val">FULL-STACK DEV / BRANDING</span>
          <span className="loader__key">TYPE</span>
          <span className="loader__val">PORTFOLIO</span>
          <span className="loader__key">YEAR</span>
          <span className="loader__val">2026</span>
        </div>
        <span className="loader__brand">
          [J.Z]{cursorVisible && <span className="loader__cursor">|</span>}
        </span>
      </div>
    </div>
  );
}
