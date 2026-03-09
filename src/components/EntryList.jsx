export default function EntryList({ entries }) {
  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <a key={entry.num} href={entry.href} className="entry reveal">
          <span className="entry__num">{entry.num}</span>
          <div className="entry__body">
            <h3 className="entry__name">{entry.name}</h3>
            <p className="entry__desc">{entry.desc}</p>
          </div>
          <div className="entry__tags">
            {entry.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <span className="entry__arrow">↗</span>
        </a>
      ))}
    </div>
  );
}
