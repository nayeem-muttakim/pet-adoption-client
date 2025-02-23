import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { MainRoutes } from "./Routes/MainRoutes";
import AuthProvider from "./Provider/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      {" "}
      <HelmetProvider>
        <RouterProvider router={MainRoutes} />
      </HelmetProvider>
      <Toaster />
    </AuthProvider>
  </QueryClientProvider>
);
