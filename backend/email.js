const nodemailer = require('nodemailer');

// Configurar transporter de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Envía email de confirmación al cliente
 */
async function enviarConfirmacionCliente(reserva) {
  try {
    const { nombre, email, servicio, tipo_vehiculo, fecha, hora, direccion, precio_total, id } = reserva;

    const formatFecha = (f) => {
      const [y, m, d] = f.split('-');
      return `${d}/${m}/${y}`;
    };

    const html = `
      <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px;">
        <div style="background: linear-gradient(135deg, #d42020 0%, #e8601a 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">🔥 ¡Reserva Confirmada!</h1>
          <p style="margin: 10px 0 0 0; font-size: 14px;">Volcán Wash Móvil</p>
        </div>

        <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px;">
          <p style="margin: 0 0 20px 0; font-size: 16px; color: #333;">Hola <strong>${nombre}</strong>,</p>

          <p style="margin: 0 0 20px 0; color: #666;">Tu reserva ha sido confirmada exitosamente. Nos presentaremos en tu domicilio en la fecha y hora programada con todo nuestro equipo profesional.</p>

          <div style="background: #f9f9f9; border-left: 4px solid #e8601a; padding: 20px; margin: 20px 0; border-radius: 4px;">
            <h3 style="margin: 0 0 15px 0; color: #333;">Detalles de tu Reserva</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; color: #666;">N° Reserva:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">#${id}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; color: #666;">Servicio:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">${servicio}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; color: #666;">Tipo de Vehículo:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">${tipo_vehiculo}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; color: #666;">Fecha:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">${formatFecha(fecha)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; color: #666;">Hora:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">${hora} hrs</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; color: #666;">Dirección:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">${direccion}</td>
              </tr>
              <tr style="background: #fff8f0;">
                <td style="padding: 12px 0; color: #666; font-weight: bold;">Total:</td>
                <td style="padding: 12px 0; font-weight: bold; color: #e8601a; font-size: 16px;">$${precio_total.toLocaleString('es-CL')}</td>
              </tr>
            </table>
          </div>

          <p style="margin: 20px 0; color: #666; font-size: 14px;">
            <strong>📍 Próximos pasos:</strong><br>
            Nos contactaremos contigo en las próximas 2 horas para confirmar los detalles y responder cualquier pregunta que tengas.
          </p>

          <p style="margin: 20px 0; color: #666; font-size: 14px;">
            <strong>❓ ¿Preguntas?</strong><br>
            Contacta con nosotros por WhatsApp: <strong>+56 9 9556 3267</strong>
          </p>

          <p style="margin: 20px 0 0 0; color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px;">
            Volcán Wash Móvil • Lavado Premium a Domicilio<br>
            Este es un email automático, no responder a este correo.
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `Volcán Wash Móvil <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ Reserva Confirmada #${id} - Volcán Wash Móvil`,
      html,
    });

    console.log(`✅ Email de confirmación enviado a ${email}`);
    return true;
  } catch (error) {
    console.error(`❌ Error enviando email al cliente:`, error.message);
    return false;
  }
}

/**
 * Envía email de notificación al propietario
 */
async function enviarNotificacionPropietario(reserva) {
  try {
    const { id, nombre, email, telefono, servicio, tipo_vehiculo, adicionales, fecha, hora, direccion, precio_total } = reserva;

    const formatFecha = (f) => {
      const [y, m, d] = f.split('-');
      return `${d}/${m}/${y}`;
    };

    const html = `
      <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0a0a0a; color: #e8601a; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">🔥 NUEVA RESERVA</h2>
        </div>

        <div style="background: #1a1a1a; color: #f5f5f5; padding: 20px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 10px 0; color: #999;">ID:</td>
              <td style="padding: 10px 0; font-weight: bold;">#${id}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 10px 0; color: #999;">Cliente:</td>
              <td style="padding: 10px 0; font-weight: bold;">${nombre}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 10px 0; color: #999;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #e8601a;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 10px 0; color: #999;">Teléfono:</td>
              <td style="padding: 10px 0; font-weight: bold;">${telefono}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 10px 0; color: #999;">Servicio:</td>
              <td style="padding: 10px 0; font-weight: bold;">${servicio}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 10px 0; color: #999;">Vehículo:</td>
              <td style="padding: 10px 0; font-weight: bold;">${tipo_vehiculo}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 10px 0; color: #999;">Adicionales:</td>
              <td style="padding: 10px 0; font-weight: bold;">${adicionales || 'Ninguno'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 10px 0; color: #999;">Fecha:</td>
              <td style="padding: 10px 0; font-weight: bold;">${formatFecha(fecha)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 10px 0; color: #999;">Hora:</td>
              <td style="padding: 10px 0; font-weight: bold;">${hora} hrs</td>
            </tr>
            <tr style="border-bottom: 1px solid #333;">
              <td style="padding: 10px 0; color: #999;">Dirección:</td>
              <td style="padding: 10px 0; font-weight: bold;">${direccion}</td>
            </tr>
            <tr style="background: #2a2a2a;">
              <td style="padding: 12px 0; color: #999; font-weight: bold;">TOTAL:</td>
              <td style="padding: 12px 0; color: #e8601a; font-weight: bold; font-size: 16px;">$${precio_total.toLocaleString('es-CL')}</td>
            </tr>
          </table>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `Volcán Wash Móvil <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `🔥 NUEVA RESERVA #${id} - ${nombre} - ${formatFecha(fecha)} ${hora}`,
      html,
    });

    console.log(`✅ Notificación enviada al propietario`);
    return true;
  } catch (error) {
    console.error(`❌ Error enviando email al propietario:`, error.message);
    return false;
  }
}

module.exports = {
  enviarConfirmacionCliente,
  enviarNotificacionPropietario,
};
