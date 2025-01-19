
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
import ReportedContent from "../Pages/Dashboard/ModeratorHome/ReportedContent";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import PrivateAdmin from "./privateAdmin/PrivateAdmin";
import ManageUsers from "../Pages/Dashboard/AdminHome/ManageUsers";
import MakePayment from "../Pages/Dashboard/UserHome/Payment/MakePayment";
import Products from "../Pages/Products/Products";


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
        },{
          path: '/productDetails',
          element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
        }
        ,{
          path:'/products',
          element: <Products></Products>
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
        {
          path:'payment',
          element: <MakePayment></MakePayment>
        },
        // for moderator
        {
            path: 'moderatorHome',
            element: <PrivateModerator><ModeratorHome></ModeratorHome></PrivateModerator>

        },
        {
            path: 'productReview',
            element: <PrivateModerator><ProductReviewQueue></ProductReviewQueue></PrivateModerator>

        },
        {
            path: 'reportedContent',
            element: <PrivateModerator><ReportedContent></ReportedContent></PrivateModerator>

        },
        ,{
          path: 'productDetails',
          element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
        },
        // for admin
        {
          path: 'adminHome',
          element: <PrivateAdmin><AdminHome></AdminHome></PrivateAdmin>
        }
        ,{
          path: 'manageUsers',
          element: <PrivateAdmin> <ManageUsers></ManageUsers></PrivateAdmin>
        }
      ]
    }
  ]);