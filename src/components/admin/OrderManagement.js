import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Avatar,
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
import ManagementTable from "./ManagementTable";
import styled from "styled-components";

// Styled components for enhanced visuals
const StyledOrderCell = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
  background: linear-gradient(45deg, #2196f3 30%, #21cbf3 90%);
  font-size: 0.75rem;
`;

const ProductCard = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProductName = styled(Typography)`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.2;
`;

const ProductPrice = styled(Typography)`
  font-size: 0.75rem;
  color: #666;
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
`;

const PriceDisplay = styled(Typography)`
  font-weight: 600;
  color: #2e7d32;
  font-size: 0.9rem;
`;

const PaymentChip = styled(Chip)`
  border-radius: 6px;
  font-size: 0.75rem;
  height: 24px;
`;

const DetailSection = styled(Box)`
  margin-bottom: 20px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
`;

const DetailRow = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailIcon = styled(Box)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1976d2;
`;

const DetailLabel = styled(Typography)`
  font-weight: 500;
  min-width: 120px;
  color: #555;
`;

const DetailValue = styled(Typography)`
  color: #333;
  flex: 1;
`;

function OrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getPaymentMethodColor = (method) => {
    switch (method?.toLowerCase()) {
      case "credit card":
        return { color: "primary", icon: "💳" };
      case "paypal":
        return { color: "info", icon: "🅿️" };
      case "bank transfer":
        return { color: "secondary", icon: "🏦" };
      case "cash on delivery":
        return { color: "warning", icon: "💵" };
      default:
        return { color: "default", icon: "💰" };
    }
  };

  const getUserInitials = (user) => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "?";
  };

  return (
    <>
      {" "}
      <ManagementTable
        title="Order Management"
        fetchUrl="/orders"
        addUrl={null} // Orders are not added from admin
        editUrl={null} // Orders are not edited from admin
        deleteUrl={(item) => `/orders/${item._id}/admin`}
        customActions={[
          {
            label: "View Details",
            onClick: setSelectedOrder,
            color: "primary",
          },
        ]}
        tableContainerStyle={{
          minWidth: "1200px", // Reduced from 1400px to 1200px
          "& .MuiTableCell-root": {
            padding: "8px 12px", // Reduced padding for more space
          },
          "& .MuiTable-root": {
            tableLayout: "fixed", // Fixed layout for consistent column widths
            width: "100%",
          },
        }}
        columns={[
          {
            label: "Customer",
            width: "200px", // Reduced from 250px to 200px
            render: (item) => (
              <StyledOrderCell>
                <UserAvatar sx={{ width: 28, height: 28, fontSize: "0.7rem" }}>
                  {" "}
                  {/* Smaller avatar */}
                  {getUserInitials(item.sender)}
                </UserAvatar>
                <Box sx={{ minWidth: 0 }}>
                  {" "}
                  {/* Allow content to shrink */}
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    noWrap
                    sx={{ fontSize: "0.8rem" }}
                  >
                    {item.sender?.name || "Unknown"}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                    sx={{ fontSize: "0.7rem" }}
                  >
                    {item.sender?.email || "-"}
                  </Typography>
                </Box>
              </StyledOrderCell>
            ),
          },
          {
            label: "Product Details",
            width: "160px", // Reduced from 200px to 160px
            render: (item) => {
              if (item.product) {
                return (
                  <ProductCard>
                    <ProductName
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "140px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {item.product.name}
                    </ProductName>
                    {item.product.price && (
                      <ProductPrice sx={{ fontSize: "0.7rem" }}>
                        ${item.product.price}
                      </ProductPrice>
                    )}
                  </ProductCard>
                );
              }
              return (
                <Typography
                  color="text.secondary"
                  fontStyle="italic"
                  sx={{ fontSize: "0.8rem" }}
                >
                  No product
                </Typography>
              );
            },
          },
          {
            label: "Qty",
            width: "80px", // Set specific width
            render: (item) => (
              <Chip
                label={item.quantity || "0"}
                size="small"
                variant="outlined"
                color="primary"
              />
            ),
          },
          {
            label: "Total Amount",
            width: "120px", // Reduced from 140px to 120px
            render: (item) => {
              if (item.totalPrice) {
                return (
                  <PriceDisplay sx={{ fontSize: "0.85rem" }}>
                    ${item.totalPrice.toLocaleString()}
                  </PriceDisplay>
                );
              }
              return (
                <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                  -
                </Typography>
              );
            },
          },
          {
            label: "Phone",
            width: "120px", // Reduced from 140px to 120px
            render: (item) => (
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                {item.phoneNumber || "-"}
              </Typography>
            ),
          },
          {
            label: "Address",
            width: "160px", // Reduced from 200px to 160px
            render: (item) => (
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.8rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "140px",
                }}
                title={item.address || "No address provided"} // Show full address on hover
              >
                {item.address || "-"}
              </Typography>
            ),
          },
          {
            label: "Payment",
            width: "140px", // Reduced from 160px to 140px
            render: (item) => {
              const paymentInfo = getPaymentMethodColor(item.paymentMethod);
              return (
                <PaymentChip
                  label={`${paymentInfo.icon} ${item.paymentMethod || "N/A"}`}
                  color={paymentInfo.color}
                  variant="outlined"
                  sx={{ fontSize: "0.65rem", height: "20px" }} // Even smaller chip
                />
              );
            },
          },
        ]}
        formFields={[]}
        getInitialItem={() => ({})}
        dataKey="orders"
      />
      {selectedOrder && (
        <Dialog
          open={true}
          onClose={() => setSelectedOrder(null)}
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
            <IconButton onClick={() => setSelectedOrder(null)} size="small">
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
                      {selectedOrder.sender?.name || "Not provided"}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailIcon>📧</DetailIcon>
                    <DetailLabel>Email:</DetailLabel>
                    <DetailValue>
                      {selectedOrder.sender?.email || "Not provided"}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailIcon>
                      <Phone />
                    </DetailIcon>
                    <DetailLabel>Phone:</DetailLabel>
                    <DetailValue>
                      {selectedOrder.phoneNumber || "Not provided"}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailIcon>
                      <LocationOn />
                    </DetailIcon>
                    <DetailLabel>Address:</DetailLabel>
                    <DetailValue sx={{ wordBreak: "break-word" }}>
                      {selectedOrder.address || "Not provided"}
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
                      {selectedOrder._id}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailIcon>
                      <ShoppingCart />
                    </DetailIcon>
                    <DetailLabel>Product:</DetailLabel>
                    <DetailValue fontWeight={500}>
                      {selectedOrder.product?.name || "Not specified"}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailIcon>🔢</DetailIcon>
                    <DetailLabel>Quantity:</DetailLabel>
                    <DetailValue>
                      <Chip
                        label={selectedOrder.quantity || "0"}
                        size="small"
                        color="primary"
                      />
                    </DetailValue>
                  </DetailRow>
                  {selectedOrder.product?.price && (
                    <DetailRow>
                      <DetailIcon>💰</DetailIcon>
                      <DetailLabel>Unit Price:</DetailLabel>
                      <DetailValue fontWeight={500}>
                        ${selectedOrder.product.price.toLocaleString()}
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
                  </Typography>{" "}
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <DetailRow sx={{ alignItems: "flex-start" }}>
                        <DetailIcon>
                          <Payment />
                        </DetailIcon>
                        <DetailLabel>Method:</DetailLabel>
                        <DetailValue>
                          {selectedOrder.paymentMethod ? (
                            <PaymentChip
                              label={`${
                                getPaymentMethodColor(
                                  selectedOrder.paymentMethod
                                ).icon
                              } ${selectedOrder.paymentMethod}`}
                              color={
                                getPaymentMethodColor(
                                  selectedOrder.paymentMethod
                                ).color
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
                          {selectedOrder.paymentDetails || "Not provided"}
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
                            {selectedOrder.totalPrice
                              ? selectedOrder.totalPrice.toLocaleString()
                              : "0"}
                          </Typography>
                        </DetailValue>
                      </DetailRow>
                    </Grid>
                  </Grid>
                  {selectedOrder.product?.price && selectedOrder.quantity && (
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
                        ${selectedOrder.product.price} ×{" "}
                        {selectedOrder.quantity} = $
                        {(
                          selectedOrder.product.price * selectedOrder.quantity
                        ).toLocaleString()}
                      </Typography>
                    </Box>
                  )}
                </DetailSection>
              </Grid>

              {/* Additional Notes */}
              {selectedOrder.note && (
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
                        "{selectedOrder.note}"
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
              {new Date(
                selectedOrder.createdAt || Date.now()
              ).toLocaleDateString()}
            </Typography>
            <Button
              onClick={() => setSelectedOrder(null)}
              variant="contained"
              color="primary"
              startIcon={<Close />}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default OrderManagement;
