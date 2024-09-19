const nodemailer = require('nodemailer');
const { createReportFile } = require('../utils/fileGenerator');

const generateReportFile = async (reportData, format) => {
  return await createReportFile(reportData, format);
};

const sendEmail = async (reportName, reportBuffer, format, recipient, password) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password',
    },
  });

  const mailOptions = {
    from: '"Your Company" <no-reply@yourcompany.com>',
    to: recipient,
    subject: `${reportName} - Export`,
    attachments: [
      {
        filename: `${reportName}.${format}`,
        content: reportBuffer,
        encoding: 'base64',
      },
    ],
  };

  if (password) {
    mailOptions.attachments[0].password = password;
  }

  await transporter.sendMail(mailOptions);
};

module.exports = {
  generateReportFile,
  sendEmail,
};
