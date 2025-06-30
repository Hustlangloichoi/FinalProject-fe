import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import apiService from "../app/apiService";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const defaultValues = {
  email: "",
  password: "",
};

function LoginModal({ open, onClose }) {
  // Login modal: handles user login with form validation and API call
  // State: form fields, validation, authentication
  // Handlers: submit login, close modal

  const auth = useAuth();
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await apiService.post("/auth/login", data);
      const { token } = response.data.data;
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.isAdmin ? "admin" : "user";
      window.localStorage.setItem("token", token);
      auth.login(data.email, role, onClose); // Close modal only, do not navigate
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{
        ".MuiDialog-paper": {
          width: { xs: "90%", sm: "400px" },
          padding: { xs: 2, sm: 4 },
        },
      }}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ minWidth: "300px", mt: 1 }}>
            <FTextField name="email" label="Email" />
            <FTextField name="password" label="Password" type="password" />
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Stack>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
