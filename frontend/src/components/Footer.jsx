function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <img src="/logo.png" alt="Volcán Wash Móvil" className="footer__logo" />
            <p className="footer__tagline">
              Lavado premium a domicilio.<br />
              La potencia del volcán en tu auto.
            </p>
          </div>
          <div className="footer__links">
            <h4>Navegación</h4>
            <a href="#inicio">Inicio</a>
            <a href="#servicios">Servicios</a>
            <a href="#reservar">Reservar</a>
          </div>
          <div className="footer__contact">
            <h4>Contacto</h4>
            <p>📱 +56 9 9556 3267</p>
            <p>📍 Servicio a domicilio</p>
            <p>🕐 Lunes a Sábado 9:00 - 18:00</p>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Volcán Wash Móvil. Todos los derechos reservados.</p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--negro);
          border-top: 1px solid var(--gris);
          padding: 60px 0 0;
          margin-top: auto;
        }
        .footer__content {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 40px;
          padding-bottom: 40px;
        }
        .footer__logo {
          width: 120px;
          margin-bottom: 16px;
          mix-blend-mode: lighten;
        }
        .footer__tagline {
          color: rgba(245,245,245,0.5);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .footer__links h4,
        .footer__contact h4 {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
          color: var(--naranjo);
        }
        .footer__links a {
          display: block;
          padding: 4px 0;
          color: rgba(245,245,245,0.6);
          font-size: 0.9rem;
          transition: color 0.3s;
        }
        .footer__links a:hover {
          color: var(--blanco);
        }
        .footer__contact p {
          padding: 4px 0;
          color: rgba(245,245,245,0.6);
          font-size: 0.9rem;
        }
        .footer__bottom {
          border-top: 1px solid var(--gris);
          padding: 20px 0;
          text-align: center;
        }
        .footer__bottom p {
          font-size: 0.8rem;
          color: rgba(245,245,245,0.3);
        }

        @media (max-width: 768px) {
          .footer {
            padding: 40px 0 0;
          }
          .footer__content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 28px;
            padding-bottom: 28px;
          }
          .footer__logo {
            margin: 0 auto 12px;
            width: 100px;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
