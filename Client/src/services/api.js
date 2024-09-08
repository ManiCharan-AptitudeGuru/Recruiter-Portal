import axios from "axios";
import Cookies from "js-cookie";
//https://job-posting-management.onrender.com
//http://localhost:5000
const API_URL = "http://localhost:5000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const userId = Cookies.get("id");

const handleApiError = (error) => {
  console.error("API Error:", error);
  throw error;
};

export const registerRecruiter = async (data) => {
  try {
    const response = await api.post("/recruiters/register", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const sendOTP = async (email) => {
  try {
    const response = await api.post("/recruiters/login", email);
    return response.data;
  } catch (error) {
    console.log(error);

    handleApiError(error);
  }
};

export const verifyOTP = async ({ email, otp, encryptedOTP }) => {
  try {
    const response = await api.post("/recruiters/verify-otp", {
      email,
      otp,
      encryptedOTP,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const submitJobPosting = async (jobPosting) => {
  try {
    const formattedJobPosting = {
      ...jobPosting,
      recruiterId: userId,
      jobTitle: jobPosting.jobTitle.value || jobPosting.jobTitle,
      jobType: jobPosting.jobType.map((type) => type.value || type),
      department: jobPosting.department.value || jobPosting.department,
      jobLevel: jobPosting.jobLevel.value || jobPosting.jobLevel,
      technicalSkills: jobPosting.technicalSkills.map(
        (skill) => skill.value || skill
      ),
      languagesRequired: jobPosting.languagesRequired.map(
        (lang) => lang.value || lang
      ),
      salaryRange: {
        ...jobPosting.salaryRange,
        currency:
          jobPosting.salaryRange.currency.value ||
          jobPosting.salaryRange.currency,
        formatted: `${
          jobPosting.salaryRange.currency.value ||
          jobPosting.salaryRange.currency
        } ${jobPosting.salaryRange.min}-${jobPosting.salaryRange.max}`,
      },
    };
    const response = await api.post("/job-postings", formattedJobPosting);
    return response.data;
  } catch (error) {
    console.error("Error submitting job posting:", error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to create job posting");
    }
  }
};

export const getAllJobPosting = async () => {
  try {
    const response = await api.get(`/job-postings?userId=${userId}`);
    return response.data;
  } catch (error) {
    handleApiError({ error: "Failed to fetch job" });
    return [];
  }
};

export const deleteJobPosting = async (id) => {
  try {
    const response = await api.delete(`/job-postings/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError({ error: "Failed to delete job Posting" });
  }
};

export const duplicateJobPosting = async (id) => {
  try {
    const response = await api.post(`/job-postings/${id}/duplicate`);
    return response.data;
  } catch (error) {
    return handleApiError({ error: "Failed to duplicate job Posting" });
  }
};

export const updateJobPosting = async (id, jobPosting) => {
  try {
    const response = await api.put(`/job-postings/${id}`, jobPosting);
    return response.data;
  } catch (error) {
    console.log(error);

    return handleApiError({ error: "Failed to update job Posting" });
  }
};

export const createAuditTrailEntry = async (auditEntry) => {
  try {
    const response = await api.post("/audit-trail", auditEntry);
    return response.data;
  } catch (error) {
    return handleApiError({ error: "Failed to create audit trail entry" });
  }
};

export const getAuditTrailForJob = async (jobId) => {
  try {
    const response = await api.get(`/audit-trail/${jobId}`);
    return response.data;
  } catch (error) {
    return handleApiError({ error: "Failed to fetch audit trail entries" });
  }
};

export const getAllTemplates = async () => {
  try {
    const response = await api.get(`/templates?userId=${userId}`);
    return response.data;
  } catch (error) {
    return handleApiError({ error: "Failed to fetch templates" });
  }
};

export const createTemplate = async (template) => {
  try {
    const response = await api.post("/templates", { template, userId });
    return response.data;
  } catch (error) {
    return handleApiError({ error: "Failed to create template" });
  }
};

export const deleteTemplate = async (id) => {
  try {
    const response = await api.delete(`/templates/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError({ error: "Failed to delete template" });
  }
};

export const getPremiumPlans = async () => {
  try {
    const response = await api.get(`/premium-plans?userId=${userId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updatePlan = async (planId) => {
  try {
    const response = await api.post("/premium-plans", { planId, userId });
    if (response.data.user && response.data.remainingPlans) {
      return {
        success: true,
        user: response.data.user,
        plans: [...response.data.remainingPlans, response.data.currentPlan],
      };
    } else {
      return { success: false, error: "Unexpected server response" };
    }
  } catch (error) {
    console.error("Error updating plan:", error);
    return { success: false, error: error.message };
  }
};

export default api;
