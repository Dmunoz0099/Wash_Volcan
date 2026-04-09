function BookingConfirmation({ datos, onCerrar }) {
  const formatPrecio = (n) => `$${n.toLocaleString('es-CL')}`;

  const formatFecha = (f) => {
    const [y, m, d] = f.split('-');
    return `${d}/${m}/${y}`;
  };

  return (
    <div className="confirm-overlay" onClick={onCerrar}>
      <div className="confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="confirm__icon">✅</div>
        <h2 className="confirm__title">Reserva Confirmada</h2>
        <p className="confirm__sub">Tu reserva ha sido registrada exitosamente</p>

        <div className="confirm__details">
          <div className="confirm__row">
            <span className="confirm__label">N° Reserva</span>
            <span className="confirm__value">#{datos.id}</span>
          </div>
          <div className="confirm__row">
            <span className="confirm__label">Nombre</span>
            <span className="confirm__value">{datos.nombre}</span>
          </div>
          <div className="confirm__row">
            <span className="confirm__label">Correo</span>
            <span className="confirm__value">{datos.email}</span>
          </div>
          <div className="confirm__row">
            <span className="confirm__label">Servicio</span>
            <span className="confirm__value">{datos.servicio}</span>
          </div>
          <div className="confirm__row">
            <span className="confirm__label">Vehículo</span>
            <span className="confirm__value">{datos.tipo_vehiculo}</span>
          </div>
          {datos.adicionales && (
            <div className="confirm__row">
              <span className="confirm__label">Adicionales</span>
              <span className="confirm__value">{datos.adicionales}</span>
            </div>
          )}
          <div className="confirm__row">
            <span className="confirm__label">Fecha</span>
            <span className="confirm__value">{formatFecha(datos.fecha)}</span>
          </div>
          <div className="confirm__row">
            <span className="confirm__label">Hora</span>
            <span className="confirm__value">{datos.hora} hrs</span>
          </div>
          <div className="confirm__row">
            <span className="confirm__label">Dirección</span>
            <span className="confirm__value">{datos.direccion}</span>
          </div>
          <div className="confirm__row confirm__row--total">
            <span className="confirm__label">Total</span>
            <span className="confirm__value">{formatPrecio(datos.precio_total)}</span>
          </div>
        </div>

        <p className="confirm__note">
          Nos pondremos en contacto contigo para confirmar los detalles. ¡Gracias por preferir Volcán Wash Móvil!
        </p>

        <button className="confirm__btn" onClick={onCerrar}>Entendido</button>
      </div>

      <style>{`
        .confirm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .confirm-modal {
          background: var(--gradiente-card);
          border: 1px solid var(--gris);
          border-radius: 24px;
          padding: 40px;
          max-width: 480px;
          width: 100%;
          text-align: center;
          animation: fadeInUp 0.4s ease;
        }
        .confirm__icon {
          font-size: 3.5rem;
          margin-bottom: 16px;
        }
        .confirm__title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--naranjo);
        }
        .confirm__sub {
          color: rgba(245,245,245,0.6);
          margin-bottom: 28px;
        }
        .confirm__details {
          background: rgba(0,0,0,0.3);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .confirm__row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.9rem;
        }
        .confirm__row:last-child {
          border-bottom: none;
        }
        .confirm__label {
          color: rgba(245,245,245,0.5);
        }
        .confirm__value {
          font-weight: 600;
          text-align: right;
          max-width: 60%;
        }
        .confirm__row--total {
          border-top: 1px solid var(--gris);
          margin-top: 8px;
          padding-top: 14px;
        }
        .confirm__row--total .confirm__value {
          color: var(--naranjo);
          font-size: 1.2rem;
          font-weight: 800;
        }
        .confirm__note {
          font-size: 0.85rem;
          color: rgba(245,245,245,0.5);
          margin-bottom: 24px;
          line-height: 1.6;
        }
        .confirm__btn {
          width: 100%;
          padding: 16px;
          background: var(--gradiente-fuego);
          color: var(--blanco-puro);
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          text-transform: uppercase;
          transition: transform 0.3s;
        }
        .confirm__btn:hover {
          transform: scale(1.02);
        }

        @media (max-width: 768px) {
          .confirm-modal { padding: 28px 16px; }
          .confirm__title { font-size: 1.5rem; }
          .confirm__details { padding: 16px; }
          .confirm__row { font-size: 0.82rem; padding: 8px 0; }
          .confirm__value { max-width: 55%; }
        }

        @media (max-width: 380px) {
          .confirm-overlay { padding: 12px; }
          .confirm-modal { padding: 24px 12px; }
          .confirm__icon { font-size: 2.5rem; }
          .confirm__title { font-size: 1.3rem; }
        }
      `}</style>
    </div>
  );
}

export default BookingConfirmation;
