import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Login from "../Authentications/Login/Login";
import Register from "../Authentications/Register/Register";

export const MainRoutes = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:"login",
                element:<Login/>

            },
            {
                path:"register",
                element:<Register/>

            },
        ]

    }
])