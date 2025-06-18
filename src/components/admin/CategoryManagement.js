import ManagementTable from "./ManagementTable";
import { Box, Typography, Avatar } from "@mui/material";
import styled from "styled-components";

// Styled components for enhanced visuals
const StyledCategoryCell = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CategoryAvatar = styled(Avatar)`
  width: 28px;
  height: 28px;
  background: linear-gradient(45deg, #4caf50 30%, #8bc34a 90%);
  font-size: 0.7rem;
`;

function CategoryManagement() {
  const getCategoryInitials = (category) => {
    if (category?.name) {
      return category.name.substring(0, 2).toUpperCase();
    }
    return "CT";
  };

  return (
    <ManagementTable
      title="Category Management"
      fetchUrl="/categories"
      addUrl="/categories"
      editUrl={(item) => `/categories/${item._id}`}
      deleteUrl={(item) => `/categories/${item._id}`}
      tableContainerStyle={{
        minWidth: "1000px", // Increased for better spacing
        "& .MuiTableCell-root": {
          padding: "8px 12px",
        },
        "& .MuiTable-root": {
          tableLayout: "fixed",
          width: "100%",
        },
      }}
      columns={[
        {
          label: "Category",
          width: "350px", // Increased for better spacing
          render: (item) => (
            <StyledCategoryCell>
              <CategoryAvatar>{getCategoryInitials(item)}</CategoryAvatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{ fontSize: "0.8rem" }}
                >
                  {item.name || "Unknown Category"}
                </Typography>
              </Box>
            </StyledCategoryCell>
          ),
        },
        {
          label: "Description",
          width: "500px", // Increased for better spacing
          render: (item) => (
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "480px",
              }}
              title={item.description || "No description provided"}
            >
              {item.description || "No description"}
            </Typography>
          ),
        },
      ]}
      formFields={[
        { label: "Name", key: "name", required: true },
        { label: "Description", key: "description", required: false },
      ]}
      getInitialItem={() => ({ name: "", description: "" })}
      dataKey="category"
    />
  );
}

export default CategoryManagement;
