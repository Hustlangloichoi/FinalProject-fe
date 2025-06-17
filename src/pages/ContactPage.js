import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Stack,
  Divider,
  IconButton,
  Chip,
  useTheme,
  alpha,
  Fab,
  Alert
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Schedule,
  Send
} from "@mui/icons-material";
import apiService from "../app/apiService";

function ContactPage() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Auto-clear success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (formData.message.length < 5) {
      setError('Message must be at least 5 characters long');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await apiService.post('/messages', formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone />,
      title: "Phone Support",
      primary: "0905039002",
      secondary: "Mon-Fri, 8AM-6PM",
      action: "tel:0905039002",
      color: theme.palette.success.main
    },
    {
      icon: <Email />,
      title: "Email Support",
      primary: "goodday.ltd.vn@gmail.com",
      secondary: "24/7 Response Time",
      action: "mailto:goodday.ltd.vn@gmail.com",
      color: theme.palette.primary.main
    },
    {
      icon: <LocationOn />,
      title: "Head Office",
      primary: "123 Medical Device St",
      secondary: "Healthcare City, Country",
      action: "https://www.google.com/maps/place/Topaz+Elite+-+Dragon+2B/@10.7408331,106.6775112,17z/data=!3m1!4b1!4m6!3m5!1s0x31752ffa7e6c6ec1:0x7279ee51b6dfe5a9!8m2!3d10.7408331!4d106.6800861!16s%2Fg%2F11hllscc2q?entry=tts&g_ep=EgoyMDI1MDYxMS4wIPu8ASoASAFQAw%3D%3D&skid=01b836f3-f902-4938-8f2d-89d3a5236815",
      color: theme.palette.secondary.main
    }
  ];

  const socialLinks = [
    {
      icon: <Facebook />,
      name: "Facebook",
      url: "https://www.facebook.com/kun.nguyen.35",
      color: "#1877F2"
    }
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
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: alpha(theme.palette.primary.main, 0.05),
              zIndex: 0
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: alpha(theme.palette.secondary.main, 0.05),
              zIndex: 0
            }}
          />
          
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 3,
              bgcolor: theme.palette.primary.main,
              zIndex: 1,
              position: 'relative'
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
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              position: 'relative',
              zIndex: 1
            }}
          >
            Get In Touch
          </Typography>
          
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ 
              maxWidth: 600, 
              mx: 'auto', 
              lineHeight: 1.6,
              position: 'relative',
              zIndex: 1
            }}
          >
            We're here to help with your medical device needs. 
            Reach out to our expert team for support, inquiries, or partnerships.
          </Typography>
          
          <Stack 
            direction="row" 
            spacing={1} 
            justifyContent="center" 
            sx={{ mt: 3, position: 'relative', zIndex: 1 }}
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

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Contact Cards */}
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  sx={{
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8]
                    }
                  }}
                  onClick={() => window.open(info.action, '_blank')}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(info.color, 0.1),
                          color: info.color,
                          mr: 2
                        }}
                      >
                        {info.icon}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {info.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                      {info.primary}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {info.secondary}
                    </Typography>
                  </CardContent>
                </Card>
              ))}

              {/* Business Hours */}
              <Card sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <Schedule />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Business Hours
                    </Typography>
                  </Box>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Monday - Friday</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>8AM - 6PM</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Saturday</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>9AM - 4PM</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Sunday</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Emergency Only</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Follow Us
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    {socialLinks.map((social, index) => (
                      <IconButton
                        key={index}
                        sx={{
                          bgcolor: alpha(social.color, 0.1),
                          color: social.color,
                          '&:hover': {
                            bgcolor: alpha(social.color, 0.2),
                            transform: 'scale(1.1)'
                          }
                        }}
                        onClick={() => window.open(social.url, '_blank')}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Card sx={{ height: 'fit-content' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Send us a Message
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Have a question or need assistance? Fill out the form below and our team will get back to you promptly.
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Box component="form" onSubmit={handleSubmit}>
                  {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Message sent successfully! We'll get back to you soon.
                    </Alert>
                  )}
                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number (Optional)"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        variant="outlined"
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        placeholder="Tell us about your medical device needs, technical questions, or business inquiries..."
                        disabled={loading}
                        error={formData.message.length > 0 && formData.message.length < 5}
                        helperText={
                          formData.message.length > 0 && formData.message.length < 5
                            ? "Message must be at least 5 characters"
                            : `${formData.message.length}/2000 characters`
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Send />}
                        disabled={loading}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          fontWeight: 600,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          '&:hover': {
                            background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[8]
                          },
                          '&:disabled': {
                            background: theme.palette.action.disabled
                          }
                        }}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 96, // Above theme toggle button (vertically aligned)
            right: 24, // Same horizontal position as theme toggle
            zIndex: 999, // Lower z-index than theme toggle
            '@media (max-width: 768px)': {
              bottom: 84,
              right: 20,
            },
            '@media (max-width: 480px)': {
              bottom: 76,
              right: 16,
            },
          }}
          onClick={() => window.open('tel:0905039002')}
        >
          <Phone />
        </Fab>
      </Container>
    </Box>
  );
}

export default ContactPage;
