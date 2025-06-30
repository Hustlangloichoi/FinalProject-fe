import React from "react";
import { Fab, Tooltip, Zoom } from "@mui/material";
import { Phone } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

// PersistentPhoneButton: renders a floating button for quick phone contact, visible on all pages.
// UI: fixed position, hidden on contact page
function PersistentPhoneButton() {
  const location = useLocation();

  // Don't show on contact page since it already has its own phone button
  if (location.pathname === "/contact") {
    return null;
  }

  return (
    <Zoom in={true} timeout={300}>
      <Tooltip title="Call us: 0905039002" placement="left">
        <Fab
          color="secondary"
          onClick={() => window.open("tel:0905039002")}
          sx={{
            position: "fixed",
            bottom: 96, // Above theme toggle button
            right: 24, // Same horizontal position as theme toggle
            zIndex: 999, // Lower z-index than theme toggle
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: (theme) =>
                theme.palette.mode === "light"
                  ? "0 8px 25px rgba(156, 39, 176, 0.4)"
                  : "0 8px 25px rgba(206, 147, 216, 0.4)",
            },
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0 4px 12px rgba(0, 0, 0, 0.15)"
                : "0 4px 12px rgba(0, 0, 0, 0.3)",
            // Responsive positioning
            "@media (max-width: 768px)": {
              bottom: 84,
              right: 20,
              width: 48,
              height: 48,
            },
            "@media (max-width: 480px)": {
              bottom: 76,
              right: 16,
              width: 44,
              height: 44,
            },
          }}
        >
          <Phone />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}

export default PersistentPhoneButton;
