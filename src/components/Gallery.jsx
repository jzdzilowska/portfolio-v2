export default function Gallery({ items }) {
  return (
    <div className="gallery">
      {items.map((item, i) => (
        <a key={i} href={item.href} className="gallery__item reveal">
          <div className="gallery__img">
            {item.image && <img src={item.image} alt={item.name} />}
          </div>
          <h3 className="gallery__name">{item.name}</h3>
          <p className="gallery__desc">{item.desc}</p>
        </a>
      ))}
    </div>
  );
}
