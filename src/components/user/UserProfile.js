import React from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Avatar,
  Chip,
  Divider,
  CardContent,
  Stack,
  IconButton,
} from "@mui/material";
import {
  Person,
  Edit,
  Email,
  Phone,
  LocationOn,
  AdminPanelSettings,
  Lock,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const ProfileCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  border: `1px solid ${theme.palette.divider}`,
  overflow: "visible",
  position: "relative",
  "& .MuiCardContent-root": {
    padding: theme.spacing(3),
  },
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  borderRadius: "16px 16px 0 0",
  padding: theme.spacing(3),
  color: "white",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    opacity: 0.1,
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  fontSize: "2rem",
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
}));

const InfoCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
}));

const UserProfile = ({ profile, onEditOpen, onPasswordChangeOpen }) => {
  return (
    <ProfileCard>
      <ProfileHeader>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <UserAvatar>
              <Person sx={{ fontSize: "2rem" }} />
            </UserAvatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {profile.name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                <Chip
                  icon={
                    profile.role === "admin" ? (
                      <AdminPanelSettings />
                    ) : (
                      <Person />
                    )
                  }
                  label={profile.role === "admin" ? "Administrator" : "User"}
                  size="small"
                  variant="outlined"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }}
                />
              </Stack>
            </Box>
          </Stack>
          <Stack spacing={1}>
            <IconButton
              onClick={onEditOpen}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={onPasswordChangeOpen}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <Lock />
            </IconButton>
          </Stack>
        </Stack>
      </ProfileHeader>

      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InfoCard>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Email color="primary" />
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Email
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {profile.email || "Not provided"}
                      </Typography>
                    </Box>
                  </Stack>
                  <Divider />
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Phone color="primary" />
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Phone
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {profile.phone || "Not provided"}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </InfoCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoCard>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <LocationOn color="primary" />
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Address
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {profile.address || "Not provided"}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </InfoCard>
          </Grid>
        </Grid>
      </CardContent>
    </ProfileCard>
  );
};

export default UserProfile;
