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
} from "@mui/material";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { fCurrency } from "../utils";
import useAuth from "../hooks/useAuth";

function DetailPage() {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
        width: { xs: '100%', sm: '90%', md: '80%' },
        maxWidth: 1200,
        mx: 'auto',
        mt: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 },
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        gap: { xs: 2, lg: 4 },
      }}
    >
      {/* Product Image */}
      <Box
        sx={{
          flex: { xs: 'none', lg: '0 0 40%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {product.image && (
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              maxWidth: { xs: 400, sm: 500, lg: '100%' },
              height: 'auto',
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
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        elevation={3}
      >
        <Typography 
          variant="h4" 
          component="h1"
          fontWeight={700} 
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
          }}
        >
          {product.name}
        </Typography>
        
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxHeight: { xs: '12em', md: '15em' },
            overflowY: 'auto',
            whiteSpace: 'pre-line',
            lineHeight: 1.6,
            fontSize: { xs: '0.875rem', sm: '1rem' }
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
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' }
            }}
          >
            {fCurrency ? fCurrency(product.price) : product.price}
          </Typography>
        </Stack>
        
        {(!user?.role || user.role !== "admin") && (
          <Box sx={{ mt: 'auto' }}>
            <Button
              variant="contained"
              size="large"
              fullWidth={isMobile}
              sx={{ 
                mt: 2,
                py: { xs: 1.5, sm: 1 },
                fontSize: { xs: '1rem', sm: '1.125rem' }
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
                  textAlign: { xs: 'center', sm: 'left' },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                Please log in to place an order.
              </Typography>
            )}
          </Box>
        )}
      </Paper>
      <Dialog 
        open={quoteOpen} 
        onClose={() => setQuoteOpen(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            mx: { xs: 0, sm: 2 },
            my: { xs: 0, sm: 2 },
            width: { xs: '100%', sm: 'auto' },
            height: { xs: '100%', sm: 'auto' },
            maxHeight: { xs: '100%', sm: '90vh' }
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 1,
          fontSize: { xs: '1.25rem', sm: '1.5rem' }
        }}>
          Order Product
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Stack spacing={2}>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              InputProps={{ inputProps: { min: 1 } }}
              fullWidth
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              label="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              size={isMobile ? "small" : "medium"}
              multiline
              rows={isMobile ? 2 : 3}
            />
            <TextField
              label="Phone Number"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              select
              label="Payment Method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              fullWidth
              SelectProps={{ native: true }}
              size={isMobile ? "small" : "medium"}
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
              size={isMobile ? "small" : "medium"}
              multiline
              rows={2}
            />
            <Paper
              elevation={1}
              sx={{
                p: 2,
                backgroundColor: 'grey.50',
                border: '1px solid',
                borderColor: 'grey.200'
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: 'pre-line',
                  fontFamily: 'monospace',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                {paymentMethod === "Momo e-wallet"
                  ? "Momo e-wallet\n0382050156\nHoang Cong Minh"
                  : paymentMethod === "Mb bank"
                  ? "Mb bank\n0382050156\nHoang Cong Minh"
                  : "Cash on Delivery (COD)"}
              </Typography>
            </Paper>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                backgroundColor: 'primary.50',
                border: '1px solid',
                borderColor: 'primary.200'
              }}
            >
              <Typography
                variant="h6"
                color="primary"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  fontWeight: 600
                }}
              >
                Total Price: {fCurrency ? fCurrency(totalPrice) : totalPrice}
              </Typography>
            </Paper>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ 
          px: 3, 
          pb: { xs: 3, sm: 2 },
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Button 
            onClick={() => setQuoteOpen(false)} 
            disabled={quoteLoading}
            fullWidth={isMobile}
            size={isMobile ? "large" : "medium"}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRequestOrder}
            variant="contained"
            disabled={quoteLoading}
            fullWidth={isMobile}
            size={isMobile ? "large" : "medium"}
          >
            {quoteLoading ? "Ordering..." : "Place Order"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DetailPage;
