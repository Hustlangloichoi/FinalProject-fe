import React from "react";
import { Grid, Card, CardContent, Typography, Chip } from "@mui/material";
import { Receipt } from "@mui/icons-material";
import { fCurrency } from "../../utils";

const OrderSummary = ({ product, quantity, totalPrice }) => {
  return (
    <Grid item xs={12}>
      <Card
        elevation={3}
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Receipt />
            Order Summary
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem" },
              fontWeight: 700,
              mt: 1,
            }}
          >
            Total:{" "}
            {fCurrency
              ? fCurrency(totalPrice)
              : `$${totalPrice.toLocaleString("en-US")}`}
          </Typography>
          <Chip
            label={`${quantity} × ${
              fCurrency
                ? fCurrency(product.price)
                : `$${product.price.toLocaleString("en-US")}`
            }`}
            sx={{
              mt: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: 500,
            }}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default OrderSummary;
