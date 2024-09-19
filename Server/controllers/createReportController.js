//backend/controllers/reportController.js

const Report = require('../models/CreatedReport');

const createReport = async (req, res) => {
  const { name, data } = req.body;

  const report = new Report({
    name,
    data,
  });

  await report.save();
  res.status(201).json(report);
};

module.exports = { createReport };