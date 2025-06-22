import { ManagementTable } from "./management";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import styled from "styled-components";

// Styled components for enhanced visuals
const StyledUserCell = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserAvatar = styled(Avatar)`
  width: 28px;
  height: 28px;
  background: linear-gradient(45deg, #9c27b0 30%, #e91e63 90%);
  font-size: 0.7rem;
`;

const RoleChip = styled(Chip)`
  border-radius: 6px;
  font-size: 0.65rem;
  height: 20px;
`;

function UserManagement() {
  const getUserInitials = (user) => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "?";
  };

  const getRoleInfo = (user) => {
    const isAdmin = user.role === "admin" || user.isAdmin;
    return {
      label: isAdmin ? "Admin" : "User",
      color: isAdmin ? "error" : "primary",
      icon: isAdmin ? "👑" : "👤",
    };
  };

  return (
    <ManagementTable
      title="User Management"
      fetchUrl="/users"
      addUrl="/users"
      editUrl={(item) => `/users/${item._id}`}
      deleteUrl={(item) => `/users/${item._id}`}
      tableContainerStyle={{
        width: "100%", // Changed from fixed minWidth to flexible width
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
          label: "User",
          width: "280px", // Increased for better spacing
          render: (item) => (
            <StyledUserCell>
              <UserAvatar>{getUserInitials(item)}</UserAvatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  noWrap
                  sx={{ fontSize: "0.8rem" }}
                >
                  {item.name || "Unknown"}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  sx={{ fontSize: "0.7rem" }}
                >
                  {item.email || "-"}
                </Typography>
              </Box>
            </StyledUserCell>
          ),
        },
        {
          label: "Phone",
          width: "160px", // Increased for better spacing
          render: (item) => (
            <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
              {item.phone || "-"}
            </Typography>
          ),
        },
        {
          label: "Address",
          width: "280px", // Increased for better spacing
          render: (item) => (
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "260px",
              }}
              title={item.address || "No address provided"}
            >
              {item.address || "-"}
            </Typography>
          ),
        },
        {
          label: "Role",
          width: "120px", // Increased for better spacing
          render: (item) => {
            const roleInfo = getRoleInfo(item);
            return (
              <RoleChip
                label={`${roleInfo.icon} ${roleInfo.label}`}
                color={roleInfo.color}
                variant="outlined"
              />
            );
          },
        },
      ]}
      formFields={[
        { label: "Name", key: "name", required: true },
        { label: "Email", key: "email", required: true },
        { label: "Phone", key: "phone", required: false },
        { label: "Address", key: "address", required: false },
        {
          label: "Password",
          key: "password",
          type: "password",
          required: true,
        },        { label: "Admin", key: "isAdmin", type: "checkbox", required: false },
      ]}      getInitialItem={() => ({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        isAdmin: false,
      })}
      dataKey="users"
    />
  );
}

export default UserManagement;
