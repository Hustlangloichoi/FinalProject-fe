import React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";

function MainFooter() {
  return (
    <Box component="footer" sx={{ background: "#f5f5f5", mt: 6, pt: 6, pb: 2 }}>
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
            <Link href="#" color="inherit" underline="hover" display="block">
              Help Center
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Returns
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Shipping
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              FAQs
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Categories
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover" display="block">
              Vitamins
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Supplements
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Personal Care
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Medical Devices
            </Link>
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
