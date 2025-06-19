import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import { getStatusChip } from "./MessageTableColumns";

const MessageViewDialog = ({
  open,
  onClose,
  message,
  adminNotes,
  setAdminNotes,
  loading,
  onMarkAsRead,
  onMarkAsReplied,
  onUpdateNotes,
}) => {
  if (!message) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Message Details</Typography>
          {getStatusChip(message)}
        </Box>
      </DialogTitle>

      <DialogContent>
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
                  <Typography variant="body1">{message.name}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{message.email}</Typography>
                </Box>
                {message.phoneNumber && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Phone Number
                    </Typography>
                    <Typography variant="body1">
                      {message.phoneNumber}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Received
                  </Typography>
                  <Typography variant="body1">
                    {new Date(message.createdAt).toLocaleString("en-US")}
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
                  <Typography variant="body1">{message.subject}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Message
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {message.message}
                  </Typography>
                </Box>
                {message.repliedAt && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Replied At
                    </Typography>
                    <Typography variant="body1">
                      {new Date(message.repliedAt).toLocaleString("en-US")}
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
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="outlined"
          onClick={() => onUpdateNotes(message._id)}
          disabled={loading}
        >
          Save Notes
        </Button>
        <Button
          variant="contained"
          onClick={() => onMarkAsRead(message._id)}
          disabled={message?.isRead || loading}
        >
          Mark as Read
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => onMarkAsReplied(message._id)}
          disabled={message?.repliedAt || loading}
        >
          Mark as Replied
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageViewDialog;
