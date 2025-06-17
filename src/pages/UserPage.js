import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import apiService from "../app/apiService";
import useAuth from "../hooks/useAuth";

const UserPage = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [profile, setProfile] = useState({
    name: user?.username || "",
    email: "",
    role: user?.role || "user",
    phone: "", // Added phone field
    address: "", // Added address field
  });
  const [openEdit, setOpenEdit] = useState(false);
  const [editProfile, setEditProfile] = useState({
    name: "",
    email: "",
    password: "",
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
      password: "",
      phone: profile.phone || "", // Added phone field
      address: profile.address || "", // Added address field
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

  const handleCancelOrder = async (orderId) => {
    try {
      await apiService.delete(`/orders/${orderId}`); // Corrected endpoint
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (err) {
      alert("Failed to cancel order");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 800 },
        mx: "auto",
        mt: 4,
        px: { xs: 2, sm: 0 },
      }}
    >
      <Typography
        variant="h3" // Changed to heading
        align="center"
        sx={{ mb: 3 }}
      >
        User Profile
      </Typography>
      <Paper sx={{ p: { xs: 2, sm: 4 }, mb: 3 }}>
        <Typography variant="h6">Profile Information</Typography>
        <Typography>Name: {profile.name}</Typography>
        <Typography>Email: {profile.email}</Typography>
        <Typography>Role: {profile.role}</Typography>
        <Typography>Phone: {profile.phone}</Typography> {/* Display phone */}
        <Typography>Address: {profile.address}</Typography>{" "}
        {/* Display address */}
        <Button variant="outlined" sx={{ mt: 2 }} onClick={handleEditOpen}>
          Edit Profile
        </Button>
      </Paper>
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Order History
        </Typography>
        {orders.length === 0 ? (
          <Typography>No orders found.</Typography>
        ) : (
          <>
            {/* Desktop Table */}
            {!isMobile ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>
                          <img
                            src={order.product?.image || "/default-image.png"}
                            alt={order.product?.name || "Product Image"}
                            style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
                          />
                        </TableCell>
                        <TableCell>
                          {order.product?.name || "Unknown Product"}
                        </TableCell>
                        <TableCell>
                          {order.product?.price ? `$${order.product.price}` : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleCancelOrder(order._id)}
                          >
                            Delete Order
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              /* Mobile Card Layout */
              <Grid container spacing={2}>
                {orders.map((order) => (
                  <Grid item xs={12} key={order._id}>
                    <Card 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        p: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                          boxShadow: 2,
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          mr: 2,
                          borderRadius: 1,
                          overflow: 'hidden',
                          flexShrink: 0
                        }}
                      >
                        <img
                          src={order.product?.image || "/default-image.png"}
                          alt={order.product?.name || "Product Image"}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                          }}
                        />
                      </Box>
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontSize: '1rem',
                            fontWeight: 600,
                            mb: 0.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {order.product?.name || "Unknown Product"}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          color="primary" 
                          sx={{ 
                            fontWeight: 600,
                            fontSize: '1.1rem'
                          }}
                        >
                          {order.product?.price ? `$${order.product.price}` : "N/A"}
                        </Typography>
                      </Box>
                      <Box sx={{ ml: 1 }}>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleCancelOrder(order._id)}
                          sx={{
                            minWidth: 80,
                            fontSize: '0.75rem',
                            py: 1
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Paper>
      <Dialog 
        open={openEdit} 
        onClose={() => setOpenEdit(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            mx: { xs: 2, sm: 3 },
            width: { xs: 'calc(100% - 32px)', sm: 'auto' }
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Edit Profile</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField
            label="Name"
            value={editProfile.name}
            onChange={(e) =>
              setEditProfile({ ...editProfile, name: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
            size={isMobile ? "small" : "medium"}
          />
          <TextField
            label="Email"
            value={editProfile.email}
            onChange={(e) =>
              setEditProfile({ ...editProfile, email: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
            size={isMobile ? "small" : "medium"}
          />
          <TextField
            label="Phone"
            value={editProfile.phone}
            onChange={(e) =>
              setEditProfile({ ...editProfile, phone: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
            size={isMobile ? "small" : "medium"}
          />
          <TextField
            label="Address"
            value={editProfile.address}
            onChange={(e) =>
              setEditProfile({ ...editProfile, address: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
            size={isMobile ? "small" : "medium"}
            multiline
            rows={isMobile ? 2 : 3}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => setOpenEdit(false)}
            size={isMobile ? "small" : "medium"}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleEditSave} 
            variant="contained"
            size={isMobile ? "small" : "medium"}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserPage;
