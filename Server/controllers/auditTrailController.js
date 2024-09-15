const AuditTrail = require("../models/AuditTrail");
const Recruiter = require("../models/Recruiter");

// Create a new audit trail entry
exports.createAuditTrailEntry = async (req, res) => {
  try {
    const { userId, jobId, action, description } = req.body;
    const recruiter = await Recruiter.findById(userId );
    const newAuditEntry = new AuditTrail({
      recruiterId: userId,
      jobId,
      action,
      description,
      recruiter: recruiter.fullName,
    });

    await newAuditEntry.save();
    res.status(201).json({
      message: "Audit trail entry created successfully",
      auditEntry: newAuditEntry,
    });
  } catch (error) {
    console.error("Error creating audit trail entry:", error);
    res.status(500).json({
      message: "Error creating audit trail entry",
      error: error.message,
    });
  }
};

// Get audit trail entries for a specific job or all jobs
exports.getAuditTrailEntries = async (req, res) => {
  try {
    const userId = req.params.userId;
    let auditEntries;

      auditEntries = await AuditTrail.find({ recruiterId:userId }).sort({ timestamp: -1 });
    res.status(200).json(auditEntries);
  } catch (error) {
    console.error("Error fetching audit trail entries:", error);
    res.status(500).json({
      message: "Error fetching audit trail entries",
      error: error.message,
    });
  }
};