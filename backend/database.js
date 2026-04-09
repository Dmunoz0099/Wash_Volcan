const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'volcan_wash.db'));

// Habilitar WAL para mejor rendimiento concurrente
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS reservas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    email TEXT NOT NULL,
    servicio TEXT NOT NULL,
    tipo_vehiculo TEXT NOT NULL,
    adicionales TEXT DEFAULT '',
    fecha TEXT NOT NULL,
    hora TEXT NOT NULL,
    direccion TEXT NOT NULL,
    precio_total INTEGER NOT NULL,
    estado TEXT DEFAULT 'pendiente',
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  );

  CREATE TABLE IF NOT EXISTS horarios_bloqueados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT NOT NULL,
    hora TEXT NOT NULL,
    UNIQUE(fecha, hora)
  )
`);

// Agregar columna email si no existe (para bases de datos existentes)
try {
  db.exec('ALTER TABLE reservas ADD COLUMN email TEXT NOT NULL DEFAULT "noespecificado@email.com"');
} catch (err) {
  // Columna ya existe, ignorar error
}

module.exports = db;
