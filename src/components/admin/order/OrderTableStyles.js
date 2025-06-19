import styled from "styled-components";
import { Box, Avatar, Typography, Chip } from "@mui/material";

// Styled components for order table cells
export const StyledOrderCell = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UserAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
  background: linear-gradient(45deg, #2196f3 30%, #21cbf3 90%);
  font-size: 0.75rem;
`;

export const ProductCard = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProductName = styled(Typography)`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.2;
`;

export const ProductPrice = styled(Typography)`
  font-size: 0.75rem;
  color: #666;
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
`;

export const PriceDisplay = styled(Typography)`
  font-weight: 600;
  color: #2e7d32;
  font-size: 0.9rem;
`;

export const PaymentChip = styled(Chip)`
  border-radius: 6px !important;
  font-size: 0.75rem !important;
  height: 24px !important;
`;
