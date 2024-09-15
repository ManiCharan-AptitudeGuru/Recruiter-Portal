const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fields: { type: [String], required: true },
    filters: { type: Object, required: true },
    chartType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema);