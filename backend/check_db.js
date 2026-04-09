const Database = require('better-sqlite3');
const db = new Database('./volcan_wash.db');

console.log('\n=== ESTADO DE LA BASE DE DATOS ===\n');

console.log('Reservas para 2026-04-11:');
const reservas = db.prepare('SELECT id, fecha, hora, nombre FROM reservas WHERE fecha = ? ORDER BY hora').all('2026-04-11');
if (reservas.length === 0) {
  console.log('  ❌ No hay reservas para esa fecha');
} else {
  reservas.forEach(r => {
    console.log(`  ✓ ID:${r.id}, Hora: ${r.hora}, Nombre: ${r.nombre}`);
  });
}

console.log('\nÚltimas 10 reservas en general:');
const todas = db.prepare('SELECT id, fecha, hora, nombre FROM reservas ORDER BY fecha DESC, hora ASC LIMIT 10').all();
if (todas.length === 0) {
  console.log('  (BD vacía)');
} else {
  todas.forEach(r => {
    console.log(`  • ${r.fecha} ${r.hora} - ${r.nombre}`);
  });
}

console.log(`\nTotal de reservas: ${todas.length}`);

db.close();
