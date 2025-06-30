// BlankLayout: minimal layout with centered logo, outlet for content, and persistent phone button.
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Logo from "../components/Logo";
import { Stack } from "@mui/material";
import PersistentPhoneButton from "../components/PersistentPhoneButton";

const HeaderStyle = styled("header")(({ theme }) => ({
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  position: "absolute",
}));

function BlankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <HeaderStyle>
        <Logo sx={{ width: 200, height: 200 }} />
      </HeaderStyle>
      <Outlet />

      {/* Persistent phone button */}
      <PersistentPhoneButton />
    </Stack>
  );
}

export default BlankLayout;
