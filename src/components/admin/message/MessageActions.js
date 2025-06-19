import apiService from "../../../app/apiService";

export const useMessageActions = (setSnackbar, refreshTable) => {
  const handleMarkAsRead = async (
    messageId,
    selectedMessage,
    setSelectedMessage
  ) => {
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
      refreshTable();
    } catch (error) {
      console.error("Failed to mark message as read:", error);
      setSnackbar({
        open: true,
        message: "Failed to mark message as read",
        severity: "error",
      });
    }
  };

  const handleMarkAsReplied = async (
    messageId,
    adminNotes,
    selectedMessage,
    setSelectedMessage
  ) => {
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
      refreshTable();
    } catch (error) {
      console.error("Failed to mark message as replied:", error);
      setSnackbar({
        open: true,
        message: "Failed to mark message as replied",
        severity: "error",
      });
    }
  };

  const handleUpdateNotes = async (
    messageId,
    adminNotes,
    selectedMessage,
    setSelectedMessage
  ) => {
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

  return {
    handleMarkAsRead,
    handleMarkAsReplied,
    handleUpdateNotes,
  };
};
