/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useResendOtpMutation, useVerifyOtpMutation } from "../../hook/auth.hook";

const OtpVerification = () => {
  const { user } = useAuth(); // or pass email as prop
  const email = user?.email || ""; // ensure email is set
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [message, setMessage] = useState("");
const verifyOtpMutation = useVerifyOtpMutation()
const resendOtpMutation = useResendOtpMutation()

  useEffect(() => {
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const verifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== 6 || !email) return;

    setMessage("");

    const payload ={
        otpCode:code 
    }
  
    verifyOtpMutation.mutate(payload)
  };

  const resendOtp = async () => {
    if (!email || resendCooldown > 0) return;

    // setMessage("");

  resendOtpMutation.mutate({email})
  };

  return (
    <div className="min-h-[110vh] flex items-center justify-center bg-gradient-to-tr from-[#f6f6f7] via-[#E5DEFF] to-[#7E69AB] px-4">
    <div 
        className="bg-white/90 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-sm space-y-5"
        >
      <h2 className="text-4xl font-bold text-[#7E69AB]">Verify your Email</h2>
      <p className="text-sm text-center mb-6 text-gray-500">
        Enter the 6-digit code sent to <span className="font-medium">{email}</span>
      </p>
      <div className="flex justify-between mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el) as any}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-10 h-10 text-center text-lg border rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        ))}
      </div>
      <button
        onClick={verifyOtp}
        disabled={verifyOtpMutation.isPending}
        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold py-2.5 rounded-lg shadow transition"

      >
        {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
      </button>
      <div className="text-center text-sm mb-2">
        Didn't get the code?{" "}
        <button
          onClick={resendOtp}
          disabled={resendCooldown > 0 || resendOtpMutation.isPending}
          className="text-blue-600 hover:underline"
        >
          {resendOtpMutation.isPending ? "Resending..." : resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
        </button>
      </div>
      {message && <p className="text-center text-sm text-gray-700">{message}</p>}
    </div>
    </div>
  );
};

export default OtpVerification;
