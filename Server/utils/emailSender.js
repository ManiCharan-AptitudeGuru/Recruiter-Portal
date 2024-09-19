const nodemailer = require('nodemailer');

const sendEmail = async (subject, text, recipients, attachments) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password',
    },
  });

  const mailOptions = {
    from: '"Your Company" <no-reply@yourcompany.com>',
    to: recipients.join(','),
    subject,
    text,
    attachments,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
