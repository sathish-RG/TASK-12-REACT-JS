import axios from "axios";

const API = axios.create({
  baseURL: "https://task-12-node-js-3.onrender.com/"
});

export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
export const sendOTP = (data) => API.post("/forgot-password/send", data);
export const verifyOTP = (data) => API.post("/forgot-password/verify", data);
export const resetPassword = (data) => API.post("/forgot-password/reset", data);
