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
  Chip,
  Divider,
  Stack,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import {
  Close,
  Person,
  Phone,
  LocationOn,
  Payment,
  ShoppingCart,
  Receipt,
  CalendarToday,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 16,
    minWidth: "600px",
    maxWidth: "800px",
  },
}));

const InfoSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const InfoRow = styled(Stack)(({ theme }) => ({
  direction: "row",
  alignItems: "center",
  spacing: 2,
  marginBottom: theme.spacing(1),
}));

const ProductImage = styled("img")(({ theme }) => ({
  width: 80,
  height: 80,
  objectFit: "cover",
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
}));

const OrderDetailModal = ({ open, onClose, order }) => {
  if (!order) return null;

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
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
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
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          m: 0,
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Order Details #{order._id?.slice(-8) || "N/A"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {" "}
          {/* Order Status & Date */}
          <Grid item xs={12}>
            <InfoSection>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                mt={2}
                sx={{ pt: 1 }}
              >
                <Chip
                  label={order.status || "Unknown"}
                  color={getStatusColor(order.status)}
                  size="medium"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                  }}
                />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CalendarToday
                    sx={{ fontSize: 18, color: "text.secondary" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(order.createdAt)}
                  </Typography>
                </Stack>
              </Stack>
            </InfoSection>
          </Grid>
          {/* Product Information */}
          <Grid item xs={12}>
            <InfoSection>
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ShoppingCart sx={{ mr: 1, color: "primary.main" }} />
                Product Details
              </Typography>
              <Card variant="outlined">
                {" "}
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ position: "relative" }}>
                      {order.product?.image ? (
                        <ProductImage
                          src={order.product.image}
                          alt={order.product?.name || "Product"}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "grey.100",
                          }}
                        >
                          <ShoppingCart
                            sx={{ color: "grey.400", fontSize: 32 }}
                          />
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight="medium" gutterBottom>
                        {order.product?.name || "Unknown Product"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Unit Price: {formatPrice(order.product?.price || 0)}
                      </Typography>
                      <Typography variant="body1">
                        Quantity: <strong>{order.quantity || 0}</strong>
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary.main"
                      >
                        {formatPrice(order.totalPrice || 0)}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </InfoSection>
          </Grid>
          {/* Customer Information */}
          <Grid item xs={12} md={6}>
            <InfoSection>
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Person sx={{ mr: 1, color: "primary.main" }} />
                Customer Information
              </Typography>
              <Stack spacing={2}>
                <InfoRow direction="row" alignItems="center" spacing={2}>
                  <Person sx={{ color: "text.secondary" }} />
                  <Typography variant="body1">
                    {order.sender?.name || "N/A"}
                  </Typography>
                </InfoRow>
                <InfoRow direction="row" alignItems="center" spacing={2}>
                  <Phone sx={{ color: "text.secondary" }} />
                  <Typography variant="body1">
                    {order.phoneNumber || "N/A"}
                  </Typography>
                </InfoRow>
                <InfoRow direction="row" alignItems="flex-start" spacing={2}>
                  <LocationOn sx={{ color: "text.secondary", mt: 0.5 }} />
                  <Typography variant="body1">
                    {order.address || "N/A"}
                  </Typography>
                </InfoRow>
              </Stack>
            </InfoSection>
          </Grid>
          {/* Payment Information */}
          <Grid item xs={12} md={6}>
            <InfoSection>
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Payment sx={{ mr: 1, color: "primary.main" }} />
                Payment Information
              </Typography>
              <Stack spacing={2}>
                <InfoRow direction="row" alignItems="center" spacing={2}>
                  <Receipt sx={{ color: "text.secondary" }} />
                  <Typography variant="body1">
                    {order.paymentMethod || "N/A"}
                  </Typography>
                </InfoRow>
                {order.paymentDetails && (
                  <InfoRow direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body2" color="text.secondary">
                      Details: {order.paymentDetails}
                    </Typography>
                  </InfoRow>
                )}
                <Divider />
                <InfoRow
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" fontWeight="bold">
                    Total Amount:
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary.main"
                  >
                    {formatPrice(order.totalPrice || 0)}
                  </Typography>
                </InfoRow>
              </Stack>
            </InfoSection>
          </Grid>
          {/* Order Notes */}
          {order.note && (
            <Grid item xs={12}>
              <InfoSection>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Order Notes
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="body1">{order.note}</Typography>
                  </CardContent>
                </Card>
              </InfoSection>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{ p: 3, borderTop: "1px solid", borderColor: "divider" }}
      >
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default OrderDetailModal;
