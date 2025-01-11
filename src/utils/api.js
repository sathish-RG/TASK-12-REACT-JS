import axios from "axios";

const API = axios.create({
  baseURL: "https://task-12-node-js-3.onrender.com",
});

export const register = (data) => API.post("https://task-12-node-js-3.onrender.com/api/auth/register", data);
export const login = (data) => API.post("https://task-12-node-js-3.onrender.com/api/auth/login", data);
export const sendOTP = (data) => API.post("https://task-12-node-js-3.onrender.com/forgot-password", data);
export const verifyOTP = (data) => API.post("https://task-12-node-js-3.onrender.com/forgot-password", data);
export const resetPassword = (data) => API.post("https://task-12-node-js-3.onrender.com/forgot-password", data);
