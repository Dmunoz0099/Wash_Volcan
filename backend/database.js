require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Validar variables de entorno
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error('SUPABASE_URL y SUPABASE_KEY son requeridas en .env');
}

// Crear cliente de Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Wrapper para mantener sintaxis similar a SQLite
class DatabaseWrapper {
  prepare(sql) {
    return {
      all: async (...params) => {
        return this._executeQuery(sql, params);
      },
      get: async (...params) => {
        const results = await this._executeQuery(sql, params);
        return results[0] || null;
      },
      run: async (...params) => {
        return this._executeModify(sql, params);
      }
    };
  }

  async _executeQuery(sql, params) {
    try {
      // Determinar tabla y usar método específico
      let data, error;

      if (sql.includes('FROM reservas')) {
        ({ data, error } = await supabase
          .from('reservas')
          .select('*'));
      } else if (sql.includes('FROM horarios_bloqueados')) {
        ({ data, error } = await supabase
          .from('horarios_bloqueados')
          .select('*'));
      }

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Database query error:', err);
      return [];
    }
  }

  async _executeModify(sql, params) {
    try {
      if (sql.includes('INSERT INTO reservas')) {
        const [nombre, telefono, email, servicio, tipo_vehiculo, adicionales, fecha, hora, direccion, precio_total] = params;
        const { data, error } = await supabase
          .from('reservas')
          .insert([{
            nombre, telefono, email, servicio, tipo_vehiculo, adicionales, fecha, hora, direccion, precio_total
          }])
          .select();

        if (error) throw error;
        return { changes: 1, lastInsertRowid: data[0]?.id };
      } else if (sql.includes('UPDATE reservas')) {
        const [estado, id] = params;
        const { error } = await supabase
          .from('reservas')
          .update({ estado })
          .eq('id', id);

        if (error) throw error;
        return { changes: 1, lastInsertRowid: null };
      }
    } catch (err) {
      console.error('Database modify error:', err);
      return { changes: 0, lastInsertRowid: null };
    }
  }
}

module.exports = new DatabaseWrapper();
module.exports.supabase = supabase;
