
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashboard from "../Layout/Dashboard/Dashboard";
import MyProfile from "../Pages/Dashboard/UserHome/MyProfile";
import AddProduct from "../Pages/Dashboard/UserHome/AddProduct";
import MyProducts from "../Pages/Dashboard/UserHome/MyProducts";
import UpdateProduct from "../Pages/Dashboard/UserHome/UpdateProduct";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import ModeratorHome from "../Pages/Dashboard/ModeratorHome/ModeratorHome";
import PrivateModerator from "./PrivateModerator/PrivateModerator";
import ProductReviewQueue from "../Pages/Dashboard/ModeratorHome/ProductReviewQueue";
// import PrivateModerator from "./PrivateModerator/PrivateModerator";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/login',
            element: <Login></Login>
        }
      ]
    },
    {
      path:'/dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        //user
        {
          path:'UserHome',
          element: <UserHome></UserHome>
        },
        {
          path:'MyProfile',
          element: <MyProfile></MyProfile>
        },
        {
          path:'AddProduct',
          element: <AddProduct></AddProduct>
        },
        {
          path:'MyProducts',
          element: <MyProducts></MyProducts>
        },
        {
          path:'UpdateProduct',
          element: <UpdateProduct></UpdateProduct>
        },
        // for moderator
        {
            path: 'moderatorHome',
            element: <ModeratorHome></ModeratorHome>

        },
        {
            path: 'productReview',
            element: <PrivateModerator><ProductReviewQueue></ProductReviewQueue></PrivateModerator>

        }
      ]
    }
  ]);