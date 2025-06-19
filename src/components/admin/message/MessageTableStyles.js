import styled from "styled-components";
import { Box, Avatar, Chip } from "@mui/material";

export const StyledMessageCell = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MessageAvatar = styled(Avatar)`
  width: 28px;
  height: 28px;
  background: linear-gradient(45deg, #673ab7 30%, #3f51b5 90%);
  font-size: 0.7rem;
`;

export const StatusChip = styled(Chip)`
  border-radius: 6px;
  font-size: 0.65rem;
  height: 20px;
`;
