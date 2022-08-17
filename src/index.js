import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./context/auth-context";

import "./index.css";
import App from "./App";
//https://github.com/ArminBabic/React-Login-Form
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
