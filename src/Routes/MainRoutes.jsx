import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import ErrorPage from "../ErrorPage";
import Dashboard from "../LayOut/Dashboard";
import Users from "../DashBoard/Users/Users";
import AddPet from "../DashBoard/AddPet/AddPet";
import CreateDonation from "../DashBoard/CreateDonation/CreateDonation";
import MyCampaigns from "../DashBoard/MyCampaigns/MyCampaigns";
import DashHome from "../Pages/DashHome";
import UpdateCampaign from "../DashBoard/UpdateCampaign/UpdateCampaign";
import Campaigns from "../DashBoard/Campaigns/Campaigns";
import AllPets from "../DashBoard/AllPets/AllPets";
import AdoptRequest from "../DashBoard/AdoptRequest/AdoptRequest";
import CampaignList from "../Pages/CampaignList/CampaignList";
import CampaignDetail from "../Pages/CampaignList/CampaignDetail/CampaignDetail";
import MyDonation from "../DashBoard/MyDonations/MyDonation";
import Pets from "../Pages/Pets/Pets";
import HomePage from "../Pages/HomePage";
import PrivateRoute from "./Private/AdminRoute";
import AdminRoute from "./Private/AdminRoute";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PetDetails from "../Pages/Pets/PetDetails";
import AddedPets from "../Pages/AddedPets/AddedPets";
import UpdatePet from "../Pages/UpdatePet/UpdatePet";

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
