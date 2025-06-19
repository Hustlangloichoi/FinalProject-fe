import React from "react";
import {
  Paper,
  Typography,
  Divider,
  Stack,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { fCurrency } from "../../utils";

const ProductDetails = ({ product, user, isAuthenticated, onOrderClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
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
          {fCurrency
            ? fCurrency(product.price)
            : `$${product.price.toLocaleString("en-US")}`}
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
            onClick={onOrderClick}
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
    </Paper>
  );
};

export default ProductDetails;
