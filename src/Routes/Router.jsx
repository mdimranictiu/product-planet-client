
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <div>404</div>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        }
      ]
    },
  ]);