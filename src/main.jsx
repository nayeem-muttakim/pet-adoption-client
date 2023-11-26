import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { MainRoutes } from "./Routes/MainRoutes";
import AuthProvider from "./AuthProvider/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      <HelmetProvider><RouterProvider router={MainRoutes} /></HelmetProvider>
      <Toaster/>
    </AuthProvider>
  </React.StrictMode>
);
