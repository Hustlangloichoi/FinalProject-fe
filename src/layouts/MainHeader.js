import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import LoginModal from "../pages/LoginModal";
import SingupModal from "../pages/SignupModal";

function MainHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignup, setOpenSignup] = React.useState(false);

  const handleLogout = () => {
    logout(() => navigate("/"));
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ px: { xs: 1, sm: 2 }, minHeight: 60, py: 1.5 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1, p: 0.5, ml: { xs: 1, sm: 2 } }}
          >
            <Logo />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{
              mr: 2,
              fontWeight: 700,
              fontSize: 22,
              lineHeight: 1,
              minWidth: 60,
            }}
          >
            KN
            <br />
            <span style={{ fontWeight: 400, fontSize: 16 }}>store</span>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="inherit"
            sx={{
              mr: 1,
              px: 1,
              minWidth: 60,
              fontSize: 15,
              lineHeight: 1.2,
            }}
            onClick={() => navigate("/about")}
          >
            About Us
          </Button>
          <Button
            color="inherit"
            sx={{
              mr: 1,
              px: 1,
              minWidth: 60,
              fontSize: 15,
              lineHeight: 1.2,
            }}
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </Button>
          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <Button
                  color="inherit"
                  sx={{
                    mr: 1,
                    px: 1,
                    minWidth: 60,
                    fontSize: 15,
                    lineHeight: 1.2,
                  }}
                  onClick={() => navigate("/admin")}
                >
                  Admin Panel
                </Button>
              )}
              {user?.role === "user" && (
                <IconButton
                  color="inherit"
                  sx={{ mr: 1, p: 0.5 }}
                  onClick={() => navigate("/user")}
                >
                  {" "}
                  <AccountCircleIcon />{" "}
                </IconButton>
              )}
              <Button
                color="inherit"
                sx={{
                  px: 1,
                  minWidth: 60,
                  fontSize: 15,
                  lineHeight: 1.2,
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                sx={{
                  mr: 1,
                  px: 1,
                  minWidth: 60,
                  fontSize: 15,
                  lineHeight: 1.2,
                }}
                onClick={() => setOpenLogin(true)}
              >
                Login
              </Button>
              <Button
                color="inherit"
                sx={{
                  px: 1,
                  minWidth: 60,
                  fontSize: 15,
                  lineHeight: 1.2,
                }}
                onClick={() => setOpenSignup(true)}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      <SingupModal open={openSignup} onClose={() => setOpenSignup(false)} />
    </Box>
  );
}

export default MainHeader;
