-- ═════════════════════════════════════════════════════════════════
-- DATOS DE EJEMPLO PARA TESTEAR VOLCÁN WASH EN SUPABASE
-- ═════════════════════════════════════════════════════════════════

-- Insertar reservas de ejemplo
INSERT INTO reservas (nombre, telefono, email, servicio, tipo_vehiculo, adicionales, fecha, hora, direccion, precio_total, estado, created_at)
VALUES
  ('Juan Pérez', '555-0101', 'juan.perez@email.com', 'Lavado Básico', 'Sedan', '', '2026-04-15', '09:00', 'Calle Principal 123', 3500, 'pendiente', NOW()),
  ('María García', '555-0102', 'maria.garcia@email.com', 'Lavado Premium', 'SUV', 'Encerado, Alfombra', '2026-04-15', '10:00', 'Av. Central 456', 6500, 'confirmada', NOW()),
  ('Carlos López', '555-0103', 'carlos.lopez@email.com', 'Lavado Básico', 'Hatchback', '', '2026-04-15', '14:00', 'Calle Secundaria 789', 3500, 'completada', NOW()),
  ('Ana Martínez', '555-0104', 'ana.martinez@email.com', 'Lavado Premium', 'Camioneta', 'Encerado, Interior', '2026-04-15', '15:00', 'Boulevard Norte 234', 7500, 'pendiente', NOW()),
  ('Roberto Sánchez', '555-0105', 'roberto.sanchez@email.com', 'Lavado Básico', 'Sedan', '', '2026-04-16', '09:00', 'Calle Este 567', 3500, 'cancelada', NOW()),
  ('Laura Rodríguez', '555-0106', 'laura.rodriguez@email.com', 'Lavado Premium', 'SUV', 'Alfombra', '2026-04-16', '11:00', 'Calle Oeste 890', 5500, 'pendiente', NOW()),
  ('Miguel González', '555-0107', 'miguel.gonzalez@email.com', 'Lavado Básico', 'Pickup', '', '2026-04-16', '16:00', 'Av. Sur 345', 4500, 'confirmada', NOW()),
  ('Sofía Fernández', '555-0108', 'sofia.fernandez@email.com', 'Lavado Premium', 'Sedan', 'Encerado, Detallado', '2026-04-17', '10:00', 'Calle Norte 678', 8000, 'pendiente', NOW()),
  ('Diego Ramírez', '555-0109', 'diego.ramirez@email.com', 'Lavado Básico', 'Hatchback', '', '2026-04-17', '13:00', 'Boulevard Sur 901', 3500, 'completada', NOW()),
  ('Valentina Torres', '555-0110', 'valentina.torres@email.com', 'Lavado Premium', 'SUV', 'Encerado', '2026-04-17', '17:00', 'Calle Principal 234', 6500, 'pendiente', NOW());

-- Insertar horarios bloqueados para mantenimiento
INSERT INTO horarios_bloqueados (fecha, hora)
VALUES
  ('2026-04-15', '12:00'),
  ('2026-04-15', '13:00'),
  ('2026-04-16', '12:00'),
  ('2026-04-16', '13:00'),
  ('2026-04-17', '12:00'),
  ('2026-04-17', '13:00');

-- ═════════════════════════════════════════════════════════════════
-- VERIFICACIÓN: Ejecuta estas queries para validar los datos
-- ═════════════════════════════════════════════════════════════════

-- Ver todas las reservas
-- SELECT * FROM reservas ORDER BY fecha, hora;

-- Ver reservas por estado
-- SELECT estado, COUNT(*) as cantidad FROM reservas GROUP BY estado;

-- Ver reservas de una fecha específica
-- SELECT * FROM reservas WHERE fecha = '2026-04-15' ORDER BY hora;

-- Ver horarios bloqueados
-- SELECT * FROM horarios_bloqueados ORDER BY fecha, hora;

-- Ver disponibilidad de un día
-- SELECT
--   '09:00' as hora,
--   CASE
--     WHEN hora = '09:00' THEN 'OCUPADA'
--     ELSE 'DISPONIBLE'
--   END as estado
-- FROM reservas
-- WHERE fecha = '2026-04-15' AND hora = '09:00'
-- UNION ALL
-- SELECT '10:00', 'OCUPADA' WHERE EXISTS (SELECT 1 FROM reservas WHERE fecha = '2026-04-15' AND hora = '10:00');
