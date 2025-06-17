import React, { useState } from "react";
import { Box, Typography, Stack, styled } from "@mui/material";
import OrderManagement from "../components/admin/OrderManagement";
import CategoryManagement from "../components/admin/CategoryManagement";
import UserManagement from "../components/admin/UserManagement";
import ProductManagement from "../components/admin/ProductManagement";
import MessageManagement from "../components/admin/MessageManagement";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import MessageIcon from "@mui/icons-material/Message";

const sectionComponents = {
  "Order Management": OrderManagement,
  "Product Management": ProductManagement,
  "Category Management": CategoryManagement,
  "User Management": UserManagement,
  "Message Management": MessageManagement,
};

const sectionList = [
  {
    key: "Order Management",
    icon: <ShoppingCartIcon color="primary" sx={{ fontSize: 32 }} />,
    description: "Manage orders",
  },
  {
    key: "Product Management",
    icon: <DashboardIcon color="primary" sx={{ fontSize: 32 }} />,
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
  width: '100%',
  marginTop: 32,
  display: 'flex',
  alignItems: 'flex-start',
  background: theme.palette.mode === 'light' 
    ? 'linear-gradient(90deg, #f5f7fa 60%, #e3f2fd 100%)'
    : 'linear-gradient(90deg, #1e1e1e 60%, #2c2c2c 100%)',
  minHeight: '80vh',
  borderRadius: 24,
  boxShadow: theme.palette.mode === 'light'
    ? '2px 2px 8px rgba(0, 0, 0, 0.05)'
    : '2px 2px 8px rgba(0, 0, 0, 0.3)',
  padding: 16,

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  
  [theme.breakpoints.down('sm')]: {
    marginTop: 16,
    borderRadius: 16,
    padding: 12,
  },
}));

const SidebarPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 350,
  padding: 24,
  minHeight: 500,
  marginRight: 32,
  
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    marginRight: 0,
    marginBottom: 16,
    minHeight: 'auto',
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: 16,
  },
}));

const SectionBox = styled(Box)(({ selected, theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  cursor: 'pointer',
  background: selected 
    ? (theme.palette.mode === 'light' ? '#e3f2fd' : '#333')
    : (theme.palette.mode === 'light' ? '#fff' : '#2c2c2c'),
  borderRadius: 16,
  boxShadow: selected ? theme.shadows[3] : 'none',
  padding: 16,
  transition: 'all 0.2s',
  '&:hover': {
    background: theme.palette.mode === 'light' ? '#f1f8ff' : '#404040',
  },
}));

const SectionList = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: 16,
  },
}));

function AdminPage() {
  const [selectedSection, setSelectedSection] = useState(null);
  const SectionComponent = sectionComponents[selectedSection];

  return (
    <DashboardContainer>
      <SidebarPaper elevation={3}>
        <Typography variant="h4" align="left" sx={{ mb: 4, fontWeight: 700 }}>
          Admin Dashboard
        </Typography>
        <SectionList direction="column" spacing={2} alignItems="flex-start">
          {sectionList.map((section) => (
            <SectionBox
              key={section.key}
              selected={selectedSection === section.key}
              onClick={() => setSelectedSection(section.key)}
            >
              {section.icon}
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {section.key}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {section.description}
                </Typography>
              </Box>
            </SectionBox>
          ))}
        </SectionList>
      </SidebarPaper>
      <Divider orientation="vertical" flexItem sx={{ mx: 3, height: "auto" }} />
      <Box sx={{ flexGrow: 1, minWidth: 350 }}>
        {SectionComponent ? (
          <SectionComponent />
        ) : (
          <Box sx={{ mt: 10, textAlign: "center" }}>
            <Typography color="text.secondary" variant="h6">
              Select a section to see details.
            </Typography>
          </Box>
        )}
      </Box>
    </DashboardContainer>
  );
}

export default AdminPage;
