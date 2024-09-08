import React, { useState, useEffect, useCallback } from 'react';
import candidatesData from '../../data/candidates.json';
import CandidateDetails from '../../components/CandidateDetails/CandidateDetails.js';
import CandidateTable from '../../components/CandidateTable/CandidateTable.js';
import { Container, Heading } from './Candidates.styles.js';

const CandidateProfiles = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [candidateStatuses, setCandidateStatuses] = useState({});

  useEffect(() => {
    const initialStatuses = {};
    candidatesData.forEach(candidate => {
      initialStatuses[candidate.id] = 'Under Review';
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
    setShortlistedCandidates(prev => 
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  }, []);

  const handleStatusUpdate = useCallback((candidateId, newStatus) => {
    setCandidateStatuses(prev => ({
      ...prev,
      [candidateId]: newStatus
    }));
  }, []);

  return (
    <Container>
      <Heading>Candidate Profiles Management</Heading>
      <CandidateTable
        candidates={candidatesData}
        onCandidateClick={handleCandidateClick}
        shortlistedCandidates={shortlistedCandidates}
        candidateStatuses={candidateStatuses}
        onStatusUpdate={handleStatusUpdate}
      />
      {selectedCandidate && (
        <CandidateDetails 
          candidate={selectedCandidate} 
          onClose={handleCloseDetails}
          onShortlist={handleShortlist}
          isShortlisted={shortlistedCandidates.includes(selectedCandidate.id)}
          onStatusUpdate={handleStatusUpdate}
          currentStatus={candidateStatuses[selectedCandidate.id] || 'Under Review'}
        />
      )}
    </Container>
  );
};

export default React.memo(CandidateProfiles);