import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Payment, AccountBalanceWallet } from "@mui/icons-material";

const OrderFormPayment = ({ paymentMethod, setPaymentMethod }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getPaymentDetails = () => {
    switch (paymentMethod) {
      case "Momo e-wallet":
        return "Momo e-wallet\n0382050156\nHoang Cong Minh";
      case "Mb bank":
        return "Mb bank\n0382050156\nHoang Cong Minh";
      default:
        return "Cash on Delivery (COD)";
    }
  };

  return (
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
          <Typography variant="subtitle2" color="primary" gutterBottom>
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
            {getPaymentDetails()}
          </Typography>
        </Card>
      </CardContent>
    </Card>
  );
};

export default OrderFormPayment;
