const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jobPostingsRoutes = require("./routes/jobPostings");
const auditTrailRoutes = require("./routes/auditTrail");
const templatesRoutes = require("./routes/templates");
const recruiterRoutes = require("./routes/recruiterRoutes");
const premiumPlansRoutes = require("./routes/plans");
const errorHandler = require("./middleware/errorHandler");
const { connectDB } = require("./config/db");
const { initCronJobs } = require("./utils/cronJobs");

const app = express();

//https://job-posting-management-liard.vercel.app
//http://localhost:3000

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
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

// Error handling middleware
app.use(errorHandler);

module.exports = app;
