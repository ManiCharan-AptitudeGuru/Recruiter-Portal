// controllers/reportController.js

const Report = require('../models/Report');

// Save a new report
exports.saveReport = async (req, res) => {
    try {
        const { name, fields, filters, chartType } = req.body;
        const newReport = new Report({ name, fields, filters, chartType });
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(500).json({ message: 'Error saving report', error });
    }
};

// Get all reports
exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error });
    }
};

// Delete a report
exports.deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReport = await Report.findByIdAndDelete(id);
        if (!deletedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting report', error });
    }
};