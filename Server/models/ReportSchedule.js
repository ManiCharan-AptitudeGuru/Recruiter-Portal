//backend/models/ReportSchedule.js

const mongoose = require('mongoose');

const reportScheduleSchema = new mongoose.Schema({
  reportName: { type: String, required: true },
  schedule: { type: String, required: true }, // e.g., 'daily', 'weekly', 'monthly', or cron expression
  recipients: { type: [String], required: true }, // Array of email addresses
  format: { type: String, enum: ['PDF', 'Excel', 'CSV'], required: true },
  filters: { type: Object, default: {} }, // Any filters or parameters for the report
  lastRun: { type: Date },
  isPaused: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const ReportSchedule = mongoose.model('ReportSchedule', reportScheduleSchema);

module.exports = ReportSchedule;
