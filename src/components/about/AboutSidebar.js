import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Stack,
  Box,
  LinearProgress,
  Avatar,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { Phone } from "@mui/icons-material";

function AboutSidebar() {
  const theme = useTheme();

  const certifications = [
    { name: "FDA Approved", progress: 100 },
    { name: "CE Marking", progress: 100 },
    { name: "ISO 13485", progress: 100 },
    { name: "ISO 9001", progress: 95 },
  ];

  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Certifications & Compliance
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          Our commitment to quality is reflected in our comprehensive
          certifications:
        </Typography>

        <Stack spacing={2}>
          {certifications.map((cert, index) => (
            <Box key={index}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {cert.name}
                </Typography>
                <Typography variant="body2" color="primary">
                  {cert.progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={cert.progress}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                }}
              />
            </Box>
          ))}
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
        <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
          <Phone />
        </Avatar>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Get In Touch
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Ready to discuss your medical device needs? Our team is here to help.
        </Typography>
        <Button
          variant="contained"
          startIcon={<Phone />}
          onClick={() => window.open("tel:0905039002")}
          sx={{
            mt: 1,
            bgcolor: theme.palette.primary.main,
            "&:hover": {
              bgcolor: theme.palette.primary.dark,
              transform: "translateY(-2px)",
              boxShadow: theme.shadows[8],
            },
            transition: "all 0.3s ease",
          }}
          fullWidth
        >
          Call 0905039002
        </Button>
      </Paper>
    </Grid>
  );
}

export default AboutSidebar;
