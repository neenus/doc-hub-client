import React from "react";
import ReactDOM from "react-dom/client";
import { registerLicense } from "@syncfusion/ej2-base";

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider
} from "@mui/material/styles";
import "./index.css";
import App from "./App.tsx";
import axios from "axios";

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', serif"
  }
});

axios.defaults.withCredentials = true;

// Register Syncfusion license
registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
