import styled from "styled-components";
import { Box, Typography, Card } from "@mui/material";

export const DetailSection = styled(Box)`
  margin-bottom: 20px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
`;

export const DetailRow = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const DetailIcon = styled(Box)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1976d2;
`;

export const DetailLabel = styled(Typography)`
  font-weight: 500;
  min-width: 120px;
  color: #555;
`;

export const DetailValue = styled(Typography)`
  color: #333;
  flex: 1;
`;
