import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
} from "@mui/material";

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    organization: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Contact Us
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography sx={{ mb: 2 }}>
          For business inquiries, support, or questions about our medical
          devices, please fill out the form below or email us at{" "}
          <b>support@yourcompany.com</b>.
        </Typography>
        {submitted ? (
          <Typography color="success.main">
            Thank you for contacting us! We will get back to you soon.
          </Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                fullWidth
                type="email"
              />
              <TextField
                label="Organization"
                name="organization"
                value={form.organization}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
              />
              <Button type="submit" variant="contained">
                Send Message
              </Button>
            </Stack>
          </form>
        )}
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Our Address</Typography>
        <Typography>123 Medical Device St, Healthcare City, Country</Typography>
        <Typography sx={{ mt: 1 }}>Phone: (123) 456-7890</Typography>
        {/* Optionally, add a map embed here */}
      </Paper>
    </Box>
  );
}

export default ContactPage;
