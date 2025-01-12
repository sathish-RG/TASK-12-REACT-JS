import { useState } from "react";
import { sendOTP, verifyOTP, resetPassword } from "../utils/api"; // Ensure these API methods are properly implemented

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step tracker: 1 = Enter Email, 2 = Verify OTP, 3 = Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  // Handle sending OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // Set loading to true
    try {
      await sendOTP({ email }); // API call to send OTP
      setStep(2); // Move to OTP verification step
      setSuccess("OTP sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // Set loading to true
    try {
      await verifyOTP({ email, otp }); // API call to verify OTP
      setStep(3); // Move to reset password step
      setSuccess("OTP verified! You can now reset your password.");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle resetting password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // Set loading to true
    try {
      await resetPassword({ email, otp, newPassword }); // API call to reset password
      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login page
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={
          step === 1
            ? handleSendOTP
            : step === 2
            ? handleVerifyOTP
            : handleResetPassword
        }
        className="p-6 bg-white shadow-md rounded-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <>
            <label className="block mb-2">Enter your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border w-full p-2 mb-4 rounded"
              required
              disabled={loading} // Disable input while loading
            />
            <button
              type="submit"
              className={`bg-blue-500 text-white w-full py-2 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <>
            <label className="block mb-2">Enter the OTP sent to your email</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="OTP"
              className="border w-full p-2 mb-4 rounded"
              required
              disabled={loading} // Disable input while loading
            />
            <button
              type="submit"
              className={`bg-blue-500 text-white w-full py-2 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <>
            <label className="block mb-2">Enter your new password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="border w-full p-2 mb-4 rounded"
              required
              disabled={loading} // Disable input while loading
            />
            <button
              type="submit"
              className={`bg-blue-500 text-white w-full py-2 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
