const { setupReportSchedules } = require('../services/scheduleService');

const initializeCronJobs = async () => {
  await setupReportSchedules();
};

module.exports = { initializeCronJobs };
