import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Login from "../Authentications/Login/Login";
import Register from "../Authentications/Register/Register";

import HomePage from "../HomePage/HomePage";

import ErrorPage from "../ErrorPage";
import Dashboard from "../LayOut/Dashboard";
import PrivateRoute from "../Private/PrivateRoute";
import AdminRoute from "../Private/AdminRoute";
import Users from "../DashBoard/Users";
import AddPet from "../DashBoard/AddPet/AddPet";

export const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-pet",
        element: <AddPet/>,
      },
      {
        path: "added-pets",
        element: <>added-pets</>,
      },
      {
        path: "adoption-request",
        element: <>adopt req</>,
      },
      {
        path: "create-donation",
        element: <>create</>,
      },
      {
        path: "donation-campaign",
        element: <>campaign</>,
      },
      {
        path: "donations",
        element: <>donation</>,
      },
      // admin routes
      {
        path:"users",
        element:<AdminRoute><Users/></AdminRoute>
      }
    ],
  },
]);
