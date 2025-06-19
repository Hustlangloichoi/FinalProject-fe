import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ShoppingCart, LocationOn, Phone } from "@mui/icons-material";

const OrderFormCustomerInfo = ({
  quantity,
  setQuantity,
  address,
  setAddress,
  phoneNumber,
  setPhoneNumber,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
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
  );
};

export default OrderFormCustomerInfo;
