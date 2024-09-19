const express = require('express');
const {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedules,
} = require('../controllers/scheduleController');

const router = express.Router();

router.get('/', getSchedules);
router.post('/', createSchedule);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

module.exports = router;
