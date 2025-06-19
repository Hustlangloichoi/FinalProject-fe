import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Grid,
  IconButton,
} from "@mui/material";
import {
  Person,
  ShoppingCart,
  Payment,
  LocationOn,
  Phone,
  Note,
  Receipt,
  Close,
} from "@mui/icons-material";
import {
  DetailSection,
  DetailRow,
  DetailIcon,
  DetailLabel,
  DetailValue,
} from "./OrderDialogStyles";
import { PaymentChip } from "./OrderTableStyles";
import OrderStatusChip from "./OrderStatusChip";

const OrderDetailsDialog = ({
  order,
  open,
  onClose,
  onStatusToggle,
  getPaymentMethodColor,
}) => {
  if (!order) return null;

  const getStatusInfo = (status) => {
    const statusOptions = [
      { value: "pending", label: "Pending", color: "warning" },
      { value: "completed", label: "Completed", color: "success" },
    ];
    return (
      statusOptions.find(
        (option) => option.value === status?.toLowerCase()
      ) || { value: "pending", label: "Pending", color: "warning" }
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: "600px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 2,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Receipt color="primary" />
          <Typography variant="h6" fontWeight={600}>
            Order Details
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {/* Customer Information */}
          <Grid item xs={12} md={6}>
            <DetailSection>
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                fontWeight={600}
              >
                Customer Information
              </Typography>
              <DetailRow>
                <DetailIcon>
                  <Person />
                </DetailIcon>
                <DetailLabel>Name:</DetailLabel>
                <DetailValue>
                  {order.sender?.name || "Not provided"}
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailIcon>📧</DetailIcon>
                <DetailLabel>Email:</DetailLabel>
                <DetailValue>
                  {order.sender?.email || "Not provided"}
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailIcon>
                  <Phone />
                </DetailIcon>
                <DetailLabel>Phone:</DetailLabel>
                <DetailValue>{order.phoneNumber || "Not provided"}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailIcon>
                  <LocationOn />
                </DetailIcon>
                <DetailLabel>Address:</DetailLabel>
                <DetailValue sx={{ wordBreak: "break-word" }}>
                  {order.address || "Not provided"}
                </DetailValue>
              </DetailRow>
            </DetailSection>
          </Grid>

          {/* Order Information */}
          <Grid item xs={12} md={6}>
            <DetailSection>
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                fontWeight={600}
              >
                Order Information
              </Typography>
              <DetailRow>
                <DetailIcon>🆔</DetailIcon>
                <DetailLabel>Order ID:</DetailLabel>
                <DetailValue
                  sx={{ fontFamily: "monospace", fontSize: "0.85rem" }}
                >
                  {order._id}
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailIcon>
                  <ShoppingCart />
                </DetailIcon>
                <DetailLabel>Product:</DetailLabel>
                <DetailValue fontWeight={500}>
                  {order.product?.name || "Not specified"}
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailIcon>🔢</DetailIcon>
                <DetailLabel>Quantity:</DetailLabel>
                <DetailValue>
                  <Chip
                    label={order.quantity || "0"}
                    size="small"
                    color="primary"
                  />
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailIcon>📊</DetailIcon>
                <DetailLabel>Status:</DetailLabel>
                <DetailValue
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <OrderStatusChip
                    status={order.status}
                    onClick={() => onStatusToggle(order)}
                    getStatusInfo={getStatusInfo}
                  />
                  <Typography variant="caption" color="text.secondary">
                    (Click to toggle)
                  </Typography>
                </DetailValue>
              </DetailRow>
              {order.product?.price && (
                <DetailRow>
                  <DetailIcon>💰</DetailIcon>
                  <DetailLabel>Unit Price:</DetailLabel>
                  <DetailValue fontWeight={500}>
                    ${order.product.price.toLocaleString("en-US")}
                  </DetailValue>
                </DetailRow>
              )}
            </DetailSection>
          </Grid>

          {/* Payment Information */}
          <Grid item xs={12}>
            <DetailSection>
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                fontWeight={600}
              >
                Payment & Total
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <DetailRow sx={{ alignItems: "flex-start" }}>
                    <DetailIcon>
                      <Payment />
                    </DetailIcon>
                    <DetailLabel>Method:</DetailLabel>
                    <DetailValue>
                      {order.paymentMethod ? (
                        <PaymentChip
                          label={`${
                            getPaymentMethodColor(order.paymentMethod).icon
                          } ${order.paymentMethod}`}
                          color={
                            getPaymentMethodColor(order.paymentMethod).color
                          }
                        />
                      ) : (
                        "Not specified"
                      )}
                    </DetailValue>
                  </DetailRow>
                </Grid>
                <Grid item xs={12} md={4}>
                  <DetailRow sx={{ alignItems: "flex-start" }}>
                    <DetailIcon>💳</DetailIcon>
                    <DetailLabel>Details:</DetailLabel>
                    <DetailValue sx={{ wordBreak: "break-word" }}>
                      {order.paymentDetails || "Not provided"}
                    </DetailValue>
                  </DetailRow>
                </Grid>
                <Grid item xs={12} md={4}>
                  <DetailRow sx={{ alignItems: "flex-start" }}>
                    <DetailIcon>💵</DetailIcon>
                    <DetailLabel>Total:</DetailLabel>
                    <DetailValue>
                      <Typography
                        variant="h6"
                        color="success.main"
                        fontWeight={600}
                      >
                        $
                        {order.totalPrice
                          ? order.totalPrice.toLocaleString("en-US")
                          : "0"}
                      </Typography>
                    </DetailValue>
                  </DetailRow>
                </Grid>
              </Grid>
              {order.product?.price && order.quantity && (
                <Box
                  mt={2}
                  p={2}
                  bgcolor="#f8f9fa"
                  borderRadius={1}
                  border="1px solid #dee2e6"
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Price Calculation:
                  </Typography>
                  <Typography variant="body2" fontFamily="monospace">
                    ${order.product.price.toLocaleString("en-US")} ×{" "}
                    {order.quantity} = $
                    {(order.product.price * order.quantity).toLocaleString(
                      "en-US"
                    )}
                  </Typography>
                </Box>
              )}
            </DetailSection>
          </Grid>

          {/* Additional Notes */}
          {order.note && (
            <Grid item xs={12}>
              <DetailSection>
                <Typography
                  variant="h6"
                  gutterBottom
                  color="primary"
                  fontWeight={600}
                >
                  Customer Notes
                </Typography>
                <DetailRow>
                  <DetailIcon>
                    <Note />
                  </DetailIcon>
                  <DetailValue
                    sx={{
                      fontStyle: "italic",
                      background: "#fff",
                      padding: 2,
                      borderRadius: 1,
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    "{order.note}"
                  </DetailValue>
                </DetailRow>
              </DetailSection>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          borderTop: "1px solid #e0e0e0",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Order created:{" "}
          {new Date(order.createdAt || Date.now()).toLocaleDateString("en-US")}
        </Typography>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          startIcon={<Close />}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;
