const express = require('express');
const { saveReport, getReports, deleteReport } = require('../controllers/reportController');

const router = express.Router();

router.post('/reports', saveReport);
router.get('/reports', getReports);
router.delete('/reports/:id', deleteReport);

module.exports = router;