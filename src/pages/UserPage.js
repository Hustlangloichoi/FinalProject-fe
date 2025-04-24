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
} from "@mui/material";
import apiService from "../app/apiService";
import useAuth from "../hooks/useAuth";

const UserPage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.username || "",
    email: "",
    role: user?.role || "user",
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
    setEditProfile({ name: profile.name, email: profile.email, password: "" });
    setOpenEdit(true);
  };

  const handleEditSave = async () => {
    try {
      await apiService.put("/me", {
        name: editProfile.name,
        email: editProfile.email,
      });
      setProfile((prev) => ({
        ...prev,
        name: editProfile.name,
        email: editProfile.email,
      }));
      setOpenEdit(false);
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        User Dashboard
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Profile</Typography>
        <Typography>Name: {profile.name}</Typography>
        <Typography>Email: {profile.email}</Typography>
        <Typography>Role: {profile.role}</Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={handleEditOpen}>
          Edit Profile
        </Button>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Order History
        </Typography>
        {orders.length === 0 ? (
          <Typography color="text.secondary">No orders found.</Typography>
        ) : (
          orders.map((order) => (
            <Box
              key={order._id}
              sx={{ mb: 2, borderBottom: "1px solid #eee", pb: 1 }}
            >
              <Typography>Order ID: {order._id}</Typography>
              <Typography>Product: {order.product?.name || "-"}</Typography>
              <Typography>Content: {order.content}</Typography>
              <Typography>
                Date: {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </Box>
          ))
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
