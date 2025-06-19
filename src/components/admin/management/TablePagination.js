import React from "react";
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";

const PaginationContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding: 0 16px;

  @media (max-width: 768px) {
    margin-top: 16px;
    padding: 0 8px;

    .MuiPagination-ul {
      flex-wrap: wrap;
      justify-content: center;
      gap: 4px;
    }

    .MuiPaginationItem-root {
      font-size: 0.8rem;
      min-width: 32px;
      height: 32px;
    }
  }

  @media (max-width: 480px) {
    .MuiPaginationItem-root {
      min-width: 28px;
      height: 28px;
      font-size: 0.75rem;
    }

    .MuiPaginationItem-icon {
      font-size: 1rem;
    }
  }
`;

const TablePagination = ({
  isPaginatedTable,
  page,
  totalPages,
  onPageChange,
}) => {
  if (!isPaginatedTable || totalPages <= 1) {
    return null;
  }

  return (
    <PaginationContainer>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, newPage) => onPageChange(newPage)}
        color="primary"
        showFirstButton
        showLastButton
        size="medium"
        siblingCount={1}
        boundaryCount={1}
      />
    </PaginationContainer>
  );
};

export default TablePagination;
