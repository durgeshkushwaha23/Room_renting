import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router> {/* ✅ Router wraps App */}
      <AuthProvider> 
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
