import React, { useState, useRef } from 'react';
import ManagementTable from './ManagementTable';
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
  Alert
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import apiService from '../../app/apiService';

function MessageManagement() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const managementTableRef = useRef();

  // Function to refresh the table data
  const refreshTable = () => {
    if (managementTableRef.current && managementTableRef.current.fetchItems) {
      managementTableRef.current.fetchItems();
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setAdminNotes(message.adminNotes || '');
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedMessage(null);
    setAdminNotes('');
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
        message: 'Message marked as read successfully',
        severity: 'success'
      });
      refreshTable(); // Refresh the table to show updated status
    } catch (error) {
      console.error('Failed to mark message as read:', error);
      setSnackbar({
        open: true,
        message: 'Failed to mark message as read',
        severity: 'error'
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
        adminNotes
      });
      if (selectedMessage && selectedMessage._id === messageId) {
        setSelectedMessage({ 
          ...selectedMessage, 
          repliedAt: new Date().toISOString(),
          adminNotes,
          isRead: true
        });
      }
      setSnackbar({
        open: true,
        message: 'Message marked as replied successfully',
        severity: 'success'
      });
      refreshTable(); // Refresh the table to show updated status
    } catch (error) {
      console.error('Failed to mark message as replied:', error);
      setSnackbar({
        open: true,
        message: 'Failed to mark message as replied',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNotes = async (messageId) => {
    try {
      await apiService.put(`/messages/${messageId}`, {
        adminNotes
      });
      if (selectedMessage && selectedMessage._id === messageId) {
        setSelectedMessage({ ...selectedMessage, adminNotes });
      }
      setSnackbar({
        open: true,
        message: 'Admin notes updated successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to update notes:', error);
      setSnackbar({
        open: true,
        message: 'Failed to update admin notes',
        severity: 'error'
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const getStatusChip = (message) => {
    if (message.repliedAt) {
      return <Chip label="Replied" color="success" size="small" />;
    } else if (message.isRead) {
      return <Chip label="Read" color="primary" size="small" />;
    } else {
      return <Chip label="Unread" color="warning" size="small" />;
    }
  };

  return (
    <>
      <ManagementTable
        ref={managementTableRef}
        title="Message Management"
        fetchUrl="/messages"
        addUrl={null} // Messages are not added from admin
        editUrl={null} // Messages are edited through custom dialog
        deleteUrl={(item) => `/messages/${item._id}`}
        customActions={[
          {
            label: "View",
            onClick: handleViewMessage,
            color: "primary"
          }
        ]}
        columns={[
          { 
            label: "Name", 
            render: (item) => (
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.email}
                </Typography>
              </Box>
            )
          },
          { 
            label: "Subject", 
            render: (item) => (
              <Typography 
                variant="body2" 
                sx={{ 
                  maxWidth: 200, 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.subject}
              </Typography>
            )
          },
          { 
            label: "Status", 
            render: (item) => getStatusChip(item)
          },
          { 
            label: "Phone", 
            render: (item) => item.phoneNumber || '-'
          },
          { 
            label: "Received", 
            render: (item) => formatDate(item.createdAt)
          }
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
          <Box display="flex" justifyContent="space-between" alignItems="center">
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
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default MessageManagement;
