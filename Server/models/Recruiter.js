// server/models/Recruiter.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const DocumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
});

const NotificationPreferencesSchema = new mongoose.Schema({
  newCandidateApplications: { type: [String], default: ['email'] },
  subscriptionRenewals: { type: [String], default: ['email'] },
  profileChanges: { type: [String], default: ['email'] },
  verificationStatuses: { type: [String], default: ['email'] },
  jobApplicationUpdates: { type: [String], default: ['email'] },
  paymentConfirmations: { type: [String], default: ['email'] },
  loginAlerts: { type: [String], default: ['email'] },
  unusualActivity: { type: [String], default: ['email'] },
});

const RecruiterSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  jobTitle: { type: String, required: true },
  contactNumber: { type: String, required: true },
  companyWebsite: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationDocuments: [DocumentSchema],
  plan: {
    type: String,
    default: "free",
  },
  gstNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid GST number`,
    },
    required: false,
  },
  isDocumentVerified: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  agreedToTerms: { type: Boolean, required: true },
  lastLogin: Date,
  notificationPreferences: {
    type: NotificationPreferencesSchema,
    default: () => ({}),
  },
});

RecruiterSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("Recruiter", RecruiterSchema);
