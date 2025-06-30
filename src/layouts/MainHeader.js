// MainHeader: displays the app's navigation bar, logo, user menu, and login/signup modals. Handles navigation and authentication actions.
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import LoginModal from "../pages/LoginModal";
import SingupModal from "../pages/SignupModal";

function MainHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignup, setOpenSignup] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    logout(() => navigate("/"));
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigationItems = [
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact" },
  ];

  const renderDesktopNav = () => (
    <>
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          sx={{
            mr: 1,
            px: 1,
            minWidth: 60,
            fontSize: 15,
            lineHeight: 1.2,
          }}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </Button>
      ))}
    </>
  );

  const renderMobileNav = () => (
    <>
      <IconButton color="inherit" onClick={handleMenuOpen} sx={{ ml: 1 }}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {navigationItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => {
              navigate(item.path);
              handleMenuClose();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
        {isAuthenticated && user?.role === "admin" && (
          <MenuItem
            onClick={() => {
              navigate("/admin");
              handleMenuClose();
            }}
          >
            Admin Panel
          </MenuItem>
        )}
        {isAuthenticated && user?.role === "user" && (
          <MenuItem
            onClick={() => {
              navigate("/user");
              handleMenuClose();
            }}
          >
            Profile
          </MenuItem>
        )}
        {isAuthenticated ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                setOpenLogin(true);
                handleMenuClose();
              }}
            >
              Login
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenSignup(true);
                handleMenuClose();
              }}
            >
              Sign Up
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{
            px: { xs: 1, sm: 2 },
            minHeight: { xs: 56, sm: 64 },
            py: { xs: 1, sm: 1.5 },
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            onClick={() => navigate("/")}
            sx={{ mr: { xs: 0.5, sm: 1 }, p: 0.5 }}
          >
            <Logo />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            onClick={() => navigate("/")}
            sx={{
              mr: { xs: 1, sm: 2 },
              fontWeight: 700,
              fontSize: { xs: 18, sm: 22 },
              lineHeight: 1,
              minWidth: { xs: 50, sm: 60 },
              cursor: "pointer",
              display: { xs: "block", sm: "block" },
            }}
          >
            KN
            <br />
            <span
              style={{
                fontWeight: 400,
                fontSize: isMobile ? 14 : 16,
              }}
            >
              store
            </span>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              {renderDesktopNav()}

              {isAuthenticated ? (
                <>
                  {user?.role === "admin" && (
                    <Button
                      color="inherit"
                      sx={{
                        mr: 1,
                        px: { xs: 0.5, sm: 1 },
                        minWidth: { xs: 50, sm: 60 },
                        fontSize: { xs: 13, sm: 15 },
                        lineHeight: 1.2,
                      }}
                      onClick={() => navigate("/admin")}
                    >
                      Admin
                    </Button>
                  )}
                  {user?.role === "user" && (
                    <IconButton
                      color="inherit"
                      sx={{ mr: 1, p: 0.5 }}
                      onClick={() => navigate("/user")}
                    >
                      <AccountCircleIcon />
                    </IconButton>
                  )}
                  <Button
                    color="inherit"
                    sx={{
                      px: { xs: 0.5, sm: 1 },
                      minWidth: { xs: 50, sm: 60 },
                      fontSize: { xs: 13, sm: 15 },
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
                      px: { xs: 0.5, sm: 1 },
                      minWidth: { xs: 50, sm: 60 },
                      fontSize: { xs: 13, sm: 15 },
                      lineHeight: 1.2,
                    }}
                    onClick={() => setOpenLogin(true)}
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    sx={{
                      px: { xs: 0.5, sm: 1 },
                      minWidth: { xs: 50, sm: 60 },
                      fontSize: { xs: 13, sm: 15 },
                      lineHeight: 1.2,
                    }}
                    onClick={() => setOpenSignup(true)}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </>
          )}

          {/* Mobile Navigation */}
          {isMobile && <>{renderMobileNav()}</>}
        </Toolbar>
      </AppBar>
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      <SingupModal open={openSignup} onClose={() => setOpenSignup(false)} />
    </Box>
  );
}

export default MainHeader;
