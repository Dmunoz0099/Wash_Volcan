import { useState, useEffect } from 'react';

const PRECIOS = {
  basico: { city_car: 12000, sedan: 15000, suv: 20000 },
  full: { city_car: 15000, sedan: 20000, suv: 25000 },
};

const ADICIONALES = [
  { id: 'pulido_vidrios', nombre: 'Pulido de vidrios', precio: 15000 },
  { id: 'pulido_sellado', nombre: 'Pulido + Sellado hidrofóbico', precio: 20000 },
];

const TIPOS_VEHICULO = [
  { value: 'city_car', label: 'City Car' },
  { value: 'sedan', label: 'Sedán' },
  { value: 'suv', label: 'SUV / Camioneta' },
];

// Horarios disponibles de 8am a 6pm (formato 24 horas)
const HORARIOS_DISPONIBLES = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

// Convertir horarios 24h a formato 12h con am/pm
const formatearHora = (hora24) => {
  const [horas, minutos] = hora24.split(':');
  const h = parseInt(horas);
  const periodo = h >= 12 ? 'pm' : 'am';
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${String(h12).padStart(2, '0')}:${minutos} ${periodo}`;
};

function Booking({ onReservaExitosa }) {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    email: '',
    servicio: 'full',
    tipo_vehiculo: 'sedan',
    adicionales: [],
    fecha: '',
    hora: '',
    direccion: '',
  });

  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [cargandoHoras, setCargandoHoras] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  // Fecha mínima: mañana
  const hoy = new Date();
  hoy.setDate(hoy.getDate() + 1);
  const fechaMinima = hoy.toISOString().split('T')[0];

  useEffect(() => {
    if (!form.fecha) {
      setHorasDisponibles([]);
      return;
    }
    setCargandoHoras(true);

    // Obtener horarios disponibles del backend (si existe)
    // Si no, usar todos los horarios predefinidos
    fetch(`/api/horarios-disponibles?fecha=${form.fecha}`)
      .then(r => r.json())
      .then(data => {
        const horasBackend = data.disponibles || HORARIOS_DISPONIBLES;
        setHorasDisponibles(horasBackend);
        setCargandoHoras(false);
        if (form.hora && !horasBackend.includes(form.hora)) {
          setForm(f => ({ ...f, hora: '' }));
        }
      })
      .catch(() => {
        // Si la API falla, usar todos los horarios
        setHorasDisponibles(HORARIOS_DISPONIBLES);
        setCargandoHoras(false);
      });
  }, [form.fecha]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const toggleAdicional = (id) => {
    setForm(f => ({
      ...f,
      adicionales: f.adicionales.includes(id)
        ? f.adicionales.filter(a => a !== id)
        : [...f.adicionales, id],
    }));
  };

  const precioBase = PRECIOS[form.servicio]?.[form.tipo_vehiculo] || 0;
  const precioAdicionales = form.adicionales.reduce((sum, id) => {
    const a = ADICIONALES.find(x => x.id === id);
    return sum + (a?.precio || 0);
  }, 0);
  const precioTotal = precioBase + precioAdicionales;
  const formatPrecio = (n) => `$${n.toLocaleString('es-CL')}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.nombre || !form.telefono || !form.email || !form.fecha || !form.hora || !form.direccion) {
      setError('Por favor completa todos los campos obligatorios');
      return;
    }

    if (!form.email.includes('@')) {
      setError('Email inválido');
      return;
    }

    setEnviando(true);
    try {
      const servicioLabel = form.servicio === 'basico' ? 'Lavado Básico' : 'Lavado Full';
      const tipoLabel = TIPOS_VEHICULO.find(t => t.value === form.tipo_vehiculo)?.label;
      const adicionalesLabel = form.adicionales
        .map(id => ADICIONALES.find(a => a.id === id)?.nombre)
        .filter(Boolean)
        .join(', ');

      const res = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          telefono: form.telefono,
          email: form.email,
          servicio: servicioLabel,
          tipo_vehiculo: tipoLabel,
          adicionales: adicionalesLabel,
          fecha: form.fecha,
          hora: form.hora,
          direccion: form.direccion,
          precio_total: precioTotal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al crear la reserva');
        setEnviando(false);
        return;
      }

      onReservaExitosa({
        id: data.id,
        nombre: form.nombre,
        email: form.email,
        servicio: servicioLabel,
        tipo_vehiculo: tipoLabel,
        adicionales: adicionalesLabel,
        fecha: form.fecha,
        hora: form.hora,
        direccion: form.direccion,
        precio_total: precioTotal,
      });

      setForm({
        nombre: '', telefono: '', email: '', servicio: 'full', tipo_vehiculo: 'sedan',
        adicionales: [], fecha: '', hora: '', direccion: '',
      });
    } catch {
      setError('Error de conexión. Intenta nuevamente.');
    }
    setEnviando(false);
  };

  return (
    <section id="reservar" className="booking">
      <div className="container">
        <h2 className="booking__title">
          Reserva tu <span className="text-gradient">Hora</span>
        </h2>
        <p className="booking__desc">
          Selecciona tu servicio, elige la fecha y hora, y nosotros vamos a ti
        </p>

        <form className="booking__form" onSubmit={handleSubmit}>
          <div className="booking__grid">
            {/* Datos personales */}
            <div className="form-group">
              <label>Nombre completo *</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="form-group">
              <label>Teléfono *</label>
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="+56 9 XXXX XXXX"
                required
              />
            </div>
            <div className="form-group">
              <label>Correo Electrónico *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </div>

            {/* Servicio y vehículo */}
            <div className="form-group">
              <label>Servicio *</label>
              <select name="servicio" value={form.servicio} onChange={handleChange}>
                <option value="basico">🧼 Lavado Básico (Exterior)</option>
                <option value="full">✨ Lavado Full (Exterior + Interior)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tipo de vehículo *</label>
              <select name="tipo_vehiculo" value={form.tipo_vehiculo} onChange={handleChange}>
                {TIPOS_VEHICULO.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Adicionales */}
            <div className="form-group form-group--full">
              <label>Servicios adicionales</label>
              <div className="booking__adicionales">
                {ADICIONALES.map(a => (
                  <label key={a.id} className={`adicional-check ${form.adicionales.includes(a.id) ? 'active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={form.adicionales.includes(a.id)}
                      onChange={() => toggleAdicional(a.id)}
                    />
                    <span>{a.nombre}</span>
                    <span className="adicional-check__precio">{formatPrecio(a.precio)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fecha y hora */}
            <div className="form-group">
              <label>Fecha *</label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                min={fechaMinima}
                required
              />
            </div>
            <div className="form-group">
              <label>Hora *</label>
              {cargandoHoras ? (
                <div className="booking__loading">Cargando horarios...</div>
              ) : !form.fecha ? (
                <div className="booking__loading">Selecciona una fecha primero</div>
              ) : horasDisponibles.length === 0 ? (
                <div className="booking__loading">No hay horarios disponibles</div>
              ) : (
                <div className="booking__horas">
                  {horasDisponibles.map(h => (
                    <button
                      key={h}
                      type="button"
                      className={`hora-btn ${form.hora === h ? 'hora-btn--active' : ''}`}
                      onClick={() => { setForm(f => ({ ...f, hora: h })); setError(''); }}
                    >
                      {formatearHora(h)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dirección */}
            <div className="form-group form-group--full">
              <label>Dirección completa *</label>
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Calle, número, comuna"
                required
              />
            </div>
          </div>

          {/* Resumen de precio */}
          <div className="booking__resumen">
            <div className="booking__resumen-row">
              <span>Servicio base</span>
              <span>{formatPrecio(precioBase)}</span>
            </div>
            {precioAdicionales > 0 && (
              <div className="booking__resumen-row">
                <span>Adicionales</span>
                <span>{formatPrecio(precioAdicionales)}</span>
              </div>
            )}
            <div className="booking__resumen-total">
              <span>Total</span>
              <span>{formatPrecio(precioTotal)}</span>
            </div>
          </div>

          {error && <div className="booking__error">{error}</div>}

          <button type="submit" className="booking__submit" disabled={enviando}>
            {enviando ? 'Reservando...' : 'Confirmar Reserva'}
          </button>
        </form>
      </div>

      <style>{`
        .booking {
          padding: 100px 0;
          background: var(--negro-suave);
        }
        .booking__title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .booking__desc {
          text-align: center;
          color: rgba(245,245,245,0.6);
          margin-bottom: 48px;
          font-size: 1.05rem;
        }
        .booking__form {
          max-width: 700px;
          margin: 0 auto;
          background: var(--gradiente-card);
          border: 1px solid var(--gris);
          border-radius: 20px;
          padding: 40px;
        }
        .booking__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        .form-group--full {
          grid-column: 1 / -1;
        }
        .form-group label {
          display: block;
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          color: rgba(245,245,245,0.7);
        }
        .form-group input,
        .form-group select {
          width: 100%;
          padding: 14px 16px;
          background: rgba(0,0,0,0.4);
          border: 1px solid var(--gris);
          border-radius: 10px;
          color: var(--blanco);
          font-size: 0.95rem;
          transition: border-color 0.3s;
        }
        .form-group input:focus,
        .form-group select:focus {
          border-color: var(--naranjo);
        }
        .form-group select option {
          background: var(--negro-suave);
          color: var(--blanco);
        }
        .booking__adicionales {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .adicional-check {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--gris);
          border-radius: 10px;
          cursor: pointer;
          transition: border-color 0.3s;
        }
        .adicional-check.active {
          border-color: var(--naranjo);
          background: rgba(232,96,26,0.1);
        }
        .adicional-check input {
          accent-color: var(--naranjo);
          width: 18px;
          height: 18px;
        }
        .adicional-check span:first-of-type {
          flex: 1;
          font-size: 0.9rem;
        }
        .adicional-check__precio {
          font-weight: 700;
          color: var(--naranjo);
        }
        .booking__loading {
          padding: 14px 16px;
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--gris);
          border-radius: 10px;
          color: rgba(245,245,245,0.5);
          font-size: 0.9rem;
        }
        .booking__horas {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .hora-btn {
          padding: 10px 16px;
          background: rgba(0,0,0,0.4);
          border: 1px solid var(--gris);
          border-radius: 8px;
          color: var(--blanco);
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .hora-btn:hover {
          border-color: var(--naranjo);
        }
        .hora-btn--active {
          background: var(--naranjo);
          border-color: var(--naranjo);
          color: var(--blanco-puro);
        }
        .booking__resumen {
          background: rgba(0,0,0,0.3);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .booking__resumen-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 0.95rem;
          color: rgba(245,245,245,0.7);
        }
        .booking__resumen-total {
          display: flex;
          justify-content: space-between;
          padding: 12px 0 0;
          border-top: 1px solid var(--gris);
          margin-top: 8px;
          font-weight: 800;
          font-size: 1.2rem;
          color: var(--naranjo);
        }
        .booking__error {
          background: rgba(212, 32, 32, 0.15);
          border: 1px solid var(--rojo);
          color: #ff6b6b;
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 16px;
          font-size: 0.9rem;
          text-align: center;
        }
        .booking__submit {
          width: 100%;
          padding: 18px;
          background: var(--gradiente-fuego);
          color: var(--blanco-puro);
          border-radius: 12px;
          font-weight: 800;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .booking__submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(212, 32, 32, 0.4);
        }
        .booking__submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .booking { padding: 60px 0; }
          .booking__title { font-size: 2rem; }
          .booking__form { padding: 24px 16px; }
          .booking__grid { grid-template-columns: 1fr; }
          .booking__horas {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
          .hora-btn {
            padding: 10px 8px;
            font-size: 0.82rem;
            text-align: center;
          }
          .booking__resumen {
            padding: 16px;
          }
          .booking__submit {
            padding: 16px;
            font-size: 1rem;
          }
        }

        @media (max-width: 380px) {
          .booking__title { font-size: 1.7rem; }
          .booking__form { padding: 20px 12px; }
          .booking__horas {
            grid-template-columns: repeat(2, 1fr);
          }
          .form-group input,
          .form-group select {
            padding: 12px 14px;
            font-size: 0.9rem;
          }
          .adicional-check {
            padding: 10px 12px;
            gap: 8px;
          }
          .adicional-check span:first-of-type {
            font-size: 0.82rem;
          }
          .adicional-check__precio {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}

export default Booking;
