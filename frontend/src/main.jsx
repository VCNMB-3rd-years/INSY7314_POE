import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme.js";

// Fix: use createRoot, not ReactDom.createRoot
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* resets styles and applies dark mode */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
