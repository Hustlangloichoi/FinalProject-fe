import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { Close, Save } from "@mui/icons-material";

const UserProfileForm = ({
  open,
  onClose,
  editProfile,
  setEditProfile,
  onSave,
}) => {
  const handleInputChange = (field) => (event) => {
    setEditProfile({
      ...editProfile,
      [field]: event.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Edit Profile
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <TextField
            autoFocus
            label="Name"
            fullWidth
            variant="outlined"
            value={editProfile.name}
            onChange={handleInputChange("name")}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={editProfile.email}
            onChange={handleInputChange("email")}
          />
          <TextField
            label="Phone"
            fullWidth
            variant="outlined"
            value={editProfile.phone}
            onChange={handleInputChange("phone")}
            placeholder="Enter your phone number"
          />
          <TextField
            label="Address"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={editProfile.address}
            onChange={handleInputChange("address")}
            placeholder="Enter your address"
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onSave} variant="contained" startIcon={<Save />}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfileForm;
