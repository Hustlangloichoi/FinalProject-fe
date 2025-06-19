import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import UserOrderCard from "./UserOrderCard";

const UserOrderHistory = ({ orders = [], onDeleteOrder }) => {
  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Order History
      </Typography>
      {safeOrders.length > 0 ? (
        <Grid container spacing={3}>
          {safeOrders.map((order) => (
            <Grid item xs={12} md={6} lg={4} key={order?._id || Math.random()}>
              <UserOrderCard order={order} onDelete={onDeleteOrder} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            backgroundColor: "grey.50",
            borderRadius: 2,
            border: "1px dashed",
            borderColor: "grey.300",
          }}
        >
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No orders yet
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Start shopping to see your orders here
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserOrderHistory;
