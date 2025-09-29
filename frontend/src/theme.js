// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // base dark mode
    primary: {
      main: "#646cff", // your glow purple/blue
    },
    secondary: {
      main: "#61dafb", // react-blue accent
    },
    background: {
      default: "#1e1e2f", // body background
      paper: "#2b2b40", // cards/panels
    },
    text: {
      primary: "#f0f0f5",
      secondary: "#888",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2b2b40",
          boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#2b2b40",
          borderRadius: "12px",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#2b2b40",
          borderRadius: "12px",
          color: "#f0f0f5",
        },
      },
    },
  },
});

export default theme;
