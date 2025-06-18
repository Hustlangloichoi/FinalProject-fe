import React from "react";
import { Box, Container, Grid } from "@mui/material";
import {
  ContactHero,
  ContactInfo,
  ContactForm,
  ContactFloatingButton,
} from "../components/contact";

function ContactPage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <ContactHero />

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <ContactInfo />
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <ContactForm />
          </Grid>
        </Grid>

        {/* Floating Action Button */}
        <ContactFloatingButton />
      </Container>
    </Box>
  );
}

export default ContactPage;
