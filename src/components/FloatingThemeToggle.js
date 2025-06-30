import React from "react";
import { Fab, Tooltip, Zoom } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "../contexts/ThemeProvider";

// FloatingThemeToggle: renders a floating button to toggle between light and dark themes.
function FloatingThemeToggle() {
  const { mode, toggleColorMode } = useThemeMode();

  return (
    <Zoom in={true} timeout={300}>
      <Tooltip
        title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
        placement="left"
      >
        <Fab
          onClick={toggleColorMode}
          color="primary"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "rotate(180deg) scale(1.1)",
              boxShadow: (theme) =>
                theme.palette.mode === "light"
                  ? "0 8px 25px rgba(25, 118, 210, 0.4)"
                  : "0 8px 25px rgba(144, 202, 249, 0.4)",
            },
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0 4px 12px rgba(0, 0, 0, 0.15)"
                : "0 4px 12px rgba(0, 0, 0, 0.3)",
            // Responsive positioning
            "@media (max-width: 768px)": {
              bottom: 20,
              right: 20,
              width: 48,
              height: 48,
            },
            "@media (max-width: 480px)": {
              bottom: 16,
              right: 16,
              width: 44,
              height: 44,
            },
          }}
        >
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </Fab>
      </Tooltip>
    </Zoom>
  );
}

export default FloatingThemeToggle;
