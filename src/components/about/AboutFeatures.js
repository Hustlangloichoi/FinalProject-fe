import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
  useTheme,
  alpha,
} from "@mui/material";
import { VerifiedUser, Security, Support } from "@mui/icons-material";

function AboutFeatures() {
  const theme = useTheme();

  const features = [
    {
      icon: <VerifiedUser />,
      title: "Certified Quality",
      description:
        "All products meet FDA, CE, and ISO international standards with full certification documentation.",
      color: theme.palette.success.main,
    },
    {
      icon: <Security />,
      title: "Secure & Reliable",
      description:
        "Advanced security protocols and reliable supply chain management for healthcare institutions.",
      color: theme.palette.primary.main,
    },
    {
      icon: <Support />,
      title: "24/7 Support",
      description:
        "Round-the-clock technical support and maintenance services for all our medical devices.",
      color: theme.palette.secondary.main,
    },
  ];

  return (
    <>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ mb: 4, fontWeight: 600 }}
      >
        Why Choose Us
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[12],
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(feature.color, 0.1),
                      color: feature.color,
                      mr: 2,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default AboutFeatures;
