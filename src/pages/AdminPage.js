import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import OrderManagement from "../components/admin/OrderManagement";
import CategoryManagement from "../components/admin/CategoryManagement";
import UserManagement from "../components/admin/UserManagement";
import ProductManagement from "../components/admin/ProductManagement";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import styled from "styled-components";

const sectionComponents = {
  "Order Management": OrderManagement,
  "Product Management": ProductManagement,
  "Category Management": CategoryManagement,
  "User Management": UserManagement,
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
];

const DashboardContainer = styled(Box)`
  width: 100%;
  margin-top: 32px;
  display: flex;
  align-items: flex-start;
  background: linear-gradient(90deg, #f5f7fa 60%, #e3f2fd 100%);
  min-height: 80vh;
  border-radius: 24px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }
`;

const SidebarPaper = styled(Paper)`
  max-width: 350px;
  padding: 24px;
  min-height: 500px;
  margin-right: 32px;
`;

const SectionBox = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  background: ${({ selected }) => (selected ? "#e3f2fd" : "#fff")};
  border-radius: 16px;
  box-shadow: ${({ selected }) => (selected ? 3 : 0)};
  padding: 16px;
  transition: all 0.2s;
  &:hover {
    background: #f1f8ff;
  }
`;

const SectionList = styled(Stack)`
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
  }
`;

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
