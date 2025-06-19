import React from "react";
import { Typography, Box } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import {
  StyledMessageCell,
  MessageAvatar,
  StatusChip,
} from "./MessageTableStyles";

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

const getStatusChip = (message) => {
  if (message.repliedAt) {
    return <StatusChip label="Replied" color="success" variant="outlined" />;
  } else if (message.isRead) {
    return <StatusChip label="Read" color="primary" variant="outlined" />;
  } else {
    return <StatusChip label="Unread" color="warning" variant="outlined" />;
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

export const createMessageTableColumns = () => [
  {
    label: "Contact",
    width: "280px",
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
    width: "320px",
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
    width: "160px",
    render: (item) => (
      <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
        {item.phoneNumber || "-"}
      </Typography>
    ),
  },
  {
    label: "Status",
    width: "120px",
    render: (item) => getStatusChip(item),
  },
  {
    label: "Received",
    width: "140px",
    render: (item) => (
      <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
        {formatDate(item.createdAt)}
      </Typography>
    ),
  },
];

export { formatDate, getStatusChip, getUserInitials };
