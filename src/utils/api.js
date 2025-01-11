import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});

export const register = (data) => API.post("http://localhost:3000/api/auth/register", data);
export const login = (data) => API.post("http://localhost:3000/api/auth/login", data);
export const sendOTP = (data) => API.post("http://localhost:3000/api/auth/forgot-password", data);
export const verifyOTP = (data) => API.post("http://localhost:3000/api/auth/forgot-password", data);
export const resetPassword = (data) => API.post("http://localhost:3000/api/auth/forgot-password", data);
