import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import Home from "./pages/home";
import Navbar from "./components/navbar"; // Add this import

function App() {
   
const routes = [
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register/>,
      },
      {
        path: "Login",
        element: <Login/>,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword/>,
      },
      {
        path: "home",
        element: <Home/>,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

return <RouterProvider router={router} />;
}

export default App;