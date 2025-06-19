import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ShoppingCart, LocalShipping } from "@mui/icons-material";
import OrderFormCustomerInfo from "./OrderFormCustomerInfo";
import OrderFormPayment from "./OrderFormPayment";
import OrderFormNotes from "./OrderFormNotes";
import OrderSummary from "./OrderSummary";

const OrderDialog = ({
  open,
  onClose,
  product,
  quantity,
  setQuantity,
  address,
  setAddress,
  phoneNumber,
  setPhoneNumber,
  paymentMethod,
  setPaymentMethod,
  note,
  setNote,
  totalPrice,
  onSubmit,
  loading,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          <OrderFormCustomerInfo
            quantity={quantity}
            setQuantity={setQuantity}
            address={address}
            setAddress={setAddress}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />

          <Grid item xs={12} md={6}>
            <Stack spacing={3} height="100%">
              <OrderFormPayment
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />

              <OrderFormNotes note={note} setNote={setNote} />
            </Stack>
          </Grid>

          <OrderSummary
            product={product}
            quantity={quantity}
            totalPrice={totalPrice}
          />
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
          onClick={onClose}
          disabled={loading}
          fullWidth={isMobile}
          size="large"
          variant="outlined"
          startIcon={<LocalShipping />}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={loading}
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
          {loading ? "Processing..." : "Place Order"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;
