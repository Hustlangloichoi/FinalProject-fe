import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Stack,
  Chip,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";

function AboutContent() {
  const theme = useTheme();

  return (
    <Grid item xs={12} md={8}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.background.paper,
            0.8
          )} 0%, ${alpha(theme.palette.grey[50], 0.8)} 100%)`,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 600, color: "primary.main" }}
        >
          Our Mission
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
        >
          We are dedicated to advancing healthcare by providing cutting-edge
          medical devices that enable healthcare professionals to deliver
          exceptional patient care. Our commitment to quality, innovation, and
          reliability has made us a trusted partner for hospitals, clinics, and
          medical facilities worldwide.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 600, color: "primary.main" }}
        >
          Our Story
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Founded in 2009, KN Medical Store began with a simple vision: to
          bridge the gap between innovative medical technology and healthcare
          providers. Over the years, we've grown from a small distributor to a
          comprehensive medical device solutions provider, serving over 200
          healthcare partners across the region.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
          <Chip label="Established 2009" variant="outlined" />
          <Chip label="Global Reach" variant="outlined" />
          <Chip label="Trusted Partner" variant="outlined" />
        </Stack>
      </Paper>
    </Grid>
  );
}

export default AboutContent;
