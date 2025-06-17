import React from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  Stack,
  LinearProgress,
  Button,
  useTheme,
  alpha
} from "@mui/material";
import {
  MedicalServices,
  VerifiedUser,
  Groups,
  Phone,
  StarBorder,
  TrendingUp,
  Security,
  Support
} from "@mui/icons-material";

function AboutPage() {
  const theme = useTheme();

  const stats = [
    { label: "Years of Experience", value: "15+", icon: <TrendingUp /> },
    { label: "Medical Devices", value: "500+", icon: <MedicalServices /> },
    { label: "Healthcare Partners", value: "200+", icon: <Groups /> },
    { label: "Customer Satisfaction", value: "99%", icon: <StarBorder /> }
  ];

  const features = [
    {
      icon: <VerifiedUser />,
      title: "Certified Quality",
      description: "All products meet FDA, CE, and ISO international standards with full certification documentation.",
      color: theme.palette.success.main
    },
    {
      icon: <Security />,
      title: "Secure & Reliable",
      description: "Advanced security protocols and reliable supply chain management for healthcare institutions.",
      color: theme.palette.primary.main
    },
    {
      icon: <Support />,
      title: "24/7 Support",
      description: "Round-the-clock technical support and maintenance services for all our medical devices.",
      color: theme.palette.secondary.main
    }
  ];

  const certifications = [
    { name: "FDA Approved", progress: 100 },
    { name: "CE Marking", progress: 100 },
    { name: "ISO 13485", progress: 100 },
    { name: "ISO 9001", progress: 95 }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            mb: 6,
            textAlign: 'center'
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 3,
              bgcolor: theme.palette.primary.main
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
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            About KN Medical Store
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
          >
            Leading provider of certified medical devices, serving healthcare professionals 
            with quality, reliability, and innovation since 2009.
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      width: 56,
                      height: 56,
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h3" component="div" gutterBottom sx={{ fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Features Section */}
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Why Choose Us
        </Typography>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[12]
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: alpha(feature.color, 0.1),
                        color: feature.color,
                        mr: 2
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* About Content */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.grey[50], 0.8)} 100%)`,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                We are dedicated to advancing healthcare by providing cutting-edge medical devices 
                that enable healthcare professionals to deliver exceptional patient care. Our commitment 
                to quality, innovation, and reliability has made us a trusted partner for hospitals, 
                clinics, and medical facilities worldwide.
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                Founded in 2009, KN Medical Store began with a simple vision: to bridge the gap 
                between innovative medical technology and healthcare providers. Over the years, 
                we've grown from a small distributor to a comprehensive medical device solutions 
                provider, serving over 200 healthcare partners across the region.
              </Typography>
              
              <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                <Chip label="Established 2009" variant="outlined" />
                <Chip label="Global Reach" variant="outlined" />
                <Chip label="Trusted Partner" variant="outlined" />
              </Stack>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Certifications & Compliance
              </Typography>
              <Typography variant="body2" paragraph color="text.secondary">
                Our commitment to quality is reflected in our comprehensive certifications:
              </Typography>
              
              <Stack spacing={2}>
                {certifications.map((cert, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
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
                        bgcolor: alpha(theme.palette.primary.main, 0.1)
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
            
            <Paper sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
              <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
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
                onClick={() => window.open('tel:0905039002')}
                sx={{
                  mt: 1,
                  bgcolor: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[8]
                  },
                  transition: 'all 0.3s ease'
                }}
                fullWidth
              >
                Call 0905039002
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutPage;
