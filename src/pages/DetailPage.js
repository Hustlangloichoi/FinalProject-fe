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

  const handleRequestOrder = async () => {
    setQuoteLoading(true);
    try {
      const message = `I'd like to buy ${product.name}`;
      await apiService.post(`/orders/products/${product._id}/orders`, {
        content: message,
      });
      alert("Order sent successfully!");
      setQuoteOpen(false);
    } catch (err) {
      alert(
        "Failed to send order: " + (err.response?.data?.message || err.message)
      );
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
        <DialogTitle>Order</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row", // Align image and text side by side
              gap: 2,
              alignItems: "center", // Center align both image and text box
              height: "100%", // Ensure both elements take full height
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%", // Match height with parent container
              }}
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    height: "100%", // Match height with text box
                    objectFit: "contain", // Ensure proper scaling without cropping
                  }}
                />
              )}
            </Box>
            <Box
              sx={{
                flex: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%", // Match height with parent container
              }}
            >
              <Typography>
                The following message will be sent automatically:
              </Typography>
              <Typography sx={{ my: 2, fontWeight: 500 }}>
                {`I'd like to buy ${product.name}`}
              </Typography>
            </Box>
          </Box>
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
            {quoteLoading ? "Sending..." : "Send Order"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DetailPage;
