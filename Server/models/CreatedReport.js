//backend/models/Report.js

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: { type: Object, required: true }, // Store the report data
  createdAt: { type: Date, default: Date.now },
});

const CreatedReport = mongoose.model('CreatedReport', reportSchema);

module.exports = CreatedReport;
