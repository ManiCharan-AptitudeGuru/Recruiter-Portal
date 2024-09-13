const cron = require("node-cron");
const JobPosting = require("../models/JobPosting");
const AuditTrail = require("../models/AuditTrail");
const { isBefore } = require("date-fns");
const {
  sendAdminReminder,
  sendPaymentReminder,
} = require("../controllers/notificationController");

const GstInvoice = require("../models/GstInvoice");

//Gst Invoice
exports.setupCronJobs = () => {
  // Run every day at midnight
  cron.schedule("0 0 * * *", async () => {
    const today = new Date();
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );
    const daysUntilMonthEnd = Math.ceil(
      (lastDayOfMonth - today) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilMonthEnd <= 3) {
      await sendAdminReminder();
    }

    // Check for pending invoices and send reminders
    const pendingInvoices = await GstInvoice.find({ status: "Pending" });
    for (const invoice of pendingInvoices) {
      const daysOverdue = Math.ceil(
        (today - invoice.generationDate) / (1000 * 60 * 60 * 24)
      );
      if (daysOverdue >= 7) {
        await sendPaymentReminder(invoice.recruiter, invoice._id);
      }
    }
  });
};

const updateJobPostingStatuses = async () => {
  const now = new Date();
  const jobPostings = await JobPosting.find({ status: "active" });

  for (const jobPosting of jobPostings) {
    if (isBefore(jobPosting.applicationDeadline, now)) {
      jobPosting.status = "closed";
      await jobPosting.save();

      const auditEntry = new AuditTrail({
        jobId: jobPosting._id,
        action: "Status Change",
        description:
          "Job posting status automatically changed to closed due to deadline",
        recruiter: "Server",
      });
      await auditEntry.save();
    }
  }
};

exports.initCronJobs = () => {
  cron.schedule("0 * * * *", updateJobPostingStatuses);
};
