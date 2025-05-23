import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Stack, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
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

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(`/products/${id}`);
        setProduct(res.data.data.product || res.data.data || res.data.product || res.data);
        setError("");
      } catch (err) {
        setError("Product not found");
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleRequestOrder = async () => {
    setQuoteLoading(true);
    try {
      const message = `I'd like to buy ${product.name}`;
      await apiService.post(`/orders/products/${product._id}/orders`, { content: message });
      alert("Order sent successfully!");
      setQuoteOpen(false);
    } catch (err) {
      alert("Failed to send order: " + (err.response?.data?.message || err.message));
    }
    setQuoteLoading(false);
  };

  if (loading) return <LoadingScreen />;
  if (error || !product) return null;

  return (
    <Box sx={{ width: '90vw', maxWidth: 1600, mx: 'auto', mt: 6, p: 2 }}>
      <Paper
        sx={{
          p: 3,
          display: 'flex',
          gap: 4,
          alignItems: 'flex-start',
          minHeight: 600,
          width: '100%',
        }}
        elevation={3}
      >
        <Box sx={{ flex: 1, minHeight: 400 }}>
          <img
            src={product.image || product.cover || "/logo.png"}
            alt={product.name}
            style={{
              width: "100%",
              borderRadius: 16,
              objectFit: "cover",
              height: "400px",
            }}
          />
        </Box>
        <Box sx={{ flex: 1, minHeight: 400, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {product.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
            sx={{
              minHeight: '16em',
              maxHeight: '24em',
              overflowY: 'auto',
              display: '-webkit-box',
              WebkitLineClamp: 16,
              WebkitBoxOrient: 'vertical',
              whiteSpace: 'pre-line',
            }}
          >
            {product.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Typography variant="h5" color="primary.main" fontWeight={600}>
              {fCurrency ? fCurrency(product.price) : product.price}
            </Typography>
            {product.quantity !== undefined && (
              <Typography variant="body2" color="text.secondary">
                In stock: {product.quantity}
              </Typography>
            )}
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
        </Box>
      </Paper>
      <Dialog open={quoteOpen} onClose={() => setQuoteOpen(false)}>
        <DialogTitle>Order</DialogTitle>
        <DialogContent>
          <Typography>
            The following message will be sent automatically:
          </Typography>
          <Typography sx={{ my: 2, fontWeight: 500 }}>
            {`I'd like to buy ${product.name}`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuoteOpen(false)} disabled={quoteLoading}>Cancel</Button>
          <Button onClick={handleRequestOrder} variant="contained" disabled={quoteLoading}>
            {quoteLoading ? "Sending..." : "Send Order"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DetailPage;
