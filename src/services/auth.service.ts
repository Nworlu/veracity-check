/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IUser } from "../model/user.model";
import type { ILoginType, IResendType, ISignupType, IVerifyType } from "../types";
import axiosInstance from "../utils/api";
import { ENDPOINT_URL } from "../utils/endpoints";
import { _setToken } from "../utils/store";

export type IResponseType = {
  token: string;
  user: IUser;
  success: boolean;
}



export const signUpServices = async (body: ISignupType): Promise<IResponseType> => {
  const response = await axiosInstance.post<IResponseType>(ENDPOINT_URL.auth.signup, body);
  console.log(response.data, "response from signup");

  const data = response.data || response 
  
  _setToken(response?.token as string); // Access token from response.data

  return data ; // Return the data only
}

export const loginnServices = async (body: ILoginType): Promise<IResponseType> => {
  const response = await axiosInstance.post<IResponseType>(ENDPOINT_URL.auth.login, body);
  const data = response.data || response 
  
  console.log(data, "response from Login");
  
  _setToken(response?.token as string); // Access token from response.data

  return data ; // Return the data only
}


export const verifyOtpServices = async (body: IVerifyType): Promise<any> => {
    const response = await axiosInstance.post<any>(ENDPOINT_URL.auth.verify, body);
    const data = response.data || response 
    
    console.log(data, "response from verify");
    
  //   _setToken(data?.token as string); // Access token from response.data
  
    return data ; // Return the data only
  }
export const resendOtpVerifyServices = async (body: IResendType): Promise<any> => {
    const response = await axiosInstance.post<any>(ENDPOINT_URL.auth.resendverification, body);
    const data = response.data || response 
    
    console.log(data, "response from resend");
    
  //   _setToken(data?.token as string); // Access token from response.data
  
    return data ; // Return the data only
}
export const logoutServices = async (): Promise<any> => {
    const response = await axiosInstance.post<any>(ENDPOINT_URL.auth.logout);
    const data = response.data || response 
    
    console.log(data, "response from resend");
    
  //   _setToken(data?.token as string); // Access token from response.data
  
    return data ; // Return the data only
}