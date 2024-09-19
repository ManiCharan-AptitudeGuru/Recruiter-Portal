const cron = require('node-cron');
const ReportSchedule = require('../models/ReportSchedule');
const { generateReport } = require('./reportService');

const setupReportSchedules = async () => {
  const schedules = await ReportSchedule.find({ isPaused: false });

  schedules.forEach(schedule => {
    cron.schedule(schedule.schedule, () => {
      generateReport(schedule);
    });
  });
};

module.exports = { setupReportSchedules };
