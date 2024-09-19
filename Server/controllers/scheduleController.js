const ReportSchedule = require('../models/ReportSchedule');

const createSchedule = async (req, res) => {
  const schedule = new ReportSchedule(req.body);
  await schedule.save();
  res.status(201).json(schedule);
};

const updateSchedule = async (req, res) => {
  const schedule = await ReportSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(schedule);
};

const deleteSchedule = async (req, res) => {
  await ReportSchedule.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

const getSchedules = async (req, res) => {
  const schedules = await ReportSchedule.find();
  res.status(200).json(schedules);
};

module.exports = {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedules,
};
