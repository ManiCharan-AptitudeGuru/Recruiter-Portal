import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import cityData from "../../data/cities.json";
import jobList from "../../data/jobRoles.json";
import currencyData from "../../data/currencies.json";
import JobPostingForm from "../../components/JobPostingForm/JobPostingForm";
import JobPostingPreview from "../../components/JobPostingPreview/JobPostingPreview";
import AuditTrail from "../../components/AuditTrail/AuditTrail";
import TemplateSelector from "../../components/TemplateSelector/TemplateSelector";
import Pagination from "../../global/Pagination/Pagination";
import ConfirmationDialog from "../../components/ConfirmationMsg/ConfirmationMsg";
import TopControlsComponent from "../../components/TopControls/TopControls";
import JobPostingsTableComponent from "../../components/JobPostingTable/JobPostingTable";
import {
  JobPostingManagement,
  JobPostingDashboardContainer,
  Title,
} from "./JobPostingDashboard.styles";
import {
  getAllJobPosting,
  deleteJobPosting,
  duplicateJobPosting,
  submitJobPosting,
  updateJobPosting,
  createAuditTrailEntry,
  getAuditTrailForJob,
  getAllTemplates,
  createTemplate,
  deleteTemplate,
  updateTemplate,
} from "../../services/api";
import { ThreeDots } from "react-loader-spinner";

const cities = cityData[2].data;
const currencies = currencyData.map((cur) => cur.code);

const JobPostingDashboard = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [previewJobPosting, setPreviewJobPosting] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [auditTrail, setAuditTrail] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateWithTemplate, setIsCreateWithTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const postsPerPage = 10;
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const userId = Cookies.get("id");
    const fetchJobPostingsAndAuditTrail = async () => {
      try {
        const [jobPostingsResponse, auditTrailResponse, templatesResponse] =
          await Promise.all([
            getAllJobPosting(),
            getAuditTrailForJob(userId),
            getAllTemplates(),
          ]);
        console.log(templatesResponse);
        setJobPostings(jobPostingsResponse);
        setAuditTrail(auditTrailResponse);
        setTemplates(templatesResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobPostingsAndAuditTrail();
  }, []);

  const handlePreviewJobPosting = (jobPosting) => {
    setPreviewJobPosting(jobPosting);
  };

  const handleClosePreview = () => {
    setPreviewJobPosting(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    setIsLoading(true);
    try {
      const jobToUpdate = jobPostings.find((posting) => posting._id === id);

      if (!jobToUpdate) {
        console.error("Job posting not found");
        return;
      }
      const updatedJobPosting = {
        ...jobToUpdate,
        status: newStatus,
      };
      const response = await updateJobPosting(id, updatedJobPosting);
      setJobPostings((prev) =>
        prev.map((posting) =>
          posting._id === id ? response.jobPosting : posting
        )
      );
      await addToAuditTrail(
        id,
        "Status Change",
        `Status changed to ${newStatus}`
      );
    } catch (error) {
      console.error("Error updating job posting status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePosting = async (id) => {
    setIsLoading(true);
    try {
      await deleteJobPosting(id);
      setJobPostings((prev) => prev.filter((posting) => posting._id !== id));
      addToAuditTrail(id, "Deletion", "Job posting deleted");
      setPreviewJobPosting(null);
    } catch (error) {
      console.error("Error deleting job posting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDuplicatePosting = async (posting) => {
    setIsLoading(true);
    try {
      const response = await duplicateJobPosting(posting._id);
      const duplicatedPosting = response.jobPosting;
      setJobPostings((prev) => [...prev, duplicatedPosting]);
      addToAuditTrail(
        duplicatedPosting._id,
        "Duplication",
        `Duplicated from job posting ${posting._id}`
      );
    } catch (error) {
      console.error("Error duplicating job posting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateJobPosting = async (newJobPosting, isDraft = false) => {
    setIsLoading(true);
    try {
      const jobPostingWithStatus = {
        ...newJobPosting,
        status: isDraft ? "draft" : "active",
      };
      if (
        !jobPostingWithStatus.jobTitle ||
        !jobPostingWithStatus.jobType ||
        jobPostingWithStatus.jobType.length === 0 ||
        !jobPostingWithStatus.department ||
        !jobPostingWithStatus.jobLevel ||
        !jobPostingWithStatus.salaryRange.currency ||
        !jobPostingWithStatus.technicalSkills ||
        jobPostingWithStatus.technicalSkills.length === 0 ||
        !jobPostingWithStatus.languagesRequired ||
        jobPostingWithStatus.languagesRequired.length === 0
      ) {
        throw new Error("Please fill in all required fields");
      }

      const response = await submitJobPosting(jobPostingWithStatus);
      const createdJobPosting = response.jobPosting;
      setJobPostings((prev) => [createdJobPosting, ...prev]);
      setIsPopupOpen(false);
      setShowConfirmation(true);
      addToAuditTrail(
        createdJobPosting._id,
        "Creation",
        `New job posting ${isDraft ? "saved as draft" : "published"}`
      );
    } catch (error) {
      console.error("Error creating job posting:", error);
      alert(error.message || "Failed to create job posting. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditJobPosting = async (updatedJobPosting, isDraft = false) => {
    setIsLoading(true);
    try {
      const editedPosting = {
        ...updatedJobPosting,
        status: isDraft ? "draft" : updatedJobPosting.status,
        jobTitle:
          updatedJobPosting.jobTitle.value || updatedJobPosting.jobTitle,
        jobType: updatedJobPosting.jobType.map((type) => type.value || type),
        department:
          updatedJobPosting.department.value || updatedJobPosting.department,
        jobLevel:
          updatedJobPosting.jobLevel.value || updatedJobPosting.jobLevel,
        technicalSkills: updatedJobPosting.technicalSkills.map(
          (skill) => skill.value || skill
        ),
        languagesRequired: updatedJobPosting.languagesRequired.map(
          (lang) => lang.value || lang
        ),
      };
      const response = await updateJobPosting(editedPosting._id, editedPosting);
      const updatedPosting = response.jobPosting;
      setJobPostings((prev) =>
        prev.map((posting) =>
          posting._id === updatedPosting._id ? updatedPosting : posting
        )
      );
      setIsPopupOpen(false);
      setShowConfirmation(true);
      setEditingJob(null);
      addToAuditTrail(
        updatedPosting._id,
        "Edit",
        `Job posting ${isDraft ? "saved as draft" : "updated"}`
      );
    } catch (error) {
      console.error("Error updating job posting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTemplate = async (templateData) => {
    setIsLoading(true);
    try {
      const response = await createTemplate(templateData);
      setTemplates((prev) => [...prev, response.template]);
      alert("Template saved successfully!");
    } catch (error) {
      console.error("Error saving template:", error);
      alert(error.message || "Failed to save template. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTemplate = async (updatedTemplate) => {
    setIsLoading(true);
    try {
      const response = await updateTemplate(updatedTemplate);
      setTemplates((prev) =>
        prev.map((template) =>
          template._id === updatedTemplate._id ? response.template : template
        )
      );
      alert("Template updated successfully!");
    } catch (error) {
      console.error("Error updating template:", error);
      alert(error.message || "Failed to update template. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDuplicateTemplate = async (template) => {
    setIsLoading(true);
    try {
      const { _id, ...templateWithoutId } = template;
      const response = await createTemplate(templateWithoutId);
      setTemplates((prev) => [...prev, response.template]);
      alert("Template duplicated successfully!");
    } catch (error) {
      console.error("Error duplicating template:", error);
      alert(error.message || "Failed to duplicate template. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTemplate = async (templateId) => {
    setIsLoading(true);
    try {
      await deleteTemplate(templateId);
      setTemplates((prev) =>
        prev.filter((template) => template._id !== templateId)
      );
      alert("Template deleted successfully!");
    } catch (error) {
      console.error("Error deleting template:", error);
      alert("Failed to delete template. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const addToAuditTrail = async (jobId, action, description) => {
    const userId = Cookies.get("id");
    const auditEntry = {
      userId,
      jobId,
      action,
      description,
    };
    setIsLoading(true);
    try {
      const response = createAuditTrailEntry(auditEntry);
      const newAuditEntry = response.data.auditEntry;
      setAuditTrail((prev) => [newAuditEntry, ...prev]);
      const auditTrailResponse = await getAuditTrailForJob(userId);
      setAuditTrail(auditTrailResponse);
    } catch (error) {
      console.error("Error adding audit trail entry:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenNewJobForm = () => {
    if (templates.length === 0) {
      setIsPopupOpen(true);
      setShowConfirmation(false);
      setEditingJob(null);
    } else {
      setIsCreateWithTemplate(true);
    }
  };

  const handleOpenEditJobForm = (jobPosting) => {
    const formattedJobPosting = {
      ...jobPosting,
      jobTitle: { value: jobPosting.jobTitle, label: jobPosting.jobTitle },
      jobType: jobPosting.jobType.map((type) => ({ value: type, label: type })),
      department: {
        value: jobPosting.department,
        label: jobPosting.department,
      },
      jobLevel: { value: jobPosting.jobLevel, label: jobPosting.jobLevel },
      technicalSkills: jobPosting.technicalSkills.map((skill) => ({
        value: skill,
        label: skill,
      })),
      languagesRequired: jobPosting.languagesRequired.map((lang) => ({
        value: lang,
        label: lang,
      })),
    };
    setEditingJob(formattedJobPosting);
    setIsPopupOpen(true);
    setShowConfirmation(false);
  };

  const filteredJobPostings = jobPostings
    ? jobPostings.filter(
        (posting) =>
          (filterStatus === "all" || posting.status === filterStatus) &&
          (posting.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ??
            false)
      )
    : [];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredJobPostings.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <JobPostingManagement>
      <JobPostingDashboardContainer>
        <Title>Job Postings</Title>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <ThreeDots color="#00BFFF" height={80} width={80} />
          </div>
        ) : (
          <>
            {isCreateWithTemplate && (
              <TemplateSelector
                onSelect={(template) => {
                  setSelectedTemplate(template);
                  setIsCreateWithTemplate(false);
                  setIsPopupOpen(true);
                }}
                onCancel={() => setIsCreateWithTemplate(false)}
                savedTemplates={templates}
                onDeleteTemplate={handleDeleteTemplate}
                onEditTemplate={handleEditTemplate}
                onDuplicateTemplate={handleDuplicateTemplate}
              />
            )}

            {isPopupOpen && (
              <JobPostingForm
                onSubmit={
                  editingJob ? handleEditJobPosting : handleCreateJobPosting
                }
                onPreview={handlePreviewJobPosting}
                onClose={() => {
                  setIsPopupOpen(false);
                  setEditingJob(null);
                  setSelectedTemplate(null);
                }}
                jobOptions={jobList.map((job) => ({ value: job, label: job }))}
                cities={cities}
                currencies={currencies}
                editingJob={editingJob}
                template={selectedTemplate}
                savedTemplates={templates}
                onSaveTemplate={handleSaveTemplate}
                setIsPopupOpen={setIsPopupOpen}
                setShowConfirmation={setShowConfirmation}
              />
            )}

            {previewJobPosting && (
              <JobPostingPreview
                jobPosting={previewJobPosting}
                onClose={handleClosePreview}
              />
            )}

            <ConfirmationDialog
              show={showConfirmation}
              onClose={() => setShowConfirmation(false)}
              onCreateAnother={handleOpenNewJobForm}
            />

            <TopControlsComponent
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              onCreateNewJob={handleOpenNewJobForm}
            />

            <JobPostingsTableComponent
              jobPostings={currentPosts}
              onStatusChange={handleStatusChange}
              onPreview={handlePreviewJobPosting}
              onEdit={handleOpenEditJobForm}
              onDelete={handleDeletePosting}
              onDuplicate={handleDuplicatePosting}
            />

            <Pagination
              currentPage={currentPage}
              totalPosts={filteredJobPostings.length}
              postsPerPage={postsPerPage}
              paginate={paginate}
            />
          </>
        )}
      </JobPostingDashboardContainer>
      <AuditTrail auditTrail={auditTrail} />
    </JobPostingManagement>
  );
};

export default JobPostingDashboard;
