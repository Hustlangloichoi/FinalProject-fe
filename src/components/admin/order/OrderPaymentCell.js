import React from "react";
import { PaymentChip } from "./OrderTableStyles";

const OrderPaymentCell = ({ order, item, getPaymentMethodColor }) => {
  const currentOrder = order || item;
  const paymentInfo = getPaymentMethodColor(currentOrder.paymentMethod);

  return (
    <PaymentChip
      label={`${paymentInfo.icon} ${currentOrder.paymentMethod || "N/A"}`}
      color={paymentInfo.color}
      variant="outlined"
      sx={{ fontSize: "0.65rem", height: "20px" }}
    />
  );
};

export default OrderPaymentCell;
