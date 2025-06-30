// MainFooter: displays about info, customer service, categories, and contact details in a responsive footer.
import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";

function MainFooter() {
  // Main footer: displays about info, customer service, and contact details
  // UI: responsive grid with multiple sections
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        background: theme.palette.background.default,
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 6,
        pt: 6,
        pb: 2,
        px: { xs: 2, sm: 0 },
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ maxWidth: 1200, mx: "auto", px: 2 }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            About
          </Typography>
          <Typography variant="body2" color="text.secondary">
            KN is your trusted online pharmacy, providing quality healthcare
            products and fast delivery.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Customer Service
          </Typography>
          <Box>
            <Typography color="text.secondary" display="block">
              Help Center
            </Typography>
            <Typography color="text.secondary" display="block">
              Returns
            </Typography>
            <Typography color="text.secondary" display="block">
              Shipping
            </Typography>
            <Typography color="text.secondary" display="block">
              FAQs
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Categories
          </Typography>
          <Box>
            <Typography color="text.secondary" display="block">
              Vitamins
            </Typography>
            <Typography color="text.secondary" display="block">
              Supplements
            </Typography>
            <Typography color="text.secondary" display="block">
              Personal Care
            </Typography>
            <Typography color="text.secondary" display="block">
              Medical Devices
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact
          </Typography>
          <Typography variant="body2" color="text.secondary">
            123 Health St, Wellness City
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Phone: (123) 456-7890
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: info@medilazar.com
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          borderTop: "1px solid #e0e0e0",
          mt: 4,
          pt: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} KN. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default MainFooter;
