const mongoose = require("mongoose");

const customForm = new mongoose.Schema({
  // Candidate Information
  candidateName: String,
  candidateID: String,
  jobTitle: String,
  departmentAppliedTo: String,
  applicationDate: Date,
  sourceOfApplication: String,
  currentStatus: String,
  resumeLink: String,
  contactInformation: String,
  educationBackground: String,
  experienceLevel: String,
  skillsCertifications: String,

  // Recruitment Process Details
  screeningDate: Date,
  interviewDates: {
    initial: Date,
    technical: Date,
    hr: Date,
  },
  interviewers: String,
  interviewScores: String,
  assessmentResults: String,
  backgroundCheckStatus: String,
  offerDate: Date,
  offerAcceptanceDate: Date,
  onboardingDate: Date,
  onboardingStatus: String,
  interviewerNotes: String,

  // Job Requisition Details
  jobRequisitionID: String,
  positionTitle: String,
  department: String,
  hiringManager: String,
  requisitionCreatedDate: Date,
  requisitionStatus: String,
  numberOfPositions: Number,
  numberOfCandidatesScreened: Number,
  numberOfCandidatesInterviewed: Number,
  numberOfOffersMade: Number,
  numberOfOffersAccepted: Number,
  timeToFill: Number,
  timeToHire: Number,

  // Employee Information
  employeeName: String,
  employeeID: String,
  dateOfJoining: Date,
  currentPosition: String,
  currentDepartment: String,
  probationStatus: String,
  trainingCompletionStatus: String,
  performanceEvaluationScores: String,
  retentionRate: Number,

  // Recruitment Metrics and Analytics
  totalApplicationsReceived: Number,
  conversionRate: Number,
  costPerHire: Number,
  sourceEffectiveness: String,
  diversityMetrics: String,
  attritionRate: Number,
  recruiterEfficiency: Number,
  offerDeclineReasons: String,

  // Employee Status Information
  currentEmploymentStatus: String,
  lastPerformanceReviewDate: Date,
  nextScheduledReviewDate: Date,
  promotionTransferHistory: String,
  trainingCompleted: String,
  pendingCertifications: String,
  vacationSickLeaveStatus: String,

  // Miscellaneous Fields
  commentsNotes: String,
  attachments: String,
  approvalSignOff: String,
});

const CustomForm = mongoose.model("CustomForm", customForm);
