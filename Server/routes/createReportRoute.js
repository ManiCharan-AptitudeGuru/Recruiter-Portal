const express = require('express');
const { createReport } = require('../controllers/createReportController');

const router = express.Router();

router.post('/', createReport);

module.exports = router;
