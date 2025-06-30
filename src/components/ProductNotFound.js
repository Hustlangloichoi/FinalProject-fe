// ProductNotFound component: displays a message and reset button when no products match the current filters or search.
// Removed unnecessary comments
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

function ProductNotFound({ onReset }) {
  // Renders a not found message and optional reset button
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 320,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <SentimentDissatisfiedIcon
        color="disabled"
        sx={{ fontSize: 64, mb: 2 }}
      />
      <Typography variant="h6" gutterBottom>
        No products found
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Try adjusting your filters or search keywords.
      </Typography>
      {onReset && (
        <Button variant="outlined" onClick={onReset}>
          Reset Filters
        </Button>
      )}
    </Box>
  );
}

export default ProductNotFound;
