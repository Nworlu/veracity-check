import type { AxiosError } from "axios";
import { _errorPrompt, _successPrompt } from "../utils/core";
import { updateUserProfile, uploadImageProfile } from "../services/profile.service";
import type { IUpdateProfileType, IUploadImageType } from "../types";
import { useAuth } from "../context/AuthProvider";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfileMutation = () => {
    const { setUserData } = useAuth()
  return useMutation({
    mutationFn: (values: IUpdateProfileType) => updateUserProfile(values),
    onMutate: () => console.log("Signing up..."),
    onSuccess: (data) => {
      console.log(data, "data sign upppppppp");
        _successPrompt("Success", 2500,"Profile updated successfully");
          setUserData(data)
    //   _successPrompt("Success", 2500,"Signup successful");
    //   setUserData(data.user)
        // navigate(`/auth/otp-verify?email=${data.user.email}`, { state: { email: data.user.email } });
    },
    onError: (error: AxiosError) => {
      const errorData = error?.response?.data as { error: string };
      console.log(errorData.error, {errorData});
      _errorPrompt("Error", 2500,errorData.error || "Signup failed");
    },
  });
};
export const useUploadImageMutation = () => {
    // const { setUserData } = useAuth()
  return useMutation({
    mutationFn: (values: IUploadImageType) => uploadImageProfile(values),
    onMutate: () => console.log("uploading image..."),
    onSuccess: (data) => {
      console.log(data, "data sign upppppppp");
      _successPrompt("Success", 2500,"Uploaded Image successful");
    //   setUserData(data.user)
        // navigate(`/auth/otp-verify?email=${data.user.email}`, { state: { email: data.user.email } });
    },
    onError: (error: AxiosError) => {
      const errorData = error?.response?.data as { error: string };
      console.log(errorData.error, {errorData});
      _errorPrompt("Error", 2500,errorData.error || "Signup failed");
    },
  });
};