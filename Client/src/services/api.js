import axios from "axios";
import Cookies from "js-cookie";
//https://recruiter-portal.onrender.com
//http://localhost:5000
const API_URL = "https://recruiter-portal.onrender.com";

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

export const login = async (data) => {
  try {
    const response = await api.post("/recruiters/login", data);
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    handleApiError(error);
  }
};

export const verifyOTP = async ({ email, otp, encryptedOTP, iv }) => {
  try {
    const response = await api.post("/recruiters/verify-otp", {
      email,
      otp,
      encryptedOTP,
      iv
    });
    return response.data;
  } catch (error) {
    console.error("OTP verification error:", error.response?.data || error.message);
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

export const getAuditTrailForJob = async (userId) => {
  try {
    const response = await api.get(`/audit-trail/${userId}`);
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
    if (response.data.currentPlan && response.data.availablePlans) {
      return {
        success: true,
        currentPlan: response.data.currentPlan,
        availablePlans: response.data.availablePlans,
      };
    } else {
      return { success: false, error: "Unexpected server response" };
    }
  } catch (error) {
    console.error("Error updating plan:", error);
    return { success: false, error: error.message };
  }
};

export const updateNotificationPreferences = async (preferences) => {
  try {
    const response = await api.put(
      `/recruiters/${userId}/notification-preferences`,
      preferences
    );
    return response.data;
  } catch (error) {
    return handleApiError({
      error: "Failed to update notification preferences",
    });
  }
};

export const downloadInvoice = async (invoiceId) => {
  const response = await api.get(`/invoices/${invoiceId}/download`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `invoice-${invoiceId}.pdf`);
  document.body.appendChild(link);
  link.click();
};

export const generateSampleInvoice = async (userId) => {
  try {
    const response = await api.post(`/invoices/generate`, {
      userId,
      planDetails: "Sample Premium Plan",
      amount: 1000,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Invoice generation error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getInvoices = async (userId) => {
  try {
    const response = await api.get(`/invoices/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Fetch invoices error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const registerGST = (recruiterData) =>
  api.post(`/recruiters/register`, recruiterData);

export const generateInvoice = (invoiceData) =>
  api.post(`/gstinvoices/generate`, invoiceData);

export const createCustomForm=(formData)=>{
  api.post("",formData)
}

export default api;
