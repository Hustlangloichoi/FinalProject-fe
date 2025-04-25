import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // clinical blue
    },
    secondary: {
      main: "#90caf9", // light blue
    },
    background: {
      default: "#f5f7fa", // soft white/grey
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
