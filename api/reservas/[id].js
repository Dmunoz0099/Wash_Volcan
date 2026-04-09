const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const { estado } = req.body;
    const estados_validos = ['pendiente', 'confirmada', 'completada', 'cancelada'];

    if (!estado || !estados_validos.includes(estado)) {
      return res.status(400).json({ error: `Estado inválido. Usar: ${estados_validos.join(', ')}` });
    }

    const { data, error } = await supabase
      .from('reservas')
      .update({ estado })
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    res.json({ mensaje: 'Estado actualizado', id, estado });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error al actualizar reserva' });
  }
};
