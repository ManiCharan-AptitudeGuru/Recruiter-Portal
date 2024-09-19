const Report = require('../models/Report');
const { generateReportFile, sendEmail } = require('./exportService');

const generateReport = async (schedule) => {
  const reportData = await Report.findOne({ name: schedule.reportName }).lean();

  const reportBuffer = await generateReportFile(reportData.data, schedule.format);
  await sendEmail(schedule.reportName, reportBuffer, schedule.format, schedule.recipients.join(','));

  schedule.lastRun = new Date();
  await schedule.save();
};

module.exports = { generateReport };
