require('dotenv').config();
const nodemailer = require('nodemailer');

async function testGmailConnection() {
  try {
    console.log('🔍 Verificando credenciales...');
    console.log(`  EMAIL_USER: ${process.env.EMAIL_USER}`);
    console.log(`  EMAIL_PASSWORD: ${process.env.EMAIL_PASSWORD ? '***' : 'NO CONFIGURADA'}`);
    console.log(`  OWNER_EMAIL: ${process.env.OWNER_EMAIL}`);

    console.log('\n⏳ Conectando a Gmail...');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verificar conexión
    await transporter.verify();
    console.log('✅ Conexión a Gmail exitosa!');

    // Enviar email de prueba
    console.log('\n📧 Enviando email de prueba...');
    const result = await transporter.sendMail({
      from: `Volcán Wash Móvil <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: '✅ Email de Prueba - Volcán Wash',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>✅ Email de Prueba</h2>
          <p>Si recibes este email, la configuración de Gmail está funcionando correctamente.</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-CL')}</p>
        </div>
      `,
    });

    console.log('✅ Email de prueba enviado exitosamente!');
    console.log(`  Message ID: ${result.messageId}`);

  } catch (error) {
    console.error('❌ Error:', error.message);

    if (error.message.includes('Invalid login')) {
      console.error('\n💡 Posibles causas:');
      console.error('  1. Email o contraseña incorrectos');
      console.error('  2. Si usas 2FA, necesitas una contraseña de aplicación');
      console.error('     Ver: https://myaccount.google.com/apppasswords');
      console.error('  3. Cuenta Gmail no permitida para "apps menos seguras"');
    }
    process.exit(1);
  }
}

testGmailConnection();
