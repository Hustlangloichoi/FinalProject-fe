import { useState, useRef } from "react";
import { useMessageActions } from "./MessageActions";

/**
 * Custom hook for managing message state and actions
 */
export const useMessageManagement = () => {
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

  const { handleMarkAsRead, handleMarkAsReplied, handleUpdateNotes } =
    useMessageActions(setSnackbar, refreshTable);

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

  const onMarkAsRead = async (messageId) => {
    setLoading(true);
    try {
      await handleMarkAsRead(messageId, selectedMessage, setSelectedMessage);
    } finally {
      setLoading(false);
    }
  };

  const onMarkAsReplied = async (messageId) => {
    setLoading(true);
    try {
      await handleMarkAsReplied(
        messageId,
        adminNotes,
        selectedMessage,
        setSelectedMessage
      );
    } finally {
      setLoading(false);
    }
  };

  const onUpdateNotes = async (messageId) => {
    await handleUpdateNotes(
      messageId,
      adminNotes,
      selectedMessage,
      setSelectedMessage
    );
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return {
    selectedMessage,
    viewDialogOpen,
    adminNotes,
    loading,
    snackbar,
    managementTableRef,
    setAdminNotes,
    handleViewMessage,
    handleCloseDialog,
    onMarkAsRead,
    onMarkAsReplied,
    onUpdateNotes,
    handleSnackbarClose,
  };
};
