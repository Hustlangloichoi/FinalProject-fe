import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

function ContactPage() {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Contact Us
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography sx={{ mb: 2 }}>
          For business inquiries, support, or questions about our medical devices, please contact us using the information below.
        </Typography>
        <Stack spacing={2}>
          <Typography>
            <b>Facebook:</b> <a href="https://www.facebook.com/kun.nguyen.35" target="_blank" rel="noopener noreferrer">kun.nguyen.35</a>
          </Typography>
          <Typography>
            <b>Phone:</b> <a href="tel:0905039002">0905039002</a>
          </Typography>
          <Typography>
            <b>Email:</b> <a href="mailto:goodday.ltd.vn@gmail.com">goodday.ltd.vn@gmail.com</a>
          </Typography>
        </Stack>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Our Address</Typography>
        <Typography>123 Medical Device St, Healthcare City, Country</Typography>
        <Typography sx={{ mt: 1 }}>Phone: 0905039002</Typography>
      </Paper>
    </Box>
  );
}

export default ContactPage;
