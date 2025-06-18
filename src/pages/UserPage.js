import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Card,
  Grid,
  useMediaQuery,
  useTheme,
  Avatar,
  Chip,
  Divider,
  Container,
  CardContent,
  CardActions,
  Stack,
  Tooltip,
  Fab,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Person,
  Edit,
  Email,
  Phone,
  LocationOn,
  AdminPanelSettings,
  ShoppingCart,
  Delete,
  Close,
  Save,
  History,
  Receipt,
  LocalMall,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import apiService from "../app/apiService";
import useAuth from "../hooks/useAuth";
import PersistentPhoneButton from "../components/PersistentPhoneButton";

// Styled Components
const ProfileContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  minHeight: "100vh",
  background: `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.light}10 100%)`,
}));

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

const OrderCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
}));

const StatsBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2),
  borderRadius: 12,
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
  border: `1px solid ${theme.palette.divider}`,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "120px",
}));

const UserPage = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [profile, setProfile] = useState({
    name: user?.username || "",
    email: "",
    role: user?.role || "user",
    phone: "", // Added phone field
    address: "", // Added address field
  });
  const [openEdit, setOpenEdit] = useState(false);
  const [openPasswordChange, setOpenPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [editProfile, setEditProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user info (from backend) and orders
    const fetchProfile = async () => {
      try {
        const res = await apiService.get("/me");
        setProfile({
          name: res.data.data.name,
          email: res.data.data.email,
          role: res.data.data.isAdmin ? "admin" : "user",
          phone: res.data.data.phone || "", // Fetch phone
          address: res.data.data.address || "", // Fetch address
        });
      } catch {}
    };
    const fetchOrders = async () => {
      try {
        const res = await apiService.get("/me/orders");
        setOrders(res.data.data || []);
      } catch {}
    };
    fetchProfile();
    fetchOrders();
  }, []);
  const handleEditOpen = () => {
    setEditProfile({
      name: profile.name,
      email: profile.email,
      phone: profile.phone || "",
      address: profile.address || "",
    });
    setOpenEdit(true);
  };

  const handleEditSave = async () => {
    try {
      const updatedProfile = await apiService.put("/me", {
        name: editProfile.name,
        email: editProfile.email,
        phone: editProfile.phone, // Added phone field
        address: editProfile.address, // Added address field
      });
      setProfile(updatedProfile.data.data); // Update profile with the latest data
      setOpenEdit(false);
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  const handlePasswordChangeOpen = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
    setOpenPasswordChange(true);
  };

  const handlePasswordChange = async () => {
    try {
      // Validate passwords match
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setPasswordError("New passwords do not match");
        return;
      }

      // Validate password length
      if (passwordData.newPassword.length < 6) {
        setPasswordError("New password must be at least 6 characters");
        return;
      }

      await apiService.put("/me/password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordSuccess(true);
      setOpenPasswordChange(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setPasswordError(
        err.response?.data?.message || "Failed to change password"
      );
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await apiService.delete(`/orders/${orderId}`); // Corrected endpoint
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (err) {
      alert("Failed to cancel order");
    }
  };
  const getUserInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "U";
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <ProfileContainer maxWidth="lg">
      {/* Profile Header Section */}
      <ProfileCard>
        {" "}
        <ProfileHeader>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ flexShrink: 0 }}>
              <UserAvatar>{getUserInitials(profile.name)}</UserAvatar>
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="h4" fontWeight={600} gutterBottom>
                {profile.name || "User Profile"}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Welcome back to your dashboard
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip
                  icon={
                    profile.role === "admin" ? (
                      <AdminPanelSettings />
                    ) : (
                      <Person />
                    )
                  }
                  label={profile.role === "admin" ? "Administrator" : "Member"}
                  color={profile.role === "admin" ? "secondary" : "default"}
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
              </Box>
            </Box>{" "}
            <Box sx={{ flexShrink: 0, ml: "auto", display: "flex", gap: 1 }}>
              <Tooltip title="Change Password">
                <Fab
                  color="warning"
                  size="medium"
                  onClick={handlePasswordChangeOpen}
                  sx={{
                    backgroundColor: "rgba(255, 193, 7, 0.2)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 193, 7, 0.3)",
                    },
                  }}
                >
                  <Lock />
                </Fab>
              </Tooltip>
              <Tooltip title="Edit Profile">
                <Fab
                  color="secondary"
                  size="medium"
                  onClick={handleEditOpen}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                    },
                  }}
                >
                  <Edit />
                </Fab>
              </Tooltip>
            </Box>
          </Box>
        </ProfileHeader>
        <CardContent>
          {/* Profile Information Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <InfoCard>
                <CardContent>
                  <Stack spacing={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Email color="primary" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Email Address
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {profile.email || "Not provided"}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider />
                    <Box display="flex" alignItems="center" gap={2}>
                      <Phone color="primary" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Phone Number
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {profile.phone || "Not provided"}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </InfoCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoCard>
                <CardContent>
                  <Box display="flex" alignItems="flex-start" gap={2}>
                    <LocationOn color="primary" />
                    <Box sx={{ width: "100%" }}>
                      <Typography variant="body2" color="text.secondary">
                        Address
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {profile.address || "Not provided"}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </InfoCard>
            </Grid>
          </Grid>

          {/* Order Statistics */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              fontWeight={600}
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Receipt color="primary" />
              Order Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <StatsBox>
                  <LocalMall color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4" fontWeight={600} color="primary">
                    {orders.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Orders
                  </Typography>
                </StatsBox>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatsBox>
                  <ShoppingCart
                    color="secondary"
                    sx={{ fontSize: 40, mb: 1 }}
                  />
                  <Typography variant="h4" fontWeight={600} color="secondary">
                    {orders.reduce(
                      (sum, order) => sum + (order.quantity || 1),
                      0
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Items Ordered
                  </Typography>
                </StatsBox>
              </Grid>{" "}
              <Grid item xs={6} md={3}>
                <StatsBox>
                  <Typography
                    variant="h2"
                    sx={{ fontSize: 40, mb: 1, color: "success.main" }}
                  >
                    💰
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={600}
                    color="success.main"
                  >
                    $
                    {orders
                      .reduce(
                        (sum, order) =>
                          sum + (order.totalPrice || order.product?.price || 0),
                        0
                      )
                      .toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Spent
                  </Typography>
                </StatsBox>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatsBox>
                  <History color="info" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4" fontWeight={600} color="info.main">
                    {orders.length > 0 ? "Active" : "None"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Recent Activity
                  </Typography>
                </StatsBox>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </ProfileCard>
      {/* Order History Section */}
      <Card sx={{ mt: 4, borderRadius: 3, overflow: "hidden" }}>
        <Box
          sx={{
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            p: 3,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <History color="primary" />
            Order History
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Track and manage your recent orders
          </Typography>
        </Box>
        <CardContent>
          {orders.length === 0 ? (
            <Box textAlign="center" py={8}>
              <ShoppingCart
                sx={{ fontSize: 80, color: "text.disabled", mb: 2 }}
              />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No orders found
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Start shopping to see your orders here
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {orders.map((order) => (
                <Grid item xs={12} sm={6} md={4} key={order._id}>
                  <OrderCard>
                    <CardContent>
                      <Box sx={{ position: "relative", mb: 2 }}>
                        <Box
                          component="img"
                          src={order.product?.image || "/default-image.png"}
                          alt={order.product?.name || "Product Image"}
                          sx={{
                            width: "100%",
                            height: 160,
                            objectFit: "cover",
                            borderRadius: 2,
                            mb: 2,
                          }}
                        />
                        <Chip
                          label={`Qty: ${order.quantity || 1}`}
                          size="small"
                          color="primary"
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "rgba(25, 118, 210, 0.9)",
                            color: "white",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        noWrap
                        sx={{ mb: 1 }}
                      >
                        {order.product?.name || "Unknown Product"}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="primary"
                        fontWeight={600}
                        sx={{ mb: 1 }}
                      >
                        ${order.totalPrice || order.product?.price || 0}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        Order ID: {order._id?.slice(-8)}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "Recent"}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<Delete />}
                        onClick={() => handleCancelOrder(order._id)}
                        sx={{ borderRadius: 2 }}
                      >
                        Cancel
                      </Button>
                    </CardActions>
                  </OrderCard>{" "}
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
      {/* Edit Profile Dialog */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            mx: { xs: 2, sm: 3 },
            width: { xs: "calc(100% - 32px)", sm: "auto" },
          },
        }}
      >
        {" "}
        <DialogTitle
          sx={{
            pb: 3,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Edit />
          Edit Profile Information
        </DialogTitle>
        <DialogContent sx={{ pt: 4, position: "relative", zIndex: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {" "}
              <TextField
                label="Full Name"
                value={editProfile.name}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, name: e.target.value })
                }
                fullWidth
                InputProps={{
                  startAdornment: (
                    <Person sx={{ mr: 1, color: "action.active" }} />
                  ),
                }}
                sx={{ mb: 1, mt: 2 }}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                value={editProfile.email}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, email: e.target.value })
                }
                fullWidth
                InputProps={{
                  startAdornment: (
                    <Email sx={{ mr: 1, color: "action.active" }} />
                  ),
                }}
                sx={{ mb: 1 }}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                value={editProfile.phone}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, phone: e.target.value })
                }
                fullWidth
                InputProps={{
                  startAdornment: (
                    <Phone sx={{ mr: 1, color: "action.active" }} />
                  ),
                }}
                sx={{ mb: 1 }}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                value={editProfile.address}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, address: e.target.value })
                }
                fullWidth
                InputProps={{
                  startAdornment: (
                    <LocationOn sx={{ mr: 1, color: "action.active" }} />
                  ),
                }}
                sx={{ mb: 1 }}
                size={isMobile ? "small" : "medium"}
                multiline
                rows={isMobile ? 2 : 3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={() => setOpenEdit(false)}
            size={isMobile ? "small" : "medium"}
            startIcon={<Close />}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
            size={isMobile ? "small" : "medium"}
            startIcon={<Save />}
            sx={{ borderRadius: 2 }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      {/* Change Password Dialog */}
      <Dialog
        open={openPasswordChange}
        onClose={() => setOpenPasswordChange(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            mx: { xs: 2, sm: 3 },
            width: { xs: "calc(100% - 32px)", sm: "auto" },
          },
        }}
      >
        {" "}
        <DialogTitle
          sx={{
            pb: 3,
            background: "linear-gradient(135deg, #ea577f 0%, #d5006d 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Lock />
          Change Password
        </DialogTitle>
        <DialogContent sx={{ pt: 4, position: "relative", zIndex: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                fullWidth
                type={showPasswords.current ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <Lock sx={{ mr: 1, color: "action.active" }} />
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("current")}
                        edge="end"
                        size="small"
                      >
                        {showPasswords.current ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2, mt: 2 }}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="New Password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                fullWidth
                type={showPasswords.new ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <Lock sx={{ mr: 1, color: "action.active" }} />
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("new")}
                        edge="end"
                        size="small"
                      >
                        {showPasswords.new ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm New Password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                fullWidth
                type={showPasswords.confirm ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <Lock sx={{ mr: 1, color: "action.active" }} />
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("confirm")}
                        edge="end"
                        size="small"
                      >
                        {showPasswords.confirm ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>{" "}
            {passwordError && (
              <Grid item xs={12}>
                <Alert severity="error" sx={{ mb: 2 }}>
                  {passwordError}
                </Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={() => setOpenPasswordChange(false)}
            size={isMobile ? "small" : "medium"}
            startIcon={<Close />}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePasswordChange}
            variant="contained"
            size={isMobile ? "small" : "medium"}
            startIcon={<Save />}
            sx={{ borderRadius: 2 }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>{" "}
      {/* Persistent phone button */}
      <PersistentPhoneButton />
      {/* Success Snackbar */}
      <Snackbar
        open={passwordSuccess}
        autoHideDuration={4000}
        onClose={() => setPasswordSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setPasswordSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Password changed successfully!
        </Alert>
      </Snackbar>
    </ProfileContainer>
  );
};

export default UserPage;
