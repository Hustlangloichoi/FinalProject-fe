import React from "react";
import { Box, Typography, Avatar, useTheme, alpha } from "@mui/material";
import { MedicalServices } from "@mui/icons-material";

function AboutHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.1
        )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        borderRadius: 4,
        p: { xs: 4, md: 6 },
        mb: 6,
        textAlign: "center",
      }}
    >
      <Avatar
        sx={{
          width: 80,
          height: 80,
          mx: "auto",
          mb: 3,
          bgcolor: theme.palette.primary.main,
        }}
      >
        <MedicalServices sx={{ fontSize: 40 }} />
      </Avatar>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 800,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 2,
        }}
      >
        About KN Medical Store
      </Typography>
      <Typography
        variant="h5"
        color="text.secondary"
        sx={{ maxWidth: 800, mx: "auto", lineHeight: 1.6 }}
      >
        Leading provider of certified medical devices, serving healthcare
        professionals with quality, reliability, and innovation since 2009.
      </Typography>
    </Box>
  );
}

export default AboutHero;
