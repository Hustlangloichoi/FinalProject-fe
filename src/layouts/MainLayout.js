// MainLayout: wraps all pages with header, footer, and persistent phone button for consistent app structure.
import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import PersistentPhoneButton from "../components/PersistentPhoneButton";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />

      {/* Persistent phone button for all pages except contact */}
      <PersistentPhoneButton />
    </Stack>
  );
}

export default MainLayout;
