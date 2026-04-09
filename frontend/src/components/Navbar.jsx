import { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#reservar', label: 'Reservar' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container container">
        <a href="#inicio" className="navbar__logo">
          <img src="/logo.png" alt="Volcán Wash Móvil" />
        </a>
        <button
          className={`navbar__toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
            </li>
          ))}
          <li>
            <a href="#reservar" className="navbar__cta" onClick={() => setMenuOpen(false)}>
              Reservar Ahora
            </a>
          </li>
        </ul>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 15px 0;
          transition: all 0.3s ease;
          background: transparent;
        }
        .navbar--scrolled {
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          padding: 8px 0;
          box-shadow: 0 2px 20px rgba(212, 32, 32, 0.2);
        }
        .navbar__container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar__logo img {
          height: 55px;
          transition: height 0.3s ease;
          mix-blend-mode: lighten;
        }
        .navbar--scrolled .navbar__logo img {
          height: 42px;
        }
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
        }
        .navbar__links a {
          font-weight: 600;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: color 0.3s;
          position: relative;
        }
        .navbar__links a:hover {
          color: var(--naranjo);
        }
        .navbar__links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradiente-fuego);
          transition: width 0.3s;
        }
        .navbar__links a:hover::after {
          width: 100%;
        }
        .navbar__cta {
          background: var(--gradiente-fuego);
          padding: 10px 24px !important;
          border-radius: 30px;
          font-weight: 700 !important;
          transition: transform 0.3s, box-shadow 0.3s !important;
        }
        .navbar__cta::after {
          display: none !important;
        }
        .navbar__cta:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 20px rgba(212, 32, 32, 0.4);
          color: var(--blanco) !important;
        }
        .navbar__toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          padding: 5px;
        }
        .navbar__toggle span {
          display: block;
          width: 25px;
          height: 2px;
          background: var(--blanco);
          transition: all 0.3s;
        }
        .navbar__toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .navbar__toggle.active span:nth-child(2) {
          opacity: 0;
        }
        .navbar__toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        @media (max-width: 768px) {
          .navbar__toggle {
            display: flex;
          }
          .navbar__links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            height: 100vh;
            flex-direction: column;
            background: rgba(10, 10, 10, 0.98);
            padding: 80px 40px;
            gap: 24px;
            transition: right 0.3s ease;
          }
          .navbar__links--open {
            right: 0;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
