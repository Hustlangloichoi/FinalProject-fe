import React from "react";
import { Box } from "@mui/material";

const ProductImage = ({ product }) => {
  if (!product?.image) return null;

  return (
    <Box
      sx={{
        flex: { xs: "none", lg: "0 0 40%" },
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Box
        component="img"
        src={product.image}
        alt={product.name}
        sx={{
          width: "100%",
          maxWidth: { xs: 400, sm: 500, lg: "100%" },
          height: "auto",
          borderRadius: 2,
          boxShadow: 2,
        }}
      />
    </Box>
  );
};

export default ProductImage;
