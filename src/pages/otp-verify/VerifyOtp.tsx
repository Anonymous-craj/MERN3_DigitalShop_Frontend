import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { APIWITHTOKEN } from "../../http/apiType";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; // Get email from navigation state
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const otpResponse = await APIWITHTOKEN.post("/verify-otp", {
        email,
        otp,
      });

      if (otpResponse.status === 200) {
        // OTP is verified, now reset the password
        const resetResponse = await APIWITHTOKEN.post("/reset-password", {
          email,
          newPassword,
          confirmPassword,
        });

        if (resetResponse.status === 200) {
          toast.success("Password reset successful!");
          navigate("/login"); // Redirect to login page after successful password reset
        } else {
          toast.error(resetResponse.data.message);
        }
      } else {
        toast.error(otpResponse.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong! Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Verify OTP
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="otp"
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              required
              value={otp}
              onChange={handleOtpChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              required
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? "Submitting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
