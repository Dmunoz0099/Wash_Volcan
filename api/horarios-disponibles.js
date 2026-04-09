const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const HORARIOS = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fecha } = req.query;
    if (!fecha) return res.status(400).json({ error: 'Fecha requerida' });

    const { data: reservas, error: err1 } = await supabase
      .from('reservas')
      .select('hora')
      .eq('fecha', fecha)
      .neq('estado', 'cancelada');

    const { data: bloqueados, error: err2 } = await supabase
      .from('horarios_bloqueados')
      .select('hora')
      .eq('fecha', fecha);

    if (err1) throw err1;
    if (err2) throw err2;

    const ocupados = new Set([
      ...(reservas || []).map(r => r.hora),
      ...(bloqueados || []).map(b => b.hora)
    ]);

    const disponibles = HORARIOS.filter(h => !ocupados.has(h));
    res.json({ fecha, disponibles });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error al obtener horarios' });
  }
};
