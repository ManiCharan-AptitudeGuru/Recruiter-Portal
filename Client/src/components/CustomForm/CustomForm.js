import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FormContainer,
  FormLabel,
  FormInput,
  FormTextArea,
  FormSelect,
  FormButton,
} from "./StyledComponents";

const CustomForm = () => {
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate('/reports/custom-form/user')
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      {/* 2.1 Candidate Information */}
      <h3
        style={{
          color: "white",
          padding: "10px",
          marginBottom: "10px",
          paddingLeft: "0px",
          textDecoration: "underline",
          marginTop:"0px"
        }}
      >
        Candidate Information
      </h3>

      <FormLabel>Candidate Name</FormLabel>
      <FormInput
        {...register("candidateName", {
          required: "Candidate Name is required",
        })}
      />
      {errors.candidateName && <p>{errors.candidateName.message}</p>}

      <FormLabel>Candidate ID</FormLabel>
      <FormInput
        {...register("candidateID", { required: "Candidate ID is required" })}
      />
      {errors.candidateID && <p>{errors.candidateID.message}</p>}

      <FormLabel>Job Title Applied For</FormLabel>
      <FormInput
        {...register("jobTitle", { required: "Job Title is required" })}
      />
      {errors.jobTitle && <p>{errors.jobTitle.message}</p>}

      <FormLabel>Department Applied To</FormLabel>
      <FormInput
        {...register("departmentAppliedTo", {
          required: "Department is required",
        })}
      />
      {errors.departmentAppliedTo && (
        <p>{errors.departmentAppliedTo.message}</p>
      )}

      <FormLabel>Application Date</FormLabel>
      <FormInput
        type="date"
        {...register("applicationDate", {
          required: "Application Date is required",
        })}
      />
      {errors.applicationDate && <p>{errors.applicationDate.message}</p>}

      <FormLabel>Source of Application</FormLabel>
      <FormInput {...register("sourceOfApplication")} />

      <FormLabel>Current Status</FormLabel>
      <FormSelect
        {...register("currentStatus", {
          required: "Current Status is required",
        })}
      >
        <option value="New">New</option>
        <option value="In Progress">In Progress</option>
        <option value="Hired">Hired</option>
        <option value="Rejected">Rejected</option>
      </FormSelect>
      {errors.currentStatus && <p>{errors.currentStatus.message}</p>}

      <FormLabel>Resume/CV Link</FormLabel>
      <FormInput {...register("resumeLink")} />

      <FormLabel>Contact Information</FormLabel>
      <FormInput
        {...register("contactInformation", {
          required: "Contact Information is required",
        })}
      />
      {errors.contactInformation && <p>{errors.contactInformation.message}</p>}

      <FormLabel>Education Background</FormLabel>
      <FormTextArea {...register("educationBackground")} />

      <FormLabel>Experience Level</FormLabel>
      <FormSelect {...register("experienceLevel")}>
        <option value="Entry">Entry</option>
        <option value="Mid">Mid</option>
        <option value="Senior">Senior</option>
      </FormSelect>

      <FormLabel>Skills & Certifications</FormLabel>
      <FormTextArea {...register("skillsCertifications")} />

      {/* 2.2 Recruitment Process Details */}
      <h3
        style={{
          color: "white",
          padding: "10px",
          marginBottom: "10px",
          paddingLeft: "0px",
          textDecoration: "underline",
        }}
      >
        Recruitment Process Details
      </h3>

      <FormLabel>Screening Date</FormLabel>
      <FormInput type="date" {...register("screeningDate")} />

      <FormLabel>Interview Dates</FormLabel>
      <FormInput
        type="date"
        {...register("interviewDates.initial")}
        placeholder="Initial Interview Date"
      />
      <FormInput
        type="date"
        {...register("interviewDates.technical")}
        placeholder="Technical Interview Date"
      />
      <FormInput
        type="date"
        {...register("interviewDates.hr")}
        placeholder="HR Interview Date"
      />

      <FormLabel>Interviewers Names and Roles</FormLabel>
      <FormTextArea {...register("interviewers")} />

      <FormLabel>Interview Scores</FormLabel>
      <FormTextArea {...register("interviewScores")} />

      <FormLabel>Assessment Results</FormLabel>
      <FormTextArea {...register("assessmentResults")} />

      <FormLabel>Background Check Status</FormLabel>
      <FormSelect {...register("backgroundCheckStatus")}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </FormSelect>

      <FormLabel>Offer Date</FormLabel>
      <FormInput type="date" {...register("offerDate")} />

      <FormLabel>Offer Acceptance Date</FormLabel>
      <FormInput type="date" {...register("offerAcceptanceDate")} />

      <FormLabel>Onboarding Date</FormLabel>
      <FormInput type="date" {...register("onboardingDate")} />

      <FormLabel>Onboarding Status</FormLabel>
      <FormSelect {...register("onboardingStatus")}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </FormSelect>

      <FormLabel>Notes from Interviewers</FormLabel>
      <FormTextArea {...register("interviewerNotes")} />

      {/* 2.3 Job Requisition Details */}
      <h3
        style={{
          color: "white",
          padding: "10px",
          marginBottom: "10px",
          paddingLeft: "0px",
          textDecoration: "underline",
        }}
      >
        Job Requisition Details
      </h3>

      <FormLabel>Job Requisition ID</FormLabel>
      <FormInput {...register("jobRequisitionID")} />

      <FormLabel>Position Title</FormLabel>
      <FormInput {...register("positionTitle")} />

      <FormLabel>Department</FormLabel>
      <FormInput {...register("department")} />

      <FormLabel>Hiring Manager</FormLabel>
      <FormInput {...register("hiringManager")} />

      <FormLabel>Date Requisition Created</FormLabel>
      <FormInput type="date" {...register("requisitionCreatedDate")} />

      <FormLabel>Requisition Status</FormLabel>
      <FormSelect {...register("requisitionStatus")}>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
        <option value="On Hold">On Hold</option>
      </FormSelect>

      <FormLabel>Number of Positions</FormLabel>
      <FormInput type="number" {...register("numberOfPositions")} />

      <FormLabel>Number of Candidates Screened</FormLabel>
      <FormInput type="number" {...register("numberOfCandidatesScreened")} />

      <FormLabel>Number of Candidates Interviewed</FormLabel>
      <FormInput type="number" {...register("numberOfCandidatesInterviewed")} />

      <FormLabel>Number of Offers Made</FormLabel>
      <FormInput type="number" {...register("numberOfOffersMade")} />

      <FormLabel>Number of Offers Accepted</FormLabel>
      <FormInput type="number" {...register("numberOfOffersAccepted")} />

      <FormLabel>Time to Fill</FormLabel>
      <FormInput type="number" {...register("timeToFill")} />

      <FormLabel>Time to Hire</FormLabel>
      <FormInput type="number" {...register("timeToHire")} />

      {/* 2.4 Employee Information (For Hired Candidates) */}
      <h3
        style={{
          color: "white",
          padding: "10px",
          marginBottom: "10px",
          paddingLeft: "0px",
          textDecoration: "underline",
        }}
      >
        Employee Information (For Hired Candidates)
      </h3>

      <FormLabel>Employee Name</FormLabel>
      <FormInput {...register("employeeName")} />

      <FormLabel>Employee ID</FormLabel>
      <FormInput {...register("employeeID")} />

      <FormLabel>Date of Joining</FormLabel>
      <FormInput type="date" {...register("dateOfJoining")} />

      <FormLabel>Current Position</FormLabel>
      <FormInput {...register("currentPosition")} />

      <FormLabel>Current Department</FormLabel>
      <FormInput {...register("currentDepartment")} />

      <FormLabel>Probation Status</FormLabel>
      <FormSelect {...register("probationStatus")}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </FormSelect>

      <FormLabel>Training Completion Status</FormLabel>
      <FormSelect {...register("trainingCompletionStatus")}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </FormSelect>

      <FormLabel>Performance Evaluation Scores</FormLabel>
      <FormTextArea {...register("performanceEvaluationScores")} />

      <FormLabel>Retention Rate</FormLabel>
      <FormInput type="number" {...register("retentionRate")} />

      {/* 2.5 Recruitment Metrics and Analytics */}
      <h3
        style={{
          color: "white",
          padding: "10px",
          marginBottom: "10px",
          paddingLeft: "0px",
          textDecoration: "underline",
        }}
      >
        Recruitment Metrics and Analytics
      </h3>

      <FormLabel>Total Applications Received</FormLabel>
      <FormInput type="number" {...register("totalApplicationsReceived")} />

      <FormLabel>Conversion Rate (Applicants to Hires)</FormLabel>
      <FormInput type="number" step="0.01" {...register("conversionRate")} />

      <FormLabel>Cost per Hire</FormLabel>
      <FormInput type="number" step="0.01" {...register("costPerHire")} />

      <FormLabel>Source Effectiveness</FormLabel>
      <FormTextArea {...register("sourceEffectiveness")} />

      <FormLabel>Diversity Metrics</FormLabel>
      <FormTextArea {...register("diversityMetrics")} />

      <FormLabel>Attrition Rate</FormLabel>
      <FormInput type="number" step="0.01" {...register("attritionRate")} />

      <FormLabel>
        Recruiter Efficiency (Number of Hires per Recruiter)
      </FormLabel>
      <FormInput type="number" {...register("recruiterEfficiency")} />

      <FormLabel>Offer Decline Reasons</FormLabel>
      <FormTextArea {...register("offerDeclineReasons")} />

      {/* 2.6 Employee Status Information */}
      <h3
        style={{
          color: "white",
          padding: "10px",
          marginBottom: "10px",
          paddingLeft: "0px",
          textDecoration: "underline",
        }}
      >
        Employee Status Information
      </h3>

      <FormLabel>Current Employment Status</FormLabel>
      <FormSelect {...register("currentEmploymentStatus")}>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="On Leave">On Leave</option>
      </FormSelect>

      <FormLabel>Last Performance Review Date</FormLabel>
      <FormInput type="date" {...register("lastPerformanceReviewDate")} />

      <FormLabel>Next Scheduled Review Date</FormLabel>
      <FormInput type="date" {...register("nextScheduledReviewDate")} />

      <FormLabel>Promotion/Transfer History</FormLabel>
      <FormTextArea {...register("promotionTransferHistory")} />

      <FormLabel>Training Completed</FormLabel>
      <FormTextArea {...register("trainingCompleted")} />

      <FormLabel>Pending Certifications</FormLabel>
      <FormTextArea {...register("pendingCertifications")} />

      <FormLabel>Vacation/Sick Leave Status</FormLabel>
      <FormTextArea {...register("vacationSickLeaveStatus")} />

      {/* 2.7 Miscellaneous Fields */}
      <h3
        style={{
          color: "white",
          padding: "10px",
          marginBottom: "10px",
          paddingLeft: "0px",
          textDecoration: "underline",
        }}
      >
        Miscellaneous Fields
      </h3>

      <FormLabel>Comments/Notes</FormLabel>
      <FormTextArea {...register("commentsNotes")} />

      <FormLabel>Attachments</FormLabel>
      <FormInput type="file" {...register("attachments")} />

      <FormLabel>Approval and Sign-off</FormLabel>
      <FormTextArea {...register("approvalSignOff")} />

      <FormButton type="submit">Submit</FormButton>
    </FormContainer>
  );
};

export default CustomForm;
