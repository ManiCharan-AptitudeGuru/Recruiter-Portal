const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jobPostingsRoutes = require("./routes/jobPostings");
const auditTrailRoutes = require("./routes/auditTrail");
const templatesRoutes = require("./routes/templates");
const recruiterRoutes = require("./routes/recruiterRoutes");
const premiumPlansRoutes = require("./routes/plans");
const invoiceRoutes = require("./routes/invoice");
const reportRoutes = require("./routes/reportRoutes");
const createReportRoutes = require("./routes/createReportRoute");
const exportRoutes = require("./routes/exportRoutes");
const scheduleRoute = require("./routes/scheduleRoutes");
const errorHandler = require("./middleware/errorHandler");
const { connectDB } = require("./config/db");
const { initCronJobs } = require("./utils/cronJobs");
const app = express();

//https://recruiter-portal-theta.vercel.app
//http://localhost:3000

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://recruiter-portal-theta.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Initialize cron jobs
initCronJobs();

// Routes
app.use("/job-postings", jobPostingsRoutes);
app.use("/audit-trail", auditTrailRoutes);
app.use("/templates", templatesRoutes);
app.use("/recruiters", recruiterRoutes);
app.use("/premium-plans", premiumPlansRoutes);
app.use("/", invoiceRoutes);
app.use("/", reportRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
