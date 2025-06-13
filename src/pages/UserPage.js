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
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import apiService from "../app/apiService";
import useAuth from "../hooks/useAuth";

const UserPage = () => {
  const { user } = useAuth();
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
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Order History
        </Typography>
        {orders.length === 0 ? (
          <Typography>No orders found.</Typography>
        ) : (
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
                        style={{ width: 50, height: 50, objectFit: "cover" }}
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
        )}
      </Paper>
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editProfile.name}
            onChange={(e) =>
              setEditProfile({ ...editProfile, name: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            value={editProfile.email}
            onChange={(e) =>
              setEditProfile({ ...editProfile, email: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone"
            value={editProfile.phone}
            onChange={(e) =>
              setEditProfile({ ...editProfile, phone: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Address"
            value={editProfile.address}
            onChange={(e) =>
              setEditProfile({ ...editProfile, address: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserPage;
