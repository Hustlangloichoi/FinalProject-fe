import React, { useState } from "react";
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
import {
  validatePhoneNumber,
  formatPhoneNumber,
  sanitizePhoneNumber,
} from "../../utils/phoneValidation";

const UserProfileForm = ({
  open,
  onClose,
  editProfile,
  setEditProfile,
  onSave,
}) => {
  const [phoneError, setPhoneError] = useState("");

  const handleInputChange = (field) => (event) => {
    let value = event.target.value;

    // Special handling for phone field
    if (field === "phone") {
      // Format phone as user types
      value = formatPhoneNumber(value);

      // Validate phone
      const validation = validatePhoneNumber(value);
      setPhoneError(validation.isValid ? "" : validation.message);
    }

    setEditProfile({
      ...editProfile,
      [field]: value,
    });
  };

  const handleSave = () => {
    // Validate phone before saving
    if (editProfile.phone) {
      const validation = validatePhoneNumber(editProfile.phone);
      if (!validation.isValid) {
        setPhoneError(validation.message);
        return;
      }

      // Sanitize phone number for backend
      const sanitizedProfile = {
        ...editProfile,
        phone: sanitizePhoneNumber(editProfile.phone),
      };

      // Update the profile with sanitized data
      setEditProfile(sanitizedProfile);
    }

    onSave();
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
          />{" "}
          <TextField
            label="Phone"
            fullWidth
            variant="outlined"
            value={editProfile.phone}
            onChange={handleInputChange("phone")}
            placeholder="Enter your phone number (e.g., 0901234567)"
            error={!!phoneError}
            helperText={phoneError || "Format: 0901234567 or +84901234567"}
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
        {" "}
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={<Save />}
          disabled={!!phoneError}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfileForm;
