import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import { History, Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import OrderDetailModal from "./OrderDetailModal";

const OrderCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
}));

const UserOrderCard = ({ order, onDelete }) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const getStatusColor = (status) => {
    if (!status) return "default";

    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      case "processing":
        return "info";
      default:
        return "default";
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <OrderCard>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Order #{order._id?.slice(-8) || "N/A"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formatDate(order.createdAt)}
              </Typography>
            </Box>
            <Chip
              label={order.status || "Unknown"}
              color={getStatusColor(order.status)}
              size="small"
              sx={{ textTransform: "capitalize" }}
            />
          </Stack>
          <Divider />{" "}
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Items (1)
            </Typography>
            <Typography variant="body2" sx={{ ml: 1 }}>
              • {order.product?.name || "Unknown Product"} (x
              {order.quantity || 0})
            </Typography>
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold" color="primary.main">
              {formatPrice(order.totalPrice || 0)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {order.paymentMethod || "N/A"}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>{" "}
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          startIcon={<History />}
          size="small"
          variant="outlined"
          onClick={() => setOpenDetailModal(true)}
        >
          View Details
        </Button>
        {order.status === "pending" && (
          <Button
            startIcon={<Delete />}
            size="small"
            color="error"
            onClick={() => onDelete(order._id)}
          >
            Cancel{" "}
          </Button>
        )}
      </CardActions>
      <OrderDetailModal
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        order={order}
      />
    </OrderCard>
  );
};

export default UserOrderCard;
