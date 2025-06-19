import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";

const FlexHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
    margin-bottom: 12px;
    padding: 0;
  }
`;

const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
  }
`;

const AddButton = styled(Button)`
  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.875rem;
  }
`;

const TableHeader = ({ title, addUrl, onAddClick }) => {
  return (
    <FlexHeader>
      <Title variant="h6">{title}</Title>
      {addUrl && (
        <AddButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddClick}
        >
          Add New
        </AddButton>
      )}
    </FlexHeader>
  );
};

export default TableHeader;
