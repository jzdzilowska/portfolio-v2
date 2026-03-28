import { useEffect, useRef } from 'react';
import { software } from '../data/content';

export default function ProjectStack() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="pstack">
      <div className="pstack__list">
        {software.map((project, i) => (
          <a
            key={project.num}
            href={project.href}
            className="pcard"
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <div className="pcard__left">
              <span className="pcard__num">
                {project.num}/
              </span>
              <span className="pcard__name">{project.name}</span>
            </div>

            <div className="pcard__img">
              {project.image ? (
                <img src={project.image} alt={project.name} />
              ) : (
                <div className="pcard__placeholder" />
              )}
            </div>

            <div className="pcard__right">
              {project.categories.map((cat) => (
                <span key={cat} className="pcard__cat">{cat}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
