import React from "react";
import { Box, Typography, Paper } from "@mui/material";

function AboutPage() {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        About Us
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Who We Are</Typography>
        <Typography>
          We are a trusted supplier of certified medical devices, serving
          hospitals, clinics, and healthcare professionals. Our mission is to
          provide high-quality, reliable equipment such as ventilators, blood
          pressure monitors, and patient monitors to support better patient
          care.
        </Typography>
      </Paper>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Certifications & Compliance</Typography>
        <Typography>
          All our products are sourced from reputable manufacturers and comply
          with international standards (FDA, CE, ISO). Certificates are
          available upon request.
        </Typography>
      </Paper>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Our Partners</Typography>
        <Typography>
          We partner with leading brands and manufacturers in the medical device
          industry to ensure you receive the best products and support.
        </Typography>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Contact</Typography>
        <Typography>
          For business inquiries, certifications, or support, please visit our
          Contact page or email us at <b>support@yourcompany.com</b>.
        </Typography>
      </Paper>
    </Box>
  );
}

export default AboutPage;
