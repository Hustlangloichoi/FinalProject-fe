import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Stack,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Schedule,
} from "@mui/icons-material";

function ContactInfo() {
  const theme = useTheme();

  const contactInfo = [
    {
      icon: <Phone />,
      title: "Phone Support",
      primary: "0905039002",
      secondary: "Mon-Fri, 8AM-6PM",
      action: "tel:0905039002",
      color: theme.palette.success.main,
    },
    {
      icon: <Email />,
      title: "Email Support",
      primary: "goodday.ltd.vn@gmail.com",
      secondary: "24/7 Response Time",
      action: "mailto:goodday.ltd.vn@gmail.com",
      color: theme.palette.primary.main,
    },
    {
      icon: <LocationOn />,
      title: "Head Office",
      primary: "123 Medical Device St",
      secondary: "Healthcare City, Country",
      action:
        "https://www.google.com/maps/place/Topaz+Elite+-+Dragon+2B/@10.7408331,106.6775112,17z/data=!3m1!4b1!4m6!3m5!1s0x31752ffa7e6c6ec1:0x7279ee51b6dfe5a9!8m2!3d10.7408331!4d106.6800861!16s%2Fg%2F11hllscc2q?entry=tts&g_ep=EgoyMDI1MDYxMS4wIPu8ASoASAFQAw%3D%3D&skid=01b836f3-f902-4938-8f2d-89d3a5236815",
      color: theme.palette.secondary.main,
    },
  ];

  const socialLinks = [
    {
      icon: <Facebook />,
      name: "Facebook",
      url: "https://www.facebook.com/kun.nguyen.35",
      color: "#1877F2",
    },
  ];

  return (
    <Stack spacing={3}>
      {/* Contact Cards */}
      {contactInfo.map((info, index) => (
        <Card
          key={index}
          sx={{
            transition: "all 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: theme.shadows[8],
            },
          }}
          onClick={() => window.open(info.action, "_blank")}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: alpha(info.color, 0.1),
                  color: info.color,
                  mr: 2,
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
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
              <Schedule />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Business Hours
            </Typography>
          </Box>
          <Stack spacing={1}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Monday - Friday</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                8AM - 6PM
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Saturday</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                9AM - 4PM
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Sunday</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Emergency Only
              </Typography>
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
                  "&:hover": {
                    bgcolor: alpha(social.color, 0.2),
                    transform: "scale(1.1)",
                  },
                }}
                onClick={() => window.open(social.url, "_blank")}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default ContactInfo;
