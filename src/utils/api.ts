import axios from "axios";
import { _getToken } from "./store";

const axiosInstance = axios.create({
  baseURL: "https://special-barnacle.onrender.com/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // withCredentials: true,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
});
axiosInstance.interceptors.request.use(
  async (request) => {
    request.headers.Accept = "application/json";
    request.headers["Content-Type"] = "application/json";
    const token = await _getToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    console.log("request sentt", token);
    console.log((request.baseURL ?? "") + request.url, "location endpoint");
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Got response");
    return response.data;
  },
  (error) => {
    console.log(error);
    // if (error.response?.status === 401) {
    //   console.log("Unauthorized! Emitting logout event...");
    //   _errorPrompt("Unauthorized!", "Logging User out", 2500);
    //   authEvents.emit("logout"); // Emit a logout event
    // }

    return Promise.reject(error);
  }
);

export default axiosInstance;