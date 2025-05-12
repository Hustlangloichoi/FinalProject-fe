import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', Arial, sans-serif;
    background: #f9f9f9;
    color: #222;
    min-height: 100vh;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  a {
    color: #1976d2;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  button {
    font-family: inherit;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  input, textarea, select {
    font-family: inherit;
    outline: none;
  }
`;

export default GlobalStyle;
