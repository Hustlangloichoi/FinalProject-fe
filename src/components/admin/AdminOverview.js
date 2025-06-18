import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import {
  ShoppingCart,
  People,
  Category,
  Message,
  Inventory,
} from "@mui/icons-material";
import AdminStatsCard from "./AdminStatsCard";
import apiService from "../../app/apiService";

function AdminOverview() {
  const [stats, setStats] = useState({
    orders: { count: 0, loading: true },
    users: { count: 0, loading: true },
    categories: { count: 0, loading: true },
    messages: { count: 0, loading: true },
    products: { count: 0, loading: true },
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Fetch orders
        const ordersResponse = await apiService.get("/orders?limit=1000");
        console.log("Orders response:", ordersResponse.data);
        const ordersCount = ordersResponse.data?.data?.total || 0;

        // Fetch users
        const usersResponse = await apiService.get("/users?limit=1000");
        console.log("Users response:", usersResponse.data);
        const usersCount = usersResponse.data?.data?.total || 0; // Fetch categories
        const categoriesResponse = await apiService.get(
          "/categories?limit=1000"
        );
        console.log("Categories response:", categoriesResponse.data);
        const categoriesCount = categoriesResponse.data?.data?.total || 0;

        // Fetch messages
        const messagesResponse = await apiService.get("/messages?limit=1000");
        console.log("Messages response:", messagesResponse.data);
        const messagesCount = messagesResponse.data?.data?.total || 0;

        // Fetch products
        const productsResponse = await apiService.get("/products?limit=1000");
        console.log("Products response:", productsResponse.data);
        const productsCount = productsResponse.data?.data?.total || 0;

        setStats({
          orders: { count: ordersCount, loading: false },
          users: { count: usersCount, loading: false },
          categories: { count: categoriesCount, loading: false },
          messages: { count: messagesCount, loading: false },
          products: { count: productsCount, loading: false },
        });
      } catch (error) {
        console.error("Error fetching stats:", error); // Set default values if API fails
        setStats({
          orders: { count: 0, loading: false },
          users: { count: 0, loading: false },
          categories: { count: 0, loading: false },
          messages: { count: 0, loading: false },
          products: { count: 0, loading: false },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  const statsData = [
    {
      title: "Total Orders",
      value: stats.orders.loading ? "..." : stats.orders.count.toString(),
      icon: <ShoppingCart />,
      color: "#1976d2",
      subtitle: "All orders",
      trend: null,
    },
    {
      title: "Total Users",
      value: stats.users.loading ? "..." : stats.users.count.toString(),
      icon: <People />,
      color: "#2e7d32",
      subtitle: "Registered users",
      trend: null,
    },
    {
      title: "Products",
      value: stats.products.loading ? "..." : stats.products.count.toString(),
      icon: <Inventory />,
      color: "#ed6c02",
      subtitle: "Available products",
      trend: null,
    },
    {
      title: "Categories",
      value: stats.categories.loading
        ? "..."
        : stats.categories.count.toString(),
      icon: <Category />,
      color: "#9c27b0",
      subtitle: "Product categories",
      trend: null,
    },
    {
      title: "Messages",
      value: stats.messages.loading ? "..." : stats.messages.count.toString(),
      icon: <Message />,
      color: "#d32f2f",
      subtitle: "Contact messages",
      trend: null,
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ mb: 1, fontWeight: 700, color: "text.primary" }}
        >
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Welcome to your admin dashboard. Here's what's happening with your
          store today.
        </Typography>
      </Box>{" "}
      {/* Main Stats Grid - 3+2 Layout */}
      <Grid
        container
        spacing={4}
        sx={{ maxWidth: "1200px", margin: "0 auto", px: 2 }}
      >
        {statsData.map((stat, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={index < 3 ? 4 : 6}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: "300px" }}>
              <AdminStatsCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                subtitle={stat.subtitle}
                trend={stat.trend}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AdminOverview;
