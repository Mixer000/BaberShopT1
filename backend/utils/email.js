const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: process.env.EMAIL_PORT || 587,
  auth: {
    user: process.env.EMAIL_USER || 'ethereal_user',
    pass: process.env.EMAIL_PASS || 'ethereal_pass'
  }
});

const sendNewAppointmentEmail = async (appointment) => {
  try {
    const mailOptions = {
      from: `"Barber Shop App" <${process.env.EMAIL_USER || 'noreply@barbershop.com'}>`,
      to: process.env.ADMIN_EMAIL || 'admin@barbershop.com',
      subject: `Nueva Reserva de Cita - ${appointment.fullName}`,
      html: `
        <h2>Nueva Cita Recibida</h2>
        <p>Se ha reservado una nueva cita a través de la página web:</p>
        <ul>
          <li><strong>Nombre:</strong> ${appointment.fullName}</li>
          <li><strong>Servicio:</strong> ${appointment.service}</li>
          <li><strong>Fecha:</strong> ${new Date(appointment.date).toLocaleDateString()}</li>
          <li><strong>Hora:</strong> ${appointment.time}</li>
          <li><strong>Teléfono:</strong> ${appointment.phone}</li>
          <li><strong>Correo:</strong> ${appointment.email}</li>
        </ul>
        <p>Por favor ingresa al panel de administración para confirmar.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendNewAppointmentEmail };
