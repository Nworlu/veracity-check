/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../utils/api";
import { ENDPOINT_URL } from "../utils/endpoints";

export const getAllAdminUserService = async (): Promise<any> => {
    const response = await axiosInstance.get<any>(ENDPOINT_URL.admin.getallusers);
    const data = response.data || response 
    
    console.log(data, "response from gat all users");
    
  
    return data ; // Return the data only
}
export const getAllAdminDocumentsService = async (): Promise<any> => {
    const response = await axiosInstance.get<any>(ENDPOINT_URL.admin.getallIdentities);
    const data = response.data || response 
    
    console.log(data, "response from gat all documents");
    
  
    return data ; // Return the data only
}
export const verifyDocumentIdentity = async (id:string,body:any): Promise<any> => {
    const response = await axiosInstance.patch<any>(ENDPOINT_URL.admin.verifyIdentity(id),body);
    const data = response.data || response 
    
    console.log(data, "response from gat all documents");
    
  
    return data ; // Return the data only
}