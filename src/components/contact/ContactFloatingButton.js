import React from "react";
import { Fab } from "@mui/material";
import { Phone } from "@mui/icons-material";

function ContactFloatingButton() {
  return (
    <Fab
      color="primary"
      sx={{
        position: "fixed",
        bottom: 96, // Above theme toggle button (vertically aligned)
        right: 24, // Same horizontal position as theme toggle
        zIndex: 999, // Lower z-index than theme toggle
        "@media (max-width: 768px)": {
          bottom: 84,
          right: 20,
        },
        "@media (max-width: 480px)": {
          bottom: 76,
          right: 16,
        },
      }}
      onClick={() => window.open("tel:0905039002")}
    >
      <Phone />
    </Fab>
  );
}

export default ContactFloatingButton;
