import { useState, useEffect } from "react";
import { Container, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import apiService from "../app/apiService";
import useAuth from "../hooks/useAuth";
import PersistentPhoneButton from "../components/PersistentPhoneButton";
import {
  UserProfile,
  UserProfileForm,
  ChangePasswordForm,
  UserStats,
  UserOrderHistory,
} from "../components/user";

const ProfileContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  minHeight: "100vh",
  background: `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.light}10 100%)`,
}));

const UserPage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.username || "",
    email: "",
    role: user?.role || "user",
    phone: "",
    address: "",
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
    // Fetch user info and orders
    const fetchProfile = async () => {
      try {
        const res = await apiService.get("/me");
        setProfile({
          name: res.data.data.name,
          email: res.data.data.email,
          role: res.data.data.isAdmin ? "admin" : "user",
          phone: res.data.data.phone || "",
          address: res.data.data.address || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    const fetchOrders = async () => {
      try {
        const res = await apiService.get("/me/orders");
        console.log("Orders data from backend:", res.data);
        setOrders(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
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
        phone: editProfile.phone,
        address: editProfile.address,
      });
      setProfile(updatedProfile.data.data);
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
      setPasswordError("");
    } catch (err) {
      setPasswordError(
        err.response?.data?.message || "Failed to change password"
      );
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await apiService.delete(`/me/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (err) {
      alert("Failed to cancel order");
    }
  };

  return (
    <>
      <ProfileContainer maxWidth="lg">
        <UserProfile
          profile={profile}
          onEditOpen={handleEditOpen}
          onPasswordChangeOpen={handlePasswordChangeOpen}
        />

        <UserStats orders={orders} />

        <UserOrderHistory orders={orders} onDeleteOrder={handleDeleteOrder} />

        <UserProfileForm
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          editProfile={editProfile}
          setEditProfile={setEditProfile}
          onSave={handleEditSave}
        />

        <ChangePasswordForm
          open={openPasswordChange}
          onClose={() => setOpenPasswordChange(false)}
          passwordData={passwordData}
          setPasswordData={setPasswordData}
          showPasswords={showPasswords}
          setShowPasswords={setShowPasswords}
          passwordError={passwordError}
          onSave={handlePasswordChange}
        />

        <Snackbar
          open={passwordSuccess}
          autoHideDuration={6000}
          onClose={() => setPasswordSuccess(false)}
        >
          <Alert
            onClose={() => setPasswordSuccess(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Password changed successfully!
          </Alert>
        </Snackbar>
      </ProfileContainer>
      <PersistentPhoneButton />
    </>
  );
};

export default UserPage;
