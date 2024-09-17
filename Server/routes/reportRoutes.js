const express = require('express');
const { saveReport, getReports, deleteReport } = require('../controllers/reportController');
const customFormController=require('../controllers/customFormController')

const router = express.Router();

router.post('/reports', saveReport);
router.get('/reports', getReports);
router.delete('/reports/:id', deleteReport);
router.post("/custom-from/submit-form", customFormController.createCustomForm);
// router.get("/custom-form/form-data/:id", customFormController.getAuditTrailEntries);


module.exports = router;