/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IUploadIdentityType } from "../types";
import axiosInstance from "../utils/api";
import { ENDPOINT_URL } from "../utils/endpoints";

 export const submitIdentity = async (body: IUploadIdentityType): Promise<any> => {
     const response = await axiosInstance.post<any>(ENDPOINT_URL.identity["submit-identity"], body);
     const data = response.data || response 
     
     console.log(data, "response from resend");
     
   //   _setToken(data?.token as string); // Access token from response.data
   
     return data ; // Return the data only
 }
 export const getDocumentServices = async (): Promise<any> => {
     const response = await axiosInstance.get<any>(ENDPOINT_URL.identity["get-identity"]);
     const data = response.data || response 
     
     console.log(data, "response from get document");
     
   //   _setToken(data?.token as string); // Access token from response.data
   
     return data ; // Return the data only
 }
 export const getSingleDocumentServices = async (id:string): Promise<any> => {
     const response = await axiosInstance.get<any>(ENDPOINT_URL.identity["get-single-identity"](id));
     const data = response.data || response 
     
     console.log(data, "response from get document");
     
   //   _setToken(data?.token as string); // Access token from response.data
   
     return data ; // Return the data only
 }