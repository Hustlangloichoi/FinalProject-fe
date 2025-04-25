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

function MainHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleLogout = () => {
    logout(() => navigate("/"));
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ mr: 2 }}
          >
            CoderStore
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="inherit"
            sx={{ mr: 1 }}
            onClick={() => navigate("/about")}
          >
            About Us
          </Button>
          <Button
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </Button>
          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <Button
                  color="inherit"
                  sx={{ mr: 2 }}
                  onClick={() => navigate("/admin")}
                >
                  Admin Panel
                </Button>
              )}
              {user?.role === "user" && (
                <IconButton
                  color="inherit"
                  sx={{ mr: 2 }}
                  onClick={() => navigate("/user")}
                >
                  <AccountCircleIcon />
                </IconButton>
              )}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => setOpenLogin(true)}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
    </Box>
  );
}

export default MainHeader;
