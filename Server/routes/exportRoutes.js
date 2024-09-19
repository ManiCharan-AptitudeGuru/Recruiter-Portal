const express = require('express');
const { exportReport } = require('../controllers/exportController');

const router = express.Router();

router.post('/', exportReport);

module.exports = router;
