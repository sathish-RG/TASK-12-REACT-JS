import { useState } from "react";
import { sendOTP, verifyOTP } from "../utils/api";
import { useNavigate } from "react-router-dom";

const OTPForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSendOTP = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      await sendOTP({ email });
      setStep(2);
      // Start a 60-second timer for resending OTP
      setTimer(60);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 6) {
      setError("Please enter a valid OTP");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      await verifyOTP({ email, otp });
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 ? (
          <>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSendOTP}
              disabled={isLoading || !email}
              className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP sent to {email}
              </label>
              <input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                maxLength={6}
                disabled={isLoading}
              />
             
            </div>
            <button
              onClick={handleVerifyOTP}
              disabled={isLoading || otp.length !== 6}
              className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 mb-2"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
            {timer > 0 ? (
              <p className="text-sm text-gray-500 text-center">
                Resend OTP in {timer} seconds
              </p>
            ) : (
              <button
                onClick={() => {
                  setStep(1);
                  setOTP("");
                }}
                className="text-blue-500 text-sm w-full hover:underline"
              >
                Resend OTP
              </button>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default OTPForm;