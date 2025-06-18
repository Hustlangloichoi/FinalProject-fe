import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import {
  TrendingUp,
  MedicalServices,
  Groups,
  StarBorder,
} from "@mui/icons-material";

function AboutStats() {
  const theme = useTheme();

  const stats = [
    { label: "Years of Experience", value: "15+", icon: <TrendingUp /> },
    { label: "Medical Devices", value: "500+", icon: <MedicalServices /> },
    { label: "Healthcare Partners", value: "200+", icon: <Groups /> },
    { label: "Customer Satisfaction", value: "99%", icon: <StarBorder /> },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 6 }}>
      {stats.map((stat, index) => (
        <Grid item xs={6} md={3} key={index}>
          <Card
            sx={{
              height: "100%",
              textAlign: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: theme.shadows[8],
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  width: 56,
                  height: 56,
                  mx: "auto",
                  mb: 2,
                }}
              >
                {stat.icon}
              </Avatar>
              <Typography
                variant="h3"
                component="div"
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default AboutStats;
