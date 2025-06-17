import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeProvider";
import GlobalStyle from "./components/GlobalStyle";
import FloatingThemeToggle from "./components/FloatingThemeToggle";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider>
            <Router />
            <FloatingThemeToggle />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
