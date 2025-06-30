import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { ShoppingCart, Receipt, LocalMall } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StatsBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2),
  borderRadius: 12,
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
  border: `1px solid ${theme.palette.divider}`,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "120px",
}));

/**
 * UserStats: displays user order statistics including total, completed, and pending orders.
 * Accepts an array of orders and calculates stats for display.
 */
const UserStats = ({ orders = [] }) => {
  const safeOrders = Array.isArray(orders) ? orders : [];
  const totalOrders = safeOrders.length;
  const completedOrders = safeOrders.filter(
    (order) => order?.status === "completed"
  ).length;
  const pendingOrders = safeOrders.filter(
    (order) => order?.status === "pending"
  ).length;

  const stats = [
    {
      icon: <ShoppingCart sx={{ fontSize: 40, color: "primary.main" }} />,
      label: "Total Orders",
      value: totalOrders,
      color: "primary.main",
    },
    {
      icon: <Receipt sx={{ fontSize: 40, color: "success.main" }} />,
      label: "Completed",
      value: completedOrders,
      color: "success.main",
    },
    {
      icon: <LocalMall sx={{ fontSize: 40, color: "warning.main" }} />,
      label: "Pending",
      value: pendingOrders,
      color: "warning.main",
    },
  ];
  return (
    <Box sx={{ mb: 4, mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Order Statistics
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <StatsBox>
              {stat.icon}
              <Typography
                variant="h4"
                fontWeight="bold"
                color={stat.color}
                mt={1}
              >
                {stat.value}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {stat.label}
              </Typography>
            </StatsBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserStats;
