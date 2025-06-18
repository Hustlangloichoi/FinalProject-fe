import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useMediaQuery,
  useTheme,
  Grid,
  Card,
  CardContent,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  ShoppingCart,
  LocationOn,
  Phone,
  Payment,
  Note,
  AccountBalanceWallet,
  LocalShipping,
  Receipt,
} from "@mui/icons-material";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { fCurrency } from "../utils";
import useAuth from "../hooks/useAuth";

function DetailPage() {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated, user } = useAuth();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quantity, setQuantity] = useState(1); // New state for quantity
  const [address, setAddress] = useState(""); // New state for address
  const [phoneNumber, setPhoneNumber] = useState(""); // New state for phone number
  const [paymentMethod, setPaymentMethod] = useState("Momo e-wallet"); // New state for payment method
  const [totalPrice, setTotalPrice] = useState(0); // New state for total price
  const [note, setNote] = useState(""); // New state for note

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(`/products/${id}`);
        setProduct(
          res.data.data.product || res.data.data || res.data.product || res.data
        );
        setError("");
      } catch (err) {
        setError("Product not found");
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity);
    }
  }, [product, quantity]); // Recalculate total price when product or quantity changes

  const createOrder = async (orderData) => {
    return await apiService.post(`/orders/${id}`, orderData);
  };

  const handleRequestOrder = async () => {
    if (!address || !phoneNumber) {
      alert("Please provide both address and phone number.");
      return;
    }

    setQuoteLoading(true);
    try {
      await createOrder({
        quantity,
        address,
        phoneNumber,
        note: note,
        paymentMethod: paymentMethod,
        paymentDetails:
          paymentMethod === "Momo e-wallet"
            ? "0382050156 Hoang Cong Minh (Momo e-wallet)"
            : paymentMethod === "Mb bank"
            ? "0382050156 Hoang Cong Minh (Mb bank)"
            : "Cash on Delivery (COD)",
      });
      alert("Order placed successfully!");
      setQuoteOpen(false);
    } catch (err) {
      alert("Failed to order: " + (err.response?.data?.message || err.message));
    }
    setQuoteLoading(false);
  };

  if (loading) return <LoadingScreen />;
  if (error || !product) return null;

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "90%", md: "80%" },
        maxWidth: 1200,
        mx: "auto",
        mt: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 },
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        gap: { xs: 2, lg: 4 },
      }}
    >
      {/* Product Image */}
      <Box
        sx={{
          flex: { xs: "none", lg: "0 0 40%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {product.image && (
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: "100%",
              maxWidth: { xs: 400, sm: 500, lg: "100%" },
              height: "auto",
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
        )}
      </Box>
      {/* Product Details */}
      <Paper
        sx={{
          flex: 1,
          p: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        elevation={3}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight={700}
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxHeight: { xs: "12em", md: "15em" },
            overflowY: "auto",
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {product.description}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Typography
            variant="h4"
            color="primary.main"
            fontWeight={600}
            sx={{
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" },
            }}
          >
            {fCurrency ? fCurrency(product.price) : product.price}
          </Typography>
        </Stack>

        {(!user?.role || user.role !== "admin") && (
          <Box sx={{ mt: "auto" }}>
            <Button
              variant="contained"
              size="large"
              fullWidth={isMobile}
              sx={{
                mt: 2,
                py: { xs: 1.5, sm: 1 },
                fontSize: { xs: "1rem", sm: "1.125rem" },
              }}
              onClick={() => setQuoteOpen(true)}
              disabled={!isAuthenticated}
            >
              Order Now
            </Button>
            {!isAuthenticated && (
              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                  textAlign: { xs: "center", sm: "left" },
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                Please log in to place an order.
              </Typography>
            )}
          </Box>
        )}
      </Paper>{" "}
      <Dialog
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            mx: { xs: 0, sm: 2 },
            my: { xs: 0, sm: 2 },
            width: { xs: "100%", sm: "auto" },
            height: { xs: "100%", sm: "auto" },
            maxHeight: { xs: "100%", sm: "90vh" },
            borderRadius: { xs: 0, sm: 3 },
          },
        }}
      >
        <DialogTitle
          sx={{
            pb: 2,
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <ShoppingCart />
          Order Product
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Grid container spacing={3}>
            {/* Customer Information Section */}
            <Grid item xs={12} md={6}>
              <Card elevation={2} sx={{ height: "100%" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="primary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <LocationOn />
                    Customer Information
                  </Typography>

                  <Stack spacing={2.5}>
                    <TextField
                      label="Quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      InputProps={{
                        inputProps: { min: 1 },
                        startAdornment: (
                          <InputAdornment position="start">
                            <ShoppingCart color="action" />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      size={isMobile ? "small" : "medium"}
                    />

                    <TextField
                      label="Delivery Address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      fullWidth
                      size={isMobile ? "small" : "medium"}
                      multiline
                      rows={isMobile ? 2 : 3}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ alignSelf: "flex-start", mt: 1 }}
                          >
                            <LocationOn color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      label="Phone Number"
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      fullWidth
                      size={isMobile ? "small" : "medium"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Payment & Notes Section */}
            <Grid item xs={12} md={6}>
              <Stack spacing={3} height="100%">
                <Card elevation={2}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      color="primary"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <Payment />
                      Payment Method
                    </Typography>

                    <TextField
                      select
                      label="Select Payment Method"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      fullWidth
                      SelectProps={{ native: true }}
                      size={isMobile ? "small" : "medium"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBalanceWallet color="action" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <option value="Momo e-wallet">💰 Momo e-wallet</option>
                      <option value="Mb bank">🏦 Mb bank</option>
                      <option value="COD">🚚 Cash on Delivery (COD)</option>
                    </TextField>

                    {/* Payment Details */}
                    <Card
                      elevation={1}
                      sx={{
                        mt: 2,
                        p: 2,
                        backgroundColor: "grey.50",
                        border: "1px solid",
                        borderColor: "grey.200",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        gutterBottom
                      >
                        Payment Details:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: "pre-line",
                          fontFamily: "monospace",
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        }}
                      >
                        {paymentMethod === "Momo e-wallet"
                          ? "Momo e-wallet\n0382050156\nHoang Cong Minh"
                          : paymentMethod === "Mb bank"
                          ? "Mb bank\n0382050156\nHoang Cong Minh"
                          : "Cash on Delivery (COD)"}
                      </Typography>
                    </Card>
                  </CardContent>
                </Card>

                <Card elevation={2}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      color="primary"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <Note />
                      Additional Notes
                    </Typography>

                    <TextField
                      label="Note (Optional)"
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      fullWidth
                      size={isMobile ? "small" : "medium"}
                      multiline
                      rows={3}
                      placeholder="Any special instructions or notes..."
                    />
                  </CardContent>
                </Card>
              </Stack>
            </Grid>

            {/* Total Price Section */}
            <Grid item xs={12}>
              <Card
                elevation={3}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <Receipt />
                    Order Summary
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "2rem" },
                      fontWeight: 700,
                      mt: 1,
                    }}
                  >
                    Total: {fCurrency ? fCurrency(totalPrice) : totalPrice}
                  </Typography>
                  <Chip
                    label={`${quantity} × ${
                      fCurrency ? fCurrency(product.price) : product.price
                    }`}
                    sx={{
                      mt: 1,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 500,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            pb: { xs: 3, sm: 2 },
            pt: 2,
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            backgroundColor: "grey.50",
          }}
        >
          <Button
            onClick={() => setQuoteOpen(false)}
            disabled={quoteLoading}
            fullWidth={isMobile}
            size="large"
            variant="outlined"
            startIcon={<LocalShipping />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRequestOrder}
            variant="contained"
            disabled={quoteLoading}
            fullWidth={isMobile}
            size="large"
            startIcon={<ShoppingCart />}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
              },
            }}
          >
            {quoteLoading ? "Processing..." : "Place Order"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DetailPage;
