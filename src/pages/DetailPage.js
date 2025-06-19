import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import useAuth from "../hooks/useAuth";
import { fCurrency } from "../utils";
import {
  ProductImage,
  ProductDetails,
  OrderDialog,
} from "../components/product";

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
      <ProductImage product={product} />
      <ProductDetails
        product={product}
        onOrderClick={() => setQuoteOpen(true)}
        fCurrency={fCurrency}
        isAuthenticated={isAuthenticated}
        user={user}
        isMobile={isMobile}
      />
      <OrderDialog
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
        address={address}
        setAddress={setAddress}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        note={note}
        setNote={setNote}
        totalPrice={totalPrice}
        loading={quoteLoading}
        onSubmit={handleRequestOrder}
        fCurrency={fCurrency}
        isMobile={isMobile}
      />
    </Box>
  );
}

export default DetailPage;
