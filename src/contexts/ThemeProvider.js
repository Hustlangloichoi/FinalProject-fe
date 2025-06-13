import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Clinical blue
    },
    secondary: {
      main: "#90caf9", // Light blue
    },
    background: {
      default: "#f5f7fa", // Soft white/grey
      paper: "#ffffff",
    },
    text: {
      primary: "#222",
      secondary: "#607d8b",
    },
  },
  typography: {
    fontFamily:
      '"Segoe UI", "Roboto", "Helvetica Neue", Arial, "Liberation Sans", sans-serif',
  },
});

function ThemeProvider({ children }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default ThemeProvider;
