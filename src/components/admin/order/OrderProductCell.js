import React from "react";
import { Typography } from "@mui/material";
import { ProductCard, ProductName, ProductPrice } from "./OrderTableStyles";

const OrderProductCell = ({ order, item }) => {
  const currentOrder = order || item;

  if (currentOrder.product) {
    return (
      <ProductCard>
        <ProductName
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "140px",
            fontSize: "0.8rem",
          }}
        >
          {currentOrder.product.name}
        </ProductName>
        {currentOrder.product.price && (
          <ProductPrice sx={{ fontSize: "0.7rem" }}>
            ${currentOrder.product.price.toLocaleString("en-US")}
          </ProductPrice>
        )}
      </ProductCard>
    );
  }

  return (
    <Typography
      color="text.secondary"
      fontStyle="italic"
      sx={{ fontSize: "0.8rem" }}
    >
      No product
    </Typography>
  );
};

export default OrderProductCell;
