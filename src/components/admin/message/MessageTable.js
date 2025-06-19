import React from "react";
import { ManagementTable } from "../management";
import { createMessageTableColumns } from "./MessageTableColumns";

/**
 * Message table configuration component
 */
const MessageTable = React.forwardRef(({ onViewMessage }, ref) => {
  const tableColumns = createMessageTableColumns();
  const tableContainerStyle = {
    width: "100%", // Changed from fixed minWidth to flexible width
    "& .MuiTableCell-root": {
      padding: "8px 12px",
    },
    "& .MuiTable-root": {
      tableLayout: "fixed",
      width: "100%",
    },
  };

  const customActions = [
    {
      label: "View",
      onClick: onViewMessage,
      color: "primary",
    },
  ];

  return (
    <ManagementTable
      ref={ref}
      title="Message Management"
      fetchUrl="/messages"
      addUrl={null}
      editUrl={null}
      deleteUrl={(item) => `/messages/${item._id}`}
      tableContainerStyle={tableContainerStyle}
      customActions={customActions}
      columns={tableColumns}
      formFields={[]}
      getInitialItem={() => ({})}
      dataKey="messages"
    />
  );
});

MessageTable.displayName = "MessageTable";

export default MessageTable;
