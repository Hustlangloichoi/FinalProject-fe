import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import { Email, Phone } from "@mui/icons-material";

function ContactHero() {
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: alpha(theme.palette.primary.main, 0.05),
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: alpha(theme.palette.secondary.main, 0.05),
          zIndex: 0,
        }}
      />

      <Avatar
        sx={{
          width: 80,
          height: 80,
          mx: "auto",
          mb: 3,
          bgcolor: theme.palette.primary.main,
          zIndex: 1,
          position: "relative",
        }}
      >
        <Email sx={{ fontSize: 40 }} />
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
          position: "relative",
          zIndex: 1,
        }}
      >
        Get In Touch
      </Typography>

      <Typography
        variant="h5"
        color="text.secondary"
        sx={{
          maxWidth: 600,
          mx: "auto",
          lineHeight: 1.6,
          position: "relative",
          zIndex: 1,
        }}
      >
        We're here to help with your medical device needs. Reach out to our
        expert team for support, inquiries, or partnerships.
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        sx={{ mt: 3, position: "relative", zIndex: 1 }}
      >
        <Chip
          label="24/7 Support"
          color="primary"
          variant="outlined"
          icon={<Phone />}
        />
        <Chip
          label="Expert Team"
          color="secondary"
          variant="outlined"
          icon={<Email />}
        />
      </Stack>
    </Box>
  );
}

export default ContactHero;
