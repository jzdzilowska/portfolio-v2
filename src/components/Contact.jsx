export default function Contact({ info }) {
  return (
    <>
      <a href={`mailto:${info.email}`} className="contact-email reveal">
        {info.email}
      </a>

      <div className="contact-row reveal">
        <div className="contact-links">
          {info.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-lnk"
            >
              {link.label} <span>↗</span>
            </a>
          ))}
        </div>
        <a href={`tel:${info.phone.replace(/[^+\d]/g, '')}`} className="contact-phone">
          {info.phone}
        </a>
      </div>
    </>
  );
}
