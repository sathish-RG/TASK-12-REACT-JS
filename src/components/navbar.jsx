import { NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-500 flex flex-row justify-between text-white p-1 items-center flex-wrap">
        {/* Logo */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-bold text-4xl pl-5  `
          }
        >
          Password Reset Flow
        </NavLink>

        {/* Navigation Buttons */}
        <div className="flex flex-row justify-around items-center gap-4 p-3 pr-10">
          {/* Register Button */}
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `flex flex-row gap-1 font-bold text-xl hover:bg-blue-300 p-2 rounded-lg ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            Register
          </NavLink>

          {/* Login Button */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex flex-row gap-1 font-bold text-xl hover:bg-blue-300 p-2 rounded-lg ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            Login
          </NavLink>
        </div>
      </nav>

      {/* Outlet for Nested Routes */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
