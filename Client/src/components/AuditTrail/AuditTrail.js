import React, { useState } from "react";
import {
  AuditTrailContainer,
  Title,
  Table,
  TableHead,
  TableCell,
  TableRow,
} from "./AuditTrail.styles";
import Pagination from "../../global/Pagination/Pagination";

const AuditTrail = ({ auditTrail }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; 
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = auditTrail.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AuditTrailContainer>
      <Title>Audit Trail</Title>
      <Table>
        <TableHead>
          <tr>
            <TableCell as="th">Job ID</TableCell>
            <TableCell as="th">Recruiter</TableCell>
            <TableCell as="th">Action</TableCell>
            <TableCell as="th">Description</TableCell>
            <TableCell as="th">Timestamp</TableCell>
          </tr>
        </TableHead>
        <tbody>
          {currentPosts.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.jobId}</TableCell>
              <TableCell>{entry.recruiter}</TableCell>
              <TableCell>{entry.action}</TableCell>
              <TableCell>{entry.description}</TableCell>
              <TableCell>
                {new Date(entry.timestamp).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPosts={auditTrail.length}
        postsPerPage={postsPerPage}
        paginate={paginate}
      />
    </AuditTrailContainer>
  );
};

export default AuditTrail;
