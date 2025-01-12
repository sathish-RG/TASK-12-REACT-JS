import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../utils/api"; // Ensure this API function is implemented

const Login = () => {
  const navigate = useNavigate(); // React Router's hook for navigation
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Error message state
  const [loading, setLoading] = useState(false); // Loading state for better user experience

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(""); // Clear previous errors
    setLoading(true); // Show loading state during API call

    try {
      const response = await login(formData); // API call to log in
      // Optionally store the token for authentication
      localStorage.setItem("token", response.data.token);
      navigate("/home"); // Navigate to the home page
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials."); // Handle errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-md rounded-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {/* Error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Email input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
          required
          disabled={loading} // Disable input during loading
        />

        {/* Password input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
          required
          disabled={loading} // Disable input during loading
        />

        {/* Forgot password link */}
        <p className="mb-4 text-right text-blue-500">
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
        </p>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading} // Disable button during loading
          className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register link */}
        <p className="mt-4 text-center text-blue-500">
          <Link to="/register" className="hover:underline">
            Don’t have an account? Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
