import { useState } from 'react';

function Reviews() {
  const [clienteSeleccionado, setClienteSeleccionado] = useState('cliente-1');
  const [imagenActual, setImagenActual] = useState(0);

  const resenas = {
    'cliente-1': {
      nombre: 'Cliente 1',
      calificacion: 5,
      texto: 'Excelente servicio de lavado. El auto quedó impecable, tanto por dentro como por fuera. El equipo fue muy profesional y eficiente. ¡Muy recomendado!',
      fecha: 'Abril 2026',
      imagenes: [
        '/resenas/cliente 1/WhatsApp Image 2026-04-08 at 10.37.56 (1).jpeg',
        '/resenas/cliente 1/WhatsApp Image 2026-04-08 at 10.37.56.jpeg',
        '/resenas/cliente 1/WhatsApp Image 2026-04-08 at 10.37.57.jpeg',
        '/resenas/cliente 1/WhatsApp Image 2026-04-08 at 10.37.58 (1).jpeg',
        '/resenas/cliente 1/WhatsApp Image 2026-04-08 at 10.37.58.jpeg',
        '/resenas/cliente 1/WhatsApp Image 2026-04-08 at 10.37.59.jpeg',
        '/resenas/cliente 1/WhatsApp Image 2026-04-08 at 10.38.13.jpeg',
      ],
    },
    'cliente-2': {
      nombre: 'Cliente 2',
      calificacion: 5,
      texto: 'Servicio de primera calidad. El equipo llegó puntual, trabajó de manera profesional y mi auto quedó como nuevo. Los productos utilizados son de muy buena calidad. ¡Definitivamente vuelvo a contratar!',
      fecha: 'Abril 2026',
      imagenes: [
        '/resenas/cliente2/WhatsApp Image 2026-04-08 at 10.36.50 (1).jpeg',
        '/resenas/cliente2/WhatsApp Image 2026-04-08 at 10.36.50 (2).jpeg',
        '/resenas/cliente2/WhatsApp Image 2026-04-08 at 10.36.50.jpeg',
        '/resenas/cliente2/WhatsApp Image 2026-04-08 at 10.36.51 (1).jpeg',
        '/resenas/cliente2/WhatsApp Image 2026-04-08 at 10.36.51.jpeg',
      ],
    },
    'cliente-3': {
      nombre: 'Cliente 3',
      calificacion: 5,
      texto: 'Impresionado con el resultado final. El lavado fue completo y detallado. El personal es muy atento y se nota que conoce su trabajo. Excelente relación calidad-precio.',
      fecha: 'Abril 2026',
      imagenes: [
        '/resenas/cliente 3/WhatsApp Image 2026-04-08 at 15.32.59 (1).jpeg',
        '/resenas/cliente 3/WhatsApp Image 2026-04-08 at 15.32.59 (2).jpeg',
        '/resenas/cliente 3/WhatsApp Image 2026-04-08 at 15.32.59.jpeg',
        '/resenas/cliente 3/WhatsApp Image 2026-04-08 at 15.33.00 (1).jpeg',
        '/resenas/cliente 3/WhatsApp Image 2026-04-08 at 15.33.00.jpeg',
      ],
    },
  };

  const resenaActual = resenas[clienteSeleccionado];
  const imagenUrl = resenaActual.imagenes[imagenActual];

  const moverImagenAnterior = () => {
    setImagenActual((prev) =>
      prev === 0 ? resenaActual.imagenes.length - 1 : prev - 1
    );
  };

  const moverImagenSiguiente = () => {
    setImagenActual((prev) =>
      prev === resenaActual.imagenes.length - 1 ? 0 : prev + 1
    );
  };

  const renderEstrellas = (calificacion) => {
    return '⭐'.repeat(calificacion);
  };

  return (
    <section id="resenas" className="reviews">
      <div className="container">
        <h2 className="reviews__title">
          Lo que dicen nuestros <span className="text-gradient">clientes</span>
        </h2>
        <p className="reviews__desc">
          Mira cómo dejamos los autos de nuestros clientes satisfechos
        </p>

        {/* Selector de clientes */}
        <div className="reviews__selector">
          {Object.keys(resenas).map((cliente) => (
            <button
              key={cliente}
              className={`reviews__cliente-btn ${
                clienteSeleccionado === cliente ? 'reviews__cliente-btn--active' : ''
              }`}
              onClick={() => {
                setClienteSeleccionado(cliente);
                setImagenActual(0);
              }}
            >
              {resenas[cliente].nombre}
            </button>
          ))}
        </div>

        {/* Contenido de la reseña */}
        <div className="reviews__content">
          {/* Galería de imágenes */}
          <div className="reviews__gallery">
            <div className="reviews__image-container">
              <img
                src={imagenUrl}
                alt={`Resultado del lavado - ${resenaActual.nombre}`}
                className="reviews__image"
              />
              <button
                className="reviews__nav-btn reviews__nav-btn--prev"
                onClick={moverImagenAnterior}
                aria-label="Imagen anterior"
              >
                ‹
              </button>
              <button
                className="reviews__nav-btn reviews__nav-btn--next"
                onClick={moverImagenSiguiente}
                aria-label="Imagen siguiente"
              >
                ›
              </button>
            </div>

            {/* Indicador de imagen */}
            <div className="reviews__image-counter">
              {imagenActual + 1} / {resenaActual.imagenes.length}
            </div>

            {/* Thumbnails */}
            <div className="reviews__thumbnails">
              {resenaActual.imagenes.map((img, idx) => (
                <button
                  key={idx}
                  className={`reviews__thumbnail ${
                    imagenActual === idx ? 'reviews__thumbnail--active' : ''
                  }`}
                  onClick={() => setImagenActual(idx)}
                  aria-label={`Imagen ${idx + 1}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Texto de la reseña */}
          <div className="reviews__text">
            <h3 className="reviews__cliente-nombre">{resenaActual.nombre}</h3>
            <div className="reviews__stars">{renderEstrellas(resenaActual.calificacion)}</div>
            <p className="reviews__texto">{resenaActual.texto}</p>
            <p className="reviews__fecha">{resenaActual.fecha}</p>
          </div>
        </div>
      </div>

      <style>{`
        .reviews {
          padding: 100px 0;
          background: var(--gradiente-oscuro);
        }

        .reviews__title {
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

        .reviews__desc {
          text-align: center;
          color: rgba(245, 245, 245, 0.6);
          margin-bottom: 50px;
          font-size: 1.05rem;
        }

        .reviews__selector {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .reviews__cliente-btn {
          padding: 12px 32px;
          border: 2px solid var(--azul-agua);
          background: transparent;
          color: var(--blanco-puro);
          border-radius: 30px;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.95rem;
          text-transform: uppercase;
          transition: all 0.3s;
        }

        .reviews__cliente-btn:hover {
          border-color: var(--naranjo);
          color: var(--naranjo);
        }

        .reviews__cliente-btn--active {
          background: var(--gradiente-fuego);
          border-color: var(--naranjo);
          color: var(--blanco-puro);
          box-shadow: 0 0 20px rgba(232, 96, 26, 0.3);
        }

        .reviews__content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
          background: var(--gradiente-card);
          border: 1px solid var(--gris);
          border-radius: 20px;
          padding: 50px;
        }

        .reviews__gallery {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .reviews__image-container {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          aspect-ratio: 1;
          background: rgba(0, 0, 0, 0.3);
        }

        .reviews__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .reviews__nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: rgba(0, 0, 0, 0.6);
          color: var(--blanco-puro);
          border: 2px solid var(--naranjo);
          border-radius: 50%;
          font-size: 2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          z-index: 2;
        }

        .reviews__nav-btn:hover {
          background: rgba(232, 96, 26, 0.8);
          transform: translateY(-50%) scale(1.1);
        }

        .reviews__nav-btn--prev {
          left: 16px;
        }

        .reviews__nav-btn--next {
          right: 16px;
        }

        .reviews__image-counter {
          text-align: center;
          color: rgba(245, 245, 245, 0.6);
          font-size: 0.9rem;
          font-weight: 600;
        }

        .reviews__thumbnails {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding: 4px;
        }

        .reviews__thumbnail {
          width: 70px;
          height: 70px;
          border: 2px solid transparent;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
          flex-shrink: 0;
          background: rgba(0, 0, 0, 0.3);
          padding: 0;
        }

        .reviews__thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .reviews__thumbnail:hover {
          border-color: var(--azul-agua);
        }

        .reviews__thumbnail--active {
          border-color: var(--naranjo);
          box-shadow: 0 0 12px rgba(232, 96, 26, 0.5);
        }

        .reviews__text {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .reviews__cliente-nombre {
          font-size: 1.8rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .reviews__stars {
          font-size: 1.5rem;
          letter-spacing: 4px;
        }

        .reviews__texto {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(245, 245, 245, 0.9);
          font-weight: 500;
        }

        .reviews__fecha {
          color: rgba(245, 245, 245, 0.5);
          font-size: 0.95rem;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .reviews__content {
            grid-template-columns: 1fr;
            padding: 36px;
          }
        }

        @media (max-width: 768px) {
          .reviews {
            padding: 60px 0;
          }

          .reviews__title {
            font-size: 2rem;
          }

          .reviews__content {
            padding: 24px;
            gap: 30px;
          }

          .reviews__selector {
            gap: 8px;
          }

          .reviews__cliente-btn {
            padding: 10px 20px;
            font-size: 0.85rem;
          }

          .reviews__texto {
            font-size: 1rem;
          }

          .reviews__thumbnails {
            gap: 8px;
          }

          .reviews__thumbnail {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </section>
  );
}

export default Reviews;
