// ThemeProvider.js: provides theme context and Material-UI theme switching (light/dark) for the app.
// Includes a custom hook (useThemeMode) for toggling theme mode.
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const ThemeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
};

const getThemeConfig = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === "light" ? "#1976d2" : "#90caf9",
      light: mode === "light" ? "#42a5f5" : "#bbdefb",
      dark: mode === "light" ? "#1565c0" : "#42a5f5",
      contrastText: mode === "light" ? "#ffffff" : "#000000",
    },
    secondary: {
      main: mode === "light" ? "#90caf9" : "#f48fb1",
      light: mode === "light" ? "#bbdefb" : "#f8bbd9",
      dark: mode === "light" ? "#42a5f5" : "#c2185b",
    },
    background: {
      default: mode === "light" ? "#f5f7fa" : "#121212",
      paper: mode === "light" ? "#ffffff" : "#1e1e1e",
    },
    text: {
      primary: mode === "light" ? "#222" : "#ffffff",
      secondary: mode === "light" ? "#607d8b" : "#b0bec5",
    },
    divider:
      mode === "light" ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)",
    action: {
      hover:
        mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.08)",
      selected:
        mode === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.16)",
    },
  },
  typography: {
    fontFamily:
      '"Segoe UI", "Roboto", "Helvetica Neue", Arial, "Liberation Sans", sans-serif',

    h1: {
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
      "@media (min-width:900px)": {
        fontSize: "3rem",
      },
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "1.75rem",
      "@media (min-width:600px)": {
        fontSize: "2rem",
      },
      "@media (min-width:900px)": {
        fontSize: "2.5rem",
      },
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.5rem",
      "@media (min-width:600px)": {
        fontSize: "1.75rem",
      },
      "@media (min-width:900px)": {
        fontSize: "2rem",
      },
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.25rem",
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
      },
      "@media (min-width:900px)": {
        fontSize: "1.75rem",
      },
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.125rem",
      "@media (min-width:600px)": {
        fontSize: "1.25rem",
      },
      "@media (min-width:900px)": {
        fontSize: "1.5rem",
      },
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1rem",
      "@media (min-width:600px)": {
        fontSize: "1.125rem",
      },
      "@media (min-width:900px)": {
        fontSize: "1.25rem",
      },
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "0.875rem",
      "@media (min-width:600px)": {
        fontSize: "1rem",
      },
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.75rem",
      "@media (min-width:600px)": {
        fontSize: "0.875rem",
      },
      lineHeight: 1.5,
    },
    button: {
      fontSize: "0.875rem",
      "@media (min-width:600px)": {
        fontSize: "1rem",
      },
      fontWeight: 600,
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      "@media (min-width:600px)": {
        fontSize: "0.8125rem",
      },
      lineHeight: 1.4,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: "44px",
          "@media (max-width:600px)": {
            minHeight: "48px",
            fontSize: "1rem",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minWidth: "44px",
          minHeight: "44px",
          "@media (max-width:600px)": {
            minWidth: "48px",
            minHeight: "48px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            "@media (max-width:600px)": {
              minHeight: "48px",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "@media (max-width:600px)": {
            borderRadius: "8px",
          },
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function ThemeProvider({ children }) {
  // Provides theme context and toggles between light and dark mode
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme(getThemeConfig(mode));

  const contextValue = {
    mode,
    toggleColorMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
