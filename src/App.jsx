import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import Home from "./pages/home";
import Navbar from "./components/navbar";

function App() {
  const routes = [
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/home",
          element: <Home />,
        }
      ],
    },
  ];

  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;