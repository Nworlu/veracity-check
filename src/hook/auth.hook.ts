import { useMutation } from "@tanstack/react-query";
import { loginnServices, logoutServices, resendOtpVerifyServices, signUpServices, verifyOtpServices } from "../services/auth.service";
import type { ILoginType, IResendType, ISignupType, IVerifyType } from "../types";
import { _errorPrompt, _successPrompt } from "../utils/core"; 
import type { AxiosError } from "axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export const useSignupMutation = () => {
    const { setUserData } = useAuth()
    const navigate = useNavigate() 
  return useMutation({
    mutationFn: (values: ISignupType) => signUpServices(values),
    onMutate: () => console.log("Signing up..."),
    onSuccess: (data) => {
      console.log(data, "data sign upppppppp");
      _successPrompt("Success", 2500,"Signup successful");
      alert("Your Otp Code " + data.user.otp.code)
      setUserData(data.user)
        navigate(`/auth/otp-verify?email=${data.user.email}`, { state: { email: data.user.email } });
    },
    onError: (error: AxiosError) => {
      const errorData = error?.response?.data as { error: string };
      console.log(errorData.error, {errorData});
      _errorPrompt("Error", 2500,errorData.error || "Signup failed");
    },
  });
};
export const useLoginMutation = () => {
    const navigate = useNavigate() 
    const { setUserData } = useAuth()

  return useMutation({
    mutationFn: (values: ILoginType) => loginnServices(values),
    onMutate: () => console.log("Signing up..."),
    onSuccess: (data) => {
      console.log(data, "data login upppppppp");
      setUserData(data.user)
      if(data.user?.userType === "user"){
        navigate(`/dashboard/documents`);
    }else if(data.user?.userType === "admin"){
        navigate(`/dashboard/admin-documents`);
    }
    },
    onError: (error: AxiosError) => {
      const errorData = error?.response?.data as { error: string };
      console.log(errorData.error, {errorData});
      _errorPrompt("Error", 2500,errorData.error || "Signup failed");
    },
  });
};
export const useVerifyOtpMutation = () => {
    const navigate = useNavigate() 
    // const { user } = useAuth()

  return useMutation({
    mutationFn: (values: IVerifyType) => verifyOtpServices(values),
    onMutate: () => console.log("verifying otp..."),
    onSuccess: (data) => {
        console.log(data, "data verified otp");
        _successPrompt("Success", 2500,"Otp verified successfully");
    //   if(user?.userType === "user"){
          navigate(`/auth/login`);
    //   }
    //   setUserData(data.user)
    },
    onError: (error: AxiosError) => {
      const errorData = error?.response?.data as { error: string };
      console.log(errorData.error, {errorData});
      _errorPrompt("Error", 2500,errorData.error || "Signup failed");
    },
  });
};
export const useResendOtpMutation = () => {
    // const { setUserData } = useAuth()
  return useMutation({
    mutationFn: (values: IResendType) => resendOtpVerifyServices(values),
    onMutate: () => console.log("resending otp..."),
    onSuccess: (data) => {
      console.log(data, "data resent otp");
    //   setUserData(data.user)
    },
    onError: (error: AxiosError) => {
      const errorData = error?.response?.data as { error: string };
      console.log(errorData.error, {errorData});
      _errorPrompt("Error", 2500,errorData.error || "Signup failed");
    },
  });
};
export const useLogoutMutation = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
  return useMutation({
    mutationFn: () => logoutServices(),
    onMutate: () => console.log("logging out"),
    onSuccess: () => {
      logout()
      navigate(`/`);
      _successPrompt("Success", 2500,"Logged out successfully");
    //   setUserData(data.user)
    },
    onError: (error: AxiosError) => {
      const errorData = error?.response?.data as { error: string };
      console.log(errorData.error, {errorData});
      _errorPrompt("Error", 2500,errorData.error || "Signup failed");
    },
  });
};



// export  const useGetAllBookings = (enabled: boolean) => {
//     return useQuery({
//       queryKey: ["useGetAllBookings"],
//       queryFn: async () => {
//         const data = await getAllBooking();
//         console.log(data, "getAllBooking");
//         // dispatch(setUserSubPlan(data));
//         //    dispatch(setVitals(data)); // Store user in Redux
//         return data;
//       },
//       enabled,
//       retry: false,
//     });
//   };