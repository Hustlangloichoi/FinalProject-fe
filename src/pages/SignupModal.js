import React, { useState } from "react";
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
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const methods = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    try {
      await import("../app/apiService").then((m) =>
        m.default.post("/auth/register", data)
      );
      setSuccessDialogOpen(true); // Open success dialog
      setSuccessMessage("Signup successful! You can now log in.");
      reset();
      onClose();
    } catch (err) {
      setErrorDialogOpen(true); // Open error dialog
      setErrorMessage("Signup failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
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

      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <div>{successMessage}</div>
          <Button
            onClick={() => setSuccessDialogOpen(false)}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <div>{errorMessage}</div>
          <Button
            onClick={() => setErrorDialogOpen(false)}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SignupModal;
