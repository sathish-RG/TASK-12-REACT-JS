import { useState } from "react";
import { login } from "../utils/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      // Store token in localStorage (optional)
      localStorage.setItem("token", response.data.token);
      window.location.href = "/home";
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
        />
        <p className="p-5 pt-0 text-blue-500" onClick={() => window.location.href = '/forgot-password'}>Forgot Password</p>

        <button className="bg-blue-500 text-white w-full py-2 rounded" >
          Login
        </button>
        <p className="p-5 pb-0 text-blue-500" onClick={() => window.location.href = '/register'}>Register</p>
      </form>
    </div>
  );
};

export default Login;
