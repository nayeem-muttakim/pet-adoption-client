import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Login from "../Authentications/Login/Login";
import Register from "../Authentications/Register/Register";

import HomePage from "../HomePage/HomePage";

import ErrorPage from "../ErrorPage";
import Dashboard from "../LayOut/Dashboard";
import PrivateRoute from "../Private/PrivateRoute";
import AdminRoute from "../Private/AdminRoute";
import Users from "../DashBoard/Users/Users";
import AddPet from "../DashBoard/AddPet/AddPet";
import AddedPets from "../DashBoard/AddedPets/AddedPets";
import UpdatePet from "../DashBoard/UpdatePet/UpdatePet";
import CreateDonation from "../DashBoard/CreateDonation/CreateDonation";
import MyCampaigns from "../DashBoard/MyCampaigns/MyCampaigns";
import Pets from "../DashBoard/Pets/Pets";
import DashHome from "../DashBoard/DashHome";
import UpdateCampaign from "../DashBoard/UpdateCampaign/UpdateCampaign";
import Campaigns from "../DashBoard/Campaigns/Campaigns";
import PetList from "../Pages/PetList/PetList";
import PetDetails from "../Pages/PetDetails/PetDetails";
import AdoptRequest from "../DashBoard/AdoptRequest/AdoptRequest";
import CampaignList from "../Pages/CampaignList/CampaignList";
import CampaignDetail from "../Pages/CampaignList/CampaignDetail/CampaignDetail";
import MyDonation from "../DashBoard/MyDonations/MyDonation";

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
        path: "listing",
        element: <PetList />,
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
        element: <AdoptRequest/>,
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
        element: <MyDonation/>,
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
            <Pets />
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
