import React, { useState, useRef } from "react";
import ManagementTable from "./ManagementTable";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Grid,
  TextField,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import apiService from "../../app/apiService";
import styled from "styled-components";

// Styled components for enhanced visuals
const StyledMessageCell = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MessageAvatar = styled(Avatar)`
  width: 28px;
  height: 28px;
  background: linear-gradient(45deg, #673ab7 30%, #3f51b5 90%);
  font-size: 0.7rem;
`;

const StatusChip = styled(Chip)`
  border-radius: 6px;
  font-size: 0.65rem;
  height: 20px;
`;

function MessageManagement() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const managementTableRef = useRef();

  // Function to refresh the table data
  const refreshTable = () => {
    if (managementTableRef.current && managementTableRef.current.fetchItems) {
      managementTableRef.current.fetchItems();
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setAdminNotes(message.adminNotes || "");
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedMessage(null);
    setAdminNotes("");
  };

  const handleMarkAsRead = async (messageId) => {
    setLoading(true);
    try {
      await apiService.put(`/messages/${messageId}/read`);
      if (selectedMessage && selectedMessage._id === messageId) {
        setSelectedMessage({ ...selectedMessage, isRead: true });
      }
      setSnackbar({
        open: true,
        message: "Message marked as read successfully",
        severity: "success",
      });
      refreshTable(); // Refresh the table to show updated status
    } catch (error) {
      console.error("Failed to mark message as read:", error);
      setSnackbar({
        open: true,
        message: "Failed to mark message as read",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsReplied = async (messageId) => {
    setLoading(true);
    try {
      await apiService.put(`/messages/${messageId}`, {
        repliedAt: new Date().toISOString(),
        adminNotes,
      });
      if (selectedMessage && selectedMessage._id === messageId) {
        setSelectedMessage({
          ...selectedMessage,
          repliedAt: new Date().toISOString(),
          adminNotes,
          isRead: true,
        });
      }
      setSnackbar({
        open: true,
        message: "Message marked as replied successfully",
        severity: "success",
      });
      refreshTable(); // Refresh the table to show updated status
    } catch (error) {
      console.error("Failed to mark message as replied:", error);
      setSnackbar({
        open: true,
        message: "Failed to mark message as replied",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNotes = async (messageId) => {
    try {
      await apiService.put(`/messages/${messageId}`, {
        adminNotes,
      });
      if (selectedMessage && selectedMessage._id === messageId) {
        setSelectedMessage({ ...selectedMessage, adminNotes });
      }
      setSnackbar({
        open: true,
        message: "Admin notes updated successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to update notes:", error);
      setSnackbar({
        open: true,
        message: "Failed to update admin notes",
        severity: "error",
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };
  const getStatusChip = (message) => {
    if (message.repliedAt) {
      return (
        <StatusChip label="✅ Replied" color="success" variant="outlined" />
      );
    } else if (message.isRead) {
      return <StatusChip label="👁️ Read" color="primary" variant="outlined" />;
    } else {
      return (
        <StatusChip label="📧 Unread" color="warning" variant="outlined" />
      );
    }
  };

  const getUserInitials = (message) => {
    if (message?.name) {
      return message.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    if (message?.email) {
      return message.email.substring(0, 2).toUpperCase();
    }
    return "?";
  };

  return (
    <>
      {" "}
      <ManagementTable
        ref={managementTableRef}
        title="Message Management"
        fetchUrl="/messages"
        addUrl={null} // Messages are not added from admin
        editUrl={null} // Messages are edited through custom dialog
        deleteUrl={(item) => `/messages/${item._id}`}
        tableContainerStyle={{
          minWidth: "1200px", // Increased for better spacing
          "& .MuiTableCell-root": {
            padding: "8px 12px",
          },
          "& .MuiTable-root": {
            tableLayout: "fixed",
            width: "100%",
          },
        }}
        customActions={[
          {
            label: "View",
            onClick: handleViewMessage,
            color: "primary",
          },
        ]}
        columns={[
          {
            label: "Contact",
            width: "280px", // Increased for better spacing
            render: (item) => (
              <StyledMessageCell>
                <MessageAvatar>{getUserInitials(item)}</MessageAvatar>
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
              </StyledMessageCell>
            ),
          },
          {
            label: "Subject",
            width: "320px", // Increased for better spacing
            render: (item) => (
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.8rem",
                  maxWidth: "300px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={item.subject}
              >
                {item.subject || "No subject"}
              </Typography>
            ),
          },
          {
            label: "Phone",
            width: "160px", // Increased for better spacing
            render: (item) => (
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                {item.phoneNumber || "-"}
              </Typography>
            ),
          },
          {
            label: "Status",
            width: "120px", // Increased for better spacing
            render: (item) => getStatusChip(item),
          },
          {
            label: "Received",
            width: "140px", // Increased for better spacing
            render: (item) => (
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                {formatDate(item.createdAt)}
              </Typography>
            ),
          },
        ]}
        formFields={[]}
        getInitialItem={() => ({})}
        dataKey="messages"
      />
      {/* Message View Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Message Details</Typography>
            {selectedMessage && getStatusChip(selectedMessage)}
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedMessage && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Contact Information
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Name
                      </Typography>
                      <Typography variant="body1">
                        {selectedMessage.name}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {selectedMessage.email}
                      </Typography>
                    </Box>
                    {selectedMessage.phoneNumber && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Phone Number
                        </Typography>
                        <Typography variant="body1">
                          {selectedMessage.phoneNumber}
                        </Typography>
                      </Box>
                    )}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Received
                      </Typography>
                      <Typography variant="body1">
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Message Details
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Subject
                      </Typography>
                      <Typography variant="body1">
                        {selectedMessage.subject}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Message
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ whiteSpace: "pre-wrap" }}
                      >
                        {selectedMessage.message}
                      </Typography>
                    </Box>
                    {selectedMessage.repliedAt && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Replied At
                        </Typography>
                        <Typography variant="body1">
                          {new Date(selectedMessage.repliedAt).toLocaleString()}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Admin Notes
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={adminNotes}
                      placeholder="Add internal notes about this message..."
                      variant="outlined"
                      onChange={(e) => setAdminNotes(e.target.value)}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button
            variant="outlined"
            onClick={() => handleUpdateNotes(selectedMessage._id)}
            disabled={loading}
          >
            Save Notes
          </Button>
          <Button
            variant="contained"
            onClick={() => handleMarkAsRead(selectedMessage._id)}
            disabled={selectedMessage?.isRead || loading}
          >
            Mark as Read
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleMarkAsReplied(selectedMessage._id)}
            disabled={selectedMessage?.repliedAt || loading}
          >
            Mark as Replied
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default MessageManagement;
