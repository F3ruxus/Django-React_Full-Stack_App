// Importing necessary modules and constants
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Defining the base URL for the API
const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

// Creating an instance of axios with the base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

// Adding an interceptor to add the access token to the headers of each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Rejecting the promise in case of an error
    return Promise.reject(error);
  }
);

// Exporting the API instance as the default export
export default api;