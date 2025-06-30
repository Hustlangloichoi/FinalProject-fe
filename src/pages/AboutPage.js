import React from "react";
import { Box, Container, Grid } from "@mui/material";
import {
  AboutHero,
  AboutStats,
  AboutFeatures,
  AboutContent,
  AboutSidebar,
} from "../components/about";

function AboutPage() {
  // About page: displays information about the company, features, and stats
  // UI: hero, stats, features, content, and sidebar sections

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <AboutHero />

        {/* Stats Section */}
        <AboutStats />

        {/* Features Section */}
        <AboutFeatures />

        {/* About Content */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <AboutContent />
          <AboutSidebar />
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutPage;
