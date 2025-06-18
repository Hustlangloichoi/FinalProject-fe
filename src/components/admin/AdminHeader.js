import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Stack, useTheme, alpha } from "@mui/material";
import { AccessTime, CalendarToday } from "@mui/icons-material";

function AdminHeader({ adminName = "Admin" }) {
  const theme = useTheme();
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mb: 4,
        background: `linear-gradient(135deg, ${
          theme.palette.primary.main
        } 0%, ${theme.palette.secondary.main} 70%, ${alpha(
          theme.palette.primary.light,
          0.8
        )} 100%)`,
        color: "white",
        borderRadius: 4,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
        }}
      >
        {" "}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 0.5,
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Welcome back, {adminName}!
            </Typography>{" "}
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
              Manage your store efficiently with the admin dashboard
            </Typography>
          </Box>
        </Box>
        <Stack spacing={1} alignItems="flex-end">
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, opacity: 0.9 }}
          >
            <AccessTime sx={{ fontSize: 20 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {currentTime}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, opacity: 0.9 }}
          >
            <CalendarToday sx={{ fontSize: 20 }} />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {currentDate}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}

export default AdminHeader;
