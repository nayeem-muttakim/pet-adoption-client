import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import ErrorPage from "../ErrorPage";
import Dashboard from "../LayOut/Dashboard";
import Users from "../Pages/DashboardPages/Users";
import AddPet from "../Pages/DashboardPages/AddPet";
import CreateDonation from "../Pages/DashboardPages/CreateDonation";
import MyCampaigns from "../Pages/DashboardPages/MyCampaigns";
import DashHome from "../Pages/Dashboard";
import UpdateCampaign from "../Pages/DashboardPages/UpdateCampaign";
import Campaigns from "../Pages/DashboardPages/Campaigns";
import AllPets from "../Pages/DashboardPages/Pets";
import AdoptRequest from "../Pages/DashboardPages/AdoptRequest";
import CampaignList from "../Pages/Campaigns/List";
import CampaignDetail from "../Pages/Campaigns/Detail/Detail";
import MyDonation from "../Pages/DashboardPages/MyDonations/MyDonation";
import Pets from "../Pages/Pets/Pets";
import HomePage from "../Pages/Home";
import PrivateRoute from "./Private/AdminRoute";
import AdminRoute from "./Private/AdminRoute";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PetDetails from "../Pages/Pets/Details";
import AddedPets from "../Pages/DashboardPages/AddedPets";
import UpdatePet from "../Pages/DashboardPages/UpdatePet";

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
      {
        path: "pets",
        element: <Pets />,
      },
      {
        path: "campaigns",
        element: <CampaignList />,
      },
      {
        path: "campaign/:id",
        element: <CampaignDetail />,
      },
      {
        path: "pet-details/:id",
        element: <PetDetails />,
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
        path: "",
        element: <DashHome />,
      },
      {
        path: "add-pet",
        element: <AddPet />,
      },
      {
        path: "added-pets",
        element: <AddedPets />,
      },
      {
        path: "update-pet/:id",
        element: <UpdatePet />,
      },
      {
        path: "adoption-request",
        element: <AdoptRequest />,
      },
      {
        path: "create-donation",
        element: <CreateDonation />,
      },
      {
        path: "update-campaign/:id",
        element: <UpdateCampaign />,
      },
      {
        path: "donation-campaign",
        element: <MyCampaigns />,
      },
      {
        path: "donations",
        element: <MyDonation />,
      },
      // admin routes
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "all-pets",
        element: (
          <AdminRoute>
            <AllPets />
          </AdminRoute>
        ),
      },
      {
        path: "all-campaigns",
        element: (
          <AdminRoute>
            <Campaigns />
          </AdminRoute>
        ),
      },
    ],
  },
]);
