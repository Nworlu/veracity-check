import { useMutation, useQuery } from "@tanstack/react-query";
import { _errorPrompt, _successPrompt } from "../utils/core";
import type { AxiosError } from "axios";
import { getDocumentServices, getSingleDocumentServices, submitIdentity } from "../services/identity.service";
import type { IUploadIdentityType } from "../types";

export const useUploadDocumentsMutation = () => {
    // const { setUserData } = useAuth()
  return useMutation({
    mutationFn: (values: IUploadIdentityType) => submitIdentity(values),
    onMutate: () => console.log("uploading image..."),
    onSuccess: (data) => {
      console.log(data, "data sign upppppppp");
      _successPrompt("Success", 2500,"Uploaded Documents successful");
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


export  const useGetUserDocuments = (enabled: boolean) => {
    return useQuery({
      queryKey: ["useGetUserDocuments"],
      queryFn: async () => {
        const data = await getDocumentServices();
        console.log(data, "getDocumentServices");
        // dispatch(setUserSubPlan(data));
        //    dispatch(setVitals(data)); // Store user in Redux
        return data;
      },
      enabled,
      retry: false,
    });
  };
export  const useGetUserSingleDocument = (id: string) => {
    return useQuery({
      queryKey: ["useGetUserSingleDocument", id],
      queryFn: async () => {
        const data = await getSingleDocumentServices(id);
        console.log(data, "getSingleDocumentServices");
        // dispatch(setUserSubPlan(data));
        //    dispatch(setVitals(data)); // Store user in Redux
        return data;
      },
      enabled:!!id,
      retry: false,
    });
  };