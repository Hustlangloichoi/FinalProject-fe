import React from "react";
import { Chip } from "@mui/material";

const OrderStatusChip = ({
  status,
  onClick,
  getStatusInfo,
  order,
  onToggle,
  sx = {},
  ...props
}) => {
  // Support both new API (status, onClick) and legacy API (order, onToggle)
  const currentStatus = status || order?.status;
  const handleClick =
    onClick || (onToggle && order ? () => onToggle(order) : undefined);

  const statusInfo = getStatusInfo(currentStatus);

  const defaultSx = {
    fontSize: "0.75rem",
    textTransform: "capitalize",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: 2,
    },
    transition: "all 0.2s ease-in-out",
    ...sx,
  };

  return (
    <Chip
      label={statusInfo.label}
      color={statusInfo.color}
      size="small"
      clickable
      onClick={handleClick}
      sx={defaultSx}
      {...props}
    />
  );
};

export default OrderStatusChip;
