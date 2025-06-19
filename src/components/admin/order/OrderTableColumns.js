import React from "react";
import { Typography } from "@mui/material";
import {
  OrderTotalCell,
  OrderQuantityCell,
  OrderCustomerCell,
  OrderProductCell,
  OrderPaymentCell,
} from "./OrderTableCells";
import OrderStatusChip from "./OrderStatusChip";

export const createOrderTableColumns = ({
  handleStatusToggle,
  getStatusInfo,
  getPaymentMethodColor,
  getUserInitials,
}) => [
  {
    label: "Customer",
    width: "200px",
    render: (item) => (
      <OrderCustomerCell order={item} getUserInitials={getUserInitials} />
    ),
  },
  {
    label: "Product Details",
    width: "160px",
    render: (item) => <OrderProductCell order={item} />,
  },
  {
    label: "Qty",
    width: "80px",
    render: (item) => <OrderQuantityCell item={item} />,
  },
  {
    label: "Total Amount",
    width: "120px",
    render: (item) => <OrderTotalCell item={item} />,
  },
  {
    label: "Phone",
    width: "120px",
    render: (item) => (
      <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
        {item.phoneNumber || "-"}
      </Typography>
    ),
  },
  {
    label: "Address",
    width: "160px",
    render: (item) => (
      <Typography
        variant="body2"
        sx={{
          fontSize: "0.8rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "140px",
        }}
        title={item.address || "No address provided"}
      >
        {item.address || "-"}
      </Typography>
    ),
  },
  {
    label: "Payment",
    width: "140px",
    render: (item) => (
      <OrderPaymentCell
        order={item}
        getPaymentMethodColor={getPaymentMethodColor}
      />
    ),
  },
  {
    label: "Status",
    width: "120px",
    render: (item) => (
      <OrderStatusChip
        status={item.status}
        onClick={() => handleStatusToggle(item)}
        getStatusInfo={getStatusInfo}
        sx={{
          fontSize: "0.75rem",
          textTransform: "capitalize",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 2,
          },
          transition: "all 0.2s ease-in-out",
        }}
      />
    ),
  },
];
