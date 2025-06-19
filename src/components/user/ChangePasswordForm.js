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
  InputAdornment,
  Alert,
} from "@mui/material";
import { Close, Save, Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePasswordForm = ({
  open,
  onClose,
  passwordData,
  setPasswordData,
  showPasswords,
  setShowPasswords,
  passwordError,
  onSave,
}) => {
  const handlePasswordInputChange = (field) => (event) => {
    setPasswordData({
      ...passwordData,
      [field]: event.target.value,
    });
  };

  const togglePasswordVisibility = (field) => () => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
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
        Change Password
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
          {passwordError && <Alert severity="error">{passwordError}</Alert>}

          <TextField
            label="Current Password"
            type={showPasswords.current ? "text" : "password"}
            fullWidth
            variant="outlined"
            value={passwordData.currentPassword}
            onChange={handlePasswordInputChange("currentPassword")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility("current")}
                    edge="end"
                  >
                    {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="New Password"
            type={showPasswords.new ? "text" : "password"}
            fullWidth
            variant="outlined"
            value={passwordData.newPassword}
            onChange={handlePasswordInputChange("newPassword")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility("new")}
                    edge="end"
                  >
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm New Password"
            type={showPasswords.confirm ? "text" : "password"}
            fullWidth
            variant="outlined"
            value={passwordData.confirmPassword}
            onChange={handlePasswordInputChange("confirmPassword")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility("confirm")}
                    edge="end"
                  >
                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onSave} variant="contained" startIcon={<Save />}>
          Change Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordForm;
