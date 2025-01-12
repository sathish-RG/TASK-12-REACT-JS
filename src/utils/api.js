import axios from "axios";

const API = axios.create({
  baseURL: "https://task-12-node-js-3.onrender.com/api/auth/"
});

export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
<<<<<<< HEAD
export const sendOTP = (data) => API.post("/forgot-password", data);
export const verifyOTP = (data) => API.post("/forgot-password", data);
export const resetPassword = (data) => API.post("/forgot-password", data);
=======
export const sendOTP = (data) => API.post("/forgot-password/send", data);
export const verifyOTP = (data) => API.post("/forgot-password/verify", data);
export const resetPassword = (data) => API.post("/forgot-password/reset", data);
>>>>>>> fba059b509f68daf93c9cca5f694859a89f6b06b
