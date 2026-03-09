export default function Footer() {
  return (
    <>
      <footer className="site-foot">
        {[0, 1, 2].map((i) => (
          <div key={i} className="site-foot__bottom">
            <span>/005</span>
            <span>Next Project</span>
          </div>
        ))}
      </footer>

      <div className="site-colophon">
        <span className="site-colophon__copy">© 2026</span>
        <span className="site-colophon__name">Julia Zdzilowska</span>
        <span className="site-colophon__rights">All rights reserved</span>
      </div>
    </>
  );
}
