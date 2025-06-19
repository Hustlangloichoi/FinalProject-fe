import React from "react";
import {
  MessageTable,
  MessageViewDialog,
  MessageSnackbar,
  useMessageManagement,
} from "./message";

/**
 * MessageManagement - Simplified and modular message management component
 */
function MessageManagement() {
  const {
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
  } = useMessageManagement();

  return (
    <>
      <MessageTable
        ref={managementTableRef}
        onViewMessage={handleViewMessage}
      />

      <MessageViewDialog
        open={viewDialogOpen}
        onClose={handleCloseDialog}
        message={selectedMessage}
        adminNotes={adminNotes}
        setAdminNotes={setAdminNotes}
        loading={loading}
        onMarkAsRead={onMarkAsRead}
        onMarkAsReplied={onMarkAsReplied}
        onUpdateNotes={onUpdateNotes}
      />

      <MessageSnackbar snackbar={snackbar} onClose={handleSnackbarClose} />
    </>
  );
}

export default MessageManagement;
