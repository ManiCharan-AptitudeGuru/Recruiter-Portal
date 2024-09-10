const express = require("express");
const router = express.Router();
const recruiterController = require("../controllers/recruiterController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

router.post("/register", recruiterController.register);
router.get("/verify/:token", recruiterController.verifyEmail);
router.post("/login", recruiterController.login);
router.post("/verify-otp", recruiterController.verifyOTP);
router.get(
  "/admin/unverified-recruiters",
  recruiterController.getUnverifiedRecruiters
);
router.get(
  "/admin/unverified-documents",
  recruiterController.getUnverifiedDocuments
);
router.put("/admin/approve/:recruiterId", recruiterController.approveRecruiter);
router.put("/admin/reject/:recruiterId", recruiterController.rejectRecruiter);
router.put(
  "/admin/verify-documents/:recruiterId",
  recruiterController.verifyRecruiterDocuments
);
router.get(
  "/admin/new-recruiter-count",
  recruiterController.getNewRecruiterCount
);
router.get("/profile", recruiterController.getProfile);
router.put(
  "/:id/notification-preferences",
  recruiterController.updatePreferences
);

module.exports = router;
