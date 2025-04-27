import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Stack, Divider, Button } from "@mui/material";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { fCurrency } from "../utils";

function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <LoadingScreen />;
  if (error || !product)
    return (
      <Typography color="error">{error || "Product not found"}</Typography>
    );

  return (
    <Box sx={{ maxWidth: 2250, mx: "auto", mt: 6, p: 2 }}>
      <Paper
        sx={{
          p: 3,
          display: "flex",
          gap: 4,
          alignItems: "flex-start",
          minHeight: 600,
        }}
        elevation={3}
      >
        <Box sx={{ minWidth: 800, maxWidth: 1000, flex: 1, minHeight: 600 }}>
          <img
            src={product.image || product.cover || "/logo.png"}
            alt={product.name}
            style={{
              width: "100%",
              borderRadius: 16,
              objectFit: "cover",
              height: "600px",
            }}
          />
        </Box>
        <Box sx={{ flex: 2 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {product.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Typography variant="h5" color="primary.main" fontWeight={600}>
              {fCurrency(product.price)}
            </Typography>
            {product.quantity !== undefined && (
              <Typography variant="body2" color="text.secondary">
                In stock: {product.quantity}
              </Typography>
            )}
          </Stack>
          {/* Add more product details here if available */}
          <Button variant="contained" size="large" sx={{ mt: 2 }}>
            Request Quote
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default DetailPage;
