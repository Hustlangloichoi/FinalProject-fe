import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const defaultValues = {
  email: "",
  password: "",
};

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    let from = location.state?.from?.pathname || "/";
    try {
      // Call backend login API
      const response = await import("../app/apiService").then(m => m.default.post("/auth/login", data));
      const { token } = response.data.data;
      // Decode JWT to get user info
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.isAdmin ? "admin" : "user";
      // Store token if needed (e.g., in localStorage)
      window.localStorage.setItem("token", token);
      // Call auth.login with email and role
      auth.login(data.email, role, () => {
        navigate(from, { replace: true });
      });
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ minWidth: "350px" }}>
        <Typography variant="h4" textAlign="center">
          Login
        </Typography>
        <FTextField name="email" label="Email" />
        <FTextField name="password" label="Password" type="password" />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Stack>
    </FormProvider>
  );
}

export default LoginPage;
