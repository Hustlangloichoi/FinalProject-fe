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

// SignupModal: Modal dialog for user registration with form validation and API call

/**
 * SignupModal component displays a modal dialog for user registration.
 * It uses react-hook-form and Yup for form state and validation.
 * On successful signup, it closes the modal and resets the form.
 */
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const defaultValues = {
  name: "",
  email: "",
  password: "",
};

function SignupModal({ open, onClose }) {
  const methods = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  /**
   * Handles form submission for user signup.
   * Calls the register API and manages dialog state.
   */
  const onSubmit = async (data) => {
    try {
      await import("../app/apiService").then((m) =>
        m.default.post("/auth/register", data)
      );
      alert("Signup successful! You can now log in.");
      reset();
      onClose();
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.message || err.message));
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
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ minWidth: "300px", mt: 1 }}>
            <FTextField name="name" label="Name" />
            <FTextField name="email" label="Email" />
            <FTextField name="password" label="Password" type="password" />
            <Button type="submit" variant="contained">
              Sign Up
            </Button>
          </Stack>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default SignupModal;
