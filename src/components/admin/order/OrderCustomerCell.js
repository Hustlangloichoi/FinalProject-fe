import React from "react";
import { Box, Typography } from "@mui/material";
import { StyledOrderCell, UserAvatar } from "./OrderTableStyles";

const OrderCustomerCell = ({ order, item, getUserInitials }) => {
  const currentOrder = order || item;

  return (
    <StyledOrderCell>
      <UserAvatar sx={{ width: 28, height: 28, fontSize: "0.7rem" }}>
        {getUserInitials(currentOrder.sender)}
      </UserAvatar>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="body2"
          fontWeight={500}
          noWrap
          sx={{ fontSize: "0.8rem" }}
        >
          {currentOrder.sender?.name || "Unknown"}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          noWrap
          sx={{ fontSize: "0.7rem" }}
        >
          {currentOrder.sender?.email || "-"}
        </Typography>
      </Box>
    </StyledOrderCell>
  );
};

export default OrderCustomerCell;
