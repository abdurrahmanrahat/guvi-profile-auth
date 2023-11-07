import { createBrowserRouter } from "react-router-dom";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Profile from "../Pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile></Profile>
      </PrivateRoute>
    ),
  },
]);

export default router;
