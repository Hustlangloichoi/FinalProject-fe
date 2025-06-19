import React from "react";
import { Typography, Chip } from "@mui/material";
import { PriceDisplay } from "./OrderTableStyles";
import OrderCustomerCell from "./OrderCustomerCell";
import OrderProductCell from "./OrderProductCell";
import OrderPaymentCell from "./OrderPaymentCell";

const OrderTotalCell = ({ item }) => {
  if (item.totalPrice) {
    return (
      <PriceDisplay sx={{ fontSize: "0.85rem" }}>
        ${item.totalPrice.toLocaleString("en-US")}
      </PriceDisplay>
    );
  }

  return (
    <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
      -
    </Typography>
  );
};

const OrderQuantityCell = ({ item }) => {
  return (
    <Chip
      label={item.quantity || "0"}
      size="small"
      variant="outlined"
      color="primary"
    />
  );
};

export {
  OrderTotalCell,
  OrderQuantityCell,
  OrderCustomerCell,
  OrderProductCell,
  OrderPaymentCell,
};
