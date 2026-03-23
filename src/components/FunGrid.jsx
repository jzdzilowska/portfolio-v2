export default function FunGrid({ items }) {
  return (
    <div className="fun-grid">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="fun-card reveal"
        >
          <span className="fun-card__label">{item.label}</span>
          <p className="fun-card__desc">{item.desc}</p>
          <span className="fun-card__arrow">↗</span>
        </a>
      ))}
    </div>
  );
}
