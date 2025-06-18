import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Divider,
  Alert,
  useTheme,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import apiService from "../../app/apiService";

function ContactForm() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (formData.message.length < 5) {
      setError("Message must be at least 5 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await apiService.post("/messages", formData);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ height: "fit-content" }}>
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 600, color: "primary.main" }}
        >
          Send us a Message
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Have a question or need assistance? Fill out the form below and our
          team will get back to you promptly.
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
                error={
                  formData.message.length > 0 && formData.message.length < 5
                }
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
                  "&:hover": {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    transform: "translateY(-2px)",
                    boxShadow: theme.shadows[8],
                  },
                  "&:disabled": {
                    background: theme.palette.action.disabled,
                  },
                }}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ContactForm;
