import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Login from "../Authentications/Login/Login";
import Register from "../Authentications/Register/Register";
import Banner from "../HomePage/Banner/Banner";
import HomePage from "../HomePage/HomePage";
import ErrorPage from "../ErrorPage";

export const MainRoutes = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:"login",
                element:<Login/>

            },
            {
                path:"register",
                element:<Register/>

            },
            {
                path:"/",
                element:<HomePage/>

            },
        ]

    }
])