import { useState } from "react";
import { sendOTP, verifyOTP, resetPassword } from "../utils/api";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Track current step: 1 = Enter Email, 2 = Verify OTP, 3 = Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await sendOTP({ email });
      setStep(2); // Move to OTP verification step
      setSuccess("OTP sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Try again.");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await verifyOTP({ email, otp });
      setStep(3); // Move to reset password step
      setSuccess("OTP verified! You can now reset your password.");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await resetPassword({ email, otp, newPassword });
      setSuccess("Password reset successful! You can now log in.");
      window.location.href = "/login";; // Reset form to initial state
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={step === 1 ? handleSendOTP : step === 2 ? handleVerifyOTP : handleResetPassword}
        className="p-6 bg-white shadow-md rounded-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

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
            />
            <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
              Send OTP
            </button>
          </>
        )}

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
            />
            <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
              Verify OTP
            </button>
          </>
        )}

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
            />
            <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
              Reset Password
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
