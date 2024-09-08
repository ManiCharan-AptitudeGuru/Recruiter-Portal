import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import candidatesData from "../../data/candidates.json";
import ApplicationDetails from "../../components/ApplicationDetails/ApplicationDetails";
import ApplicationsTable from "../../components/ApplicationsTable/ApplicationsTable";
import {Container, Heading, GoBackButton} from './ApplicationManagement.styles';

const ApplicationsManagement = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [candidateStatuses, setCandidateStatuses] = useState({});

  useEffect(() => {
    const initialStatuses = {};
    candidatesData.forEach((candidate) => {
      initialStatuses[candidate.id] = "Under Review";
    });
    setCandidateStatuses(initialStatuses);
  }, []);

  const handleCandidateClick = useCallback((candidate) => {
    setSelectedCandidate(candidate);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedCandidate(null);
  }, []);

  const handleShortlist = useCallback((candidateId) => {
    setShortlistedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  }, []);

  const handleStatusUpdate = useCallback((candidateId, newStatus) => {
    setCandidateStatuses((prev) => ({
      ...prev,
      [candidateId]: newStatus,
    }));
  }, []);

  const handleGoBack = () => {
    navigate("/job-postings");
  };

  return (
    <Container>
      <GoBackButton onClick={handleGoBack}>Go Back</GoBackButton>
      <Heading>Applications</Heading>
      <ApplicationsTable
        candidates={candidatesData}
        onCandidateClick={handleCandidateClick}
        shortlistedCandidates={shortlistedCandidates}
        candidateStatuses={candidateStatuses}
        onStatusUpdate={handleStatusUpdate}
      />
      {selectedCandidate && (
        <ApplicationDetails
          candidate={selectedCandidate}
          onClose={handleCloseDetails}
          onShortlist={handleShortlist}
          isShortlisted={shortlistedCandidates.includes(selectedCandidate.id)}
          onStatusUpdate={handleStatusUpdate}
          currentStatus={
            candidateStatuses[selectedCandidate.id] || "Under Review"
          }
        />
      )}
    </Container>
  );
};

export default React.memo(ApplicationsManagement);