/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllAdminDocumentsService, getAllAdminUserService, verifyDocumentIdentity } from "../services/admin.service";
import { _errorPrompt, _successPrompt } from "../utils/core";
import type { AxiosError } from "axios";

export  const useGetAllAdminUser = (enabled: boolean) => {
    return useQuery({
      queryKey: ["useGetAllAdminUser"],
      queryFn: async () => {
        const data = await getAllAdminUserService();
        console.log(data, "getAllAdminUserService");
        // dispatch(setUserSubPlan(data));
        //    dispatch(setVitals(data)); // Store user in Redux
        return data;
      },
      enabled,
      retry: false,
    });
};
export  const useGetAllAdminDocuments = (enabled: boolean) => {
    return useQuery({
      queryKey: ["useGetAllAdminUser"],
      queryFn: async () => {
        const data = await getAllAdminDocumentsService();
        console.log(data, "getAllAdminDocumentsService");
        // dispatch(setUserSubPlan(data));
        //    dispatch(setVitals(data)); // Store user in Redux
        return data;
      },
      enabled,
      retry: false,
    });
};

export const useVerifyIdentityMutation = () => {
    // const { setUserData } = useAuth()
  return useMutation({
    mutationFn: ({id,body}:{id:string,body:any}) => verifyDocumentIdentity(id,body),
    onMutate: () => console.log("verifying document..."),
    onSuccess: (data) => {
      console.log(data, "data sign upppppppp");
      _successPrompt("Success", 2500,"Document verified successfully");
    //   setUserData(data.user)
        // navigate(`/auth/otp-verify?email=${data.user.email}`, { state: { email: data.user.email } });
    },
    onError: (error: AxiosError) => {
      const errorData = error?.response?.data as { error: string };
      console.log(error?.response?.data);
      _errorPrompt("Error", 2500,errorData.error || "Signup failed");
    },
  });
};