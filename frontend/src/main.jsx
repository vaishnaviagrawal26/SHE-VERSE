import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./tailwind.css";

import { AuthProvider } from "./context/AuthContext";
import { SOSProvider } from "./context/SOSContext";
import { AIProvider } from "./context/AIContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SOSProvider>
        <AIProvider>
          <App />
        </AIProvider>
      </SOSProvider>
    </AuthProvider>
  </React.StrictMode>
);