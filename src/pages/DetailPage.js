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
} from "@mui/material";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { fCurrency } from "../utils";
import useAuth from "../hooks/useAuth";

function DetailPage() {
  const { id } = useParams();
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
    return await apiService.post(`/orders`, orderData);
  };

  const handleRequestOrder = async () => {
    if (!address || !phoneNumber) {
      alert("Please provide both address and phone number.");
      return;
    }

    setQuoteLoading(true);
    try {
      await createOrder({
        productId: id,
        quantity,
        address,
        phoneNumber,
        note: note, // Updated to send `note` instead of `content`
        paymentMethod: paymentMethod, // Only send the payment method as a string
      });
      alert("Order placed successfully!");
      setQuoteOpen(false);
    } catch (err) {
      alert("Failed to order.");
    }
    setQuoteLoading(false);
  };

  if (loading) return <LoadingScreen />;
  if (error || !product) return null;

  return (
    <Box
      sx={{
        width: "90vw",
        maxWidth: "100%", // Default for mobile
        mx: "auto",
        mt: 4,
        p: 2, // Padding for mobile
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        "@media screen and (min-width: 1024px)": {
          maxWidth: "80vw", // Adjusted width for desktop
          display: "grid", // Use grid layout for desktop
          gridTemplateColumns: "1fr 2fr", // Two-column layout with image on the left
          gap: 3, // Increased gap for desktop
          p: 4, // Padding for desktop
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "@media (minWidth: 1024px)": {
            justifyContent: "flex-start", // Align image to the left for desktop
          },
        }}
      >
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            style={{
              maxWidth: "100%", // Full width for mobile
              height: "auto",
              marginBottom: "12px",
              "@media (minWidth: 1024px)": {
                maxWidth: "80%", // Adjusted width for desktop
              },
            }}
          />
        )}
      </Box>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          "@media (minWidth: 1024px)": {
            p: 3, // Desktop-specific padding
          },
        }}
        elevation={3}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {product.name}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={{
            maxHeight: "15em", // Reduced maximum height
            overflowY: "auto",
            display: "-webkit-box",
            WebkitLineClamp: 10, // Adjusted line clamp
            WebkitBoxOrient: "vertical",
            whiteSpace: "pre-line",
          }}
        >
          {product.description}
        </Typography>
        <Divider sx={{ my: 1.5 }} />
        <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
          <Typography variant="h5" color="primary.main" fontWeight={600}>
            {fCurrency ? fCurrency(product.price) : product.price}
          </Typography>
        </Stack>
        {/* Add more product details here if available */}
        {(!user?.role || user.role !== "admin") && (
          <>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
              onClick={() => setQuoteOpen(true)}
              disabled={!isAuthenticated}
            >
              Order
            </Button>
            {!isAuthenticated && (
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Please log in to order.
              </Typography>
            )}
          </>
        )}
      </Paper>
      <Dialog open={quoteOpen} onClose={() => setQuoteOpen(false)}>
        <DialogTitle>Order Product</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              InputProps={{ inputProps: { min: 1 } }}
              fullWidth
            />
            <TextField
              label="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
            />
            <TextField
              label="Phone Number"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
            />
            <TextField
              select
              label="Payment Method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              fullWidth
              SelectProps={{ native: true }}
            >
              <option value="Momo e-wallet">Momo e-wallet</option>
              <option value="Mb bank">Mb bank</option>
              <option value="COD">Cash on Delivery (COD)</option>
            </TextField>
            <TextField
              label="Note (Optional)"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              fullWidth
            />
            <Typography
              variant="body1"
              sx={{
                backgroundColor: "#f5f5f5",
                padding: "8px",
                borderRadius: "4px",
                whiteSpace: "pre-line", // Ensures line breaks are respected
              }}
            >
              {paymentMethod === "Momo e-wallet"
                ? "Momo e-wallet\n0382050156\nHoang Cong Minh"
                : paymentMethod === "Mb bank"
                ? "Mb bank\n0382050156\nHoang Cong Minh"
                : "Cash on Delivery (COD)"}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                backgroundColor: "#f5f5f5",
                padding: "8px",
                borderRadius: "4px",
              }}
            >
              Total Price: {fCurrency ? fCurrency(totalPrice) : totalPrice}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuoteOpen(false)} disabled={quoteLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleRequestOrder}
            variant="contained"
            disabled={quoteLoading}
          >
            {quoteLoading ? "Ordering..." : "Order"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DetailPage;
