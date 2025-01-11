import { Outlet } from "react-router-dom";

const navbar = () => {

  return (
    <>
      <nav className=" bg-blue-500 flex flex-row justify-between text-white p-1">
        <button onClick={() => ("/")} className="font-bold text-4xl pl-5">
          Password Reset Flow
        </button>
        <div className="flex flex-row justify-around items-center align-middle gap-4 p-3 pr-10">
        <button
            onClick={() =>window.location.href = "/register"}
            className="flex flex-row gap-1 font-bold text-xl hover:bg-blue-300 p-2 rounded-lg"
          >
            Register
          </button>
          <button
            onClick={() =>window.location.href = "/login"}
            className="flex flex-row gap-1 font-bold text-xl hover:bg-blue-300 p-2 rounded-lg"
          >
            Login
          </button>
          
        </div>
        
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default navbar;
