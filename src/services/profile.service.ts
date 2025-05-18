/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IUpdateProfileType, IUploadImageType } from "../types";
import axiosInstance from "../utils/api";
import { ENDPOINT_URL } from "../utils/endpoints";

 export const updateUserProfile = async (body: IUpdateProfileType): Promise<any> => {
     const response = await axiosInstance.patch<any>(ENDPOINT_URL.profile.update, body);
     const data = response.data || response 
     
     console.log(data, "response from resend");
     
   //   _setToken(data?.token as string); // Access token from response.data
   
     return data ; // Return the data only
 }
 export const uploadImageProfile = async (body: IUploadImageType): Promise<any> => {
     const response = await axiosInstance.put<any>(ENDPOINT_URL.profile["upload-image"], body);
     const data = response.data || response 
     
     console.log(data, "response from upload image");
     
   //   _setToken(data?.token as string); // Access token from response.data
   
     return data ; // Return the data only
 }