// AdminPage: provides the admin dashboard with navigation and management sections for orders, products, categories, users, and messages.
// Handles section switching and renders the appropriate management component.
import React, { useState } from "react";
import { Box, Typography, Stack, styled, Container, Fade } from "@mui/material";
import OrderManagement from "../components/admin/OrderManagement";
import CategoryManagement from "../components/admin/CategoryManagement";
import UserManagement from "../components/admin/UserManagement";
import ProductManagement from "../components/admin/ProductManagement";
import MessageManagement from "../components/admin/MessageManagement";
import AdminHeader from "../components/admin/AdminHeader";
import AdminOverview from "../components/admin/AdminOverview";
import Paper from "@mui/material/Paper";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import MessageIcon from "@mui/icons-material/Message";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersistentPhoneButton from "../components/PersistentPhoneButton";

const sectionComponents = {
  "Dashboard Overview": () => <AdminOverview />,
  "Order Management": OrderManagement,
  "Product Management": ProductManagement,
  "Category Management": CategoryManagement,
  "User Management": UserManagement,
  "Message Management": MessageManagement,
};

const sectionList = [
  {
    key: "Dashboard Overview",
    icon: <DashboardIcon color="primary" sx={{ fontSize: 32 }} />,
    description: "View analytics and stats",
  },
  {
    key: "Order Management",
    icon: <ShoppingCartIcon color="primary" sx={{ fontSize: 32 }} />,
    description: "Manage orders",
  },
  {
    key: "Product Management",
    icon: <InventoryIcon color="primary" sx={{ fontSize: 32 }} />,
    description: "Manage products",
  },
  {
    key: "Category Management",
    icon: <CategoryIcon color="primary" sx={{ fontSize: 32 }} />,
    description: "Manage categories",
  },
  {
    key: "User Management",
    icon: <PeopleIcon color="primary" sx={{ fontSize: 32 }} />,
    description: "Manage users",
  },
  {
    key: "Message Management",
    icon: <MessageIcon color="primary" sx={{ fontSize: 32 }} />,
    description: "Manage contact messages",
  },
];

const DashboardContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: 32,
  display: "flex",
  alignItems: "flex-start",
  background:
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)"
      : "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1e1e1e 100%)",
  minHeight: "85vh",
  borderRadius: 24,
  boxShadow:
    theme.palette.mode === "light"
      ? "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)"
      : "0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2)",
  padding: 32,
  position: "relative",
  overflow: "hidden",
  gap: 24, // Add gap between sidebar and content

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      theme.palette.mode === "light"
        ? "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.05) 0%, transparent 50%)"
        : "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%)",
    pointerEvents: "none",
  },

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    marginTop: 24,
  },

  [theme.breakpoints.down("sm")]: {
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
  },
}));

const SidebarPaper = styled(Paper)(({ theme }) => ({
  minWidth: 320,
  maxWidth: 360,
  padding: 32,
  minHeight: 600,
  marginRight: 20, // Reduced from 32 to 20
  borderRadius: 20,
  background:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(30, 30, 30, 0.9)",
  backdropFilter: "blur(20px)",
  border:
    theme.palette.mode === "light"
      ? "1px solid rgba(255, 255, 255, 0.2)"
      : "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow:
    theme.palette.mode === "light"
      ? "0 8px 32px rgba(0, 0, 0, 0.1)"
      : "0 8px 32px rgba(0, 0, 0, 0.3)",

  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    marginRight: 0,
    marginBottom: 24,
    minHeight: "auto",
  },

  [theme.breakpoints.down("sm")]: {
    padding: 24,
    borderRadius: 16,
  },
}));

const SectionBox = styled(Box)(({ selected, theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 20,
  cursor: "pointer",
  background: selected
    ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
    : "transparent",
  color: selected ? "#fff" : theme.palette.text.primary,
  borderRadius: 16,
  boxShadow: selected ? `0 8px 25px ${theme.palette.primary.main}40` : "none",
  padding: 20,
  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
  position: "relative",
  overflow: "hidden",

  "&::before": selected
    ? {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
        pointerEvents: "none",
      }
    : {},

  "&:hover": {
    background: selected
      ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
      : theme.palette.mode === "light"
      ? "linear-gradient(135deg, #f1f8ff 0%, #e3f2fd 100%)"
      : "linear-gradient(135deg, #404040 0%, #333 100%)",
    transform: "translateX(8px)",
    boxShadow: selected
      ? `0 12px 35px ${theme.palette.primary.main}50`
      : theme.palette.mode === "light"
      ? "0 4px 20px rgba(0,0,0,0.1)"
      : "0 4px 20px rgba(0,0,0,0.3)",
  },
}));

const SectionList = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: 16,
  },
}));

function AdminPage() {
  /**
   * AdminPage: dashboard for managing orders, products, categories, users, and messages.
   * Renders navigation and management components for each admin section.
   */
  // Admin page: dashboard for managing orders, products, categories, users, and messages
  // State: selected section for navigation
  // UI: renders management components based on selected section
  const [selectedSection, setSelectedSection] = useState("Dashboard Overview");
  const SectionComponent = sectionComponents[selectedSection];

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        py: 4,
        position: "relative",
        "&::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: (theme) =>
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)",
          opacity: 0.03,
          zIndex: -1,
          pointerEvents: "none",
        },
      }}
    >
      {" "}
      <Container maxWidth={false} sx={{ maxWidth: "95vw", px: 2 }}>
        {/* Admin Header */}
        <Fade in={true} timeout={800}>
          <Box>
            <AdminHeader />
          </Box>
        </Fade>

        <Fade in={true} timeout={1200}>
          <DashboardContainer>
            <SidebarPaper elevation={0}>
              <Typography
                variant="h3"
                align="left"
                sx={{
                  mb: 4,
                  fontWeight: 800,
                  background: (theme) =>
                    `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1.8rem", sm: "2.2rem" },
                }}
              >
                Admin Dashboard
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.6 }}
              >
                Choose a section to manage your store
              </Typography>
              <SectionList
                direction="column"
                spacing={2}
                alignItems="flex-start"
              >
                {sectionList.map((section, index) => (
                  <Fade
                    in={true}
                    timeout={1000 + index * 200}
                    key={section.key}
                  >
                    <SectionBox
                      selected={selectedSection === section.key}
                      onClick={() => setSelectedSection(section.key)}
                    >
                      <Box
                        sx={{
                          "& .MuiSvgIcon-root": {
                            transition: "all 0.3s ease",
                            transform:
                              selectedSection === section.key
                                ? "scale(1.1)"
                                : "scale(1)",
                          },
                        }}
                      >
                        {section.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          sx={{ mb: 0.5 }}
                        >
                          {section.key}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            opacity:
                              selectedSection === section.key ? 0.9 : 0.7,
                            color:
                              selectedSection === section.key
                                ? "inherit"
                                : "text.secondary",
                          }}
                        >
                          {section.description}
                        </Typography>
                      </Box>
                    </SectionBox>
                  </Fade>
                ))}
              </SectionList>{" "}
            </SidebarPaper>{" "}
            <Box
              sx={{
                flexGrow: 1,
                minWidth: 0, // Allow shrinking
                width: "100%",
                position: "relative",
                zIndex: 1,
                // Responsive behavior
                "@media (max-width: 768px)": {
                  minWidth: 0,
                  width: "100%",
                },
              }}
            >
              {SectionComponent ? (
                <Fade in={true} timeout={600} key={selectedSection}>
                  <Box>
                    <SectionComponent />
                  </Box>
                </Fade>
              ) : (
                <Box sx={{ mt: 10, textAlign: "center" }}>
                  <Typography color="text.secondary" variant="h6">
                    Select a section to see details.
                  </Typography>
                </Box>
              )}
            </Box>
          </DashboardContainer>
        </Fade>
      </Container>
      {/* Persistent phone button */}
      <PersistentPhoneButton />
    </Box>
  );
}

export default AdminPage;
