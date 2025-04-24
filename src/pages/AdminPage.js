import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import AdminDashboardCard from "../components/admin/AdminDashboardCard";
import ProductManagement from "../components/admin/ProductManagement";
import OrderManagement from "../components/admin/OrderManagement";
import CategoryManagement from "../components/admin/CategoryManagement";
import UserManagement from "../components/admin/UserManagement";

const sectionComponents = {
  "Order Management": OrderManagement,
  "Product Management": ProductManagement,
  "Category Management": CategoryManagement,
  "User Management": UserManagement,
};

function AdminPage() {
  const [selectedSection, setSelectedSection] = useState(null);
  const SectionComponent = sectionComponents[selectedSection];

  return (
    <Box
      sx={{ width: "100%", mt: 4, display: "flex", alignItems: "flex-start" }}
    >
      <Box sx={{ maxWidth: 400, ml: 0 }}>
        <Typography variant="h4" align="left" sx={{ mb: 4 }}>
          Admin Dashboard
        </Typography>
        <Stack direction="column" spacing={3} alignItems="flex-start">
          {Object.keys(sectionComponents).map((section) => (
            <AdminDashboardCard
              key={section}
              title={section}
              description={`Manage ${section.toLowerCase()}`}
              onClick={() => setSelectedSection(section)}
            />
          ))}
        </Stack>
      </Box>
      <Box sx={{ flexGrow: 1, ml: 6, minWidth: 350 }}>
        {SectionComponent ? (
          <SectionComponent />
        ) : (
          <Typography color="text.secondary">
            Select a section to see details.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default AdminPage;
