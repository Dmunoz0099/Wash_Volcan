function Services() {
  const servicios = [
    {
      icono: '🧼',
      nombre: 'Lavado Básico',
      subtitulo: 'Exterior',
      descripcion: 'Tu auto reluciente por fuera con productos premium.',
      incluye: [
        'Lavado exterior detallado',
        'Acondicionamiento de plásticos exteriores',
        'Limpieza de llantas',
        'Renovador de neumáticos',
      ],
      precios: [
        { tipo: 'City Car', precio: 12000 },
        { tipo: 'Sedán', precio: 15000 },
        { tipo: 'SUV / Camioneta', precio: 20000 },
      ],
      color: 'var(--azul-agua)',
    },
    {
      icono: '✨',
      nombre: 'Lavado Full',
      subtitulo: 'Exterior + Interior',
      descripcion: 'La experiencia completa. Tu auto como nuevo por dentro y por fuera.',
      incluye: [
        'Todo el lavado básico',
        'Aspirado interior completo',
        'Limpieza de pisos de goma',
        'Limpieza y acondicionamiento de plásticos interiores',
        'Detallado interior',
      ],
      precios: [
        { tipo: 'City Car', precio: 15000 },
        { tipo: 'Sedán', precio: 20000 },
        { tipo: 'SUV / Camioneta', precio: 25000 },
      ],
      color: 'var(--naranjo)',
      destacado: true,
    },
  ];

  const adicionales = [
    { nombre: 'Pulido de vidrios', precio: 15000 },
    { nombre: 'Pulido + Sellado hidrofóbico', precio: 20000 },
  ];

  const formatPrecio = (n) => `$${n.toLocaleString('es-CL')}`;

  return (
    <section id="servicios" className="services">
      <div className="container">
        <h2 className="services__title">
          Nuestros <span className="text-gradient">Servicios</span>
        </h2>
        <p className="services__desc">
          Productos premium y atención profesional directo en tu domicilio
        </p>

        <div className="services__grid">
          {servicios.map((s, i) => (
            <div key={i} className={`service-card ${s.destacado ? 'service-card--destacado' : ''}`}>
              {s.destacado && <div className="service-card__badge">Más Popular</div>}
              <div className="service-card__icon">{s.icono}</div>
              <h3 className="service-card__nombre">{s.nombre}</h3>
              <span className="service-card__sub" style={{ color: s.color }}>{s.subtitulo}</span>
              <p className="service-card__desc">{s.descripcion}</p>

              <ul className="service-card__lista">
                {s.incluye.map((item, j) => (
                  <li key={j}>
                    <span className="check" style={{ color: s.color }}>✓</span> {item}
                  </li>
                ))}
              </ul>

              <div className="service-card__precios">
                {s.precios.map((p, j) => (
                  <div key={j} className="service-card__precio-row">
                    <span>{p.tipo}</span>
                    <span className="service-card__precio" style={{ color: s.color }}>
                      {formatPrecio(p.precio)}
                    </span>
                  </div>
                ))}
              </div>

              <a href="#reservar" className="service-card__btn" style={{ background: s.color }}>
                Reservar
              </a>
            </div>
          ))}
        </div>

        <div className="services__adicionales">
          <h3>
            <span style={{ marginRight: '8px' }}>🔥</span>
            Servicios Adicionales
          </h3>
          <div className="adicionales__grid">
            {adicionales.map((a, i) => (
              <div key={i} className="adicional-card">
                <span className="adicional-card__nombre">{a.nombre}</span>
                <span className="adicional-card__precio">{formatPrecio(a.precio)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .services {
          padding: 100px 0;
          background: var(--gradiente-oscuro);
        }
        .services__title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .text-gradient {
          background: var(--gradiente-fuego);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .services__desc {
          text-align: center;
          color: rgba(245,245,245,0.6);
          margin-bottom: 60px;
          font-size: 1.05rem;
        }
        .services__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 32px;
          margin-bottom: 60px;
        }
        .service-card {
          background: var(--gradiente-card);
          border: 1px solid var(--gris);
          border-radius: 20px;
          padding: 40px 32px;
          text-align: center;
          position: relative;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .service-card--destacado {
          border-color: var(--naranjo);
          box-shadow: 0 0 30px rgba(232, 96, 26, 0.15);
        }
        .service-card__badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gradiente-fuego);
          padding: 6px 24px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .service-card__icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }
        .service-card__nombre {
          font-size: 1.6rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .service-card__sub {
          font-weight: 600;
          font-size: 0.95rem;
          display: block;
          margin-bottom: 12px;
        }
        .service-card__desc {
          color: rgba(245,245,245,0.6);
          font-size: 0.9rem;
          margin-bottom: 20px;
        }
        .service-card__lista {
          list-style: none;
          text-align: left;
          margin-bottom: 24px;
        }
        .service-card__lista li {
          padding: 6px 0;
          font-size: 0.9rem;
          color: rgba(245,245,245,0.8);
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .check {
          font-weight: 700;
          flex-shrink: 0;
        }
        .service-card__precios {
          background: rgba(0,0,0,0.3);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }
        .service-card__precio-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 0.95rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .service-card__precio-row:last-child {
          border-bottom: none;
        }
        .service-card__precio {
          font-weight: 700;
          font-size: 1.05rem;
        }
        .service-card__btn {
          display: inline-block;
          padding: 14px 40px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--blanco-puro);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .service-card__btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        .services__adicionales {
          background: var(--gradiente-card);
          border: 1px solid var(--gris);
          border-radius: 20px;
          padding: 36px;
        }
        .services__adicionales h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-align: center;
        }
        .adicionales__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }
        .adicional-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0,0,0,0.3);
          padding: 16px 24px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .adicional-card__nombre {
          font-weight: 600;
          font-size: 0.95rem;
        }
        .adicional-card__precio {
          color: var(--naranjo);
          font-weight: 700;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .services { padding: 60px 0; }
          .services__title { font-size: 2rem; }
          .services__grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .service-card {
            padding: 32px 20px;
          }
          .services__adicionales {
            padding: 24px 16px;
          }
          .adicionales__grid {
            grid-template-columns: 1fr;
          }
          .adicional-card {
            padding: 14px 16px;
          }
        }

        @media (max-width: 380px) {
          .services__title { font-size: 1.7rem; }
          .services__desc { font-size: 0.9rem; }
          .service-card__nombre { font-size: 1.3rem; }
          .service-card__precios { padding: 12px; }
          .service-card__precio-row { font-size: 0.85rem; }
          .service-card__precio { font-size: 0.95rem; }
          .service-card__btn {
            padding: 12px 32px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}

export default Services;
