const { generateReportFile, sendEmail } = require('../services/exportService');
const AuditLog = require('../models/ReportAuditLog');

const exportReport = async (req, res) => {
  const { reportName, format, recipient, password } = req.body;

  const reportBuffer = await generateReportFile(reportName, format);
  await sendEmail(reportName, reportBuffer, format, recipient, password);

  const auditLog = new AuditLog({
    action: 'export',
    reportName,
    recipient,
  });
  await auditLog.save();

  res.status(200).json({ message: 'Report exported and shared successfully' });
};

module.exports = { exportReport };
