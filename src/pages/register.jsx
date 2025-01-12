import { useState } from "react";
import { register } from "../utils/api";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      setSuccess("Registration successful! Please log in.");
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}
        <input
          type="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
        />
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
        <button className="bg-blue-500 text-white w-full py-2 rounded">
          Register
        </button>
        <p className="p-5 pb-0 text-blue-500" onClick={() => window.location.href = '/login'}>Login</p>
      </form>
    </div>
  );
};

export default Register;
