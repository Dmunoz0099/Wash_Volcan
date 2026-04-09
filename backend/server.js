require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database');
const { enviarConfirmacionCliente, enviarNotificacionPropietario } = require('./email');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ── Horarios disponibles ──────────────────────────────────────────
const HORARIOS = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00', '18:00'
];

// ── GET /api/horarios-disponibles?fecha=YYYY-MM-DD ────────────────
app.get('/api/horarios-disponibles', (req, res) => {
  const { fecha } = req.query;
  if (!fecha) return res.status(400).json({ error: 'Fecha requerida' });

  const reservasExistentes = db
    .prepare('SELECT hora FROM reservas WHERE fecha = ? AND estado != ?')
    .all(fecha, 'cancelada');

  const bloqueados = db
    .prepare('SELECT hora FROM horarios_bloqueados WHERE fecha = ?')
    .all(fecha);

  const ocupados = new Set([
    ...reservasExistentes.map(r => r.hora),
    ...bloqueados.map(b => b.hora)
  ]);

  const disponibles = HORARIOS.filter(h => !ocupados.has(h));
  res.json({ fecha, disponibles });
});

// ── POST /api/reservas ────────────────────────────────────────────
app.post('/api/reservas', (req, res) => {
  const { nombre, telefono, email, servicio, tipo_vehiculo, adicionales, fecha, hora, direccion, precio_total } = req.body;

  // Validación básica
  if (!nombre || !telefono || !email || !servicio || !tipo_vehiculo || !fecha || !hora || !direccion || !precio_total) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar completos' });
  }

  // Validación de email básica
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  // Verificar disponibilidad
  const existente = db
    .prepare('SELECT id FROM reservas WHERE fecha = ? AND hora = ? AND estado != ?')
    .get(fecha, hora, 'cancelada');

  if (existente) {
    return res.status(409).json({ error: 'Este horario ya está reservado' });
  }

  const stmt = db.prepare(`
    INSERT INTO reservas (nombre, telefono, email, servicio, tipo_vehiculo, adicionales, fecha, hora, direccion, precio_total)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(nombre, telefono, email, servicio, tipo_vehiculo, adicionales || '', fecha, hora, direccion, precio_total);

  const reservaId = result.lastInsertRowid;

  // Enviar emails en background (no esperar respuesta)
  const reservaCompleta = {
    id: reservaId,
    nombre,
    email,
    telefono,
    servicio,
    tipo_vehiculo,
    adicionales: adicionales || '',
    fecha,
    hora,
    direccion,
    precio_total,
  };

  enviarConfirmacionCliente(reservaCompleta);
  enviarNotificacionPropietario(reservaCompleta);

  res.status(201).json({
    id: reservaId,
    mensaje: 'Reserva creada exitosamente',
    resumen: { nombre, servicio, tipo_vehiculo, fecha, hora, direccion, precio_total, email }
  });
});

// ── GET /api/reservas (admin) ─────────────────────────────────────
app.get('/api/reservas', (req, res) => {
  const { fecha, estado } = req.query;
  let query = 'SELECT * FROM reservas WHERE 1=1';
  const params = [];

  if (fecha) { query += ' AND fecha = ?'; params.push(fecha); }
  if (estado) { query += ' AND estado = ?'; params.push(estado); }

  query += ' ORDER BY fecha DESC, hora ASC';
  const reservas = db.prepare(query).all(...params);
  res.json(reservas);
});

// ── PATCH /api/reservas/:id ───────────────────────────────────────
app.patch('/api/reservas/:id', (req, res) => {
  const { estado } = req.body;
  const estados_validos = ['pendiente', 'confirmada', 'completada', 'cancelada'];

  if (!estado || !estados_validos.includes(estado)) {
    return res.status(400).json({ error: `Estado inválido. Usar: ${estados_validos.join(', ')}` });
  }

  const result = db
    .prepare('UPDATE reservas SET estado = ? WHERE id = ?')
    .run(estado, req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }

  res.json({ mensaje: 'Estado actualizado', id: req.params.id, estado });
});

// ── Inicio del servidor ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Volcán Wash API corriendo en http://localhost:${PORT}`);
});
