import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';

function ForgetPass() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1 — Send OTP
  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await axios.post(`${serverUrl}api/auth/sendOtp`, { email },{withCredentials:true});
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify OTP
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      await axios.post(`${serverUrl}api/auth/verifyOtp`, { email, otp },{withCredentials:true});
      toast.success("OTP verified");
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3 — Reset Password
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }
    try {
      setLoading(true);
      await axios.post(`${serverUrl}api/auth/resetPassword`, { email,newPassword } ,{withCredentials:true});
      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full h-[40px] border border-[#e0e0e0] rounded-[6px] px-4 text-[15px] outline-none focus:border-black transition-all";
  const btnClass = "w-full h-[45px] bg-black text-white rounded-[6px] text-[16px] font-medium cursor-pointer flex items-center justify-center hover:bg-[#222] transition-all";

  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="w-[90%] md:w-[420px] bg-white shadow-xl rounded-2xl px-[40px] py-[50px] flex flex-col gap-5">

        {/* Step 1 — Email */}
        {step === 1 && (
          <>
            <div className="flex flex-col gap-1 text-center mb-2">
              <h1 className="text-[22px] font-bold">Forgot Your Password?</h1>
              <p className="text-[#888] text-[14px]">Enter your email address</p>
            </div>
            <div className="flex flex-col gap-1"  >
              <label className="text-[14px] font-medium">Email</label>
              <input
                type="email"
                className={inputClass}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className={btnClass} onClick={handleSendOtp} disabled={loading}>
              {loading ? <ClipLoader size={22} color="white" /> : "Send OTP"}
            </button>
            <p
              className="text-center text-[14px] text-[#666] cursor-pointer hover:text-black transition-all"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </p>
          </>
        )}

        {/* Step 2 — OTP */}
        {step === 2 && (
          <>
            <div className="flex flex-col gap-1 text-center mb-2">
              <h1 className="text-[22px] font-bold">Enter OTP</h1>
              <p className="text-[#888] text-[14px]">Please enter the 4-digit code sent to your email.</p>
            </div>
            <div >

            <input
              type="text"
              className={`${inputClass} text-center text-[20px] tracking-[8px] font-bold`}
              placeholder="_ _ _ _"
              maxLength={4}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            </div>
            <button className={btnClass} onClick={handleVerifyOtp} disabled={loading}>
              {loading ? <ClipLoader size={22} color="white" /> : "Verify OTP"}
            </button>
            <p
              className="text-center text-[14px] text-[#666] cursor-pointer hover:text-black transition-all"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </p>
          </>
        )}

        {/* Step 3 — New Password */}
        {step === 3 && (
          <>
            <div className="flex flex-col gap-1 text-center mb-2">
              <h1 className="text-[22px] font-bold">Reset Your Password</h1>
              <p className="text-[#888] text-[14px]">Enter a new password below to regain access to your account.</p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[14px] font-medium">New Password</label>
              <input
                type="password"
                className={inputClass}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1" >
              <label className="text-[14px] font-medium">Confirm Password</label>
              <input
                type="password"
                className={inputClass}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className={btnClass} onClick={handleResetPassword} disabled={loading}>
              {loading ? <ClipLoader size={22} color="white" /> : "Reset Password"}
            </button>
            <p
              className="text-center text-[14px] text-[#666] cursor-pointer hover:text-black transition-all"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </p>
          </>
        )}

      </div>
    </div>
  );
}

export default ForgetPass;